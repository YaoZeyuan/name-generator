import path from "node:path";
import type { BuildContext, DataSourceAdapter, NormalizedSourceRecord } from "../types";
import { readJson } from "../lib/readJson";
import { splitNameAliases, stripNonChinese, takeNameTail } from "../lib/normalizeText";
import { makeRecordId } from "../lib/sourceRef";
import { createToken } from "../lib/token";

type ImperialExamRecord = {
  c_personid?: number;
  c_name_chn_simple?: string;
  c_alt_name_字_简体?: string;
  c_alt_name_别号_简体?: string;
  c_alt_name_别名_曾用名_简体?: string;
  c_dynasty_chn?: string;
  c_dynasty_chn_登科?: string;
  c_year?: number | string;
  c_exam_rank?: string;
};

const inputFile = "resource/登科录/古代进士名录.json";

export const imperialExamAdapter: DataSourceAdapter = {
  sourceId: "imperial_exam",
  sourceLabel: "登科录",
  recordFile: "imperial_exam.records.json",
  inputFiles: [inputFile, "resource/登科录/古代进士名录.csv", "resource/登科录/CBDB_2022.sqlite3"],

  async buildRecords(context: BuildContext): Promise<NormalizedSourceRecord[]> {
    const data = readJson<ImperialExamRecord[]>(path.resolve(context.rootDir, inputFile));
    return data.map((value, rawIndex) => {
      const fullName = stripNonChinese(value.c_name_chn_simple);
      const courtesyNames = splitNameAliases(value.c_alt_name_字_简体);
      const aliases = splitNameAliases(value.c_alt_name_别号_简体);
      const usedNames = splitNameAliases(value.c_alt_name_别名_曾用名_简体);
      return {
        id: makeRecordId("imperial_exam", rawIndex),
        sourceId: "imperial_exam",
        sourceLabel: "登科录",
        sourcePath: inputFile,
        rawIndex,
        rawText: value.c_name_chn_simple,
        rawFields: value as Record<string, unknown>,
        normalizedFields: {
          personId: value.c_personid ?? null,
          fullName,
          courtesyNames,
          aliases,
          usedNames,
          dynasty: value.c_dynasty_chn_登科 || value.c_dynasty_chn || null,
          year: value.c_year ?? null,
          rank: value.c_exam_rank || null,
        },
        extractedTexts: [
          {
            text: fullName,
            textType: "person_full_name",
            confidence: 0.82,
            note: "进士姓名，取尾二字参与候选",
          },
          ...courtesyNames.map((text) => ({
            text,
            textType: "courtesy_name" as const,
            confidence: 0.88,
            note: "进士字",
          })),
          ...aliases.map((text) => ({
            text,
            textType: "alias" as const,
            confidence: 0.3,
            note: "别号第一版只保留来源，不参与候选",
          })),
          ...usedNames.map((text) => ({
            text,
            textType: "alias" as const,
            confidence: 0.3,
            note: "曾用名第一版只保留来源，不参与候选",
          })),
        ].filter((item) => item.text),
      };
    });
  },

  async extractTokens(records: NormalizedSourceRecord[]) {
    const tokens = [];
    for (const record of records) {
      const fullName = String(record.normalizedFields.fullName || "");
      const tail = takeNameTail(fullName);
      if (tail) {
        tokens.push(
          createToken({
            record,
            token: tail,
            field: "c_name_chn_simple",
            value: fullName,
            sourceIds: ["imperial_exam"],
            tokenType: "given_name",
            extractionMethod: "take_name_tail",
            confidence: 0.82,
            sourceDetail: "imperial_exam_full_name_tail",
            relatedPerson: fullName,
          })
        );
      }

      const courtesyNames = record.normalizedFields.courtesyNames;
      if (Array.isArray(courtesyNames)) {
        for (const courtesyName of courtesyNames) {
          if (Array.from(courtesyName).length !== 2) {
            continue;
          }
          tokens.push(
            createToken({
              record,
              token: courtesyName,
              field: "c_alt_name_字_简体",
              value: courtesyName,
              sourceIds: ["imperial_exam"],
              tokenType: "courtesy_name",
              extractionMethod: "split_alias",
              confidence: 0.88,
              sourceDetail: "imperial_exam_courtesy_name",
              relatedPerson: fullName,
            })
          );
        }
      }
    }
    return tokens;
  },
};

