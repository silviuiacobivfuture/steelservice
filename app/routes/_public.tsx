import { Outlet, useLoaderData } from "@remix-run/react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";
import { LoaderFunction } from "@remix-run/node";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "@/.server/domain.server";
import {sessionStorage} from "@/.server/session.server";

export let loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const userSession = session.get("user") || null;
  if(userSession) {
    return json({ quotesTotal: await prisma.quote.count() });
  }
  return json({ quotesTotal: -1 });
};

export default function PublicLayout() {
  const { quotesTotal } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar quotesTotal={quotesTotal} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}