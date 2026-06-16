import type { NormalizedSourceRecord, SourceRef } from "../types";
import { stripNonChinese } from "./normalizeText";

export function makeRecordId(sourceId: string, rawIndex: number): string {
  return `${sourceId}:${String(rawIndex).padStart(6, "0")}`;
}

export function makeSourceRef({
  record,
  field,
  value,
  sourceDetail,
  relatedPerson,
}: {
  record: NormalizedSourceRecord;
  field: string;
  value: string;
  sourceDetail?: string;
  relatedPerson?: string;
}): SourceRef {
  return {
    sourceId: record.sourceId,
    recordId: record.id,
    rawIndex: record.rawIndex,
    field,
    value,
    sourcePath: record.sourcePath,
    sourceLabel: record.sourceLabel,
    sourceDetail,
    relatedPerson,
    year: record.normalizedFields.year as number | string | null | undefined,
    dynasty: record.normalizedFields.dynasty as string | null | undefined,
    rank: record.normalizedFields.rank as string | null | undefined,
  };
}

function getContextPrefix(sourceRef: Pick<SourceRef, "field" | "sourceDetail">): string | null {
  const field = String(sourceRef.field || "");
  const detail = String(sourceRef.sourceDetail || "");
  if (field.includes("字") || detail.includes("courtesy")) {
    return "字";
  }
  if (field.includes("别名") || field.includes("曾用名")) {
    return "别名";
  }
  if (field.includes("别号") || field.includes("号") || detail.includes("alias")) {
    return "号";
  }
  return null;
}

function getSourceDetailSuffix(sourceDetail: string | undefined): string | null {
  const detail = String(sourceDetail || "");
  const suffixByDetail: Record<string, string> = {
    academy_science: "科学院院士",
    academy_engineering: "工程院院士",
    natural_science_fund_principal: "国家自然基金",
    social_science_fund_principal: "国家社科基金",
  };
  return suffixByDetail[detail] || null;
}

export function getSourceRefDisplayName(
  sourceRef: Pick<SourceRef, "sourceId" | "field" | "value" | "sourceDetail" | "relatedPerson">
): string {
  if (sourceRef.sourceId === "wealth") {
    const rawName = String(sourceRef.value || "").trim();
    if (!rawName) {
      return "";
    }
    if (sourceRef.sourceDetail === "fund_name_word_frequency") {
      return "";
    }
    if (sourceRef.sourceDetail === "wealth_fund_name") {
      return `基金:${rawName}`;
    }
    if (sourceRef.sourceDetail === "wealth_company_name") {
      return `公司:${rawName}`;
    }
  }

  const relatedPerson = stripNonChinese(sourceRef.relatedPerson || "");
  const value = stripNonChinese(sourceRef.value || "");
  const name = relatedPerson || value;
  if (!name) {
    return "";
  }

  const contextPrefix = getContextPrefix(sourceRef);
  if (contextPrefix && relatedPerson && value && relatedPerson !== value) {
    return `${name}(${contextPrefix}${value})`;
  }

  const sourceDetailSuffix = getSourceDetailSuffix(sourceRef.sourceDetail);
  if (sourceDetailSuffix && relatedPerson) {
    return `${name}(${sourceDetailSuffix})`;
  }

  return name;
}

