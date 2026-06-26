/**
 * Ollama Service
 *
 * Communicates with Ollama using the /api/chat endpoint (not /api/generate)
 * for proper role-based message handling. Supports both streaming and
 * non-streaming responses.
 */

import { ollamaConfig } from "../config/ollama.js";
import { buildMessages } from "./prompt.service.js";

/**
 * Generate a complete (non-streaming) response from Ollama.
 *
 * @param {string} question - User's question
 * @param {string} context - Fused knowledge context
 * @param {string} intent - Detected intent
 * @param {Array} history - Conversation history
 * @returns {Promise<string>} The generated response text
 */
export async function generateResponse(question, context, intent = "portfolio", history = []) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ollamaConfig.timeoutMs);
  const messages = buildMessages(question, context, intent, history);

  try {
    const response = await fetch(`${ollamaConfig.baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ollamaConfig.model,
        messages,
        stream: false,
        options: ollamaConfig.options,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.message?.content) {
      throw new Error("Ollama response did not include generated text");
    }

    return data.message.content.trim();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Ollama request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Generate a streaming response from Ollama.
 * Yields text chunks as they arrive.
 *
 * @param {string} question - User's question
 * @param {string} context - Fused knowledge context
 * @param {string} intent - Detected intent
 * @param {Array} history - Conversation history
 * @yields {string} Text chunks
 */
export async function* generateResponseStream(question, context, intent = "portfolio", history = []) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ollamaConfig.timeoutMs);
  const messages = buildMessages(question, context, intent, history);

  try {
    const response = await fetch(`${ollamaConfig.baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ollamaConfig.model,
        messages,
        stream: true,
        options: ollamaConfig.options,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed with status ${response.status}`);
    }

    const reader = response.body;
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    for await (const chunk of reader) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        if (line.trim() === "") continue;
        try {
          const parsed = JSON.parse(line);
          // /api/chat returns { message: { content: "..." } } per chunk
          if (parsed.message?.content) {
            yield parsed.message.content;
          }
        } catch (e) {
          // Ignore parse errors from split lines
        }
      }
    }

    // Process remaining buffer
    if (buffer.trim() !== "") {
      try {
        const parsed = JSON.parse(buffer);
        if (parsed.message?.content) {
          yield parsed.message.content;
        }
      } catch (e) {
        // Ignore
      }
    }
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Ollama request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
