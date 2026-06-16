import { splitChars } from "./char";
import { getSourceConfig } from "./sourceConfig";
import type { CandidateName, CandidateSource, CharDb, CompactCandidateDb } from "./types";

function isCandidateName(value: unknown): value is CandidateName {
  return Boolean(
    value &&
      typeof value === "object" &&
      "name" in value &&
      "sources" in value &&
      "sourceIds" in value &&
      "sourceReasons" in value &&
      "chars" in value &&
      "flags" in value
  );
}

function toCandidateSource(sourceId: string): CandidateSource {
  const source = getSourceConfig(sourceId);
  return {
    id: source.id,
    label: source.label,
    priority: source.priority,
    weight: source.weight,
    category: source.category,
    reason: source.description,
  };
}

function getFallbackSourceNames(sourceId: string, name: string): string[] {
  if (sourceId === "wealth") {
    return [name];
  }
  return [];
}

export function hydrateCandidateDb({
  data,
  sourceId,
  charDb,
  sourceNamesByName,
}: {
  data: CompactCandidateDb | CandidateName[];
  sourceId: string;
  charDb: CharDb;
  sourceNamesByName?: Record<string, string[]>;
}): CandidateName[] {
  const source = toCandidateSource(sourceId);

  return data
    .map((entry) => {
      if (isCandidateName(entry)) {
        return entry;
      }

      const name = typeof entry === "string" ? entry : "";
      const chars = splitChars(name);
      if (chars.length !== 2 || chars.some((char) => !charDb[char])) {
        return null;
      }

      const charInfos = chars.map((char) => charDb[char]);
      return {
        name,
        sources: [source],
        sourceIds: [source.id],
        sourceReasons: [source.reason],
        sourceNames: sourceNamesByName?.[name] || getFallbackSourceNames(source.id, name),
        chars: chars as [string, string],
        flags: {
          hasRareChar: charInfos.some((char) => char.count > 0 && char.count < 3),
          hasRiskChar: false,
          isCommon: charInfos.every((char) => char.count >= 100),
        },
      };
    })
    .filter((entry): entry is CandidateName => Boolean(entry));
}
