import octokit from "../singleton/octokit.js";

export type Res = ReturnType<typeof octokit.request>;
