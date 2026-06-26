/**
 * Retrieval Service
 *
 * Retrieves and fuses knowledge from multiple categories ranked by relevance.
 * Always includes a lightweight profile base. Merges top-scoring categories
 * into a single unified context block.
 */

import {
  getAchievements,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getResearch,
  getResearchPaperDocument,
  getResumeDocument,
  getSkills,
} from "./knowledge.service.js";
import { buildContextBlock } from "../utils/contextBuilder.js";
import { detectIntent, scoreAllCategories, includesKeyword, normalizeText } from "../utils/keywordMatcher.js";

// ── Category data loaders ────────────────────────────────────────────

const categoryLoaders = {
  profile: async () => ({ title: "Profile", category: "profile", data: await getProfile() }),
  education: async () => ({ title: "Education", category: "education", data: await getEducation() }),
  skills: async () => ({ title: "Skills", category: "skills", data: await getSkills() }),
  experience: async () => ({ title: "Experience", category: "experience", data: await getExperience() }),
  projects: async (question) => {
    const projects = await getProjects();
    const matchingProjects = findMatchingProjects(projects, question);
    const projectData = matchingProjects.length > 0 ? { projects: matchingProjects } : projects;
    return { title: "Projects", category: "projects", data: projectData };
  },
  achievements: async () => ({ title: "Achievements", category: "achievements", data: await getAchievements() }),
  research: async (question) => {
    const sections = [{ title: "Research", category: "research", data: await getResearch() }];
    if (includesKeyword(question, "paper") || includesKeyword(question, "pathreco")) {
      sections.push({ title: "Research Paper Document", data: await getResearchPaperDocument() });
    }
    return sections;
  },
};

// ── Project name matching ────────────────────────────────────────────

function findMatchingProjects(projects, question) {
  const normalizedQuestion = normalizeText(question);
  return (projects.projects || []).filter((project) => {
    const projectName = normalizeText(project.name);
    return projectName && normalizedQuestion.includes(projectName);
  });
}

// ── Core retrieval logic ─────────────────────────────────────────────

/**
 * Retrieve relevant knowledge context for a user question.
 *
 * Strategy:
 * - Score all categories against the question
 * - Take the top 2 scoring categories (if score > 0)
 * - Always include a lightweight profile summary as base context
 * - For follow-up questions, broaden retrieval to top 3 categories
 * - For greetings, return only profile
 * - For off-topic, return only profile (prompt handles redirection)
 *
 * @param {string} question - The user's question
 * @param {Array} history - Conversation history
 * @returns {{ intent: string, categories: string[], context: string }}
 */
export async function retrieveRelevantContext(question, history = []) {
  const intent = detectIntent(question, history);

  // Greetings and off-topic: minimal context
  if (intent === "greeting" || intent === "off-topic") {
    const profileSection = await categoryLoaders.profile();
    return {
      intent,
      categories: ["profile"],
      context: buildContextBlock([profileSection]),
    };
  }

  // Score all categories
  const scores = scoreAllCategories(question);
  const scoringCategories = scores.filter((s) => s.score > 0);

  // Determine how many categories to retrieve
  const maxCategories = intent === "follow-up" ? 3 : 2;
  const topCategories = scoringCategories.slice(0, maxCategories);

  // If nothing matched, fall back to profile + resume summary
  if (topCategories.length === 0) {
    const profileSection = await categoryLoaders.profile();
    const resume = await getResumeDocument();
    return {
      intent,
      categories: ["profile"],
      context: buildContextBlock([
        profileSection,
        { title: "Resume Summary", data: resume },
      ]),
    };
  }

  // Load sections for top categories
  const sections = [];
  const loadedCategories = [];

  // Always add profile as lightweight base if it's not already the primary category
  if (topCategories[0].category !== "profile") {
    const profileData = await getProfile();
    sections.push({
      title: "Profile (Base Context)",
      category: "profile",
      data: profileData,
    });
  }

  for (const { category } of topCategories) {
    const loader = categoryLoaders[category];
    if (!loader) continue;

    const result = await loader(question);
    if (Array.isArray(result)) {
      sections.push(...result);
    } else {
      sections.push(result);
    }
    loadedCategories.push(category);
  }

  return {
    intent,
    categories: loadedCategories,
    context: buildContextBlock(sections),
  };
}
