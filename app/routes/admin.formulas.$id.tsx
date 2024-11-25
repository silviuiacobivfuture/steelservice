import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@remix-run/react';
import { ChevronLeft } from 'lucide-react';

interface CalculatorFormula {
  id: string;
  name: string;
  description?: string;
  calculates: string;
  formula: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const formula: CalculatorFormula = {
    id: params.id!,
    name: 'Steel Weight',
    description: 'Calculate steel plate weight',
    calculates: 'weight',
    formula: 'length * width * thickness * density',
  };

  return json({ formula });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement formula update
  return json({ success: true });
}

export default function EditFormulaPage() {
  const { formula } = useLoaderData<typeof loader>();

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
            <CardTitle>Edit Calculator Formula</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Formula Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={formula.name}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={formula.description}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calculates">Calculates</Label>
                <Input
                  id="calculates"
                  name="calculates"
                  defaultValue={formula.calculates}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formula">Formula</Label>
                <Textarea
                  id="formula"
                  name="formula"
                  defaultValue={formula.formula}
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
                <Button type="submit">Save Changes</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}