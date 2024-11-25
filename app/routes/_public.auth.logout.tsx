import { authenticator } from "@/.server/auth.server";
import {ActionFunctionArgs} from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
    await authenticator.logout(request, { redirectTo: "/auth/login" });
}