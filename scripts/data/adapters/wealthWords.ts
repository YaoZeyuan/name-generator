import path from "node:path";
import type { BuildContext, DataSourceAdapter, NormalizedSourceRecord, RejectReasonCode } from "../types";
import { readJson } from "../lib/readJson";
import { chineseLength, splitChars, stripNonChinese } from "../lib/normalizeText";
import { makeRecordId, makeSourceRef } from "../lib/sourceRef";
import { createToken } from "../lib/token";

type WordFrequencyRecord = {
  content?: string;
  count?: number;
};

const frequencyFile = "resource/fund_db/解析结果/基金名_分词_词频统计结果.json";
const companyFile = "resource/fund_db/原始数据/私募基金管理公司名称_截至20230507.json";
const fundFile = "resource/fund_db/原始数据/已公布私募基金名_截至20230507.json";
const maxSourceNamesPerToken = 5;

const nonNameWords = new Set([
  "投资",
  "基金",
  "私募",
  "证券",
  "合伙",
  "公司",
  "管理",
  "资产",
  "有限",
  "责任",
  "计划",
  "信托",
  "银行",
  "资本",
  "企业",
  "募集",
  "产品",
  "收益",
  "稳健",
  "增强",
  "量化",
  "指数",
  "期货",
  "股票",
  "债券",
  "期权",
  "货币",
  "精选",
  "成长",
  "价值",
  "中国",
  "上海",
  "北京",
  "深圳",
  "广州",
  "浙江",
  "江苏",
  "广东",
  "视频",
  "蜂巢",
  "帮扶",
  "轻盐",
  "熵零",
]);

function addSourceName(
  map: Map<string, string[]>,
  token: string,
  sourceName: string
): void {
  const current = map.get(token) || [];
  if (current.length >= maxSourceNamesPerToken || current.includes(sourceName)) {
    return;
  }
  current.push(sourceName);
  map.set(token, current);
}

function addSourceNamesFromRawList({
  map,
  tokenSet,
  rawNames,
  sourceType,
}: {
  map: Map<string, string[]>;
  tokenSet: Set<string>;
  rawNames: string[];
  sourceType: "基金" | "公司";
}): void {
  for (const rawName of rawNames) {
    const sourceName = String(rawName || "").trim();
    const chars = splitChars(stripNonChinese(sourceName));
    const seenInName = new Set<string>();
    for (let index = 0; index < chars.length - 1; index += 1) {
      const token = `${chars[index]}${chars[index + 1]}`;
      if (!tokenSet.has(token) || seenInName.has(token)) {
        continue;
      }
      seenInName.add(token);
      addSourceName(map, token, `${sourceType}:${sourceName}`);
    }
  }
}

function buildSourceNameIndex({
  context,
  words,
}: {
  context: BuildContext;
  words: WordFrequencyRecord[];
}): Map<string, string[]> {
  const tokenSet = new Set(
    words
      .map((value) => stripNonChinese(value.content))
      .filter((token) => chineseLength(token) === 2)
  );
  const map = new Map<string, string[]>();
  const fundNames = readJson<string[]>(path.resolve(context.rootDir, fundFile));
  const companyNames = readJson<string[]>(path.resolve(context.rootDir, companyFile));

  addSourceNamesFromRawList({
    map,
    tokenSet,
    rawNames: fundNames,
    sourceType: "基金",
  });
  addSourceNamesFromRawList({
    map,
    tokenSet,
    rawNames: companyNames,
    sourceType: "公司",
  });
  return map;
}

function parseWealthSourceName(sourceName: string): {
  sourceType: "基金" | "公司";
  rawName: string;
  sourceDetail: "wealth_fund_name" | "wealth_company_name";
} | null {
  if (sourceName.startsWith("基金:")) {
    return {
      sourceType: "基金",
      rawName: sourceName.slice("基金:".length),
      sourceDetail: "wealth_fund_name",
    };
  }
  if (sourceName.startsWith("公司:")) {
    return {
      sourceType: "公司",
      rawName: sourceName.slice("公司:".length),
      sourceDetail: "wealth_company_name",
    };
  }
  return null;
}

export const wealthWordsAdapter: DataSourceAdapter = {
  sourceId: "wealth",
  sourceLabel: "财富论",
  recordFile: "wealth.records.json",
  inputFiles: [
    companyFile,
    fundFile,
    frequencyFile,
  ],

  async buildRecords(context: BuildContext): Promise<NormalizedSourceRecord[]> {
    const data = readJson<WordFrequencyRecord[]>(path.resolve(context.rootDir, frequencyFile));
    const sourceNameIndex = buildSourceNameIndex({ context, words: data });
    return data.map((value, rawIndex) => {
      const content = stripNonChinese(value.content);
      const count = Number(value.count || 0);
      return {
        id: makeRecordId("wealth", rawIndex),
        sourceId: "wealth",
        sourceLabel: "财富论",
        sourcePath: frequencyFile,
        rawIndex,
        rawText: value.content,
        rawFields: value as Record<string, unknown>,
        normalizedFields: {
          content,
          count,
          sourceDetail: "fund_name_word_frequency",
          sourceNames: sourceNameIndex.get(content) || [],
        },
        extractedTexts: [
          {
            text: content,
            textType: "word_segment",
            confidence: 0.62,
            note: "来自既有基金名分词频率统计",
          },
        ],
      };
    });
  },

  async extractTokens(records: NormalizedSourceRecord[]) {
    const candidates = records
      .map((record) => {
        const token = String(record.normalizedFields.content || "");
        const frequency = Number(record.normalizedFields.count || 0);
        const rejectReasons: RejectReasonCode[] = [];
        if (chineseLength(token) !== 2) {
          rejectReasons.push("not_two_chinese_chars");
        }
        if (nonNameWords.has(token)) {
          rejectReasons.push("non_name_word");
        }
        return {
          record,
          token,
          frequency,
          rejectReasons,
        };
      })
      .filter((item) => item.token);

    return candidates.map((item) => {
      const token = createToken({
        record: item.record,
        token: item.token,
        field: "content",
        value: item.token,
        sourceIds: ["wealth"],
        tokenType: "fund_word",
        extractionMethod: "word_frequency",
        confidence: 0.62,
        frequency: Math.max(1, item.frequency),
        sourceDetail: "fund_name_word_frequency",
        rejectReasons: item.rejectReasons.length > 0 ? item.rejectReasons : undefined,
      });
      const sourceNames = Array.isArray(item.record.normalizedFields.sourceNames)
        ? item.record.normalizedFields.sourceNames
        : [];
      for (const sourceName of sourceNames) {
        const parsed = parseWealthSourceName(String(sourceName));
        if (!parsed || !parsed.rawName) {
          continue;
        }
        token.sourceRefs.push(
          makeSourceRef({
            record: item.record,
            field: parsed.sourceType,
            value: parsed.rawName,
            sourceDetail: parsed.sourceDetail,
          })
        );
      }
      return token;
    });
  },
};

