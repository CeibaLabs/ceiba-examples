import express from "express";
import {
  CeibaRuntimeClient,
  ceibaExpressMiddleware,
  parseCeibaSdkConfig,
} from "@ceibalabs/ceiba-sdk";

const config = parseCeibaSdkConfig({
  runtimeBaseUrl: process.env.CEIBA_RUNTIME_URL,
  projectId: process.env.CEIBA_PROJECT_ID,
  projectSecret: process.env.CEIBA_PROJECT_SECRET,
});

const client = new CeibaRuntimeClient(config);
const app = express();

app.get(
  "/v1/hello",
  ceibaExpressMiddleware(client, config.projectId),
  (req, res) => {
    res.json({ ok: true, ceibaAccess: req.ceibaAccess });
  },
);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Ceiba Express proof listening on http://localhost:${port}`);
  console.log(`Try: curl -s -H "Authorization: Bearer <api-key>" http://localhost:${port}/v1/hello`);
});
