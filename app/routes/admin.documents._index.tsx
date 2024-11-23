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
import { Search, Plus, FileText, Download, Trash2 } from "lucide-react";

export default function DocumentsAdmin() {
  const [search, setSearch] = useState("");

  const documents = [
    {
      id: "1",
      name: "Technical Specifications.pdf",
      type: "Technical",
      size: "2.5 MB",
      uploadedBy: "John Doe",
      uploadedAt: "2024-03-15",
    },
    {
      id: "2",
      name: "Material Certificates.pdf",
      type: "Certification",
      size: "1.8 MB",
      uploadedBy: "Jane Smith",
      uploadedAt: "2024-03-15",
    },
    {
      id: "3",
      name: "Quality Report Q1 2024.pdf",
      type: "Report",
      size: "3.2 MB",
      uploadedBy: "Mike Johnson",
      uploadedAt: "2024-03-14",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "technical":
        return "default";
      case "certification":
        return "success";
      case "report":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Documents</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getTypeColor(doc.type)}>{doc.type}</Badge>
                </TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.uploadedBy}</TableCell>
                <TableCell>{doc.uploadedAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
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
    </div>
  );
}