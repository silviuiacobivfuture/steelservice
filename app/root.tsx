import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
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
import appStylesHref from "./tailwind.css";

import "./.server/domain.server";

export const action = async () => {
  
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
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
					<>
            <div>
              <Outlet />
            </div>

            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </>
				</Theme>
      </body>
    </html>
  );
}
