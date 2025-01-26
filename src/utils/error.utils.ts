import { Err } from "../types/err.type.js";

export function reason(error: unknown): string {
  return (error as Err).response.data.errors[0].message;
}
