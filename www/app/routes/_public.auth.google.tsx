import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "../.server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate("google", request);
}