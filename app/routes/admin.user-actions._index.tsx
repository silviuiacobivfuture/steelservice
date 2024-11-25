import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const actions: UserAction[] = [
    {
      id: 1,
      actionType: 'Created',
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
    },
    {
      id: 2,
      actionType: 'Updated',
      user: {
        email: 'jane@example.com',
        profile: {
          firstName: 'Jane',
          lastName: 'Smith',
        },
      },
      targetType: 'Quote',
      targetId: 456,
      timestamp: new Date().toISOString(),
    },
  ];

  return json({ actions });
}

export default function UserActionsPage() {
  const { actions } = useLoaderData<typeof loader>();

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Actions</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search actions..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Action type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="updated">Updated</SelectItem>
            <SelectItem value="deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Target type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="product">Product</SelectItem>
            <SelectItem value="quote">Quote</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Target Type</TableHead>
              <TableHead>Target ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell>
                  <Badge variant={getActionColor(action.actionType)}>
                    {action.actionType}
                  </Badge>
                </TableCell>
                <TableCell>
                  {action.user.profile ? (
                    <div>
                      <div className="font-medium">
                        {action.user.profile.firstName} {action.user.profile.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {action.user.email}
                      </div>
                    </div>
                  ) : (
                    action.user.email
                  )}
                </TableCell>
                <TableCell>{action.targetType}</TableCell>
                <TableCell>#{action.targetId}</TableCell>
                <TableCell>
                  {new Date(action.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/admin/user-actions/${action.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}