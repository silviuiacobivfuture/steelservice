import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: string;
  createdAt: string;
  unread: boolean;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual data fetch
  const messages: Message[] = [
    {
      id: '1',
      subject: 'Quote Update',
      content: 'Your quote has been updated with new pricing...',
      sender: 'Sales Team',
      createdAt: new Date().toISOString(),
      unread: true,
    },
    {
      id: '2',
      subject: 'Order Confirmation',
      content: 'Thank you for your order...',
      sender: 'Order Processing',
      createdAt: new Date().toISOString(),
      unread: false,
    },
  ];

  return json({ messages });
}

export default function MessagesPage() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={message.unread ? 'bg-primary/5' : ''}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {message.subject}
                    {message.unread && (
                      <Badge variant="secondary">New</Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    From: {message.sender}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(message.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{message.content}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Mark as Read
                  </Button>
                  <Button size="sm">
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}