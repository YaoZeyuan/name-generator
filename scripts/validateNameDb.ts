const fs = require("node:fs");
const path = require("node:path");

const root: string = path.resolve(__dirname, "..");
const candidateDir: string = path.resolve(root, "api", "database", "candidate");

function readJson<T = unknown>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

const candidateFile = path.resolve(candidateDir, "candidate_name_db.json");
const charFile = path.resolve(candidateDir, "candidate_char_db.json");
const sourceFile = path.resolve(candidateDir, "source_index.json");

if (!fs.existsSync(candidateFile) || !fs.existsSync(charFile) || !fs.existsSync(sourceFile)) {
  console.error("候选名数据库不存在，请先运行 npm run build:candidate-db");
  process.exit(1);
}

const candidates = readJson<any[]>(candidateFile);
const charDb = readJson<Record<string, unknown>>(charFile);
const sourceIndex = readJson<any>(sourceFile);

const duplicateNames = candidates.length - new Set(candidates.map((item) => item.name)).size;
const missingCharCandidates = candidates.filter((item) => item.chars.some((char: string) => !charDb[char]));
const invalidLengthCandidates = candidates.filter((item) => Array.from(item.name).length !== 2);

const sampleNames = ["瑾瑞", "弘俶", "歌游", "钱孙", "建国"];
const sampleStatus = Object.fromEntries(
  sampleNames.map((name) => [name, candidates.some((item) => item.name === name)])
);

const summary = {
  candidateCount: candidates.length,
  charCount: Object.keys(charDb).length,
  duplicateNames,
  missingCharCandidateCount: missingCharCandidates.length,
  invalidLengthCandidateCount: invalidLengthCandidates.length,
  sourceCounts: sourceIndex.sources,
  sampleStatus,
};

console.log(JSON.stringify(summary, null, 2));

if (candidates.length === 0 || duplicateNames > 0 || missingCharCandidates.length > 0 || invalidLengthCandidates.length > 0) {
  process.exit(1);
}
