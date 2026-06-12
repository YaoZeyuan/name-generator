import path from "node:path";
import type { CharDb } from "../../packages/name-core/src";
import { SOURCE_CONFIGS, getSourceConfig } from "../../packages/name-core/src";
import type { CandidateNameRecord, ExtractedNameToken, SourceRef } from "./types";
import { loadCandidateCharDb, sortObjectKeys } from "./lib/charDb";
import { createBuildContext } from "./lib/paths";
import { readJson } from "./lib/readJson";
import { splitChars } from "./lib/normalizeText";
import { writeJson, writeText } from "./lib/writeJson";
import { runIfMain } from "./lib/run";

type SourceStats = {
  id: string;
  label: string;
  rawCount: number;
  usableCount: number;
  skippedCount: number;
  frequency: number;
};

type SourceIndex = {
  generatedAt: string;
  sources: Record<string, SourceStats>;
  sourcePriority: typeof SOURCE_CONFIGS;
  totalCandidateCount: number;
};

function createEmptyCandidate(token: ExtractedNameToken, charDb: CharDb): CandidateNameRecord {
  const chars = splitChars(token.token) as [string, string];
  const charInfos = chars.map((char) => charDb[char]);
  return {
    name: token.token,
    sources: [],
    sourceIds: [],
    sourceReasons: [],
    sourceRefs: [],
    chars,
    frequency: 0,
    extractionMethods: [],
    tokenTypes: [],
    confidence: token.confidence,
    sourceStats: {
      totalFrequency: 0,
      sourceCount: 0,
      bestSourcePriority: 99,
    },
    tags: [],
    flags: {
      hasRareChar: charInfos.some((char) => char.count > 0 && char.count < 3),
      hasRiskChar: false,
      hasPolyphone: charInfos.some((char) => char.isPolyphone),
      isCommon: charInfos.every((char) => char.count >= 100),
      isLikelyNonNameWord: false,
    },
  };
}

function mergeUnique<T>(target: T[], values: T[]): void {
  for (const value of values) {
    if (!target.includes(value)) {
      target.push(value);
    }
  }
}

function appendSourceRefs(target: SourceRef[], values: SourceRef[]): void {
  const existing = new Set(target.map((item) => `${item.recordId}|${item.field}|${item.value}`));
  for (const value of values) {
    const key = `${value.recordId}|${value.field}|${value.value}`;
    if (!existing.has(key)) {
      target.push(value);
      existing.add(key);
    }
  }
}

export async function buildCandidateDb(): Promise<CandidateNameRecord[]> {
  const context = createBuildContext();
  const charDb = loadCandidateCharDb(context.rootDir);
  const extractedDir = path.resolve(context.databaseDir, "extracted");
  const candidateDir = path.resolve(context.databaseDir, "candidate");
  const tokens = readJson<ExtractedNameToken[]>(path.resolve(extractedDir, "name_tokens.json"));
  const rejected = readJson<ExtractedNameToken[]>(path.resolve(extractedDir, "rejected_tokens.json"));
  const candidateMap = new Map<string, CandidateNameRecord>();
  const sourceIndex: SourceIndex = {
    generatedAt: new Date().toISOString(),
    sources: Object.fromEntries(
      SOURCE_CONFIGS.map((source) => [
        source.id,
        {
          id: source.id,
          label: source.label,
          rawCount: 0,
          usableCount: 0,
          skippedCount: 0,
          frequency: 0,
        },
      ])
    ),
    sourcePriority: SOURCE_CONFIGS,
    totalCandidateCount: 0,
  };

  for (const rejectedToken of rejected) {
    for (const sourceId of rejectedToken.sourceIds) {
      const stats = sourceIndex.sources[sourceId];
      if (stats) {
        stats.skippedCount += 1;
      }
    }
  }

  for (const token of tokens) {
    const chars = splitChars(token.token);
    if (chars.length !== 2 || chars.some((char) => !charDb[char])) {
      continue;
    }

    let candidate = candidateMap.get(token.token);
    if (!candidate) {
      candidate = createEmptyCandidate(token, charDb);
      candidateMap.set(token.token, candidate);
    }

    candidate.frequency += token.frequency;
    candidate.sourceStats.totalFrequency += token.frequency;
    candidate.confidence = Math.max(candidate.confidence, token.confidence);
    mergeUnique(candidate.extractionMethods, [token.extractionMethod]);
    mergeUnique(candidate.tokenTypes, [token.tokenType]);
    mergeUnique(candidate.tags, [token.tokenType]);
    appendSourceRefs(candidate.sourceRefs, token.sourceRefs);

    for (const sourceId of token.sourceIds) {
      const source = getSourceConfig(sourceId);
      const stats = sourceIndex.sources[source.id];
      if (stats) {
        stats.rawCount += token.sourceRefs.length;
        stats.usableCount += 1;
        stats.frequency += token.frequency;
      }

      if (!candidate.sourceIds.includes(source.id)) {
        candidate.sourceIds.push(source.id);
        candidate.sources.push({
          id: source.id,
          label: source.label,
          priority: source.priority,
          weight: source.weight,
          category: source.category,
          reason: source.description,
        });
        candidate.sourceReasons.push(source.description);
      }
    }
  }

  const candidateDb = Array.from(candidateMap.values()).map((candidate) => {
    candidate.sources.sort((a, b) => a.priority - b.priority);
    candidate.sourceIds = candidate.sources.map((source) => source.id);
    candidate.sourceReasons = candidate.sources.map((source) => source.reason);
    candidate.sourceStats.sourceCount = candidate.sourceIds.length;
    candidate.sourceStats.bestSourcePriority = Math.min(...candidate.sources.map((source) => source.priority));
    return candidate;
  });

  candidateDb.sort((a, b) => {
    if (a.sourceStats.bestSourcePriority !== b.sourceStats.bestSourcePriority) {
      return a.sourceStats.bestSourcePriority - b.sourceStats.bestSourcePriority;
    }
    if (b.frequency !== a.frequency) {
      return b.frequency - a.frequency;
    }
    return a.name.localeCompare(b.name, "zh-Hans-CN");
  });

  sourceIndex.totalCandidateCount = candidateDb.length;
  writeJson(path.resolve(candidateDir, "candidate_char_db.json"), sortObjectKeys(charDb));
  writeJson(path.resolve(candidateDir, "candidate_name_db.json"), candidateDb);
  writeJson(path.resolve(candidateDir, "source_index.json"), sourceIndex);
  writeText(
    path.resolve(candidateDir, "README.md"),
    `# 候选名数据库

本目录由 \`scripts/data/buildCandidateDb.ts\` 生成，输入来自 \`database/extracted/name_tokens.json\`。

- \`candidate_name_db.json\`: 统一候选二字名库，保留兼容 \`name-core\` 的字段，并追加 \`sourceRefs\`、频次和抽取方法。
- \`candidate_char_db.json\`: 查询和评分所需字级拼音信息，读音数据来自旧拼音字库。
- \`source_index.json\`: 来源优先级和生成统计。

生成时间：${sourceIndex.generatedAt}

候选名总数：${sourceIndex.totalCandidateCount}
`
  );

  console.log(`[candidate] generated: ${candidateDb.length}`);
  return candidateDb;
}

runIfMain("buildCandidateDb.ts", async () => {
  await buildCandidateDb();
});

