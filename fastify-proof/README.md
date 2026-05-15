# Fastify proof (Ceiba Runtime + SDK)

Runnable **Fastify** app using the same **`GET /v1/hello`** protected-route contract as **`express-proof/`**: **`ceibaFastifyPreHandler`** on the route only (not global), same env vars and header-based API key extraction as the **`ceiba-docs`** quickstart.

## What it does

- **`GET /v1/hello`** — protected with **`ceibaFastifyPreHandler`**
- On allow, responds with `{ ok: true, ceibaAccess: ... }` (same JSON shape as Express proof)

## Prerequisites

Same as **`express-proof/`**: running Runtime, project id + secret, API key, and a policy matching **`GET /v1/hello`**.

## Run

From this folder:

```bash
cp .env.example .env
# edit .env with real CEIBA_* values

npm install
npm start
```

**Dependency note:** `package.json` uses **`file:../../ceiba-sdk-node`** in the CeibaLabs workspace. Else use **`@ceibalabs/ceiba-sdk`** from npm.

Use a different **`PORT`** than Express if both run locally (e.g. **`PORT=3001`**).

Smoke call:

```bash
curl -s -H "Authorization: Bearer <your-api-key>" http://localhost:3000/v1/hello
```

## Denials and transport errors

Same mapping as Express — see **`ceiba-docs`** `docs/quickstart.md`.

## Related

- **`../express-proof/`** — Express twin.
