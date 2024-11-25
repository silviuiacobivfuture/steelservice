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

export default function QuotesTable() {
  const quotes = [
    {
      id: "1",
      client: "John Doe",
      products: ["Carbon Steel Plate", "Stainless Steel Sheet"],
      status: "pending",
      date: "2024-03-15",
    },
    {
      id: "2",
      client: "Jane Smith",
      products: ["Carbon Steel Plate"],
      status: "completed",
      date: "2024-03-14",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell>{quote.client}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {quote.products.map((product) => (
                    <Badge key={product} variant="secondary">
                      {product}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusColor(quote.status)}>
                  {quote.status}
                </Badge>
              </TableCell>
              <TableCell>{quote.date}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/admin/quotes/${quote.id}`}>
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