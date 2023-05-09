import * as path from "path";
import * as Type from "./type";

const basePath = path.resolve(__dirname, "..", "..");

export const Raw_已知人名_Path = path.resolve(basePath, "database/raw");
export const CharDb_人名列表_Uri = path.resolve(
  basePath,
  "database/json/raw_person_name_char_list.json"
);
export const CharDb_人名字典_Uri = path.resolve(
  basePath,
  "database/json/raw_person_name_char_db.json"
);

export const Raw_Char_Db_汉典原始数据_Uri = path.resolve(
  basePath,
  "database/char_db/raw_zdic.txt"
);

export const Raw_Char_Db_汉典_拼音列表_Uri = path.resolve(
  basePath,
  "database/char_db/raw_pinyin_list.json"
);

export const Char_Db_total_以字为单位_Uri = path.resolve(
  basePath,
  "database/char_db/zd_without_muilt_tone_char_db.json"
);

export const Char_Db_姓名用字_最少出现1次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_1.json"
);
export const Char_Db_姓名用字_最少出现2次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_2.json"
);
export const Char_Db_姓名用字_最少出现3次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_3.json"
);
export const Char_Db_姓名用字_最少出现4次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_4.json"
);
export const Char_Db_姓名用字_最少出现5次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_5.json"
);
export const Char_Db_姓名用字_最少出现10次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_10.json"
);
export const Char_Db_姓名用字_最少出现20次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_20.json"
);
export const Char_Db_姓名用字_最少出现50次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_50.json"
);
export const Char_Db_姓名用字_最少出现100次_Uri = path.resolve(
  basePath,
  "database/char_db/zd_name_char_db_min_100.json"
);

export const Pinyin_Db_姓名用字_最少出现1次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_1.json"
);
export const Pinyin_Db_姓名用字_最少出现2次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_2.json"
);
export const Pinyin_Db_姓名用字_最少出现3次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_3.json"
);
export const Pinyin_Db_姓名用字_最少出现4次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_4.json"
);
export const Pinyin_Db_姓名用字_最少出现5次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_5.json"
);
export const Pinyin_Db_姓名用字_最少出现10次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_10.json"
);
export const Pinyin_Db_姓名用字_最少出现20次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_20.json"
);
export const Pinyin_Db_姓名用字_最少出现50次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_50.json"
);
export const Pinyin_Db_姓名用字_最少出现100次_Uri = path.resolve(
  basePath,
  "database/pinyin_db/zd_name_pinyin_db_min_100.json"
);

export const Char_Db_私募基金名_用字_列表_Uri = path.resolve(
  basePath,
  "database/char_db/私募基金名_用字_列表.json"
);
export const Char_Db_私募基金名_用字_纯文本_Uri = path.resolve(
  basePath,
  "database/char_db/私募基金名_用字_纯文本.txt"
);
export const Char_Db_私募基金公司_用字_列表_Uri = path.resolve(
  basePath,
  "database/char_db/私募基金公司_用字_列表.json"
);
export const Char_Db_私募基金公司_用字_纯文本_Uri = path.resolve(
  basePath,
  "database/char_db/私募基金公司_用字_纯文本.txt"
);

export const Raw_私募基金管理公司名称_Uri = path.resolve(
  basePath,
  "database/fund_db/私募基金管理公司名称_截至20230507.txt"
);

export const Raw_已公布私募基金名_Uri = path.resolve(
  basePath,
  "database/fund_db/已公布私募基金名_截至20230507.txt"
);

export const Name_Db_他山石_已知人名_Uri = path.resolve(
  basePath,
  "database/name_db/他山石_已知人名.json"
);

export const Name_Db_财富论_基金选名_Uri = path.resolve(
  basePath,
  "database/name_db/财富论_基金选名.json"
);

export const Name_Db_古人云_历史人名_Uri = path.resolve(
  basePath,
  "database/name_db/古人云_历史人名.json"
);

export const 音调_Map: Record<string, Type.Type_音调> = {
  ü: 1,
  ǜ: 4,
  ǚ: 3,
  ǘ: 2,
  ǖ: 1,
  u: 1,
  ù: 4,
  ǔ: 3,
  ú: 2,
  ū: 1,
  o: 1,
  ò: 4,
  ǒ: 3,
  ó: 2,
  ō: 1,
  i: 1,
  ì: 4,
  ǐ: 3,
  í: 2,
  ī: 1,
  e: 1,
  è: 4,
  ě: 3,
  é: 2,
  ē: 1,
  a: 1,
  à: 4,
  ǎ: 3,
  á: 2,
  ā: 1,
};

export const 音标_To_原字母 = {
  ü: "ü",
  ǜ: "ü",
  ǚ: "ü",
  ǘ: "ü",
  ǖ: "ü",
  u: "u",
  ù: "u",
  ǔ: "u",
  ú: "u",
  ū: "u",
  o: "o",
  ò: "o",
  ǒ: "o",
  ó: "o",
  ō: "o",
  i: "i",
  ì: "i",
  ǐ: "i",
  í: "i",
  ī: "i",
  e: "e",
  è: "e",
  ě: "e",
  é: "e",
  ē: "e",
  a: "a",
  à: "a",
  ǎ: "a",
  á: "a",
  ā: "a",
};

/**
 * 韵母分类
 */
export const Vowel_Type = {
  一麻: "1" as const,
  二波: "2" as const,
  三皆: "3" as const,
  四开: "4" as const,
  五微: "5" as const,
  六豪: "6" as const,
  七尤: "7" as const,
  八寒: "8" as const,
  九文: "9" as const,
  十唐: "10" as const,
  十一庚: "11" as const,
  十二齐: "12" as const,
  十三支: "13" as const,
  十四姑: "14" as const,
};

/**
 * 不同类别对应的韵母列表
 */
export const Vowel_Map = {
  [Vowel_Type.一麻]: new Set(["a", "ia", "ua"]),
  [Vowel_Type.二波]: new Set(["o", "e", "uo"]),
  [Vowel_Type.三皆]: new Set(["ie", "üe"]),
  [Vowel_Type.四开]: new Set(["ai", "uai"]),
  [Vowel_Type.五微]: new Set(["ei", "ui"]),
  [Vowel_Type.六豪]: new Set(["ao", "iao"]),
  [Vowel_Type.七尤]: new Set(["ou", "iu"]),
  [Vowel_Type.八寒]: new Set(["an", "ian", "uan", "üan"]),
  [Vowel_Type.九文]: new Set(["en", "in", "un", "ün"]),
  [Vowel_Type.十唐]: new Set(["ang", "iang", "uang"]),
  [Vowel_Type.十一庚]: new Set(["eng", "ing", "ong", "iong"]),
  [Vowel_Type.十二齐]: new Set(["i", "er", "ü"]),
  // 特指zi/ci/si/ri/zhi/chi/shi, 零韵母
  [Vowel_Type.十三支]: new Set(["-i"]),
  [Vowel_Type.十四姑]: new Set(["u"]),
};

let vowel_item_2_type: Record<string, keyof typeof Vowel_Map> = {};
for (let vowelType of Object.keys(Vowel_Map)) {
  let charSet = Vowel_Map[vowelType as Type.Vowel_韵母];
  for (let char of charSet) {
    vowel_item_2_type[char] = vowelType as keyof typeof Vowel_Map;
  }
}
export const Vowel_2_Type = {
  ...vowel_item_2_type,
};

/**
 * 声母分类
 */
export const Initial_发音部位_Type = {
  双唇音: "1_1" as const,
  唇齿音: "1_2" as const,
  舌尖前音: "1_3" as const,
  舌尖中音: "1_4" as const,
  舌尖后音: "1_5" as const,
  舌面音: "1_6" as const,
  舌根音: "1_7" as const,
};
export const Initial_发音方法_Type = {
  塞音_清音_不送气: "2_1" as const,
  塞音_清音_送气: "2_2" as const,
  塞擦音_清音_不送气: "2_3" as const,
  塞擦音_清音_送气: "2_4" as const,
  擦音_清音: "2_5" as const,
  擦音_浊音: "2_6" as const,
  鼻音_浊音: "2_7" as const,
  边音_浊音: "2_8" as const,
};

/**
 * 不同类别对应的声母列表
 */
export const Initial_发音部位_Map = {
  [Initial_发音部位_Type.双唇音]: new Set(["b", "p", "m"]),
  [Initial_发音部位_Type.唇齿音]: new Set(["f"]),
  [Initial_发音部位_Type.舌尖前音]: new Set(["z", "c", "s"]),
  [Initial_发音部位_Type.舌尖中音]: new Set(["d", "t", "n", "l"]),
  [Initial_发音部位_Type.舌尖后音]: new Set(["zh", "ch", "sh", "r"]),
  [Initial_发音部位_Type.舌面音]: new Set(["j", "q", "x"]),
  [Initial_发音部位_Type.舌根音]: new Set(["g", "k", "h"]),
};
export const Initial_发音方法_Map = {
  [Initial_发音方法_Type.塞音_清音_不送气]: new Set(["b", "d", "g"]),
  [Initial_发音方法_Type.塞音_清音_送气]: new Set(["p", "t", "k"]),
  [Initial_发音方法_Type.塞擦音_清音_不送气]: new Set(["z", "zh", "j"]),
  [Initial_发音方法_Type.塞擦音_清音_送气]: new Set(["c", "ch", "q"]),
  [Initial_发音方法_Type.擦音_清音]: new Set(["f", "s", "sh", "x", "h"]),
  [Initial_发音方法_Type.擦音_浊音]: new Set(["r"]),
  [Initial_发音方法_Type.鼻音_浊音]: new Set(["m", "n"]),
  [Initial_发音方法_Type.边音_浊音]: new Set(["l"]),
};
let initial_item_2_发音部位_type: Record<string, Type.Initial_声母_发音部位> =
  {};
for (let initial发音部位Type of Object.keys(Initial_发音部位_Map)) {
  let charSet =
    Initial_发音部位_Map[initial发音部位Type as Type.Initial_声母_发音部位];
  for (let char of charSet) {
    initial_item_2_发音部位_type[char] =
      initial发音部位Type as Type.Initial_声母_发音部位;
  }
}
export const Initial_2_发音部位_Type = {
  ...initial_item_2_发音部位_type,
};

let initial_item_2_发音方法_type: Record<string, Type.Initial_声母_发音方法> =
  {};
for (let initial发音方法Type of Object.keys(Initial_发音方法_Map)) {
  let charSet =
    Initial_发音方法_Map[initial发音方法Type as Type.Initial_声母_发音方法];
  for (let char of charSet) {
    initial_item_2_发音方法_type[char] =
      initial发音方法Type as Type.Initial_声母_发音方法;
  }
}
export const Initial_2_发音方法_Type = {
  ...initial_item_2_发音方法_type,
};
