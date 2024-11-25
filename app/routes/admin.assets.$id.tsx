import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@remix-run/react';
import { ChevronLeft } from 'lucide-react';

interface Asset {
  id: string;
  type: 'product_image' | 'quote_documentation' | 'invoice';
  assetUrl: string;
  description?: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const asset: Asset = {
    id: params.id!,
    type: 'product_image',
    assetUrl: 'https://example.com/image.jpg',
    description: 'Product image description',
  };

  return json({ asset });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement asset update
  return json({ success: true });
}

export default function EditAssetPage() {
  const { asset } = useLoaderData<typeof loader>();

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
            <CardTitle>Edit Asset</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">Asset Type</Label>
                <Select name="type" defaultValue={asset.type} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product_image">Product Image</SelectItem>
                    <SelectItem value="quote_documentation">Documentation</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={asset.description}
                  placeholder="Enter asset description"
                />
              </div>

              <div className="space-y-2">
                <Label>Preview</Label>
                {asset.type === 'product_image' ? (
                  <img
                    src={asset.assetUrl}
                    alt="Asset preview"
                    className="w-full max-w-md rounded-lg"
                  />
                ) : (
                  <div className="p-4 bg-muted rounded-lg">
                    <a
                      href={asset.assetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View File
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/assets">Cancel</Link>
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}