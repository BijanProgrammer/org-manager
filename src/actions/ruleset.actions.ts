import { createARepositoryRuleset } from "../api/ruleset.api.js";

import { fsReadMembers, fsWriteMembers } from "../io/members.io.js";

import roguePreventer from "../singleton/rogue-preventer.js";

import { Member } from "../types/member.type.js";

import { dir } from "../utils/console.utils.js";
import { repo } from "../utils/generator.utils.js";

export async function addRulesetToAllRepos(): Promise<void> {
  const members = await fsReadMembers();

  for (const member of members) {
    await addRulesetToOneRepo(member);
    await fsWriteMembers(members);
  }
}

async function addRulesetToOneRepo(member: Member): Promise<void> {
  if (member.isRulesetCreated) {
    console.log(`Ruleset for ${member.login} is already created`);
    return;
  }

  const res = await createARepositoryRuleset(repo(member), roguePreventer);

  if (res.status !== 201) {
    console.log(`Ruleset cannot be created for ${member.login}`);
    dir(res);
    console.log("-".repeat(30));

    return;
  }

  member.isRulesetCreated = true;

  console.log(`Created ruleset for ${member.login}`);
}
