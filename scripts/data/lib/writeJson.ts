import fs from "node:fs";
import path from "node:path";

function writeFileSafely(file: string, value: string): void {
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  const tempFile = path.resolve(dir, `.${path.basename(file)}.${process.pid}.${Date.now()}.tmp`);
  try {
    fs.writeFileSync(tempFile, value, "utf8");
    fs.rmSync(file, { force: true });
    fs.renameSync(tempFile, file);
  } catch (error) {
    fs.rmSync(tempFile, { force: true });
    throw error;
  }
}

export function writeJson(file: string, value: unknown): void {
  const text = `${JSON.stringify(value, null, 2)}\n`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  try {
    fs.writeFileSync(file, text, "utf8");
  } catch {
    writeFileSafely(file, text);
  }
}

export function writeText(file: string, value: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  try {
    fs.writeFileSync(file, value, "utf8");
  } catch {
    writeFileSafely(file, value);
  }
}
