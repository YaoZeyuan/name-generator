import type {
  ExtractionMethod,
  ExtractedNameToken,
  NormalizedSourceRecord,
  TokenType,
  RejectReasonCode,
} from "../types";
import { chineseLength } from "./normalizeText";
import { makeSourceRef } from "./sourceRef";

export function createToken({
  record,
  token,
  field,
  value,
  sourceIds,
  tokenType,
  extractionMethod,
  confidence,
  frequency = 1,
  sourceDetail,
  relatedPerson,
  rejectReasons,
}: {
  record: NormalizedSourceRecord;
  token: string;
  field: string;
  value: string;
  sourceIds: string[];
  tokenType: TokenType;
  extractionMethod: ExtractionMethod;
  confidence: number;
  frequency?: number;
  sourceDetail?: string;
  relatedPerson?: string;
  rejectReasons?: RejectReasonCode[];
}): ExtractedNameToken {
  return {
    token,
    tokenLength: chineseLength(token),
    sourceIds,
    sourceRefs: [
      makeSourceRef({
        record,
        field,
        value,
        sourceDetail,
        relatedPerson,
      }),
    ],
    tokenType,
    frequency,
    extractionMethod,
    confidence,
    sourceDetail,
    rejectReasons,
  };
}

