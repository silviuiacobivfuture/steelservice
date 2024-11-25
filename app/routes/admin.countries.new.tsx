import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@remix-run/react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement country creation
  return json({ success: true });
}

export default function NewCountryPage() {
  const [regions, setRegions] = useState<string[]>([]);

  const addRegion = () => {
    setRegions([...regions, '']);
  };

  const removeRegion = (index: number) => {
    setRegions(regions.filter((_, i) => i !== index));
  };

  const updateRegion = (index: number, value: string) => {
    const newRegions = [...regions];
    newRegions[index] = value;
    setRegions(newRegions);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/countries">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Countries
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Country</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Country Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter country name"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Regions</Label>
                  <Button type="button" variant="outline" onClick={addRegion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Region
                  </Button>
                </div>

                {regions.map((region, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      name={`regions[${index}]`}
                      value={region}
                      onChange={(e) => updateRegion(index, e.target.value)}
                      placeholder="Enter region name"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRegion(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/countries">Cancel</Link>
                </Button>
                <Button type="submit">Create Country</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}