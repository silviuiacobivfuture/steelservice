import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@remix-run/react';
import { ChevronLeft } from 'lucide-react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement unit creation
  return json({ success: true });
}

export default function NewUnitPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/units">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Units
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Measurement Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="unit">Unit Symbol</Label>
                <Input
                  id="unit"
                  name="unit"
                  placeholder="e.g., mm, kg, MPa"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="e.g., Millimeter, Kilogram, Megapascal"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/units">Cancel</Link>
                </Button>
                <Button type="submit">Create Unit</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}