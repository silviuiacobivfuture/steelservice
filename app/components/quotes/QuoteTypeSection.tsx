import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuoteTypeSectionProps {
  quoteTypes: Array<{ id: string; name: string }>;
}

export default function QuoteTypeSection({ quoteTypes }: QuoteTypeSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Type</CardTitle>
        <CardDescription>Select the type of quote you need</CardDescription>
      </CardHeader>
      <CardContent>
        <Select name="quoteType" required>
          <SelectTrigger>
            <SelectValue placeholder="Select quote type" />
          </SelectTrigger>
          <SelectContent>
            {quoteTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}