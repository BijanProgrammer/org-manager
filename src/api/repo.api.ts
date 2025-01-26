import octokit from "../singleton/octokit.js";

import { Res } from "../types/res.type.js";

export async function createARepository(name: string): Promise<Res> {
  return await octokit.request("POST /orgs/{org}/repos", {
    org: APP_CONFIG.org,
    name,
    auto_init: true,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export async function deleteARepository(repo: string): Promise<Res> {
  return await octokit.request("DELETE /repos/{owner}/{repo}", {
    owner: APP_CONFIG.org,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}
