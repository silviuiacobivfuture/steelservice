import { useState } from 'react';
import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // Validate form data
  const errors: { email?: string; password?: string } = {};
  if (!email) errors.email = 'Email is required';
  if (!password) errors.password = 'Password is required';

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // TODO: Implement actual authentication logic
  return json({ success: true });
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">SteelService</span>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <Form method="post">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
            <Link to="/auth/google" className="text-primary hover:underline">
             Login with Google
            </Link>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}