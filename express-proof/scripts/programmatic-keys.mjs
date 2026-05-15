/**
 * Demo: CeibaRuntimeClient programmatic key lifecycle (list, create, get, expiry, revoke).
 * Requires the same CEIBA_* env vars as `src/server.js`. Run via `npm run demo:programmatic-keys`.
 */
import {
  CeibaRuntimeClient,
  CeibaRuntimeTransportError,
  parseCeibaSdkConfig,
} from "@ceibalabs/ceiba-sdk";

async function main() {
  const config = parseCeibaSdkConfig({
    runtimeBaseUrl: process.env.CEIBA_RUNTIME_URL,
    projectId: process.env.CEIBA_PROJECT_ID,
    projectSecret: process.env.CEIBA_PROJECT_SECRET,
  });
  const client = new CeibaRuntimeClient(config);

  console.log("--- listApiKeys (before) ---");
  const before = await client.listApiKeys();
  console.log(JSON.stringify(before, null, 2));

  const displayName = `ceiba-examples-demo-${Date.now()}`;
  console.log("\n--- createApiKey ---", displayName);
  const created = await client.createApiKey(displayName);
  console.log("apiKeyId:", created.apiKeyId);
  console.log("keyPrefix:", created.keyPrefix);
  console.log("plaintextKey (save now; not shown again):", created.plaintextKey);

  const { apiKeyId } = created;

  console.log("\n--- getApiKey ---");
  console.log(JSON.stringify(await client.getApiKey(apiKeyId), null, 2));

  const futureIso = new Date(Date.now() + 365 * 86400_000).toISOString();
  console.log("\n--- setApiKeyExpiry (1y) ---", futureIso);
  console.log(JSON.stringify(await client.setApiKeyExpiry(apiKeyId, futureIso), null, 2));

  console.log("\n--- setApiKeyExpiry (clear) ---");
  console.log(JSON.stringify(await client.setApiKeyExpiry(apiKeyId, null), null, 2));

  console.log("\n--- revokeApiKey ---");
  console.log(JSON.stringify(await client.revokeApiKey(apiKeyId), null, 2));

  console.log("\n--- listApiKeys (after; demo key should be revoked) ---");
  const after = await client.listApiKeys();
  console.log(JSON.stringify(after, null, 2));
}

main().catch((err) => {
  if (err instanceof CeibaRuntimeTransportError) {
    console.error(`Runtime HTTP ${err.status}: ${err.body}`);
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});
