import * as Type from "./type";
import * as Const from "./const";
import CharDb_不含多音字 from "@/database/char_db/zd_without_muilt_tone_char_db.json";
import CharDb_主动规定发音的多音字列表 from "@/database/char_db/主动规定发音的多音字列表.json";
import CharDb_所有支持汉字 from "@/database/char_db/db_all_char_map.json";

// 将特定多音字按照起名中实际使用的发音视为单音字, 补充到CharDB字典中
for (let charConfig of CharDb_主动规定发音的多音字列表) {
  // @ts-ignore
  CharDb_不含多音字[charConfig.char] = charConfig;
}

let summaryDb_仅在生成二字候选名时使用: Record<
  string,
  {
    count: number;
    nameMap: Record<
      string,
      {
        count: number;
      }
    >;
  }
> = {};

/**
 * 过滤指定字符串中的非法字符, 返回剩余部分
 * 严格模式下多音字也视为非法字符
 * @param str
 * @returns
 */
export function trans2LegalString(str: string, strict: boolean) {
  let charList = str.split("");
  // 要求: 1. 是汉字 2. 有对应拼音(不能为多音字)
  let legalList: string[] = charList.filter((item) => {
    return is汉字(item);
  });
  if (strict) {
    // 严格模式下过滤多音字
    legalList = legalList.filter((char) => {
      let result = isCharLegal(char);
      if (result === false) {
        // 额外统计下多音字来源以及出现场景, 方便更新拼音库
        let checkName = legalList.join("");
        if (summaryDb_仅在生成二字候选名时使用[char]) {
          summaryDb_仅在生成二字候选名时使用[char].count++;
          if (summaryDb_仅在生成二字候选名时使用[char].nameMap[checkName]) {
            summaryDb_仅在生成二字候选名时使用[char].nameMap[checkName].count++;
          } else {
            summaryDb_仅在生成二字候选名时使用[char].nameMap[checkName] = {
              count: 1,
            };
          }
        } else {
          summaryDb_仅在生成二字候选名时使用[char] = {
            count: 1,
            nameMap: {
              [checkName]: {
                count: 1,
              },
            },
          };
        }
      }
      return result;
    });
  }
  return legalList.join("");
}

/**
 * 额外统计下多音字来源以及出现场景, 方便更新拼音库
 *
 * @returns
 */
export function private_getSummaryDb_仅在生成二字候选名时使用() {
  let charList = [...Object.keys(summaryDb_仅在生成二字候选名时使用)].map(
    (char) => {
      let item = summaryDb_仅在生成二字候选名时使用[char];
      let nameList = [...Object.keys(item.nameMap)].map((name) => {
        return {
          count: item.nameMap[name].count,
          name: name,
        };
      });
      nameList.sort((a, b) => {
        return b.count - a.count;
      });
      let transItem = {
        char,
        totalCount: summaryDb_仅在生成二字候选名时使用[char].count,
        nameList: nameList,
      };
      return transItem;
    }
  );
  charList.sort((a, b) => {
    return b.totalCount - a.totalCount;
  });
  return charList;
}

/**
 * 检查是否是汉字
 * @param item
 * @returns
 */
export function is汉字(item: string) {
  // @ts-ignore
  return CharDb_所有支持汉字[item] !== undefined;
}

/**
 * 检查是否是合法字符
 * @param char
 * @returns
 */
export function isCharLegal(char: string) {
  // @ts-ignore
  return CharDb_不含多音字[char] !== undefined;
}

/**
 * 检查用字组合是否合法
 */
export function isCharPairLegal({
  charList = [],
  type,
}: {
  charList: (Type.Char_With_Pinyin | Type.Pinyin_Of_Char)[];
  type: "last_2_char" | "first_2_char" | "full_name";
}) {
  // 由于node和web中导入逻辑不一样, 导致isCharLegal检测结果不一. 所以这段逻辑无法启用
  // // 禁止出现多音字
  // for (let char of charList) {
  //   console.log("check it");
  //   if (isCharLegal(char.char) === false) {
  //     return false;
  //   }
  // }

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
    // const illegalToneSet = new Set([
    //   `131`,
    //   `132`,
    //   `134`,
    //   `231`,
    //   `232`,
    //   `234`,
    //   `431`,
    //   `432`,
    //   `434`,
    // ]);
    // let currentTonePair = `${char1.tone}${char2.tone}${char3.tone}`;
    // if (illegalToneSet.has(currentTonePair)) {
    //   return false;
    // }
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
  let score =
    // @ts-ignore
    (CharDb_不含多音字[char1]?.count ?? 0) +
    // @ts-ignore
    (CharDb_不含多音字[char2]?.count ?? 0);
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
    pinyinList.push(CharDb_不含多音字[char]);
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
