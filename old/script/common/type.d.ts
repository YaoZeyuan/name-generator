import * as Const from "./const";

export type DB_Char_With_Pinyin = Record<string, Char_With_Pinyin>;

export type Char_With_Pinyin = {
  char: "衍" | string;
  pinyin: "yǎn" | string;
  tone: 1 | 2 | 3 | 4;
  pinyin_without_tone: "yan" | string;
  initial_声母: string;
  initial_声母类别_发音方法: Initial_声母类别_发音方法;
  initial_声母类别_发音部位: Initial_声母类别_发音部位;
  vowel_韵母: string;
  vowel_韵母类别: Vowel_韵母类别;
  /**
   * 出现频率
   */
  count: number;
};

export type DB_Pinyin_Of_Char = Record<
  string,
  {
    pinyin_without_tone: string;
    option_list: Pinyin_Of_Char[];
  }
>;

export type Pinyin_Of_Char = {
  /**
   * 音调
   */
  tone: 1 | 2 | 3 | 4;
  /**
   * 声母
   */
  initial_声母: string;
  /**
   * 声母类别_发音方法
   */
  initial_声母类别_发音方法: Initial_声母类别_发音方法;
  /**
   * 声母类别_发音部位
   */
  initial_声母类别_发音部位: Initial_声母类别_发音部位;
  /**
   * 韵母
   */
  vowel_韵母: string;
  /**
   * 韵母分类
   */
  vowel_韵母类别: Vowel_韵母类别;
  /**
   * 带音调拼音
   */
  pinyin: string;
  /**
   * 不带音调拼音
   */
  pinyin_without_tone: string;
  /**
   * 该音调下代表字(选取使用频率最高的汉字)
   */
  char: string;
  /**
   * 同音调字列表
   */
  char_list: Char_With_Pinyin[];
};

export type Type_音调 = 1 | 2 | 3 | 4;
export type Vowel_韵母类别 =
  (typeof Const.Vowel_韵母类别)[keyof typeof Const.Vowel_韵母类别];
export type Initial_声母类别_发音方法 =
  keyof typeof Const.Initial_发音方法_Record;
export type Initial_声母类别_发音部位 =
  keyof typeof Const.Initial_发音部位_Record;

export type Type_Name = {
  姓氏: Char_With_Pinyin[];
  人名_第一个字: Pinyin_Of_Char;
  人名_第二个字: Pinyin_Of_Char;
  /**
   * 示例姓名
   */
  demoStr: string;
  /**
   * 姓名评分
   */
  score: number;
};

export type Char_4_Summary = {
  char: string;
  count: number;
};
export type DB_Char_4_Summary = Record<string, Char_4_Summary>;
