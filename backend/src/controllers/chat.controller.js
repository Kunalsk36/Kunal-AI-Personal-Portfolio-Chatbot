/**
 * Chat Controller
 *
 * Handles incoming chat requests, orchestrates the pipeline:
 *   1. Validate input
 *   2. Retrieve knowledge context (multi-category)
 *   3. Stream response from Ollama
 */

import { generateResponseStream } from "../services/ollama.service.js";
import { retrieveRelevantContext } from "../services/retrieval.service.js";

/**
 * Validate and sanitize the conversation history array.
 * Returns a clean array of { role, content } objects.
 */
function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (msg) =>
        msg &&
        typeof msg === "object" &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string" &&
        msg.content.trim().length > 0,
    )
    .map((msg) => ({
      role: msg.role,
      content: msg.content.trim(),
    }))
    .slice(-10); // Keep last 10 messages (5 turns)
}

export async function createChat(req, res, next) {
  const { message, history } = req.body || {};

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Message is required.",
    });
  }

  try {
    const question = message.trim();
    const conversationHistory = sanitizeHistory(history);

    // Retrieve knowledge context with intent detection
    const { intent, categories, context } = await retrieveRelevantContext(
      question,
      conversationHistory,
    );

    // Set SSE headers for real-time streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Send metadata first
    res.write(
      `data: ${JSON.stringify({ category: categories[0] || "profile", intent })}\n\n`,
    );

    // Stream tokens from Ollama
    const stream = generateResponseStream(question, context, intent, conversationHistory);
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    if (!res.headersSent) {
      next(error);
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
}
