import { useSearchParams } from '@remix-run/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams();
    const search = searchParams.get('search');
    if (search) newParams.set('search', search);
    setSearchParams(newParams);
  };

  const hasFilters = ['category', 'material', 'inStock'].some(key => 
    searchParams.has(key)
  );

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 lg:px-3"
          >
            Clear
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={searchParams.get('category') || 'all'}
            onValueChange={(value) => handleFilterChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Structural Steel">Structural Steel</SelectItem>
              <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
              <SelectItem value="Carbon Steel">Carbon Steel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Material</Label>
          <Select
            value={searchParams.get('material') || 'all'}
            onValueChange={(value) => handleFilterChange('material', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Materials" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Materials</SelectItem>
              <SelectItem value="Carbon Steel">Carbon Steel</SelectItem>
              <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
              <SelectItem value="Alloy Steel">Alloy Steel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="inStock">In Stock Only</Label>
          <Switch
            id="inStock"
            checked={searchParams.get('inStock') === 'true'}
            onCheckedChange={(checked) => 
              handleFilterChange('inStock', checked ? 'true' : null)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}