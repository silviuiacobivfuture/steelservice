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

export default function MaterialsTable() {
  const materials = [
    {
      id: "1",
      name: "Carbon Steel",
      attributes: ["Tensile Strength", "Hardness"],
      products: 12,
    },
    {
      id: "2",
      name: "Stainless Steel",
      attributes: ["Tensile Strength", "Corrosion Resistance"],
      products: 8,
    },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Other Attributes</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell>{material.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {material.attributes.map((attr) => (
                    <Badge key={attr} variant="secondary">
                      {attr}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{material.products}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/admin/materials/${material.id}`}>
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