# Express proof (Ceiba quickstart mirror)

Runnable **Express** app that follows the public integration quickstart in the **`ceiba-docs`** repo (`docs/quickstart.md`).

## What it does

- **`GET /v1/hello`** — protected with **`ceibaExpressMiddleware`**
- On allow, responds with `{ ok: true, ceibaAccess: ... }` (same shape as the quickstart)

## Prerequisites

You need a **running Ceiba Runtime** and a **project** with:

- matching **`CEIBA_PROJECT_ID`** and **`CEIBA_PROJECT_SECRET`**
- an **API key** the caller will present (`Authorization: Bearer …` or `x-api-key`)
- an **access policy** that allows **`GET /v1/hello`** for that key

How you provision that data depends on your environment (internal bootstrap today; Control Plane later).

## Run

From this folder:

```bash
cp .env.example .env
# edit .env with real CEIBA_* values

npm install
npm start
```

**Dependency note:** in the CeibaLabs workspace, `package.json` points at **`file:../../ceiba-sdk-node`** so you can run without publishing the SDK. If you only have this repo, change that dependency to **`@ceibalabs/ceiba-sdk`** from npm and run `npm install` again.

Smoke call:

```bash
curl -s -H "Authorization: Bearer <your-api-key>" http://localhost:3000/v1/hello
```

## Programmatic key lifecycle (CLI demo)

This folder also includes a **non-HTTP** script that exercises **`CeibaRuntimeClient`** machine APIs with the **same `CEIBA_*` env vars** as the server. Requires **Node 20+** with **`--env-file`** support (used to load `.env`).

```bash
npm install
npm run demo:programmatic-keys
```

**Exact script behavior (in order):**

1. **`listApiKeys`** — prints the list once (before).
2. **Revoke-path key** — **`createApiKey`** with display name `ceiba-examples-demo-revoke-<timestamp>`; prints **`apiKeyId`**, **`keyPrefix`**, and **`plaintextKey` once**; then **`getApiKey`**; **`setApiKeyExpiry`** to ~1 year ahead; **`setApiKeyExpiry`** with **`null`** to clear; then **`revokeApiKey`**.
3. **Archive-path key** — **`createApiKey`** with display name `ceiba-examples-demo-archive-<timestamp>`; prints **`plaintextKey` once**; then **`getApiKey`**; then **`archiveApiKey`** (key stays **active** until archive; not revoked first).
4. **`listApiKeys`** — prints the list again (after); you should see one **revoked** and one **archived** row among your project keys.

See **`ceiba-docs`** **`docs/programmatic-api-keys.md`** in your CeibaLabs workspace clone for the HTTP/SDK reference that matches this flow.

## Denials and transport errors

The SDK maps Runtime **denials** to HTTP status and JSON `error` codes, and **transport** failures (bad secret, Runtime down, etc.) separately. See the quickstart tables in **`ceiba-docs`**.
