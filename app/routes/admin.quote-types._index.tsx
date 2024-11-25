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
import { Plus, Search, Edit, Trash2 } from "lucide-react";

interface QuoteType {
  id: string;
  name: string;
  quotes: Array<{
    id: string;
  }>;
  createdAt: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const quoteTypes: QuoteType[] = [
    {
      id: '1',
      name: 'Standard Quote',
      quotes: [{ id: '1' }, { id: '2' }],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Rush Quote',
      quotes: [{ id: '3' }],
      createdAt: new Date().toISOString(),
    },
  ];

  return json({ quoteTypes });
}

export default function QuoteTypesPage() {
  const { quoteTypes } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quote Types</h1>
        <Button asChild>
          <Link to="/admin/quote-types/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Quote Type
          </Link>
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search quote types..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Active Quotes</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quoteTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell className="font-medium">{type.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {type.quotes.length} quotes
                  </Badge>
                </TableCell>
                <TableCell>{new Date(type.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/quote-types/${type.id}`}>
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