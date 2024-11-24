import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import GetInTouch from '@/components/GetInTouch';
import type { Product } from '@/types';

export async function loader() {
  // TODO: Replace with actual API call
  const product: Product = {
    id: '1',
    description: 'High-strength structural steel plate suitable for construction and heavy machinery.',
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
        {
          attribute: {
            name: 'Tensile Strength',
            var: 'tensile_strength',
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
      {
        insertableForQuotation: true,
        attribute: {
          name: 'Width',
          var: 'width',
          unit: { unit: 'mm' },
        },
      },
      {
        insertableForQuotation: true,
        attribute: {
          name: 'Length',
          var: 'length',
          unit: { unit: 'mm' },
        },
      },
    ],
  };

  return json({ product });
}

export default function ProductDetailPage() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="container py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80"
              alt={product.description}
              className="w-full h-96 object-cover rounded-md shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.material.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Key Attributes */}
            <div className="space-y-2 mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Material Properties</h2>
              {product.material.attributes.map((attr, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-500">{attr.attribute.name}:</span>
                  <span className="font-medium text-gray-700">
                    {attr.attribute.var} {attr.attribute.unit.unit}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote Attributes */}
            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Request a Quote</h2>
              {product.attributes.map((attr, index) => (
                <div key={index} className="flex items-center gap-4">
                  <label className="text-sm text-gray-500 w-1/3">{attr.attribute.name}:</label>
                  <Input
                    type="number"
                    placeholder={`Enter ${attr.attribute.name.toLowerCase()}`}
                    className="flex-1"
                  />
                  <span className="text-gray-500">{attr.attribute.unit.unit}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button className="w-full">Request Quote</Button>
              <Badge variant="outline" className="text-gray-500">
                In Stock
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12">
        <GetInTouch />
      </footer>
    </>
  );
}
