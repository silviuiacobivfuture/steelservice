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
import { Edit, Trash2 } from "lucide-react";

export default function MaterialsTable() {
  const materials = [
    {
      id: "1",
      name: "Carbon Steel",
      attributes: ["Tensile Strength", "Hardness", "Thickness"],
      products: 12,
      lastUpdated: "2024-03-12",
    },
    {
      id: "2",
      name: "Stainless Steel",
      attributes: ["Grade", "Surface Finish", "Corrosion Resistance"],
      products: 8,
      lastUpdated: "2024-03-10",
    },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Technical Attributes</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell className="font-medium">{material.name}</TableCell>
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
              <TableCell>{material.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
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
  );
}