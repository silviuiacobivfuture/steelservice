import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Upload } from "lucide-react";

export default function QuoteDocuments() {
  const documents = [
    {
      id: "1",
      name: "Technical Specifications.pdf",
      type: "technical",
      size: "2.5 MB",
      uploadedAt: "2024-03-15",
    },
    {
      id: "2",
      name: "Material Certificates.pdf",
      type: "certification",
      size: "1.8 MB",
      uploadedAt: "2024-03-15",
    },
    {
      id: "3",
      name: "Quote Invoice.pdf",
      type: "invoice",
      size: "1.2 MB",
      uploadedAt: "2024-03-15",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-muted-foreground">
                  {doc.size} • Uploaded on {doc.uploadedAt}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>
    </div>
  );
}