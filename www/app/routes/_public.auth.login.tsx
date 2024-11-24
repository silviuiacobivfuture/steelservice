import { json, type ActionFunctionArgs } from '@remix-run/node';
import {Form, Link, useActionData, useLoaderData} from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import {authenticator, isProviderEnabled} from "@/.server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate("form", request, {
    successRedirect: "/profile",
    failureRedirect: "/auth/login",
  });
}

export async function loader() {
  return json({
    enabledProviders: {
      google: isProviderEnabled("google"),
      facebook: isProviderEnabled("facebook"),
    },
  });
}


export default function LoginPage() {
  const { enabledProviders } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const hasSocialProviders = enabledProviders.google || enabledProviders.facebook;

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
            {hasSocialProviders && (
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Or continue with
                </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {enabledProviders.facebook && (
                        <Form action="/auth/facebook" method="post">
                          <button
                              type="submit"
                              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            Facebook
                          </button>
                        </Form>
                    )}

                    {enabledProviders.google && (
                        <Form action="/auth/google" method="post">
                          <button
                              type="submit"
                              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            Google
                          </button>
                        </Form>
                    )}
                  </div>
                </div>
            )}
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}