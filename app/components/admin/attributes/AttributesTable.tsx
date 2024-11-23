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
import { Link } from "@remix-run/react";

export default function AttributesTable() {
  const attributes = [
    {
      id: "1",
      name: "Tensile Strength",
      var: "tensile_strength",
      unit: "MPa",
      selectionValues: ["200-300", "300-400", "400-500"],
      materials: ["Carbon Steel", "Stainless Steel"],
      products: 8,
    },
    {
      id: "2",
      name: "Hardness",
      var: "hardness",
      unit: "HRC",
      selectionValues: ["30-40", "40-50", "50-60"],
      materials: ["Carbon Steel"],
      products: 5,
    },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Variable</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Selection Values</TableHead>
            <TableHead>Materials</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attributes.map((attr) => (
            <TableRow key={attr.id}>
              <TableCell className="font-medium">{attr.name}</TableCell>
              <TableCell>{attr.var}</TableCell>
              <TableCell>{attr.unit}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {attr.selectionValues.map((value) => (
                    <Badge key={value} variant="secondary">
                      {value}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {attr.materials.map((material) => (
                    <Badge key={material} variant="outline">
                      {material}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{attr.products}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={attr.id}>
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
  );
}