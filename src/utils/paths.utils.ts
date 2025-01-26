export function emailsFilePath(): string {
  return `data/emails.json`;
}

export function membersFilePath(): string {
  return `data/${APP_CONFIG.prefix}/members.json`;
}

export function chatHistoryFolderPath(): string {
  return `data/${APP_CONFIG.prefix}/history`;
}

export function roguePreventerFilePath(): string {
  return `data/rogue-preventer.json`;
}
