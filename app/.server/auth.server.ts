import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "@/.server/session.server";
import { prisma } from "@/.server/domain.server";
import bcrypt from "bcryptjs";
import { User } from "@/types";


export const authenticator = new Authenticator<User>(sessionStorage);

if(process.env.ENABLE_LOCAL_AUTH === "true") {
    // Form Strategy for Local Authentication
    authenticator.use(
        new FormStrategy(async ({ form }) => {
            const email = form.get("email") as string;
        const password = form.get("password") as string;

        const user = await prisma.user.findUnique({ where: { email }, include: { localUser: true } });

        if (!user || !user.localUser || !user.localUser.password) throw new Error("Invalid credentials");

        const isValid = await bcrypt.compare(password, user.localUser.password);

        if (!isValid) throw new Error("Invalid credentials");

        return {
            id: user.id,
            email: user.email,
        };
    }),
        "form"
    );
}

// Google Strategy (Optional)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    authenticator.use(
        new OAuth2Strategy(
            {
                authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
                tokenEndpoint: "https://oauth2.googleapis.com/token",
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                redirectURI: "http://localhost:3000/auth/google/callback",
                scopes: ["openid" ,"profile","email"],
            },
            async ({ tokens }) => {
                const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${tokens.access_token}` },
                });
                const userData = await response.json();

                let user = await prisma.user.findUnique({
                    where: { email: userData.email },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email: userData.email,
                            socialUser: {
                                create: {
                                    providerName: "google",
                                    email: userData.email,
                                },
                            }
                        },
                    });
                }

                return {
                    id: user.id,
                    email: user.email,
                };
            }
        ),
        "google"
    );
}

// Facebook Strategy (Optional)
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    authenticator.use(
        new OAuth2Strategy(
            {
                authorizationEndpoint: "https://facebook.com/v18.0/dialog/oauth",
                tokenEndpoint: "https://graph.facebook.com/v18.0/oauth/access_token",
                clientId: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                redirectURI: "http://localhost:3000/auth/facebook/callback",
                scopes: ["public_profile" ,"email"],
            },
            async ({ tokens }) => {
                const response = await fetch(
                    `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${tokens.access_token}`
                );
                const userData = await response.json();

                let user = await prisma.user.findUnique({
                    where: { email: userData.email },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email: userData.email,
                            socialUser: {
                                create: {
                                    providerName: "facebook",
                                    email: userData.email,
                                },
                            }
                        },
                    });
                }

                return {
                    id: user.id,
                    email: user.email,
                };
            }
        ),
        "facebook"
    );
}

// Helper function to check if a provider is configured
export function isProviderEnabled(provider: "google" | "facebook"): boolean {
    switch (provider) {
        case "google":
            return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
        case "facebook":
            return !!(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET);
        default:
            return false;
    }
}