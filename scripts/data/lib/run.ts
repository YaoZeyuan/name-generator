import path from "node:path";

export function runIfMain(fileName: string, runner: () => Promise<void>): void {
  if (process.argv[1] && path.basename(process.argv[1]) === fileName) {
    runner().catch((error) => {
      console.error(error);
      process.exit(1);
    });
  }
}

