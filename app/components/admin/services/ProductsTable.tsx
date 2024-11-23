import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@remix-run/react";
import { ExternalLink } from "lucide-react";

export default function ProductsTable() {
  const products = [
    {
      id: "1",
      name: "Carbon Steel Plate",
      attributes: ["Thickness: 10-50mm", "Width: 1500-3000mm"],
      quotes: 3,
    },
    {
      id: "2",
      name: "Stainless Steel Sheet",
      attributes: ["Thickness: 2-10mm", "Width: 1000-2000mm"],
      quotes: 2,
    },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Attributes</TableHead>
            <TableHead>Active Quotes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.attributes.map((attr) => (
                    <Badge key={attr} variant="secondary">
                      {attr}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{product.quotes}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/admin/products/${product.id}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}