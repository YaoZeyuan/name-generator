import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";

/**
 * 根据上一步汇总得到的可用于起名的字符集
 * 将汉典数据转化为拼音json数据库
 */

const Tool = {
  private: {
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
    parse声母(pinyin_without_tone: string) {
      let initial_声母类别_发音方法: Type.Initial_声母类别_发音方法;
      let initial_声母类别_发音部位: Type.Initial_声母类别_发音部位;
      let initial_声母: string;
      // 先检查是否为十三支
      for (let item of Const.Initial_发音方法_Match_List) {
        if (pinyin_without_tone.includes(item.target)) {
          initial_声母 = item.target;
          initial_声母类别_发音方法 = item.initialType;
          initial_声母类别_发音部位 =
            Const.Initial_2_发音部位_Type[item.target];
          return {
            initial_声母,
            initial_声母类别_发音方法,
            initial_声母类别_发音部位,
          };
        }
      }
      return {
        initial_声母: "未匹配",
        initial_声母类别_发音方法:
          Const.Initial_声母类别_发音方法.塞擦音_清音_不送气,
        initial_声母类别_发音部位: Const.Initial_声母类别_发音部位.双唇音,
      };
    },
    parse韵母(pinyin_without_tone: string) {
      let vowel_韵母: string;
      let vowel_韵母类别: Type.Vowel_韵母类别;
      // 先检查是否为十三支
      for (let item of Const.Vowel_Match_List_十三支) {
        if (pinyin_without_tone === item.target) {
          vowel_韵母 = "-i";
          vowel_韵母类别 = item.vowelType;
          return {
            vowel_韵母,
            vowel_韵母类别,
          };
        }
      }
      for (let item of Const.Vowel_Match_List) {
        if (pinyin_without_tone.includes(item.target)) {
          vowel_韵母 = item.target;
          vowel_韵母类别 = item.vowelType;
          return {
            vowel_韵母,
            vowel_韵母类别,
          };
        }
      }
      return {
        vowel_韵母: "未匹配",
        vowel_韵母类别: Const.Vowel_韵母类别.一麻,
      };
    },
  },

  /**
   * 解析音韵配置
   * @param voice
   */
  parse音韵(voice: string) {
    let tone = Tool.private.parse音标音调(voice);
    // 解析无音调注音
    let newVoice: string[] = [];
    for (let char of voice) {
      // @ts-ignore
      let newChar = (Const.音标_To_原字母[char] as string) || char;
      newVoice.push(newChar);
    }
    let pinyin_without_tone = newVoice.join("");

    let { initial_声母, initial_声母类别_发音方法, initial_声母类别_发音部位 } =
      Tool.private.parse声母(pinyin_without_tone);

    let { vowel_韵母, vowel_韵母类别 } =
      Tool.private.parse韵母(pinyin_without_tone);

    return {
      tone,
      pinyin_without_tone,
      initial_声母,
      initial_声母类别_发音方法,
      initial_声母类别_发音部位,
      vowel_韵母,
      vowel_韵母类别,
    };
  },

  /**
   * 获取姓名用字数据库
   */
  getNameCharDb() {
    // 首先对基金用字和现实姓名用字进行汇总

    const content人名 = fs
      .readFileSync(Const.CharDb_人名用字_字典_Uri)
      .toString();
    const content基金 = fs
      .readFileSync(Const.CharDb_私募基金_用字_字典_Uri)
      .toString();
    const CharDB_人名: Type.DB_Char_4_Summary = JSON.parse(content人名);
    const CharDB_基金: Type.DB_Char_4_Summary = JSON.parse(content基金);
    const Buf_CharDB_All: Type.DB_Char_4_Summary = {};
    const CharDB_All: Type.DB_Char_4_Summary = {};
    for (let key of Object.keys(CharDB_人名)) {
      let item = CharDB_人名[key];
      if (CharDB_基金[key] !== undefined) {
        item.count = item.count + CharDB_基金[key].count;
        delete CharDB_基金[key];
      }
      Buf_CharDB_All[key] = item;
    }
    for (let key of Object.keys(CharDB_基金)) {
      let item = CharDB_基金[key];
      Buf_CharDB_All[key] = item;
    }
    let summaryList = Object.values(Buf_CharDB_All);
    for (let item of summaryList) {
      CharDB_All[item.char] = item;
    }

    const CharDB_Min_Map: Record<number, Type.DB_Char_4_Summary> = {};
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
      if (item.count >= 3) {
        CharDB_Min_Map[3][key] = item;
      }
      if (item.count >= 5) {
        CharDB_Min_Map[5][key] = item;
      }
      if (item.count >= 10) {
        CharDB_Min_Map[10][key] = item;
      }
      if (item.count >= 50) {
        CharDB_Min_Map[20][key] = item;
      }
      if (item.count >= 100) {
        CharDB_Min_Map[100][key] = item;
      }
    }
    return CharDB_Min_Map;
  },
  charPinyinDb2PinyinCharDb(charPinyinDb: Type.DB_Char_With_Pinyin) {
    let pinyinCharDb: Type.DB_Pinyin_Of_Char = {};
    let pinyinWithToneCharDb: Record<string, Type.Pinyin_Of_Char> = {};

    // 先按音调对字符进行汇总
    for (let char of Object.keys(charPinyinDb)) {
      let charPinyin = charPinyinDb[char];
      if (pinyinWithToneCharDb[charPinyin.pinyin] === undefined) {
        pinyinWithToneCharDb[charPinyin.pinyin] = {
          ...charPinyin,
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
  const PinyinDb_姓名用字_Min: Record<
    number,
    Record<string, Type.Char_With_Pinyin>
  > = {};
  PinyinDb_姓名用字_Min[1] = {};
  PinyinDb_姓名用字_Min[3] = {};
  PinyinDb_姓名用字_Min[5] = {};
  PinyinDb_姓名用字_Min[10] = {};
  PinyinDb_姓名用字_Min[50] = {};
  PinyinDb_姓名用字_Min[100] = {};

  const CharDB_Min_Map = Tool.getNameCharDb();

  const db2PinyinListMap = new Map<
    Type.DB_Char_4_Summary,
    Record<string, Type.Char_With_Pinyin>
  >();
  db2PinyinListMap.set(CharDB_Min_Map[100], PinyinDb_姓名用字_Min[100]);
  db2PinyinListMap.set(CharDB_Min_Map[50], PinyinDb_姓名用字_Min[50]);
  db2PinyinListMap.set(CharDB_Min_Map[10], PinyinDb_姓名用字_Min[10]);
  db2PinyinListMap.set(CharDB_Min_Map[5], PinyinDb_姓名用字_Min[5]);
  db2PinyinListMap.set(CharDB_Min_Map[3], PinyinDb_姓名用字_Min[3]);
  db2PinyinListMap.set(CharDB_Min_Map[1], PinyinDb_姓名用字_Min[1]);

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
      let {
        tone,
        pinyin_without_tone,
        initial_声母,
        initial_声母类别_发音方法,
        initial_声母类别_发音部位,
        vowel_韵母,
        vowel_韵母类别,
      } = Tool.parse音韵(pinyinList[0]);

      const charPinyin: Type.Char_With_Pinyin = {
        char: char,
        pinyin: pinyinList[0],
        tone,
        pinyin_without_tone,
        initial_声母,
        initial_声母类别_发音方法,
        initial_声母类别_发音部位,
        vowel_韵母,
        vowel_韵母类别,
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
      let {
        tone,
        pinyin_without_tone,
        initial_声母,
        initial_声母类别_发音方法,
        initial_声母类别_发音部位,
        vowel_韵母,
        vowel_韵母类别,
      } = Tool.parse音韵(pinyin);
      PinyinList_全部.push({
        char,
        pinyin,
        tone,
        pinyin_without_tone,
        initial_声母,
        initial_声母类别_发音方法,
        initial_声母类别_发音部位,
        vowel_韵母,
        vowel_韵母类别,
        count: CharDB_Min_Map[1][char]?.count ?? 0,
      });
    }
  }

  let legalCharList = [
    ...new Set(PinyinList_全部.map((item) => item.char)).values(),
  ];
  legalCharList.sort();
  let legalCharDb: Record<string, true> = {};
  for (let char of legalCharList) {
    legalCharDb[char] = true;
  }

  const fileMap = {
    [Const.Raw_Char_Db_汉典_拼音列表_Uri]: PinyinList_全部,
    [Const.Char_Db_汉典_全部汉字_Uri]: legalCharDb,
    [Const.Char_Db_total_以字为单位_Uri]: PinyinDb_不含多音字,
    [Const.Char_Db_姓名用字_出现_Uri["1次"]]: PinyinDb_姓名用字_Min[1],
    [Const.Char_Db_姓名用字_出现_Uri["3次"]]: PinyinDb_姓名用字_Min[3],
    [Const.Char_Db_姓名用字_出现_Uri["5次"]]: PinyinDb_姓名用字_Min[5],
    [Const.Char_Db_姓名用字_出现_Uri["10次"]]: PinyinDb_姓名用字_Min[10],
    [Const.Char_Db_姓名用字_出现_Uri["50次"]]: PinyinDb_姓名用字_Min[50],
    [Const.Char_Db_姓名用字_出现_Uri["100次"]]: PinyinDb_姓名用字_Min[100],

    [Const.Pinyin_Db_姓名用字_出现_Uri["1次"]]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min[1]
    ),
    [Const.Pinyin_Db_姓名用字_出现_Uri["3次"]]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min[3]
    ),
    [Const.Pinyin_Db_姓名用字_出现_Uri["5次"]]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min[5]
    ),
    [Const.Pinyin_Db_姓名用字_出现_Uri["10次"]]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min[10]
    ),
    [Const.Pinyin_Db_姓名用字_出现_Uri["50次"]]: Tool.charPinyinDb2PinyinCharDb(
      PinyinDb_姓名用字_Min[50]
    ),
    [Const.Pinyin_Db_姓名用字_出现_Uri["100次"]]:
      Tool.charPinyinDb2PinyinCharDb(PinyinDb_姓名用字_Min[100]),
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
