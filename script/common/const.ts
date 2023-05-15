import * as path from "path";
import * as Type from "./type";

export const basePath = path.resolve(__dirname, "..", "..");

export const Raw_已知人名_Path = path.resolve(basePath, "database/raw");
export const CharDb_人名列表_Uri = path.resolve(
  basePath,
  "database/summary/人名用字_列表.json"
);
export const CharDb_人名用字_字典_Uri = path.resolve(
  basePath,
  "database/char_db/人名用字_字典.json"
);

export const Char_Db_私募基金_用字_列表_Uri = path.resolve(
  basePath,
  "database/summary/私募基金_用字_列表.json"
);
export const CharDb_私募基金_用字_字典_Uri = path.resolve(
  basePath,
  "database/char_db/私募基金_用字_字典.json"
);

export const Raw_私募基金管理公司名称_Uri = path.resolve(
  basePath,
  "resource/fund_db/原始数据/私募基金管理公司名称_截至20230507.json"
);

export const Raw_已公布私募基金名_Uri = path.resolve(
  basePath,
  "resource/fund_db/原始数据/已公布私募基金名_截至20230507.json"
);

export const Raw_Char_Db_汉典原始数据_Uri = path.resolve(
  basePath,
  "database/char_db/raw_zdic.txt"
);

export const Raw_Char_Db_汉典_拼音列表_Uri = path.resolve(
  basePath,
  "database/char_db/raw_pinyin_list.json"
);
export const Raw_CBDB_中国历代人物传记资料库_Uri = path.resolve(
  basePath,
  "resource/登科录/CBDB_2022.sqlite3"
);

export const Raw_古代进士名录_JSON_Uri = path.resolve(
  basePath,
  "resource/登科录/古代进士名录.json"
);
export const Raw_古代进士名录_CSV_Uri = path.resolve(
  basePath,
  "resource/登科录/古代进士名录.csv"
);

export const Char_Db_生成二字候选名时统计发现的多音字及出现场景_Markdown_Uri =
  path.resolve(
    basePath,
    "database/char_db/生成二字候选名时统计发现的多音字及出现场景.md"
  );

export const Char_Db_生成二字候选名时统计发现的多音字及出现场景_JSON_Uri =
  path.resolve(
    basePath,
    "database/char_db/生成二字候选名时统计发现的多音字及出现场景.json"
  );
export const Char_Db_生成二字候选名时统计发现的多音字及出现场景_仅字符_Uri =
  path.resolve(
    basePath,
    "database/char_db/生成二字候选名时统计发现的多音字及出现场景_仅字符.txt"
  );

export const Char_Db_total_以字为单位_Uri = path.resolve(
  basePath,
  "database/char_db/zd_without_muilt_tone_char_db.json"
);
export const Char_Db_仅单音字_Uri = path.resolve(
  basePath,
  "database/char_db/zd_without_muilt_tone_only_char.json"
);

export const Char_Db_汉典_全部汉字_Uri = path.resolve(
  basePath,
  "database/char_db/db_all_char_map.json"
);

export const Char_Db_姓名用字_出现_Uri = {
  "1次": path.resolve(basePath, "database/char_db/name_min_1.json"),
  "3次": path.resolve(basePath, "database/char_db/name_min_3.json"),
  "5次": path.resolve(basePath, "database/char_db/name_min_5.json"),
  "10次": path.resolve(basePath, "database/char_db/name_min_10.json"),
  "50次": path.resolve(basePath, "database/char_db/name_min_50.json"),
  "100次": path.resolve(basePath, "database/char_db/name_min_100.json"),
};

export const Char_Db_姓名用字_仅字符列表_Uri = {
  "1次": path.resolve(basePath, "database/char_db/min_1_olny_char.json"),
  "3次": path.resolve(basePath, "database/char_db/min_3_olny_char.json"),
  "5次": path.resolve(basePath, "database/char_db/min_5_olny_char.json"),
  "10次": path.resolve(basePath, "database/char_db/min_10_olny_char.json"),
  "50次": path.resolve(basePath, "database/char_db/min_50_olny_char.json"),
  "100次": path.resolve(basePath, "database/char_db/min_100_olny_char.json"),
};

export const Pinyin_Db_姓名用字_出现_Uri = {
  "1次": path.resolve(basePath, "database/pinyin_db/name_char_min_1.json"),
  "3次": path.resolve(basePath, "database/pinyin_db/name_char_min_1.json"),
  "5次": path.resolve(basePath, "database/pinyin_db/name_char_min_5.json"),
  "10次": path.resolve(basePath, "database/pinyin_db/name_char_min_10.json"),
  "50次": path.resolve(basePath, "database/pinyin_db/name_char_min_50.json"),
  "100次": path.resolve(basePath, "database/pinyin_db/name_char_min_100.json"),
};

export const Raw_国家科研基金项目_申报人_Uri = path.resolve(
  basePath,
  "resource/fund_db/原始数据/国家科研基金项目_申报人_Uri.txt"
);

export const Name_Db_Uri = {
  他山石_已知人名: path.resolve(
    basePath,
    "database/name_db/他山石_已知人名.json"
  ),
  财富论_私募基金_集思录: path.resolve(
    basePath,
    "database/name_db/财富论_私募基金_集思录_出现1_2次.json"
  ),
  财富论_私募基金_精选集: path.resolve(
    basePath,
    "database/name_db/财富论_私募基金_精选集_出现3_300次.json"
  ),
  古人云_历史人名: path.resolve(
    basePath,
    "database/name_db/古人云_历史人名.json"
  ),
  五道口_集思录_cnki项目申报人名: path.resolve(
    basePath,
    "database/name_db/五道口_集思录_cnki项目申报人名.json"
  ),
  五道口_精选集_国家科研基金项目负责人名: path.resolve(
    basePath,
    "database/name_db/五道口_精选集_国家科研基金项目负责人名.json"
  ),
  登科录_历史进士名: path.resolve(
    basePath,
    "database/name_db/登科录_历史进士名.json"
  ),
};

export const 音调_Map: Record<string, Type.Type_音调> = {
  ü: 1 as const,
  ǜ: 4 as const,
  ǚ: 3 as const,
  ǘ: 2 as const,
  ǖ: 1 as const,
  u: 1 as const,
  ù: 4 as const,
  ǔ: 3 as const,
  ú: 2 as const,
  ū: 1 as const,
  o: 1 as const,
  ò: 4 as const,
  ǒ: 3 as const,
  ó: 2 as const,
  ō: 1 as const,
  i: 1 as const,
  ì: 4 as const,
  ǐ: 3 as const,
  í: 2 as const,
  ī: 1 as const,
  e: 1 as const,
  è: 4 as const,
  ě: 3 as const,
  é: 2 as const,
  ē: 1 as const,
  a: 1 as const,
  à: 4 as const,
  ǎ: 3 as const,
  á: 2 as const,
  ā: 1 as const,
};

export const 音标_To_原字母 = {
  ü: "ü" as const,
  ǜ: "ü" as const,
  ǚ: "ü" as const,
  ǘ: "ü" as const,
  ǖ: "ü" as const,
  u: "u" as const,
  ù: "u" as const,
  ǔ: "u" as const,
  ú: "u" as const,
  ū: "u" as const,
  o: "o" as const,
  ò: "o" as const,
  ǒ: "o" as const,
  ó: "o" as const,
  ō: "o" as const,
  i: "i" as const,
  ì: "i" as const,
  ǐ: "i" as const,
  í: "i" as const,
  ī: "i" as const,
  e: "e" as const,
  è: "e" as const,
  ě: "e" as const,
  é: "e" as const,
  ē: "e" as const,
  a: "a" as const,
  à: "a" as const,
  ǎ: "a" as const,
  á: "a" as const,
  ā: "a" as const,
};

/**
 * 韵母分类
 */
export const Vowel_韵母类别 = {
  一麻: "一麻" as const,
  二波: "二波" as const,
  三皆: "三皆" as const,
  四开: "四开" as const,
  五微: "五微" as const,
  六豪: "六豪" as const,
  七尤: "七尤" as const,
  八寒: "八寒" as const,
  九文: "九文" as const,
  十唐: "十唐" as const,
  十一庚: "十一庚" as const,
  十二齐: "十二齐" as const,
  十三支: "十三支" as const,
  十四姑: "十四姑" as const,
};

/**
 * 不同类别对应的韵母列表
 */
export const Vowel_Record = {
  [Vowel_韵母类别.一麻]: new Set(["a", "ia", "ua"]),
  [Vowel_韵母类别.二波]: new Set(["o", "e", "uo"]),
  [Vowel_韵母类别.三皆]: new Set(["ie", "üe"]),
  [Vowel_韵母类别.四开]: new Set(["ai", "uai"]),
  [Vowel_韵母类别.五微]: new Set(["ei", "ui"]),
  [Vowel_韵母类别.六豪]: new Set(["ao", "iao"]),
  [Vowel_韵母类别.七尤]: new Set(["ou", "iu"]),
  [Vowel_韵母类别.八寒]: new Set(["an", "ian", "uan", "üan"]),
  [Vowel_韵母类别.九文]: new Set(["en", "in", "un", "ün"]),
  [Vowel_韵母类别.十唐]: new Set(["ang", "iang", "uang"]),
  [Vowel_韵母类别.十一庚]: new Set(["eng", "ing", "ong", "iong"]),
  [Vowel_韵母类别.十二齐]: new Set(["i", "er", "ü"]),
  // 特指zi/ci/si/ri/zhi/chi/shi, 零韵母
  [Vowel_韵母类别.十三支]: new Set(["-i"]),
  [Vowel_韵母类别.十四姑]: new Set(["u"]),
};

/**
 * 根据韵母匹配顺序, 获取韵母与类别信息
 * 思路: 按字符串长度, 由长到短进行匹配, 可以避免误匹配.
 * 其中, 第十三韵支对应的i和普通i一样, 需要专门处理
 */
export const Vowel_Match_List: {
  target: string;
  vowelType: Type.Vowel_韵母类别;
}[] = [
  { target: "iang", vowelType: Vowel_韵母类别.十唐 },
  { target: "uang", vowelType: Vowel_韵母类别.十唐 },
  { target: "iong", vowelType: Vowel_韵母类别.十一庚 },
  { target: "uai", vowelType: Vowel_韵母类别.四开 },
  { target: "iao", vowelType: Vowel_韵母类别.六豪 },
  { target: "eng", vowelType: Vowel_韵母类别.十一庚 },
  { target: "ing", vowelType: Vowel_韵母类别.十一庚 },
  { target: "ong", vowelType: Vowel_韵母类别.十一庚 },
  { target: "ang", vowelType: Vowel_韵母类别.十唐 },
  { target: "ian", vowelType: Vowel_韵母类别.八寒 },
  { target: "uan", vowelType: Vowel_韵母类别.八寒 },
  { target: "üan", vowelType: Vowel_韵母类别.八寒 },
  { target: "ia", vowelType: Vowel_韵母类别.一麻 },
  { target: "ua", vowelType: Vowel_韵母类别.一麻 },
  { target: "uo", vowelType: Vowel_韵母类别.二波 },
  { target: "ie", vowelType: Vowel_韵母类别.三皆 },
  { target: "üe", vowelType: Vowel_韵母类别.三皆 },
  { target: "ai", vowelType: Vowel_韵母类别.四开 },
  { target: "ei", vowelType: Vowel_韵母类别.五微 },
  { target: "ui", vowelType: Vowel_韵母类别.五微 },
  { target: "ao", vowelType: Vowel_韵母类别.六豪 },
  { target: "ou", vowelType: Vowel_韵母类别.七尤 },
  { target: "iu", vowelType: Vowel_韵母类别.七尤 },
  { target: "an", vowelType: Vowel_韵母类别.八寒 },
  { target: "en", vowelType: Vowel_韵母类别.九文 },
  { target: "in", vowelType: Vowel_韵母类别.九文 },
  { target: "un", vowelType: Vowel_韵母类别.九文 },
  { target: "ün", vowelType: Vowel_韵母类别.九文 },
  { target: "er", vowelType: Vowel_韵母类别.十二齐 },
  { target: "a", vowelType: Vowel_韵母类别.一麻 },
  { target: "o", vowelType: Vowel_韵母类别.二波 },
  { target: "e", vowelType: Vowel_韵母类别.二波 },
  { target: "i", vowelType: Vowel_韵母类别.十二齐 },
  { target: "ü", vowelType: Vowel_韵母类别.十二齐 },
  { target: "u", vowelType: Vowel_韵母类别.十四姑 },
];
export const Vowel_Match_List_十三支: {
  target: string;
  vowelType: Type.Vowel_韵母类别;
}[] = [
  { target: "zi", vowelType: Vowel_韵母类别.十三支 },
  { target: "ci", vowelType: Vowel_韵母类别.十三支 },
  { target: "si", vowelType: Vowel_韵母类别.十三支 },
  { target: "ri", vowelType: Vowel_韵母类别.十三支 },
  { target: "zhi", vowelType: Vowel_韵母类别.十三支 },
  { target: "chi", vowelType: Vowel_韵母类别.十三支 },
  { target: "shi", vowelType: Vowel_韵母类别.十三支 },
];

let vowel_item_2_type: Record<string, keyof typeof Vowel_Record> = {};
for (let vowelType of Object.keys(Vowel_Record)) {
  let charSet = Vowel_Record[vowelType as Type.Vowel_韵母类别];
  for (let char of charSet) {
    vowel_item_2_type[char] = vowelType as keyof typeof Vowel_Record;
  }
}
export const Vowel_2_Type = {
  ...vowel_item_2_type,
};

/**
 * 声母分类
 */
export const Initial_声母类别_发音部位 = {
  双唇音: "双唇音" as const,
  唇齿音: "唇齿音" as const,
  舌尖前音: "舌尖前音" as const,
  舌尖中音: "舌尖中音" as const,
  舌尖后音: "舌尖后音" as const,
  舌面音: "舌面音" as const,
  舌根音: "舌根音" as const,
  零声母: "零声母" as const,
};
export const Initial_声母类别_发音方法 = {
  塞音_清音_不送气: "塞音_清音_不送气" as const,
  塞音_清音_送气: "塞音_清音_送气" as const,
  塞擦音_清音_不送气: "塞擦音_清音_不送气" as const,
  塞擦音_清音_送气: "塞擦音_清音_送气" as const,
  擦音_清音: "擦音_清音" as const,
  擦音_浊音: "擦音_浊音" as const,
  鼻音_浊音: "鼻音_浊音" as const,
  边音_浊音: "边音_浊音" as const,
  零声母: "零声母" as const,
};

/**
 * 不同类别对应的声母列表
 */
export const Initial_发音部位_Record = {
  [Initial_声母类别_发音部位.双唇音]: new Set(["b", "p", "m"]),
  [Initial_声母类别_发音部位.唇齿音]: new Set(["f"]),
  [Initial_声母类别_发音部位.舌尖前音]: new Set(["z", "c", "s"]),
  [Initial_声母类别_发音部位.舌尖中音]: new Set(["d", "t", "n", "l"]),
  [Initial_声母类别_发音部位.舌尖后音]: new Set(["zh", "ch", "sh", "r"]),
  [Initial_声母类别_发音部位.舌面音]: new Set(["j", "q", "x"]),
  [Initial_声母类别_发音部位.舌根音]: new Set(["g", "k", "h"]),
  [Initial_声母类别_发音部位.零声母]: new Set(["y", "w"]),
};
export const Initial_发音方法_Record = {
  [Initial_声母类别_发音方法.塞音_清音_不送气]: new Set(["b", "d", "g"]),
  [Initial_声母类别_发音方法.塞音_清音_送气]: new Set(["p", "t", "k"]),
  [Initial_声母类别_发音方法.塞擦音_清音_不送气]: new Set(["z", "zh", "j"]),
  [Initial_声母类别_发音方法.塞擦音_清音_送气]: new Set(["c", "ch", "q"]),
  [Initial_声母类别_发音方法.擦音_清音]: new Set(["f", "s", "sh", "x", "h"]),
  [Initial_声母类别_发音方法.擦音_浊音]: new Set(["r"]),
  [Initial_声母类别_发音方法.鼻音_浊音]: new Set(["m", "n"]),
  [Initial_声母类别_发音方法.边音_浊音]: new Set(["l"]),
  [Initial_声母类别_发音方法.零声母]: new Set(["y", "w"]),
};
let initial_item_2_发音部位_type: Record<
  string,
  Type.Initial_声母类别_发音部位
> = {};
for (let initial发音部位Type of Object.keys(Initial_发音部位_Record)) {
  let charSet =
    Initial_发音部位_Record[
      initial发音部位Type as Type.Initial_声母类别_发音部位
    ];
  for (let char of charSet) {
    initial_item_2_发音部位_type[char] =
      initial发音部位Type as Type.Initial_声母类别_发音部位;
  }
}
export const Initial_2_发音部位_Type = {
  ...initial_item_2_发音部位_type,
};

let initial_item_2_发音方法_type: Record<
  string,
  Type.Initial_声母类别_发音方法
> = {};
for (let initial发音方法Type of Object.keys(Initial_发音方法_Record)) {
  let charSet =
    Initial_发音方法_Record[
      initial发音方法Type as Type.Initial_声母类别_发音方法
    ];
  for (let char of charSet) {
    initial_item_2_发音方法_type[char] =
      initial发音方法Type as Type.Initial_声母类别_发音方法;
  }
}
export const Initial_2_发音方法_Type = {
  ...initial_item_2_发音方法_type,
};

/**
 * 根据声母匹配顺序, 获取声母与类别信息
 * 思路: 按字符串长度, 由长到短进行匹配, 可以避免误匹配.
 */
export const Initial_发音方法_Match_List: {
  target: string;
  initialType: Type.Initial_声母类别_发音方法;
}[] = [
  { initialType: Initial_声母类别_发音方法.塞擦音_清音_不送气, target: "zh" },
  { initialType: Initial_声母类别_发音方法.塞擦音_清音_送气, target: "ch" },
  { initialType: Initial_声母类别_发音方法.擦音_清音, target: "sh" },
  { initialType: Initial_声母类别_发音方法.塞音_清音_不送气, target: "b" },
  { initialType: Initial_声母类别_发音方法.塞音_清音_不送气, target: "d" },
  { initialType: Initial_声母类别_发音方法.塞音_清音_不送气, target: "g" },
  { initialType: Initial_声母类别_发音方法.塞音_清音_送气, target: "p" },
  { initialType: Initial_声母类别_发音方法.塞音_清音_送气, target: "t" },
  { initialType: Initial_声母类别_发音方法.塞音_清音_送气, target: "k" },
  { initialType: Initial_声母类别_发音方法.塞擦音_清音_不送气, target: "z" },
  { initialType: Initial_声母类别_发音方法.塞擦音_清音_不送气, target: "j" },
  { initialType: Initial_声母类别_发音方法.塞擦音_清音_送气, target: "c" },
  { initialType: Initial_声母类别_发音方法.塞擦音_清音_送气, target: "q" },
  { initialType: Initial_声母类别_发音方法.擦音_清音, target: "f" },
  { initialType: Initial_声母类别_发音方法.擦音_清音, target: "s" },
  { initialType: Initial_声母类别_发音方法.擦音_清音, target: "x" },
  { initialType: Initial_声母类别_发音方法.擦音_清音, target: "h" },
  { initialType: Initial_声母类别_发音方法.擦音_浊音, target: "r" },
  { initialType: Initial_声母类别_发音方法.鼻音_浊音, target: "m" },
  { initialType: Initial_声母类别_发音方法.鼻音_浊音, target: "n" },
  { initialType: Initial_声母类别_发音方法.边音_浊音, target: "l" },
  { initialType: Initial_声母类别_发音方法.零声母, target: "y" },
  { initialType: Initial_声母类别_发音方法.零声母, target: "w" },
];

export const Initial_发音部位_Match_List: {
  target: string;
  initialType: Type.Initial_声母类别_发音部位;
}[] = [
  { initialType: Initial_声母类别_发音部位.舌尖后音, target: "zh" },
  { initialType: Initial_声母类别_发音部位.舌尖后音, target: "ch" },
  { initialType: Initial_声母类别_发音部位.舌尖后音, target: "sh" },
  { initialType: Initial_声母类别_发音部位.舌尖后音, target: "r" },
  { initialType: Initial_声母类别_发音部位.双唇音, target: "b" },
  { initialType: Initial_声母类别_发音部位.双唇音, target: "p" },
  { initialType: Initial_声母类别_发音部位.双唇音, target: "m" },
  { initialType: Initial_声母类别_发音部位.唇齿音, target: "f" },
  { initialType: Initial_声母类别_发音部位.舌尖前音, target: "z" },
  { initialType: Initial_声母类别_发音部位.舌尖前音, target: "c" },
  { initialType: Initial_声母类别_发音部位.舌尖前音, target: "s" },
  { initialType: Initial_声母类别_发音部位.舌尖中音, target: "d" },
  { initialType: Initial_声母类别_发音部位.舌尖中音, target: "t" },
  { initialType: Initial_声母类别_发音部位.舌尖中音, target: "n" },
  { initialType: Initial_声母类别_发音部位.舌尖中音, target: "l" },
  { initialType: Initial_声母类别_发音部位.舌面音, target: "j" },
  { initialType: Initial_声母类别_发音部位.舌面音, target: "q" },
  { initialType: Initial_声母类别_发音部位.舌面音, target: "x" },
  { initialType: Initial_声母类别_发音部位.舌根音, target: "g" },
  { initialType: Initial_声母类别_发音部位.舌根音, target: "k" },
  { initialType: Initial_声母类别_发音部位.舌根音, target: "h" },
  { initialType: Initial_声母类别_发音部位.零声母, target: "y" },
  { initialType: Initial_声母类别_发音部位.零声母, target: "w" },
];

/**
 * 音调评分表
 * key为前三个字的音调, value为1~5分评分, 只推荐使用3/4/5三个评分的姓名
 */
const ToneScoreMap = {
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

/**
 * 不合法的音调组合(评分2分及以下)
 */
const illegalTone = {
  "111": 2,
  "133": 1,
  "144": 2,
  "222": 2,
  "233": 1,
  "244": 2,
  "331": 1,
  "332": 1,
  "333": 1,
  "334": 1,
  "344": 1,
  "433": 1,
  "441": 2,
  "442": 2,
  "443": 2,
  "444": 1,
};
