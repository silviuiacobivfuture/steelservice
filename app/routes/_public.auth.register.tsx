import { useState } from 'react';
import {json, type ActionFunctionArgs, redirect} from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import {prisma} from "@/.server/domain.server";
import bcrypt from "bcryptjs";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  // Validate form data
  const errors: Record<string, string> = {};
  if (!data.firstName) errors.firstName = 'First name is required';
  if (!data.lastName) errors.lastName = 'Last name is required';
  if (!data.email) errors.email = 'Email is required';
  if (!data.phoneNumber) errors.phoneNumber = 'Phone number is required';
  if (!data.addressOne) errors.addressOne = 'Address is required';
  if (!data.postalCode) errors.postalCode = 'Postal code is required';
  if (!data.password) errors.password = 'Password is required';
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const hashedPassword = await bcrypt.hash(data.password as string, 10);

  const response = await prisma.user.create({
    data: {
      email: data.email as string,
      localUser: {
        create: {
          password: hashedPassword,
        }
      },
      profile: {
        create: {
          email: data.email as string,
          firstName: data.firstName as string,
          lastName: data.lastName as string,
          phoneNumber: data.phoneNumber as string,
          addressOne: data.addressOne as string,
          addressTwo: data.addressTwo as string,
          postalCode: data.postalCode as string,
          entityType: {
            create: {
              name: 'Individual',
            }
          },
          country: {
            create: {
              name: 'Romania',
            }
          }
        }
      },
    },
  })

  if(!response) {
    return json({ errors: { email: 'Email is already in use' } });
  }

  return redirect('/auth/login');
}

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressOne: '',
    addressTwo: '',
    postalCode: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">SteelService</span>
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <Form method="post">
          <CardContent className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  aria-invalid={actionData?.errors?.firstName ? true : undefined}
                  aria-errormessage={actionData?.errors?.firstName ? "firstName-error" : undefined}
                />
                {actionData?.errors?.firstName && (
                  <p className="text-sm text-red-500" id="firstName-error">
                    {actionData.errors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  aria-invalid={actionData?.errors?.lastName ? true : undefined}
                  aria-errormessage={actionData?.errors?.lastName ? "lastName-error" : undefined}
                />
                {actionData?.errors?.lastName && (
                  <p className="text-sm text-red-500" id="lastName-error">
                    {actionData.errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-errormessage={actionData?.errors?.email ? "email-error" : undefined}
              />
              {actionData?.errors?.email && (
                <p className="text-sm text-red-500" id="email-error">
                  {actionData.errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                aria-invalid={actionData?.errors?.phoneNumber ? true : undefined}
                aria-errormessage={actionData?.errors?.phoneNumber ? "phoneNumber-error" : undefined}
              />
              {actionData?.errors?.phoneNumber && (
                <p className="text-sm text-red-500" id="phoneNumber-error">
                  {actionData.errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressOne">Address line 1</Label>
              <Input
                id="addressOne"
                name="addressOne"
                value={formData.addressOne}
                onChange={handleChange}
                required
                aria-invalid={actionData?.errors?.addressOne ? true : undefined}
                aria-errormessage={actionData?.errors?.addressOne ? "addressOne-error" : undefined}
              />
              {actionData?.errors?.addressOne && (
                <p className="text-sm text-red-500" id="addressOne-error">
                  {actionData.errors.addressOne}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressTwo">Address line 2 (optional)</Label>
              <Input
                id="addressTwo"
                name="addressTwo"
                value={formData.addressTwo}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                aria-invalid={actionData?.errors?.postalCode ? true : undefined}
                aria-errormessage={actionData?.errors?.postalCode ? "postalCode-error" : undefined}
              />
              {actionData?.errors?.postalCode && (
                <p className="text-sm text-red-500" id="postalCode-error">
                  {actionData.errors.postalCode}
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-invalid={actionData?.errors?.password ? true : undefined}
                  aria-errormessage={actionData?.errors?.password ? "password-error" : undefined}
                />
                {actionData?.errors?.password && (
                  <p className="text-sm text-red-500" id="password-error">
                    {actionData.errors.password}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  aria-invalid={actionData?.errors?.confirmPassword ? true : undefined}
                  aria-errormessage={actionData?.errors?.confirmPassword ? "confirmPassword-error" : undefined}
                />
                {actionData?.errors?.confirmPassword && (
                  <p className="text-sm text-red-500" id="confirmPassword-error">
                    {actionData.errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Create account
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}