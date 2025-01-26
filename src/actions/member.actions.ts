import { listTeamMembers } from "../api/org.api.js";

import { fsWriteMembers } from "../io/members.io.js";

import { convertToMembers } from "../utils/type.utils.js";

export async function resetMembers(): Promise<void> {
  const res = await listTeamMembers();
  const members = convertToMembers(res);
  await fsWriteMembers(members);
}
