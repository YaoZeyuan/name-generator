import * as Type from "@/../script/common/type";

export type Type_Name = {
  姓氏: Type.Char_With_Pinyin[];
  人名_第一个字: Type.Pinyin_of_Char;
  人名_第二个字: Type.Pinyin_of_Char;
  /**
   * 示例姓名
   */
  demoStr: string;
};
