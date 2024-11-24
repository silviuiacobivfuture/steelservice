/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverDependenciesToBundle: [
    "remix-auth",
    "remix-auth-oauth2",
    "remix-auth-form",
    "@oslojs/asn1",
    "@oslojs/binary",
    "@oslojs/crypto",
    "@oslojs/encoding",
    "@oslojs/oauth2",
    // Include all submodules
    /^@oslojs\/.*/,
  ],
  ignoredRouteFiles: ["**/*.css"],
  serverModuleFormat: "cjs"
};
