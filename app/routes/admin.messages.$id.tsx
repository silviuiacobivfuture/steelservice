import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface RequestMessage {
  id: string;
  message: string;
  satisfied: boolean;
  quote: {
    id: string;
    client: {
      profile: {
        firstName: string;
        lastName: string;
      };
    };
  };
  createdAt: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const message: RequestMessage = {
    id: params.id!,
    message: 'Please provide material certificates for the steel plates.',
    satisfied: false,
    quote: {
      id: 'Q001',
      client: {
        profile: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    },
    createdAt: new Date().toISOString(),
  };

  return json({ message });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement message update
  return json({ success: true });
}

export default function EditMessagePage() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/messages">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Messages
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label>Quote</Label>
                  <div className="mt-1">
                    <Link 
                      to={`/admin/quotes/${message.quote.id}`}
                      className="text-primary hover:underline"
                    >
                      #{message.quote.id}
                    </Link>
                  </div>
                </div>

                <div>
                  <Label>Client</Label>
                  <div className="mt-1">
                    {message.quote.client.profile.firstName} {message.quote.client.profile.lastName}
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    <Badge variant={message.satisfied ? "success" : "secondary"}>
                      {message.satisfied ? "Satisfied" : "Pending"}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label>Date</Label>
                  <div className="mt-1">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    defaultValue={message.message}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="satisfied">Mark as Satisfied</Label>
                  <Switch
                    id="satisfied"
                    name="satisfied"
                    defaultChecked={message.satisfied}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/messages">Cancel</Link>
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}