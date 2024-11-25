import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import ProductCard from '@/components/products/ProductCard';

interface Product {
  id: string;
  description: string;
  material: {
    name: string;
  };
  attributes: Array<{
    attribute: {
      name: string;
      var: string;
      unit: {
        unit: string;
      };
    };
  }>;
  images: Array<{
    asset: {
      assetUrl: string;
    };
  }>;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual data fetch
  const favorites: Product[] = [
    {
      id: '1',
      description: 'High-strength structural steel plate',
      material: {
        name: 'Carbon Steel',
      },
      attributes: [
        {
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
    },
  ];

  return json({ favorites });
}

export default function FavoritesPage() {
  const { favorites } = useLoaderData<typeof loader>();

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Favorite Products</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={true}
              onToggleFavorite={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}