import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../.server/auth.server";


export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate("facebook", request, {
    successRedirect: "/profile",
    failureRedirect: "/login",
  });
}