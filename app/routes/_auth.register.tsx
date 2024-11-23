import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { getUser, createUserSession } from "@/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  if (user) return redirect("/");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  // Validate form data
  const errors: Record<string, string> = {};
  if (!data.firstName) errors.firstName = "First name is required";
  if (!data.lastName) errors.lastName = "Last name is required";
  if (!data.email) errors.email = "Email is required";
  if (!data.phoneNumber) errors.phoneNumber = "Phone number is required";
  if (!data.addressOne) errors.addressOne = "Address is required";
  if (!data.postalCode) errors.postalCode = "Postal code is required";
  if (!data.password) errors.password = "Password is required";
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    // TODO: Implement actual registration
    // For now, we'll simulate a successful registration
    const userId = "new-user-id";
    return createUserSession(userId, "/");
  } catch (error) {
    return json(
      { errors: { form: "Failed to create account" } },
      { status: 500 }
    );
  }
}

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
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
                required
                aria-invalid={actionData?.errors?.firstName ? true : undefined}
              />
              {actionData?.errors?.firstName && (
                <p className="text-sm text-red-500">
                  {actionData.errors.firstName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                required
                aria-invalid={actionData?.errors?.lastName ? true : undefined}
              />
              {actionData?.errors?.lastName && (
                <p className="text-sm text-red-500">
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
              required
              aria-invalid={actionData?.errors?.email ? true : undefined}
            />
            {actionData?.errors?.email && (
              <p className="text-sm text-red-500">
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
              required
              aria-invalid={actionData?.errors?.phoneNumber ? true : undefined}
            />
            {actionData?.errors?.phoneNumber && (
              <p className="text-sm text-red-500">
                {actionData.errors.phoneNumber}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressOne">Address line 1</Label>
            <Input
              id="addressOne"
              name="addressOne"
              required
              aria-invalid={actionData?.errors?.addressOne ? true : undefined}
            />
            {actionData?.errors?.addressOne && (
              <p className="text-sm text-red-500">
                {actionData.errors.addressOne}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressTwo">Address line 2 (optional)</Label>
            <Input
              id="addressTwo"
              name="addressTwo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              required
              aria-invalid={actionData?.errors?.postalCode ? true : undefined}
            />
            {actionData?.errors?.postalCode && (
              <p className="text-sm text-red-500">
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
                required
                aria-invalid={actionData?.errors?.password ? true : undefined}
              />
              {actionData?.errors?.password && (
                <p className="text-sm text-red-500">
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
                required
                aria-invalid={actionData?.errors?.confirmPassword ? true : undefined}
              />
              {actionData?.errors?.confirmPassword && (
                <p className="text-sm text-red-500">
                  {actionData.errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
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
  );
}