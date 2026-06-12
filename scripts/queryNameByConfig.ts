const fs = require("node:fs");
const path = require("node:path");
const { queryNames, toPublicResult } = require("../packages/name-core/dist");

const root: string = path.resolve(__dirname, "..");
const configPath: string = path.resolve(root, process.argv[2] || "config/name-query.example.json");
const candidateDir: string = path.resolve(root, "database", "candidate");

function readJson<T = unknown>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

if (!fs.existsSync(configPath)) {
  console.error(`配置文件不存在：${configPath}`);
  process.exit(1);
}

const candidateFile = path.resolve(candidateDir, "candidate_name_db.json");
const charFile = path.resolve(candidateDir, "candidate_char_db.json");
if (!fs.existsSync(candidateFile) || !fs.existsSync(charFile)) {
  console.error("候选名数据库不存在，请先运行 npm run build:candidate-db");
  process.exit(1);
}

const query = readJson<any>(configPath);
const candidateDb = readJson<any[]>(candidateFile);
const charDb = readJson<Record<string, unknown>>(charFile);
const results = queryNames({ candidateDb, charDb, query });
const publicResults = results.map(toPublicResult);

const output = {
  query,
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
