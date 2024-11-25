import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@remix-run/react';
import { ChevronLeft } from 'lucide-react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement formula creation
  return json({ success: true });
}

export default function NewFormulaPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/formulas">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Formulas
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Calculator Formula</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Formula Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter formula name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter formula description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calculates">Calculates</Label>
                <Input
                  id="calculates"
                  name="calculates"
                  placeholder="e.g., weight, area, volume"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formula">Formula</Label>
                <Textarea
                  id="formula"
                  name="formula"
                  placeholder="Enter mathematical formula"
                  required
                  className="font-mono"
                />
                <p className="text-sm text-muted-foreground">
                  Use variable names separated by operators (e.g., length * width * thickness)
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/formulas">Cancel</Link>
                </Button>
                <Button type="submit">Create Formula</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}