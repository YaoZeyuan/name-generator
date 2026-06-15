import path from "node:path";
import type { BuildContext, DataSourceAdapter, NormalizedSourceRecord, RejectReasonCode } from "../types";
import { readJson } from "../lib/readJson";
import { chineseLength, stripNonChinese } from "../lib/normalizeText";
import { makeRecordId } from "../lib/sourceRef";
import { createToken } from "../lib/token";

type WordFrequencyRecord = {
  content?: string;
  count?: number;
};

const frequencyFile = "resource/fund_db/解析结果/基金名_分词_词频统计结果.json";

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

export const wealthWordsAdapter: DataSourceAdapter = {
  sourceId: "wealth",
  sourceLabel: "财富论",
  recordFile: "wealth.records.json",
  inputFiles: [
    "resource/fund_db/原始数据/私募基金管理公司名称_截至20230507.json",
    "resource/fund_db/原始数据/已公布私募基金名_截至20230507.json",
    frequencyFile,
  ],

  async buildRecords(context: BuildContext): Promise<NormalizedSourceRecord[]> {
    const data = readJson<WordFrequencyRecord[]>(path.resolve(context.rootDir, frequencyFile));
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
      return createToken({
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
    });
  },
};

