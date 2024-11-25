import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function QuoteDetails() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label>Status</Label>
            <div className="mt-2">
              <Select defaultValue="analysis">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="analysis">Analysis</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Type</Label>
            <div className="mt-2">
              <Badge>Standard Quote</Badge>
            </div>
          </div>

          <div>
            <Label>Created Date</Label>
            <div className="mt-2 text-sm">March 15, 2024</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Client</Label>
            <div className="mt-2">
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-sm text-muted-foreground">john@example.com</div>
            </div>
          </div>

          <div>
            <Label>Assigned Agent</Label>
            <div className="mt-2">
              <Select defaultValue="sarah">
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Wilson</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                  <SelectItem value="anna">Anna Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Internal Reference</Label>
            <div className="mt-2 text-sm">REF-2024-001</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel Changes</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}