import { ollamaConfig } from "../config/ollama.js";
import { buildPrompt } from "./prompt.service.js";

export async function generateResponse(question, context) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ollamaConfig.timeoutMs);
  const prompt = buildPrompt(question, context);

  try {
    const response = await fetch(`${ollamaConfig.baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ollamaConfig.model,
        prompt,
        stream: false,
        options: ollamaConfig.options,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.response) {
      throw new Error("Ollama response did not include generated text");
    }

    return data.response.trim();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Ollama request timed out");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

