# ceiba-examples — implementation notes

## 2026-05-10 — Express proof app (`feat/examples-express-proof`)

- Added **`express-proof/`**: minimal Express server, **`GET /v1/hello`** with **`ceibaExpressMiddleware`**, matching the public **`ceiba-docs`** quickstart snippet.
- **`package.json`** uses **`file:../../ceiba-sdk-node`** so the CeibaLabs workspace installs the SDK without npm publish.
- **`.env.example`** documents **`CEIBA_RUNTIME_URL`**, **`CEIBA_PROJECT_ID`**, **`CEIBA_PROJECT_SECRET`**, **`PORT`**.
- Does **not** embed Runtime bootstrap, SQL, or Control Plane flows — parity with the product-facing quickstart scope.

## 2026-05-14 — Programmatic key demo script (`feat/examples-programmatic-key-workflows`)

- **`express-proof/scripts/programmatic-keys.mjs`**: **`listApiKeys` → `createApiKey` → `getApiKey` → `setApiKeyExpiry` (set + clear) → `revokeApiKey`**, prints JSON; creates a throwaway **`ceiba-examples-demo-*`** key then revokes it.
- **`express-proof/package.json`**: **`demo:programmatic-keys`** using **`node --env-file=.env`** (Node 20+).
- **`express-proof/README.md`** + repo **`README.md`**: how to run; pointer to **`ceiba-docs`** **`programmatic-api-keys.md`**.
- No Runtime/SDK/Control Plane code changes; same **`file:../../ceiba-sdk-node`** dependency as the Express proof.

## Next

- Optional **Fastify** sibling example later; keep each example narrow.
