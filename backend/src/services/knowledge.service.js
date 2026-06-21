import { access } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { loadJsonFile } from "../utils/jsonLoader.js";
import { loadTxtFile } from "../utils/txtLoader.js";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const projectRoot = path.resolve(currentDir, "../../..");
const knowledgeBaseDir = path.join(projectRoot, "knowledge-base");

const jsonFiles = {
  profile: "profile.json",
  education: "education.json",
  skills: "skills.json",
  experience: "experience.json",
  projects: "projects.json",
  achievements: "achievements.json",
  research: "research.json",
  conversationExamples: "conversation-examples.json",
};

const documentFiles = {
  resume: "resume.txt",
  linkedInProfile: "linkedin-profile.txt",
  researchPaper: "research-paper.txt",
};

function resolveJsonFile(fileName) {
  return path.join(knowledgeBaseDir, "json", fileName);
}

function resolveDocumentFile(fileName) {
  return path.join(knowledgeBaseDir, "documents", fileName);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function getRequiredKnowledgeFiles() {
  const jsonPaths = Object.entries(jsonFiles).map(([key, fileName]) => ({
    key,
    type: "json",
    fileName,
    filePath: resolveJsonFile(fileName),
  }));

  const documentPaths = Object.entries(documentFiles).map(([key, fileName]) => ({
    key,
    type: "document",
    fileName,
    filePath: resolveDocumentFile(fileName),
  }));

  return [...jsonPaths, ...documentPaths];
}

export async function validateKnowledgeBase() {
  const requiredFiles = getRequiredKnowledgeFiles();
  const checkedFiles = await Promise.all(
    requiredFiles.map(async (file) => ({
      ...file,
      exists: await fileExists(file.filePath),
    })),
  );
  const missingFiles = checkedFiles.filter((file) => !file.exists);

  if (missingFiles.length > 0) {
    console.error("[Knowledge Base] Missing required knowledge files:");
    missingFiles.forEach((file) => {
      console.error(`- ${file.type}: ${file.filePath}`);
    });
  } else {
    console.log(`[Knowledge Base] Validation passed. ${checkedFiles.length} files found.`);
  }

  return {
    valid: missingFiles.length === 0,
    checkedFiles,
    missingFiles,
  };
}

export function getProfile() {
  return loadJsonFile(resolveJsonFile(jsonFiles.profile));
}

export function getEducation() {
  return loadJsonFile(resolveJsonFile(jsonFiles.education));
}

export function getSkills() {
  return loadJsonFile(resolveJsonFile(jsonFiles.skills));
}

export function getExperience() {
  return loadJsonFile(resolveJsonFile(jsonFiles.experience));
}

export function getProjects() {
  return loadJsonFile(resolveJsonFile(jsonFiles.projects));
}

export function getAchievements() {
  return loadJsonFile(resolveJsonFile(jsonFiles.achievements));
}

export function getResearch() {
  return loadJsonFile(resolveJsonFile(jsonFiles.research));
}

export function getConversationExamples() {
  return loadJsonFile(resolveJsonFile(jsonFiles.conversationExamples));
}

export function getResumeDocument() {
  return loadTxtFile(resolveDocumentFile(documentFiles.resume));
}

export function getLinkedInProfileDocument() {
  return loadTxtFile(resolveDocumentFile(documentFiles.linkedInProfile));
}

export function getResearchPaperDocument() {
  return loadTxtFile(resolveDocumentFile(documentFiles.researchPaper));
}

