import type { ScoredCandidate } from "./types";

export function explainCandidate(result: ScoredCandidate): string {
  const sourceNames = result.candidate.sources.map((source) => source.label).join("、");
  return [
    `${result.fullName}：总分 ${result.score}`,
    `来源：${sourceNames || "未知"}`,
    `语义：${result.semantic.summary}`,
    `音律：${result.phonetic.summary}`,
  ].join("；");
}

export function toPublicResult(result: ScoredCandidate) {
  return {
    fullName: result.fullName,
    name: result.name,
    score: result.score,
    breakdown: result.breakdown,
    sources: result.candidate.sources.map((source) => source.label),
    pinyin: result.chars.map((char) => char.pinyin),
    tonePattern: result.phonetic.tonePattern,
    semantic: result.semantic.summary,
    phonetic: result.phonetic.summary,
    reasons: result.reasons,
    explanation: explainCandidate(result),
  };
}
