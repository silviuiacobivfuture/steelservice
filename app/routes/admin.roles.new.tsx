import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement role creation
  return json({ success: true });
}

export default function NewRolePage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/roles">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Roles
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Role</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter role name"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/roles">Cancel</Link>
                </Button>
                <Button type="submit">Create Role</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}