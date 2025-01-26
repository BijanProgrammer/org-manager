import octokit from "../singleton/octokit.js";

import { Res } from "../types/res.type.js";

export async function listOrganizationMembers(): Promise<Res> {
  return await octokit.request("GET /orgs/{org}/members", {
    org: APP_CONFIG.org,
    per_page: 100,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export async function removeAnOrganizationMember(
  username: string,
): Promise<Res> {
  return await octokit.request("DELETE /orgs/{org}/members/{username}", {
    org: APP_CONFIG.org,
    username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}
