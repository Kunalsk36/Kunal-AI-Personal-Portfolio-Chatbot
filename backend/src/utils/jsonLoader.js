import { readFile } from "fs/promises";

export async function loadJsonFile(filePath) {
  const fileContent = await readFile(filePath, "utf8");

  try {
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(`Invalid JSON file: ${filePath}. ${error.message}`);
  }
}

