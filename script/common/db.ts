import * as path from "path";
import * as Type from "./type";

import Only_Char_Min_1 from "@/database/char_db/min_1_olny_char.json";
import Only_Char_Min_5 from "@/database/char_db/min_5_olny_char.json";
import Only_Char_Min_10 from "@/database/char_db/min_10_olny_char.json";
import Only_Char_Min_50 from "@/database/char_db/min_50_olny_char.json";
import Only_Char_Min_100 from "@/database/char_db/min_100_olny_char.json";

// import PinyinDb_Min_1 from "@/database/pinyin_db/zd_name_pinyin_db_min_1.json";
// import PinyinDb_Min_5 from "@/database/pinyin_db/zd_name_pinyin_db_min_5.json";
// import PinyinDb_Min_10 from "@/database/pinyin_db/zd_name_pinyin_db_min_10.json";
// import PinyinDb_Min_50 from "@/database/pinyin_db/zd_name_pinyin_db_min_50.json";
// import PinyinDb_Min_100 from "@/database/pinyin_db/zd_name_pinyin_db_min_100.json";

import CharDb_主动规定发音的多音字列表 from "@/database/char_db/主动规定发音的多音字列表.json";
import Char_List_不含多音字 from "@/database/char_db/zd_without_muilt_tone_only_char.json";
import RawPinyinList from "@/database/char_db/raw_pinyin_list.json";

// 基于单音字列表, 构建单音字-拼音数据库

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

// 基于姓名出现频率列表, 构建姓名频率-拼音数据库

function charSet2PinyinDb(charSet: Set<string>): Type.DB_Pinyin_Of_Char {
  let optionPinyinDb: Record<string, Type.Pinyin_Of_Char> = {};
  for (let pinyin of RawPinyinList) {
    if (charSet.has(pinyin.char)) {
      if (optionPinyinDb[pinyin.pinyin]) {
        // @ts-ignore
        optionPinyinDb[pinyin.pinyin].char_list.push(pinyin);
      } else {
        optionPinyinDb[pinyin.pinyin] = {
          ...pinyin,
          // @ts-ignore
          char_list: [pinyin],
        };
      }
    }
  }

  let pinyinDb: Type.DB_Pinyin_Of_Char = {};
  for (let item of Object.values(optionPinyinDb)) {
    if (pinyinDb[item.pinyin_without_tone]) {
      pinyinDb[item.pinyin_without_tone].option_list.push(item);
    } else {
      pinyinDb[item.pinyin_without_tone] = {
        option_list: [item],
        pinyin_without_tone: item.pinyin_without_tone,
      };
    }
  }

  for (let pinyin_without_tone of Object.keys(pinyinDb)) {
    // 对拼音选项按声调升序进行排序
    pinyinDb[pinyin_without_tone].option_list.sort((a, b) => {
      return a.tone - b.tone;
    });
    // 对拼音选项中的候选字按频率降序进行排序
    pinyinDb[pinyin_without_tone].option_list.map((item) => {
      item.char_list.sort((a, b) => {
        return b.count - a.count;
      });
      // 代表字设为出现频率最高的字
      item.char = item.char_list[0].char;
    });
  }

  return pinyinDb;
}

export const PinyinDb_Min_1 = charSet2PinyinDb(new Set(Only_Char_Min_1));
export const PinyinDb_Min_5 = charSet2PinyinDb(new Set(Only_Char_Min_5));
export const PinyinDb_Min_10 = charSet2PinyinDb(new Set(Only_Char_Min_10));
export const PinyinDb_Min_50 = charSet2PinyinDb(new Set(Only_Char_Min_50));
export const PinyinDb_Min_100 = charSet2PinyinDb(new Set(Only_Char_Min_100));
