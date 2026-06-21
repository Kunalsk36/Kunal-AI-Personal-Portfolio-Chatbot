import dotenv from "dotenv";

dotenv.config();

const defaultFrontendOrigins = "http://localhost:3000,http://127.0.0.1:3000";

export const env = {
  port: process.env.PORT || 5000,
  frontendOrigins: (process.env.FRONTEND_ORIGINS || defaultFrontendOrigins)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  ollamaModel: process.env.OLLAMA_MODEL || "qwen2.5:1.5b",
  ollamaTimeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS || 30000),
};
