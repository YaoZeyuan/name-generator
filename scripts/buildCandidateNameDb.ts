const fs = require("node:fs");
const path = require("node:path");
const {
  SOURCE_CONFIGS,
  getSourceConfig,
  normalizeLegacyChar,
  stripNonChinese,
} = require("../packages/name-core/dist");

type SourceFile = {
  id: string;
  file: string;
};

type SourceStats = {
  id: string;
  label: string;
  rawCount: number;
  usableCount: number;
  skippedCount: number;
};

type SourceIndex = {
  generatedAt: string;
  sources: Record<string, SourceStats>;
  sourcePriority: unknown[];
  totalCandidateCount: number;
};

const root: string = path.resolve(__dirname, "..");
const outDir: string = path.resolve(root, "database", "candidate");

const sourceFiles: SourceFile[] = [
  {
    id: "wealth_selected",
    file: path.resolve(root, "old", "database", "name_db", "财富论_私募基金_精选集_出现3_300次.json"),
  },
  {
    id: "wealth_broad",
    file: path.resolve(root, "old", "database", "name_db", "财富论_私募基金_集思录_出现1_2次.json"),
  },
  {
    id: "academic_selected",
    file: path.resolve(root, "old", "database", "name_db", "五道口_精选集_国家科研基金项目负责人名.json"),
  },
  {
    id: "academic_broad",
    file: path.resolve(root, "old", "database", "name_db", "五道口_集思录_cnki项目申报人名.json"),
  },
  {
    id: "modern_people",
    file: path.resolve(root, "old", "database", "name_db", "他山石_已知人名.json"),
  },
  {
    id: "imperial_exam",
    file: path.resolve(root, "old", "database", "name_db", "登科录_历史进士名.json"),
  },
  {
    id: "ancient_names",
    file: path.resolve(root, "old", "database", "name_db", "古人云_历史人名.json"),
  },
];

function readJson<T = unknown>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function writeJson(file: string, value: unknown): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function sortObjectKeys<T>(input: Record<string, T>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(input).sort(([a], [b]) => a.localeCompare(b, "zh-Hans-CN"))
  );
}

const legacyCharDb = readJson<Record<string, unknown>>(
  path.resolve(root, "old", "database", "char_db", "zd_without_muilt_tone_char_db.json")
);
const activePolyphones = new Set<string>(
  readJson<{ char: string }[]>(
    path.resolve(root, "old", "database", "char_db", "主动规定发音的多音字列表.json")
  ).map((item) => item.char)
);

const charDb: Record<string, unknown> = {};
for (const [char, record] of Object.entries(legacyCharDb)) {
  charDb[char] = normalizeLegacyChar(record, activePolyphones.has(char));
}

const candidateMap = new Map<string, any>();
const sourceIndex: SourceIndex = {
  generatedAt: new Date().toISOString(),
  sources: {},
  sourcePriority: SOURCE_CONFIGS,
  totalCandidateCount: 0,
};

for (const sourceFile of sourceFiles) {
  const source = getSourceConfig(sourceFile.id);
  const rawNames = readJson<string[]>(sourceFile.file);
  const sourceStats: SourceStats = {
    id: source.id,
    label: source.label,
    rawCount: rawNames.length,
    usableCount: 0,
    skippedCount: 0,
  };

  for (const rawName of rawNames) {
    const name = stripNonChinese(String(rawName));
    const chars = Array.from(name);
    if (chars.length !== 2) {
      sourceStats.skippedCount += 1;
      continue;
    }

    const charInfos = chars.map((char) => charDb[char]);
    if (charInfos.some((item) => !item)) {
      sourceStats.skippedCount += 1;
      continue;
    }

    let candidate = candidateMap.get(name);
    if (!candidate) {
      candidate = {
        name,
        sources: [],
        sourceIds: [],
        sourceReasons: [],
        chars,
        flags: {
          hasRareChar: charInfos.some((char: any) => char.count > 0 && char.count < 3),
          hasRiskChar: false,
          isCommon: charInfos.every((char: any) => char.count >= 100),
        },
      };
      candidateMap.set(name, candidate);
    }

    if (!candidate.sourceIds.includes(source.id)) {
      candidate.sources.push({
        id: source.id,
        label: source.label,
        priority: source.priority,
        weight: source.weight,
        category: source.category,
        reason: source.description,
      });
      candidate.sourceIds.push(source.id);
      candidate.sourceReasons.push(source.description);
    }
    sourceStats.usableCount += 1;
  }

  sourceIndex.sources[source.id] = sourceStats;
}

const candidateDb = Array.from(candidateMap.values()).map((candidate) => {
  candidate.sources.sort((a: any, b: any) => a.priority - b.priority);
  candidate.sourceIds = candidate.sources.map((source: any) => source.id);
  candidate.sourceReasons = candidate.sources.map((source: any) => source.reason);
  return candidate;
});

candidateDb.sort((a, b) => {
  const priorityA = Math.min(...a.sources.map((source: any) => source.priority));
  const priorityB = Math.min(...b.sources.map((source: any) => source.priority));
  if (priorityA !== priorityB) return priorityA - priorityB;
  return a.name.localeCompare(b.name, "zh-Hans-CN");
});

sourceIndex.totalCandidateCount = candidateDb.length;

writeJson(path.resolve(outDir, "candidate_char_db.json"), sortObjectKeys(charDb));
writeJson(path.resolve(outDir, "candidate_name_db.json"), candidateDb);
writeJson(path.resolve(outDir, "source_index.json"), sourceIndex);

const readme = `# 候选名数据库

本目录由 \`scripts/buildCandidateNameDb.ts\` 生成。

- \`candidate_name_db.json\`: 统一候选二字名库。
- \`candidate_char_db.json\`: 查询和评分所需字级拼音信息。
- \`source_index.json\`: 来源优先级和生成统计。

生成时间：${sourceIndex.generatedAt}

候选名总数：${sourceIndex.totalCandidateCount}
`;

fs.writeFileSync(path.resolve(outDir, "README.md"), readme, "utf8");

console.log(`候选名数据库生成完毕，共 ${candidateDb.length} 个候选名。`);
