import fs from "fs/promises";

import { Message } from "../types/message.type.js";

import { chatHistoryFolderPath } from "../utils/paths.utils.js";

export async function fsReadChatHistory(lesson: number): Promise<Message[]> {
  const filePath = `${chatHistoryFolderPath()}/lesson-${lesson}.json`;
  const fileContent = (await fs.readFile(filePath)).toString();
  return JSON.parse(fileContent).messages;
}
