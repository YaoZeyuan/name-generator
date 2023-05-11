import * as CommonType from "@/script/common/type";
import * as Util from "@/script/common/util";
import * as Const from "@src/resource/const";
import * as Type from "@src/resource/type";
import AllPinyinList from "@/database/char_db/raw_pinyin_list.json";
import NameDb_古人云 from "@/database/name_db/古人云_历史人名.json";
import NameDb_他山石 from "@/database/name_db/他山石_已知人名.json";
import NameDb_财富论 from "@/database/name_db/财富论_基金选名.json";
import NameDb_五道口 from "@/database/name_db/五道口_cnki项目申请人名.json";
import NameDb_五道口_精华版 from "@/database/name_db/五道口精华版_国家科研基金项目负责人名.json";
import NameDb_登科录 from "@/database/name_db/登科录_历史进士名.json";

export async function asyncSleep(ms: number) {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(true);
    }, ms);
  });
}

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
 * 根据pinyin数据库, 生成乱序的候选拼音列表
 * @param pinyinDb
 * @returns
 */
export function generatePinyinOptionList(
  pinyinDb: CommonType.DB_Pinyin_Of_Char
): CommonType.Pinyin_Of_Char[] {
  let pinyinOptionList: CommonType.Pinyin_Of_Char[] = [];

  for (let rawOption of Object.values(pinyinDb)) {
    for (let item of rawOption.option_list) {
      pinyinOptionList.push(item);
    }
  }
  // 打乱顺序
  pinyinOptionList.sort(() => {
    return Math.random() - 0.5;
  });

  return pinyinOptionList;
}

/**
 * 返回pinyin数据库中候选字的数量
 * @param pinyinDb
 * @returns
 */
export function getCharCountInPinyinDb(
  pinyinDb: CommonType.DB_Pinyin_Of_Char
): number {
  let counter = 0;
  for (let rawOption of Object.values(pinyinDb)) {
    for (let item of rawOption.option_list) {
      counter = counter + item.char_list.length;
    }
  }

  return counter;
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
  // 没想好评分标准, 先返回默认值
  return 666;
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
  pinyinOptionList,
  generateAll = false,
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
  pinyinOptionList: CommonType.Pinyin_Of_Char[];
  /**
   * 是否生成全部数据, 默认只生成有限个数, 以节约计算时间
   */
  generateAll?: boolean;
}) {
  let nameList: CommonType.Type_Name[] = [];
  // 主动复制一遍变量, 避免内部修改影响到外部值
  pinyinOptionList = structuredClone(pinyinOptionList);

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
  // 按必选字进行过滤
  const set_必选字 = new Set();
  for (let char_必选字 of char_必选字_list) {
    set_必选字.add(char_必选字.char);
  }

  // 生成所有可能的结果
  for (let pinyinItemChar_1 of pinyinOptionList) {
    if (generateAll === false) {
      // 尽量减少计算量, 未显式要求生成全部结果就只生成一小部分
      if (nameList.length >= Const.Max_Display_Item) {
        return nameList;
      }
    }

    if (pinyinSet_同音字.has(pinyinItemChar_1.pinyin)) {
      // 排除同音字
      continue;
    }
    if (
      Util.isCharPairLegal({
        charList: [char_姓_末尾字, pinyinItemChar_1],
        type: "first_2_char",
      }) === false
    ) {
      continue;
    }

    for (let pinyinItemChar_2 of pinyinOptionList) {
      // 生成第二个字

      if (generateAll === false) {
        // 尽量减少计算量, 未显式要求生成全部结果就只生成一小部分
        if (nameList.length >= Const.Max_Display_Item) {
          return nameList;
        }
      }

      if (pinyinSet_同音字.has(pinyinItemChar_2.pinyin)) {
        // 排除同音字
        continue;
      }
      if (
        Util.isCharPairLegal({
          charList: [char_姓_末尾字, pinyinItemChar_1, pinyinItemChar_2],
          type: "full_name",
        }) === false
      ) {
        continue;
      }

      // 必选字检查
      let flag_check_必选字 = true;
      if (char_必选字_list.length > 0) {
        // 先将必选字检查置为false
        flag_check_必选字 = false;

        // 检查是否包含必选字
        for (let optionChar of pinyinItemChar_1.char_list) {
          if (flag_check_必选字) {
            // 有一个包含必选字就可以
            continue;
          }
          if (set_必选字.has(optionChar.char)) {
            // 匹配成功, 将当前拼音选项中的字替换为必选字
            // 由于已经进行了深拷贝, 所以这里的修改不会影响外界
            pinyinItemChar_1.char = optionChar.char;
            flag_check_必选字 = true;
          }
        }
        for (let optionChar of pinyinItemChar_2.char_list) {
          if (flag_check_必选字) {
            // 有一个包含必选字就可以
            continue;
          }
          if (set_必选字.has(optionChar.char)) {
            // 匹配成功, 将当前拼音选项中的字替换为必选字
            // 由于已经进行了深拷贝, 所以这里的修改不会影响外界
            pinyinItemChar_2.char = optionChar.char;
            flag_check_必选字 = true;
          }
        }
      }
      if (flag_check_必选字 === false) {
        // 必选字检查未通过
        continue;
      }
      const name: CommonType.Type_Name = {
        姓氏: char_姓_全部,
        人名_第一个字: {
          ...pinyinItemChar_1,
        },
        人名_第二个字: {
          ...pinyinItemChar_2,
        },
        demoStr: `${char_姓_全部.map((item) => item.char).join("")}${
          pinyinItemChar_1.char
        }${pinyinItemChar_2.char}`,
        score: getScoreOfName(pinyinItemChar_1.char, pinyinItemChar_2.char),
      };
      nameList.push(name);
    }
  }

  return nameList;
}

/**
 * 生成所有合法的姓名
 * @param char_姓氏
 * @returns
 */
export function generateLegalNameListFromExist({
  char_姓_全部,
  char_姓_末尾字,
  char_待排除的同音字_list: char_待排除的同音字_list = [],
  char_必选字_list = [],
  chooseType = Const.Choose_Type_Option.他山石,
  generateAll = false,
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
  char_待排除的同音字_list?: CommonType.Char_With_Pinyin[];
  /**
   * 姓名中必须出现的字, 一个名字中只能限定一个必选字出现在第二位或第三位, 但可以传入多个, 满足一个条件即可
   * 若必选字同音, 则只保留第一个必选字
   */
  char_必选字_list?: CommonType.Char_With_Pinyin[];
  /**
   * 已有姓名来源
   */
  chooseType: Type.ChooseType;
  /**
   * 是否生成全部数据, 默认只生成有限个数, 以节约计算时间
   */
  generateAll?: boolean;
}) {
  let nameList: CommonType.Type_Name[] = [];

  console.log("开始计算");

  const pinyinSet_同音字 = new Set();
  for (let char_待排除的同音字 of char_待排除的同音字_list) {
    pinyinSet_同音字.add(char_待排除的同音字.pinyin);
  }
  // 必选字不能同音
  let buf_过滤同音必选字: Record<string, CommonType.Char_With_Pinyin> = {};
  for (let char_必选字 of char_必选字_list) {
    if (buf_过滤同音必选字[char_必选字["pinyin"]] === undefined) {
      buf_过滤同音必选字[char_必选字["pinyin"]] = char_必选字;
    }
  }
  char_必选字_list = [...Object.values(buf_过滤同音必选字)];

  let legalNameList: string[];
  switch (chooseType) {
    case Const.Choose_Type_Option.古人云:
      legalNameList = NameDb_古人云;
      break;
    case Const.Choose_Type_Option.他山石:
      legalNameList = NameDb_他山石;
      break;
    case Const.Choose_Type_Option.财富论:
      legalNameList = NameDb_财富论;
      break;
    case Const.Choose_Type_Option.五道口:
      legalNameList = NameDb_五道口;
      break;
    case Const.Choose_Type_Option["五道口_精华版"]:
      legalNameList = NameDb_五道口_精华版;
      break;
    case Const.Choose_Type_Option.登科录:
      legalNameList = NameDb_登科录;
      break;
    default:
      legalNameList = NameDb_古人云;
  }

  // 首先按必选字进行过滤, 减少成本
  const set_必选字 = new Set();
  for (let char_必选字 of char_必选字_list) {
    set_必选字.add(char_必选字.char);
  }
  if (char_必选字_list.length > 0) {
    legalNameList = legalNameList.filter((item) => {
      let [char_1, char_2] = item.split("");
      if (
        set_必选字.has(char_1) === false &&
        set_必选字.has(char_2) === false
      ) {
        return false;
      }
      return true;
    });
  }

  // 将候选字转换为拼音序列
  let legalPinyinNameList = legalNameList.map((item) => {
    let [char_1, char_2] = item.split("");
    let pinyin_char_1 = getPinyinOfChar(char_1)[0];
    let pinyin_char_2 = getPinyinOfChar(char_2)[0];
    return {
      pinyin_char_1,
      pinyin_char_2,
    };
  });

  // 排除不合法的发音
  legalPinyinNameList = legalPinyinNameList.filter((item) => {
    // 排除同音字
    if (pinyinSet_同音字.has(item.pinyin_char_1.pinyin)) {
      return false;
    }
    if (pinyinSet_同音字.has(item.pinyin_char_2.pinyin)) {
      return false;
    }
    if (
      Util.isCharPairLegal({
        charList: [char_姓_末尾字, item.pinyin_char_1, item.pinyin_char_2],
        type: "full_name",
      }) === false
    ) {
      return false;
    }

    return true;
  });

  // 生成所有可能的结果
  for (let legalPinyinName of legalPinyinNameList) {
    let pinyin_1 = legalPinyinName.pinyin_char_1;
    let pinyin_2 = legalPinyinName.pinyin_char_2;

    const name: CommonType.Type_Name = {
      姓氏: char_姓_全部,
      人名_第一个字: {
        ...pinyin_1,
        char_list: [pinyin_1],
      },
      人名_第二个字: {
        ...pinyin_2,
        char_list: [pinyin_2],
      },
      demoStr: `${char_姓_全部.map((item) => item.char).join("")}${
        pinyin_1.char
      }${pinyin_2.char}`,
      score: getScoreOfName(pinyin_1.char, pinyin_2.char),
    };
    nameList.push(name);

    if (generateAll === false) {
      // 尽量减少计算量, 未显式要求生成全部结果就只生成一小部分
      if (nameList.length >= Const.Max_Display_Item) {
        return nameList;
      }
    }
  }

  return nameList;
}
