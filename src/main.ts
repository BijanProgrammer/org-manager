import "dotenv/config";

import { bootcamp2024FreeNextjsConfig } from "./configs/bootcamp-2024-free-nextjs.config.js";
globalThis.APP_CONFIG = bootcamp2024FreeNextjsConfig;

import { kickLazyMembersAndDeleteTheirRepos } from "./actions/lazy.actions.js";

async function main(): Promise<void> {
  try {
    await kickLazyMembersAndDeleteTheirRepos(4, true);
  } catch (err) {
    console.log(err);
  }
}

main().then();
