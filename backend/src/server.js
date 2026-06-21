import app from "./app.js";
import { env } from "./config/env.js";
import { validateKnowledgeBase } from "./services/knowledge.service.js";

async function startServer() {
  await validateKnowledgeBase();

  app.listen(env.port, () => {
    console.log(`Kunal AI backend running on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("[Server] Failed to start backend.");
  console.error(error);
  process.exit(1);
});
