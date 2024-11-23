import {LoaderFunction, redirect} from "@remix-run/node";
import { sessionStorage } from "@/.server/session.server";

export let loader: LoaderFunction = async ({ request }) => {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    return redirect("/", {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
        },
    });
};