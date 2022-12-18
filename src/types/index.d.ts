import { Type_Char_Item } from "@/const/字库";

export type Type_Char_Option = {
    key: string;
    text: string;
    char_item: Type_Char_Item;
};

export type Type_Name = {
    姓氏: string;
    人名_第一个字: Type_Char_Option;
    人名_第二个字: Type_Char_Option;
};