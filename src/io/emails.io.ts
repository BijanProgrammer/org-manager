import fs from "fs/promises";

import { emailsFilePath } from "../utils/paths.utils.js";

export async function fsReadEmails(): Promise<string[]> {
  const content = await fs.readFile(emailsFilePath());
  return JSON.parse(content.toString());
}
