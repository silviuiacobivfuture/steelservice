import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from "lucide-react";
import { Link } from "@remix-run/react";

export default function MaterialsAdmin() {
  const [search, setSearch] = useState("");

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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Materials</h1>
        <Button asChild>
          <Link to="new">
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

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
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={material.id}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}