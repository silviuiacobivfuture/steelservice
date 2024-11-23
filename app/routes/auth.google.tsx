import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "@/.server/auth.google.server";

export let loader: LoaderFunction = async ({ request }) => {
    return authenticator.authenticate("google", request, {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
    });
};
