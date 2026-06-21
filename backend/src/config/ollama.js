import { env } from "./env.js";

export const ollamaConfig = {
  baseUrl: env.ollamaBaseUrl,
  model: env.ollamaModel,
  timeoutMs: env.ollamaTimeoutMs,
  options: {
    temperature: 0.2,
    top_p: 0.8,
    num_predict: 220,
  },
};

