import * as path from "path";
import * as Type from "./type";

import CharDb_主动规定发音的多音字列表 from "@/database/char_db/主动规定发音的多音字列表.json";
import Char_List_不含多音字 from "@/database/char_db/zd_without_muilt_tone_only_char.json";
import RawPinyinList from "@/database/char_db/raw_pinyin_list.json";

let charDb_不含多音字: Type.DB_Char_With_Pinyin = {};
let set不含多音字 = new Set(Char_List_不含多音字);
for (let pinyin of RawPinyinList) {
  if (set不含多音字.has(pinyin.char)) {
    // @ts-ignore
    charDb_不含多音字[pinyin.char] = pinyin;
  }
}
// 将特定多音字按照起名中实际使用的发音视为单音字, 补充到CharDB字典中
for (let pinyinConfig of CharDb_主动规定发音的多音字列表) {
  // @ts-ignore
  charDb_不含多音字[pinyinConfig.char] = pinyinConfig;
}

export const CharDb_不含多音字 = charDb_不含多音字;
