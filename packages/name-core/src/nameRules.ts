import { getStringCharInfos, splitChars, stripNonChinese } from "./char";
import type { AvoidResult, CandidateName, CharDb, MustPosition, SemanticResult } from "./types";

const NEGATIVE_CHARS = new Set(splitChars("病痛贫穷丧死鬼凶恶丑残废毒赌骗贱祸灾"));

const HARD_RISK_NAMES = new Set([
  "赵钱孙",
  "钱孙",
  "建国",
  "待删",
  "删除",
  "无名",
]);

const NON_NAME_WORDS = new Set([
  "帮扶",
  "不繁",
  "不绝",
  "蜂巢",
  "赫兹",
  "盖伦",
  "伽罗",
  "伽缘",
  "麦兹",
  "柒零",
  "轻盐",
  "熵零",
  "狮王",
  "视频",
  "仙桃",
  "耕耘",
]);

const NON_NAME_CHARS = new Set(splitChars("频熵巢狮盐兹柒零"));

const CLICHE_NAMES = new Set([
  "建军",
  "建华",
  "建民",
  "建平",
  "国庆",
  "国强",
  "伟强",
  "志强",
  "富贵",
  "发财",
]);

export function normalizeMustPosition(position: MustPosition | undefined): "any" | "second" | "third" {
  if (position === "第二位" || position === "second") {
    return "second";
  }
  if (position === "第三位" || position === "third") {
    return "third";
  }
  return "any";
}

export function evaluateSemanticSafety(fullName: string, name: string): SemanticResult {
  const issues: string[] = [];
  let score = 35;

  if (splitChars(name).length !== 2) {
    issues.push("候选名不是二字名，不符合当前项目目标");
    score = 0;
  }

  if (HARD_RISK_NAMES.has(fullName) || HARD_RISK_NAMES.has(name)) {
    issues.push("命中明显风险名或占位式组合");
    score = 0;
  }

  if (NON_NAME_WORDS.has(name)) {
    issues.push("更像产品名、概念词或普通词语，不像人名");
    score = Math.min(score, 10);
  }

  if (CLICHE_NAMES.has(name)) {
    issues.push("命中过于常见或时代感过强的组合");
    score = Math.min(score, 8);
  }

  for (const char of splitChars(name)) {
    if (NEGATIVE_CHARS.has(char)) {
      issues.push(`包含明显负面字「${char}」`);
      score = 0;
    }
    if (NON_NAME_CHARS.has(char)) {
      issues.push(`「${char}」用于人名风险较高`);
      score = Math.min(score, 12);
    }
  }

  return {
    pass: score > 0,
    score,
    issues,
    summary: issues.length === 0 ? "未发现明显语义风险" : issues.join("；"),
  };
}

export function checkAvoidRules({
  candidate,
  surname,
  avoid,
  charDb,
}: {
  candidate: CandidateName;
  surname: string;
  avoid: string[];
  charDb: CharDb;
}): AvoidResult {
  const issues: string[] = [];
  if (avoid.length === 0) {
    return { pass: true, issues };
  }

  const fullName = `${surname}${candidate.name}`;
  const rawAvoidSet = new Set(avoid.map((item) => stripNonChinese(item)).filter(Boolean));
  if (rawAvoidSet.has(fullName) || rawAvoidSet.has(candidate.name)) {
    issues.push("候选名与避讳名单完全相同");
  }

  const avoidChars = new Set<string>();
  const avoidPinyinWithoutTone = new Set<string>();
  for (const item of avoid) {
    for (const char of splitChars(stripNonChinese(item))) {
      avoidChars.add(char);
      const charInfo = charDb[char];
      if (charInfo) {
        avoidPinyinWithoutTone.add(charInfo.pinyinWithoutTone);
      }
    }
  }

  for (const char of candidate.chars) {
    const charInfo = charDb[char];
    if (!charInfo) {
      issues.push(`字库缺少「${char}」`);
      continue;
    }
    if (avoidChars.has(charInfo.char)) {
      issues.push(`包含需要避开的字「${charInfo.char}」`);
    }
    if (avoidPinyinWithoutTone.has(charInfo.pinyinWithoutTone)) {
      issues.push(`「${charInfo.char}」与避讳字存在同音风险`);
    }
  }

  return {
    pass: issues.length === 0,
    issues,
  };
}

export function checkMustRules({
  candidate,
  must,
  mustPosition,
}: {
  candidate: CandidateName;
  must: string[];
  mustPosition: MustPosition | undefined;
}): boolean {
  const mustChars = new Set(must.flatMap((item) => splitChars(stripNonChinese(item))));
  if (mustChars.size === 0) {
    return true;
  }

  const position = normalizeMustPosition(mustPosition);
  const [first, second] = candidate.chars;
  if (position === "second") {
    return mustChars.has(first);
  }
  if (position === "third") {
    return mustChars.has(second);
  }
  return mustChars.has(first) || mustChars.has(second);
}

export function collectKnownPinyin(charDb: CharDb, input: string): string[] {
  return getStringCharInfos(charDb, input).map((item) => item.pinyinWithoutTone);
}
