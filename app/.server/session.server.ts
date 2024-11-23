import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "user",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        secrets: [process.env.SESSION_SECRET!], // Add to .env file
    },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
