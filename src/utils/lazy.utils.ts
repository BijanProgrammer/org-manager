import { hashtag } from "./generator.utils.js";

import { fsReadChatHistory } from "../io/history.io.js";

import { Member } from "../types/member.type.js";
import { Message } from "../types/message.type.js";

export async function findLazyMembers(
  lesson: number,
  members: Member[],
): Promise<Member[]> {
  const messages = await fsReadChatHistory(lesson);

  const whitelist = extractWhitelist(lesson, messages);
  whitelist.push("BijanEisapour");

  return members.filter(
    (x) => !x.isKicked && !x.isRepoDeleted && !whitelist.includes(x.login),
  );
}

function extractWhitelist(lesson: number, messages: Message[]): string[] {
  const currentLessonMessages = filterByLesson(lesson, messages);
  const links = extractLinks(currentLessonMessages);
  return extractUsernames(links);
}

function filterByLesson(lesson: number, messages: Message[]): Message[] {
  return messages.filter((message) => hasLessonHashtag(lesson, message));
}

function hasLessonHashtag(lesson: number, message: Message): boolean {
  for (const entity of message.text_entities) {
    if (entity.type === "hashtag" && entity.text === hashtag(lesson)) {
      return true;
    }
  }

  return false;
}

function extractLinks(messages: Message[]): string[] {
  const links = messages.map(extractLink);
  return links.filter((x) => x !== null);
}

function extractLink(message: Message): string | null {
  for (const entity of message.text_entities) {
    if (entity.type === "link") {
      return entity.text;
    }

    if (entity.type === "text_link") {
      return entity.href;
    }
  }

  console.warn(`Cannot extract link. Message ID: ${message.id}`);
  return null;
}

function extractUsernames(links: string[]): string[] {
  const usernames = links.map((link) => {
    const pattern = /\/bootcamp-2024-free-nextjs-(.*?)\//;
    const groups = pattern.exec(link);

    const username = groups?.[1];

    if (!username) {
      console.warn(`Cannot extract username. Link: ${link}`);
      return null;
    }

    return username;
  });

  return usernames.filter((x) => x !== null);
}
