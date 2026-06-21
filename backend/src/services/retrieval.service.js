import {
  getAchievements,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getResearch,
  getResearchPaperDocument,
  getSkills,
} from "./knowledge.service.js";
import { buildContextBlock } from "../utils/contextBuilder.js";
import { detectCategory, includesKeyword, normalizeText } from "../utils/keywordMatcher.js";

function findMatchingProjects(projects, question) {
  const normalizedQuestion = normalizeText(question);

  return projects.projects.filter((project) => {
    const projectName = normalizeText(project.name);

    return projectName && normalizedQuestion.includes(projectName);
  });
}

async function buildProjectContext(question) {
  const projects = await getProjects();
  const matchingProjects = findMatchingProjects(projects, question);
  const projectData = matchingProjects.length > 0 ? { projects: matchingProjects } : projects;
  const sections = [{ title: "Projects", data: projectData }];

  if (includesKeyword(question, "pathreco")) {
    sections.push({ title: "Research", data: await getResearch() });
  }

  return buildContextBlock(sections);
}

async function buildResearchContext(question) {
  const sections = [{ title: "Research", data: await getResearch() }];

  if (includesKeyword(question, "paper") || includesKeyword(question, "pathreco")) {
    sections.push({ title: "Research Paper Document", data: await getResearchPaperDocument() });
  }

  return buildContextBlock(sections);
}

async function buildContextForCategory(category, question) {
  switch (category) {
    case "education":
      return buildContextBlock([{ title: "Education", data: await getEducation() }]);
    case "skills":
      return buildContextBlock([{ title: "Skills", data: await getSkills() }]);
    case "experience":
      return buildContextBlock([{ title: "Experience", data: await getExperience() }]);
    case "projects":
      return buildProjectContext(question);
    case "achievements":
      return buildContextBlock([{ title: "Achievements", data: await getAchievements() }]);
    case "research":
      return buildResearchContext(question);
    case "profile":
    default:
      return buildContextBlock([{ title: "Profile", data: await getProfile() }]);
  }
}

export async function retrieveRelevantContext(question) {
  const category = detectCategory(question);
  const context = await buildContextForCategory(category, question);

  return {
    category,
    context,
  };
}

