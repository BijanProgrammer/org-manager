import { removeAnOrganizationMember } from "../api/org.api.js";
import { deleteARepository } from "../api/repo.api.js";

import { fsReadMembers, fsWriteMembers } from "../io/members.io.js";

import { Member } from "../types/member.type.js";

import { findLazyMembers } from "../utils/lazy.utils.js";
import { repo } from "../utils/generator.utils.js";

export async function kickLazyMembersAndDeleteTheirRepos(
  lesson: number,
  isDryRun: boolean = false,
): Promise<void> {
  const members = await fsReadMembers();

  const lazyMembers = await findLazyMembers(lesson, members);

  if (isDryRun) {
    printLinks(lesson, lazyMembers);
    return;
  }

  for (const member of lazyMembers) {
    await kickLazyMember(member);
    await fsWriteMembers(members);
  }

  for (const member of lazyMembers) {
    await deleteLazyMemberRepo(member);
    await fsWriteMembers(members);
  }
}

async function kickLazyMember(member: Member): Promise<void> {
  if (member.isKicked) {
    console.log(`${member.login} is already kicked`);
    return;
  }

  try {
    await removeAnOrganizationMember(member.login);

    member.isKicked = true;

    console.log(`Kicked ${member.login}`);
  } catch (e) {
    console.warn(`Cannot kick ${member.login}`);
    console.error(e);
  }
}

async function deleteLazyMemberRepo(member: Member): Promise<void> {
  if (member.isRepoDeleted) {
    console.log(`${member.login}'s repo is already deleted`);
    return;
  }

  try {
    await deleteARepository(repo(member));

    member.isRepoDeleted = true;

    console.log(`Deleted ${member.login}'s repo`);
  } catch (e) {
    console.warn(`Cannot delete ${member.login}'s repo`);
    console.error(e);
  }
}

function printLinks(lesson: number, lazyMembers: Member[]): void {
  lazyMembers.forEach((member) => {
    const link = `https://github.com/${APP_CONFIG.org}/${repo(member)}/tree/lesson-${lesson}`;
    console.log(link);
  });
}
