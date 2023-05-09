import * as Type from "./type";
import * as Const from "./const";
import * as CharDb from "@/database/char_db/zd_without_muilt_tone_char_db.json";

/**
 * 过滤指定字符串中的非法字符, 返回剩余部分
 * @param str
 * @returns
 */
export function trans2LegalString(str: string) {
  let charList = str.split("");
  let legalList: string[] = charList.filter((item) => {
    return is汉字(item);
  });
  return legalList.join("");
}

/**
 * 检查是否是汉字
 * @param item
 * @returns
 */
export function is汉字(item: string) {
  let itemCode = item.charCodeAt(0);
  if (0x4e00 <= itemCode && itemCode <= 0x9fa5) {
    return true;
  }
  return false;
}

/**
 * 检查是否是合法字符
 * @param char
 * @returns
 */
export function isCharLegal(char: string) {
  // @ts-ignore
  return CharDb[char] !== undefined;
}

/**
 * 检查用字组合是否合法
 */
export function isCharPairLegal({
  charList = [],
  type,
}: {
  charList: Type.Char_With_Pinyin[];
  type: "last_2_char" | "first_2_char" | "full_name";
}) {
  // 分成三种情况
  // 前面两字: "first_2_char"
  // 末尾两字: "first_2_char"
  // 全名: "full_name"
  if (type === "full_name" && charList.length !== 3) {
    // 检查全名时第三个字必传
    return false;
  }
  if (charList.length !== 3 && charList.length !== 2) {
    // 必须为2字或3字
    return false;
  }

  let [char1, char2, char3] = charList;

  // 通用性检查

  // 禁止同音
  if (char1.pinyin_without_tone === char2.pinyin_without_tone) {
    return false;
  }
  // 禁止同声调
  if (char1.tone === char2.tone) {
    return false;
  }
  // 禁止同声母分类(叠音)
  if (char1.initial_声母类别_发音方法 === char2.initial_声母类别_发音方法) {
    return false;
  }
  if (char1.initial_声母类别_发音部位 === char2.initial_声母类别_发音部位) {
    return false;
  }
  // 禁止同韵母分类(叠韵)
  if (char1.vowel_韵母类别 === char2.vowel_韵母类别) {
    return false;
  }

  // 检查开头两字
  if (type === "full_name" || type === "first_2_char") {
  }
  // 再检查结尾两字
  if (type === "full_name" || type === "last_2_char") {
    // 如果只传了结尾两字, 则通过开头两字的检查逻辑已完成了检查
  }
  // 最后对整体姓名音韵进行把关
  if (type === "full_name") {
    // 额外检查2&3字的情况

    // 禁止同音
    if (char3.pinyin_without_tone === char2.pinyin_without_tone) {
      return false;
    }
    // 禁止同声调
    if (char3.tone === char2.tone) {
      return false;
    }
    // 禁止同声母分类(叠音)
    if (char3.initial_声母类别_发音方法 === char2.initial_声母类别_发音方法) {
      return false;
    }
    if (char3.initial_声母类别_发音部位 === char2.initial_声母类别_发音部位) {
      return false;
    }
    // 禁止同韵母分类(叠韵)
    if (char3.vowel_韵母类别 === char2.vowel_韵母类别) {
      return false;
    }

    // 对音调的特殊逻辑进行检查
    // 以下均为不符合要求的音调组合
    const illegalToneSet = new Set([
      `131`,
      `132`,
      `134`,
      `231`,
      `232`,
      `234`,
      `431`,
      `432`,
      `434`,
    ]);
    let currentTonePair = `${char1.tone}${char2.tone}${char3.tone}`;
    if (illegalToneSet.has(currentTonePair)) {
      return false;
    }
  }
  // 抵达最后的一定合法
  return true;
}

/**
 * 获取姓名评分
 * @param name
 * @returns
 */
export function getScoreOfName(char1: string, char2: string) {
  // @ts-ignore
  let score = (CharDb[char1]?.count ?? 0) + (CharDb[char2]?.count ?? 0);
  return score;
}

/**
 * [用于预处理]将两字名或一字名转换为标准格式, 若不符合规则则直接返回false
 * @param name
 * @returns
 */
export function transName2Record(name: string): Type.Type_Name | false {
  let charList = name.split("");
  let pinyinList: Type.Char_With_Pinyin[] = [];
  for (let char of charList) {
    if (isCharLegal(char) === false) {
      // 不允许存在非法字符
      return false;
    }
    // @ts-ignore
    pinyinList.push(CharDb[char]);
  }
  const charItem_1 = pinyinList[0];
  const charItem_2 = pinyinList[1];

  let checkResult = isCharPairLegal({
    charList: [charItem_1, charItem_2],
    type: "last_2_char",
  });
  if (checkResult === false) {
    return false;
  }

  return {
    姓氏: [],
    人名_第一个字: {
      ...charItem_1,
      char_list: [charItem_1],
    },
    人名_第二个字: {
      ...charItem_2,
      char_list: [charItem_2],
    },
    demoStr: "",
    score: getScoreOfName(charItem_1.char, charItem_2.char),
  };
}
