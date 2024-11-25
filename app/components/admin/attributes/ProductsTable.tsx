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
      name: "High-strength Steel Plate",
      material: "Carbon Steel",
      attributes: ["200-300 MPa", "30-40 HRC"],
      quotes: 3,
    },
    {
      id: "2",
      name: "Structural Steel Sheet",
      material: "Carbon Steel",
      attributes: ["300-400 MPa", "40-50 HRC"],
      quotes: 2,
    },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Attribute Values</TableHead>
            <TableHead>Active Quotes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.material}</TableCell>
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