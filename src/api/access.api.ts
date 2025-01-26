import octokit from "../singleton/octokit.js";

import { Res } from "../types/res.type.js";

export async function addARepositoryCollaborator(
  repo: string,
  username: string,
): Promise<Res> {
  return await octokit.request(
    "PUT /repos/{owner}/{repo}/collaborators/{username}",
    {
      owner: APP_CONFIG.org,
      repo,
      username,
      permission: "write",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
}
