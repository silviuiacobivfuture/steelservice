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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

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
  }>;
  createdAt: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const customers: Customer[] = [
    {
      id: '1',
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
      quotes: [{ id: '1' }],
      createdAt: new Date().toISOString(),
    },
  ];

  return json({ customers });
}

export default function CustomersPage() {
  const { customers } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button asChild>
          <Link to="/admin/customers/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Link>
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Quotes</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {customer.description || `Customer ${customer.id}`}
                    </div>
                    {customer.userCustomers[0]?.user.profile && (
                      <div className="text-sm text-muted-foreground">
                        Primary Contact: {customer.userCustomers[0].user.profile.firstName}{' '}
                        {customer.userCustomers[0].user.profile.lastName}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {customer.userCustomers.length} users
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {customer.quotes.length} quotes
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(customer.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/customers/${customer.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}