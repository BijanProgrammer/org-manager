import fs from "fs/promises";

import { RuleSet } from "../types/ruleset.type.js";

import { roguePreventerFilePath } from "../utils/paths.utils.js";

export async function fsReadRoguePreventer(): Promise<RuleSet> {
  const content = await fs.readFile(roguePreventerFilePath());
  return JSON.parse(content.toString());
}
