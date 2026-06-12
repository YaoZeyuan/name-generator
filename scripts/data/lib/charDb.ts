import path from "node:path";
import type { CharDb, LegacyCharRecord } from "../../../packages/name-core/src";
import { normalizeLegacyChar } from "../../../packages/name-core/src";
import { readJson } from "./readJson";

export function loadCandidateCharDb(rootDir: string): CharDb {
  const legacyCharDb = readJson<Record<string, LegacyCharRecord>>(
    path.resolve(rootDir, "old", "database", "char_db", "zd_without_muilt_tone_char_db.json")
  );
  const activePolyphones = new Set(
    readJson<{ char: string }[]>(
      path.resolve(rootDir, "old", "database", "char_db", "主动规定发音的多音字列表.json")
    ).map((item) => item.char)
  );

  const charDb: CharDb = {};
  for (const [char, record] of Object.entries(legacyCharDb)) {
    charDb[char] = normalizeLegacyChar(record, activePolyphones.has(char));
  }
  return charDb;
}

export function sortObjectKeys<T>(input: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(input).sort(([a], [b]) => a.localeCompare(b, "zh-Hans-CN")));
}

