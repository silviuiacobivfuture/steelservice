import {LinksFunction, } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, 
} from "@remix-run/react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import styles from "./styles/index.css";
import { AuthProvider } from "./contexts/auth";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function App() {
  return (
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
  );
}