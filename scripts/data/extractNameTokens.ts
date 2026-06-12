import path from "node:path";
import { dataSourceAdapters } from "./adapters";
import type { ExtractedNameToken, NormalizedSourceRecord, RejectedNameToken } from "./types";
import { loadCandidateCharDb } from "./lib/charDb";
import { createBuildContext } from "./lib/paths";
import { readJson } from "./lib/readJson";
import { validateToken } from "./lib/rejectReason";
import { chineseLength, sortChinese, splitChars, stripNonChinese } from "./lib/normalizeText";
import { writeJson } from "./lib/writeJson";
import { runIfMain } from "./lib/run";

type TokenFrequencyRecord = {
  token: string;
  frequency: number;
  sourceIds: string[];
};

type CharFrequencyRecord = {
  char: string;
  frequency: number;
};

function tokenKey(token: ExtractedNameToken): string {
  const sourceIds = sortChinese(token.sourceIds);
  return [token.token, token.tokenType, token.extractionMethod, sourceIds.join(",")].join("|");
}

function mergeToken(target: ExtractedNameToken, source: ExtractedNameToken): void {
  target.frequency += source.frequency;
  target.confidence = Math.max(target.confidence, source.confidence);
  target.sourceIds = sortChinese(Array.from(new Set([...target.sourceIds, ...source.sourceIds])));
  target.sourceRefs.push(...source.sourceRefs);
}

function addCharFrequency(map: Map<string, number>, text: string, weight: number): void {
  for (const char of splitChars(stripNonChinese(text))) {
    map.set(char, (map.get(char) || 0) + weight);
  }
}

export async function extractNameTokens(): Promise<{
  tokens: ExtractedNameToken[];
  rejected: RejectedNameToken[];
}> {
  const context = createBuildContext();
  const charDb = loadCandidateCharDb(context.rootDir);
  const sourceDir = path.resolve(context.databaseDir, "source");
  const extractedDir = path.resolve(context.databaseDir, "extracted");
  const tokenMap = new Map<string, ExtractedNameToken>();
  const rejected: RejectedNameToken[] = [];
  const charFrequency = new Map<string, number>();

  for (const adapter of dataSourceAdapters) {
    const records = readJson<NormalizedSourceRecord[]>(path.resolve(sourceDir, adapter.recordFile));
    for (const record of records) {
      for (const extractedText of record.extractedTexts) {
        const text = stripNonChinese(extractedText.text);
        if (
          (extractedText.textType === "given_name" || extractedText.textType === "courtesy_name") &&
          chineseLength(text) === 1
        ) {
          const weight = Number(record.normalizedFields.counter || 1);
          addCharFrequency(charFrequency, text, weight);
        }
      }
    }

    const rawTokens = await adapter.extractTokens(records, context);
    for (const token of rawTokens) {
      const reasons = validateToken(token, charDb);
      if (reasons.length > 0) {
        rejected.push({
          ...token,
          rejectReasons: reasons,
        });
        continue;
      }

      addCharFrequency(charFrequency, token.token, token.frequency);
      const key = tokenKey(token);
      const existing = tokenMap.get(key);
      if (existing) {
        mergeToken(existing, token);
      } else {
        tokenMap.set(key, {
          ...token,
          sourceIds: sortChinese(Array.from(new Set(token.sourceIds))),
          sourceRefs: [...token.sourceRefs],
        });
      }
    }
    console.log(`[tokens] ${adapter.sourceLabel}: ${rawTokens.length} raw tokens`);
  }

  const tokens = Array.from(tokenMap.values()).sort((a, b) => {
    if (a.token !== b.token) return a.token.localeCompare(b.token, "zh-Hans-CN");
    return tokenKey(a).localeCompare(tokenKey(b), "zh-Hans-CN");
  });

  const tokenFrequency: TokenFrequencyRecord[] = Array.from(
    tokens.reduce((map, token) => {
      const current = map.get(token.token) || { token: token.token, frequency: 0, sourceIds: [] as string[] };
      current.frequency += token.frequency;
      current.sourceIds = sortChinese(Array.from(new Set([...current.sourceIds, ...token.sourceIds])));
      map.set(token.token, current);
      return map;
    }, new Map<string, TokenFrequencyRecord>()).values()
  ).sort((a, b) => b.frequency - a.frequency || a.token.localeCompare(b.token, "zh-Hans-CN"));

  const charFrequencyList: CharFrequencyRecord[] = Array.from(charFrequency.entries())
    .map(([char, frequency]) => ({ char, frequency }))
    .sort((a, b) => b.frequency - a.frequency || a.char.localeCompare(b.char, "zh-Hans-CN"));

  writeJson(path.resolve(extractedDir, "name_tokens.json"), tokens);
  writeJson(path.resolve(extractedDir, "rejected_tokens.json"), rejected);
  writeJson(path.resolve(extractedDir, "token_frequency.json"), {
    generatedAt: new Date().toISOString(),
    tokenCount: tokens.length,
    rejectedCount: rejected.length,
    tokens: tokenFrequency,
    chars: charFrequencyList,
  });

  console.log(`[tokens] accepted: ${tokens.length}, rejected: ${rejected.length}`);
  return { tokens, rejected };
}

runIfMain("extractNameTokens.ts", async () => {
  await extractNameTokens();
});

