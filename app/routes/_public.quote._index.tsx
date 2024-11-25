import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import GetInTouch from '@/components/GetInTouch';
import { useState } from 'react';

interface QuoteItem {
  id: string;
  productGrade: string;
  thickness: string;
  length: string;
  width: string;
  quantity: number;
  notes: string;
}

interface ActionSuccess {
  success: boolean;
}

interface ActionFailure {
  errors: Record<string, string>;
}

type ActionData = ActionSuccess | ActionFailure;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Validate form data
  const errors: Record<string, string> = {};
  if (!data.email) errors.email = 'Email is required';
  if (!data.quoteType) errors.quoteType = 'Quote type is required';
  if (!data.firstName) errors.firstName = 'First name is required';
  if (!data.lastName) errors.lastName = 'Last name is required';
  if (!data.streetAddress) errors.streetAddress = 'Street address is required';
  if (!data.country) errors.country = 'Country is required';
  if (!data.city) errors.city = 'City is required';
  if (!data.state) errors.state = 'State is required';
  if (!data.zipCode) errors.zipCode = 'ZIP code is required';
  if (!data.phoneNumber) errors.phoneNumber = 'Phone number is required';

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // TODO: Handle quote submission
  return json({ success: true });
}

export default function QuotePage() {
  const actionData = useActionData<ActionData>();
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: '1',
      productGrade: '',
      thickness: '',
      length: '',
      width: '',
      quantity: 1,
      notes: '',
    },
  ]);

  const handleItemChange = (id: string, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    setItems([...items, {
      id: String(items.length + 1),
      productGrade: '',
      thickness: '',
      length: '',
      width: '',
      quantity: 1,
      notes: '',
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Request a Quote</h1>
        
        <Form method="post" className="space-y-8">
          {/* Quote Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Products</h2>
            {items.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Item {item.id}</CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Product Grade</Label>
                      <Select
                        name={`productGrade_${item.id}`}
                        value={item.productGrade}
                        onValueChange={(value) => handleItemChange(item.id, 'productGrade', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar400">AR400</SelectItem>
                          <SelectItem value="ar450">AR450</SelectItem>
                          <SelectItem value="ar500">AR500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Thickness (mm)</Label>
                      <Input
                        name={`thickness_${item.id}`}
                        type="number"
                        value={item.thickness}
                        onChange={(e) => handleItemChange(item.id, 'thickness', e.target.value)}
                        placeholder="Enter thickness"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Length (mm)</Label>
                      <Input
                        name={`length_${item.id}`}
                        type="number"
                        value={item.length}
                        onChange={(e) => handleItemChange(item.id, 'length', e.target.value)}
                        placeholder="Enter length"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Width (mm)</Label>
                      <Input
                        name={`width_${item.id}`}
                        type="number"
                        value={item.width}
                        onChange={(e) => handleItemChange(item.id, 'width', e.target.value)}
                        placeholder="Enter width"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        name={`quantity_${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea
                      name={`notes_${item.id}`}
                      value={item.notes}
                      onChange={(e) => handleItemChange(item.id, 'notes', e.target.value)}
                      placeholder="Additional comments or requirements"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addItem} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Item
            </Button>
          </div>

          {/* Quote Details */}
          <Card>
            <CardHeader>
              <CardTitle>Quote Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    aria-invalid={actionData && 'errors' in actionData && actionData.errors.email ? true : undefined}
                  />
                  {actionData && 'errors' in actionData && actionData.errors.email && (
                    <p className="text-sm text-red-500">{actionData.errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Quote Type</Label>
                  <Select name="quoteType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select quote type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Quote</SelectItem>
                      <SelectItem value="rush">Rush Quote</SelectItem>
                      <SelectItem value="budget">Budget Quote</SelectItem>
                    </SelectContent>
                  </Select>
                  {actionData && 'errors' in actionData && actionData.errors.quoteType && (
                    <p className="text-sm text-red-500">{actionData.errors.quoteType}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Remarks</Label>
                <Textarea
                  name="remarks"
                  placeholder="Any additional information"
                />
              </div>
              <div className="space-y-2">
                <Label>Reference Number</Label>
                <Input
                  name="reference"
                  placeholder="Your reference number"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    required
                    aria-invalid={actionData && 'errors' in actionData && actionData.errors.firstName ? true : undefined}
                  />
                  {actionData && 'errors' in actionData && actionData.errors.firstName && (
                    <p className="text-sm text-red-500">{actionData.errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    name="lastName"
                    required
                    aria-invalid={actionData && 'errors' in actionData && actionData.errors.lastName ? true : undefined}
                  />
                  {actionData && 'errors' in actionData && actionData.errors.lastName && (
                    <p className="text-sm text-red-500">{actionData.errors.lastName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input name="company" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Street Address</Label>
                <Input
                  name="streetAddress"
                  required
                  aria-invalid={actionData && 'errors' in actionData && actionData.errors.streetAddress ? true : undefined}
                />
                {actionData && 'errors' in actionData && actionData.errors.streetAddress && (
                  <p className="text-sm text-red-500">{actionData.errors.streetAddress}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Street Address 2</Label>
                <Input name="streetAddress2" />
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select name="country">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                    </SelectContent>
                  </Select>
                  {actionData && 'errors' in actionData && actionData.errors.country && (
                    <p className="text-sm text-red-500">{actionData.errors.country}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    name="city"
                    required
                    aria-invalid={actionData && 'errors' in actionData && actionData.errors.city ? true : undefined}
                  />
                  {actionData && 'errors' in actionData && actionData.errors.city && (
                    <p className="text-sm text-red-500">{actionData.errors.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>State/Province</Label>
                  <Input
                    name="state"
                    required
                    aria-invalid={actionData && 'errors' in actionData && actionData.errors.state ? true : undefined}
                  />
                  {actionData && 'errors' in actionData && actionData.errors.state && (
                    <p className="text-sm text-red-500">{actionData.errors.state}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>ZIP/Postal Code</Label>
                  <Input
                    name="zipCode"
                    required
                    aria-invalid={actionData && 'errors' in actionData && actionData.errors.zipCode ? true : undefined}
                  />
                  {actionData && 'errors' in actionData && actionData.errors.zipCode && (
                    <p className="text-sm text-red-500">{actionData.errors.zipCode}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  name="phoneNumber"
                  type="tel"
                  required
                  aria-invalid={actionData && 'errors' in actionData && actionData.errors.phoneNumber ? true : undefined}
                />
                {actionData && 'errors' in actionData && actionData.errors.phoneNumber && (
                  <p className="text-sm text-red-500">{actionData.errors.phoneNumber}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full">
            Submit Quote Request
          </Button>
        </Form>
      </div>
      <GetInTouch />
    </>
  );
}