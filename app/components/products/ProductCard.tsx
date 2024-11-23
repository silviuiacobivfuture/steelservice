import { Link } from '@remix-run/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowRight } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: (productId: string, action: 'add' | 'remove') => void;
}

export default function ProductCard({ product, isWishlisted, onWishlistToggle }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white"
            onClick={() => onWishlistToggle(
              product.id,
              isWishlisted ? 'remove' : 'add'
            )}
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'
              }`}
            />
          </Button>
          {!product.inStock && (
            <Badge 
              variant="destructive" 
              className="absolute bottom-2 right-2"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2 mb-4">
          <Badge variant="secondary">{product.category}</Badge>
          <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Material:</span>{' '}
            <span className="font-medium">{product.material.name}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Grade:</span>{' '}
            <span className="font-medium">{product.material.grade}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link to={`/quote?product=${product.id}`}>
              Request Quote
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/products/${product.id}`}>
              <span className="sr-only">View Details</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}