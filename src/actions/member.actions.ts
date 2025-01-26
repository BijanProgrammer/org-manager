import { listOrganizationMembers } from "../api/org.api.js";

import { fsWriteMembers } from "../io/members.io.js";

import { convertToMembers } from "../utils/type.utils.js";

export async function resetMembers(): Promise<void> {
  const res = await listOrganizationMembers();
  const members = convertToMembers(res);
  await fsWriteMembers(members);
}
