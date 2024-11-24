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
      description: "High-strength structural steel plate",
      attributes: ["Thickness: 10-50mm", "Width: 1500-3000mm"],
      services: ["Cutting", "Heat Treatment"],
    },
    {
      id: "2",
      description: "Wear-resistant steel plate",
      attributes: ["Thickness: 8-30mm", "Width: 1200-2400mm"],
      services: ["Cutting", "Surface Treatment"],
    },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Attributes</TableHead>
            <TableHead>Services</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.attributes.map((attr) => (
                    <Badge key={attr} variant="secondary">
                      {attr}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.services.map((service) => (
                    <Badge key={service} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </TableCell>
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