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

This folder also includes a **non-HTTP** script that walks through **`CeibaRuntimeClient`** machine APIs: list, create, get, set/clear **expiry**, and **revoke** (same env vars as the server).

Requires **Node 20+** with support for **`--env-file`** (used to load `.env`).

```bash
npm install
npm run demo:programmatic-keys
```

The script creates a throwaway key named `ceiba-examples-demo-<timestamp>`, prints the **plaintext once**, then revokes it. See the matching narrative in the **`ceiba-docs`** repo: **`docs/programmatic-api-keys.md`** (in your CeibaLabs workspace clone).

## Denials and transport errors

The SDK maps Runtime **denials** to HTTP status and JSON `error` codes, and **transport** failures (bad secret, Runtime down, etc.) separately. See the quickstart tables in **`ceiba-docs`**.
