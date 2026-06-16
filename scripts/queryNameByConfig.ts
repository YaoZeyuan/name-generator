const fs = require("node:fs");
const path = require("node:path");
const { DEFAULT_SOURCE_ID, SOURCE_CONFIGS, hydrateCandidateDb, queryNames, toPublicResult } = require("../packages/name-core/dist");

const root: string = path.resolve(__dirname, "..");
const configPath: string = path.resolve(root, process.argv[2] || "config/name-query.example.json");
const candidateDir: string = path.resolve(root, "api", "database", "candidate");

function readJson<T = unknown>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/u, "")) as T;
}

if (!fs.existsSync(configPath)) {
  console.error(`配置文件不存在：${configPath}`);
  process.exit(1);
}

const candidateFile = path.resolve(candidateDir, "candidate_name_db.json");
const charFile = path.resolve(candidateDir, "candidate_char_db.json");
const sourceIndexFile = path.resolve(candidateDir, "source_index.json");
if (!fs.existsSync(candidateFile) || !fs.existsSync(charFile) || !fs.existsSync(sourceIndexFile)) {
  console.error("候选名数据库不存在，请先运行 npm run build:candidate-db");
  process.exit(1);
}

const query = readJson<any>(configPath);
const sourceIndex = readJson<any>(sourceIndexFile);
const sourcePreference = query.sourcePreference || "default";
const sourceId =
  sourcePreference === "default"
    ? sourceIndex.defaultSourceId || DEFAULT_SOURCE_ID
    : SOURCE_CONFIGS.find((source: any) => source.id === sourcePreference || source.label === sourcePreference)?.id;

if (!sourceId || !sourceIndex.sources?.[sourceId]) {
  console.error(`未知来源：${sourcePreference}`);
  console.error(`可用来源：${SOURCE_CONFIGS.map((source: any) => source.id).join(", ")}`);
  process.exit(1);
}

const sourceCandidateFile = path.resolve(candidateDir, sourceIndex.sources[sourceId].file || `sources/${sourceId}.candidate_names.json`);
if (!fs.existsSync(sourceCandidateFile)) {
  console.error(`来源候选库不存在：${sourceCandidateFile}`);
  process.exit(1);
}

const charDb = readJson<Record<string, unknown>>(charFile);
const candidateDb = hydrateCandidateDb({
  data: readJson<any[]>(sourceCandidateFile),
  sourceId,
  charDb,
  sourceNamesByName: sourceIndex.sources[sourceId].sourceNameFile
    ? readJson<Record<string, string[]>>(path.resolve(candidateDir, sourceIndex.sources[sourceId].sourceNameFile))
    : {},
});
const results = queryNames({ candidateDb, charDb, query });
const publicResults = results.map(toPublicResult);

const output = {
  query,
  loadedSource: {
    id: sourceId,
    label: sourceIndex.sources[sourceId].label,
    file: path.relative(root, sourceCandidateFile),
    candidateCount: candidateDb.length,
  },
  total: publicResults.length,
  results: publicResults,
};

if (query.outputPath) {
  const outputPath = path.resolve(root, query.outputPath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`查询结果已写入：${outputPath}`);
} else {
  console.log(JSON.stringify(output, null, 2));
}
