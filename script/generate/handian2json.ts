import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";

const Tool = {
  /**
   * 获取音标对应的音调(只会有一个韵母带音调, 且带音调的字母对应音调一定高于1. 所以可以转换为求最大值问题)
   * 轻声视为1声
   * @param input
   */
  parse音标音调(input: string): Type.Type_音调 {
    let max音调: Type.Type_音调 = 1;
    for (let char of input) {
      // 没有取到韵母/韵母为轻声, 相当于音调为1
      let 当前音调 = Const.音调_Map[char] || 1;
      if (当前音调 >= max音调) {
        max音调 = 当前音调;
      }
    }
    return max音调;
  },
  /**
   * 移除音标中的音调
   * @param voice
   */
  remove音调(voice: string) {
    let newVoice: string[] = [];
    for (let char of voice) {
      // @ts-ignore
      let newChar = (Const.音标_To_原字母[char] as string) || char;
      newVoice.push(newChar);
    }
    return newVoice.join("");
  },
  /**
   * 解析音韵配置
   * @param voice
   */
  parse音韵(voice: string) {
    let pinyin_without_tone = "";
    let vowels_type = "";

    // 解析无音调注音
    let newVoice: string[] = [];
    for (let char of voice) {
      // @ts-ignore
      let newChar = (Const.音标_To_原字母[char] as string) || char;
      newVoice.push(newChar);
    }
    pinyin_without_tone = newVoice.join("");
  },
  /**
   * 获取姓名用字数据库
   */
  getNameCharDb() {
    const content = fs.readFileSync(Const.CharDb_人名字典_Uri).toString();
    const CharDB_All: Type.CharDB = JSON.parse(content);
    const CharDB_Min_Map: Record<number, Type.CharDB> = {};
    CharDB_Min_Map[1] = CharDB_All;
    CharDB_Min_Map[2] = {};
    CharDB_Min_Map[3] = {};
    CharDB_Min_Map[4] = {};
    CharDB_Min_Map[5] = {};
    CharDB_Min_Map[10] = {};
    CharDB_Min_Map[20] = {};
    CharDB_Min_Map[50] = {};
    CharDB_Min_Map[100] = {};

    for (let key of Object.keys(CharDB_All)) {
      let item = CharDB_All[key];

      if (item.count >= 1) {
        CharDB_Min_Map[1][key] = item;
      }
      if (item.count >= 2) {
        CharDB_Min_Map[2][key] = item;
      }
      if (item.count >= 3) {
        CharDB_Min_Map[3][key] = item;
      }
      if (item.count >= 4) {
        CharDB_Min_Map[4][key] = item;
      }
      if (item.count >= 5) {
        CharDB_Min_Map[5][key] = item;
      }
      if (item.count >= 10) {
        CharDB_Min_Map[10][key] = item;
      }
      if (item.count >= 20) {
        CharDB_Min_Map[20][key] = item;
      }
      if (item.count >= 50) {
        CharDB_Min_Map[50][key] = item;
      }
      if (item.count >= 100) {
        CharDB_Min_Map[100][key] = item;
      }
    }
    return CharDB_Min_Map;
  },
  charPinyinDb2PinyinCharDb(charPinyinDb: Type.CharPinyinDB) {
    let pinyinCharDb: Type.Pinyin_Db = {};
    let pinyinWithToneCharDb: Record<string, Type.Pinyin_of_Char> = {};

    // 先按音调对字符进行汇总
    for (let char of Object.keys(charPinyinDb)) {
      let charPinyin = charPinyinDb[char];
      if (pinyinWithToneCharDb[charPinyin.pinyin] === undefined) {
        pinyinWithToneCharDb[charPinyin.pinyin] = {
          pinyin: charPinyin.pinyin,
          pinyin_without_tone: charPinyin.pinyin_without_tone,
          tone: charPinyin.tone,
          char: charPinyin.char,
          char_list: [charPinyin],
        };
      } else {
        pinyinWithToneCharDb[charPinyin.pinyin].char_list.push(charPinyin);
      }
    }
    // 然后再创建音调数据库
    for (let pinyin of Object.keys(pinyinWithToneCharDb)) {
      let pinyinItem = pinyinWithToneCharDb[pinyin];
      // 对pinyinItem进行规整
      // 按字符频率进行排序, 出现次数最多的放最前面
      pinyinItem.char_list.sort((a, b) => {
        return b.count - a.count;
      });
      // 按字符频率进行排序, 以出现次数最多的字作为该声调的代表字
      pinyinItem.char = pinyinItem.char_list[0].char;

      if (pinyinCharDb[pinyinItem.pinyin_without_tone] === undefined) {
        pinyinCharDb[pinyinItem.pinyin_without_tone] = {
          pinyin_without_tone: pinyinItem.pinyin_without_tone,
          option_list: [pinyinItem],
        };
      } else {
        pinyinCharDb[pinyinItem.pinyin_without_tone].option_list.push(
          pinyinItem
        );
        // 按1/2/3/4声对音调顺序进行排序
        pinyinCharDb[pinyinItem.pinyin_without_tone].option_list.sort(
          (a, b) => {
            return a.tone - b.tone;
          }
        );
      }
    }
    return pinyinCharDb;
  },
};

/**
 * 将汉典数据转换为json
 */
async function asyncRunner() {
  const content = fs
    .readFileSync(Const.Raw_Char_Db_汉典原始数据_Uri)
    .toString();
  const lineList = content.split("\n");
  const PinyinList_全部: Type.Char_With_Pinyin[] = [];
  const PinyinDb_不含多音字: Record<string, Type.Char_With_Pinyin> = {};
  const PinyinDb_姓名用字_Min_Map: Record<
    number,
    Record<string, Type.Char_With_Pinyin>
  > = {};
  PinyinDb_姓名用字_Min_Map[1] = {};
  PinyinDb_姓名用字_Min_Map[2] = {};
  PinyinDb_姓名用字_Min_Map[3] = {};
  PinyinDb_姓名用字_Min_Map[4] = {};
  PinyinDb_姓名用字_Min_Map[5] = {};
  PinyinDb_姓名用字_Min_Map[10] = {};
  PinyinDb_姓名用字_Min_Map[20] = {};
  PinyinDb_姓名用字_Min_Map[50] = {};
  PinyinDb_姓名用字_Min_Map[100] = {};

  const CharDB_Min_Map = Tool.getNameCharDb();

  const db2PinyinListMap = new Map<
    Type.CharDB,
    Record<string, Type.Char_With_Pinyin>
  >();
  db2PinyinListMap.set(CharDB_Min_Map[100], PinyinDb_姓名用字_Min_Map[100]);
  db2PinyinListMap.set(CharDB_Min_Map[50], PinyinDb_姓名用字_Min_Map[50]);
  db2PinyinListMap.set(CharDB_Min_Map[20], PinyinDb_姓名用字_Min_Map[20]);
  db2PinyinListMap.set(CharDB_Min_Map[10], PinyinDb_姓名用字_Min_Map[10]);
  db2PinyinListMap.set(CharDB_Min_Map[5], PinyinDb_姓名用字_Min_Map[5]);
  db2PinyinListMap.set(CharDB_Min_Map[4], PinyinDb_姓名用字_Min_Map[4]);
  db2PinyinListMap.set(CharDB_Min_Map[3], PinyinDb_姓名用字_Min_Map[3]);
  db2PinyinListMap.set(CharDB_Min_Map[2], PinyinDb_姓名用字_Min_Map[2]);
  db2PinyinListMap.set(CharDB_Min_Map[1], PinyinDb_姓名用字_Min_Map[1]);

  for (let line of lineList) {
    if (line.startsWith("U+") === false) {
      continue;
    }
    // 将文字进行拆分
    // U+20000: hē  # 𠀀
    let [_, buf1] = line.split("U+");
    let [unicode, buf2] = buf1.split(":");
    let [rawPinyin, buf3] = buf2.trim().split("#");
    rawPinyin = rawPinyin.trim();
    let pinyinList = rawPinyin.split(",");
    let char = String.fromCharCode(parseInt(unicode, 16));

    if (pinyinList.length === 1) {
      const charPinyin = {
        char: char,
        pinyin: pinyinList[0],
        pinyin_without_tone: Tool.remove音调(pinyinList[0]),
        tone: Tool.parse音标音调(pinyinList[0]),
        count: CharDB_Min_Map[1][char]?.count ?? 0,
      };
      PinyinDb_不含多音字[char] = charPinyin;

      // 若相应等级字典中包含该汉字, 则录入拼音列表中
      for (let key of db2PinyinListMap.keys()) {
        if (key?.[char] !== undefined) {
          const item = db2PinyinListMap.get(key) as Record<
            string,
            Type.Char_With_Pinyin
          >;
          item[char] = charPinyin;
        }
      }
    }
    for (const pinyin of pinyinList) {
      const pinyin_without_tone = Tool.remove音调(pinyin);
      const tone = Tool.parse音标音调(pinyin);
      PinyinList_全部.push({
        char,
        pinyin,
        pinyin_without_tone,
        tone,
        count: CharDB_Min_Map[1][char]?.count ?? 0,
      });
    }
  }

  const fileMap = {
    [Const.Raw_Char_Db_汉典_拼音列表_Uri]: PinyinList_全部,
    [Const.Char_Db_total_以字为单位_Uri]: PinyinDb_不含多音字,
    [Const.Char_Db_姓名用字_最少出现1次_Uri]: PinyinDb_姓名用字_Min_Map[1],
    [Const.Char_Db_姓名用字_最少出现2次_Uri]: PinyinDb_姓名用字_Min_Map[2],
    [Const.Char_Db_姓名用字_最少出现3次_Uri]: PinyinDb_姓名用字_Min_Map[3],
    [Const.Char_Db_姓名用字_最少出现4次_Uri]: PinyinDb_姓名用字_Min_Map[4],
    [Const.Char_Db_姓名用字_最少出现5次_Uri]: PinyinDb_姓名用字_Min_Map[5],
    [Const.Char_Db_姓名用字_最少出现10次_Uri]: PinyinDb_姓名用字_Min_Map[10],
    [Const.Char_Db_姓名用字_最少出现20次_Uri]: PinyinDb_姓名用字_Min_Map[20],
    [Const.Char_Db_姓名用字_最少出现50次_Uri]: PinyinDb_姓名用字_Min_Map[50],
    [Const.Char_Db_姓名用字_最少出现100次_Uri]: PinyinDb_姓名用字_Min_Map[100],

    [Const.Pinyin_Db_姓名用字_最少出现1次_Uri]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min_Map[1]
    ),
    [Const.Pinyin_Db_姓名用字_最少出现2次_Uri]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min_Map[2]
    ),
    [Const.Pinyin_Db_姓名用字_最少出现3次_Uri]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min_Map[3]
    ),
    [Const.Pinyin_Db_姓名用字_最少出现4次_Uri]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min_Map[4]
    ),
    [Const.Pinyin_Db_姓名用字_最少出现5次_Uri]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min_Map[5]
    ),
    [Const.Pinyin_Db_姓名用字_最少出现10次_Uri]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min_Map[10]
    ),
    [Const.Pinyin_Db_姓名用字_最少出现20次_Uri]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min_Map[20]
    ),
    [Const.Pinyin_Db_姓名用字_最少出现50次_Uri]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min_Map[50]
    ),
    [Const.Pinyin_Db_姓名用字_最少出现100次_Uri]:
      Tool.charPinyinDb2PinyinCharDb(PinyinDb_姓名用字_Min_Map[100]),
  };

  // 写入文件
  for (let key of Object.keys(fileMap)) {
    let fileUri = key;
    let obj = fileMap[key];
    fs.writeFileSync(fileUri, JSON.stringify(obj, null, 2));
  }
  console.log("字典文件处理完毕");
}

asyncRunner();
