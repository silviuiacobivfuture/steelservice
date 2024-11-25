import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export default function AttributesTable() {
  const attributes = [
    {
      id: "1",
      name: "Tensile Strength",
      unit: "MPa",
      selectionValues: ["200-300", "300-400", "400-500"],
    },
    {
      id: "2",
      name: "Hardness",
      unit: "HRC",
      selectionValues: ["30-40", "40-50", "50-60"],
    },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Selection Values</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attributes.map((attr) => (
            <TableRow key={attr.id}>
              <TableCell>{attr.name}</TableCell>
              <TableCell>{attr.unit}</TableCell>
              <TableCell>{attr.selectionValues.join(", ")}</TableCell>
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