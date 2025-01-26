import { Member } from "../types/member.type.js";

export function repo(member: Member): string {
  return `${APP_CONFIG.prefix}-${member.login}`;
}

export function hashtag(lesson: number): string {
  return `#lesson_${lesson}`;
}
