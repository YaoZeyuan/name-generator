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

export type Char_Pinyin = {
  char: "衍" | string;
  pinyin: "yǎn" | string;
  tone: 1 | 2 | 3 | 4;
  pinyin_without_tone: "yan" | string;
};

export type Type_音调 = 1 | 2 | 3 | 4;
