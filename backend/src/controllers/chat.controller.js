import { generateResponse } from "../services/ollama.service.js";
import { retrieveRelevantContext } from "../services/retrieval.service.js";

export async function createChat(req, res, next) {
  const { message } = req.body || {};

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Message is required.",
    });
  }

  try {
    const question = message.trim();
    const { category, context } = await retrieveRelevantContext(question);
    const answer = await generateResponse(question, context);

    return res.status(200).json({
      success: true,
      answer,
      category,
    });
  } catch (error) {
    next(error);
  }
}
