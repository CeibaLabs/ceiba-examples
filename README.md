# Ceiba Examples

Runnable example apps for Ceiba are being prepared here.

The goal of this repo is still the same:
- start from an existing Node API
- add Ceiba protection with the Node SDK
- test a real protected-route flow

## What’s in this repository

- **`express-proof/`** — minimal Express server with **`GET /v1/hello`** protected by **`@ceibalabs/ceiba-sdk`** (`ceibaExpressMiddleware`), aligned with the public **`ceiba-docs`** quickstart.

## Who this is for

This repository is for teams who already have:
- a Node API
- an Express or Fastify service
- a need for API keys, limits, plans, and controlled access

## Goal

Show the fastest path from:

> “I have an API”

to:

> “I have a protected API with keys, limits, and commercial access rules”

## Run the Express proof

```bash
cd express-proof
cp .env.example .env
# set CEIBA_RUNTIME_URL, CEIBA_PROJECT_ID, CEIBA_PROJECT_SECRET

npm install
npm start
```

Integration shape and denial behavior are documented in **`ceiba-docs`** (`docs/quickstart.md`).

## Related repos

- SDK: `@ceibalabs/ceiba-sdk`
- Docs: `@ceibalabs/ceiba-docs`

## Site

https://useceiba.com

## License

MIT
