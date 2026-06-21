import { readFile } from "fs/promises";

export async function loadTxtFile(filePath) {
  return readFile(filePath, "utf8");
}

