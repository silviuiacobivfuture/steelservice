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

interface Material {
  id: string;
  name: string;
  attributes: Array<{
    attribute: {
      name: string;
    };
  }>;
  products: Array<{
    id: string;
  }>;
  createdAt: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const materials: Material[] = [
    {
      id: '1',
      name: 'Carbon Steel',
      attributes: [
        { attribute: { name: 'Tensile Strength' } },
        { attribute: { name: 'Hardness' } },
      ],
      products: [{ id: '1' }],
      createdAt: new Date().toISOString(),
    },
  ];

  return json({ materials });
}

export default function MaterialsPage() {
  const { materials } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Materials</h1>
        <Button asChild>
          <Link to="/admin/materials/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Link>
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search materials..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Technical Attributes</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {material.attributes.map((attr, index) => (
                      <Badge key={index} variant="secondary">
                        {attr.attribute.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{material.products.length} products</TableCell>
                <TableCell>{new Date(material.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/materials/${material.id}`}>
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