import "dotenv/config";
import "./configs/bootcamp-2025-02-react.config.js";

import { updateMembers } from "./actions/member.actions.js";
import { createRepoForAllMembers } from "./actions/repo.actions.js";
import { grantAccessForAllMembers } from "./actions/access.actions.js";
import { addRulesetToAllRepos } from "./actions/ruleset.actions.js";

import { divide } from "./utils/console.utils.js";

async function main(): Promise<void> {
  try {
    await updateMembers();
    divide();
    await createRepoForAllMembers();
    divide();
    await addRulesetToAllRepos();
    divide();
    await grantAccessForAllMembers();
  } catch (err) {
    console.log(err);
  }
}

main().then();
