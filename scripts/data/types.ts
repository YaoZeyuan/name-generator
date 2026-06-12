import type { SourceConfig } from "../../packages/name-core/src";

export type ExtractedTextType =
  | "person_full_name"
  | "given_name"
  | "courtesy_name"
  | "alias"
  | "fund_name"
  | "company_name"
  | "word_segment"
  | "science_person_name";

export type TokenType =
  | "given_name"
  | "courtesy_name"
  | "alias"
  | "fund_word"
  | "company_word"
  | "modern_given_name"
  | "science_given_name";

export type ExtractionMethod =
  | "take_given_name"
  | "take_courtesy_name"
  | "take_name_tail"
  | "split_alias"
  | "jieba_segment"
  | "word_frequency"
  | "manual";

export type RejectReasonCode =
  | "empty_text"
  | "not_two_chinese_chars"
  | "char_not_in_db"
  | "contains_polyphone"
  | "non_name_word"
  | "missing_source_ref"
  | "unsupported_source_shape";

export type NormalizedFieldValue = string | number | boolean | string[] | number[] | null;

export type ExtractedText = {
  text: string;
  textType: ExtractedTextType;
  confidence: number;
  note?: string;
};

export type NormalizedSourceRecord = {
  id: string;
  sourceId: string;
  sourceLabel: string;
  sourcePath: string;
  rawIndex: number;
  rawText?: string;
  rawFields?: Record<string, unknown>;
  normalizedFields: Record<string, NormalizedFieldValue>;
  extractedTexts: ExtractedText[];
};

export type SourceRef = {
  sourceId: string;
  recordId: string;
  rawIndex: number;
  field: string;
  value: string;
  sourcePath?: string;
  sourceLabel?: string;
  sourceDetail?: string;
  relatedPerson?: string;
  year?: number | string | null;
  dynasty?: string | null;
  rank?: string | null;
};

export type ExtractedNameToken = {
  token: string;
  tokenLength: number;
  sourceIds: string[];
  sourceRefs: SourceRef[];
  tokenType: TokenType;
  frequency: number;
  extractionMethod: ExtractionMethod;
  confidence: number;
  sourceDetail?: string;
  rejectReasons?: RejectReasonCode[];
};

export type RejectedNameToken = ExtractedNameToken & {
  rejectReasons: RejectReasonCode[];
};

export type CandidateNameRecord = {
  name: string;
  sources: Array<{
    id: string;
    label: string;
    priority: number;
    weight: number;
    category: SourceConfig["category"];
    reason: string;
  }>;
  sourceIds: string[];
  sourceReasons: string[];
  sourceRefs: SourceRef[];
  chars: [string, string];
  frequency: number;
  extractionMethods: ExtractionMethod[];
  tokenTypes: TokenType[];
  confidence: number;
  sourceStats: {
    totalFrequency: number;
    sourceCount: number;
    bestSourcePriority: number;
  };
  tags: string[];
  flags: {
    hasRareChar: boolean;
    hasRiskChar: boolean;
    hasPolyphone: boolean;
    isCommon: boolean;
    isLikelyNonNameWord: boolean;
  };
};

export type BuildContext = {
  rootDir: string;
  resourceDir: string;
  databaseDir: string;
};

export type DataSourceAdapter = {
  sourceId: string;
  sourceLabel: string;
  recordFile: string;
  inputFiles: string[];
  buildRecords(context: BuildContext): Promise<NormalizedSourceRecord[]>;
  extractTokens(records: NormalizedSourceRecord[], context: BuildContext): Promise<ExtractedNameToken[]>;
};

export type SourceManifest = {
  generatedAt: string;
  sources: Array<{
    sourceId: string;
    sourceLabel: string;
    inputFiles: string[];
    recordFile: string;
    recordCount: number;
  }>;
};

