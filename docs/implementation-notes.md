# ceiba-examples — implementation notes

## 2026-05-10 — Express proof app (`feat/examples-express-proof`)

- Added **`express-proof/`**: minimal Express server, **`GET /v1/hello`** with **`ceibaExpressMiddleware`**, matching the public **`ceiba-docs`** quickstart snippet.
- **`package.json`** uses **`file:../../ceiba-sdk-node`** so the CeibaLabs workspace installs the SDK without npm publish.
- **`.env.example`** documents **`CEIBA_RUNTIME_URL`**, **`CEIBA_PROJECT_ID`**, **`CEIBA_PROJECT_SECRET`**, **`PORT`**.
- Does **not** embed Runtime bootstrap, SQL, or Control Plane flows — parity with the product-facing quickstart scope.

## 2026-05-14 — Programmatic key demo script (`feat/examples-programmatic-key-workflows`)

- **`express-proof/scripts/programmatic-keys.mjs`**: ordered demo — **`listApiKeys` (before)** → **revoke-path key**: **`createApiKey`** (`ceiba-examples-demo-revoke-<ts>`) → **`getApiKey`** → **`setApiKeyExpiry`** (set ~1y, then **`null`**) → **`revokeApiKey`** → **archive-path key**: **`createApiKey`** (`ceiba-examples-demo-archive-<ts>`) → **`getApiKey`** → **`archiveApiKey`** → **`listApiKeys` (after)**. JSON to stdout; **plaintext printed once per create**.
- **`express-proof/package.json`**: **`demo:programmatic-keys`** using **`node --env-file=.env`** (Node 20+).
- **`express-proof/README.md`** + repo **`README.md`**: wording matches the script step-for-step; pointer to **`ceiba-docs`** **`programmatic-api-keys.md`**.
- No Runtime/SDK/Control Plane code changes; same **`file:../../ceiba-sdk-node`** dependency as the Express proof.
- **Repo:** correction **`68d62a0`** on **`feat/examples-programmatic-key-workflows`** (prior feature **`c3e4e77`**); merge to **`dev`** pending review.

## 2026-05-15 — Fastify proof app (`feat/examples-fastify-proof`)

- **`fastify-proof/`**: **`GET /v1/hello`** with **`ceibaFastifyPreHandler`**; **`file:../../ceiba-sdk-node`**, **Fastify ^5**; same **`.env.example`** as Express proof; no programmatic-keys script (narrow authorize mirror only).
- **Repo:** branch **`feat/examples-fastify-proof`** (merge to **`dev`** pending review).

## Next

- Further examples only when explicitly approved; keep each app narrow.
