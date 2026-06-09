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
- **Repo:** feature **`232a40b`** on **`feat/examples-fastify-proof`** (merge to **`dev`** pending review).

## Launch validation (2026-05-19, read-only)

- **`dev`** at **`7281b1c`**: `fastify-proof/src/server.js` and express-proof README/programmatic demo align with `ceiba-docs`; no launch-blocking findings.
- **Pre-release nice-to-have:** `express-proof/README.md` still says “Control Plane later” for provisioning; CP is landed — copy-only fix if Founder wants polish.
- Live `npm start` / `demo:programmatic-keys` not run (env-dependent).

## 2026-06-09 — MVP examples refresh (`feat/examples-mvp-refresh`)

- Refreshed repo **`README.md`** around the shipped MVP example set: Runtime enforcement, SDK-first Express/Fastify route protection, and the existing programmatic key lifecycle script.
- Updated **`express-proof/README.md`** to remove stale “Control Plane later” wording; it now points to Control Plane for project, key, policy, and subscription setup while keeping the example focused on the authorize path.
- Added an explicit warning that **`npm run demo:programmatic-keys`** mutates real key rows for the configured project by creating throwaway keys and revoking/archiving them.
- Updated **`fastify-proof/README.md`** to stay parallel to Express, clarify Control Plane provisioning, and avoid billing/bootstrap claims.
- Updated both **`.env.example`** files to clarify that **`CEIBA_PROJECT_SECRET`** is Runtime transport auth sent as **`x-ceiba-project-secret`**.
- Code unchanged: **`express-proof/src/server.js`**, **`fastify-proof/src/server.js`**, and **`express-proof/scripts/programmatic-keys.mjs`** already match the landed SDK adapter/client behavior.
- Out of scope: Runtime/SDK/Control Plane/docs/landing edits, billing demos, Stripe config, new frameworks, gateway/x402/MCP/platform expansion.

## Next

- Review/merge the examples refresh, then return to the explicit approval gate before billing plan-catalog seed/backfill or live-stack smoke.
