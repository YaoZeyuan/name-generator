const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const candidateDir = path.resolve(root, "database", "candidate");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const candidateFile = path.resolve(candidateDir, "candidate_name_db.json");
const charFile = path.resolve(candidateDir, "candidate_char_db.json");
const sourceFile = path.resolve(candidateDir, "source_index.json");

if (!fs.existsSync(candidateFile) || !fs.existsSync(charFile) || !fs.existsSync(sourceFile)) {
  console.error("候选名数据库不存在，请先运行 npm run build:candidate-db");
  process.exit(1);
}

const candidates = readJson(candidateFile);
const charDb = readJson(charFile);
const sourceIndex = readJson(sourceFile);

const duplicateNames = candidates.length - new Set(candidates.map((item) => item.name)).size;
const missingCharCandidates = candidates.filter((item) => item.chars.some((char) => !charDb[char]));
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
