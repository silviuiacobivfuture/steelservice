import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@remix-run/react';
import { ChevronLeft, Plus, Trash2, Upload } from 'lucide-react';

interface LoaderData {
  materials: Array<{
    id: string;
    name: string;
  }>;
  attributes: Array<{
    id: string;
    name: string;
    unit: {
      unit: string;
    };
  }>;
  services: Array<{
    id: string;
    name: string;
  }>;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma queries
  const data: LoaderData = {
    materials: [
      { id: '1', name: 'Carbon Steel' },
      { id: '2', name: 'Stainless Steel' },
    ],
    attributes: [
      { id: '1', name: 'Thickness', unit: { unit: 'mm' } },
      { id: '2', name: 'Width', unit: { unit: 'mm' } },
    ],
    services: [
      { id: '1', name: 'Cutting' },
      { id: '2', name: 'Heat Treatment' },
    ],
  };

  return json(data);
}

export default function NewProductPage() {
  const { materials, attributes, services } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/products">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Select name="materialId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Technical Attributes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Technical Attributes</h3>
                <div className="space-y-4">
                  {attributes.map((attr) => (
                    <div key={attr.id} className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label>{attr.name}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            name={`attributes[${attr.id}].value`}
                            placeholder={`Enter ${attr.name.toLowerCase()}`}
                          />
                          <span className="text-sm text-muted-foreground">
                            {attr.unit.unit}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <Label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name={`attributes[${attr.id}].quotable`}
                          />
                          Quotable
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Available Services</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {services.map((service) => (
                    <Label
                      key={service.id}
                      className="flex items-center gap-2 p-4 border rounded-lg"
                    >
                      <input
                        type="checkbox"
                        name="services[]"
                        value={service.id}
                      />
                      {service.name}
                    </Label>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Product Images</h3>
                <div className="grid w-full gap-1.5">
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('images')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/products">Cancel</Link>
                </Button>
                <Button type="submit">Create Product</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}