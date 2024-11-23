import {OAuth2Strategy} from "remix-auth-oauth2";
import {User} from "@/types";
import * as process from "node:process";
import {Authenticator} from "remix-auth";
import {sessionStorage} from "./session.server";


export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
    new OAuth2Strategy<
        User,
        { provider: "google" },
        { id_token: string }
    >(
        {
            clientId: process.env.AUTH_CLIENT_ID as string,
            clientSecret: process.env.AUTH_CLIENT_SECRET as string,

            authorizationEndpoint: process.env.AUTH_AUTHORIZATION_URL as string,
            tokenEndpoint: process.env.AUTH_TOKEN_URL as string,
            redirectURI: process.env.AUTH_REDIRECT_URL as string,
        },
        async ({ tokens, profile, context, request }) => {
            // here you can use the params above to get the user and return it
            // what you do inside this and how you find the user is up to you
            // return await getUser(tokens, profile, context, request);
            console.log({ tokens, profile, context, request });
        },
    ),
    // this is optional, but if you setup more than one OAuth2 instance you will
    // need to set a custom name to each one
    "google",
);