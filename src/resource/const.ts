import * as Type from "./type";
const Storage_Key = "name_storage";
export const Storage_姓氏_Key = `${Storage_Key}_family_name`;
export const Storage_需过滤字列表_Key = `${Storage_Key}_Need_Fileter_Char`;
export const Storage_必选字_Key = `${Storage_Key}_Must_Have_Char`;
export const Storage_Char_Leve_Key = `${Storage_Key}_Char_Level`;

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
  [Choose_Type_Option.古人云]: "古人云-从古代名&字,均有典故",
  [Choose_Type_Option.他山石]: "他山石-现代人名",
  [Choose_Type_Option.财富论]: "财富论-私募基金",
  [Choose_Type_Option.五道口]: "五道口-从cnki项目中寻找",
  [Choose_Type_Option.五道口_精华版]: "五道口-院士&国家科研基金项目负责人",
  [Choose_Type_Option.登科录]: "登科录-历代进士名",
};

/**
 * 最大展示姓名数
 */
export const Max_Display_Item = 1000;
