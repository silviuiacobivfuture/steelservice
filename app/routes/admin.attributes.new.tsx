import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { ChevronLeft, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface MeasurementUnit {
  id: string;
  unit: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const units: MeasurementUnit[] = [
    { id: '1', unit: 'mm' },
    { id: '2', unit: 'MPa' },
    { id: '3', unit: 'HRC' },
  ];

  return json({ units });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement attribute creation
  return json({ success: true });
}

export default function NewAttributePage() {
  const { units } = useLoaderData<typeof loader>();
  const [selectionValues, setSelectionValues] = useState<string[]>([]);
  const [newValue, setNewValue] = useState('');

  const handleAddValue = () => {
    if (newValue.trim()) {
      setSelectionValues([...selectionValues, newValue.trim()]);
      setNewValue('');
    }
  };

  const handleRemoveValue = (index: number) => {
    setSelectionValues(selectionValues.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/attributes">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Attributes
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Technical Attribute</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Attribute Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter attribute name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="var">Variable Name</Label>
                <Input
                  id="var"
                  name="var"
                  placeholder="e.g., tensile_strength"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Used in formulas and calculations. Use snake_case.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Measurement Unit</Label>
                <Select name="unitId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Selection Values</Label>
                <div className="flex gap-2">
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Add a selection value"
                  />
                  <Button type="button" onClick={handleAddValue}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectionValues.map((value, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {value}
                      <button
                        type="button"
                        onClick={() => handleRemoveValue(index)}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <input
                        type="hidden"
                        name="selectionValues[]"
                        value={value}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/attributes">Cancel</Link>
                </Button>
                <Button type="submit">Create Attribute</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}