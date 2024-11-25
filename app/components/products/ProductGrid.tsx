import { useState } from 'react';
import ProductCard from './ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface ProductGridProps {
  products: Product[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function ProductGrid({ products, favorites, onToggleFavorite }: ProductGridProps) {
  const [sortBy, setSortBy] = useState('newest');

  const sortProducts = (products: Product[]) => {
    switch (sortBy) {
      case 'name':
        return [...products].sort((a, b) => a.description.localeCompare(b.description));
      case 'material':
        return [...products].sort((a, b) => a.material.name.localeCompare(b.material.name));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} products
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="material">Material</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}