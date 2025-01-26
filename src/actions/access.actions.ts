import { addARepositoryCollaborator } from "../api/access.api.js";

import { fsReadMembers, fsWriteMembers } from "../io/members.io.js";

import { Member } from "../types/member.type.js";

import { dir } from "../utils/console.utils.js";
import { repo } from "../utils/generator.utils.js";

export async function grantAccessForAllMembers(): Promise<void> {
  const members = await fsReadMembers();

  for (const member of members) {
    await grantAccessForOneMember(member);
    await fsWriteMembers(members);
  }
}

async function grantAccessForOneMember(member: Member): Promise<void> {
  if (member.isAccessGranted) {
    console.log(`Access for ${member.login} is already granted`);
    return;
  }

  const res = await addARepositoryCollaborator(repo(member), member.login);

  if (res.status !== 201 && res.status !== 204) {
    console.log(`Access cannot be granted for ${member.login}`);
    dir(res);
    console.log("-".repeat(30));

    return;
  }

  member.isAccessGranted = true;

  console.log(`Granted access to ${member.login}`);
}
