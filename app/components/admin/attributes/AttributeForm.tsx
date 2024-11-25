import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function AttributeForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Attribute Name</Label>
        <Input id="name" placeholder="Enter attribute name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="var">Variable Name</Label>
        <Input id="var" placeholder="e.g., tensile_strength" />
        <p className="text-sm text-muted-foreground">
          Used in formulas and calculations. Use snake_case.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Measurement Unit</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mpa">MPa (Megapascal)</SelectItem>
            <SelectItem value="hrc">HRC (Rockwell C)</SelectItem>
            <SelectItem value="mm">mm (Millimeter)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Selection Values</Label>
        <div className="flex items-center gap-2">
          <Input placeholder="Add a selection value" />
          <Button variant="outline">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="gap-1">
            200-300
            <button className="ml-1">
              <X className="h-3 w-3" />
            </button>
          </Badge>
          <Badge variant="secondary" className="gap-1">
            300-400
            <button className="ml-1">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Associated Materials</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select material" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="carbon">Carbon Steel</SelectItem>
            <SelectItem value="stainless">Stainless Steel</SelectItem>
            <SelectItem value="alloy">Alloy Steel</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="gap-1">
            Carbon Steel
            <button className="ml-1">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Attribute</Button>
      </div>
    </div>
  );
}