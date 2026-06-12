import { getSurnameLastCharInfo, stripNonChinese } from "./char";
import { evaluatePhonetics } from "./phoneticRules";
import { checkAvoidRules, checkMustRules, evaluateSemanticSafety } from "./nameRules";
import { scoreCandidate } from "./scoreName";
import type { CandidateName, CharDb, CharInfo, QueryConfig, ScoredCandidate } from "./types";

export function normalizeQueryConfig(query: QueryConfig): Required<Omit<QueryConfig, "outputPath">> & {
  outputPath?: string;
} {
  return {
    surname: stripNonChinese(query.surname),
    avoid: query.avoid ?? [],
    must: query.must ?? [],
    mustPosition: query.mustPosition ?? "any",
    style: query.style ?? "any",
    sourcePreference: query.sourcePreference ?? "default",
    limit: query.limit ?? 30,
    outputPath: query.outputPath,
  };
}

export function queryNames({
  candidateDb,
  charDb,
  query,
}: {
  candidateDb: CandidateName[];
  charDb: CharDb;
  query: QueryConfig;
}): ScoredCandidate[] {
  const normalized = normalizeQueryConfig(query);
  const surnameLast = getSurnameLastCharInfo(charDb, normalized.surname);
  const results: ScoredCandidate[] = [];

  for (const candidate of candidateDb) {
    const charInfos = candidate.chars.map((char) => charDb[char]);
    if (charInfos.some((item) => !item)) {
      continue;
    }
    const chars = charInfos as [CharInfo, CharInfo];

    if (!checkMustRules({ candidate, must: normalized.must, mustPosition: normalized.mustPosition })) {
      continue;
    }

    const avoidResult = checkAvoidRules({
      candidate,
      surname: normalized.surname,
      avoid: normalized.avoid,
      charDb,
    });
    if (!avoidResult.pass) {
      continue;
    }

    const fullName = `${normalized.surname}${candidate.name}`;
    const semantic = evaluateSemanticSafety(fullName, candidate.name);
    if (!semantic.pass) {
      continue;
    }

    const phonetic = evaluatePhonetics({
      surnameLast,
      first: chars[0],
      second: chars[1],
      style: normalized.style,
    });
    if (!phonetic.pass) {
      continue;
    }

    results.push(
      scoreCandidate({
        surname: normalized.surname,
        candidate,
        chars,
        phonetic,
        semantic,
      })
    );
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name, "zh-Hans-CN");
  });

  return results.slice(0, normalized.limit);
}
