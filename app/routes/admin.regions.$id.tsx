import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Region {
  id: string;
  name: string;
  countryId: string;
}

interface Country {
  id: string;
  name: string;
}

interface LoaderData {
  region: Region;
  countries: Country[];
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma queries
  const region: Region = {
    id: params.id!,
    name: 'California',
    countryId: 'us',
  };

  const countries: Country[] = [
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
    { id: 'mx', name: 'Mexico' },
  ];

  return json({ region, countries });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement region update
  return json({ success: true });
}

export default function EditRegionPage() {
  const { region, countries } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/regions">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Regions
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Region</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Region Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={region.name}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select name="countryId" defaultValue={region.countryId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link to="/admin/regions">Cancel</Link>
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