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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2 } from 'lucide-react';
import type { QuoteProduct } from './QuoteForm';

interface QuoteProductSectionProps {
  products: QuoteProduct[];
  services: Array<{ id: string; name: string }>;
  onAddProduct: () => void;
  onRemoveProduct: (id: string) => void;
}

export default function QuoteProductSection({
  products,
  services,
  onAddProduct,
  onRemoveProduct,
}: QuoteProductSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>Add products to your quote request</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Product {index + 1}</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveProduct(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product</Label>
                  <Select name={`products[${index}].productId`} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* TODO: Add products from loader */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    name={`products[${index}].quantity`}
                    min="1"
                    defaultValue="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Services</Label>
                <Select name={`products[${index}].services`} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select services" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Additional Comments</Label>
                <Textarea
                  name={`products[${index}].comments`}
                  placeholder="Any specific requirements or notes"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={onAddProduct}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </CardContent>
    </Card>
  );
}