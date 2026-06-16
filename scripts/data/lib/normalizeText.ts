const CJK_RE = /[\u3400-\u9fff]/u;

export function splitChars(input: string): string[] {
  return Array.from(input ?? "");
}

export function isChineseChar(char: string): boolean {
  return CJK_RE.test(char);
}

export function stripNonChinese(input: unknown): string {
  return splitChars(String(input ?? ""))
    .filter((char) => isChineseChar(char))
    .join("");
}

export function chineseLength(input: string): number {
  return splitChars(input).length;
}

export function isTwoChineseChars(input: string): boolean {
  return chineseLength(input) === 2 && splitChars(input).every((char) => isChineseChar(char));
}

export function takeNameTail(fullName: unknown): string | undefined {
  const cleaned = stripNonChinese(fullName);
  const chars = splitChars(cleaned);
  if (chars.length !== 3 && chars.length !== 4) {
    return undefined;
  }
  return chars.slice(-2).join("");
}

export function splitNameAliases(input: unknown): string[] {
  return String(input ?? "")
    .split(/[\/／、,，;；\s]+/u)
    .map((item) => stripNonChinese(item))
    .filter(Boolean);
}

export function sortChinese<T extends string>(items: T[]): T[] {
  return [...items].sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}

