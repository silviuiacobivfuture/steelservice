import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";

interface Material {
  id: string;
  name: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const material: Material = {
    id: params.id!,
    name: 'Carbon Steel',
  };

  return json({ material });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement material update
  return json({ success: true });
}

export default function EditMaterialPage() {
  const { material } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/materials">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Materials
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Material</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Material Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={material.name}
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/materials">Cancel</Link>
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