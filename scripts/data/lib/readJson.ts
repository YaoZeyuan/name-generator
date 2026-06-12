import fs from "node:fs";

export function readJson<T = unknown>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

