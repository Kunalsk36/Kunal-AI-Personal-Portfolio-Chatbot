import { env } from "./env.js";

export const ollamaConfig = {
  baseUrl: env.ollamaBaseUrl,
  model: env.ollamaModel,
  timeoutMs: env.ollamaTimeoutMs,
  options: {
    temperature: 0.4,
    top_p: 0.85,
    top_k: 40,
    repeat_penalty: 1.15,
    num_predict: 2048,
    num_ctx: 4096,
  },
};
