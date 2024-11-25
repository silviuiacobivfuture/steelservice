import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

// Your startup code here
async function runStartupTasks() {
  console.log("Running startup tasks...");
  // Place any code here that should only run when the server starts
  // e.g., connecting to a database, initializing a cache, etc.

}
runStartupTasks();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: any
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
