import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Heart, FileText } from 'lucide-react';
import GetInTouch from '@/components/GetInTouch';

interface ProductAttribute {
  insertableForQuotation: boolean;
  attribute: {
    name: string;
    var: string;
    unit: {
      unit: string;
    };
  };
}

interface Product {
  id: string;
  description: string;
  material: {
    name: string;
  };
  attributes: ProductAttribute[];
  images: Array<{
    asset: {
      assetUrl: string;
    };
  }>;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const product: Product = {
    id: params.id!,
    description: 'High-strength structural steel plate',
    material: {
      name: 'Carbon Steel',
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
    images: [
      {
        asset: {
          assetUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80',
        },
      },
    ],
  };

  return json({ product });
}

export default function ProductDetailPage() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={product.images[0]?.asset.assetUrl}
                alt={product.description}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary focus:border-primary focus:outline-none"
                >
                  <img
                    src={image.asset.assetUrl}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.material.name}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.description}</h1>
            </div>

            <Tabs defaultValue="specifications">
              <TabsList>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
              </TabsList>
              <TabsContent value="specifications" className="space-y-4">
                {product.attributes.map((attr, index) => (
                  <div key={index} className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">{attr.attribute.name}</span>
                    <span className="font-medium">
                      {attr.attribute.var} {attr.attribute.unit.unit}
                    </span>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="documentation">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/products/${product.id}/certificate`}>
                      <FileText className="h-4 w-4 mr-2" />
                      Quality Certificate
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Technical Data Sheet
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4">
              <Button className="flex-1">Request Quote</Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <GetInTouch />
    </div>
  );
}