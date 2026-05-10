# ceiba-examples — implementation notes

## 2026-05-10 — Express proof app (`feat/examples-express-proof`)

- Added **`express-proof/`**: minimal Express server, **`GET /v1/hello`** with **`ceibaExpressMiddleware`**, matching the public **`ceiba-docs`** quickstart snippet.
- **`package.json`** uses **`file:../../ceiba-sdk-node`** so the CeibaLabs workspace installs the SDK without npm publish.
- **`.env.example`** documents **`CEIBA_RUNTIME_URL`**, **`CEIBA_PROJECT_ID`**, **`CEIBA_PROJECT_SECRET`**, **`PORT`**.
- Does **not** embed Runtime bootstrap, SQL, or Control Plane flows — parity with the product-facing quickstart scope.

## Next

- Optional **Fastify** sibling example later; keep each example narrow.
