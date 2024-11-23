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
import {UserProvider} from "@/context/userContext";
import {sessionStorage} from "@/.server/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export let loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const user = session.get("user") || null;

  return json({ user });
};


export default function App() {
  const { user } = useLoaderData<typeof loader>();


  return (
      <UserProvider user={user}>
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Theme>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Theme>
      </body>
    </html>
      </UserProvider>
  );
}