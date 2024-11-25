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

interface TechnicalAttribute {
  id: string;
  name: string;
  var: string;
  unit: {
    unit: string;
  };
  selectionValues: string[];
  productAttributes: Array<{
    id: string;
  }>;
  materialAttributes: Array<{
    id: string;
  }>;
  createdAt: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const attributes: TechnicalAttribute[] = [
    {
      id: '1',
      name: 'Tensile Strength',
      var: 'tensile_strength',
      unit: { unit: 'MPa' },
      selectionValues: ['200-300', '300-400', '400-500'],
      productAttributes: [{ id: '1' }],
      materialAttributes: [{ id: '1' }],
      createdAt: new Date().toISOString(),
    },
  ];

  return json({ attributes });
}

export default function TechnicalAttributesPage() {
  const { attributes } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Technical Attributes</h1>
        <Button asChild>
          <Link to="/admin/attributes/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Attribute
          </Link>
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search attributes..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Variable</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Selection Values</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((attr) => (
              <TableRow key={attr.id}>
                <TableCell className="font-medium">{attr.name}</TableCell>
                <TableCell>
                  <code className="px-2 py-1 bg-muted rounded text-sm">
                    {attr.var}
                  </code>
                </TableCell>
                <TableCell>{attr.unit.unit}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {attr.selectionValues.map((value, index) => (
                      <Badge key={index} variant="secondary">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">
                      Products: {attr.productAttributes.length}
                    </div>
                    <div className="text-sm">
                      Materials: {attr.materialAttributes.length}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/attributes/${attr.id}`}>
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