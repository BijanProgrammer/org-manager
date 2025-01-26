import { createAnOrganizationInvitation, listTeams } from "../api/org.api.js";

import { fsReadEmails } from "../io/emails.io.js";

import { reason } from "../utils/error.utils.js";

export async function printTeams(): Promise<void> {
  const res = await listTeams();

  const teams = [...res.data].map((x) => ({
    id: x.id,
    name: x.name,
    description: x.description,
  }));

  console.log(teams);
}

export async function inviteAllEmails(): Promise<void> {
  const emails: string[] = await fsReadEmails();

  for (const email of emails) {
    await inviteOneEmail(email);
  }
}

export async function inviteOneEmail(email: string): Promise<void> {
  try {
    await createAnOrganizationInvitation(email);
    console.log(`Sent invitation to ${email}`);
  } catch (e) {
    console.log(`Cannot send invitation to ${email}. Reason: ${reason(e)}`);
  }
}
