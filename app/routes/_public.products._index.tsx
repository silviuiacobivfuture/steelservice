import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import ProductFilters from '@/components/products/ProductFilters';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
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

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const products: Product[] = [
    {
      id: '1',
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
    },
    // Add more mock products...
  ];

  // TODO: Get favorites from user session
  const favorites: string[] = [];

  return json({ products, favorites });
}

export default function ProductsPage() {
  const { products, favorites: initialFavorites } = useLoaderData<typeof loader>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);

  const handleFilterChange = (newFilters: Record<string, string[]>) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery && !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply active filters
    return Object.entries(activeFilters).every(([key, values]) => {
      if (values.length === 0) return true;
      
      switch (key) {
        case 'material':
          return values.includes(product.material.name.toLowerCase());
        // Add more filter cases as needed
        default:
          return true;
      }
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Steel Products</h1>
            <p className="text-lg opacity-90 mb-8">
              Browse our extensive collection of high-quality steel products
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary">Request Quote</Button>
              <Button variant="outline">Download Catalog</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <ProductFilters
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </div>

      <GetInTouch />
    </div>
  );
}