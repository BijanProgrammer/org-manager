import { createARepository } from "../api/repo.api.js";

import { fsReadMembers, fsWriteMembers } from "../io/members.io.js";

import { Member } from "../types/member.type.js";

import { repo } from "../utils/generator.utils.js";
import { waitASecond } from "../utils/time.utils.js";

export async function createRepoForAllMembers(): Promise<void> {
  const members = await fsReadMembers();

  for (const member of members) {
    await createRepoForOneMember(member);
    await fsWriteMembers(members);
    await waitASecond();
  }
}

async function createRepoForOneMember(member: Member): Promise<void> {
  if (member.isRepoCreated) {
    console.log(`Repo for ${member.login} is already created`);
    return;
  }

  await createARepository(repo(member));
  member.isRepoCreated = true;

  console.log(`Created repo for ${member.login}`);
}
