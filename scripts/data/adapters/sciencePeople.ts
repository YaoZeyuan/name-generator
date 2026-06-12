import fs from "node:fs";
import path from "node:path";
import type { BuildContext, DataSourceAdapter, NormalizedSourceRecord } from "../types";
import { stripNonChinese, takeNameTail } from "../lib/normalizeText";
import { makeRecordId } from "../lib/sourceRef";
import { createToken } from "../lib/token";

const scienceFiles = [
  {
    path: "resource/science/科学院院士名录.txt",
    detail: "academy_science",
    label: "科学院院士名录",
    candidateSourceId: "academic_selected",
  },
  {
    path: "resource/science/工程院院士名录.txt",
    detail: "academy_engineering",
    label: "工程院院士名录",
    candidateSourceId: "academic_selected",
  },
  {
    path: "resource/science/国家自然基金_项目负责人_截至2017.txt",
    detail: "natural_science_fund_principal",
    label: "国家自然基金项目负责人",
    candidateSourceId: "academic_broad",
  },
  {
    path: "resource/science/国家社科基金_项目负责人_截至202305.txt",
    detail: "social_science_fund_principal",
    label: "国家社科基金项目负责人",
    candidateSourceId: "academic_broad",
  },
];

export const sciencePeopleAdapter: DataSourceAdapter = {
  sourceId: "science_people",
  sourceLabel: "五道口",
  recordFile: "science_people.records.json",
  inputFiles: scienceFiles.map((item) => item.path),

  async buildRecords(context: BuildContext): Promise<NormalizedSourceRecord[]> {
    const records: NormalizedSourceRecord[] = [];
    for (const file of scienceFiles) {
      const content = fs.readFileSync(path.resolve(context.rootDir, file.path), "utf8");
      const lines = content.split(/\r?\n/u);
      for (const line of lines) {
        const fullName = stripNonChinese(line);
        if (!fullName) {
          continue;
        }
        const rawIndex = records.length;
        records.push({
          id: makeRecordId("science_people", rawIndex),
          sourceId: "science_people",
          sourceLabel: "五道口",
          sourcePath: file.path,
          rawIndex,
          rawText: line,
          rawFields: {
            line,
            sourceDetail: file.detail,
            sourceLabel: file.label,
            candidateSourceId: file.candidateSourceId,
          },
          normalizedFields: {
            fullName,
            sourceDetail: file.detail,
            sourceLabel: file.label,
            candidateSourceId: file.candidateSourceId,
          },
          extractedTexts: [
            {
              text: fullName,
              textType: "science_person_name",
              confidence: file.candidateSourceId === "academic_selected" ? 0.92 : 0.82,
              note: file.label,
            },
          ],
        });
      }
    }
    return records;
  },

  async extractTokens(records: NormalizedSourceRecord[]) {
    const tokens = [];
    for (const record of records) {
      const fullName = String(record.normalizedFields.fullName || "");
      const token = takeNameTail(fullName);
      if (!token) {
        continue;
      }
      const candidateSourceId = String(record.normalizedFields.candidateSourceId || "academic_broad");
      const sourceDetail = String(record.normalizedFields.sourceDetail || "science_person_name");
      tokens.push(
        createToken({
          record,
          token,
          field: "line",
          value: fullName,
          sourceIds: [candidateSourceId],
          tokenType: "science_given_name",
          extractionMethod: "take_name_tail",
          confidence: candidateSourceId === "academic_selected" ? 0.92 : 0.82,
          sourceDetail,
          relatedPerson: fullName,
        })
      );
    }
    return tokens;
  },
};

