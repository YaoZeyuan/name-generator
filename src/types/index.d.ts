import * as Type from "@/../script/common/type";

export type Type_Char_Option = {
  key: string;
  text: string;
  char_item: Type.Char_With_Pinyin;
};

export type Type_Name = {
  姓氏: string;
  人名_第一个字: Type_Char_Option;
  人名_第二个字: Type_Char_Option;
};
