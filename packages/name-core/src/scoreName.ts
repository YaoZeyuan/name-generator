import type {
  CandidateName,
  CharInfo,
  PhoneticResult,
  ScoredCandidate,
  ScoreBreakdown,
  SemanticResult,
} from "./types";

function scoreSource(candidate: CandidateName): number {
  if (candidate.sources.length === 0) {
    return 0;
  }
  const best = Math.max(...candidate.sources.map((source) => source.weight));
  const hasPersonSource = candidate.sources.some((source) => source.category !== "wealth");
  const multiSourceBonus = Math.min(5, (candidate.sources.length - 1) * 2);
  const personSourceBonus = hasPersonSource ? 3 : 0;
  return Math.min(22, best + multiSourceBonus + personSourceBonus);
}

function scoreCharQuality(chars: [CharInfo, CharInfo]): number {
  const charScores = chars.map((char) => {
    if (char.count >= 100) return 8;
    if (char.count >= 50) return 7;
    if (char.count >= 10) return 6;
    if (char.count >= 3) return 4;
    if (char.count > 0) return 2;
    return 1;
  });
  return Math.round(charScores.reduce((sum, item) => sum + item, 0) / charScores.length);
}

function scoreRarity(chars: [CharInfo, CharInfo]): number {
  const avgCount = chars.reduce((sum, char) => sum + char.count, 0) / chars.length;
  if (avgCount <= 0) return 1;
  if (avgCount < 3) return 2;
  if (avgCount <= 300) return 5;
  if (avgCount <= 800) return 4;
  return 2;
}

function scoreExplainability(candidate: CandidateName, phonetic: PhoneticResult, semantic: SemanticResult): number {
  let score = 2;
  if (candidate.sourceReasons.length > 0) {
    score += 2;
  }
  if (phonetic.summary) {
    score += 1;
  }
  if (semantic.summary) {
    score += 1;
  }
  return Math.min(6, score);
}

export function scoreCandidate({
  surname,
  candidate,
  chars,
  phonetic,
  semantic,
}: {
  surname: string;
  candidate: CandidateName;
  chars: [CharInfo, CharInfo];
  phonetic: PhoneticResult;
  semantic: SemanticResult;
}): ScoredCandidate {
  const breakdown: ScoreBreakdown = {
    semantic: semantic.score,
    phonetic: phonetic.score,
    source: scoreSource(candidate),
    explainability: scoreExplainability(candidate, phonetic, semantic),
    charQuality: scoreCharQuality(chars),
    rarity: scoreRarity(chars),
  };
  const score = Object.values(breakdown).reduce((sum, item) => sum + item, 0);
  const sourceNames = candidate.sources.map((source) => source.label).join("、");
  const reasons = [
    semantic.summary,
    phonetic.summary,
    `来源：${sourceNames || "未知"}`,
    candidate.flags.hasRareChar ? "包含低频字，已降低用字分" : "用字频率可接受",
  ];

  return {
    fullName: `${surname}${candidate.name}`,
    name: candidate.name,
    score,
    breakdown,
    candidate,
    chars,
    phonetic,
    semantic,
    reasons,
  };
}
