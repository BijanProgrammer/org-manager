export function dir(message: unknown): void {
  console.dir(message, {
    depth: Infinity,
    colors: true,
  });
}

export function divide(): void {
  console.log();
  console.log("\n" + "-".repeat(30) + "\n");
  console.log();
}
