import "dotenv/config";
import "./configs/bootcamp-2025-02-react.config.js";

import { resetMembers } from "./actions/member.actions.js";
import { createRepoForAllMembers } from "./actions/repo.actions.js";
import { grantAccessForAllMembers } from "./actions/access.actions.js";
import { addRulesetToAllRepos } from "./actions/ruleset.actions.js";

async function main(): Promise<void> {
  try {
    await resetMembers();
    await createRepoForAllMembers();
    await addRulesetToAllRepos();
    await grantAccessForAllMembers();
  } catch (err) {
    console.log(err);
  }
}

main().then();
