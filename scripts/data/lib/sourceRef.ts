import type { NormalizedSourceRecord, SourceRef } from "../types";

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

