import fs from "fs/promises";

import { Member } from "../types/member.type.js";

import { membersFilePath } from "../utils/paths.utils.js";

export async function fsReadMembers(): Promise<Member[]> {
  const content = await fs.readFile(membersFilePath());
  return JSON.parse(content.toString());
}

export async function fsWriteMembers(members: Member[]): Promise<void> {
  const content = JSON.stringify(members, null, 2);

  await fs.writeFile(membersFilePath(), content);
}
