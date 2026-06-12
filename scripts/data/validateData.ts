import fs from "node:fs";
import path from "node:path";
import { dataSourceAdapters } from "./adapters";
import type { CandidateNameRecord, ExtractedNameToken, NormalizedSourceRecord, RejectedNameToken } from "./types";
import { loadCandidateCharDb } from "./lib/charDb";
import { createBuildContext } from "./lib/paths";
import { readJson } from "./lib/readJson";
import { isKnownRejectReason, validateToken } from "./lib/rejectReason";
import { splitChars } from "./lib/normalizeText";
import { runIfMain } from "./lib/run";

type ValidationSummary = {
  sourceRecordCount: number;
  tokenCount: number;
  rejectedTokenCount: number;
  candidateCount: number;
  charCount: number;
  errors: string[];
  warnings: string[];
  sampleStatus: Record<string, boolean>;
};

function assertFile(file: string, errors: string[]): void {
  if (!fs.existsSync(file)) {
    errors.push(`missing file: ${file}`);
  }
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
      charCount: Object.keys(charDb).length,
      errors,
      warnings,
      sampleStatus: {},
    };
    console.log(JSON.stringify(summary, null, 2));
    process.exit(1);
  }

  for (const adapter of dataSourceAdapters) {
    const records = readJson<NormalizedSourceRecord[]>(path.resolve(sourceDir, adapter.recordFile));
    sourceRecordCount += records.length;
    records.forEach((record, index) => {
      if (!record.id) errors.push(`${adapter.recordFile}[${index}] missing id`);
      if (!record.sourceId) errors.push(`${adapter.recordFile}[${index}] missing sourceId`);
      if (!record.sourcePath) errors.push(`${adapter.recordFile}[${index}] missing sourcePath`);
      if (typeof record.rawIndex !== "number") errors.push(`${adapter.recordFile}[${index}] missing rawIndex`);
    });
  }

  const tokens = readJson<ExtractedNameToken[]>(path.resolve(extractedDir, "name_tokens.json"));
  const rejected = readJson<RejectedNameToken[]>(path.resolve(extractedDir, "rejected_tokens.json"));
  const candidates = readJson<CandidateNameRecord[]>(path.resolve(candidateDir, "candidate_name_db.json"));
  const candidateCharDb = readJson<Record<string, unknown>>(path.resolve(candidateDir, "candidate_char_db.json"));

  tokens.forEach((token, index) => {
    const reasons = validateToken(token, charDb);
    if (reasons.length > 0) {
      errors.push(`name_tokens[${index}] ${token.token} invalid: ${reasons.join(",")}`);
    }
  });

  rejected.forEach((token, index) => {
    if (!token.rejectReasons || token.rejectReasons.length === 0) {
      errors.push(`rejected_tokens[${index}] missing rejectReasons`);
    } else {
      for (const reason of token.rejectReasons) {
        if (!isKnownRejectReason(reason)) {
          errors.push(`rejected_tokens[${index}] unknown reject reason: ${reason}`);
        }
      }
    }
  });

  const duplicateNames = candidates.length - new Set(candidates.map((item) => item.name)).size;
  if (duplicateNames > 0) {
    errors.push(`duplicate candidate names: ${duplicateNames}`);
  }
  const invalidLengthCandidates = candidates.filter((item) => splitChars(item.name).length !== 2);
  if (invalidLengthCandidates.length > 0) {
    errors.push(`invalid candidate length: ${invalidLengthCandidates.length}`);
  }
  const missingCharCandidates = candidates.filter((item) => item.chars.some((char) => !candidateCharDb[char]));
  if (missingCharCandidates.length > 0) {
    errors.push(`missing char candidates: ${missingCharCandidates.length}`);
  }
  const missingRefCandidates = candidates.filter((item) => !item.sourceRefs || item.sourceRefs.length === 0);
  if (missingRefCandidates.length > 0) {
    errors.push(`missing source refs: ${missingRefCandidates.length}`);
  }
  if (rejected.length === 0) {
    warnings.push("rejected_tokens.json is empty; check whether rejection paths are covered");
  }

  const sampleNames = ["瑾瑞", "弘俶", "歌游", "钱孙", "建国"];
  const sampleStatus = Object.fromEntries(sampleNames.map((name) => [name, candidates.some((item) => item.name === name)]));
  const summary = {
    sourceRecordCount,
    tokenCount: tokens.length,
    rejectedTokenCount: rejected.length,
    candidateCount: candidates.length,
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

