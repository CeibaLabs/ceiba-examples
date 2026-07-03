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

## 2026-07-03 — Release-stack examples smoke (`test/examples-release-smoke`)

- Static parity confirmed against the final Quickstart and Programmatic API Keys docs:
  - Express uses `ceibaExpressMiddleware`
  - Fastify uses `ceibaFastifyPreHandler`
  - both protect `GET /v1/hello`
  - both use `CEIBA_RUNTIME_URL`, `CEIBA_PROJECT_ID`, and `CEIBA_PROJECT_SECRET`
  - the lifecycle script matches list/create/read/expiry/revoke/archive documentation
- Installed both proofs from committed lockfiles with `npm ci`; no dependency upgrade was performed.
- Corrected both proof `start` and `dev` scripts to load the ignored local `.env` files their READMEs instruct operators to populate.
- Environment assumptions:
  - local Runtime health returned `200`
  - both proof env files used the same disposable project, project secret, and downstream API key
  - the project had an active `GET /v1/hello` policy and active Free subscription
  - no credential or full plaintext key was recorded
- Express proof on port 3100:
  - configured valid key returned `200`, `ok: true`, and active Free access context
  - intentionally invalid key returned `401 ceiba_unauthorized`
- Fastify proof on separate port 3101 returned the same valid/invalid outcomes.
- Programmatic lifecycle completed:
  - initial list
  - create/read revoke-path key
  - set and clear expiry
  - revoke
  - create/read archive-path key
  - archive
  - final list with the new rows in `revoked` and `archived` states
- Plaintext appeared only on the two create operations and was redacted from captured output.
- A release blocker found during the first lifecycle run was corrected in the SDK on `fix/sdk-key-lifecycle-empty-body` at `ba2e65c`: revoke/archive now send the explicit `{}` JSON payload required when using `Content-Type: application/json`. Public HTTP guidance was aligned on `ceiba-docs/fix/docs-key-lifecycle-empty-body` at `3b62cbf`.
- The new-project default Free provisioning gap remains intentionally deferred to `fix/control-plane-default-free-subscription` for a separate implications review. The existing idempotent seed remains the local backfill workaround.
- Both proof servers were stopped; no background example server remains.

## Next

- Review the coordinated SDK, docs, and examples commits independently.
- Address default Free provisioning in the separate approved Control Plane slice before final deployment smoke.
