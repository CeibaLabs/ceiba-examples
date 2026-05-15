/**
 * Demo: CeibaRuntimeClient programmatic key lifecycle (list, create, get, expiry, revoke, archive).
 * Two throwaway keys: one revoked after expiry set/clear; one archived while still active.
 * Same CEIBA_* env vars as `src/server.js`. Run: `npm run demo:programmatic-keys`.
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
  const ts = Date.now();

  console.log("--- listApiKeys (before) ---");
  console.log(JSON.stringify(await client.listApiKeys(), null, 2));

  // --- Key 1: create → get → set/clear expiry → revoke ---
  const displayNameRevoke = `ceiba-examples-demo-revoke-${ts}`;
  console.log("\n--- [revoke path] createApiKey ---", displayNameRevoke);
  const createdRevoke = await client.createApiKey(displayNameRevoke);
  console.log("apiKeyId:", createdRevoke.apiKeyId);
  console.log("keyPrefix:", createdRevoke.keyPrefix);
  console.log("plaintextKey (save now; not shown again):", createdRevoke.plaintextKey);

  const revokeKeyId = createdRevoke.apiKeyId;

  console.log("\n--- [revoke path] getApiKey ---");
  console.log(JSON.stringify(await client.getApiKey(revokeKeyId), null, 2));

  const futureIso = new Date(Date.now() + 365 * 86400_000).toISOString();
  console.log("\n--- [revoke path] setApiKeyExpiry (1y) ---", futureIso);
  console.log(JSON.stringify(await client.setApiKeyExpiry(revokeKeyId, futureIso), null, 2));

  console.log("\n--- [revoke path] setApiKeyExpiry (clear) ---");
  console.log(JSON.stringify(await client.setApiKeyExpiry(revokeKeyId, null), null, 2));

  console.log("\n--- [revoke path] revokeApiKey ---");
  console.log(JSON.stringify(await client.revokeApiKey(revokeKeyId), null, 2));

  // --- Key 2: create → get → archive (separate active key) ---
  const displayNameArchive = `ceiba-examples-demo-archive-${ts}`;
  console.log("\n--- [archive path] createApiKey ---", displayNameArchive);
  const createdArchive = await client.createApiKey(displayNameArchive);
  console.log("apiKeyId:", createdArchive.apiKeyId);
  console.log("keyPrefix:", createdArchive.keyPrefix);
  console.log("plaintextKey (save now; not shown again):", createdArchive.plaintextKey);

  const archiveKeyId = createdArchive.apiKeyId;

  console.log("\n--- [archive path] getApiKey ---");
  console.log(JSON.stringify(await client.getApiKey(archiveKeyId), null, 2));

  console.log("\n--- [archive path] archiveApiKey ---");
  console.log(JSON.stringify(await client.archiveApiKey(archiveKeyId), null, 2));

  console.log("\n--- listApiKeys (after; expect one revoked, one archived) ---");
  console.log(JSON.stringify(await client.listApiKeys(), null, 2));
}

main().catch((err) => {
  if (err instanceof CeibaRuntimeTransportError) {
    console.error(`Runtime HTTP ${err.status}: ${err.body}`);
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});
