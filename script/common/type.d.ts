export type Char = {
  /**
   * 可选字
   */
  char: string;
  /**
   * 该字出现频率
   */
  count: number;
};

export type CharDB = {
  [char: string]: Char;
};

export type CharPinyinDB = Record<string, Char_With_Pinyin>;

export type Char_With_Pinyin = {
  char: "衍" | string;
  pinyin: "yǎn" | string;
  tone: 1 | 2 | 3 | 4;
  pinyin_without_tone: "yan" | string;
  /**
   * 出现频率
   */
  count: number;
};

export type Pinyin_of_Char = {
  /**
   * 音调
   */
  tone: 1 | 2 | 3 | 4;
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

export type Pinyin_Db = Record<
  string,
  {
    pinyin_without_tone: string;
    option_list: Pinyin_of_Char[];
  }
>;

export type Type_音调 = 1 | 2 | 3 | 4;
