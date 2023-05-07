import * as Type from "../../common/type";
import * as Const from "../../common/const";
import CharDb from "../../../database/char_db/zd_without_muilt_tone_char_db.json";

/**
 * [用于预处理]将两字名或一字名转换为标准格式, 若不符合规则则直接返回false
 * @param name
 * @returns
 */
export function transName2Record(name: string): Type.Type_Name | false {
  let charList = name.split("");
  let pinyinList: Type.Char_With_Pinyin[] = [];
  for (let char of charList) {
    if (CharDb[char] === undefined) {
      // 不能有没有拼音的字
      return false;
    }
    pinyinList.push(CharDb[char]);
  }
  const charItem_1 = pinyinList[0];
  const charItem_2 = pinyinList[1];
  if (charList.length === 1) {
    if (charItem_1.tone === 3) {
      // 不能以三声结尾
      return false;
    }

    return {
      姓氏: [],
      人名_第一个字: {
        ...charItem_1,
        char_list: [charItem_1],
      },
      // @ts-ignore
      人名_第二个字: undefined,
      demoStr: "",
    };
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
  };
}
