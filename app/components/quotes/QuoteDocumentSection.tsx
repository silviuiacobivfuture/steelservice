import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from 'lucide-react';

interface QuoteDocumentSectionProps {
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function QuoteDocumentSection({
  files,
  onFileChange,
}: QuoteDocumentSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Documentation</CardTitle>
        <CardDescription>Upload any relevant project files or specifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="documents">Documents</Label>
          <div className="flex items-center gap-4">
            <Input
              id="documents"
              type="file"
              multiple
              onChange={onFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('documents')?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            {files.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {files.length} file(s) selected
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Additional Requirements</Label>
          <Textarea
            name="requirements"
            placeholder="Any specific project requirements or deadlines"
          />
        </div>
      </CardContent>
    </Card>
  );
}