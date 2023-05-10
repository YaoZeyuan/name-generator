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
  [Choose_Type_Option.古人云]: "古人云-从古代名&字中寻找",
  [Choose_Type_Option.他山石]: "他山石-从已有人名中寻找",
  [Choose_Type_Option.财富论]: "财富论-从私募基金名中寻找",
  [Choose_Type_Option.五道口]: "五道口-从cnki项目中寻找",
  [Choose_Type_Option.五道口_精华版]: "五道口_精华版-国家科研基金",
  [Choose_Type_Option.登科录]: "登科录-历代进士名",
};

/**
 * 最大展示姓名数
 */
export const Max_Display_Item = 1000;
