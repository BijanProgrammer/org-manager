export function dir(message: unknown): void {
  console.dir(message, {
    depth: Infinity,
    colors: true,
  });
}
