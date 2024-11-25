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
  // TODO: Implement customer creation
  return json({ success: true });
}

export default function NewCustomerPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/customers">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Company Name</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Enter any additional notes about the customer"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/customers">Cancel</Link>
                </Button>
                <Button type="submit">Create Customer</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}