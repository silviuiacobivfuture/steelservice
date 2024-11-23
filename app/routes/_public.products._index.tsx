import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import GetInTouch from '@/components/GetInTouch';
import type { Product } from '@/types';

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual API call
  const products: Product[] = [
    {
      id: '1',
      description: 'High-strength structural steel plate',
      materialId: 'm1',
      material: {
        name: 'Carbon Steel',
        attributes: [
          {
            attribute: {
              name: 'Yield Strength',
              var: 'yield_strength',
              unit: { unit: 'MPa' },
            },
          },
        ],
      },
      attributes: [
        {
          insertableForQuotation: true,
          attribute: {
            name: 'Thickness',
            var: 'thickness',
            unit: { unit: 'mm' },
          },
        },
      ],
    },
  ];

  return json({ products });
}

export default function ProductsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Steel Products</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <img
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80"
                  alt={product.description}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-4">{product.material.name}</CardTitle>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="space-y-2">
                  {product.attributes.map((attr, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{attr.attribute.name}:</span>
                      <span className="font-medium">
                        {attr.attribute.var} {attr.attribute.unit.unit}
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <GetInTouch />
    </>
  );
}