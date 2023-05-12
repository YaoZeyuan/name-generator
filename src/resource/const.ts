import * as CommonType from "@/script/common/type";
import * as Type from "./type";
import * as utils from "@src/utils";
import PinyinDb_Min_1 from "@/database/pinyin_db/zd_name_pinyin_db_min_1.json";
import PinyinDb_Min_5 from "@/database/pinyin_db/zd_name_pinyin_db_min_5.json";
import PinyinDb_Min_10 from "@/database/pinyin_db/zd_name_pinyin_db_min_10.json";
import PinyinDb_Min_50 from "@/database/pinyin_db/zd_name_pinyin_db_min_50.json";
import PinyinDb_Min_100 from "@/database/pinyin_db/zd_name_pinyin_db_min_100.json";

const Base_Storage_Key = "name_storage";
export const Storage_Key_Map = {
  姓氏: `${Base_Storage_Key}_family_name`,
  需过滤字列表: `${Base_Storage_Key}_Need_Fileter_Char`,
  必选字位置: `${Base_Storage_Key}_必选字位置`,
  必选字: `${Base_Storage_Key}_Must_Have_Char`,
  Char_Level: `${Base_Storage_Key}_Char_Level`,
  Gender_Type: `${Base_Storage_Key}_Gender_Type`,
};

export const Char_Specify_Option = {
  第二位: "第二位" as const,
  第三位: "第三位" as const,
  不限制: "不限制" as const,
};

export const Gender_Type = {
  男宝: "男宝" as const,
  女宝: "女宝" as const,
  都看看: "都看看" as const,
};

export const Choose_Type_Option = {
  [`诗云`]: `诗云` as const,
  [`古人云`]: `古人云` as const,
  [`他山石`]: `他山石` as const,
  [`财富论`]: `财富论` as const,
  [`五道口`]: `五道口` as const,
  [`五道口_精华版`]: `五道口_精华版` as const,
  [`登科录`]: `登科录` as const,
};

export const Choose_Type_Show: Record<Type.ChooseType, string> = {
  [Choose_Type_Option.诗云]: "诗云-生成所有可能发音组合",
  [Choose_Type_Option.古人云]: "古人云-古代名与字,均有典故",
  [Choose_Type_Option.他山石]: "他山石-现代人名",
  [Choose_Type_Option.财富论]: "财富论-私募基金",
  [Choose_Type_Option.五道口]: "五道口-从cnki项目中寻找",
  [Choose_Type_Option.五道口_精华版]: "五道口-院士与国家科研基金项目负责人",
  [Choose_Type_Option.登科录]: "登科录-历代进士名",
};

export const CharDb_Level_Option = {
  ["至少出现1次"]: "至少出现1次" as const,
  ["至少出现5次"]: "至少出现5次" as const,
  ["至少出现10次"]: "至少出现10次" as const,
  ["至少出现50次"]: "至少出现50次" as const,
  ["至少出现100次"]: "至少出现100次" as const,
};

export const CharDb_Level_Item: Record<
  Type.CharDbLevel,
  CommonType.Pinyin_Of_Char[]
> = {
  [CharDb_Level_Option["至少出现1次"]]: utils.generatePinyinOptionList(
    PinyinDb_Min_1 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
  [CharDb_Level_Option["至少出现5次"]]: utils.generatePinyinOptionList(
    PinyinDb_Min_5 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
  [CharDb_Level_Option["至少出现10次"]]: utils.generatePinyinOptionList(
    PinyinDb_Min_10 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
  [CharDb_Level_Option["至少出现50次"]]: utils.generatePinyinOptionList(
    PinyinDb_Min_50 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
  [CharDb_Level_Option["至少出现100次"]]: utils.generatePinyinOptionList(
    PinyinDb_Min_100 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
};
export const CharDb_Char_Item_Count: Record<Type.CharDbLevel, number> = {
  [CharDb_Level_Option["至少出现1次"]]: utils.getCharCountInPinyinDb(
    PinyinDb_Min_1 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
  [CharDb_Level_Option["至少出现5次"]]: utils.getCharCountInPinyinDb(
    PinyinDb_Min_5 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
  [CharDb_Level_Option["至少出现10次"]]: utils.getCharCountInPinyinDb(
    PinyinDb_Min_10 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
  [CharDb_Level_Option["至少出现50次"]]: utils.getCharCountInPinyinDb(
    PinyinDb_Min_50 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
  [CharDb_Level_Option["至少出现100次"]]: utils.getCharCountInPinyinDb(
    PinyinDb_Min_100 as unknown as CommonType.DB_Pinyin_Of_Char
  ),
};

export const CharDb_Level_Show: Record<Type.CharDbLevel, string> = {
  [CharDb_Level_Option["至少出现1次"]]: `至少被使用过1次-共${
    CharDb_Char_Item_Count[CharDb_Level_Option["至少出现1次"]]
  }个候选字`,
  [CharDb_Level_Option["至少出现5次"]]: `至少被使用过5次-共${
    CharDb_Char_Item_Count[CharDb_Level_Option["至少出现5次"]]
  }个候选字`,
  [CharDb_Level_Option["至少出现10次"]]: `至少被使用过10次-共${
    CharDb_Char_Item_Count[CharDb_Level_Option["至少出现10次"]]
  }个候选字`,
  [CharDb_Level_Option["至少出现50次"]]: `至少被使用过50次-共${
    CharDb_Char_Item_Count[CharDb_Level_Option["至少出现50次"]]
  }个候选字`,
  [CharDb_Level_Option["至少出现100次"]]: `至少被使用过100次-共${
    CharDb_Char_Item_Count[CharDb_Level_Option["至少出现100次"]]
  }个候选字`,
};

/**
 * 最大展示姓名数
 */
export const Max_Display_Item = 1000;
