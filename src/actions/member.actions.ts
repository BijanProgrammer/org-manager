import { listTeamMembers } from "../api/org.api.js";

import { fsReadMembers, fsWriteMembers } from "../io/members.io.js";

import { convertToMembers } from "../utils/type.utils.js";

export async function resetMembers(): Promise<void> {
  const res = await listTeamMembers();
  const members = convertToMembers(res);
  await fsWriteMembers(members);

  console.log("Members reset successfully");
}

export async function updateMembers(): Promise<void> {
  const oldMembers = await fsReadMembers();

  const res = await listTeamMembers();
  const allMembers = convertToMembers(res);

  const updatedMembers = allMembers.map((x) => {
    const oldMember = oldMembers.find((y) => y.login === x.login);
    return oldMember ?? x;
  });

  await fsWriteMembers(updatedMembers);

  console.log("Members updated successfully");
}
