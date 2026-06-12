export type Tone = 1 | 2 | 3 | 4;

export type NameStyle = "any" | "loud" | "soft" | "不限" | "响亮" | "柔和";

export type MustPosition = "any" | "second" | "third" | "不限制" | "第二位" | "第三位";

export interface LegacyCharRecord {
  char: string;
  pinyin: string;
  tone: Tone;
  pinyin_without_tone: string;
  initial_声母: string;
  initial_声母类别_发音方法: string;
  initial_声母类别_发音部位: string;
  vowel_韵母: string;
  vowel_韵母类别: string;
  count?: number;
}

export interface CharInfo {
  char: string;
  pinyin: string;
  tone: Tone;
  pinyinWithoutTone: string;
  initial: string;
  initialMethod: string;
  initialPlace: string;
  vowel: string;
  vowelType: string;
  count: number;
  isPolyphone: boolean;
}

export type CharDb = Record<string, CharInfo>;

export interface SourceConfig {
  id: string;
  label: string;
  priority: number;
  weight: number;
  category: "wealth" | "academic" | "modern" | "historic";
  description: string;
}

export type SourcePreference =
  | "default"
  | "wealth_selected"
  | "wealth_broad"
  | "academic_selected"
  | "academic_broad"
  | "modern_people"
  | "imperial_exam"
  | "ancient_names";

export interface CandidateSource {
  id: string;
  label: string;
  priority: number;
  weight: number;
  category: SourceConfig["category"];
  reason: string;
}

export interface CandidateName {
  name: string;
  sources: CandidateSource[];
  sourceIds: string[];
  sourceReasons: string[];
  chars: [string, string];
  flags: {
    hasRareChar: boolean;
    hasRiskChar: boolean;
    isCommon: boolean;
  };
}

export interface QueryConfig {
  surname: string;
  avoid?: string[];
  must?: string[];
  mustPosition?: MustPosition;
  style?: NameStyle;
  sourcePreference?: SourcePreference;
  limit?: number;
  outputPath?: string;
}

export interface PhoneticIssue {
  level: "hard" | "warn";
  code: string;
  message: string;
}

export interface PhoneticResult {
  pass: boolean;
  score: number;
  toneScore: number;
  tonePattern: string;
  issues: PhoneticIssue[];
  summary: string;
}

export interface SemanticResult {
  pass: boolean;
  score: number;
  issues: string[];
  summary: string;
}

export interface AvoidResult {
  pass: boolean;
  issues: string[];
}

export interface ScoreBreakdown {
  semantic: number;
  phonetic: number;
  source: number;
  explainability: number;
  charQuality: number;
  rarity: number;
}

export interface ScoredCandidate {
  fullName: string;
  name: string;
  score: number;
  breakdown: ScoreBreakdown;
  candidate: CandidateName;
  chars: [CharInfo, CharInfo];
  phonetic: PhoneticResult;
  semantic: SemanticResult;
  reasons: string[];
}
