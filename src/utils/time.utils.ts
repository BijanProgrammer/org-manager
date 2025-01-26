export async function waitASecond(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 100));
}
