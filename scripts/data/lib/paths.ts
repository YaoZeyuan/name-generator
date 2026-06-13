import path from "node:path";
import type { BuildContext } from "../types";

export function createBuildContext(): BuildContext {
  const rootDir = process.cwd();
  return {
    rootDir,
    resourceDir: path.resolve(rootDir, "resource"),
    databaseDir: path.resolve(rootDir, "api", "database"),
  };
}

export function fromRoot(...parts: string[]): string {
  return path.resolve(process.cwd(), ...parts);
}

export function toPosixPath(input: string): string {
  return input.split(path.sep).join("/");
}
