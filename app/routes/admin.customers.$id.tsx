import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@remix-run/react';
import { ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface Customer {
  id: string;
  description?: string;
  userCustomers: Array<{
    user: {
      email: string;
      profile?: {
        firstName: string;
        lastName: string;
      };
    };
  }>;
  quotes: Array<{
    id: string;
    status: string;
    createdAt: string;
  }>;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const customer: Customer = {
    id: params.id!,
    description: 'Major Steel Corporation',
    userCustomers: [
      {
        user: {
          email: 'john@example.com',
          profile: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      },
    ],
    quotes: [
      {
        id: '1',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    ],
  };

  return json({ customer });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement customer update
  return json({ success: true });
}

export default function EditCustomerPage() {
  const { customer } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/customers">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Form method="post" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Company Name</Label>
                    <Input
                      id="description"
                      name="description"
                      defaultValue={customer.description}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Enter any additional notes about the customer"
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                      <Link to="/admin/customers">Cancel</Link>
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </Form>
              </TabsContent>

              <TabsContent value="users">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.userCustomers.map((uc) => (
                        <TableRow key={uc.user.email}>
                          <TableCell>
                            {uc.user.profile
                              ? `${uc.user.profile.firstName} ${uc.user.profile.lastName}`
                              : 'N/A'}
                          </TableCell>
                          <TableCell>{uc.user.email}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="quotes">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quote ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.quotes.map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell>#{quote.id}</TableCell>
                          <TableCell>
                            <Badge>{quote.status}</Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(quote.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/admin/quotes/${quote.id}`}>
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}