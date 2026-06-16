import type { CharInfo, NameStyle, PhoneticIssue, PhoneticResult } from "./types";

const TONE_SCORE_MAP: Record<string, number> = {
  "111": 2,
  "112": 3,
  "113": 3,
  "114": 3,
  "121": 5,
  "122": 3,
  "123": 4,
  "124": 4,
  "131": 3,
  "132": 3,
  "133": 1,
  "134": 3,
  "141": 4,
  "142": 4,
  "143": 4,
  "144": 2,
  "211": 3,
  "212": 5,
  "213": 4,
  "214": 4,
  "221": 3,
  "222": 2,
  "223": 3,
  "224": 3,
  "231": 3,
  "232": 3,
  "233": 1,
  "234": 3,
  "241": 4,
  "242": 5,
  "243": 4,
  "244": 2,
  "311": 3,
  "312": 4,
  "313": 4,
  "314": 4,
  "321": 4,
  "322": 3,
  "323": 4,
  "324": 4,
  "331": 1,
  "332": 1,
  "333": 1,
  "334": 1,
  "341": 4,
  "342": 4,
  "343": 4,
  "344": 1,
  "411": 3,
  "412": 5,
  "413": 5,
  "414": 5,
  "421": 5,
  "422": 3,
  "423": 5,
  "424": 5,
  "431": 3,
  "432": 3,
  "433": 1,
  "434": 3,
  "441": 2,
  "442": 2,
  "443": 2,
  "444": 1,
};

export function normalizeStyle(style: NameStyle | undefined): "any" | "loud" | "soft" {
  if (style === "响亮" || style === "loud") {
    return "loud";
  }
  if (style === "柔和" || style === "soft") {
    return "soft";
  }
  return "any";
}

function checkPair(left: CharInfo, right: CharInfo, label: string): PhoneticIssue[] {
  const issues: PhoneticIssue[] = [];

  if (left.pinyinWithoutTone === right.pinyinWithoutTone) {
    issues.push({
      level: "hard",
      code: "same_pinyin",
      message: `${label}「${left.char}${right.char}」同音，读起来容易混`,
    });
  }

  if (left.tone === right.tone) {
    issues.push({
      level: "warn",
      code: "same_tone",
      message: `${label}「${left.char}${right.char}」声调相同，音律分降低`,
    });
  }

  if (left.initialMethod === right.initialMethod) {
    issues.push({
      level: "hard",
      code: "same_initial_method",
      message: `${label}「${left.char}${right.char}」声母发音方法重复`,
    });
  }

  if (left.initialPlace === right.initialPlace) {
    issues.push({
      level: "hard",
      code: "same_initial_place",
      message: `${label}「${left.char}${right.char}」声母发音部位重复`,
    });
  }

  if (left.vowelType === right.vowelType) {
    issues.push({
      level: "hard",
      code: "same_vowel_type",
      message: `${label}「${left.char}${right.char}」韵母类别重复，容易叠韵`,
    });
  }

  return issues;
}

export function evaluatePhonetics({
  surnameLast,
  first,
  second,
  style,
}: {
  surnameLast: CharInfo;
  first: CharInfo;
  second: CharInfo;
  style?: NameStyle;
}): PhoneticResult {
  const normalizedStyle = normalizeStyle(style);
  const tonePattern = `${surnameLast.tone}${first.tone}${second.tone}`;
  const toneScore = TONE_SCORE_MAP[tonePattern] ?? 3;
  const issues = [
    ...checkPair(surnameLast, first, "姓和名首字"),
    ...checkPair(first, second, "名字内部"),
  ];

  if (toneScore <= 2) {
    issues.push({
      level: "warn",
      code: "weak_tone_pattern",
      message: `声调组合 ${tonePattern} 音律评分偏低`,
    });
  }

  if (normalizedStyle === "loud" && ![2, 3, 4].includes(second.tone)) {
    issues.push({
      level: "warn",
      code: "style_loud_mismatch",
      message: "响亮取向更适合二、三、四声收尾",
    });
  }

  if (normalizedStyle === "soft" && ![1, 3].includes(second.tone)) {
    issues.push({
      level: "warn",
      code: "style_soft_mismatch",
      message: "柔和取向更适合一声或三声收尾",
    });
  }

  const hardIssueCount = issues.filter((issue) => issue.level === "hard").length;
  const warnIssueCount = issues.length - hardIssueCount;
  const baseScore = toneScore * 5 + 5;
  const score = Math.max(0, Math.min(30, baseScore - warnIssueCount * 3 - hardIssueCount * 8));

  return {
    pass: hardIssueCount === 0,
    score,
    toneScore,
    tonePattern,
    issues,
    summary:
      issues.length === 0
        ? "读音顺畅，未发现同音、叠声或叠韵问题"
        : issues.map((issue) => issue.message).join("；"),
  };
}
