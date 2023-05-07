import * as CommonType from "@/../script/common/type";
import AllPinyinList from "@/../database/char_db/raw_pinyin_list.json";
import RawCharDb from "@/../database/char_db/zd_name_char_db_min_1.json";

export function getValueByStorage(key: string, defaultValue: any) {
  let content = (localStorage.getItem(key) as string) ?? "";
  try {
    return JSON.parse(content);
  } catch (e) {
    return defaultValue;
  }
}
export function setValueByStorage(key: string, value = "") {
  localStorage.setItem(key, JSON.stringify(value));
  return;
}
/**
 * 获取该字对应的拼音, 假设至少有一个拼音
 * @param char
 * @returns
 */
export function getPinyinOfChar(char: string) {
  let pinyinList: CommonType.Char_With_Pinyin[] = [];

  for (const item of AllPinyinList as CommonType.Char_With_Pinyin[]) {
    if (item.char === char) {
      pinyinList.push(item);
    }
  }
  return pinyinList as [
    CommonType.Char_With_Pinyin,
    ...CommonType.Char_With_Pinyin[]
  ];
}

/**
 * 获取姓名评分
 * @param name
 * @returns
 */
export function getScoreOfName(char1: string, char2: string) {
  // @ts-ignore
  let score = (RawCharDb[char1]?.count ?? 0) + (RawCharDb[char2]?.count ?? 0);
  return score;
}

/**
 * 将字符串转换为拼音列表
 * @param str
 * @returns
 */
export function transString2PinyinList(str: string) {
  const charList = str.split("");
  const pinyinList: CommonType.Char_With_Pinyin[] = [];
  for (const char of charList) {
    const resultList = getPinyinOfChar(char);
    for (const result of resultList) {
      pinyinList.push(result);
    }
  }
  return pinyinList;
}

/**
 * 生成所有合法的姓名
 * @param char_姓氏
 * @returns
 */
export function generateLegalNameList({
  char_姓_全部,
  char_姓_末尾字,
  char_排除字_list = [],
  char_必选字_list = [],
  legal_PinyinDb,
}: {
  /**
   * 姓的全称, 用于合成最终结果
   */
  char_姓_全部: CommonType.Char_With_Pinyin[];
  /**
   * 姓中的最后一个字, 需要明确发音
   */
  char_姓_末尾字: CommonType.Char_With_Pinyin;
  /**
   * 不能重音的字
   */
  char_排除字_list?: CommonType.Char_With_Pinyin[];
  /**
   * 姓名中必须出现的字, 一个名字中只能限定一个必选字出现在第二位或第三位, 但可以传入多个, 满足一个条件即可
   * 若必选字同音, 则只保留第一个必选字
   */
  char_必选字_list?: CommonType.Char_With_Pinyin[];
  /**
   * 所有可选拼音库, 所有拼音均从可选拼音中产生
   */
  legal_PinyinDb: CommonType.Pinyin_Db;
}) {
  let nameList: CommonType.Type_Name[] = [];

  const pinyinSet_同音字 = new Set();
  for (let char_排除字 of char_排除字_list) {
    pinyinSet_同音字.add(char_排除字.pinyin);
  }
  // 必选字不能同音
  let buf_过滤同音必选字: Record<string, CommonType.Char_With_Pinyin> = {};
  for (let char_必选字 of char_必选字_list) {
    if (buf_过滤同音必选字[char_必选字["pinyin"]] === undefined) {
      buf_过滤同音必选字[char_必选字["pinyin"]] = char_必选字;
    }
  }
  char_必选字_list = [...Object.values(buf_过滤同音必选字)];

  /**
   * 特定字符下, 连续两位文字对应的拼音可选项是有限的
   */
  type Buf_Option = {
    [pinyin: string]: {
      pinyin: CommonType.Pinyin_of_Char["pinyin"];
      pinyin_without_tone: CommonType.Pinyin_of_Char["pinyin_without_tone"];
      tone: CommonType.Pinyin_of_Char["tone"];
      char: CommonType.Pinyin_of_Char["char"];
      /**
       * 提供可选字列表, 方便替换
       */
      char_list: CommonType.Pinyin_of_Char["char_list"];
      optionList: {
        pinyin: CommonType.Pinyin_of_Char["pinyin"];
        pinyin_without_tone: CommonType.Pinyin_of_Char["pinyin_without_tone"];
        tone: CommonType.Pinyin_of_Char["tone"];
        char: CommonType.Pinyin_of_Char["char"];
        /**
         * 提供可选字列表, 方便替换
         */
        char_list: CommonType.Pinyin_of_Char["char_list"];
      }[];
    };
  };

  // 生成所有可能的结果
  let totalOption: Buf_Option = {};
  // 生成姓氏后的第一个字
  for (let pinyinWithoutTone of Object.keys(legal_PinyinDb)) {
    if (char_姓_末尾字.pinyin_without_tone === pinyinWithoutTone) {
      // 禁止和姓氏最后一字同音
      continue;
    }
    const optionList = legal_PinyinDb[pinyinWithoutTone].option_list;
    for (let option of optionList) {
      if (pinyinSet_同音字.has(option.pinyin)) {
        // 排除同音字
        continue;
      }
      // 排除一些两字连缀效果不佳的组合`阴阴X` / `上上X`
      if (char_姓_末尾字.tone === 1 && option.tone === 1) {
        continue;
      }
      if (char_姓_末尾字.tone === 3 && option.tone === 3) {
        continue;
      }
      totalOption[option.pinyin] = {
        char: option.char,
        char_list: option.char_list,
        optionList: [],
        pinyin: option.pinyin,
        pinyin_without_tone: option.pinyin_without_tone,
        tone: option.tone,
      };
    }
  }
  // 生成姓氏后的第二个字
  for (const secondPinyin of Object.keys(totalOption)) {
    // 此时第一个字和第二个字都已经生成
    let char_1 = char_姓_末尾字;
    let char_2 = totalOption[secondPinyin];

    // 遍历所有可能的音调
    for (let pinyinWithoutTone of Object.keys(legal_PinyinDb)) {
      if (char_1.pinyin_without_tone === pinyinWithoutTone) {
        // 禁止和姓氏最后一字同音
        continue;
      }
      if (char_2.pinyin_without_tone === pinyinWithoutTone) {
        // 禁止和姓名第一字同音
        continue;
      }
      const optionList = legal_PinyinDb[pinyinWithoutTone].option_list;
      for (let option of optionList) {
        if (pinyinSet_同音字.has(option.pinyin)) {
          // 排除同音字
          continue;
        }
        // 禁止使用上声(三声)作为姓名结尾
        if (option.tone === 3) {
          continue;
        }
        // 排除一些两字连缀效果不佳的组合 `X去去`
        if (char_2.tone === 4 && option.tone === 4) {
          continue;
        }
        // 禁止同音调: 阴阴阴、阳阳阳、上上上、去去去
        if (char_1.tone === 1 && char_2.tone === 1 && option.tone === 1) {
          continue;
        }
        if (char_1.tone === 2 && char_2.tone === 2 && option.tone === 2) {
          continue;
        }
        totalOption[char_2.pinyin].optionList.push({
          char: option.char,
          char_list: option.char_list,
          pinyin: option.pinyin,
          pinyin_without_tone: option.pinyin_without_tone,
          tone: option.tone,
        });
      }
    }
  }

  // 按必选字进行过滤
  const set_必选字 = new Set();
  for (let char_必选字 of char_必选字_list) {
    set_必选字.add(char_必选字.char);
  }
  if (char_必选字_list.length > 0) {
    const nameOption_包含必选字: Buf_Option = {};
    for (let firstPinyinKey of Object.keys(totalOption)) {
      let firstPinyin = totalOption[firstPinyinKey];

      for (let charWithPinyin of firstPinyin.char_list) {
        if (set_必选字.has(charWithPinyin.char)) {
          // 符合条件, 将key添加到选项中
          nameOption_包含必选字[firstPinyinKey] = totalOption[firstPinyinKey];
          // 将候选字替换为要求的必选字, 方便确认
          nameOption_包含必选字[firstPinyinKey].char = charWithPinyin.char;
          break;
        }
      }
      // 检查下是否满足了要求
      if (nameOption_包含必选字[firstPinyinKey] !== undefined) {
        continue;
      }
      // 否则, 说明姓名的第一个字中没有必选字, 需要检查第二个字

      // 首先清空第一个字的二级选择列表, 只允许有候选字的选项加入
      const optionList_包含必选字 = [];

      for (let option of totalOption[firstPinyinKey].optionList) {
        // 检查第二个字中是否有候选字
        for (let charWithPinyin of option.char_list) {
          if (set_必选字.has(charWithPinyin.char)) {
            // 将候选字替换为要求的必选字, 方便确认
            option.char = charWithPinyin.char;
            // 将满足条件的字添加到optionList中
            optionList_包含必选字.push(option);
          }
        }
      }
      if (optionList_包含必选字.length > 0) {
        // 有满足要求的二级选项, 保存之
        nameOption_包含必选字[firstPinyinKey] = totalOption[firstPinyinKey];
        nameOption_包含必选字[firstPinyinKey].optionList =
          optionList_包含必选字;
      }
    }
    // 过滤完成后, 用必选字结果替代原始结果
    totalOption = nameOption_包含必选字;
  }

  // 生成最终结果
  for (let firstPinyinKey of Object.keys(totalOption)) {
    let firstPinyin = totalOption[firstPinyinKey];
    for (let option of firstPinyin.optionList) {
      const name: CommonType.Type_Name = {
        姓氏: char_姓_全部,
        人名_第一个字: {
          ...firstPinyin,
        },
        人名_第二个字: {
          ...option,
        },
        demoStr: `${char_姓_全部.map((item) => item.char).join("")}${
          firstPinyin.char
        }${option.char}`,
        score: getScoreOfName(firstPinyin.char, option.char),
      };
      nameList.push(name);
    }
  }

  return nameList;
}
