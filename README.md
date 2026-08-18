# Ceiba Examples

Runnable proof apps for the shipped Ceiba MVP.

These examples show the narrow integration surface that exists today:

- Runtime-backed access decisions
- SDK-first Express/Fastify integration
- project secret transport auth through `CEIBA_PROJECT_SECRET`
- API-key protected `GET /v1/hello`
- programmatic API key lifecycle where already present

They are not billing demos, gateway demos, or broad example galleries.

## What Is In This Repository

| Example | Use It For | Scope |
|---------|------------|-------|
| `express-proof/` | Protecting an Express route with `ceibaExpressMiddleware`. | Minimal HTTP server with `GET /v1/hello`. |
| `fastify-proof/` | Protecting a Fastify route with `ceibaFastifyPreHandler`. | Same route and env contract as Express. |
| `express-proof/scripts/programmatic-keys.mjs` | Exercising machine-facing key lifecycle with `CeibaRuntimeClient`. | List, create, get, set/clear expiry, revoke, archive, list. |

## When To Use Each Example

- Use **`express-proof/`** if your API is Express and you want the shortest protected-route proof.
- Use **`fastify-proof/`** if your API is Fastify and you want the same Runtime + SDK shape in Fastify.
- Use **`demo:programmatic-keys`** from `express-proof/` if your backend needs to create or retire customer keys without the Control Plane UI in the loop.

## Shared Environment

Both HTTP examples use the same required Ceiba environment variables:

```bash
CEIBA_RUNTIME_URL=http://localhost:8080
CEIBA_PROJECT_ID=<project-uuid>
CEIBA_PROJECT_SECRET=<project-secret>
```

`PORT` is example-local and controls the proof server listen port.

Project ID and project secret normally come from the Control Plane project workflow. The project also needs an API key and an active policy that allow `GET /v1/hello`; if your Runtime enforces subscription or quota state for that project, configure those in the Control Plane as well.

## Run The Express Proof

```bash
cd express-proof
cp .env.example .env
# set CEIBA_RUNTIME_URL, CEIBA_PROJECT_ID, CEIBA_PROJECT_SECRET

npm install
npm start
```

Smoke call:

```bash
curl -s -H "Authorization: Bearer <your-api-key>" http://localhost:<port>/v1/hello
```

Programmatic key lifecycle from the same folder:

```bash
npm run demo:programmatic-keys
```

## Run The Fastify Proof

```bash
cd fastify-proof
cp .env.example .env
# set CEIBA_RUNTIME_URL, CEIBA_PROJECT_ID, CEIBA_PROJECT_SECRET
# set PORT if Express is already using 3000

npm install
npm start
```

Smoke call:

```bash
curl -s -H "Authorization: Bearer <your-api-key>" http://localhost:3000/v1/hello
```

## Docs

The public docs source is in `ceiba-docs`:

- `docs/index.md` - docs home and path chooser
- `docs/quickstart.md` - request protection path
- `docs/programmatic-api-keys.md` - machine-facing key lifecycle
- `docs/control-plane-operator-guide.md` - operator setup
- `docs/project-secret-rotation.md` - project secret rotation and overlap

## Out Of Scope

- no billing demos
- no Stripe configuration
- no billing plan seed/backfill
- no new frameworks beyond Express/Fastify
- no gateway mode
- no x402
- no MCP docs server
- no platform expansion

## Ceiba ecosystem

- **Site** — <https://useceiba.com>
- **Docs** — <https://docs.useceiba.com>
- **Control Plane** — <https://app.useceiba.com>
- **Node SDK** — [ceiba-sdk-node](https://github.com/CeibaLabs/ceiba-sdk-node) ([`@ceibalabs/ceiba-sdk`](https://www.npmjs.com/package/@ceibalabs/ceiba-sdk))
- **Examples** — this repository
- **Infrastructure** — [ceiba-infra](https://github.com/CeibaLabs/ceiba-infra)

Ceiba Runtime and Control Plane are not public repositories; they are reachable
as the running services at the Control Plane and API endpoints above.

## License

MIT
