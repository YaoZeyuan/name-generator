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
