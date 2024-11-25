import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

interface UserAction {
  id: number;
  actionType: 'Created' | 'Updated' | 'Deleted';
  user: {
    email: string;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  targetType: string;
  targetId: number;
  timestamp: string;
  details?: Record<string, any>;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const action: UserAction = {
    id: parseInt(params.id!),
    actionType: 'Updated',
    user: {
      email: 'john@example.com',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
      },
    },
    targetType: 'Product',
    targetId: 123,
    timestamp: new Date().toISOString(),
    details: {
      changes: {
        description: {
          from: 'Old description',
          to: 'New description',
        },
        price: {
          from: 100,
          to: 150,
        },
      },
    },
  };

  return json({ action });
}

export default function UserActionDetailsPage() {
  const { action } = useLoaderData<typeof loader>();

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'Created':
        return 'success';
      case 'Updated':
        return 'warning';
      case 'Deleted':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/user-actions">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to User Actions
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Action Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Action Type</h3>
                <Badge variant={getActionColor(action.actionType)}>
                  {action.actionType}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Timestamp</h3>
                <p>{new Date(action.timestamp).toLocaleString()}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">User</h3>
                {action.user.profile ? (
                  <div>
                    <p className="font-medium">
                      {action.user.profile.firstName} {action.user.profile.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{action.user.email}</p>
                  </div>
                ) : (
                  <p>{action.user.email}</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Target</h3>
                <p>
                  {action.targetType} #{action.targetId}
                </p>
              </div>
            </div>

            {action.details && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Changes</h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(action.details, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" asChild>
                <Link to={`/admin/${action.targetType.toLowerCase()}s/${action.targetId}`}>
                  View Target
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}