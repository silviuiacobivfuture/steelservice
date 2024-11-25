import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  MessageSquare, 
  Settings, 
  User,
  Building2,
  Clock,
  Heart
} from 'lucide-react';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  recentQuotes: Array<{
    id: string;
    status: string;
    createdAt: string;
  }>;
  recentMessages: Array<{
    id: string;
    subject: string;
    createdAt: string;
    unread: boolean;
  }>;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual data fetch
  const profile: Profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    company: 'ACME Corp',
    recentQuotes: [
      { id: '1', status: 'pending', createdAt: new Date().toISOString() },
      { id: '2', status: 'accepted', createdAt: new Date().toISOString() },
    ],
    recentMessages: [
      { id: '1', subject: 'Quote Update', createdAt: new Date().toISOString(), unread: true },
      { id: '2', subject: 'Order Confirmation', createdAt: new Date().toISOString(), unread: false },
    ],
  };

  return json({ profile });
}

export default function ProfilePage() {
  const { profile } = useLoaderData<typeof loader>();

  const menuItems = [
    { icon: FileText, label: 'My Quotes', href: '/profile/quotes', count: profile.recentQuotes.length },
    { icon: MessageSquare, label: 'Messages', href: '/profile/messages', count: profile.recentMessages.filter(m => m.unread).length },
    { icon: Heart, label: 'Favorites', href: '/profile/favorites' },
    { icon: Clock, label: 'Order History', href: '/profile/history' },
    { icon: Settings, label: 'Settings', href: '/profile/settings' },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>{profile.company}</span>
              </div>
            </div>
          </div>
          <Button asChild>
            <Link to="/profile/settings">Edit Profile</Link>
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {menuItems.map((item) => (
            <Card key={item.label} className="hover:shadow-md transition-shadow">
              <Link to={item.href}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.label}</h3>
                    {item.count !== undefined && (
                      <Badge variant="secondary" className="mt-1">
                        {item.count} new
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Quotes */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Quote #{quote.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge>{quote.status}</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/profile/quotes">View All Quotes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{message.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {message.unread && (
                      <Badge variant="secondary">New</Badge>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/profile/messages">View All Messages</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}