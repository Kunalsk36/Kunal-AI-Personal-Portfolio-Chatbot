import { generateResponse } from "../services/ollama.service.js";
import { retrieveRelevantContext } from "../services/retrieval.service.js";
import fs from "fs/promises";

const questions = [
  "What is your name?",
  "Tell me about yourself.",
  "What skills do you have?",
  "What is your CGPA?",
  "Tell me about your internship.",
  "What projects have you built?",
  "Tell me about PathReco.",
  "Do you have a patent?",
  "What awards have you received?"
];

async function validate() {
  const reportPath = "d:/Kunal AI - Personal Portfolio Chatbot/kunal-ai-personal-portfolio-chatbot/docs/ValidationReport.md";
  let report = "# Phase 7 Validation Report\n\n";

  for (const q of questions) {
    console.log(`Testing: ${q}`);
    report += `## Question: ${q}\n\n`;
    try {
      const { category, context } = await retrieveRelevantContext(q);
      const answer = await generateResponse(q, context);
      report += `**Context Category:** ${category}\n\n`;
      report += `**AI Response:**\n${answer}\n\n`;
      report += `---\n\n`;
      console.log(`Answer received for: ${q}`);
    } catch (e) {
      report += `**Error:** ${e.message}\n\n---\n\n`;
      console.error(`Error for ${q}: ${e.message}`);
    }
  }

  await fs.writeFile(reportPath, report, "utf8");
  console.log("Validation complete. Report saved to docs/ValidationReport.md");
}

validate();
