import { Link } from '@remix-run/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
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
  };
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

export default function ProductCard({ 
  product, 
  isFavorite, 
  onToggleFavorite,
  className 
}: ProductCardProps) {
  return (
    <Card className={cn("group overflow-hidden", className)}>
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={product.images[0]?.asset.assetUrl}
            alt={product.description}
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 hover:bg-white"
              onClick={() => onToggleFavorite?.(product.id)}
            >
              <Heart 
                className={cn(
                  "h-5 w-5",
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                )} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 hover:bg-white"
              asChild
            >
              <Link to={`/products/${product.id}/certificate`}>
                <Download className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">
          {product.material.name}
        </Badge>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.description}
        </h3>
        <div className="space-y-2 mb-4">
          {product.attributes.map((attr, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{attr.attribute.name}:</span>
              <span className="font-medium">
                {attr.attribute.var} {attr.attribute.unit.unit}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link to={`/quote?product=${product.id}`}>
              Request Quote
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/products/${product.id}`}>
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}