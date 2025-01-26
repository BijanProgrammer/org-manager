import octokit from "../singleton/octokit.js";

import { Res } from "../types/res.type.js";
import { RuleSet } from "../types/ruleset.type.js";

export async function getAllRepositoryRulesets(repo: string): Promise<Res> {
  return await octokit.request("GET /repos/{owner}/{repo}/rulesets", {
    owner: APP_CONFIG.org,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export async function getARepositoryRuleset(repo: string): Promise<Res> {
  return await octokit.request(
    "GET /repos/{owner}/{repo}/rulesets/{ruleset_id}",
    {
      owner: APP_CONFIG.org,
      repo,
      ruleset_id: 2900177,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
}

export async function createARepositoryRuleset(
  repo: string,
  ruleset: RuleSet,
): Promise<Res> {
  return await octokit.request("POST /repos/{owner}/{repo}/rulesets", {
    owner: APP_CONFIG.org,
    repo,
    ...ruleset,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}
