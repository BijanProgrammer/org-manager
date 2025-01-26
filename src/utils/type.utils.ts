import { Member } from "../types/member.type.js";
import { Res } from "../types/res.type.js";

export function convertToMembers(res: Awaited<Res>): Member[] {
  return [...res.data].map((x) => ({
    id: x.id,
    login: x.login,
    isRepoCreated: false,
    isAccessGranted: false,
    isRulesetCreated: false,
    isKicked: false,
    isRepoDeleted: false,
  }));
}
