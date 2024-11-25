import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  onFilterChange: (filters: any) => void;
  activeFilters: Record<string, string[]>;
  onClearFilters: () => void;
}

export default function ProductFilters({ onFilterChange, activeFilters, onClearFilters }: FilterProps) {
  const [dimensionRange, setDimensionRange] = useState({ min: '', max: '' });

  const handleDimensionChange = (type: 'min' | 'max', value: string) => {
    const newRange = { ...dimensionRange, [type]: value };
    setDimensionRange(newRange);
    if (newRange.min && newRange.max) {
      onFilterChange({ dimension: [`${newRange.min}-${newRange.max}`] });
    }
  };

  const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0);

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Material Type */}
        <div className="space-y-2">
          <Label>Material Type</Label>
          <Select onValueChange={(value) => onFilterChange({ material: [value] })}>
            <SelectTrigger>
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="carbon">Carbon Steel</SelectItem>
              <SelectItem value="stainless">Stainless Steel</SelectItem>
              <SelectItem value="alloy">Alloy Steel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grade */}
        <div className="space-y-2">
          <Label>Grade</Label>
          <Select onValueChange={(value) => onFilterChange({ grade: [value] })}>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a36">A36</SelectItem>
              <SelectItem value="a572">A572</SelectItem>
              <SelectItem value="a514">A514</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dimensions */}
        <div className="space-y-2">
          <Label>Thickness Range (mm)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={dimensionRange.min}
              onChange={(e) => handleDimensionChange('min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={dimensionRange.max}
              onChange={(e) => handleDimensionChange('max', e.target.value)}
            />
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <Label>Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([key, values]) =>
                values.map((value) => (
                  <Badge key={`${key}-${value}`} variant="secondary">
                    {key}: {value}
                    <button
                      onClick={() => onFilterChange({ [key]: values.filter(v => v !== value) })}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}