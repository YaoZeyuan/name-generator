import path from "node:path";
import type { BuildContext, DataSourceAdapter, NormalizedSourceRecord } from "../types";
import { readJson } from "../lib/readJson";
import { stripNonChinese } from "../lib/normalizeText";
import { makeRecordId } from "../lib/sourceRef";
import { createToken } from "../lib/token";

type AncientNameRecord = {
  raw_name?: string;
  char_姓氏?: string;
  char_名?: string;
  char_字?: string;
};

const inputFile = "resource/old_person_name/中国古代人名与字-9336条-简体-opencc转换稿_手工替换_乾干.json";

export const ancientNamesAdapter: DataSourceAdapter = {
  sourceId: "ancient_names",
  sourceLabel: "古人云",
  recordFile: "ancient_names.records.json",
  inputFiles: [inputFile],

  async buildRecords(context: BuildContext): Promise<NormalizedSourceRecord[]> {
    const data = readJson<AncientNameRecord[]>(path.resolve(context.rootDir, inputFile));
    return data.map((value, rawIndex) => {
      const givenName = stripNonChinese(value.char_名);
      const courtesyName = stripNonChinese(value.char_字);
      return {
        id: makeRecordId("ancient_names", rawIndex),
        sourceId: "ancient_names",
        sourceLabel: "古人云",
        sourcePath: inputFile,
        rawIndex,
        rawText: value.raw_name,
        rawFields: value as Record<string, unknown>,
        normalizedFields: {
          rawName: stripNonChinese(value.raw_name),
          surname: stripNonChinese(value.char_姓氏),
          givenName,
          courtesyName,
        },
        extractedTexts: [
          {
            text: givenName,
            textType: "given_name",
            confidence: 0.85,
            note: "古人名",
          },
          {
            text: courtesyName,
            textType: "courtesy_name",
            confidence: 0.9,
            note: "古人字",
          },
        ].filter((item) => item.text),
      };
    });
  },

  async extractTokens(records: NormalizedSourceRecord[]) {
    const tokens = [];
    for (const record of records) {
      const givenName = String(record.normalizedFields.givenName || "");
      if (Array.from(givenName).length === 2) {
        tokens.push(
          createToken({
            record,
            token: givenName,
            field: "char_名",
            value: givenName,
            sourceIds: ["ancient_names"],
            tokenType: "given_name",
            extractionMethod: "take_given_name",
            confidence: 0.85,
            sourceDetail: "ancient_given_name",
            relatedPerson: String(record.normalizedFields.rawName || ""),
          })
        );
      }

      const courtesyName = String(record.normalizedFields.courtesyName || "");
      if (Array.from(courtesyName).length === 2) {
        tokens.push(
          createToken({
            record,
            token: courtesyName,
            field: "char_字",
            value: courtesyName,
            sourceIds: ["ancient_names"],
            tokenType: "courtesy_name",
            extractionMethod: "take_courtesy_name",
            confidence: 0.9,
            sourceDetail: "ancient_courtesy_name",
            relatedPerson: String(record.normalizedFields.rawName || ""),
          })
        );
      }
    }
    return tokens;
  },
};

