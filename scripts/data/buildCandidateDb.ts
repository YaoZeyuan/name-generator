import path from "node:path";
import fs from "node:fs";
import type { CharDb } from "../../packages/name-core/src";
import { DEFAULT_SOURCE_ID, SOURCE_CONFIGS, getSourceConfig } from "../../packages/name-core/src";
import type {
  CandidateNameRecord,
  ExtractedNameToken,
  ExtractionMethod,
  RejectedNameToken,
  SourceRef,
  StoredNameToken,
  StoredRejectedNameToken,
  TokenType,
} from "./types";
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
  candidateCount: number;
  file: string;
  byteSize: number;
  percentileFilter?: {
    enabled: boolean;
    bucketCount: number;
    minSelectablePercent: number;
    defaultMinPercent: number;
    defaultMaxPercent: number;
  };
  sourceNameFile?: string;
};

type SourceIndex = {
  generatedAt: string;
  candidateFileMode: "compact_name_shards";
  defaultSourceId: string;
  defaultCandidateFile: string;
  sources: Record<string, SourceStats>;
  sourcePriority: typeof SOURCE_CONFIGS;
  totalCandidateCount: number;
  totalShardCandidateCount: number;
  candidateCharFile: string;
};

type StoredTokenInput = ExtractedNameToken | StoredNameToken | { n?: string; s?: string[]; f?: number };

type StoredRejectedInput = RejectedNameToken | StoredRejectedNameToken | { s?: string[]; sourceIds?: string[] };

type CandidateBuildToken = {
  token: string;
  sourceIds: string[];
  sourceRefs: SourceRef[];
  tokenType: TokenType;
  frequency: number;
  extractionMethod: ExtractionMethod;
  confidence: number;
  sourceNames: string[];
};

function normalizeSourceId(sourceId: string): string {
  if (sourceId === "wealth_selected" || sourceId === "wealth_broad") {
    return "wealth";
  }
  if (sourceId === "academic_selected" || sourceId === "academic_broad") {
    return "academic";
  }
  return sourceId;
}

function normalizeSourceIds(sourceIds: unknown): string[] {
  const normalized = Array.isArray(sourceIds)
    ? sourceIds.map((sourceId) => normalizeSourceId(String(sourceId))).filter((sourceId) => sourceId.length > 0)
    : [];
  return Array.from(new Set(normalized));
}

function getSourceNamesFromRefs(sourceRefs: SourceRef[]): string[] {
  const names: string[] = [];
  for (const sourceRef of sourceRefs) {
    const name = String(sourceRef.relatedPerson || sourceRef.value || "").trim();
    if (name && !names.includes(name)) {
      names.push(name);
    }
    if (names.length >= 5) {
      break;
    }
  }
  return names;
}

function normalizeStoredToken(input: StoredTokenInput): CandidateBuildToken | null {
  if (Array.isArray(input)) {
    const [token, sourceIds, frequency, sourceNames] = input;
    return {
      token: String(token || ""),
      sourceIds: normalizeSourceIds(sourceIds),
      sourceRefs: [],
      tokenType: "given_name",
      frequency: Math.max(1, Number(frequency || 1)),
      extractionMethod: "manual",
      confidence: 0.8,
      sourceNames: Array.isArray(sourceNames) ? sourceNames.slice(0, 5) : [],
    };
  }

  if ("token" in input) {
    const sourceRefs = Array.isArray(input.sourceRefs) ? input.sourceRefs : [];
    return {
      token: String(input.token || ""),
      sourceIds: normalizeSourceIds(input.sourceIds),
      sourceRefs,
      tokenType: input.tokenType || "given_name",
      frequency: Math.max(1, Number(input.frequency || 1)),
      extractionMethod: input.extractionMethod || "manual",
      confidence: Number(input.confidence || 0.8),
      sourceNames: getSourceNamesFromRefs(sourceRefs),
    };
  }

  return {
    token: String(input.n || ""),
    sourceIds: normalizeSourceIds(input.s),
    sourceRefs: [],
    tokenType: "given_name",
    frequency: Math.max(1, Number(input.f || 1)),
    extractionMethod: "manual",
    confidence: 0.8,
    sourceNames: [],
  };
}

function normalizeRejectedSourceIds(input: StoredRejectedInput): string[] {
  if (Array.isArray(input)) {
    return normalizeSourceIds(input[1]);
  }
  return normalizeSourceIds("sourceIds" in input ? input.sourceIds : input.s);
}

function toCompactCandidateDb(candidates: CandidateNameRecord[]): string[] {
  return candidates.map((candidate) => candidate.name);
}

function cleanLegacyCandidateFiles(candidateSourceDir: string): void {
  if (!fs.existsSync(candidateSourceDir)) {
    return;
  }
  for (const item of fs.readdirSync(candidateSourceDir)) {
    if (
      item.endsWith(".candidate_name_db.json") ||
      item.endsWith(".candidate_names.json") ||
      item.endsWith(".name_sources.json")
    ) {
      fs.rmSync(path.resolve(candidateSourceDir, item), { force: true });
    }
  }
}

function createEmptyCandidate(token: CandidateBuildToken, charDb: CharDb): CandidateNameRecord {
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

function addTokenToMap({
  map,
  token,
  sourceId,
  charDb,
  sourceIndex,
  sourceNameIndex,
}: {
  map: Map<string, CandidateNameRecord>;
  token: CandidateBuildToken;
  sourceId: string;
  charDb: CharDb;
  sourceIndex: SourceIndex;
  sourceNameIndex: Map<string, Map<string, string[]>>;
}): void {
  const source = getSourceConfig(sourceId);
  let candidate = map.get(token.token);
  if (!candidate) {
    candidate = createEmptyCandidate({ ...token, sourceIds: [sourceId] }, charDb);
    map.set(token.token, candidate);
  }

  candidate.frequency += token.frequency;
  candidate.sourceStats.totalFrequency += token.frequency;
  candidate.confidence = Math.max(candidate.confidence, token.confidence);
  mergeUnique(candidate.extractionMethods, [token.extractionMethod]);
  mergeUnique(candidate.tokenTypes, [token.tokenType]);
  mergeUnique(candidate.tags, [token.tokenType]);
  appendSourceRefs(candidate.sourceRefs, token.sourceRefs);

  const stats = sourceIndex.sources[source.id];
  if (stats) {
    stats.rawCount += Math.max(1, token.sourceRefs.length);
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

  if (token.sourceNames.length > 0) {
    let sourceNames = sourceNameIndex.get(source.id);
    if (!sourceNames) {
      sourceNames = new Map<string, string[]>();
      sourceNameIndex.set(source.id, sourceNames);
    }
    const current = sourceNames.get(token.token) || [];
    for (const sourceName of token.sourceNames) {
      if (!current.includes(sourceName)) {
        current.push(sourceName);
      }
      if (current.length >= 5) {
        break;
      }
    }
    sourceNames.set(token.token, current);
  }
}

function finalizeCandidates(candidateMap: Map<string, CandidateNameRecord>): CandidateNameRecord[] {
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
  return candidateDb;
}

export async function buildCandidateDb(): Promise<CandidateNameRecord[]> {
  const context = createBuildContext();
  const charDb = loadCandidateCharDb(context.rootDir);
  const extractedDir = path.resolve(context.databaseDir, "extracted");
  const candidateDir = path.resolve(context.databaseDir, "candidate");
  const candidateSourceDir = path.resolve(candidateDir, "sources");
  const tokens = readJson<StoredTokenInput[]>(path.resolve(extractedDir, "name_tokens.json"));
  const rejected = readJson<StoredRejectedInput[]>(path.resolve(extractedDir, "rejected_tokens.json"));
  const candidateMaps = new Map<string, Map<string, CandidateNameRecord>>(
    SOURCE_CONFIGS.map((source) => [source.id, new Map<string, CandidateNameRecord>()])
  );
  const sourceNameIndex = new Map<string, Map<string, string[]>>();
  const allCandidateNames = new Set<string>();
  const sourceIndex: SourceIndex = {
    generatedAt: new Date().toISOString(),
    candidateFileMode: "compact_name_shards",
    defaultSourceId: DEFAULT_SOURCE_ID,
    defaultCandidateFile: "candidate_name_db.json",
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
          candidateCount: 0,
          file: `sources/${source.id}.candidate_names.json`,
          byteSize: 0,
          percentileFilter:
            source.id === "wealth" || source.id === "academic"
              ? {
                  enabled: true,
                  bucketCount: 100,
                  minSelectablePercent: 2,
                  defaultMinPercent: 2,
                  defaultMaxPercent: 100,
                }
              : undefined,
          sourceNameFile:
            source.id === "imperial_exam" || source.id === "ancient_names"
              ? `sources/${source.id}.name_sources.json`
              : undefined,
        },
      ])
    ),
    sourcePriority: SOURCE_CONFIGS,
    totalCandidateCount: 0,
    totalShardCandidateCount: 0,
    candidateCharFile: "candidate_char_db.json",
  };

  for (const rejectedToken of rejected) {
    for (const sourceId of normalizeRejectedSourceIds(rejectedToken)) {
      const stats = sourceIndex.sources[sourceId];
      if (stats) {
        stats.skippedCount += 1;
      }
    }
  }

  for (const storedToken of tokens) {
    const token = normalizeStoredToken(storedToken);
    if (!token) {
      continue;
    }
    const chars = splitChars(token.token);
    if (chars.length !== 2 || chars.some((char) => !charDb[char])) {
      continue;
    }

    for (const sourceId of token.sourceIds) {
      const map = candidateMaps.get(sourceId);
      if (map) {
        addTokenToMap({ map, token, sourceId, charDb, sourceIndex, sourceNameIndex });
        allCandidateNames.add(token.token);
      }
    }
  }

  cleanLegacyCandidateFiles(candidateSourceDir);
  fs.mkdirSync(candidateSourceDir, { recursive: true });
  let defaultCandidateDb: CandidateNameRecord[] = [];
  let totalShardCandidateCount = 0;

  for (const source of SOURCE_CONFIGS) {
    const candidateDb = finalizeCandidates(candidateMaps.get(source.id) || new Map());
    const stats = sourceIndex.sources[source.id];
    totalShardCandidateCount += candidateDb.length;
    if (stats) {
      stats.candidateCount = candidateDb.length;
    }
    const file = path.resolve(candidateDir, stats?.file || `sources/${source.id}.candidate_names.json`);
    writeJson(file, toCompactCandidateDb(candidateDb));
    if (stats) {
      stats.byteSize = fs.statSync(file).size;
    }
    const sourceNames = sourceNameIndex.get(source.id);
    if (stats?.sourceNameFile && sourceNames) {
      writeJson(path.resolve(candidateDir, stats.sourceNameFile), Object.fromEntries(sourceNames.entries()));
    }
    if (source.id === DEFAULT_SOURCE_ID) {
      defaultCandidateDb = candidateDb;
    }
  }

  sourceIndex.totalCandidateCount = allCandidateNames.size;
  sourceIndex.totalShardCandidateCount = totalShardCandidateCount;
  writeJson(path.resolve(candidateDir, "candidate_char_db.json"), sortObjectKeys(charDb));
  writeJson(path.resolve(candidateDir, "candidate_name_db.json"), toCompactCandidateDb(defaultCandidateDb));
  writeJson(path.resolve(candidateDir, "source_index.json"), sourceIndex);
  writeText(
    path.resolve(candidateDir, "README.md"),
    `# 候选名数据库

本目录由 \`scripts/data/buildCandidateDb.ts\` 生成，输入来自 \`api/database/extracted/name_tokens.json\`。

- \`candidate_name_db.json\`: 默认来源（${DEFAULT_SOURCE_ID}）候选二字名库，保留兼容 \`name-core\` 的字段，并追加 \`sourceRefs\`、频次和抽取方法。
- \`sources/*.candidate_name_db.json\`: 按来源拆分的候选二字名库。实际查询应按 \`sourcePreference\` 只加载一个来源分片。
- \`candidate_char_db.json\`: 查询和评分所需字级拼音信息，读音数据来自旧拼音字库。
- \`source_index.json\`: 来源优先级和生成统计。

生成时间：${sourceIndex.generatedAt}

去重候选名总数：${sourceIndex.totalCandidateCount}

默认来源候选名数：${defaultCandidateDb.length}
`
  );

  writeText(
    path.resolve(candidateDir, "README.md"),
    `# Candidate runtime database

Generated by \`scripts/data/buildCandidateDb.ts\`.

- \`candidate_name_db.json\`: compact default-source candidate names for ${DEFAULT_SOURCE_ID}.
- \`sources/*.candidate_names.json\`: compact per-source candidate name shards.
- \`sources/*.name_sources.json\`: compact historical source-name lookup for result cards.
- \`candidate_char_db.json\`: character pronunciation and frequency data used by browser-side hydration/scoring.
- \`source_index.json\`: source metadata, shard paths, counts, and byte sizes.

Generated at: ${sourceIndex.generatedAt}

Unique candidate names: ${sourceIndex.totalCandidateCount}

Default source candidate names: ${defaultCandidateDb.length}
`
  );

  console.log(`[candidate] generated shards: ${totalShardCandidateCount}, unique: ${allCandidateNames.size}`);
  return defaultCandidateDb;
}

runIfMain("buildCandidateDb.ts", async () => {
  await buildCandidateDb();
});
