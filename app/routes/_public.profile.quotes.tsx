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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plus } from 'lucide-react';

interface Quote {
  id: string;
  type: {
    name: string;
  };
  status: string;
  products: Array<{
    product: {
      description: string;
    };
    quantity: number;
  }>;
  createdAt: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const quotes: Quote[] = [
    {
      id: '1',
      type: { name: 'Standard Quote' },
      status: 'draft',
      products: [
        { product: { description: 'Carbon Steel Plate' }, quantity: 2 },
      ],
      createdAt: new Date().toISOString(),
    },
  ];

  return json({ quotes });
}

export default function MyQuotesPage() {
  const { quotes } = useLoaderData<typeof loader>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'analysis':
        return 'warning';
      case 'offer':
        return 'primary';
      case 'accepted':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Quotes</h1>
        <Button asChild>
          <Link to="/quote/new">
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">#{quote.id}</TableCell>
                <TableCell>{quote.type.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {quote.products.map((product, index) => (
                      <Badge key={index} variant="secondary">
                        {product.product.description} (x{product.quantity})
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(quote.status)}>
                    {quote.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(quote.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/quote/${quote.id}`}>
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