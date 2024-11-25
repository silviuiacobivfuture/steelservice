import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { ChevronLeft, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement asset upload
  return json({ success: true });
}

export default function UploadAssetPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/assets">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Assets
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Asset</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6" encType="multipart/form-data">
              <div className="space-y-2">
                <Label htmlFor="type">Asset Type</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product_image">Product Image</SelectItem>
                    <SelectItem value="quote_documentation">Quote Documentation</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <div className="grid w-full gap-1.5">
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      // Handle file selection preview if needed
                    }}
                  />
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-8 hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file')?.click()}
                    >
                      Choose File
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      or drag and drop your file here
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter a description for this asset"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Enter tags separated by commas"
                />
                <p className="text-sm text-muted-foreground">
                  Add relevant tags to help organize and find this asset later
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/assets">Cancel</Link>
                </Button>
                <Button type="submit">Upload Asset</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}