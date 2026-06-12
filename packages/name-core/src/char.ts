import type { CharDb, CharInfo, LegacyCharRecord } from "./types";

const CJK_RE = /[\u3400-\u9fff]/u;

export function isChineseChar(char: string): boolean {
  return CJK_RE.test(char);
}

export function splitChars(input: string): string[] {
  return Array.from(input);
}

export function stripNonChinese(input: string): string {
  return splitChars(input)
    .filter((char) => isChineseChar(char))
    .join("");
}

export function normalizeLegacyChar(record: LegacyCharRecord, isPolyphone = false): CharInfo {
  return {
    char: record.char,
    pinyin: record.pinyin,
    tone: record.tone,
    pinyinWithoutTone: record.pinyin_without_tone,
    initial: record.initial_声母,
    initialMethod: record.initial_声母类别_发音方法,
    initialPlace: record.initial_声母类别_发音部位,
    vowel: record.vowel_韵母,
    vowelType: record.vowel_韵母类别,
    count: record.count ?? 0,
    isPolyphone,
  };
}

export function getCharInfo(charDb: CharDb, char: string): CharInfo | undefined {
  return charDb[char];
}

export function getStringCharInfos(charDb: CharDb, input: string): CharInfo[] {
  return splitChars(stripNonChinese(input))
    .map((char) => getCharInfo(charDb, char))
    .filter((item): item is CharInfo => Boolean(item));
}

export function getSurnameLastCharInfo(charDb: CharDb, surname: string): CharInfo {
  const chars = getStringCharInfos(charDb, surname);
  const last = chars[chars.length - 1];
  if (!last) {
    throw new Error(`无法识别姓氏「${surname}」的读音，请检查字库是否包含该姓氏`);
  }
  return last;
}
