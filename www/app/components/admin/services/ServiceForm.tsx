import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ServiceForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Service Name</Label>
        <Input id="name" placeholder="Enter service name" />
      </div>

      <div className="space-y-2">
        <Label>Associated Products</Label>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carbon">Carbon Steel</SelectItem>
                <SelectItem value="stainless">Stainless Steel</SelectItem>
                <SelectItem value="alloy">Alloy Steel</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter service description"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Service</Button>
      </div>
    </div>
  );
}