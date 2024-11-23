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
import { Textarea } from "@/components/ui/textarea";

export default function MaterialForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Material Name</Label>
        <Input id="name" placeholder="Enter material name" />
      </div>

      <div className="space-y-2">
        <Label>Technical Attributes</Label>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select attribute" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tensile">Tensile Strength</SelectItem>
                <SelectItem value="hardness">Hardness</SelectItem>
                <SelectItem value="thickness">Thickness</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mpa">MPa</SelectItem>
                <SelectItem value="hrc">HRC</SelectItem>
                <SelectItem value="mm">mm</SelectItem>
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
          placeholder="Enter material description"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Material</Button>
      </div>
    </div>
  );
}