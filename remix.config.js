/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverDependenciesToBundle: [
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
