import * as Type from "../../common/type";
import * as Const from "../../common/const";
import * as CharDb from "../../../database/char_db/zd_without_muilt_tone_char_db.json";

/**
 * 过滤指定字符串中的非法字符, 返回剩余部分
 * @param str
 * @returns
 */
export function trans2LegalString(str: string) {
  let charList = str.split("");
  let legalList: string[] = charList.filter((item) => {
    let itemCode = item.charCodeAt(0);
    if (0x4e00 <= itemCode && itemCode <= 0x9fa5) {
      return true;
    }
    return false;
  });
  return legalList.join("");
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
 * 获取姓名评分
 * @param name
 * @returns
 */
export function getScoreOfName(char1: string, char2: string) {
  // @ts-ignore
  let score = CharDb[char1]?.count ?? 0 + CharDb[char2]?.count ?? 0;
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
  if (charList.length === 1) {
    // 不支持单字名
    return false;
  }

  if (charItem_2.tone === 3) {
    // 不能以三声结尾
    return false;
  }

  if (charItem_1.tone === 4 && charItem_2.tone === 4) {
    // 不能结尾两字都是4声
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
