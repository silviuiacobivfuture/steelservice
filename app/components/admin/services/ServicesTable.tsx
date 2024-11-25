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

export default function ServicesTable() {
  const services = [
    {
      id: "1",
      name: "Plasma Cutting",
      products: ["Carbon Steel", "Stainless Steel"],
      activeQuotes: 5,
      lastUpdated: "2024-03-12",
    },
    {
      id: "2",
      name: "Heat Treatment",
      products: ["Carbon Steel", "Alloy Steel"],
      activeQuotes: 3,
      lastUpdated: "2024-03-10",
    },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Associated Products</TableHead>
            <TableHead>Active Quotes</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {service.products.map((product) => (
                    <Badge key={product} variant="secondary">
                      {product}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{service.activeQuotes}</TableCell>
              <TableCell>{service.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`${service.id}`}>
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