import * as CommonType from "@/script/common/type";
import * as Type from "./type";
import * as utils from "@src/utils";
import PinyinDb_Min_1 from "@/database/pinyin_db/zd_name_pinyin_db_min_1.json";
import PinyinDb_Min_5 from "@/database/pinyin_db/zd_name_pinyin_db_min_5.json";
import PinyinDb_Min_10 from "@/database/pinyin_db/zd_name_pinyin_db_min_10.json";
import PinyinDb_Min_50 from "@/database/pinyin_db/zd_name_pinyin_db_min_50.json";
import PinyinDb_Min_100 from "@/database/pinyin_db/zd_name_pinyin_db_min_100.json";
import NameDb_古人云 from "@/database/name_db/古人云_历史人名.json";
import NameDb_他山石 from "@/database/name_db/他山石_已知人名.json";
import NameDb_财富论_精选集 from "@/database/name_db/财富论_私募基金_精选集_出现3_300次.json";
import NameDb_财富论_集思录 from "@/database/name_db/财富论_私募基金_集思录_出现1_2次.json";
import NameDb_五道口_集思录 from "@/database/name_db/五道口_集思录_cnki项目申报人名.json";
import NameDb_五道口_精选集 from "@/database/name_db/五道口_精选集_国家科研基金项目负责人名.json";
import NameDb_登科录 from "@/database/name_db/登科录_历史进士名.json";

const Base_Storage_Key = "name_storage";
export const Storage_Key_Map = {
  姓氏: `${Base_Storage_Key}_family_name`,
  姓氏末字_拼音_choose: `${Base_Storage_Key}_姓氏末字_拼音_choose`,
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
  偏男宝: "偏男宝" as const,
  偏女宝: "偏女宝" as const,
  都看看: "都看看" as const,
};

export const Choose_Type_Option = {
  [`诗云-按发音合并`]: `诗云-按发音合并` as const,
  [`诗云-所有可能`]: `诗云-所有可能` as const,
  [`古人云`]: `古人云` as const,
  [`他山石`]: `他山石` as const,
  [`财富论-精选集`]: `财富论-精选集` as const,
  [`财富论-集思录`]: `财富论-集思录` as const,
  [`五道口-集思录`]: `五道口-集思录` as const,
  [`五道口-精选集`]: `五道口-精选集` as const,
  [`登科录`]: `登科录` as const,
};

export const Choose_Type_Desc: Record<Type.ChooseType, string> = {
  [Choose_Type_Option[
    "诗云-按发音合并"
  ]]: `基于所选诗云字库文字, 生成所有可能组合-按发音合并,相同发音姓名只展示一条`,
  [Choose_Type_Option[
    `诗云-所有可能`
  ]]: `基于所选诗云字库文字, 生成所有可能组合`,
  [Choose_Type_Option.古人云]: `基于古人姓名字号生成的可选名列表, 可以保证每个名字均有出处(具体来源详见得到电子书<古人名字解诂>或百度百科)-共${NameDb_古人云.length}种候选方案`,
  [Choose_Type_Option.他山石]: `基于16万条政府公开数据生成的现代人名可选名列表-共${NameDb_他山石.length}种候选方案`,
  [Choose_Type_Option[
    "财富论-精选集"
  ]]: `基于215557项私募基金名, 以及其所属的21748所公司生成的可选名列表,选择出现频率在3~300之间的二字词-共${NameDb_财富论_精选集.length}种候选方案`,
  [Choose_Type_Option[
    "财富论-集思录"
  ]]: `基于215557项私募基金名, 以及其所属的21748所公司生成的可选名列表,选择出现频率在1~2之间的二字词-共${NameDb_财富论_集思录.length}种候选方案`,
  [Choose_Type_Option[
    "五道口-集思录"
  ]]: `基于cnki项目负责人生成的可选名列表-共${NameDb_五道口_集思录.length}种候选方案`,
  [Choose_Type_Option[
    `五道口-精选集`
  ]]: `基于国家自然科学基金/国家社会科学基金资助项目负责人以及两院院士生成的可选名列表-共${NameDb_五道口_精选集.length}种候选方案`,
  [Choose_Type_Option.登科录]: `基于通过中國歷代人物傳記資料庫CBDB查询得到的中国历史上85210位登科进士的姓名字号生成的可选名列表-共${NameDb_登科录.length}种候选方案`,
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
