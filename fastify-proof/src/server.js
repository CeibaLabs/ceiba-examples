import Fastify from "fastify";
import {
  CeibaRuntimeClient,
  ceibaFastifyPreHandler,
  parseCeibaSdkConfig,
} from "@ceibalabs/ceiba-sdk";

const config = parseCeibaSdkConfig({
  runtimeBaseUrl: process.env.CEIBA_RUNTIME_URL,
  projectId: process.env.CEIBA_PROJECT_ID,
  projectSecret: process.env.CEIBA_PROJECT_SECRET,
});

const client = new CeibaRuntimeClient(config);
const app = Fastify({ logger: false });

app.get(
  "/v1/hello",
  {
    preHandler: ceibaFastifyPreHandler({ client, projectId: config.projectId }),
  },
  async (request) => {
    return { ok: true, ceibaAccess: request.ceibaAccess };
  },
);

const port = Number(process.env.PORT ?? 3000);
await app.listen({ port, host: "127.0.0.1" });

console.log(`Ceiba Fastify proof listening on http://localhost:${port}`);
console.log(`Try: curl -s -H "Authorization: Bearer <api-key>" http://localhost:${port}/v1/hello`);
