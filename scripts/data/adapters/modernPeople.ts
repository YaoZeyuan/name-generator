import path from "node:path";
import type { BuildContext, DataSourceAdapter, NormalizedSourceRecord } from "../types";
import { readJson } from "../lib/readJson";
import { stripNonChinese } from "../lib/normalizeText";
import { makeRecordId } from "../lib/sourceRef";
import { createToken } from "../lib/token";

type ModernPeopleRecord = {
  name?: string;
  counter?: number;
  length?: number;
};

const inputFile = "resource/person_name/已知人名.json";

export const modernPeopleAdapter: DataSourceAdapter = {
  sourceId: "modern_people",
  sourceLabel: "他山石",
  recordFile: "modern_people.records.json",
  inputFiles: [inputFile],

  async buildRecords(context: BuildContext): Promise<NormalizedSourceRecord[]> {
    const data = readJson<Record<string, ModernPeopleRecord>>(path.resolve(context.rootDir, inputFile));
    return Object.entries(data).map(([key, value], rawIndex) => {
      const name = stripNonChinese(value.name || key);
      const counter = Number(value.counter ?? 1);
      const length = Number(value.length ?? Array.from(name).length);
      return {
        id: makeRecordId("modern_people", rawIndex),
        sourceId: "modern_people",
        sourceLabel: "他山石",
        sourcePath: inputFile,
        rawIndex,
        rawText: value.name || key,
        rawFields: { key, ...value },
        normalizedFields: {
          name,
          counter,
          length,
        },
        extractedTexts: [
          {
            text: name,
            textType: "given_name",
            confidence: length === 2 ? 0.95 : 0.4,
            note: length === 2 ? "二字名候选" : "非二字名，仅参与字频统计",
          },
        ],
      };
    });
  },

  async extractTokens(records: NormalizedSourceRecord[]) {
    return records
      .filter((record) => record.normalizedFields.length === 2)
      .map((record) =>
        createToken({
          record,
          token: String(record.normalizedFields.name || ""),
          field: "name",
          value: String(record.normalizedFields.name || ""),
          sourceIds: ["modern_people"],
          tokenType: "modern_given_name",
          extractionMethod: "take_given_name",
          confidence: 0.95,
          frequency: Number(record.normalizedFields.counter || 1),
          sourceDetail: "modern_given_name",
        })
      );
  },
};

