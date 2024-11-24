import {json, LinksFunction, LoaderFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useLoaderData,
} from "@remix-run/react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import styles from "./styles/index.css";
import { AuthProvider } from "./contexts/auth";
import {UserProvider} from "@/context/userContext";
import {sessionStorage} from "@/.server/session.server";
import { prisma } from "./.server/domain.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export let loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const userSession = session.get("user") || null;
  console.log(userSession, 'userSession');
  if(userSession && userSession.id) {
    const userData = await prisma.user.findUnique({
      where: {
        id: userSession.id
      },
      include: {
        profile: true,
      }
    });
    return json(userData);
  }
  return json(null);
};


export default function App() {
  const userData = useLoaderData<typeof loader>();

  return (
      <UserProvider user={userData}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
          </head>
          <body>
            <Theme>
              <AuthProvider>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
              </AuthProvider>
            </Theme>
          </body>
        </html>
   </UserProvider>
  );
}