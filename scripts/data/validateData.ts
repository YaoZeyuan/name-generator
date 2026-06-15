import fs from "node:fs";
import path from "node:path";
import { dataSourceAdapters } from "./adapters";
import type {
  CandidateNameRecord,
  ExtractedNameToken,
  RejectedNameToken,
  StoredNameToken,
  StoredRejectedNameToken,
} from "./types";
import { loadCandidateCharDb } from "./lib/charDb";
import { createBuildContext } from "./lib/paths";
import { readJson } from "./lib/readJson";
import { isKnownRejectReason } from "./lib/rejectReason";
import { isTwoChineseChars, splitChars } from "./lib/normalizeText";
import { runIfMain } from "./lib/run";

type ValidationSummary = {
  sourceRecordCount: number;
  tokenCount: number;
  rejectedTokenCount: number;
  candidateCount: number;
  totalShardCandidateCount: number;
  defaultSourceId: string;
  charCount: number;
  errors: string[];
  warnings: string[];
  sampleStatus: Record<string, { default: boolean; anySource: boolean }>;
};

function assertFile(file: string, errors: string[]): void {
  if (!fs.existsSync(file)) {
    errors.push(`missing file: ${file}`);
  }
}

type StoredTokenInput = ExtractedNameToken | StoredNameToken | { n?: string; s?: string[]; f?: number };
type StoredRejectedInput = RejectedNameToken | StoredRejectedNameToken | { s?: string[]; sourceIds?: string[]; rejectReasons?: string[] };
type StoredCandidateInput = CandidateNameRecord | string;

function getSourceRecords(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (value && typeof value === "object" && "records" in value && Array.isArray(value.records)) {
    return value.records;
  }
  return [];
}

function getTokenName(token: StoredTokenInput): string {
  if (Array.isArray(token)) {
    return String(token[0] || "");
  }
  return "token" in token ? String(token.token || "") : String(token.n || "");
}

function getRejectedReasons(token: StoredRejectedInput): string[] {
  if (Array.isArray(token)) {
    return Array.isArray(token[2]) ? token[2] : [];
  }
  return Array.isArray(token.rejectReasons) ? token.rejectReasons : [];
}

function getCandidateName(candidate: StoredCandidateInput): string {
  return typeof candidate === "string" ? candidate : candidate.name;
}

function getCandidateChars(candidate: StoredCandidateInput): string[] {
  return typeof candidate === "string" ? splitChars(candidate) : candidate.chars;
}

function getCandidateSourceIds(candidate: StoredCandidateInput, fallbackSourceId: string): string[] {
  return typeof candidate === "string" ? [fallbackSourceId] : candidate.sourceIds;
}

export async function validateData(): Promise<ValidationSummary> {
  const context = createBuildContext();
  const sourceDir = path.resolve(context.databaseDir, "source");
  const extractedDir = path.resolve(context.databaseDir, "extracted");
  const candidateDir = path.resolve(context.databaseDir, "candidate");
  const charDb = loadCandidateCharDb(context.rootDir);
  const errors: string[] = [];
  const warnings: string[] = [];
  let sourceRecordCount = 0;

  assertFile(path.resolve(sourceDir, "source_manifest.json"), errors);
  assertFile(path.resolve(extractedDir, "name_tokens.json"), errors);
  assertFile(path.resolve(extractedDir, "rejected_tokens.json"), errors);
  assertFile(path.resolve(extractedDir, "token_frequency.json"), errors);
  assertFile(path.resolve(candidateDir, "candidate_name_db.json"), errors);
  assertFile(path.resolve(candidateDir, "candidate_char_db.json"), errors);
  assertFile(path.resolve(candidateDir, "source_index.json"), errors);

  if (errors.length > 0) {
    const summary = {
      sourceRecordCount: 0,
      tokenCount: 0,
      rejectedTokenCount: 0,
      candidateCount: 0,
      totalShardCandidateCount: 0,
      defaultSourceId: "",
      charCount: Object.keys(charDb).length,
      errors,
      warnings,
      sampleStatus: {},
    };
    console.log(JSON.stringify(summary, null, 2));
    process.exit(1);
  }

  for (const adapter of dataSourceAdapters) {
    const records = getSourceRecords(readJson<unknown>(path.resolve(sourceDir, adapter.recordFile)));
    sourceRecordCount += records.length;
    if (records.length === 0) {
      errors.push(`${adapter.recordFile} has no records`);
    }
  }

  const tokens = readJson<StoredTokenInput[]>(path.resolve(extractedDir, "name_tokens.json"));
  const rejected = readJson<StoredRejectedInput[]>(path.resolve(extractedDir, "rejected_tokens.json"));
  const candidates = readJson<StoredCandidateInput[]>(path.resolve(candidateDir, "candidate_name_db.json"));
  const candidateCharDb = readJson<Record<string, unknown>>(path.resolve(candidateDir, "candidate_char_db.json"));
  const sourceIndex = readJson<any>(path.resolve(candidateDir, "source_index.json"));
  const sourceFiles = Object.values(sourceIndex.sources || {}) as Array<{
    id: string;
    file: string;
    candidateCount: number;
  }>;
  const shardCandidates: StoredCandidateInput[] = [];

  tokens.forEach((token, index) => {
    const name = getTokenName(token);
    const reasons: string[] = [];
    if (!isTwoChineseChars(name)) {
      reasons.push("not_two_chinese_chars");
    }
    for (const char of splitChars(name)) {
      if (!charDb[char]) {
        reasons.push("char_not_in_db");
      }
    }
    if (reasons.length > 0) {
      errors.push(`name_tokens[${index}] ${name} invalid: ${reasons.join(",")}`);
    }
  });

  rejected.forEach((token, index) => {
    const rejectReasons = getRejectedReasons(token);
    if (rejectReasons.length === 0) {
      errors.push(`rejected_tokens[${index}] missing rejectReasons`);
    } else {
      for (const reason of rejectReasons) {
        if (!isKnownRejectReason(reason)) {
          errors.push(`rejected_tokens[${index}] unknown reject reason: ${reason}`);
        }
      }
    }
  });

  for (const sourceFile of sourceFiles) {
    const shardFile = path.resolve(candidateDir, sourceFile.file);
    assertFile(shardFile, errors);
    if (!fs.existsSync(shardFile)) {
      continue;
    }
    const shard = readJson<StoredCandidateInput[]>(shardFile);
    shardCandidates.push(...shard);
    if (sourceFile.candidateCount !== shard.length) {
      errors.push(`${sourceFile.id} candidate count mismatch: index=${sourceFile.candidateCount}, file=${shard.length}`);
    }
    const duplicateNames = shard.length - new Set(shard.map((item) => getCandidateName(item))).size;
    if (duplicateNames > 0) {
      errors.push(`${sourceFile.id} duplicate candidate names: ${duplicateNames}`);
    }
    const invalidLengthCandidates = shard.filter((item) => splitChars(getCandidateName(item)).length !== 2);
    if (invalidLengthCandidates.length > 0) {
      errors.push(`${sourceFile.id} invalid candidate length: ${invalidLengthCandidates.length}`);
    }
    const missingCharCandidates = shard.filter((item) => getCandidateChars(item).some((char) => !candidateCharDb[char]));
    if (missingCharCandidates.length > 0) {
      errors.push(`${sourceFile.id} missing char candidates: ${missingCharCandidates.length}`);
    }
    const wrongSourceCandidates = shard.filter(
      (item) => {
        const sourceIds = getCandidateSourceIds(item, sourceFile.id);
        return sourceIds.length !== 1 || sourceIds[0] !== sourceFile.id;
      }
    );
    if (wrongSourceCandidates.length > 0) {
      errors.push(`${sourceFile.id} contains candidates from other sources: ${wrongSourceCandidates.length}`);
    }
  }

  const defaultSourceFile = sourceFiles.find((item) => item.id === sourceIndex.defaultSourceId);
  if (defaultSourceFile && defaultSourceFile.candidateCount !== candidates.length) {
    errors.push(
      `default candidate count mismatch: default=${candidates.length}, ${defaultSourceFile.id}=${defaultSourceFile.candidateCount}`
    );
  }

  if (rejected.length === 0) {
    warnings.push("rejected_tokens.json is empty; check whether rejection paths are covered");
  }

  const sampleNames = ["瑾瑞", "弘俶", "歌游", "钱孙", "建国"];
  const sampleStatus = Object.fromEntries(
    sampleNames.map((name) => [
      name,
      {
        default: candidates.some((item) => getCandidateName(item) === name),
        anySource: shardCandidates.some((item) => getCandidateName(item) === name),
      },
    ])
  );
  const summary = {
    sourceRecordCount,
    tokenCount: tokens.length,
    rejectedTokenCount: rejected.length,
    candidateCount: candidates.length,
    totalShardCandidateCount: shardCandidates.length,
    defaultSourceId: sourceIndex.defaultSourceId,
    charCount: Object.keys(candidateCharDb).length,
    errors,
    warnings,
    sampleStatus,
  };

  console.log(JSON.stringify(summary, null, 2));
  if (errors.length > 0 || candidates.length === 0) {
    process.exit(1);
  }
  return summary;
}

runIfMain("validateData.ts", async () => {
  await validateData();
});
