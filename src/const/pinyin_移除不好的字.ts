import { Const_Level_0, Const_Level_1, Const_Level_2 } from "./zi_通用规范字表"

export type Type_Pinyin = {
  pinyin_without_tone: string
  option_list: {
    /**
     * 带音调拼音
     */
    "pinyin": string,
    /**
     * 音调
     */
    "tone": 0 | 1 | 2 | 3 | 4,
    /**
     * 该音调下代表字
     */
    "char": string,
    /**
     * 同音调字列表
     */
    "char_list": string[],
    /**
     * 不带音调拼音
     */
    "pinyin_without_tone": string
    "is_need_check"?: boolean,
  }[]
}

let total_result: {
  [key: string]: Type_Pinyin
} = {
  "a": {
    "pinyin_without_tone": "a",
    "option_list": [
      {
        "pinyin": "ā",
        "tone": 1,
        "char": "阿",
        "char_list": [
          "阿"
        ],
        "pinyin_without_tone": "a"
      }
    ]
  },
  "ai": {
    "pinyin_without_tone": "ai",
    "option_list": [
      {
        "pinyin": "āi",
        "tone": 1,
        "char": "埃",
        "char_list": [
          "哎",
          "哀",
          "唉",
          "埃",
          "挨",
          "锿"
        ],
        "pinyin_without_tone": "ai"
      },
      {
        "pinyin": "ǎi",
        "tone": 3,
        "char": "蔼",
        "char_list": [
          "矮",
          "蔼"
        ],
        "pinyin_without_tone": "ai"
      },
      {
        "pinyin": "ài",
        "tone": 4,
        "char": "艾",
        "char_list": [
          "艾",
          "爱",
          "隘",
          "碍",
          "瑷"
        ],
        "pinyin_without_tone": "ai"
      },
    ]
  },
  "an": {
    "pinyin_without_tone": "an",
    "option_list": [
      {
        "pinyin": "ān",
        "tone": 1,
        "char": "安",
        "char_list": [
          "安",
          "氨",
          "庵",
          "庵",
          "鞍"
        ],
        "pinyin_without_tone": "an"
      },
      {
        "pinyin": "àn",
        "tone": 4,
        "char": "岸",
        "char_list": [
          "犴",
          "岸",
          "按",
          "案",
          "暗",
          "黯"
        ],
        "pinyin_without_tone": "an"
      },
    ]
  },
  "ang": {
    "pinyin_without_tone": "ang",
    "option_list": [
      {
        "pinyin": "áng",
        "tone": 2,
        "char": "昂",
        "char_list": [
          "卬",
          "昂"
        ],
        "pinyin_without_tone": "ang"
      },
    ]
  },
  "ao": {
    "pinyin_without_tone": "ao",
    "option_list": [
      {
        "pinyin": "ào",
        "tone": 4,
        "char": "傲",
        "char_list": [
          "岙",
          "傲",
          "奥",
          "懊",
          "澳"
        ],
        "pinyin_without_tone": "ao"
      },
      {
        "pinyin": "āo",
        "tone": 1,
        "char": "凹",
        "char_list": [
          "凹"
        ],
        "pinyin_without_tone": "ao"
      },
      {
        "pinyin": "áo",
        "tone": 2,
        "char": "熬",
        "char_list": [
          "嶅",
          "廒",
          "熬"
        ],
        "pinyin_without_tone": "ao"
      },

    ]
  },
  "ba": {
    "pinyin_without_tone": "ba",
    "option_list": [
      {
        "pinyin": "bā",
        "tone": 1,
        "char": "巴",
        "char_list": [
          "八",
          "巴",
          "叭",
          "扒",
          "朳",
          "岜",
          "芭",
          "疤",
          "捌",
          "羓",
          "鲃"
        ],
        "pinyin_without_tone": "ba"
      },
      {
        "pinyin": "bá",
        "tone": 2,
        "char": "拔",
        "char_list": [
          "妭",
          "拔",
          "胈",
          "菝",
          "跋"
        ],
        "pinyin_without_tone": "ba"
      },
      {
        "pinyin": "bǎ",
        "tone": 3,
        "char": "靶",
        "char_list": [
          "把",
          "靶"
        ],
        "pinyin_without_tone": "ba"
      },
      {
        "pinyin": "bà",
        "tone": 4,
        "char": "霸",
        "char_list": [
          "坝",
          "爸",
          "罢",
          "耙",
          "鲌",
          "霸"
        ],
        "pinyin_without_tone": "ba"
      },
    ]
  },
  "bai": {
    "pinyin_without_tone": "bai",
    "option_list": [
      {
        "pinyin": "bái",
        "tone": 2,
        "char": "白",
        "char_list": [
          "白"
        ],
        "pinyin_without_tone": "bai"
      },
      {
        "pinyin": "bǎi",
        "tone": 3,
        "char": "百",
        "char_list": [
          "百",
          "柏",
          "摆"
        ],
        "pinyin_without_tone": "bai"
      },
      {
        "pinyin": "bài",
        "tone": 4,
        "char": "拜",
        "char_list": [
          "败",
          "拜"
        ],
        "pinyin_without_tone": "bai"
      },
      {
        "pinyin": "bāi",
        "tone": 1,
        "char": "掰",
        "char_list": [
          "掰"
        ],
        "pinyin_without_tone": "bai"
      }
    ]
  },
  "ban": {
    "pinyin_without_tone": "ban",
    "option_list": [
      {
        "pinyin": "bān",
        "tone": 1,
        "char": "般",
        "char_list": [
          "扳",
          "攽",
          "班",
          "般",
          "颁",
          "斑",
          "搬"
        ],
        "pinyin_without_tone": "ban"
      },
      {
        "pinyin": "bǎn",
        "tone": 3,
        "char": "板",
        "char_list": [
          "板",
          "版"
        ],
        "pinyin_without_tone": "ban"
      },
      {
        "pinyin": "bàn",
        "tone": 4,
        "char": "半",
        "char_list": [
          "办",
          "半",
          "伴",
          "扮",
          "拌",
          "绊",
          "湴",
          "靽",
          "瓣"
        ],
        "pinyin_without_tone": "ban"
      },
    ]
  },
  "bang": {
    "pinyin_without_tone": "bang",
    "option_list": [
      {
        "pinyin": "bāng",
        "tone": 1,
        "char": "帮",
        "char_list": [
          "邦",
          "帮",
          "梆"
        ],
        "pinyin_without_tone": "bang"
      },
      {
        "pinyin": "bǎng",
        "tone": 3,
        "char": "榜",
        "char_list": [
          "绑",
          "榜",
          "膀"
        ],
        "pinyin_without_tone": "bang"
      },
      {
        "pinyin": "bàng",
        "tone": 4,
        "char": "棒",
        "char_list": [
          "玤",
          "蚌",
          "傍",
          "棒",
          "棓",
          "谤",
          "搒",
          "磅",
          "镑"
        ],
        "pinyin_without_tone": "bang"
      },
    ]
  },
  "bao": {
    "pinyin_without_tone": "bao",
    "option_list": [
      {
        "pinyin": "bāo",
        "tone": 1,
        "char": "包",
        "char_list": [
          "包",
          "苞",
          "枹",
          "胞",
          "褒"
        ],
        "pinyin_without_tone": "bao"
      },
      {
        "pinyin": "báo",
        "tone": 2,
        "char": "雹",
        "char_list": [
          "雹",
          "薄"
        ],
        "pinyin_without_tone": "bao"
      },
      {
        "pinyin": "bǎo",
        "tone": 3,
        "char": "宝",
        "char_list": [
          "宝",
          "饱",
          "保",
          "堡"
        ],
        "pinyin_without_tone": "bao"
      },
      {
        "pinyin": "bào",
        "tone": 4,
        "char": "报",
        "char_list": [
          "报",
          "抱",
          "豹",
          "鲍",
          "暴",
          "爆"
        ],
        "pinyin_without_tone": "bao"
      }
    ]
  },
  "bei": {
    "pinyin_without_tone": "bei",
    "option_list": [
      {
        "pinyin": "bēi",
        "tone": 1,
        "char": "杯",
        "char_list": [
          "卑",
          "杯",
          "悲",
          "椑",
          "碑",
          "鹎",
          "背"
        ],
        "pinyin_without_tone": "bei"
      },
      {
        "pinyin": "běi",
        "tone": 3,
        "char": "北",
        "char_list": [
          "北",
          "锫"
        ],
        "pinyin_without_tone": "bei"
      },
      {
        "pinyin": "bèi",
        "tone": 4,
        "char": "备",
        "char_list": [
          "贝",
          "狈",
          "备",
          "倍",
          "悖",
          "被",
          "惫",
          "琲",
          "辈",
          "鞁"
        ],
        "pinyin_without_tone": "bei"
      },
    ]
  },
  "ben": {
    "pinyin_without_tone": "ben",
    "option_list": [
      {
        "pinyin": "bēn",
        "tone": 1,
        "char": "奔",
        "char_list": [
          "奔",
          "犇"
        ],
        "pinyin_without_tone": "ben"
      },
      {
        "pinyin": "běn",
        "tone": 3,
        "char": "本",
        "char_list": [
          "本"
        ],
        "pinyin_without_tone": "ben"
      },
      {
        "pinyin": "bèn",
        "tone": 4,
        "char": "笨",
        "char_list": [
          "坋",
          "倴",
          "笨"
        ],
        "pinyin_without_tone": "ben"
      }
    ]
  },
  "beng": {
    "pinyin_without_tone": "beng",
    "option_list": [
      {
        "pinyin": "bèng",
        "tone": 4,
        "char": "蹦",
        "char_list": [
          "泵",
          "蹦"
        ],
        "pinyin_without_tone": "beng"
      },
      {
        "pinyin": "bēng",
        "tone": 1,
        "char": "崩",
        "char_list": [
          "祊",
          "崩",
          "绷"
        ],
        "pinyin_without_tone": "beng"
      },
      {
        "pinyin": "běng",
        "tone": 3,
        "char": "绷",
        "char_list": [
          "绷"
        ],
        "pinyin_without_tone": "beng"
      }
    ]
  },
  "bi": {
    "pinyin_without_tone": "bi",
    "option_list": [
      {
        "pinyin": "bī",
        "tone": 1,
        "char": "逼",
        "char_list": [
          "逼",
          "鲾"
        ],
        "pinyin_without_tone": "bi"
      },
      {
        "pinyin": "bí",
        "tone": 2,
        "char": "鼻",
        "char_list": [
          "鼻"
        ],
        "pinyin_without_tone": "bi"
      },
      {
        "pinyin": "bǐ",
        "tone": 3,
        "char": "笔",
        "char_list": [
          "匕",
          "比",
          "沘",
          "彼",
          "笔",
          "舭",
          "鄙"
        ],
        "pinyin_without_tone": "bi"
      },
      {
        "pinyin": "bì",
        "tone": 4,
        "char": "碧",
        "char_list": [
          "币",
          "必",
          "毕",
          "闭",
          "佖",
          "坒",
          "庇",
          "诐",
          "邲",
          "苾",
          "珌",
          "毙",
          "狴",
          "庳",
          "萆",
          "皕",
          "痹",
          "弊",
          "碧",
          "蔽",
          "壁",
          "觱",
          "避",
          "臂",
          "璧"
        ],
        "pinyin_without_tone": "bi"
      },
    ]
  },
  "bian": {
    "pinyin_without_tone": "bian",
    "option_list": [
      {
        "pinyin": "biān",
        "tone": 1,
        "char": "边",
        "char_list": [
          "边",
          "编",
          "蝙",
          "鞭"
        ],
        "pinyin_without_tone": "bian"
      },
      {
        "pinyin": "biǎn",
        "tone": 3,
        "char": "扁",
        "char_list": [
          "贬",
          "扁",
          "匾",
          "萹",
          "碥"
        ],
        "pinyin_without_tone": "bian"
      },
      {
        "pinyin": "biàn",
        "tone": 4,
        "char": "变",
        "char_list": [
          "变",
          "便",
          "昪",
          "遍",
          "辨",
          "辩",
          "辫",
          "法"
        ],
        "pinyin_without_tone": "bian"
      }
    ]
  },
  "biao": {
    "pinyin_without_tone": "biao",
    "option_list": [
      {
        "pinyin": "biāo",
        "tone": 1,
        "char": "标",
        "char_list": [
          "标",
          "彪",
          "脿",
          "幖",
          "熛",
          "瘭",
          "儦",
          "瀌",
          "藨"
        ],
        "pinyin_without_tone": "biao"
      },
      {
        "pinyin": "biǎo",
        "tone": 3,
        "char": "表",
        "char_list": [
          "表"
        ],
        "pinyin_without_tone": "biao"
      },

    ]
  },
  "bie": {
    "pinyin_without_tone": "bie",
    "option_list": [
      {
        "pinyin": "bié",
        "tone": 2,
        "char": "别",
        "char_list": [
          "别",
          "咇"
        ],
        "pinyin_without_tone": "bie"
      },
    ]
  },
  "bin": {
    "pinyin_without_tone": "bin",
    "option_list": [
      {
        "pinyin": "bīn",
        "tone": 1,
        "char": "滨",
        "char_list": [
          "邠",
          "宾",
          "彬",
          "斌",
          "滨",
          "缤",
          "濒"
        ],
        "pinyin_without_tone": "bin"
      },
      {
        "pinyin": "bìn",
        "tone": 4,
        "char": "鬓",
        "char_list": [
          "鬓"
        ],
        "pinyin_without_tone": "bin"
      }
    ]
  },
  "bing": {
    "pinyin_without_tone": "bing",
    "option_list": [
      {
        "pinyin": "bīng",
        "tone": 1,
        "char": "冰",
        "char_list": [
          "冰",
          "兵"
        ],
        "pinyin_without_tone": "bing"
      },
      {
        "pinyin": "bǐng",
        "tone": 3,
        "char": "柄",
        "char_list": [
          "丙",
          "秉",
          "昺",
          "柄",
          "饼",
          "蛃",
          "禀"
        ],
        "pinyin_without_tone": "bing"
      },
      {
        "pinyin": "bìng",
        "tone": 4,
        "char": "并",
        "char_list": [
          "并",
          "病"
        ],
        "pinyin_without_tone": "bing"
      }
    ]
  },
  "bo": {
    "pinyin_without_tone": "bo",
    "option_list": [
      {
        "pinyin": "bo",
        "tone": 0,
        "char": "卜",
        "char_list": [
          "卜"
        ],
        "pinyin_without_tone": "bo"
      },
      {
        "pinyin": "bō",
        "tone": 1,
        "char": "波",
        "char_list": [
          "拨",
          "波",
          "玻",
          "剥",
          "哱",
          "砵",
          "菠",
          "嶓",
          "播"
        ],
        "pinyin_without_tone": "bo"
      },
      {
        "pinyin": "bó",
        "tone": 2,
        "char": "博",
        "char_list": [
          "伯",
          "驳",
          "勃",
          "浡",
          "脖",
          "舶",
          "博",
          "渤",
          "搏",
          "膊",
          "踣",
          "欂"
        ],
        "pinyin_without_tone": "bo"
      },
      {
        "pinyin": "bǒ",
        "tone": 3,
        "char": "簸",
        "char_list": [
          "跛",
          "簸"
        ],
        "pinyin_without_tone": "bo"
      },
    ]
  },
  "bu": {
    "pinyin_without_tone": "bu",
    "option_list": [
      {
        "pinyin": "bǔ",
        "tone": 3,
        "char": "补",
        "char_list": [
          "补",
          "哺",
          "捕"
        ],
        "pinyin_without_tone": "bu"
      },
      {
        "pinyin": "bù",
        "tone": 4,
        "char": "布",
        "char_list": [
          "不",
          "布",
          "步",
          "怖",
          "埗",
          "部",
          "埠",
          "蔀",
          "簿"
        ],
        "pinyin_without_tone": "bu"
      },
      {
        "pinyin": "bǔ",
        "tone": 3,
        "char": "𬷕",
        "char_list": [
          "𬷕"
        ],
        "pinyin_without_tone": "bu"
      },
    ]
  },
  "cai": {
    "pinyin_without_tone": "cai",
    "option_list": [
      {
        "pinyin": "cāi",
        "tone": 1,
        "char": "猜",
        "char_list": [
          "偲",
          "猜"
        ],
        "pinyin_without_tone": "cai"
      },
      {
        "pinyin": "cái",
        "tone": 2,
        "char": "材",
        "char_list": [
          "才",
          "材",
          "财",
          "裁"
        ],
        "pinyin_without_tone": "cai"
      },
      {
        "pinyin": "cǎi",
        "tone": 3,
        "char": "彩",
        "char_list": [
          "采",
          "彩",
          "睬",
          "踩"
        ],
        "pinyin_without_tone": "cai"
      },
      {
        "pinyin": "cài",
        "tone": 4,
        "char": "菜",
        "char_list": [
          "采",
          "菜",
          "蔡"
        ],
        "pinyin_without_tone": "cai"
      }
    ]
  },
  "can": {
    "pinyin_without_tone": "can",
    "option_list": [
      {
        "pinyin": "cān",
        "tone": 1,
        "char": "参",
        "char_list": [
          "参",
          "餐"
        ],
        "pinyin_without_tone": "can"
      },
      {
        "pinyin": "cán",
        "tone": 2,
        "char": "惭",
        "char_list": [
          "残",
          "蚕",
          "惭"
        ],
        "pinyin_without_tone": "can"
      },
      {
        "pinyin": "càn",
        "tone": 4,
        "char": "灿",
        "char_list": [
          "灿",
          "掺"
        ],
        "pinyin_without_tone": "can"
      },

    ]
  },
  "cang": {
    "pinyin_without_tone": "cang",
    "option_list": [
      {
        "pinyin": "cāng",
        "tone": 1,
        "char": "苍",
        "char_list": [
          "仓",
          "沧",
          "苍",
          "鸧",
          "舱"
        ],
        "pinyin_without_tone": "cang"
      },
      {
        "pinyin": "cáng",
        "tone": 2,
        "char": "藏",
        "char_list": [
          "藏"
        ],
        "pinyin_without_tone": "cang"
      }
    ]
  },
  "cao": {
    "pinyin_without_tone": "cao",
    "option_list": [
      {
        "pinyin": "cāo",
        "tone": 1,
        "char": "操",
        "char_list": [
          "操",
          "糙"
        ],
        "pinyin_without_tone": "cao"
      },
      {
        "pinyin": "cáo",
        "tone": 2,
        "char": "槽",
        "char_list": [
          "曹",
          "槽",
          "艚"
        ],
        "pinyin_without_tone": "cao"
      },
      {
        "pinyin": "cǎo",
        "tone": 3,
        "char": "草",
        "char_list": [
          "草"
        ],
        "pinyin_without_tone": "cao"
      }
    ]
  },
  "ce": {
    "pinyin_without_tone": "ce",
    "option_list": [
      {
        "pinyin": "cè",
        "tone": 4,
        "char": "策",
        "char_list": [
          "册",
          "侧",
          "厕",
          "测",
          "策"
        ],
        "pinyin_without_tone": "ce"
      }
    ]
  },
  "ceng": {
    "pinyin_without_tone": "ceng",
    "option_list": [
      {
        "pinyin": "céng",
        "tone": 2,
        "char": "层",
        "char_list": [
          "层",
          "曾",
          "嶒"
        ],
        "pinyin_without_tone": "ceng"
      },

    ]
  },
  "cha": {
    "pinyin_without_tone": "cha",
    "option_list": [

      {
        "pinyin": "chá",
        "tone": 2,
        "char": "察",
        "char_list": [
          "垞",
          "茬",
          "茶",
          "察",
          "檫"
        ],
        "pinyin_without_tone": "cha"
      },
    ]
  },
  "chai": {
    "pinyin_without_tone": "chai",
    "option_list": [
      {
        "pinyin": "chāi",
        "tone": 1,
        "char": "拆",
        "char_list": [
          "拆"
        ],
        "pinyin_without_tone": "chai"
      },
      {
        "pinyin": "chái",
        "tone": 2,
        "char": "柴",
        "char_list": [
          "柴",
          "豺"
        ],
        "pinyin_without_tone": "chai"
      },
    ]
  },
  "chan": {
    "pinyin_without_tone": "chan",
    "option_list": [
      {
        "pinyin": "chān",
        "tone": 1,
        "char": "钻",
        "char_list": [
          "辿",
          "梴",
          "搀",
          "襜",
          "钻"
        ],
        "pinyin_without_tone": "chan"
      },
      {
        "pinyin": "chán",
        "tone": 2,
        "char": "缠",
        "char_list": [
          "禅",
          "馋",
          "缠",
          "蝉",
          "瀍",
          "躔"
        ],
        "pinyin_without_tone": "chan"
      },
      {
        "pinyin": "chǎn",
        "tone": 3,
        "char": "产",
        "char_list": [
          "产",
          "刬",
          "浐",
          "铲",
          "阐",
          "蒇",
          "冁"
        ],
        "pinyin_without_tone": "chan"
      },
    ]
  },
  "chang": {
    "pinyin_without_tone": "chang",
    "option_list": [
      {
        "pinyin": "chāng",
        "tone": 1,
        "char": "昌",
        "char_list": [
          "昌",
          "猖"
        ],
        "pinyin_without_tone": "chang"
      },
      {
        "pinyin": "cháng",
        "tone": 2,
        "char": "常",
        "char_list": [
          "肠",
          "尝",
          "偿",
          "常",
          "鲿"
        ],
        "pinyin_without_tone": "chang"
      },
      {
        "pinyin": "chǎng",
        "tone": 3,
        "char": "场",
        "char_list": [
          "厂",
          "场",
          "敞"
        ],
        "pinyin_without_tone": "chang"
      },
      {
        "pinyin": "chàng",
        "tone": 4,
        "char": "畅",
        "char_list": [
          "玚",
          "畅",
          "倡",
          "鬯",
          "唱"
        ],
        "pinyin_without_tone": "chang"
      },
    ]
  },
  "chao": {
    "pinyin_without_tone": "chao",
    "option_list": [
      {
        "pinyin": "chāo",
        "tone": 1,
        "char": "超",
        "char_list": [
          "抄",
          "弨",
          "怊",
          "钞",
          "超",
          "剿"
        ],
        "pinyin_without_tone": "chao"
      },
      {
        "pinyin": "cháo",
        "tone": 2,
        "char": "潮",
        "char_list": [
          "巢",
          "朝",
          "嘲",
          "潮"
        ],
        "pinyin_without_tone": "chao"
      },
      {
        "pinyin": "chǎo",
        "tone": 3,
        "char": "吵",
        "char_list": [
          "吵",
          "炒"
        ],
        "pinyin_without_tone": "chao"
      }
    ]
  },
  "che": {
    "pinyin_without_tone": "che",
    "option_list": [
      {
        "pinyin": "chē",
        "tone": 1,
        "char": "车",
        "char_list": [
          "车"
        ],
        "pinyin_without_tone": "che"
      },
      {
        "pinyin": "chě",
        "tone": 3,
        "char": "扯",
        "char_list": [
          "扯"
        ],
        "pinyin_without_tone": "che"
      },
      {
        "pinyin": "chè",
        "tone": 4,
        "char": "彻",
        "char_list": [
          "彻",
          "撤",
          "澈"
        ],
        "pinyin_without_tone": "che"
      },
    ]
  },
  "chen": {
    "pinyin_without_tone": "chen",
    "option_list": [
      {
        "pinyin": "chén",
        "tone": 2,
        "char": "晨",
        "char_list": [
          "尘",
          "臣",
          "忱",
          "沉",
          "辰",
          "陈",
          "晨",
          "煁"
        ],
        "pinyin_without_tone": "chen"
      },
      {
        "pinyin": "chèn",
        "tone": 4,
        "char": "衬",
        "char_list": [
          "衬",
          "趁",
          "榇"
        ],
        "pinyin_without_tone": "chen"
      },
      {
        "pinyin": "chēn",
        "tone": 1,
        "char": "𬘭",
        "char_list": [
          "𬘭"
        ],
        "pinyin_without_tone": "chen"
      }
    ]
  },
  "cheng": {
    "pinyin_without_tone": "cheng",
    "option_list": [
      {
        "pinyin": "chēng",
        "tone": 1,
        "char": "称",
        "char_list": [
          "称",
          "偁",
          "牚",
          "撑"
        ],
        "pinyin_without_tone": "cheng"
      },
      {
        "pinyin": "chéng",
        "tone": 2,
        "char": "承",
        "char_list": [
          "成",
          "呈",
          "承",
          "诚",
          "城",
          "宬",
          "乘",
          "铖",
          "惩",
          "程",
          "酲",
          "澄",
          "橙"
        ],
        "pinyin_without_tone": "cheng"
      },
      {
        "pinyin": "chèng",
        "tone": 4,
        "char": "秤",
        "char_list": [
          "秤"
        ],
        "pinyin_without_tone": "cheng"
      },
      {
        "pinyin": "chěng",
        "tone": 3,
        "char": "逞",
        "char_list": [
          "逞",
          "庱"
        ],
        "pinyin_without_tone": "cheng"
      },
    ]
  },
  "chi": {
    "pinyin_without_tone": "chi",
    "option_list": [
      {
        "pinyin": "chī",
        "tone": 1,
        "char": "吃",
        "char_list": [
          "吃",
          "摛",
          "痴"
        ],
        "pinyin_without_tone": "chi"
      },
      {
        "pinyin": "chí",
        "tone": 2,
        "char": "驰",
        "char_list": [
          "弛",
          "池",
          "驰",
          "迟",
          "持",
          "漦"
        ],
        "pinyin_without_tone": "chi"
      },
      {
        "pinyin": "chǐ",
        "tone": 3,
        "char": "尺",
        "char_list": [
          "尺",
          "侈",
          "齿",
          "胣",
          "耻"
        ],
        "pinyin_without_tone": "chi"
      },
      {
        "pinyin": "chì",
        "tone": 4,
        "char": "赤",
        "char_list": [
          "彳",
          "斥",
          "赤",
          "翅",
          "痓",
          "傺"
        ],
        "pinyin_without_tone": "chi"
      },
      {
        "pinyin": "chī",
        "tone": 1,
        "char": "𫄨",
        "char_list": [
          "𫄨",
          "瓻"
        ],
        "pinyin_without_tone": "chi"
      }
    ]
  },
  "chong": {
    "pinyin_without_tone": "chong",
    "option_list": [
      {
        "pinyin": "chōng",
        "tone": 1,
        "char": "冲",
        "char_list": [
          "充",
          "冲",
          "茺",
          "珫",
          "翀",
          "摏"
        ],
        "pinyin_without_tone": "chong"
      },
      {
        "pinyin": "chóng",
        "tone": 2,
        "char": "崇",
        "char_list": [
          "虫",
          "崇"
        ],
        "pinyin_without_tone": "chong"
      },
      {
        "pinyin": "chǒng",
        "tone": 3,
        "char": "宠",
        "char_list": [
          "宠"
        ],
        "pinyin_without_tone": "chong"
      },
    ]
  },
  "chou": {
    "pinyin_without_tone": "chou",
    "option_list": [
      {
        "pinyin": "chōu",
        "tone": 1,
        "char": "抽",
        "char_list": [
          "抽",
          "犨"
        ],
        "pinyin_without_tone": "chou"
      },
      {
        "pinyin": "chóu",
        "tone": 2,
        "char": "筹",
        "char_list": [
          "仇",
          "帱",
          "绸",
          "椆",
          "畴",
          "愁",
          "稠",
          "筹",
          "酬"
        ],
        "pinyin_without_tone": "chou"
      },
    ]
  },
  "chu": {
    "pinyin_without_tone": "chu",
    "option_list": [
      {
        "pinyin": "chū",
        "tone": 1,
        "char": "初",
        "char_list": [
          "出",
          "初",
          "摴"
        ],
        "pinyin_without_tone": "chu"
      },
      {
        "pinyin": "chú",
        "tone": 2,
        "char": "除",
        "char_list": [
          "除",
          "厨",
          "锄",
          "雏",
          "橱"
        ],
        "pinyin_without_tone": "chu"
      },
      {
        "pinyin": "chǔ",
        "tone": 3,
        "char": "楚",
        "char_list": [
          "础",
          "储",
          "楚",
          "濋"
        ],
        "pinyin_without_tone": "chu"
      },
      {
        "pinyin": "chù",
        "tone": 4,
        "char": "触",
        "char_list": [
          "亍",
          "处",
          "柷",
          "畜",
          "琡",
          "触",
          "憷",
          "斶",
          "矗"
        ],
        "pinyin_without_tone": "chu"
      },
    ]
  },
  "chuan": {
    "pinyin_without_tone": "chuan",
    "option_list": [
      {
        "pinyin": "chuān",
        "tone": 1,
        "char": "川",
        "char_list": [
          "川",
          "穿"
        ],
        "pinyin_without_tone": "chuan"
      },
      {
        "pinyin": "chuán",
        "tone": 2,
        "char": "传",
        "char_list": [
          "传",
          "船"
        ],
        "pinyin_without_tone": "chuan"
      },
      {
        "pinyin": "chuǎn",
        "tone": 3,
        "char": "喘",
        "char_list": [
          "喘"
        ],
        "pinyin_without_tone": "chuan"
      },
      {
        "pinyin": "chuàn",
        "tone": 4,
        "char": "串",
        "char_list": [
          "串"
        ],
        "pinyin_without_tone": "chuan"
      },
    ]
  },
  "chuang": {
    "pinyin_without_tone": "chuang",
    "option_list": [
      {
        "pinyin": "chuāng",
        "tone": 1,
        "char": "窗",
        "char_list": [
          "疮",
          "窗"
        ],
        "pinyin_without_tone": "chuang"
      },
      {
        "pinyin": "chuáng",
        "tone": 2,
        "char": "床",
        "char_list": [
          "床",
          "噇",
          "幢"
        ],
        "pinyin_without_tone": "chuang"
      },
      {
        "pinyin": "chuǎng",
        "tone": 3,
        "char": "闯",
        "char_list": [
          "闯"
        ],
        "pinyin_without_tone": "chuang"
      },
      {
        "pinyin": "chuàng",
        "tone": 4,
        "char": "创",
        "char_list": [
          "创"
        ],
        "pinyin_without_tone": "chuang"
      }
    ]
  },
  "chui": {
    "pinyin_without_tone": "chui",
    "option_list": [
      {
        "pinyin": "chuī",
        "tone": 1,
        "char": "吹",
        "char_list": [
          "吹",
          "炊"
        ],
        "pinyin_without_tone": "chui"
      },
      {
        "pinyin": "chuí",
        "tone": 2,
        "char": "垂",
        "char_list": [
          "垂",
          "倕",
          "捶",
          "椎",
          "锤"
        ],
        "pinyin_without_tone": "chui"
      }
    ]
  },
  "chun": {
    "pinyin_without_tone": "chun",
    "option_list": [
      {
        "pinyin": "chūn",
        "tone": 1,
        "char": "春",
        "char_list": [
          "春",
          "堾",
          "椿",
          "瑃"
        ],
        "pinyin_without_tone": "chun"
      },
      {
        "pinyin": "chún",
        "tone": 2,
        "char": "纯",
        "char_list": [
          "纯",
          "唇",
          "淳",
          "醇"
        ],
        "pinyin_without_tone": "chun"
      },
    ]
  },
  "ci": {
    "pinyin_without_tone": "ci",
    "option_list": [
      {
        "pinyin": "cí",
        "tone": 2,
        "char": "慈",
        "char_list": [
          "词",
          "祠",
          "茈",
          "堲",
          "瓷",
          "慈",
          "辞",
          "磁",
          "雌"
        ],
        "pinyin_without_tone": "ci"
      },
      {
        "pinyin": "cǐ",
        "tone": 3,
        "char": "此",
        "char_list": [
          "此",
          "泚",
          "玼"
        ],
        "pinyin_without_tone": "ci"
      },
      {
        "pinyin": "cì",
        "tone": 4,
        "char": "次",
        "char_list": [
          "次",
          "伺",
          "佽",
          "刺",
          "莿",
          "赐"
        ],
        "pinyin_without_tone": "ci"
      },
    ]
  },
  "cong": {
    "pinyin_without_tone": "cong",
    "option_list": [
      {
        "pinyin": "cōng",
        "tone": 1,
        "char": "聪",
        "char_list": [
          "匆",
          "葱",
          "聪"
        ],
        "pinyin_without_tone": "cong"
      },
      {
        "pinyin": "cóng",
        "tone": 2,
        "char": "从",
        "char_list": [
          "从",
          "丛",
          "悰"
        ],
        "pinyin_without_tone": "cong"
      },
    ]
  },
  "cu": {
    "pinyin_without_tone": "cu",
    "option_list": [
      {
        "pinyin": "cū",
        "tone": 1,
        "char": "粗",
        "char_list": [
          "粗"
        ],
        "pinyin_without_tone": "cu"
      },
      {
        "pinyin": "cù",
        "tone": 4,
        "char": "促",
        "char_list": [
          "促",
          "醋",
          "簇"
        ],
        "pinyin_without_tone": "cu"
      }
    ]
  },
  "cuan": {
    "pinyin_without_tone": "cuan",
    "option_list": [
      {
        "pinyin": "cuàn",
        "tone": 4,
        "char": "窜",
        "char_list": [
          "窜",
          "篡"
        ],
        "pinyin_without_tone": "cuan"
      }
    ]
  },
  "cui": {
    "pinyin_without_tone": "cui",
    "option_list": [
      {
        "pinyin": "cuī",
        "tone": 1,
        "char": "摧",
        "char_list": [
          "崔",
          "催",
          "缞",
          "摧"
        ],
        "pinyin_without_tone": "cui"
      },
      {
        "pinyin": "cuì",
        "tone": 4,
        "char": "脆",
        "char_list": [
          "脆",
          "悴",
          "粹",
          "翠"
        ],
        "pinyin_without_tone": "cui"
      },
    ]
  },
  "cun": {
    "pinyin_without_tone": "cun",
    "option_list": [
      {
        "pinyin": "cūn",
        "tone": 1,
        "char": "村",
        "char_list": [
          "村"
        ],
        "pinyin_without_tone": "cun"
      },
      {
        "pinyin": "cún",
        "tone": 2,
        "char": "存",
        "char_list": [
          "存"
        ],
        "pinyin_without_tone": "cun"
      },
      {
        "pinyin": "cùn",
        "tone": 4,
        "char": "寸",
        "char_list": [
          "寸"
        ],
        "pinyin_without_tone": "cun"
      },
    ]
  },
  "cuo": {
    "pinyin_without_tone": "cuo",
    "option_list": [
      {
        "pinyin": "cuò",
        "tone": 4,
        "char": "措",
        "char_list": [
          "挫",
          "莝",
          "措",
          "棤",
          "错"
        ],
        "pinyin_without_tone": "cuo"
      },
    ]
  },
  "da": {
    "pinyin_without_tone": "da",
    "option_list": [
      {
        "pinyin": "dā",
        "tone": 1,
        "char": "搭",
        "char_list": [
          "搭",
          "哒"
        ],
        "pinyin_without_tone": "da"
      },
      {
        "pinyin": "dá",
        "tone": 2,
        "char": "达",
        "char_list": [
          "达",
          "炟",
          "答"
        ],
        "pinyin_without_tone": "da"
      },
      {
        "pinyin": "dǎ",
        "tone": 3,
        "char": "打",
        "char_list": [
          "打"
        ],
        "pinyin_without_tone": "da"
      },
      {
        "pinyin": "dà",
        "tone": 4,
        "char": "大",
        "char_list": [
          "大"
        ],
        "pinyin_without_tone": "da"
      },
    ]
  },
  "dai": {
    "pinyin_without_tone": "dai",
    "option_list": [
      {
        "pinyin": "dāi",
        "tone": 1,
        "char": "呆",
        "char_list": [
          "呆"
        ],
        "pinyin_without_tone": "dai"
      },
      {
        "pinyin": "dǎi",
        "tone": 3,
        "char": "逮",
        "char_list": [
          "歹",
          "逮"
        ],
        "pinyin_without_tone": "dai"
      },
      {
        "pinyin": "dài",
        "tone": 4,
        "char": "代",
        "char_list": [
          "代",
          "轪",
          "绐",
          "带",
          "待",
          "怠",
          "贷",
          "袋",
          "叇",
          "戴"
        ],
        "pinyin_without_tone": "dai"
      },
      {
        "pinyin": "dài",
        "tone": 4,
        "char": "垈",
        "char_list": [
          "垈"
        ],
        "pinyin_without_tone": "dai"
      }
    ]
  },
  "dan": {
    "pinyin_without_tone": "dan",
    "option_list": [
      {
        "pinyin": "dān",
        "tone": 1,
        "char": "丹",
        "char_list": [
          "丹",
          "单",
          "担",
          "耽",
          "瘅"
        ],
        "pinyin_without_tone": "dan"
      },
      {
        "pinyin": "dǎn",
        "tone": 3,
        "char": "胆",
        "char_list": [
          "胆"
        ],
        "pinyin_without_tone": "dan"
      },
      {
        "pinyin": "dàn",
        "tone": 4,
        "char": "旦",
        "char_list": [
          "旦",
          "但",
          "诞",
          "弹",
          "淡",
          "蛋",
          "氮",
          "憺"
        ],
        "pinyin_without_tone": "dan"
      },
    ]
  },
  "dang": {
    "pinyin_without_tone": "dang",
    "option_list": [
      {
        "pinyin": "dāng",
        "tone": 1,
        "char": "当",
        "char_list": [
          "当",
          "铛"
        ],
        "pinyin_without_tone": "dang"
      },
      {
        "pinyin": "dǎng",
        "tone": 3,
        "char": "党",
        "char_list": [
          "挡",
          "党"
        ],
        "pinyin_without_tone": "dang"
      },
      {
        "pinyin": "dàng",
        "tone": 4,
        "char": "荡",
        "char_list": [
          "荡",
          "档"
        ],
        "pinyin_without_tone": "dang"
      },
    ]
  },
  "dao": {
    "pinyin_without_tone": "dao",
    "option_list": [
      {
        "pinyin": "dāo",
        "tone": 1,
        "char": "刀",
        "char_list": [
          "刀",
          "叨",
          "忉",
          "舠",
          "鱽"
        ],
        "pinyin_without_tone": "dao"
      },
      {
        "pinyin": "dǎo",
        "tone": 3,
        "char": "岛",
        "char_list": [
          "导",
          "岛",
          "捣",
          "祷",
          "蹈"
        ],
        "pinyin_without_tone": "dao"
      },
      {
        "pinyin": "dào",
        "tone": 4,
        "char": "道",
        "char_list": [
          "到",
          "倒",
          "悼",
          "盗",
          "道",
          "稻"
        ],
        "pinyin_without_tone": "dao"
      }
    ]
  },
  "de": {
    "pinyin_without_tone": "de",
    "option_list": [
      {
        "pinyin": "dé",
        "tone": 2,
        "char": "德",
        "char_list": [
          "得",
          "德"
        ],
        "pinyin_without_tone": "de"
      }
    ]
  },
  "deng": {
    "pinyin_without_tone": "deng",
    "option_list": [
      {
        "pinyin": "dēng",
        "tone": 1,
        "char": "登",
        "char_list": [
          "灯",
          "登",
          "蹬"
        ],
        "pinyin_without_tone": "deng"
      },
      {
        "pinyin": "děng",
        "tone": 3,
        "char": "等",
        "char_list": [
          "等"
        ],
        "pinyin_without_tone": "deng"
      },
    ]
  },
  "di": {
    "pinyin_without_tone": "di",
    "option_list": [
      {
        "pinyin": "dī",
        "tone": 1,
        "char": "堤",
        "char_list": [
          "低",
          "羝",
          "堤",
          "滴"
        ],
        "pinyin_without_tone": "di"
      },
      {
        "pinyin": "dí",
        "tone": 2,
        "char": "笛",
        "char_list": [
          "迪",
          "敌",
          "涤",
          "笛",
          "觌",
          "髢",
          "嘀"
        ],
        "pinyin_without_tone": "di"
      },
      {
        "pinyin": "dǐ",
        "tone": 3,
        "char": "抵",
        "char_list": [
          "底",
          "抵",
          "茋"
        ],
        "pinyin_without_tone": "di"
      },
      {
        "pinyin": "dì",
        "tone": 4,
        "char": "地",
        "char_list": [
          "地",
          "弟",
          "帝",
          "递",
          "第",
          "菂",
          "缔",
          "蒂",
          "踶"
        ],
        "pinyin_without_tone": "di"
      },
    ]
  },
  "dian": {
    "pinyin_without_tone": "dian",
    "option_list": [
      {
        "pinyin": "diān",
        "tone": 1,
        "char": "颠",
        "char_list": [
          "甸",
          "掂",
          "滇",
          "颠",
          "巅"
        ],
        "pinyin_without_tone": "dian"
      },
      {
        "pinyin": "diǎn",
        "tone": 3,
        "char": "典",
        "char_list": [
          "典",
          "点",
          "碘"
        ],
        "pinyin_without_tone": "dian"
      },
      {
        "pinyin": "diàn",
        "tone": 4,
        "char": "殿",
        "char_list": [
          "电",
          "佃",
          "阽",
          "店",
          "垫",
          "扂",
          "玷",
          "惦",
          "淀",
          "奠",
          "殿"
        ],
        "pinyin_without_tone": "dian"
      },
    ]
  },
  "diao": {
    "pinyin_without_tone": "diao",
    "option_list": [
      {
        "pinyin": "diāo",
        "tone": 1,
        "char": "雕",
        "char_list": [
          "刁",
          "叼",
          "汈",
          "雕"
        ],
        "pinyin_without_tone": "diao"
      },
      {
        "pinyin": "diào",
        "tone": 4,
        "char": "调",
        "char_list": [
          "吊",
          "钓",
          "窎",
          "调",
          "掉",
          "铞"
        ],
        "pinyin_without_tone": "diao"
      }
    ]
  },
  "die": {
    "pinyin_without_tone": "die",
    "option_list": [
      {
        "pinyin": "diē",
        "tone": 1,
        "char": "爹",
        "char_list": [
          "爹",
          "跌"
        ],
        "pinyin_without_tone": "die"
      },
      {
        "pinyin": "dié",
        "tone": 2,
        "char": "蝶",
        "char_list": [
          "迭",
          "绖",
          "瓞",
          "谍",
          "叠",
          "碟",
          "蝶"
        ],
        "pinyin_without_tone": "die"
      },
    ]
  },
  "ding": {
    "pinyin_without_tone": "ding",
    "option_list": [
      {
        "pinyin": "dīng",
        "tone": 1,
        "char": "丁",
        "char_list": [
          "丁",
          "叮",
          "盯",
          "钉",
          "耵"
        ],
        "pinyin_without_tone": "ding"
      },
      {
        "pinyin": "dǐng",
        "tone": 3,
        "char": "顶",
        "char_list": [
          "顶",
          "鼎"
        ],
        "pinyin_without_tone": "ding"
      },
      {
        "pinyin": "dìng",
        "tone": 4,
        "char": "定",
        "char_list": [
          "订",
          "定",
          "萣"
        ],
        "pinyin_without_tone": "ding"
      }
    ]
  },
  "dong": {
    "pinyin_without_tone": "dong",
    "option_list": [
      {
        "pinyin": "dōng",
        "tone": 1,
        "char": "东",
        "char_list": [
          "东",
          "冬",
          "岽"
        ],
        "pinyin_without_tone": "dong"
      },
      {
        "pinyin": "dǒng",
        "tone": 3,
        "char": "董",
        "char_list": [
          "董",
          "懂"
        ],
        "pinyin_without_tone": "dong"
      },
      {
        "pinyin": "dòng",
        "tone": 4,
        "char": "栋",
        "char_list": [
          "动",
          "冻",
          "栋",
          "洞"
        ],
        "pinyin_without_tone": "dong"
      },

    ]
  },
  "dou": {
    "pinyin_without_tone": "dou",
    "option_list": [
      {
        "pinyin": "dōu",
        "tone": 1,
        "char": "都",
        "char_list": [
          "都",
          "兜"
        ],
        "pinyin_without_tone": "dou"
      },
      {
        "pinyin": "dǒu",
        "tone": 3,
        "char": "陡",
        "char_list": [
          "抖",
          "陡",
          "蚪",
          "钭"
        ],
        "pinyin_without_tone": "dou"
      },
      {
        "pinyin": "dòu",
        "tone": 4,
        "char": "豆",
        "char_list": [
          "斗",
          "豆",
          "逗",
          "痘"
        ],
        "pinyin_without_tone": "dou"
      }
    ]
  },
  "du": {
    "pinyin_without_tone": "du",
    "option_list": [
      {
        "pinyin": "dū",
        "tone": 1,
        "char": "督",
        "char_list": [
          "督"
        ],
        "pinyin_without_tone": "du"
      },
      {
        "pinyin": "dú",
        "tone": 2,
        "char": "读",
        "char_list": [
          "毒",
          "独",
          "读"
        ],
        "pinyin_without_tone": "du"
      },
      {
        "pinyin": "dǔ",
        "tone": 3,
        "char": "堵",
        "char_list": [
          "堵",
          "赌",
          "睹"
        ],
        "pinyin_without_tone": "du"
      },
      {
        "pinyin": "dù",
        "tone": 4,
        "char": "渡",
        "char_list": [
          "芏",
          "妒",
          "杜",
          "肚",
          "度",
          "渡",
          "镀"
        ],
        "pinyin_without_tone": "du"
      }
    ]
  },
  "duan": {
    "pinyin_without_tone": "duan",
    "option_list": [
      {
        "pinyin": "duān",
        "tone": 1,
        "char": "端",
        "char_list": [
          "端"
        ],
        "pinyin_without_tone": "duan"
      },
      {
        "pinyin": "duǎn",
        "tone": 3,
        "char": "短",
        "char_list": [
          "短"
        ],
        "pinyin_without_tone": "duan"
      },
      {
        "pinyin": "duàn",
        "tone": 4,
        "char": "段",
        "char_list": [
          "段",
          "断",
          "缎",
          "瑖",
          "锻"
        ],
        "pinyin_without_tone": "duan"
      },
    ]
  },
  "dui": {
    "pinyin_without_tone": "dui",
    "option_list": [
      {
        "pinyin": "duī",
        "tone": 1,
        "char": "堆",
        "char_list": [
          "堆"
        ],
        "pinyin_without_tone": "dui"
      },
      {
        "pinyin": "duì",
        "tone": 4,
        "char": "队",
        "char_list": [
          "队",
          "对",
          "兑",
          "祋"
        ],
        "pinyin_without_tone": "dui"
      }
    ]
  },
  "dun": {
    "pinyin_without_tone": "dun",
    "option_list": [
      {
        "pinyin": "dūn",
        "tone": 1,
        "char": "蹲",
        "char_list": [
          "吨",
          "敦",
          "墩",
          "蹲"
        ],
        "pinyin_without_tone": "dun"
      },
      {
        "pinyin": "dùn",
        "tone": 4,
        "char": "盾",
        "char_list": [
          "囤",
          "盾",
          "钝",
          "顿"
        ],
        "pinyin_without_tone": "dun"
      },
    ]
  },
  "duo": {
    "pinyin_without_tone": "duo",
    "option_list": [
      {
        "pinyin": "duō",
        "tone": 1,
        "char": "多",
        "char_list": [
          "多",
          "咄",
          "哆",
          "剟"
        ],
        "pinyin_without_tone": "duo"
      },
      {
        "pinyin": "duó",
        "tone": 2,
        "char": "夺",
        "char_list": [
          "夺",
          "踱"
        ],
        "pinyin_without_tone": "duo"
      },
      {
        "pinyin": "duǒ",
        "tone": 3,
        "char": "朵",
        "char_list": [
          "朵",
          "垛",
          "躲",
          "亸"
        ],
        "pinyin_without_tone": "duo"
      },
      {
        "pinyin": "duò",
        "tone": 4,
        "char": "惰",
        "char_list": [
          "饳",
          "堕",
          "舵",
          "惰",
          "跺"
        ],
        "pinyin_without_tone": "duo"
      },
    ]
  },
  "e": {
    "pinyin_without_tone": "e",
    "option_list": [
      {
        "pinyin": "é",
        "tone": 2,
        "char": "峨",
        "char_list": [
          "讹",
          "俄",
          "娥",
          "峨",
          "涐",
          "鹅",
          "蛾",
          "额"
        ],
        "pinyin_without_tone": "e"
      },
      {
        "pinyin": "è",
        "tone": 4,
        "char": "鄂",
        "char_list": [
          "扼",
          "苊",
          "姶",
          "恶",
          "饿",
          "鄂",
          "崿",
          "愕",
          "遏",
          "噩",
          "鳄"
        ],
        "pinyin_without_tone": "e"
      },
    ]
  },
  "en": {
    "pinyin_without_tone": "en",
    "option_list": [
      {
        "pinyin": "ēn",
        "tone": 1,
        "char": "恩",
        "char_list": [
          "恩"
        ],
        "pinyin_without_tone": "en"
      }
    ]
  },
  "er": {
    "pinyin_without_tone": "er",
    "option_list": [
      {
        "pinyin": "ér",
        "tone": 2,
        "char": "而",
        "char_list": [
          "儿",
          "而",
          "陑",
          "鲕"
        ],
        "pinyin_without_tone": "er"
      },
      {
        "pinyin": "ěr",
        "tone": 3,
        "char": "尔",
        "char_list": [
          "尔",
          "耳",
          "饵"
        ],
        "pinyin_without_tone": "er"
      },
      {
        "pinyin": "èr",
        "tone": 4,
        "char": "二",
        "char_list": [
          "二",
          "佴",
          "咡",
          "贰"
        ],
        "pinyin_without_tone": "er"
      },
    ]
  },
  "fa": {
    "pinyin_without_tone": "fa",
    "option_list": [
      {
        "pinyin": "fā",
        "tone": 1,
        "char": "发",
        "char_list": [
          "发"
        ],
        "pinyin_without_tone": "fa"
      },
      {
        "pinyin": "fá",
        "tone": 2,
        "char": "阀",
        "char_list": [
          "乏",
          "伐",
          "罚",
          "阀",
          "筏"
        ],
        "pinyin_without_tone": "fa"
      },
    ]
  },
  "fan": {
    "pinyin_without_tone": "fan",
    "option_list": [
      {
        "pinyin": "fān",
        "tone": 1,
        "char": "帆",
        "char_list": [
          "帆",
          "番",
          "翻"
        ],
        "pinyin_without_tone": "fan"
      },
      {
        "pinyin": "fán",
        "tone": 2,
        "char": "凡",
        "char_list": [
          "凡",
          "矾",
          "烦",
          "墦",
          "繁",
          "蹯"
        ],
        "pinyin_without_tone": "fan"
      },
      {
        "pinyin": "fǎn",
        "tone": 3,
        "char": "返",
        "char_list": [
          "反",
          "返"
        ],
        "pinyin_without_tone": "fan"
      },
      {
        "pinyin": "fàn",
        "tone": 4,
        "char": "泛",
        "char_list": [
          "犯",
          "泛",
          "泛",
          "泛",
          "饭",
          "范",
          "贩",
          "碗"
        ],
        "pinyin_without_tone": "fan"
      },
    ]
  },
  "fang": {
    "pinyin_without_tone": "fang",
    "option_list": [
      {
        "pinyin": "fāng",
        "tone": 1,
        "char": "芳",
        "char_list": [
          "方",
          "邡",
          "坊",
          "芳",
          "牥"
        ],
        "pinyin_without_tone": "fang"
      },
      {
        "pinyin": "fáng",
        "tone": 2,
        "char": "防",
        "char_list": [
          "防",
          "妨",
          "房",
          "肪",
          "鳑"
        ],
        "pinyin_without_tone": "fang"
      },
      {
        "pinyin": "fǎng",
        "tone": 3,
        "char": "仿",
        "char_list": [
          "仿",
          "访",
          "纺"
        ],
        "pinyin_without_tone": "fang"
      },
      {
        "pinyin": "fàng",
        "tone": 4,
        "char": "放",
        "char_list": [
          "放"
        ],
        "pinyin_without_tone": "fang"
      },
    ]
  },
  "fei": {
    "pinyin_without_tone": "fei",
    "option_list": [
      {
        "pinyin": "fēi",
        "tone": 1,
        "char": "飞",
        "char_list": [
          "飞",
          "妃",
          "非",
          "啡",
          "菲"
        ],
        "pinyin_without_tone": "fei"
      },
      {
        "pinyin": "féi",
        "tone": 2,
        "char": "肥",
        "char_list": [
          "肥"
        ],
        "pinyin_without_tone": "fei"
      },
      {
        "pinyin": "fěi",
        "tone": 3,
        "char": "匪",
        "char_list": [
          "匪",
          "诽",
          "棐",
          "篚"
        ],
        "pinyin_without_tone": "fei"
      },
      {
        "pinyin": "fèi",
        "tone": 4,
        "char": "沸",
        "char_list": [
          "吠",
          "废",
          "沸",
          "肺",
          "费",
          "剕",
          "镄"
        ],
        "pinyin_without_tone": "fei"
      },
    ]
  },
  "fen": {
    "pinyin_without_tone": "fen",
    "option_list": [
      {
        "pinyin": "fēn",
        "tone": 1,
        "char": "芬",
        "char_list": [
          "分",
          "吩",
          "纷",
          "芬",
          "氛",
          "翂"
        ],
        "pinyin_without_tone": "fen"
      },
      {
        "pinyin": "fěn",
        "tone": 3,
        "char": "粉",
        "char_list": [
          "粉"
        ],
        "pinyin_without_tone": "fen"
      },
      {
        "pinyin": "fèn",
        "tone": 4,
        "char": "奋",
        "char_list": [
          "份",
          "奋",
          "忿",
          "愤",
          "粪",
          "瀵"
        ],
        "pinyin_without_tone": "fen"
      },
    ]
  },
  "feng": {
    "pinyin_without_tone": "feng",
    "option_list": [
      {
        "pinyin": "fēng",
        "tone": 1,
        "char": "峰",
        "char_list": [
          "丰",
          "风",
          "枫",
          "封",
          "疯",
          "峰",
          "峰",
          "崶",
          "锋",
          "蜂"
        ],
        "pinyin_without_tone": "feng"
      },
      {
        "pinyin": "féng",
        "tone": 2,
        "char": "逢",
        "char_list": [
          "冯",
          "逢"
        ],
        "pinyin_without_tone": "feng"
      },
      {
        "pinyin": "fěng",
        "tone": 3,
        "char": "讽",
        "char_list": [
          "讽",
          "唪"
        ],
        "pinyin_without_tone": "feng"
      },
      {
        "pinyin": "fèng",
        "tone": 4,
        "char": "奉",
        "char_list": [
          "凤",
          "奉",
          "缝"
        ],
        "pinyin_without_tone": "feng"
      },
    ]
  },
  "fou": {
    "pinyin_without_tone": "fou",
    "option_list": [
      {
        "pinyin": "fǒu",
        "tone": 3,
        "char": "否",
        "char_list": [
          "否"
        ],
        "pinyin_without_tone": "fou"
      }
    ]
  },
  "fu": {
    "pinyin_without_tone": "fu",
    "option_list": [
      {
        "pinyin": "fū",
        "tone": 1,
        "char": "夫",
        "char_list": [
          "夫",
          "玞",
          "肤",
          "鄜",
          "孵",
          "敷"
        ],
        "pinyin_without_tone": "fu"
      },
      {
        "pinyin": "fú",
        "tone": 2,
        "char": "服",
        "char_list": [
          "弗",
          "伏",
          "佛",
          "佛",
          "扶",
          "芙",
          "芣",
          "拂",
          "服",
          "绋",
          "俘",
          "韨",
          "浮",
          "符",
          "艴",
          "袱",
          "幅",
          "福",
          "辐",
          "榑",
          "蝠"
        ],
        "pinyin_without_tone": "fu"
      },
      {
        "pinyin": "fǔ",
        "tone": 3,
        "char": "辅",
        "char_list": [
          "抚",
          "甫",
          "府",
          "斧",
          "俯",
          "辅",
          "腐",
          "簠"
        ],
        "pinyin_without_tone": "fu"
      },
      {
        "pinyin": "fù",
        "tone": 4,
        "char": "复",
        "char_list": [
          "父",
          "付",
          "妇",
          "负",
          "附",
          "咐",
          "复",
          "赴",
          "副",
          "傅",
          "富",
          "赋",
          "缚",
          "腹",
          "覆"
        ],
        "pinyin_without_tone": "fu"
      },
    ]
  },
  "gai": {
    "pinyin_without_tone": "gai",
    "option_list": [
      {
        "pinyin": "gǎi",
        "tone": 3,
        "char": "改",
        "char_list": [
          "改"
        ],
        "pinyin_without_tone": "gai"
      },
      {
        "pinyin": "gài",
        "tone": 4,
        "char": "盖",
        "char_list": [
          "丐",
          "钙",
          "盖",
          "溉",
          "戤",
          "概"
        ],
        "pinyin_without_tone": "gai"
      },
    ]
  },
  "gan": {
    "pinyin_without_tone": "gan",
    "option_list": [
      {
        "pinyin": "gān",
        "tone": 1,
        "char": "甘",
        "char_list": [
          "甘",
          "杆",
          "肝",
          "柑",
          "竿",
          "尴"
        ],
        "pinyin_without_tone": "gan"
      },
      {
        "pinyin": "gǎn",
        "tone": 3,
        "char": "敢",
        "char_list": [
          "秆",
          "赶",
          "敢",
          "感",
          "橄",
          "鳡",
          "捍"
        ],
        "pinyin_without_tone": "gan"
      },
    ]
  },
  "gang": {
    "pinyin_without_tone": "gang",
    "option_list": [
      {
        "pinyin": "gāng",
        "tone": 1,
        "char": "刚",
        "char_list": [
          "冈",
          "冮",
          "刚",
          "杠",
          "纲",
          "肛",
          "缸",
          "钢",
          "堽"
        ],
        "pinyin_without_tone": "gang"
      },
      {
        "pinyin": "gǎng",
        "tone": 3,
        "char": "岗",
        "char_list": [
          "岗",
          "港"
        ],
        "pinyin_without_tone": "gang"
      },
    ]
  },
  "gao": {
    "pinyin_without_tone": "gao",
    "option_list": [
      {
        "pinyin": "gāo",
        "tone": 1,
        "char": "高",
        "char_list": [
          "羔",
          "高",
          "膏",
          "糕"
        ],
        "pinyin_without_tone": "gao"
      },
      {
        "pinyin": "gǎo",
        "tone": 3,
        "char": "稿",
        "char_list": [
          "搞",
          "稿",
          "镐"
        ],
        "pinyin_without_tone": "gao"
      },
      {
        "pinyin": "gào",
        "tone": 4,
        "char": "告",
        "char_list": [
          "告",
          "筶"
        ],
        "pinyin_without_tone": "gao"
      }
    ]
  },
  "ge": {
    "pinyin_without_tone": "ge",
    "option_list": [
      {
        "pinyin": "gē",
        "tone": 1,
        "char": "歌",
        "char_list": [
          "戈",
          "疙",
          "哥",
          "胳",
          "袼",
          "鸽",
          "割",
          "搁",
          "歌"
        ],
        "pinyin_without_tone": "ge"
      },
      {
        "pinyin": "gé",
        "tone": 2,
        "char": "革",
        "char_list": [
          "阁",
          "革",
          "格",
          "葛",
          "隔",
          "塥",
          "滆"
        ],
        "pinyin_without_tone": "ge"
      },
      {
        "pinyin": "gè",
        "tone": 4,
        "char": "各",
        "char_list": [
          "个",
          "各"
        ],
        "pinyin_without_tone": "ge"
      },
    ]
  },
  "gei": {
    "pinyin_without_tone": "gei",
    "option_list": [
      {
        "pinyin": "gěi",
        "tone": 3,
        "char": "给",
        "char_list": [
          "给"
        ],
        "pinyin_without_tone": "gei"
      }
    ]
  },
  "gen": {
    "pinyin_without_tone": "gen",
    "option_list": [
      {
        "pinyin": "gēn",
        "tone": 1,
        "char": "根",
        "char_list": [
          "根",
          "跟"
        ],
        "pinyin_without_tone": "gen"
      },
    ]
  },
  "geng": {
    "pinyin_without_tone": "geng",
    "option_list": [
      {
        "pinyin": "gēng",
        "tone": 1,
        "char": "耕",
        "char_list": [
          "庚",
          "浭",
          "耕",
          "鹒",
          "羹"
        ],
        "pinyin_without_tone": "geng"
      },
      {
        "pinyin": "gèng",
        "tone": 4,
        "char": "更",
        "char_list": [
          "更",
          "暅"
        ],
        "pinyin_without_tone": "geng"
      },
      {
        "pinyin": "gěng",
        "tone": 3,
        "char": "耿",
        "char_list": [
          "埂",
          "耿",
          "梗"
        ],
        "pinyin_without_tone": "geng"
      }
    ]
  },
  "gong": {
    "pinyin_without_tone": "gong",
    "option_list": [
      {
        "pinyin": "gōng",
        "tone": 1,
        "char": "功",
        "char_list": [
          "工",
          "弓",
          "公",
          "功",
          "攻",
          "供",
          "宫",
          "恭",
          "蚣",
          "躬"
        ],
        "pinyin_without_tone": "gong"
      },
      {
        "pinyin": "gǒng",
        "tone": 3,
        "char": "巩",
        "char_list": [
          "巩",
          "汞",
          "拱"
        ],
        "pinyin_without_tone": "gong"
      },
      {
        "pinyin": "gòng",
        "tone": 4,
        "char": "共",
        "char_list": [
          "共",
          "贡",
          "唝"
        ],
        "pinyin_without_tone": "gong"
      },
    ]
  },
  "gou": {
    "pinyin_without_tone": "gou",
    "option_list": [
      {
        "pinyin": "gōu",
        "tone": 1,
        "char": "钩",
        "char_list": [
          "勾",
          "沟",
          "钩"
        ],
        "pinyin_without_tone": "gou"
      },
      {
        "pinyin": "gǒu",
        "tone": 3,
        "char": "狗",
        "char_list": [
          "狗",
          "苟",
          "笱"
        ],
        "pinyin_without_tone": "gou"
      },
      {
        "pinyin": "gòu",
        "tone": 4,
        "char": "构",
        "char_list": [
          "构",
          "购",
          "垢",
          "姤",
          "够",
          "遘",
          "雊"
        ],
        "pinyin_without_tone": "gou"
      },
    ]
  },
  "gu": {
    "pinyin_without_tone": "gu",
    "option_list": [
      {
        "pinyin": "gū",
        "tone": 1,
        "char": "孤",
        "char_list": [
          "估",
          "咕",
          "姑",
          "孤",
          "沽",
          "菇",
          "辜"
        ],
        "pinyin_without_tone": "gu"
      },
      {
        "pinyin": "gǔ",
        "tone": 3,
        "char": "谷",
        "char_list": [
          "古",
          "谷",
          "股",
          "骨",
          "羖",
          "蓇",
          "馉",
          "鼓",
          "嘏",
          "瀔"
        ],
        "pinyin_without_tone": "gu"
      },
      {
        "pinyin": "gù",
        "tone": 4,
        "char": "故",
        "char_list": [
          "固",
          "故",
          "顾",
          "堌",
          "牿",
          "雇"
        ],
        "pinyin_without_tone": "gu"
      }
    ]
  },
  "gua": {
    "pinyin_without_tone": "gua",
    "option_list": [
      {
        "pinyin": "guā",
        "tone": 1,
        "char": "瓜",
        "char_list": [
          "瓜",
          "刮"
        ],
        "pinyin_without_tone": "gua"
      },
      {
        "pinyin": "guà",
        "tone": 4,
        "char": "挂",
        "char_list": [
          "卦",
          "坬",
          "挂",
          "褂"
        ],
        "pinyin_without_tone": "gua"
      },
      {
        "pinyin": "guǎ",
        "tone": 3,
        "char": "寡",
        "char_list": [
          "寡"
        ],
        "pinyin_without_tone": "gua"
      }
    ]
  },
  "guai": {
    "pinyin_without_tone": "guai",
    "option_list": [
      {
        "pinyin": "guāi",
        "tone": 1,
        "char": "乖",
        "char_list": [
          "乖"
        ],
        "pinyin_without_tone": "guai"
      },
      {
        "pinyin": "guǎi",
        "tone": 3,
        "char": "拐",
        "char_list": [
          "拐",
          "拐"
        ],
        "pinyin_without_tone": "guai"
      },
      {
        "pinyin": "guài",
        "tone": 4,
        "char": "怪",
        "char_list": [
          "怪"
        ],
        "pinyin_without_tone": "guai"
      }
    ]
  },
  "guan": {
    "pinyin_without_tone": "guan",
    "option_list": [
      {
        "pinyin": "guān",
        "tone": 1,
        "char": "观",
        "char_list": [
          "关",
          "观",
          "官",
          "冠",
          "棺"
        ],
        "pinyin_without_tone": "guan"
      },
      {
        "pinyin": "guǎn",
        "tone": 3,
        "char": "馆",
        "char_list": [
          "馆",
          "筦",
          "管"
        ],
        "pinyin_without_tone": "guan"
      },
      {
        "pinyin": "guàn",
        "tone": 4,
        "char": "贯",
        "char_list": [
          "贯",
          "惯",
          "祼",
          "灌",
          "爟",
          "罐"
        ],
        "pinyin_without_tone": "guan"
      },
    ]
  },
  "guang": {
    "pinyin_without_tone": "guang",
    "option_list": [
      {
        "pinyin": "guāng",
        "tone": 1,
        "char": "光",
        "char_list": [
          "光",
          "垙",
          "桄",
          "洸",
          "𨐈"
        ],
        "pinyin_without_tone": "guang"
      },
      {
        "pinyin": "guǎng",
        "tone": 3,
        "char": "广",
        "char_list": [
          "广"
        ],
        "pinyin_without_tone": "guang"
      },
      {
        "pinyin": "guàng",
        "tone": 4,
        "char": "珖",
        "char_list": [
          "珖",
          "逛"
        ],
        "pinyin_without_tone": "guang"
      },
    ]
  },
  "gui": {
    "pinyin_without_tone": "gui",
    "option_list": [
      {
        "pinyin": "guī",
        "tone": 1,
        "char": "归",
        "char_list": [
          "归",
          "龟",
          "规",
          "邽",
          "闺",
          "硅",
          "瑰",
          "鬶"
        ],
        "pinyin_without_tone": "gui"
      },
      {
        "pinyin": "guǐ",
        "tone": 3,
        "char": "轨",
        "char_list": [
          "宄",
          "轨",
          "诡",
          "姽",
          "癸",
          "鬼"
        ],
        "pinyin_without_tone": "gui"
      },
      {
        "pinyin": "guì",
        "tone": 4,
        "char": "桂",
        "char_list": [
          "柜",
          "贵",
          "桂",
          "跪"
        ],
        "pinyin_without_tone": "gui"
      },
    ]
  },
  "guo": {
    "pinyin_without_tone": "guo",
    "option_list": [
      {
        "pinyin": "guō",
        "tone": 1,
        "char": "锅",
        "char_list": [
          "呙",
          "郭",
          "崞",
          "锅"
        ],
        "pinyin_without_tone": "guo"
      },
      {
        "pinyin": "guó",
        "tone": 2,
        "char": "国",
        "char_list": [
          "国",
          "馘"
        ],
        "pinyin_without_tone": "guo"
      },
      {
        "pinyin": "guǒ",
        "tone": 3,
        "char": "果",
        "char_list": [
          "果",
          "蜾",
          "裹"
        ],
        "pinyin_without_tone": "guo"
      },
      {
        "pinyin": "guò",
        "tone": 4,
        "char": "过",
        "char_list": [
          "过"
        ],
        "pinyin_without_tone": "guo"
      },
    ]
  },
  "hai": {
    "pinyin_without_tone": "hai",
    "option_list": [

      {
        "pinyin": "hái",
        "tone": 2,
        "char": "孩",
        "char_list": [
          "还",
          "孩"
        ],
        "pinyin_without_tone": "hai"
      },
      {
        "pinyin": "hǎi",
        "tone": 3,
        "char": "海",
        "char_list": [
          "海",
          "胲"
        ],
        "pinyin_without_tone": "hai"
      },
      {
        "pinyin": "hài",
        "tone": 4,
        "char": "亥",
        "char_list": [
          "亥",
          "骇",
          "害"
        ],
        "pinyin_without_tone": "hai"
      }
    ]
  },
  "han": {
    "pinyin_without_tone": "han",
    "option_list": [
      {
        "pinyin": "hán",
        "tone": 2,
        "char": "含",
        "char_list": [
          "含",
          "函",
          "浛",
          "崡",
          "涵",
          "寒",
          "嵅",
          "韩"
        ],
        "pinyin_without_tone": "han"
      },
      {
        "pinyin": "hǎn",
        "tone": 3,
        "char": "罕",
        "char_list": [
          "罕",
          "喊"
        ],
        "pinyin_without_tone": "han"
      },
      {
        "pinyin": "hàn",
        "tone": 4,
        "char": "汉",
        "char_list": [
          "汉",
          "汗",
          "旱",
          "垾",
          "悍",
          "焊",
          "撖",
          "暵",
          "憾",
          "撼",
          "翰"
        ],
        "pinyin_without_tone": "han"
      },
      {
        "pinyin": "hān",
        "tone": 1,
        "char": "酣",
        "char_list": [
          "酣",
          "憨"
        ],
        "pinyin_without_tone": "han"
      },
    ]
  },
  "hang": {
    "pinyin_without_tone": "hang",
    "option_list": [
      {
        "pinyin": "háng",
        "tone": 2,
        "char": "航",
        "char_list": [
          "杭",
          "航"
        ],
        "pinyin_without_tone": "hang"
      },
    ]
  },
  "hao": {
    "pinyin_without_tone": "hao",
    "option_list": [
      {
        "pinyin": "háo",
        "tone": 2,
        "char": "豪",
        "char_list": [
          "毫",
          "豪",
          "嚎"
        ],
        "pinyin_without_tone": "hao"
      },
      {
        "pinyin": "hǎo",
        "tone": 3,
        "char": "好",
        "char_list": [
          "好"
        ],
        "pinyin_without_tone": "hao"
      },
      {
        "pinyin": "hào",
        "tone": 4,
        "char": "浩",
        "char_list": [
          "号",
          "浩",
          "耗",
          "皓",
          "鄗",
          "皞"
        ],
        "pinyin_without_tone": "hao"
      },

    ]
  },
  "he": {
    "pinyin_without_tone": "he",
    "option_list": [
      {
        "pinyin": "hé",
        "tone": 2,
        "char": "河",
        "char_list": [
          "禾",
          "合",
          "何",
          "和",
          "河",
          "核",
          "荷",
          "盒",
          "龁",
          "鹖"
        ],
        "pinyin_without_tone": "he"
      },
      {
        "pinyin": "hè",
        "tone": 4,
        "char": "贺",
        "char_list": [
          "垎",
          "贺",
          "褐",
          "赫",
          "鹤"
        ],
        "pinyin_without_tone": "he"
      },
      {
        "pinyin": "hé",
        "tone": 2,
        "char": "郃",
        "char_list": [
          "郃",
          "龢"
        ],
        "pinyin_without_tone": "he"
      },

    ]
  },
  "hei": {
    "pinyin_without_tone": "hei",
    "option_list": [
      {
        "pinyin": "hēi",
        "tone": 1,
        "char": "黑",
        "char_list": [
          "黑",
          "嘿"
        ],
        "pinyin_without_tone": "hei"
      }
    ]
  },
  "hen": {
    "pinyin_without_tone": "hen",
    "option_list": [
      {
        "pinyin": "hén",
        "tone": 2,
        "char": "痕",
        "char_list": [
          "痕"
        ],
        "pinyin_without_tone": "hen"
      },

      {
        "pinyin": "hèn",
        "tone": 4,
        "char": "恨",
        "char_list": [
          "恨"
        ],
        "pinyin_without_tone": "hen"
      },

    ]
  },
  "heng": {
    "pinyin_without_tone": "heng",
    "option_list": [
      {
        "pinyin": "héng",
        "tone": 2,
        "char": "恒",
        "char_list": [
          "恒",
          "横",
          "衡"
        ],
        "pinyin_without_tone": "heng"
      },
    ]
  },
  "hong": {
    "pinyin_without_tone": "hong",
    "option_list": [
      {
        "pinyin": "hōng",
        "tone": 1,
        "char": "轰",
        "char_list": [
          "轰",
          "哄",
          "烘"
        ],
        "pinyin_without_tone": "hong"
      },
      {
        "pinyin": "hóng",
        "tone": 2,
        "char": "宏",
        "char_list": [
          "弘",
          "红",
          "宏",
          "纮",
          "洪",
          "荭",
          "虹",
          "翃",
          "硔",
          "鸿",
          "黉"
        ],
        "pinyin_without_tone": "hong"
      },
    ]
  },
  "hou": {
    "pinyin_without_tone": "hou",
    "option_list": [
      {
        "pinyin": "hòu",
        "tone": 4,
        "char": "后",
        "char_list": [
          "后",
          "厚",
          "垕",
          "候",
          "堠",
          "鲘"
        ],
        "pinyin_without_tone": "hou"
      },
    ]
  },
  "hu": {
    "pinyin_without_tone": "hu",
    "option_list": [
      {
        "pinyin": "hū",
        "tone": 1,
        "char": "忽",
        "char_list": [
          "乎",
          "呼",
          "忽",
          "轷"
        ],
        "pinyin_without_tone": "hu"
      },
      {
        "pinyin": "hú",
        "tone": 2,
        "char": "壶",
        "char_list": [
          "弧",
          "狐",
          "胡",
          "壶",
          "隺",
          "湖",
          "葫",
          "糊",
          "糊",
          "蝴"
        ],
        "pinyin_without_tone": "hu"
      },
      {
        "pinyin": "hǔ",
        "tone": 3,
        "char": "虎",
        "char_list": [
          "虎",
          "唬"
        ],
        "pinyin_without_tone": "hu"
      },
      {
        "pinyin": "hù",
        "tone": 4,
        "char": "互",
        "char_list": [
          "互",
          "户",
          "冱",
          "护",
          "沪",
          "岵",
          "鄠",
          "嫭",
          "鹱",
          "鳠"
        ],
        "pinyin_without_tone": "hu"
      },
    ]
  },
  "hua": {
    "pinyin_without_tone": "hua",
    "option_list": [
      {
        "pinyin": "huā",
        "tone": 1,
        "char": "哗",
        "char_list": [
          "哗"
        ],
        "pinyin_without_tone": "hua"
      },
      {
        "pinyin": "huá",
        "tone": 2,
        "char": "华",
        "char_list": [
          "华",
          "滑",
          "猾"
        ],
        "pinyin_without_tone": "hua"
      },
      {
        "pinyin": "huà",
        "tone": 4,
        "char": "化",
        "char_list": [
          "化",
          "划",
          "画",
          "话",
          "桦",
          "觟"
        ],
        "pinyin_without_tone": "hua"
      },
    ]
  },
  "huai": {
    "pinyin_without_tone": "huai",
    "option_list": [
      {
        "pinyin": "huái",
        "tone": 2,
        "char": "怀",
        "char_list": [
          "怀",
          "徊",
          "淮",
          "槐"
        ],
        "pinyin_without_tone": "huai"
      },
    ]
  },
  "huan": {
    "pinyin_without_tone": "huan",
    "option_list": [
      {
        "pinyin": "huān",
        "tone": 1,
        "char": "欢",
        "char_list": [
          "欢"
        ],
        "pinyin_without_tone": "huan"
      },
      {
        "pinyin": "huán",
        "tone": 2,
        "char": "环",
        "char_list": [
          "环",
          "貆",
          "锾",
          "澴"
        ],
        "pinyin_without_tone": "huan"
      },
      {
        "pinyin": "huǎn",
        "tone": 3,
        "char": "缓",
        "char_list": [
          "缓"
        ],
        "pinyin_without_tone": "huan"
      },
      {
        "pinyin": "huàn",
        "tone": 4,
        "char": "幻",
        "char_list": [
          "幻",
          "宦",
          "唤",
          "换",
          "涣",
          "患",
          "焕",
          "逭",
          "痪",
          "擐"
        ],
        "pinyin_without_tone": "huan"
      },
    ]
  },
  "huang": {
    "pinyin_without_tone": "huang",
    "option_list": [
      {
        "pinyin": "huāng",
        "tone": 1,
        "char": "荒",
        "char_list": [
          "荒",
          "慌"
        ],
        "pinyin_without_tone": "huang"
      },
      {
        "pinyin": "huáng",
        "tone": 2,
        "char": "煌",
        "char_list": [
          "皇",
          "凰",
          "黄",
          "喤",
          "媓",
          "惶",
          "煌",
          "瑝",
          "艎",
          "蝗",
          "癀",
          "簧"
        ],
        "pinyin_without_tone": "huang"
      },
      {
        "pinyin": "huǎng",
        "tone": 3,
        "char": "晃",
        "char_list": [
          "恍",
          "晃",
          "谎",
          "幌"
        ],
        "pinyin_without_tone": "huang"
      },
    ]
  },
  "hui": {
    "pinyin_without_tone": "hui",
    "option_list": [
      {
        "pinyin": "huī",
        "tone": 1,
        "char": "辉",
        "char_list": [
          "灰",
          "恢",
          "挥",
          "晖",
          "辉",
          "徽"
        ],
        "pinyin_without_tone": "hui"
      },
      {
        "pinyin": "huí",
        "tone": 2,
        "char": "回",
        "char_list": [
          "回"
        ],
        "pinyin_without_tone": "hui"
      },
      {
        "pinyin": "huǐ",
        "tone": 3,
        "char": "悔",
        "char_list": [
          "悔",
          "毁"
        ],
        "pinyin_without_tone": "hui"
      },
      {
        "pinyin": "huì",
        "tone": 4,
        "char": "汇",
        "char_list": [
          "卉",
          "汇",
          "会",
          "讳",
          "绘",
          "诲",
          "贿",
          "晦",
          "秽",
          "惠",
          "翙",
          "慧"
        ],
        "pinyin_without_tone": "hui"
      },
    ]
  },
  "hun": {
    "pinyin_without_tone": "hun",
    "option_list": [
      {
        "pinyin": "hún",
        "tone": 2,
        "char": "浑",
        "char_list": [
          "浑",
          "魂"
        ],
        "pinyin_without_tone": "hun"
      },
      {
        "pinyin": "hùn",
        "tone": 4,
        "char": "混",
        "char_list": [
          "混"
        ],
        "pinyin_without_tone": "hun"
      },
    ]
  },
  "huo": {
    "pinyin_without_tone": "huo",
    "option_list": [
      {
        "pinyin": "huó",
        "tone": 2,
        "char": "活",
        "char_list": [
          "佸",
          "活"
        ],
        "pinyin_without_tone": "huo"
      },
      {
        "pinyin": "huǒ",
        "tone": 3,
        "char": "火",
        "char_list": [
          "火",
          "伙",
          "钬"
        ],
        "pinyin_without_tone": "huo"
      },
      {
        "pinyin": "huò",
        "tone": 4,
        "char": "获",
        "char_list": [
          "或",
          "货",
          "砉",
          "获",
          "祸",
          "惑",
          "霍"
        ],
        "pinyin_without_tone": "huo"
      },
    ]
  },
  "ji": {
    "pinyin_without_tone": "ji",
    "option_list": [
      {
        "pinyin": "jī",
        "tone": 1,
        "char": "基",
        "char_list": [
          "讥",
          "击",
          "叽",
          "饥",
          "圾",
          "机",
          "肌",
          "鸡",
          "枅",
          "迹",
          "唧",
          "积",
          "基",
          "绩",
          "缉",
          "畸",
          "箕",
          "稽",
          "激"
        ],
        "pinyin_without_tone": "ji"
      },
      {
        "pinyin": "jí",
        "tone": 2,
        "char": "吉",
        "char_list": [
          "及",
          "伋",
          "吉",
          "级",
          "即",
          "极",
          "姞",
          "急",
          "疾",
          "脊",
          "棘",
          "集",
          "嫉",
          "辑",
          "耤",
          "鹡",
          "藉",
          "蹐",
          "籍"
        ],
        "pinyin_without_tone": "ji"
      },
      {
        "pinyin": "jǐ",
        "tone": 3,
        "char": "几",
        "char_list": [
          "几",
          "己",
          "挤",
          "掎",
          "鱾"
        ],
        "pinyin_without_tone": "ji"
      },
      {
        "pinyin": "jì",
        "tone": 4,
        "char": "季",
        "char_list": [
          "计",
          "记",
          "纪",
          "妓",
          "忌",
          "技",
          "芰",
          "际",
          "剂",
          "季",
          "垍",
          "既",
          "济",
          "继",
          "寂",
          "寄",
          "徛",
          "祭",
          "惎",
          "跽",
          "冀",
          "穄",
          "瀱"
        ],
        "pinyin_without_tone": "ji"
      },
    ]
  },
  "jia": {
    "pinyin_without_tone": "jia",
    "option_list": [
      {
        "pinyin": "jiā",
        "tone": 1,
        "char": "佳",
        "char_list": [
          "加",
          "夹",
          "佳",
          "泇",
          "茄",
          "家",
          "嘉"
        ],
        "pinyin_without_tone": "jia"
      },
      {
        "pinyin": "jiǎ",
        "tone": 3,
        "char": "甲",
        "char_list": [
          "甲",
          "叚",
          "贾",
          "钾",
          "假",
          "槚",
          "瘕"
        ],
        "pinyin_without_tone": "jia"
      },
      {
        "pinyin": "jià",
        "tone": 4,
        "char": "架",
        "char_list": [
          "价",
          "驾",
          "架",
          "嫁",
          "稼"
        ],
        "pinyin_without_tone": "jia"
      },
    ]
  },
  "jian": {
    "pinyin_without_tone": "jian",
    "option_list": [
      {
        "pinyin": "jiān",
        "tone": 1,
        "char": "坚",
        "char_list": [
          "戋",
          "奸",
          "尖",
          "坚",
          "歼",
          "间",
          "肩",
          "艰",
          "兼",
          "监",
          "煎",
          "鹣"
        ],
        "pinyin_without_tone": "jian"
      },
      {
        "pinyin": "jiǎn",
        "tone": 3,
        "char": "简",
        "char_list": [
          "拣",
          "俭",
          "柬",
          "茧",
          "捡",
          "减",
          "剪",
          "检",
          "趼",
          "暕",
          "简",
          "谫",
          "碱",
          "翦"
        ],
        "pinyin_without_tone": "jian"
      },
      {
        "pinyin": "jiàn",
        "tone": 4,
        "char": "荐",
        "char_list": [
          "见",
          "件",
          "建",
          "剑",
          "荐",
          "贱",
          "健",
          "涧",
          "舰",
          "渐",
          "楗",
          "溅",
          "践",
          "鉴",
          "键",
          "箭"
        ],
        "pinyin_without_tone": "jian"
      },
    ]
  },
  "jiang": {
    "pinyin_without_tone": "jiang",
    "option_list": [
      {
        "pinyin": "jiāng",
        "tone": 1,
        "char": "疆",
        "char_list": [
          "江",
          "姜",
          "将",
          "茳",
          "浆",
          "僵",
          "缰",
          "鳉",
          "疆"
        ],
        "pinyin_without_tone": "jiang"
      },
      {
        "pinyin": "jiǎng",
        "tone": 3,
        "char": "讲",
        "char_list": [
          "讲",
          "奖",
          "桨",
          "蒋"
        ],
        "pinyin_without_tone": "jiang"
      },
      {
        "pinyin": "jiàng",
        "tone": 4,
        "char": "降",
        "char_list": [
          "匠",
          "降",
          "洚",
          "弶",
          "酱"
        ],
        "pinyin_without_tone": "jiang"
      }
    ]
  },
  "jiao": {
    "pinyin_without_tone": "jiao",
    "option_list": [
      {
        "pinyin": "jiāo",
        "tone": 1,
        "char": "郊",
        "char_list": [
          "交",
          "郊",
          "娇",
          "峧",
          "浇",
          "骄",
          "胶",
          "椒",
          "焦",
          "跤",
          "僬",
          "蕉",
          "礁"
        ],
        "pinyin_without_tone": "jiao"
      },
      {
        "pinyin": "jiǎo",
        "tone": 3,
        "char": "角",
        "char_list": [
          "角",
          "侥",
          "恔",
          "狡",
          "绞",
          "饺",
          "矫",
          "脚",
          "搅",
          "缴",
          "璬",
          "皦"
        ],
        "pinyin_without_tone": "jiao"
      },
      {
        "pinyin": "jiào",
        "tone": 4,
        "char": "较",
        "char_list": [
          "叫",
          "轿",
          "较",
          "教",
          "教",
          "窖",
          "滘",
          "斠",
          "漖",
          "酵",
          "皭"
        ],
        "pinyin_without_tone": "jiao"
      },
    ]
  },
  "jie": {
    "pinyin_without_tone": "jie",
    "option_list": [
      {
        "pinyin": "jiē",
        "tone": 1,
        "char": "阶",
        "char_list": [
          "阶",
          "皆",
          "接",
          "秸",
          "揭",
          "街"
        ],
        "pinyin_without_tone": "jie"
      },
      {
        "pinyin": "jié",
        "tone": 2,
        "char": "杰",
        "char_list": [
          "节",
          "劫",
          "岊",
          "杰",
          "洁",
          "结",
          "捷",
          "睫",
          "蜐",
          "截",
          "竭",
          "鲒"
        ],
        "pinyin_without_tone": "jie"
      },
      {
        "pinyin": "jiě",
        "tone": 3,
        "char": "解",
        "char_list": [
          "姐",
          "解",
          "檞"
        ],
        "pinyin_without_tone": "jie"
      },
      {
        "pinyin": "jiè",
        "tone": 4,
        "char": "界",
        "char_list": [
          "介",
          "戒",
          "芥",
          "届",
          "界",
          "诫",
          "借",
          "悈",
          "骱",
          "褯"
        ],
        "pinyin_without_tone": "jie"
      },
    ]
  },
  "jin": {
    "pinyin_without_tone": "jin",
    "option_list": [
      {
        "pinyin": "jīn",
        "tone": 1,
        "char": "金",
        "char_list": [
          "巾",
          "今",
          "斤",
          "金",
          "津",
          "珒",
          "筋",
          "襟"
        ],
        "pinyin_without_tone": "jin"
      },
      {
        "pinyin": "jǐn",
        "tone": 3,
        "char": "锦",
        "char_list": [
          "仅",
          "尽",
          "卺",
          "卺",
          "紧",
          "谨",
          "锦",
          "廑"
        ],
        "pinyin_without_tone": "jin"
      },
      {
        "pinyin": "jìn",
        "tone": 4,
        "char": "晋",
        "char_list": [
          "劲",
          "近",
          "进",
          "晋",
          "浸",
          "赆",
          "祲",
          "溍",
          "禁",
          "瑨",
          "殣"
        ],
        "pinyin_without_tone": "jin"
      },
    ]
  },
  "jing": {
    "pinyin_without_tone": "jing",
    "option_list": [
      {
        "pinyin": "jīng",
        "tone": 1,
        "char": "经",
        "char_list": [
          "京",
          "经",
          "茎",
          "荆",
          "惊",
          "晶",
          "睛",
          "兢",
          "精",
          "鲸",
          "麖",
          "鼱"
        ],
        "pinyin_without_tone": "jing"
      },
      {
        "pinyin": "jǐng",
        "tone": 3,
        "char": "景",
        "char_list": [
          "井",
          "颈",
          "景",
          "璥",
          "警"
        ],
        "pinyin_without_tone": "jing"
      },
      {
        "pinyin": "jìng",
        "tone": 4,
        "char": "敬",
        "char_list": [
          "净",
          "径",
          "迳",
          "竞",
          "竫",
          "竟",
          "敬",
          "靖",
          "境",
          "獍",
          "静",
          "镜"
        ],
        "pinyin_without_tone": "jing"
      },
    ]
  },
  "jiu": {
    "pinyin_without_tone": "jiu",
    "option_list": [
      {
        "pinyin": "jiū",
        "tone": 1,
        "char": "究",
        "char_list": [
          "纠",
          "究",
          "揪"
        ],
        "pinyin_without_tone": "jiu"
      },
      {
        "pinyin": "jiǔ",
        "tone": 3,
        "char": "久",
        "char_list": [
          "九",
          "久",
          "灸",
          "玖",
          "韭",
          "酒"
        ],
        "pinyin_without_tone": "jiu"
      },
      {
        "pinyin": "jiù",
        "tone": 4,
        "char": "旧",
        "char_list": [
          "旧",
          "臼",
          "疚",
          "救",
          "就",
          "舅",
          "僦"
        ],
        "pinyin_without_tone": "jiu"
      },
    ]
  },
  "ju": {
    "pinyin_without_tone": "ju",
    "option_list": [
      {
        "pinyin": "jū",
        "tone": 1,
        "char": "居",
        "char_list": [
          "居",
          "拘",
          "泃",
          "驹",
          "娵",
          "崌",
          "鞠"
        ],
        "pinyin_without_tone": "ju"
      },
      {
        "pinyin": "jú",
        "tone": 2,
        "char": "局",
        "char_list": [
          "局",
          "局",
          "桔",
          "菊",
          "橘"
        ],
        "pinyin_without_tone": "ju"
      },
      {
        "pinyin": "jǔ",
        "tone": 3,
        "char": "举",
        "char_list": [
          "弆",
          "沮",
          "举",
          "矩",
          "矩",
          "筥"
        ],
        "pinyin_without_tone": "ju"
      },
      {
        "pinyin": "jù",
        "tone": 4,
        "char": "巨",
        "char_list": [
          "巨",
          "句",
          "岠",
          "拒",
          "具",
          "炬",
          "秬",
          "钜",
          "俱",
          "剧",
          "惧",
          "据",
          "距",
          "锯",
          "窭",
          "聚",
          "澽",
          "醵"
        ],
        "pinyin_without_tone": "ju"
      },
    ]
  },
  "juan": {
    "pinyin_without_tone": "juan",
    "option_list": [
      {
        "pinyin": "juān",
        "tone": 1,
        "char": "鹃",
        "char_list": [
          "娟",
          "捐",
          "焆",
          "鹃"
        ],
        "pinyin_without_tone": "juan"
      },
      {
        "pinyin": "juǎn",
        "tone": 3,
        "char": "卷",
        "char_list": [
          "卷"
        ],
        "pinyin_without_tone": "juan"
      },
      {
        "pinyin": "juàn",
        "tone": 4,
        "char": "绢",
        "char_list": [
          "倦",
          "桊",
          "绢",
          "眷"
        ],
        "pinyin_without_tone": "juan"
      }
    ]
  },
  "jue": {
    "pinyin_without_tone": "jue",
    "option_list": [
      {
        "pinyin": "jué",
        "tone": 2,
        "char": "绝",
        "char_list": [
          "决",
          "诀",
          "绝",
          "觉",
          "倔",
          "崛",
          "掘",
          "觖",
          "傕",
          "劂",
          "爵",
          "嚼"
        ],
        "pinyin_without_tone": "jue"
      },
    ]
  },
  "jun": {
    "pinyin_without_tone": "jun",
    "option_list": [
      {
        "pinyin": "jūn",
        "tone": 1,
        "char": "君",
        "char_list": [
          "军",
          "君",
          "均",
          "钧",
          "莙",
          "菌",
          "鲪"
        ],
        "pinyin_without_tone": "jun"
      },
      {
        "pinyin": "jùn",
        "tone": 4,
        "char": "俊",
        "char_list": [
          "俊",
          "俊",
          "峻",
          "骏",
          "晙",
          "焌",
          "畯",
          "竣"
        ],
        "pinyin_without_tone": "jun"
      },
      {
        "pinyin": "jùn",
        "tone": 4,
        "char": "珺",
        "char_list": [
          "珺",
          "䐃"
        ],
        "pinyin_without_tone": "jun"
      }
    ]
  },
  "ka": {
    "pinyin_without_tone": "ka",
    "option_list": [
      {
        "pinyin": "kǎ",
        "tone": 3,
        "char": "卡",
        "char_list": [
          "卡",
          "胩"
        ],
        "pinyin_without_tone": "ka"
      },
    ]
  },
  "kai": {
    "pinyin_without_tone": "kai",
    "option_list": [
      {
        "pinyin": "kāi",
        "tone": 1,
        "char": "开",
        "char_list": [
          "开",
          "揩",
          "锎"
        ],
        "pinyin_without_tone": "kai"
      },
      {
        "pinyin": "kǎi",
        "tone": 3,
        "char": "凯",
        "char_list": [
          "凯",
          "垲",
          "慨",
          "蒈",
          "楷"
        ],
        "pinyin_without_tone": "kai"
      },
    ]
  },
  "kan": {
    "pinyin_without_tone": "kan",
    "option_list": [
      {
        "pinyin": "kān",
        "tone": 1,
        "char": "刊",
        "char_list": [
          "刊",
          "勘",
          "堪",
          "嵁"
        ],
        "pinyin_without_tone": "kan"
      },
      {
        "pinyin": "kǎn",
        "tone": 3,
        "char": "坎",
        "char_list": [
          "坎",
          "砍",
          "莰",
          "槛"
        ],
        "pinyin_without_tone": "kan"
      },
      {
        "pinyin": "kàn",
        "tone": 4,
        "char": "墈",
        "char_list": [
          "看",
          "衎",
          "崁",
          "墈",
          "磡"
        ],
        "pinyin_without_tone": "kan"
      },
    ]
  },
  "kang": {
    "pinyin_without_tone": "kang",
    "option_list": [
      {
        "pinyin": "kāng",
        "tone": 1,
        "char": "康",
        "char_list": [
          "康",
          "慷",
          "糠"
        ],
        "pinyin_without_tone": "kang"
      },
      {
        "pinyin": "kàng",
        "tone": 4,
        "char": "抗",
        "char_list": [
          "闶",
          "亢",
          "抗",
          "炕",
          "钪"
        ],
        "pinyin_without_tone": "kang"
      },
    ]
  },
  "kao": {
    "pinyin_without_tone": "kao",
    "option_list": [
      {
        "pinyin": "kǎo",
        "tone": 3,
        "char": "考",
        "char_list": [
          "考",
          "拷",
          "烤"
        ],
        "pinyin_without_tone": "kao"
      },
      {
        "pinyin": "kào",
        "tone": 4,
        "char": "靠",
        "char_list": [
          "铐",
          "靠"
        ],
        "pinyin_without_tone": "kao"
      },
    ]
  },
  "ke": {
    "pinyin_without_tone": "ke",
    "option_list": [
      {
        "pinyin": "kē",
        "tone": 1,
        "char": "科",
        "char_list": [
          "苛",
          "科",
          "棵",
          "颗",
          "磕",
          "蝌"
        ],
        "pinyin_without_tone": "ke"
      },
      {
        "pinyin": "ké",
        "tone": 2,
        "char": "壳",
        "char_list": [
          "壳"
        ],
        "pinyin_without_tone": "ke"
      },
      {
        "pinyin": "kě",
        "tone": 3,
        "char": "可",
        "char_list": [
          "可",
          "坷",
          "炣",
          "渴"
        ],
        "pinyin_without_tone": "ke"
      },
      {
        "pinyin": "kè",
        "tone": 4,
        "char": "客",
        "char_list": [
          "克",
          "刻",
          "客",
          "课"
        ],
        "pinyin_without_tone": "ke"
      },
    ]
  },
  "ken": {
    "pinyin_without_tone": "ken",
    "option_list": [
      {
        "pinyin": "kěn",
        "tone": 3,
        "char": "肯",
        "char_list": [
          "肯",
          "垦",
          "恳",
          "啃"
        ],
        "pinyin_without_tone": "ken"
      }
    ]
  },
  "kong": {
    "pinyin_without_tone": "kong",
    "option_list": [
      {
        "pinyin": "kōng",
        "tone": 1,
        "char": "空",
        "char_list": [
          "空",
          "埪",
          "硿"
        ],
        "pinyin_without_tone": "kong"
      },
      {
        "pinyin": "kǒng",
        "tone": 3,
        "char": "孔",
        "char_list": [
          "孔",
          "恐"
        ],
        "pinyin_without_tone": "kong"
      },
    ]
  },
  "kou": {
    "pinyin_without_tone": "kou",
    "option_list": [
      {
        "pinyin": "kòu",
        "tone": 4,
        "char": "寇",
        "char_list": [
          "叩",
          "扣",
          "寇",
          "筘"
        ],
        "pinyin_without_tone": "kou"
      },
    ]
  },
  "ku": {
    "pinyin_without_tone": "ku",
    "option_list": [
      {
        "pinyin": "kù",
        "tone": 4,
        "char": "库",
        "char_list": [
          "库",
          "裤",
          "酷"
        ],
        "pinyin_without_tone": "ku"
      },
    ]
  },
  "kua": {
    "pinyin_without_tone": "kua",
    "option_list": [
      {
        "pinyin": "kuā",
        "tone": 1,
        "char": "夸",
        "char_list": [
          "夸",
          "姱"
        ],
        "pinyin_without_tone": "kua"
      },
    ]
  },
  "kuai": {
    "pinyin_without_tone": "kuai",
    "option_list": [
      {
        "pinyin": "kuài",
        "tone": 4,
        "char": "快",
        "char_list": [
          "块",
          "快",
          "郐",
          "筷",
          "鲙"
        ],
        "pinyin_without_tone": "kuai"
      }
    ]
  },
  "kuan": {
    "pinyin_without_tone": "kuan",
    "option_list": [
      {
        "pinyin": "kuān",
        "tone": 1,
        "char": "宽",
        "char_list": [
          "宽"
        ],
        "pinyin_without_tone": "kuan"
      },
      {
        "pinyin": "kuǎn",
        "tone": 3,
        "char": "款",
        "char_list": [
          "款"
        ],
        "pinyin_without_tone": "kuan"
      }
    ]
  },
  "kuang": {
    "pinyin_without_tone": "kuang",
    "option_list": [
      {
        "pinyin": "kuāng",
        "tone": 1,
        "char": "框",
        "char_list": [
          "洭",
          "框",
          "筐"
        ],
        "pinyin_without_tone": "kuang"
      },
      {
        "pinyin": "kuáng",
        "tone": 2,
        "char": "狂",
        "char_list": [
          "狂"
        ],
        "pinyin_without_tone": "kuang"
      },
      {
        "pinyin": "kuàng",
        "tone": 4,
        "char": "况",
        "char_list": [
          "纩",
          "况",
          "旷",
          "矿",
          "眶"
        ],
        "pinyin_without_tone": "kuang"
      },
    ]
  },
  "kui": {
    "pinyin_without_tone": "kui",
    "option_list": [
      {
        "pinyin": "kuí",
        "tone": 2,
        "char": "葵",
        "char_list": [
          "葵",
          "戣",
          "魁",
          "櫆"
        ],
        "pinyin_without_tone": "kui"
      },
      {
        "pinyin": "kuì",
        "tone": 4,
        "char": "馈",
        "char_list": [
          "愧",
          "溃",
          "蒉",
          "馈"
        ],
        "pinyin_without_tone": "kui"
      },
    ]
  },
  "kun": {
    "pinyin_without_tone": "kun",
    "option_list": [
      {
        "pinyin": "kūn",
        "tone": 1,
        "char": "昆",
        "char_list": [
          "坤",
          "昆",
          "昆",
          "鹍"
        ],
        "pinyin_without_tone": "kun"
      },
      {
        "pinyin": "kùn",
        "tone": 4,
        "char": "困",
        "char_list": [
          "困"
        ],
        "pinyin_without_tone": "kun"
      },
      {
        "pinyin": "kūn",
        "tone": 1,
        "char": "堃",
        "char_list": [
          "堃",
          "裈",
          "婫"
        ],
        "pinyin_without_tone": "kun"
      }
    ]
  },
  "kuo": {
    "pinyin_without_tone": "kuo",
    "option_list": [
      {
        "pinyin": "kuò",
        "tone": 4,
        "char": "阔",
        "char_list": [
          "扩",
          "括",
          "阔",
          "廓"
        ],
        "pinyin_without_tone": "kuo"
      }
    ]
  },
  "la": {
    "pinyin_without_tone": "la",
    "option_list": [
      {
        "pinyin": "lā",
        "tone": 1,
        "char": "垃",
        "char_list": [
          "垃",
          "拉"
        ],
        "pinyin_without_tone": "la"
      },
      {
        "pinyin": "là",
        "tone": 4,
        "char": "腊",
        "char_list": [
          "腊",
          "蜡",
          "辣",
          "蝲"
        ],
        "pinyin_without_tone": "la"
      },
    ]
  },
  "lai": {
    "pinyin_without_tone": "lai",
    "option_list": [
      {
        "pinyin": "lái",
        "tone": 2,
        "char": "来",
        "char_list": [
          "来",
          "俫",
          "莱",
          "梾"
        ],
        "pinyin_without_tone": "lai"
      },
      {
        "pinyin": "lài",
        "tone": 4,
        "char": "赖",
        "char_list": [
          "睐",
          "赖"
        ],
        "pinyin_without_tone": "lai"
      }
    ]
  },
  "lan": {
    "pinyin_without_tone": "lan",
    "option_list": [
      {
        "pinyin": "lán",
        "tone": 2,
        "char": "兰",
        "char_list": [
          "兰",
          "拦",
          "栏",
          "婪",
          "蓝",
          "澜",
          "篮",
          "襕"
        ],
        "pinyin_without_tone": "lan"
      },
      {
        "pinyin": "lǎn",
        "tone": 3,
        "char": "览",
        "char_list": [
          "览",
          "揽",
          "缆",
          "榄",
          "漤",
          "懒"
        ],
        "pinyin_without_tone": "lan"
      },
      {
        "pinyin": "làn",
        "tone": 4,
        "char": "滥",
        "char_list": [
          "烂",
          "滥"
        ],
        "pinyin_without_tone": "lan"
      }
    ]
  },
  "lang": {
    "pinyin_without_tone": "lang",
    "option_list": [
      {
        "pinyin": "láng",
        "tone": 2,
        "char": "廊",
        "char_list": [
          "郎",
          "狼",
          "廊",
          "琅",
          "榔"
        ],
        "pinyin_without_tone": "lang"
      },
      {
        "pinyin": "lǎng",
        "tone": 3,
        "char": "朗",
        "char_list": [
          "朗",
          "塱",
          "蓢"
        ],
        "pinyin_without_tone": "lang"
      },
      {
        "pinyin": "làng",
        "tone": 4,
        "char": "浪",
        "char_list": [
          "埌",
          "浪"
        ],
        "pinyin_without_tone": "lang"
      },
    ]
  },
  "lao": {
    "pinyin_without_tone": "lao",
    "option_list": [
      {
        "pinyin": "láo",
        "tone": 2,
        "char": "劳",
        "char_list": [
          "劳",
          "牢",
          "唠",
          "铹"
        ],
        "pinyin_without_tone": "lao"
      },
      {
        "pinyin": "lǎo",
        "tone": 3,
        "char": "老",
        "char_list": [
          "老",
          "姥",
          "橑"
        ],
        "pinyin_without_tone": "lao"
      },
    ]
  },
  "le": {
    "pinyin_without_tone": "le",
    "option_list": [

      {
        "pinyin": "lè",
        "tone": 4,
        "char": "乐",
        "char_list": [
          "乐",
          "簕"
        ],
        "pinyin_without_tone": "le"
      },

    ]
  },
  "lei": {
    "pinyin_without_tone": "lei",
    "option_list": [
      {
        "pinyin": "lēi",
        "tone": 1,
        "char": "勒",
        "char_list": [
          "勒"
        ],
        "pinyin_without_tone": "lei"
      },
      {
        "pinyin": "léi",
        "tone": 2,
        "char": "雷",
        "char_list": [
          "雷",
          "擂",
          "檑",
          "礌",
          "罍",
          "累"
        ],
        "pinyin_without_tone": "lei"
      },
      {
        "pinyin": "lěi",
        "tone": 3,
        "char": "垒",
        "char_list": [
          "垒",
          "磊",
          "蕾",
          "藟"
        ],
        "pinyin_without_tone": "lei"
      },
      {
        "pinyin": "lèi",
        "tone": 4,
        "char": "泪",
        "char_list": [
          "泪",
          "类"
        ],
        "pinyin_without_tone": "lei"
      },
    ]
  },
  "leng": {
    "pinyin_without_tone": "leng",
    "option_list": [
      {
        "pinyin": "lěng",
        "tone": 3,
        "char": "冷",
        "char_list": [
          "冷"
        ],
        "pinyin_without_tone": "leng"
      },
      {
        "pinyin": "léng",
        "tone": 2,
        "char": "棱",
        "char_list": [
          "棱",
          "楞"
        ],
        "pinyin_without_tone": "leng"
      },
    ]
  },
  "li": {
    "pinyin_without_tone": "li",
    "option_list": [
      {
        "pinyin": "lí",
        "tone": 2,
        "char": "黎",
        "char_list": [
          "厘",
          "厘",
          "狸",
          "离",
          "梨",
          "犁",
          "漓",
          "璃",
          "黎",
          "篱",
          "醨"
        ],
        "pinyin_without_tone": "li"
      },
      {
        "pinyin": "lǐ",
        "tone": 3,
        "char": "礼",
        "char_list": [
          "礼",
          "李",
          "里",
          "峛",
          "理",
          "鲤"
        ],
        "pinyin_without_tone": "li"
      },
      {
        "pinyin": "lì",
        "tone": 4,
        "char": "丽",
        "char_list": [
          "力",
          "历",
          "厉",
          "立",
          "吏",
          "朸",
          "丽",
          "利",
          "励",
          "坜",
          "沥",
          "例",
          "隶",
          "俐",
          "荔",
          "轹",
          "栗",
          "珕",
          "砾",
          "莉",
          "粒",
          "凓",
          "痢",
          "雳"
        ],
        "pinyin_without_tone": "li"
      },
    ]
  },
  "lian": {
    "pinyin_without_tone": "lian",
    "option_list": [
      {
        "pinyin": "lián",
        "tone": 2,
        "char": "莲",
        "char_list": [
          "连",
          "帘",
          "怜",
          "莲",
          "联",
          "廉",
          "磏",
          "镰"
        ],
        "pinyin_without_tone": "lian"
      },
      {
        "pinyin": "liǎn",
        "tone": 3,
        "char": "脸",
        "char_list": [
          "敛",
          "脸",
          "裣",
          "蔹"
        ],
        "pinyin_without_tone": "lian"
      },
      {
        "pinyin": "liàn",
        "tone": 4,
        "char": "恋",
        "char_list": [
          "练",
          "炼",
          "恋",
          "浰",
          "链",
          "瑓"
        ],
        "pinyin_without_tone": "lian"
      },
    ]
  },
  "liang": {
    "pinyin_without_tone": "liang",
    "option_list": [
      {
        "pinyin": "liáng",
        "tone": 2,
        "char": "凉",
        "char_list": [
          "良",
          "凉",
          "梁",
          "辌",
          "粮",
          "粱",
          "墚"
        ],
        "pinyin_without_tone": "liang"
      },
      {
        "pinyin": "liǎng",
        "tone": 3,
        "char": "两",
        "char_list": [
          "两"
        ],
        "pinyin_without_tone": "liang"
      },
      {
        "pinyin": "liàng",
        "tone": 4,
        "char": "亮",
        "char_list": [
          "亮",
          "谅",
          "辆",
          "晾",
          "量"
        ],
        "pinyin_without_tone": "liang"
      },
    ]
  },
  "liao": {
    "pinyin_without_tone": "liao",
    "option_list": [
      {
        "pinyin": "liáo",
        "tone": 2,
        "char": "辽",
        "char_list": [
          "辽",
          "疗",
          "聊",
          "僚",
          "寥",
          "漻",
          "嘹",
          "缭",
          "簝",
          "髎"
        ],
        "pinyin_without_tone": "liao"
      },
      {
        "pinyin": "liào",
        "tone": 4,
        "char": "料",
        "char_list": [
          "料"
        ],
        "pinyin_without_tone": "liao"
      },
    ]
  },
  "lie": {
    "pinyin_without_tone": "lie",
    "option_list": [
      {
        "pinyin": "liè",
        "tone": 4,
        "char": "列",
        "char_list": [
          "列",
          "劣",
          "烈",
          "猎",
          "裂"
        ],
        "pinyin_without_tone": "lie"
      },
    ]
  },
  "lin": {
    "pinyin_without_tone": "lin",
    "option_list": [
      {
        "pinyin": "lín",
        "tone": 2,
        "char": "临",
        "char_list": [
          "邻",
          "林",
          "临",
          "淋",
          "琳",
          "箖",
          "潾",
          "瞵",
          "磷",
          "鳞"
        ],
        "pinyin_without_tone": "lin"
      },
      {
        "pinyin": "lǐn",
        "tone": 3,
        "char": "凛",
        "char_list": [
          "凛",
          "懔"
        ],
        "pinyin_without_tone": "lin"
      },
    ]
  },
  "ling": {
    "pinyin_without_tone": "ling",
    "option_list": [
      {
        "pinyin": "líng",
        "tone": 2,
        "char": "铃",
        "char_list": [
          "伶",
          "灵",
          "坽",
          "姈",
          "昤",
          "柃",
          "玲",
          "凌",
          "铃",
          "陵",
          "鸰",
          "羚",
          "聆",
          "舲",
          "菱",
          "零",
          "龄",
          "澪"
        ],
        "pinyin_without_tone": "ling"
      },
      {
        "pinyin": "lǐng",
        "tone": 3,
        "char": "岭",
        "char_list": [
          "岭",
          "领"
        ],
        "pinyin_without_tone": "ling"
      },
      {
        "pinyin": "lìng",
        "tone": 4,
        "char": "令",
        "char_list": [
          "令",
          "另"
        ],
        "pinyin_without_tone": "ling"
      },
    ]
  },
  "liu": {
    "pinyin_without_tone": "liu",
    "option_list": [
      {
        "pinyin": "liú",
        "tone": 2,
        "char": "流",
        "char_list": [
          "刘",
          "浏",
          "流",
          "留",
          "琉",
          "硫",
          "榴",
          "飗",
          "瑬",
          "瘤",
          "鹠",
          "疁"
        ],
        "pinyin_without_tone": "liu"
      },
      {
        "pinyin": "liǔ",
        "tone": 3,
        "char": "柳",
        "char_list": [
          "柳",
          "珋",
          "锍"
        ],
        "pinyin_without_tone": "liu"
      },
      {
        "pinyin": "liù",
        "tone": 4,
        "char": "六",
        "char_list": [
          "馏",
          "六",
          "鹨"
        ],
        "pinyin_without_tone": "liu"
      },
    ]
  },
  "long": {
    "pinyin_without_tone": "long",
    "option_list": [
      {
        "pinyin": "lóng",
        "tone": 2,
        "char": "隆",
        "char_list": [
          "龙",
          "咙",
          "昽",
          "胧",
          "笼",
          "聋",
          "隆",
          "窿"
        ],
        "pinyin_without_tone": "long"
      },
      {
        "pinyin": "lǒng",
        "tone": 3,
        "char": "垄",
        "char_list": [
          "垄",
          "拢"
        ],
        "pinyin_without_tone": "long"
      },
    ]
  },
  "lou": {
    "pinyin_without_tone": "lou",
    "option_list": [
      {
        "pinyin": "lóu",
        "tone": 2,
        "char": "楼",
        "char_list": [
          "剅",
          "娄",
          "楼"
        ],
        "pinyin_without_tone": "lou"
      },
      {
        "pinyin": "lòu",
        "tone": 4,
        "char": "陋",
        "char_list": [
          "陋",
          "漏"
        ],
        "pinyin_without_tone": "lou"
      },
    ]
  },
  "lu": {
    "pinyin_without_tone": "lu",
    "option_list": [
      {
        "pinyin": "lú",
        "tone": 2,
        "char": "芦",
        "char_list": [
          "卢",
          "庐",
          "芦",
          "炉",
          "颅"
        ],
        "pinyin_without_tone": "lu"
      },
      {
        "pinyin": "lǔ",
        "tone": 3,
        "char": "鲁",
        "char_list": [
          "卤",
          "虏",
          "鲁",
          "澛",
          "镥"
        ],
        "pinyin_without_tone": "lu"
      },
      {
        "pinyin": "lù",
        "tone": 4,
        "char": "陆",
        "char_list": [
          "甪",
          "陆",
          "录",
          "录",
          "赂",
          "菉",
          "鹿",
          "琭",
          "禄",
          "勠",
          "碌",
          "稑",
          "路",
          "蕗",
          "簏",
          "露"
        ],
        "pinyin_without_tone": "lu"
      },
    ]
  },
  "lü": {
    "pinyin_without_tone": "lü",
    "option_list": [
      {
        "pinyin": "lǚ",
        "tone": 3,
        "char": "旅",
        "char_list": [
          "吕",
          "侣",
          "旅",
          "梠",
          "稆",
          "屡",
          "缕",
          "履"
        ],
        "pinyin_without_tone": "lü"
      },
      {
        "pinyin": "lǜ",
        "tone": 4,
        "char": "律",
        "char_list": [
          "垏",
          "律",
          "虑",
          "率",
          "绿",
          "氯",
          "葎",
          "滤"
        ],
        "pinyin_without_tone": "lü"
      },
    ]
  },
  "luan": {
    "pinyin_without_tone": "luan",
    "option_list": [
      {
        "pinyin": "luǎn",
        "tone": 3,
        "char": "卵",
        "char_list": [
          "卵"
        ],
        "pinyin_without_tone": "luan"
      },
      {
        "pinyin": "luàn",
        "tone": 4,
        "char": "乱",
        "char_list": [
          "乱"
        ],
        "pinyin_without_tone": "luan"
      },
      {
        "pinyin": "luán",
        "tone": 2,
        "char": "峦",
        "char_list": [
          "峦"
        ],
        "pinyin_without_tone": "luan"
      }
    ]
  },
  "lüe": {
    "pinyin_without_tone": "lüe",
    "option_list": [
      {
        "pinyin": "lüè",
        "tone": 4,
        "char": "掠",
        "char_list": [
          "掠",
          "略",
          "锊"
        ],
        "pinyin_without_tone": "lüe"
      },
    ]
  },
  "lun": {
    "pinyin_without_tone": "lun",
    "option_list": [
      {
        "pinyin": "lún",
        "tone": 2,
        "char": "轮",
        "char_list": [
          "仑",
          "伦",
          "沦",
          "轮"
        ],
        "pinyin_without_tone": "lun"
      },
      {
        "pinyin": "lùn",
        "tone": 4,
        "char": "论",
        "char_list": [
          "论"
        ],
        "pinyin_without_tone": "lun"
      },
    ]
  },
  "luo": {
    "pinyin_without_tone": "luo",
    "option_list": [
      {
        "pinyin": "luó",
        "tone": 2,
        "char": "罗",
        "char_list": [
          "罗",
          "脶",
          "萝",
          "逻",
          "锣",
          "箩",
          "骡",
          "螺"
        ],
        "pinyin_without_tone": "luo"
      },
      {
        "pinyin": "luò",
        "tone": 4,
        "char": "洛",
        "char_list": [
          "洛",
          "络",
          "骆",
          "落"
        ],
        "pinyin_without_tone": "luo"
      },
    ]
  },
  "ma": {
    "pinyin_without_tone": "ma",
    "option_list": [

      {
        "pinyin": "mā",
        "tone": 1,
        "char": "妈",
        "char_list": [
          "妈"
        ],
        "pinyin_without_tone": "ma"
      },
      {
        "pinyin": "má",
        "tone": 2,
        "char": "麻",
        "char_list": [
          "麻",
          "蟆"
        ],
        "pinyin_without_tone": "ma"
      },
      {
        "pinyin": "mǎ",
        "tone": 3,
        "char": "马",
        "char_list": [
          "马",
          "玛",
          "码",
          "蚂"
        ],
        "pinyin_without_tone": "ma"
      },
    ]
  },
  "mai": {
    "pinyin_without_tone": "mai",
    "option_list": [
      {
        "pinyin": "mǎi",
        "tone": 3,
        "char": "买",
        "char_list": [
          "买"
        ],
        "pinyin_without_tone": "mai"
      },
      {
        "pinyin": "mài",
        "tone": 4,
        "char": "迈",
        "char_list": [
          "迈",
          "麦",
          "卖",
          "脉"
        ],
        "pinyin_without_tone": "mai"
      }
    ]
  },
  "man": {
    "pinyin_without_tone": "man",
    "option_list": [
      {
        "pinyin": "mǎn",
        "tone": 3,
        "char": "满",
        "char_list": [
          "满"
        ],
        "pinyin_without_tone": "man"
      },
      {
        "pinyin": "màn",
        "tone": 4,
        "char": "漫",
        "char_list": [
          "曼",
          "慢",
          "漫",
          "蔓"
        ],
        "pinyin_without_tone": "man"
      },
    ]
  },
  "mang": {
    "pinyin_without_tone": "mang",
    "option_list": [
      {
        "pinyin": "máng",
        "tone": 2,
        "char": "芒",
        "char_list": [
          "忙",
          "芒",
          "尨",
          "杧",
          "氓",
          "盲",
          "茫",
          "牻"
        ],
        "pinyin_without_tone": "mang"
      },
      {
        "pinyin": "mǎng",
        "tone": 3,
        "char": "莽",
        "char_list": [
          "莽"
        ],
        "pinyin_without_tone": "mang"
      }
    ]
  },
  "mao": {
    "pinyin_without_tone": "mao",
    "option_list": [
      {
        "pinyin": "máo",
        "tone": 2,
        "char": "茅",
        "char_list": [
          "毛",
          "矛",
          "茅",
          "锚"
        ],
        "pinyin_without_tone": "mao"
      },
      {
        "pinyin": "mào",
        "tone": 4,
        "char": "茂",
        "char_list": [
          "茂",
          "冒",
          "贸",
          "帽",
          "鄚",
          "楙",
          "貌"
        ],
        "pinyin_without_tone": "mao"
      },
    ]
  },
  "mei": {
    "pinyin_without_tone": "mei",
    "option_list": [
      {
        "pinyin": "méi",
        "tone": 2,
        "char": "梅",
        "char_list": [
          "没",
          "枚",
          "玫",
          "眉",
          "梅",
          "媒",
          "煤",
          "瑂",
          "镅",
          "霉"
        ],
        "pinyin_without_tone": "mei"
      },
      {
        "pinyin": "měi",
        "tone": 3,
        "char": "美",
        "char_list": [
          "每",
          "美",
          "浼",
          "渼"
        ],
        "pinyin_without_tone": "mei"
      },
      {
        "pinyin": "mèi",
        "tone": 4,
        "char": "妹",
        "char_list": [
          "妹",
          "昧",
          "媚",
          "魅"
        ],
        "pinyin_without_tone": "mei"
      },
    ]
  },
  "men": {
    "pinyin_without_tone": "men",
    "option_list": [
      {
        "pinyin": "mén",
        "tone": 2,
        "char": "门",
        "char_list": [
          "门",
          "钔"
        ],
        "pinyin_without_tone": "men"
      },
    ]
  },
  "meng": {
    "pinyin_without_tone": "meng",
    "option_list": [
      {
        "pinyin": "méng",
        "tone": 2,
        "char": "萌",
        "char_list": [
          "萌",
          "盟",
          "蒙",
          "蒙",
          "蒙",
          "朦",
          "檬",
          "礞",
          "鹲"
        ],
        "pinyin_without_tone": "meng"
      },
      {
        "pinyin": "měng",
        "tone": 3,
        "char": "猛",
        "char_list": [
          "猛",
          "锰"
        ],
        "pinyin_without_tone": "meng"
      },
      {
        "pinyin": "mèng",
        "tone": 4,
        "char": "梦",
        "char_list": [
          "孟",
          "梦"
        ],
        "pinyin_without_tone": "meng"
      },
    ]
  },
  "mi": {
    "pinyin_without_tone": "mi",
    "option_list": [
      {
        "pinyin": "mī",
        "tone": 1,
        "char": "眯",
        "char_list": [
          "咪",
          "眯"
        ],
        "pinyin_without_tone": "mi"
      },
      {
        "pinyin": "mí",
        "tone": 2,
        "char": "迷",
        "char_list": [
          "弥",
          "迷",
          "谜",
          "靡",
          "蘼",
          "醾"
        ],
        "pinyin_without_tone": "mi"
      },
      {
        "pinyin": "mǐ",
        "tone": 3,
        "char": "米",
        "char_list": [
          "米",
          "芈",
          "洣",
          "敉"
        ],
        "pinyin_without_tone": "mi"
      },
      {
        "pinyin": "mì",
        "tone": 4,
        "char": "密",
        "char_list": [
          "泌",
          "觅",
          "秘",
          "密",
          "蜜"
        ],
        "pinyin_without_tone": "mi"
      }
    ]
  },
  "mian": {
    "pinyin_without_tone": "mian",
    "option_list": [
      {
        "pinyin": "mián",
        "tone": 2,
        "char": "绵",
        "char_list": [
          "眠",
          "绵",
          "棉"
        ],
        "pinyin_without_tone": "mian"
      },
      {
        "pinyin": "miǎn",
        "tone": 3,
        "char": "勉",
        "char_list": [
          "免",
          "勉",
          "偭",
          "勔",
          "愐",
          "缅"
        ],
        "pinyin_without_tone": "mian"
      },
      {
        "pinyin": "miàn",
        "tone": 4,
        "char": "面",
        "char_list": [
          "面"
        ],
        "pinyin_without_tone": "mian"
      },

    ]
  },
  "miao": {
    "pinyin_without_tone": "miao",
    "option_list": [
      {
        "pinyin": "miáo",
        "tone": 2,
        "char": "苗",
        "char_list": [
          "苗",
          "描",
          "瞄"
        ],
        "pinyin_without_tone": "miao"
      },
      {
        "pinyin": "miǎo",
        "tone": 3,
        "char": "秒",
        "char_list": [
          "秒",
          "淼",
          "渺",
          "藐"
        ],
        "pinyin_without_tone": "miao"
      },
      {
        "pinyin": "miào",
        "tone": 4,
        "char": "妙",
        "char_list": [
          "妙",
          "庙"
        ],
        "pinyin_without_tone": "miao"
      }
    ]
  },
  "mie": {
    "pinyin_without_tone": "mie",
    "option_list": [
      {
        "pinyin": "miè",
        "tone": 4,
        "char": "灭",
        "char_list": [
          "灭",
          "蔑"
        ],
        "pinyin_without_tone": "mie"
      }
    ]
  },
  "min": {
    "pinyin_without_tone": "min",
    "option_list": [
      {
        "pinyin": "mín",
        "tone": 2,
        "char": "民",
        "char_list": [
          "民",
          "苠"
        ],
        "pinyin_without_tone": "min"
      },
      {
        "pinyin": "mǐn",
        "tone": 3,
        "char": "敏",
        "char_list": [
          "皿",
          "闽",
          "悯",
          "敏",
          "湣",
          "愍",
          "鳘"
        ],
        "pinyin_without_tone": "min"
      },

    ]
  },
  "ming": {
    "pinyin_without_tone": "ming",
    "option_list": [
      {
        "pinyin": "míng",
        "tone": 2,
        "char": "明",
        "char_list": [
          "名",
          "明",
          "鸣",
          "洺",
          "冥",
          "铭",
          "蓂"
        ],
        "pinyin_without_tone": "ming"
      },
      {
        "pinyin": "mìng",
        "tone": 4,
        "char": "命",
        "char_list": [
          "命"
        ],
        "pinyin_without_tone": "ming"
      }
    ]
  },
  "mo": {
    "pinyin_without_tone": "mo",
    "option_list": [

      {
        "pinyin": "mó",
        "tone": 2,
        "char": "模",
        "char_list": [
          "馍",
          "摹",
          "模",
          "膜",
          "摩",
          "磨",
          "蘑",
          "魔"
        ],
        "pinyin_without_tone": "mo"
      },
      {
        "pinyin": "mǒ",
        "tone": 3,
        "char": "抹",
        "char_list": [
          "抹"
        ],
        "pinyin_without_tone": "mo"
      },
      {
        "pinyin": "mò",
        "tone": 4,
        "char": "陌",
        "char_list": [
          "末",
          "沫",
          "茉",
          "陌",
          "莫",
          "寞",
          "漠",
          "镆",
          "墨",
          "默",
          "藦"
        ],
        "pinyin_without_tone": "mo"
      },
    ]
  },
  "mou": {
    "pinyin_without_tone": "mou",
    "option_list": [
      {
        "pinyin": "móu",
        "tone": 2,
        "char": "谋",
        "char_list": [
          "谋",
          "蛑"
        ],
        "pinyin_without_tone": "mou"
      },
    ]
  },
  "mu": {
    "pinyin_without_tone": "mu",
    "option_list": [
      {
        "pinyin": "mǔ",
        "tone": 3,
        "char": "亩",
        "char_list": [
          "母",
          "亩",
          "牡",
          "姆",
          "拇"
        ],
        "pinyin_without_tone": "mu"
      },
      {
        "pinyin": "mù",
        "tone": 4,
        "char": "牧",
        "char_list": [
          "木",
          "目",
          "沐",
          "牧",
          "募",
          "墓",
          "幕",
          "睦",
          "慕",
          "暮",
          "穆"
        ],
        "pinyin_without_tone": "mu"
      },
    ]
  },
  "na": {
    "pinyin_without_tone": "na",
    "option_list": [
      {
        "pinyin": "nà",
        "tone": 4,
        "char": "纳",
        "char_list": [
          "那",
          "呐",
          "纳",
          "肭",
          "娜",
          "钠",
          "捺"
        ],
        "pinyin_without_tone": "na"
      }
    ]
  },
  "nai": {
    "pinyin_without_tone": "nai",
    "option_list": [
      {
        "pinyin": "nǎi",
        "tone": 3,
        "char": "乃",
        "char_list": [
          "乃",
          "奶",
          "你"
        ],
        "pinyin_without_tone": "nai"
      },
      {
        "pinyin": "nài",
        "tone": 4,
        "char": "耐",
        "char_list": [
          "镎",
          "奈",
          "耐"
        ],
        "pinyin_without_tone": "nai"
      },
    ]
  },
  "nan": {
    "pinyin_without_tone": "nan",
    "option_list": [
      {
        "pinyin": "nán",
        "tone": 2,
        "char": "南",
        "char_list": [
          "男",
          "南",
          "难"
        ],
        "pinyin_without_tone": "nan"
      },

    ]
  },

  "nao": {
    "pinyin_without_tone": "nao",
    "option_list": [

      {
        "pinyin": "nǎo",
        "tone": 3,
        "char": "瑙",
        "char_list": [
          "垴",
          "垴",
          "恼",
          "脑",
          "瑙"
        ],
        "pinyin_without_tone": "nao"
      },
    ]
  },
  "nei": {
    "pinyin_without_tone": "nei",
    "option_list": [
      {
        "pinyin": "nèi",
        "tone": 4,
        "char": "内",
        "char_list": [
          "内"
        ],
        "pinyin_without_tone": "nei"
      },
      {
        "pinyin": "něi",
        "tone": 3,
        "char": "馁",
        "char_list": [
          "馁"
        ],
        "pinyin_without_tone": "nei"
      }
    ]
  },
  "nen": {
    "pinyin_without_tone": "nen",
    "option_list": [
      {
        "pinyin": "nèn",
        "tone": 4,
        "char": "嫩",
        "char_list": [
          "嫩"
        ],
        "pinyin_without_tone": "nen"
      }
    ]
  },
  "neng": {
    "pinyin_without_tone": "neng",
    "option_list": [
      {
        "pinyin": "néng",
        "tone": 2,
        "char": "能",
        "char_list": [
          "能"
        ],
        "pinyin_without_tone": "neng"
      }
    ]
  },
  "ni": {
    "pinyin_without_tone": "ni",
    "option_list": [
      {
        "pinyin": "ní",
        "tone": 2,
        "char": "泥",
        "char_list": [
          "尼",
          "泥",
          "猊",
          "麑"
        ],
        "pinyin_without_tone": "ni"
      },
      {
        "pinyin": "nì",
        "tone": 4,
        "char": "逆",
        "char_list": [
          "伲",
          "逆",
          "匿",
          "溺",
          "腻"
        ],
        "pinyin_without_tone": "ni"
      },
      {
        "pinyin": "nī",
        "tone": 1,
        "char": "妮",
        "char_list": [
          "妮"
        ],
        "pinyin_without_tone": "ni"
      },
      {
        "pinyin": "nǐ",
        "tone": 3,
        "char": "拟",
        "char_list": [
          "拟",
          "薿"
        ],
        "pinyin_without_tone": "ni"
      },
    ]
  },
  "nian": {
    "pinyin_without_tone": "nian",
    "option_list": [
      {
        "pinyin": "nián",
        "tone": 2,
        "char": "年",
        "char_list": [
          "年"
        ],
        "pinyin_without_tone": "nian"
      },
      {
        "pinyin": "niàn",
        "tone": 4,
        "char": "念",
        "char_list": [
          "念"
        ],
        "pinyin_without_tone": "nian"
      },
    ]
  },
  "niang": {
    "pinyin_without_tone": "niang",
    "option_list": [
      {
        "pinyin": "niàng",
        "tone": 4,
        "char": "酿",
        "char_list": [
          "酿"
        ],
        "pinyin_without_tone": "niang"
      }
    ]
  },
  "niao": {
    "pinyin_without_tone": "niao",
    "option_list": [
      {
        "pinyin": "niǎo",
        "tone": 3,
        "char": "鸟",
        "char_list": [
          "鸟"
        ],
        "pinyin_without_tone": "niao"
      },
    ]
  },
  "ning": {
    "pinyin_without_tone": "ning",
    "option_list": [
      {
        "pinyin": "níng",
        "tone": 2,
        "char": "宁",
        "char_list": [
          "宁",
          "宁",
          "拧",
          "狞",
          "柠",
          "聍",
          "凝"
        ],
        "pinyin_without_tone": "ning"
      },
      {
        "pinyin": "nìng",
        "tone": 4,
        "char": "泞",
        "char_list": [
          "泞"
        ],
        "pinyin_without_tone": "ning"
      },
    ]
  },
  "niu": {
    "pinyin_without_tone": "niu",
    "option_list": [
      {
        "pinyin": "niú",
        "tone": 2,
        "char": "牛",
        "char_list": [
          "牛"
        ],
        "pinyin_without_tone": "niu"
      },
      {
        "pinyin": "niǔ",
        "tone": 3,
        "char": "纽",
        "char_list": [
          "扭",
          "狃",
          "纽",
          "钮"
        ],
        "pinyin_without_tone": "niu"
      }
    ]
  },
  "nong": {
    "pinyin_without_tone": "nong",
    "option_list": [
      {
        "pinyin": "nóng",
        "tone": 2,
        "char": "农",
        "char_list": [
          "农",
          "浓",
          "脓"
        ],
        "pinyin_without_tone": "nong"
      },
      {
        "pinyin": "nòng",
        "tone": 4,
        "char": "弄",
        "char_list": [
          "弄"
        ],
        "pinyin_without_tone": "nong"
      },
    ]
  },
  "nu": {
    "pinyin_without_tone": "nu",
    "option_list": [
      {
        "pinyin": "nú",
        "tone": 2,
        "char": "奴",
        "char_list": [
          "奴",
          "笯"
        ],
        "pinyin_without_tone": "nu"
      },
      {
        "pinyin": "nǔ",
        "tone": 3,
        "char": "努",
        "char_list": [
          "努",
          "砮"
        ],
        "pinyin_without_tone": "nu"
      },
      {
        "pinyin": "nù",
        "tone": 4,
        "char": "怒",
        "char_list": [
          "怒",
          "傉"
        ],
        "pinyin_without_tone": "nu"
      }
    ]
  },
  "nü": {
    "pinyin_without_tone": "nü",
    "option_list": [
      {
        "pinyin": "nǚ",
        "tone": 3,
        "char": "女",
        "char_list": [
          "女"
        ],
        "pinyin_without_tone": "nü"
      },
    ]
  },
  "nuan": {
    "pinyin_without_tone": "nuan",
    "option_list": [
      {
        "pinyin": "nuǎn",
        "tone": 3,
        "char": "暖",
        "char_list": [
          "暖"
        ],
        "pinyin_without_tone": "nuan"
      }
    ]
  },
  "nuo": {
    "pinyin_without_tone": "nuo",
    "option_list": [
      {
        "pinyin": "nuó",
        "tone": 2,
        "char": "挪",
        "char_list": [
          "挪"
        ],
        "pinyin_without_tone": "nuo"
      },
      {
        "pinyin": "nuò",
        "tone": 4,
        "char": "诺",
        "char_list": [
          "诺",
          "锘",
          "懦",
          "糯"
        ],
        "pinyin_without_tone": "nuo"
      }
    ]
  },
  "ou": {
    "pinyin_without_tone": "ou",
    "option_list": [
      {
        "pinyin": "ōu",
        "tone": 1,
        "char": "欧",
        "char_list": [
          "欧",
          "殴",
          "鸥"
        ],
        "pinyin_without_tone": "ou"
      },
      {
        "pinyin": "ǒu",
        "tone": 3,
        "char": "偶",
        "char_list": [
          "呕",
          "偶",
          "藕"
        ],
        "pinyin_without_tone": "ou"
      },
    ]
  },
  "pa": {
    "pinyin_without_tone": "pa",
    "option_list": [
      {
        "pinyin": "pà",
        "tone": 4,
        "char": "帕",
        "char_list": [
          "帕",
          "怕"
        ],
        "pinyin_without_tone": "pa"
      }
    ]
  },
  "pai": {
    "pinyin_without_tone": "pai",
    "option_list": [
      {
        "pinyin": "pāi",
        "tone": 1,
        "char": "拍",
        "char_list": [
          "拍"
        ],
        "pinyin_without_tone": "pai"
      },
      {
        "pinyin": "pái",
        "tone": 2,
        "char": "排",
        "char_list": [
          "徘",
          "排",
          "牌",
          "簰"
        ],
        "pinyin_without_tone": "pai"
      },
      {
        "pinyin": "pǎi",
        "tone": 3,
        "char": "迫",
        "char_list": [
          "迫"
        ],
        "pinyin_without_tone": "pai"
      },
      {
        "pinyin": "pài",
        "tone": 4,
        "char": "派",
        "char_list": [
          "派",
          "湃",
          "蒎"
        ],
        "pinyin_without_tone": "pai"
      }
    ]
  },
  "pan": {
    "pinyin_without_tone": "pan",
    "option_list": [
      {
        "pinyin": "pān",
        "tone": 1,
        "char": "攀",
        "char_list": [
          "潘",
          "攀"
        ],
        "pinyin_without_tone": "pan"
      },
      {
        "pinyin": "pán",
        "tone": 2,
        "char": "盘",
        "char_list": [
          "盘",
          "槃"
        ],
        "pinyin_without_tone": "pan"
      },
      {
        "pinyin": "pàn",
        "tone": 4,
        "char": "判",
        "char_list": [
          "判",
          "叛",
          "盼",
          "畔"
        ],
        "pinyin_without_tone": "pan"
      },
    ]
  },
  "pang": {
    "pinyin_without_tone": "pang",
    "option_list": [
      {
        "pinyin": "páng",
        "tone": 2,
        "char": "旁",
        "char_list": [
          "庞",
          "旁",
          "螃"
        ],
        "pinyin_without_tone": "pang"
      },
      {
        "pinyin": "pàng",
        "tone": 4,
        "char": "胖",
        "char_list": [
          "胖"
        ],
        "pinyin_without_tone": "pang"
      },
    ]
  },
  "pao": {
    "pinyin_without_tone": "pao",
    "option_list": [
      {
        "pinyin": "pāo",
        "tone": 1,
        "char": "抛",
        "char_list": [
          "抛"
        ],
        "pinyin_without_tone": "pao"
      },
      {
        "pinyin": "páo",
        "tone": 2,
        "char": "袍",
        "char_list": [
          "刨",
          "袍"
        ],
        "pinyin_without_tone": "pao"
      },
      {
        "pinyin": "pǎo",
        "tone": 3,
        "char": "跑",
        "char_list": [
          "跑"
        ],
        "pinyin_without_tone": "pao"
      },
      {
        "pinyin": "pào",
        "tone": 4,
        "char": "泡",
        "char_list": [
          "泡",
          "炮"
        ],
        "pinyin_without_tone": "pao"
      }
    ]
  },
  "pei": {
    "pinyin_without_tone": "pei",
    "option_list": [
      {
        "pinyin": "péi",
        "tone": 2,
        "char": "培",
        "char_list": [
          "陪",
          "培",
          "赔",
          "锫"
        ],
        "pinyin_without_tone": "pei"
      },
      {
        "pinyin": "pèi",
        "tone": 4,
        "char": "佩",
        "char_list": [
          "沛",
          "佩",
          "配"
        ],
        "pinyin_without_tone": "pei"
      },
      {
        "pinyin": "pēi",
        "tone": 1,
        "char": "胚",
        "char_list": [
          "胚",
          "衃"
        ],
        "pinyin_without_tone": "pei"
      },
    ]
  },
  "pen": {
    "pinyin_without_tone": "pen",
    "option_list": [
      {
        "pinyin": "pén",
        "tone": 2,
        "char": "盆",
        "char_list": [
          "盆",
          "湓"
        ],
        "pinyin_without_tone": "pen"
      }
    ]
  },
  "peng": {
    "pinyin_without_tone": "peng",
    "option_list": [
      {
        "pinyin": "péng",
        "tone": 2,
        "char": "蓬",
        "char_list": [
          "朋",
          "弸",
          "彭",
          "棚",
          "蓬",
          "鹏",
          "篷",
          "膨",
          "芃"
        ],
        "pinyin_without_tone": "peng"
      },
      {
        "pinyin": "pěng",
        "tone": 3,
        "char": "捧",
        "char_list": [
          "捧"
        ],
        "pinyin_without_tone": "peng"
      },
      {
        "pinyin": "pèng",
        "tone": 4,
        "char": "碰",
        "char_list": [
          "碰"
        ],
        "pinyin_without_tone": "peng"
      },
      {
        "pinyin": "pēng",
        "tone": 1,
        "char": "烹",
        "char_list": [
          "砰",
          "烹",
          "澎"
        ],
        "pinyin_without_tone": "peng"
      },
    ]
  },
  "pi": {
    "pinyin_without_tone": "pi",
    "option_list": [
      {
        "pinyin": "pī",
        "tone": 1,
        "char": "披",
        "char_list": [
          "伾",
          "批",
          "坯",
          "披",
          "狉",
          "劈",
          "霹"
        ],
        "pinyin_without_tone": "pi"
      },
      {
        "pinyin": "pí",
        "tone": 2,
        "char": "皮",
        "char_list": [
          "皮",
          "芘",
          "疲",
          "陴",
          "啤",
          "脾"
        ],
        "pinyin_without_tone": "pi"
      },
      {
        "pinyin": "pǐ",
        "tone": 3,
        "char": "匹",
        "char_list": [
          "匹",
          "仳",
          "苉",
          "嚭"
        ],
        "pinyin_without_tone": "pi"
      },
      {
        "pinyin": "pì",
        "tone": 4,
        "char": "辟",
        "char_list": [
          "屁",
          "辟",
          "僻",
          "澼",
          "甓",
          "譬"
        ],
        "pinyin_without_tone": "pi"
      },
    ]
  },
  "pian": {
    "pinyin_without_tone": "pian",
    "option_list": [
      {
        "pinyin": "piān",
        "tone": 1,
        "char": "篇",
        "char_list": [
          "偏",
          "篇",
          "翩"
        ],
        "pinyin_without_tone": "pian"
      },
      {
        "pinyin": "piàn",
        "tone": 4,
        "char": "片",
        "char_list": [
          "片",
          "骗"
        ],
        "pinyin_without_tone": "pian"
      },
    ]
  },
  "piao": {
    "pinyin_without_tone": "piao",
    "option_list": [
      {
        "pinyin": "piāo",
        "tone": 1,
        "char": "飘",
        "char_list": [
          "飘"
        ],
        "pinyin_without_tone": "piao"
      },
      {
        "pinyin": "piào",
        "tone": 4,
        "char": "票",
        "char_list": [
          "票",
          "漂"
        ],
        "pinyin_without_tone": "piao"
      },
    ]
  },
  "pin": {
    "pinyin_without_tone": "pin",
    "option_list": [
      {
        "pinyin": "pīn",
        "tone": 1,
        "char": "拼",
        "char_list": [
          "拼"
        ],
        "pinyin_without_tone": "pin"
      },
      {
        "pinyin": "pín",
        "tone": 2,
        "char": "频",
        "char_list": [
          "贫",
          "频"
        ],
        "pinyin_without_tone": "pin"
      },
      {
        "pinyin": "pǐn",
        "tone": 3,
        "char": "品",
        "char_list": [
          "品"
        ],
        "pinyin_without_tone": "pin"
      },
      {
        "pinyin": "pìn",
        "tone": 4,
        "char": "聘",
        "char_list": [
          "聘"
        ],
        "pinyin_without_tone": "pin"
      }
    ]
  },
  "ping": {
    "pinyin_without_tone": "ping",
    "option_list": [
      {
        "pinyin": "pīng",
        "tone": 1,
        "char": "乒",
        "char_list": [
          "乒",
          "俜",
          "涄"
        ],
        "pinyin_without_tone": "ping"
      },
      {
        "pinyin": "píng",
        "tone": 2,
        "char": "平",
        "char_list": [
          "平",
          "评",
          "凭",
          "坪",
          "泙",
          "苹",
          "屏",
          "帡",
          "洴",
          "玶",
          "瓶",
          "萍",
          "蚲"
        ],
        "pinyin_without_tone": "ping"
      },
    ]
  },
  "po": {
    "pinyin_without_tone": "po",
    "option_list": [
      {
        "pinyin": "pō",
        "tone": 1,
        "char": "坡",
        "char_list": [
          "坡",
          "泊",
          "泼",
          "钷",
          "颇"
        ],
        "pinyin_without_tone": "po"
      },
      {
        "pinyin": "pò",
        "tone": 4,
        "char": "魄",
        "char_list": [
          "破",
          "魄"
        ],
        "pinyin_without_tone": "po"
      },
    ]
  },
  "pu": {
    "pinyin_without_tone": "pu",
    "option_list": [
      {
        "pinyin": "pū",
        "tone": 1,
        "char": "扑",
        "char_list": [
          "扑",
          "潽"
        ],
        "pinyin_without_tone": "pu"
      },
      {
        "pinyin": "pú",
        "tone": 2,
        "char": "仆",
        "char_list": [
          "仆",
          "脯",
          "菩",
          "葡",
          "蒱",
          "蒲",
          "墣",
          "穙",
          "镤"
        ],
        "pinyin_without_tone": "pu"
      },
      {
        "pinyin": "pǔ",
        "tone": 3,
        "char": "朴",
        "char_list": [
          "朴",
          "圃",
          "浦",
          "普",
          "谱",
          "镨"
        ],
        "pinyin_without_tone": "pu"
      },
      {
        "pinyin": "pù",
        "tone": 4,
        "char": "铺",
        "char_list": [
          "铺",
          "瀑",
          "曝"
        ],
        "pinyin_without_tone": "pu"
      },
    ]
  },
  "qi": {
    "pinyin_without_tone": "qi",
    "option_list": [
      {
        "pinyin": "qī",
        "tone": 1,
        "char": "期",
        "char_list": [
          "七",
          "妻",
          "柒",
          "凄",
          "栖",
          "戚",
          "期",
          "欺",
          "漆"
        ],
        "pinyin_without_tone": "qi"
      },
      {
        "pinyin": "qí",
        "tone": 2,
        "char": "其",
        "char_list": [
          "齐",
          "其",
          "奇",
          "歧",
          "祈",
          "脐",
          "埼",
          "埼",
          "崎",
          "骑",
          "棋",
          "愭",
          "旗",
          "鲯",
          "鳍"
        ],
        "pinyin_without_tone": "qi"
      },
      {
        "pinyin": "qǐ",
        "tone": 3,
        "char": "启",
        "char_list": [
          "乞",
          "企",
          "岂",
          "启",
          "呇",
          "玘",
          "起",
          "婍",
          "棨"
        ],
        "pinyin_without_tone": "qi"
      },
      {
        "pinyin": "qì",
        "tone": 4,
        "char": "器",
        "char_list": [
          "气",
          "迄",
          "弃",
          "汽",
          "泣",
          "契",
          "砌",
          "碶",
          "器",
          "磜"
        ],
        "pinyin_without_tone": "qi"
      },
    ]
  },
  "qia": {
    "pinyin_without_tone": "qia",
    "option_list": [
      {
        "pinyin": "qià",
        "tone": 4,
        "char": "洽",
        "char_list": [
          "恰",
          "洽"
        ],
        "pinyin_without_tone": "qia"
      },
    ]
  },
  "qian": {
    "pinyin_without_tone": "qian",
    "option_list": [
      {
        "pinyin": "qiān",
        "tone": 1,
        "char": "谦",
        "char_list": [
          "千",
          "迁",
          "岍",
          "杄",
          "牵",
          "铅",
          "谦",
          "签",
          "孅"
        ],
        "pinyin_without_tone": "qian"
      },
      {
        "pinyin": "qián",
        "tone": 2,
        "char": "钱",
        "char_list": [
          "前",
          "钱",
          "钳",
          "墘",
          "潜",
          "黔",
          "乾",

        ],
        "pinyin_without_tone": "qian"
      },
      {
        "pinyin": "qiǎn",
        "tone": 3,
        "char": "浅",
        "char_list": [
          "浅",
          "肷",
          "遣",
          "谴"
        ],
        "pinyin_without_tone": "qian"
      },
      {
        "pinyin": "qiàn",
        "tone": 4,
        "char": "嵌",
        "char_list": [
          "欠",
          "嵌",
          "歉",
          "纤",
          "伣"
        ],
        "pinyin_without_tone": "qian"
      },
    ]
  },
  "qiang": {
    "pinyin_without_tone": "qiang",
    "option_list": [
      {
        "pinyin": "qiāng",
        "tone": 1,
        "char": "枪",
        "char_list": [
          "呛",
          "枪",
          "玱",
          "腔",
          "锖"
        ],
        "pinyin_without_tone": "qiang"
      },
      {
        "pinyin": "qiáng",
        "tone": 2,
        "char": "强",
        "char_list": [
          "强",
          "墙"
        ],
        "pinyin_without_tone": "qiang"
      },
    ]
  },
  "qiao": {
    "pinyin_without_tone": "qiao",
    "option_list": [
      {
        "pinyin": "qiāo",
        "tone": 1,
        "char": "悄",
        "char_list": [
          "悄",
          "跷",
          "敲",
          "锹"
        ],
        "pinyin_without_tone": "qiao"
      },
      {
        "pinyin": "qiáo",
        "tone": 2,
        "char": "乔",
        "char_list": [
          "乔",
          "侨",
          "桥",
          "硚",
          "憔",
          "瞧"
        ],
        "pinyin_without_tone": "qiao"
      },
      {
        "pinyin": "qiǎo",
        "tone": 3,
        "char": "巧",
        "char_list": [
          "巧"
        ],
        "pinyin_without_tone": "qiao"
      },
      {
        "pinyin": "qiào",
        "tone": 4,
        "char": "俏",
        "char_list": [
          "俏",
          "峭",
          "窍",
          "翘",
          "撬"
        ],
        "pinyin_without_tone": "qiao"
      }
    ]
  },
  "qie": {
    "pinyin_without_tone": "qie",
    "option_list": [
      {
        "pinyin": "qiě",
        "tone": 3,
        "char": "且",
        "char_list": [
          "且"
        ],
        "pinyin_without_tone": "qie"
      },
      {
        "pinyin": "qiè",
        "tone": 4,
        "char": "怯",
        "char_list": [
          "切",
          "怯",
          "窃"
        ],
        "pinyin_without_tone": "qie"
      },
    ]
  },
  "qin": {
    "pinyin_without_tone": "qin",
    "option_list": [
      {
        "pinyin": "qīn",
        "tone": 1,
        "char": "亲",
        "char_list": [
          "亲",
          "侵",
          "钦",
          "嵚"
        ],
        "pinyin_without_tone": "qin"
      },
      {
        "pinyin": "qín",
        "tone": 2,
        "char": "琴",
        "char_list": [
          "芹",
          "秦",
          "琴",
          "禽",
          "勤",
          "擒"
        ],
        "pinyin_without_tone": "qin"
      },
      {
        "pinyin": "qǐn",
        "tone": 3,
        "char": "寝",
        "char_list": [
          "锓",
          "寝"
        ],
        "pinyin_without_tone": "qin"
      },
      {
        "pinyin": "qìn",
        "tone": 4,
        "char": "沁",
        "char_list": [
          "沁"
        ],
        "pinyin_without_tone": "qin"
      },
    ]
  },
  "qing": {
    "pinyin_without_tone": "qing",
    "option_list": [
      {
        "pinyin": "qīng",
        "tone": 1,
        "char": "青",
        "char_list": [
          "青",
          "氢",
          "轻",
          "倾",
          "卿",
          "清",
          "蜻"
        ],
        "pinyin_without_tone": "qing"
      },
      {
        "pinyin": "qíng",
        "tone": 2,
        "char": "情",
        "char_list": [
          "勍",
          "情",
          "晴",
          "擎"
        ],
        "pinyin_without_tone": "qing"
      },
      {
        "pinyin": "qǐng",
        "tone": 3,
        "char": "请",
        "char_list": [
          "顷",
          "请"
        ],
        "pinyin_without_tone": "qing"
      },
      {
        "pinyin": "qìng",
        "tone": 4,
        "char": "庆",
        "char_list": [
          "庆",
          "碃"
        ],
        "pinyin_without_tone": "qing"
      },
    ]
  },
  "qiong": {
    "pinyin_without_tone": "qiong",
    "option_list": [
      {
        "pinyin": "qióng",
        "tone": 2,
        "char": "琼",
        "char_list": [
          "穷",
          "琼",
          "銎"
        ],
        "pinyin_without_tone": "qiong"
      },
    ]
  },
  "qiu": {
    "pinyin_without_tone": "qiu",
    "option_list": [
      {
        "pinyin": "qiū",
        "tone": 1,
        "char": "秋",
        "char_list": [
          "丘",
          "秋",
          "蚯",
          "萩",
          "鹙"
        ],
        "pinyin_without_tone": "qiu"
      },
      {
        "pinyin": "qiú",
        "tone": 2,
        "char": "求",
        "char_list": [
          "钆",
          "囚",
          "求",
          "訄",
          "球",
          "蝤",
          "鼽"
        ],
        "pinyin_without_tone": "qiu"
      },
    ]
  },
  "qu": {
    "pinyin_without_tone": "qu",
    "option_list": [
      {
        "pinyin": "qū",
        "tone": 1,
        "char": "区",
        "char_list": [
          "区",
          "曲",
          "岖",
          "诎",
          "驱",
          "坥",
          "屈",
          "胠",
          "袪",
          "躯",
          "趋"
        ],
        "pinyin_without_tone": "qu"
      },
      {
        "pinyin": "qú",
        "tone": 2,
        "char": "渠",
        "char_list": [
          "渠",
          "鼩",
          "灈",
          "蠼"
        ],
        "pinyin_without_tone": "qu"
      },
      {
        "pinyin": "qǔ",
        "tone": 3,
        "char": "取",
        "char_list": [
          "取",
          "竘",
          "娶"
        ],
        "pinyin_without_tone": "qu"
      },
      {
        "pinyin": "qù",
        "tone": 4,
        "char": "趣",
        "char_list": [
          "去",
          "趣"
        ],
        "pinyin_without_tone": "qu"
      },
    ]
  },
  "quan": {
    "pinyin_without_tone": "quan",
    "option_list": [
      {
        "pinyin": "quān",
        "tone": 1,
        "char": "圈",
        "char_list": [
          "圈"
        ],
        "pinyin_without_tone": "quan"
      },
      {
        "pinyin": "quán",
        "tone": 2,
        "char": "泉",
        "char_list": [
          "全",
          "权",
          "佺",
          "泉",
          "拳",
          "辁",
          "婘",
          "痊",
          "瑔",
          "鳈"
        ],
        "pinyin_without_tone": "quan"
      },
      {
        "pinyin": "quǎn",
        "tone": 3,
        "char": "犬",
        "char_list": [
          "犬"
        ],
        "pinyin_without_tone": "quan"
      },
      {
        "pinyin": "quàn",
        "tone": 4,
        "char": "劝",
        "char_list": [
          "劝",
          "券"
        ],
        "pinyin_without_tone": "quan"
      },
    ]
  },
  "que": {
    "pinyin_without_tone": "que",
    "option_list": [
      {
        "pinyin": "quē",
        "tone": 1,
        "char": "缺",
        "char_list": [
          "缺"
        ],
        "pinyin_without_tone": "que"
      },
      {
        "pinyin": "què",
        "tone": 4,
        "char": "鹊",
        "char_list": [
          "却",
          "雀",
          "确",
          "鹊"
        ],
        "pinyin_without_tone": "que"
      },
    ]
  },
  "qun": {
    "pinyin_without_tone": "qun",
    "option_list": [
      {
        "pinyin": "qún",
        "tone": 2,
        "char": "群",
        "char_list": [
          "裙",
          "群"
        ],
        "pinyin_without_tone": "qun"
      },
    ]
  },
  "ran": {
    "pinyin_without_tone": "ran",
    "option_list": [
      {
        "pinyin": "rán",
        "tone": 2,
        "char": "燃",
        "char_list": [
          "蚺",
          "然",
          "燃"
        ],
        "pinyin_without_tone": "ran"
      },
      {
        "pinyin": "rǎn",
        "tone": 3,
        "char": "染",
        "char_list": [
          "冉",
          "染"
        ],
        "pinyin_without_tone": "ran"
      },
    ]
  },
  "rang": {
    "pinyin_without_tone": "rang",
    "option_list": [
      {
        "pinyin": "rǎng",
        "tone": 3,
        "char": "壤",
        "char_list": [
          "嚷",
          "壤"
        ],
        "pinyin_without_tone": "rang"
      },
      {
        "pinyin": "ràng",
        "tone": 4,
        "char": "让",
        "char_list": [
          "让"
        ],
        "pinyin_without_tone": "rang"
      },
    ]
  },
  "rao": {
    "pinyin_without_tone": "rao",
    "option_list": [
      {
        "pinyin": "ráo",
        "tone": 2,
        "char": "饶",
        "char_list": [
          "荛",
          "饶"
        ],
        "pinyin_without_tone": "rao"
      },
      {
        "pinyin": "rǎo",
        "tone": 3,
        "char": "扰",
        "char_list": [
          "扰"
        ],
        "pinyin_without_tone": "rao"
      },
      {
        "pinyin": "rào",
        "tone": 4,
        "char": "绕",
        "char_list": [
          "绕"
        ],
        "pinyin_without_tone": "rao"
      }
    ]
  },
  "re": {
    "pinyin_without_tone": "re",
    "option_list": [
      {
        "pinyin": "rě",
        "tone": 3,
        "char": "惹",
        "char_list": [
          "惹"
        ],
        "pinyin_without_tone": "re"
      },
      {
        "pinyin": "rè",
        "tone": 4,
        "char": "热",
        "char_list": [
          "热"
        ],
        "pinyin_without_tone": "re"
      }
    ]
  },
  "ren": {
    "pinyin_without_tone": "ren",
    "option_list": [
      {
        "pinyin": "rén",
        "tone": 2,
        "char": "仁",
        "char_list": [
          "人",
          "仁",
          "壬"
        ],
        "pinyin_without_tone": "ren"
      },
      {
        "pinyin": "rěn",
        "tone": 3,
        "char": "忍",
        "char_list": [
          "忍"
        ],
        "pinyin_without_tone": "ren"
      },
      {
        "pinyin": "rèn",
        "tone": 4,
        "char": "刃",
        "char_list": [
          "刃",
          "认",
          "讱",
          "任",
          "纫",
          "韧"
        ],
        "pinyin_without_tone": "ren"
      }
    ]
  },
  "reng": {
    "pinyin_without_tone": "reng",
    "option_list": [
      {
        "pinyin": "rēng",
        "tone": 1,
        "char": "扔",
        "char_list": [
          "扔"
        ],
        "pinyin_without_tone": "reng"
      },
      {
        "pinyin": "réng",
        "tone": 2,
        "char": "仍",
        "char_list": [
          "仍"
        ],
        "pinyin_without_tone": "reng"
      }
    ]
  },
  "ri": {
    "pinyin_without_tone": "ri",
    "option_list": [
      {
        "pinyin": "rì",
        "tone": 4,
        "char": "日",
        "char_list": [
          "日",
          "驲"
        ],
        "pinyin_without_tone": "ri"
      },
    ]
  },
  "rong": {
    "pinyin_without_tone": "rong",
    "option_list": [
      {
        "pinyin": "róng",
        "tone": 2,
        "char": "荣",
        "char_list": [
          "戎",
          "绒",
          "荣",
          "容",
          "溶",
          "蓉",
          "榕",
          "熔",
          "瑢",
          "融",
          "镕"
        ],
        "pinyin_without_tone": "rong"
      },
      {
        "pinyin": "rōng",
        "tone": 1,
        "char": "茸",
        "char_list": [
          "茸"
        ],
        "pinyin_without_tone": "rong"
      },
      {
        "pinyin": "rǒng",
        "tone": 3,
        "char": "冗",
        "char_list": [
          "冗"
        ],
        "pinyin_without_tone": "rong"
      },
    ]
  },
  "rou": {
    "pinyin_without_tone": "rou",
    "option_list": [
      {
        "pinyin": "róu",
        "tone": 2,
        "char": "柔",
        "char_list": [
          "柔",
          "揉",
          "蹂"
        ],
        "pinyin_without_tone": "rou"
      },
    ]
  },
  "ru": {
    "pinyin_without_tone": "ru",
    "option_list": [
      {
        "pinyin": "rú",
        "tone": 2,
        "char": "如",
        "char_list": [
          "如",
          "儒",
          "嬬",
          "蠕",
          "颥"
        ],
        "pinyin_without_tone": "ru"
      },
      {
        "pinyin": "rǔ",
        "tone": 3,
        "char": "乳",
        "char_list": [
          "汝",
          "乳",
          "辱"
        ],
        "pinyin_without_tone": "ru"
      },
    ]
  },
  "ruan": {
    "pinyin_without_tone": "ruan",
    "option_list": [
      {
        "pinyin": "ruǎn",
        "tone": 3,
        "char": "软",
        "char_list": [
          "软",
          "瓀"
        ],
        "pinyin_without_tone": "ruan"
      },
    ]
  },
  "rui": {
    "pinyin_without_tone": "rui",
    "option_list": [
      {
        "pinyin": "ruì",
        "tone": 4,
        "char": "锐",
        "char_list": [
          "枘",
          "锐",
          "瑞"
        ],
        "pinyin_without_tone": "rui"
      },
      {
        "pinyin": "ruǐ",
        "tone": 3,
        "char": "蕊",
        "char_list": [
          "蕊"
        ],
        "pinyin_without_tone": "rui"
      },
    ]
  },
  "run": {
    "pinyin_without_tone": "run",
    "option_list": [
      {
        "pinyin": "rùn",
        "tone": 4,
        "char": "润",
        "char_list": [
          "闰",
          "润"
        ],
        "pinyin_without_tone": "run"
      }
    ]
  },
  "ruo": {
    "pinyin_without_tone": "ruo",
    "option_list": [
      {
        "pinyin": "ruò",
        "tone": 4,
        "char": "若",
        "char_list": [
          "若",
          "弱",
          "鄀",
          "蒻"
        ],
        "pinyin_without_tone": "ruo"
      },
    ]
  },
  "sa": {
    "pinyin_without_tone": "sa",
    "option_list": [

      {
        "pinyin": "sǎ",
        "tone": 3,
        "char": "洒",
        "char_list": [
          "洒"
        ],
        "pinyin_without_tone": "sa"
      },

    ]
  },
  "sai": {
    "pinyin_without_tone": "sai",
    "option_list": [
      {
        "pinyin": "sài",
        "tone": 4,
        "char": "赛",
        "char_list": [
          "赛"
        ],
        "pinyin_without_tone": "sai"
      }
    ]
  },
  "san": {
    "pinyin_without_tone": "san",
    "option_list": [
      {
        "pinyin": "sān",
        "tone": 1,
        "char": "叁",
        "char_list": [
          "三",
          "叁",
          "毵"
        ],
        "pinyin_without_tone": "san"
      },
      {
        "pinyin": "sǎn",
        "tone": 3,
        "char": "伞",
        "char_list": [
          "伞"
        ],
        "pinyin_without_tone": "san"
      },
      {
        "pinyin": "sàn",
        "tone": 4,
        "char": "散",
        "char_list": [
          "散"
        ],
        "pinyin_without_tone": "san"
      }
    ]
  },
  "sang": {
    "pinyin_without_tone": "sang",
    "option_list": [
      {
        "pinyin": "sāng",
        "tone": 1,
        "char": "桑",
        "char_list": [
          "桑"
        ],
        "pinyin_without_tone": "sang"
      },
    ]
  },
  "sao": {
    "pinyin_without_tone": "sao",
    "option_list": [
      {
        "pinyin": "sǎo",
        "tone": 3,
        "char": "扫",
        "char_list": [
          "扫",
          "嫂"
        ],
        "pinyin_without_tone": "sao"
      },
    ]
  },
  "se": {
    "pinyin_without_tone": "se",
    "option_list": [
      {
        "pinyin": "sè",
        "tone": 4,
        "char": "瑟",
        "char_list": [
          "色",
          "涩",
          "瑟",
          "璱"
        ],
        "pinyin_without_tone": "se"
      },
    ]
  },
  "sen": {
    "pinyin_without_tone": "sen",
    "option_list": [
      {
        "pinyin": "sēn",
        "tone": 1,
        "char": "森",
        "char_list": [
          "森"
        ],
        "pinyin_without_tone": "sen"
      }
    ]
  },
  "sha": {
    "pinyin_without_tone": "sha",
    "option_list": [
      {
        "pinyin": "shā",
        "tone": 1,
        "char": "沙",
        "char_list": [
          "杀",
          "沙",
          "纱",
          "刹",
          "砂",
          "煞",
          "鲨"
        ],
        "pinyin_without_tone": "sha"
      },
      {
        "pinyin": "shà",
        "tone": 4,
        "char": "厦",
        "char_list": [
          "厦",
          "霎"
        ],
        "pinyin_without_tone": "sha"
      },
    ]
  },
  "shai": {
    "pinyin_without_tone": "shai",
    "option_list": [
      {
        "pinyin": "shāi",
        "tone": 1,
        "char": "筛",
        "char_list": [
          "筛",
          "酾"
        ],
        "pinyin_without_tone": "shai"
      },
      {
        "pinyin": "shài",
        "tone": 4,
        "char": "晒",
        "char_list": [
          "晒"
        ],
        "pinyin_without_tone": "shai"
      }
    ]
  },
  "shan": {
    "pinyin_without_tone": "shan",
    "option_list": [
      {
        "pinyin": "shān",
        "tone": 1,
        "char": "山",
        "char_list": [
          "山",
          "删",
          "杉",
          "衫",
          "埏",
          "珊",
          "煽",
          "栅"
        ],
        "pinyin_without_tone": "shan"
      },
      {
        "pinyin": "shǎn",
        "tone": 3,
        "char": "闪",
        "char_list": [
          "闪",
          "陕",
          "晱"
        ],
        "pinyin_without_tone": "shan"
      },
      {
        "pinyin": "shàn",
        "tone": 4,
        "char": "扇",
        "char_list": [
          "钐",
          "扇",
          "善",
          "墡",
          "擅",
          "赡"
        ],
        "pinyin_without_tone": "shan"
      },
    ]
  },
  "shang": {
    "pinyin_without_tone": "shang",
    "option_list": [
      {
        "pinyin": "shang",
        "tone": 0,
        "char": "裳",
        "char_list": [
          "裳"
        ],
        "pinyin_without_tone": "shang"
      },
      {
        "pinyin": "shāng",
        "tone": 1,
        "char": "商",
        "char_list": [
          "伤",
          "商"
        ],
        "pinyin_without_tone": "shang"
      },
      {
        "pinyin": "shàng",
        "tone": 4,
        "char": "尚",
        "char_list": [
          "上",
          "尚"
        ],
        "pinyin_without_tone": "shang"
      }
    ]
  },
  "shao": {
    "pinyin_without_tone": "shao",
    "option_list": [
      {
        "pinyin": "shāo",
        "tone": 1,
        "char": "稍",
        "char_list": [
          "捎",
          "烧",
          "梢",
          "稍"
        ],
        "pinyin_without_tone": "shao"
      },
      {
        "pinyin": "sháo",
        "tone": 2,
        "char": "玿",
        "char_list": [
          "勺",
          "玿"
        ],
        "pinyin_without_tone": "shao"
      },
      {
        "pinyin": "shǎo",
        "tone": 3,
        "char": "少",
        "char_list": [
          "少"
        ],
        "pinyin_without_tone": "shao"
      },
      {
        "pinyin": "shào",
        "tone": 4,
        "char": "绍",
        "char_list": [
          "绍",
          "哨"
        ],
        "pinyin_without_tone": "shao"
      },
    ]
  },
  "she": {
    "pinyin_without_tone": "she",
    "option_list": [
      {
        "pinyin": "shě",
        "tone": 3,
        "char": "舍",
        "char_list": [
          "舍"
        ],
        "pinyin_without_tone": "she"
      },
      {
        "pinyin": "shè",
        "tone": 4,
        "char": "社",
        "char_list": [
          "设",
          "社",
          "射",
          "涉",
          "赦",
          "摄",
          "滠"
        ],
        "pinyin_without_tone": "she"
      },
      {
        "pinyin": "shē",
        "tone": 1,
        "char": "奢",
        "char_list": [
          "奢"
        ],
        "pinyin_without_tone": "she"
      },
    ]
  },
  "shen": {
    "pinyin_without_tone": "shen",
    "option_list": [
      {
        "pinyin": "shēn",
        "tone": 1,
        "char": "申",
        "char_list": [
          "申",
          "屾",
          "伸",
          "身",
          "侁",
          "呻",
          "绅",
          "珅",
          "甡",
          "深",
          "燊",
          "鲹",
          "以"
        ],
        "pinyin_without_tone": "shen"
      },
      {
        "pinyin": "shén",
        "tone": 2,
        "char": "神",
        "char_list": [
          "什",
          "甚",
          "神"
        ],
        "pinyin_without_tone": "shen"
      },
      {
        "pinyin": "shěn",
        "tone": 3,
        "char": "沈",
        "char_list": [
          "沈",
          "审",
          "矧",
          "婶",
          "瞫"
        ],
        "pinyin_without_tone": "shen"
      },
      {
        "pinyin": "shèn",
        "tone": 4,
        "char": "慎",
        "char_list": [
          "肾",
          "渗",
          "慎",
          "椹"
        ],
        "pinyin_without_tone": "shen"
      },
    ]
  },
  "sheng": {
    "pinyin_without_tone": "sheng",
    "option_list": [
      {
        "pinyin": "shēng",
        "tone": 1,
        "char": "声",
        "char_list": [
          "升",
          "升",
          "升",
          "生",
          "声",
          "牲",
          "笙",
          "甥",
          "昇",
          "陞"
        ],
        "pinyin_without_tone": "sheng"
      },
      {
        "pinyin": "shéng",
        "tone": 2,
        "char": "绳",
        "char_list": [
          "绳"
        ],
        "pinyin_without_tone": "sheng"
      },
      {
        "pinyin": "shěng",
        "tone": 3,
        "char": "省",
        "char_list": [
          "省",
          "眚"
        ],
        "pinyin_without_tone": "sheng"
      },
      {
        "pinyin": "shèng",
        "tone": 4,
        "char": "圣",
        "char_list": [
          "圣",
          "胜",
          "盛",
          "剩"
        ],
        "pinyin_without_tone": "sheng"
      },
    ]
  },
  "shi": {
    "pinyin_without_tone": "shi",
    "option_list": [
      {
        "pinyin": "shī",
        "tone": 1,
        "char": "诗",
        "char_list": [
          "尸",
          "失",
          "师",
          "诗",
          "邿",
          "鸤",
          "施",
          "浉",
          "狮",
          "湿",
          "鲺"
        ],
        "pinyin_without_tone": "shi"
      },
      {
        "pinyin": "shí",
        "tone": 2,
        "char": "时",
        "char_list": [
          "十",
          "石",
          "时",
          "识",
          "实",
          "拾",
          "祏",
          "蚀",
          "食",
          "鼫"
        ],
        "pinyin_without_tone": "shi"
      },
      {
        "pinyin": "shǐ",
        "tone": 3,
        "char": "始",
        "char_list": [
          "史",
          "矢",
          "使",
          "始",
          "驶"
        ],
        "pinyin_without_tone": "shi"
      },
      {
        "pinyin": "shì",
        "tone": 4,
        "char": "适",
        "char_list": [
          "士",
          "氏",
          "世",
          "市",
          "示",
          "似",
          "式",
          "事",
          "侍",
          "势",
          "视",
          "试",
          "饰",
          "室",
          "恃",
          "拭",
          "是",
          "柿",
          "适",
          "栻",
          "逝",
          "媞",
          "释",
          "嗜",
          "誓",
          "襫"
        ],
        "pinyin_without_tone": "shi"
      },
    ]
  },
  "shou": {
    "pinyin_without_tone": "shou",
    "option_list": [
      {
        "pinyin": "shǒu",
        "tone": 3,
        "char": "守",
        "char_list": [
          "手",
          "守",
          "首",
          "艏"
        ],
        "pinyin_without_tone": "shou"
      },
      {
        "pinyin": "shòu",
        "tone": 4,
        "char": "寿",
        "char_list": [
          "寿",
          "受",
          "兽",
          "售",
          "授",
          "瘦"
        ],
        "pinyin_without_tone": "shou"
      }
    ]
  },
  "shu": {
    "pinyin_without_tone": "shu",
    "option_list": [
      {
        "pinyin": "shū",
        "tone": 1,
        "char": "书",
        "char_list": [
          "书",
          "殳",
          "抒",
          "叔",
          "枢",
          "陎",
          "殊",
          "梳",
          "淑",
          "鄃",
          "疏",
          "舒",
          "输",
          "蔬"
        ],
        "pinyin_without_tone": "shu"
      },
      {
        "pinyin": "shú",
        "tone": 2,
        "char": "熟",
        "char_list": [
          "婌",
          "赎",
          "熟"
        ],
        "pinyin_without_tone": "shu"
      },
      {
        "pinyin": "shǔ",
        "tone": 3,
        "char": "暑",
        "char_list": [
          "属",
          "暑",
          "署",
          "蜀",
          "鼠",
          "薯",
          "曙"
        ],
        "pinyin_without_tone": "shu"
      },
      {
        "pinyin": "shù",
        "tone": 4,
        "char": "术",
        "char_list": [
          "术",
          "束",
          "述",
          "树",
          "竖",
          "恕",
          "庶",
          "数",
          "墅",
          "漱"
        ],
        "pinyin_without_tone": "shu"
      },
    ]
  },
  "shua": {
    "pinyin_without_tone": "shua",
    "option_list": [
      {
        "pinyin": "shuā",
        "tone": 1,
        "char": "刷",
        "char_list": [
          "刷"
        ],
        "pinyin_without_tone": "shua"
      },
    ]
  },
  "shuai": {
    "pinyin_without_tone": "shuai",
    "option_list": [
      {
        "pinyin": "shuài",
        "tone": 4,
        "char": "帅",
        "char_list": [
          "帅",
          "蟀"
        ],
        "pinyin_without_tone": "shuai"
      }
    ]
  },
  "shuang": {
    "pinyin_without_tone": "shuang",
    "option_list": [
      {
        "pinyin": "shuāng",
        "tone": 1,
        "char": "霜",
        "char_list": [
          "双",
          "霜",
          "礵",
          "鹴"
        ],
        "pinyin_without_tone": "shuang"
      },
      {
        "pinyin": "shuǎng",
        "tone": 3,
        "char": "爽",
        "char_list": [
          "爽"
        ],
        "pinyin_without_tone": "shuang"
      },
    ]
  },
  "shui": {
    "pinyin_without_tone": "shui",
    "option_list": [
      {
        "pinyin": "shuǐ",
        "tone": 3,
        "char": "水",
        "char_list": [
          "水"
        ],
        "pinyin_without_tone": "shui"
      },
      {
        "pinyin": "shuì",
        "tone": 4,
        "char": "税",
        "char_list": [
          "帨",
          "税",
          "睡"
        ],
        "pinyin_without_tone": "shui"
      }
    ]
  },
  "shun": {
    "pinyin_without_tone": "shun",
    "option_list": [
      {
        "pinyin": "shùn",
        "tone": 4,
        "char": "顺",
        "char_list": [
          "顺",
          "瞬"
        ],
        "pinyin_without_tone": "shun"
      },
    ]
  },
  "shuo": {
    "pinyin_without_tone": "shuo",
    "option_list": [
      {
        "pinyin": "shuō",
        "tone": 1,
        "char": "说",
        "char_list": [
          "说"
        ],
        "pinyin_without_tone": "shuo"
      },
      {
        "pinyin": "shuò",
        "tone": 4,
        "char": "硕",
        "char_list": [
          "烁",
          "硕"
        ],
        "pinyin_without_tone": "shuo"
      }
    ]
  },
  "si": {
    "pinyin_without_tone": "si",
    "option_list": [
      {
        "pinyin": "sī",
        "tone": 1,
        "char": "思",
        "char_list": [
          "丝",
          "司",
          "私",
          "私",
          "思",
          "斯",
          "楒",
          "飔",
          "凘",
          "嘶",
          "撕"
        ],
        "pinyin_without_tone": "si"
      },
      {
        "pinyin": "sì",
        "tone": 4,
        "char": "寺",
        "char_list": [
          "巳",
          "四",
          "寺",
          "祀",
          "饲",
          "涘",
          "肆"
        ],
        "pinyin_without_tone": "si"
      },
    ]
  },
  "song": {
    "pinyin_without_tone": "song",
    "option_list": [
      {
        "pinyin": "sōng",
        "tone": 1,
        "char": "松",
        "char_list": [
          "松",
          "娀",
          "崧"
        ],
        "pinyin_without_tone": "song"
      },
      {
        "pinyin": "sòng",
        "tone": 4,
        "char": "颂",
        "char_list": [
          "讼",
          "宋",
          "诵",
          "送",
          "颂"
        ],
        "pinyin_without_tone": "song"
      },
    ]
  },
  "su": {
    "pinyin_without_tone": "su",
    "option_list": [
      {
        "pinyin": "sū",
        "tone": 1,
        "char": "苏",
        "char_list": [
          "苏",
          "苏",
          "酥"
        ],
        "pinyin_without_tone": "su"
      },
      {
        "pinyin": "sú",
        "tone": 2,
        "char": "俗",
        "char_list": [
          "俗"
        ],
        "pinyin_without_tone": "su"
      },
      {
        "pinyin": "sù",
        "tone": 4,
        "char": "肃",
        "char_list": [
          "诉",
          "肃",
          "素",
          "速",
          "宿",
          "傃",
          "粟",
          "塑",
          "溯",
          "鹔",
          "蔌",
          "蹜"
        ],
        "pinyin_without_tone": "su"
      },
    ]
  },
  "suan": {
    "pinyin_without_tone": "suan",
    "option_list": [
      {
        "pinyin": "suàn",
        "tone": 4,
        "char": "算",
        "char_list": [
          "蒜",
          "算"
        ],
        "pinyin_without_tone": "suan"
      }
    ]
  },
  "sui": {
    "pinyin_without_tone": "sui",
    "option_list": [
      {
        "pinyin": "suí",
        "tone": 2,
        "char": "随",
        "char_list": [
          "隋",
          "随"
        ],
        "pinyin_without_tone": "sui"
      },
      {
        "pinyin": "suì",
        "tone": 4,
        "char": "岁",
        "char_list": [
          "岁",
          "祟",
          "遂",
          "碎",
          "隧",
          "璲",
          "穗",
          "穟",
          "襚",
          "旞"
        ],
        "pinyin_without_tone": "sui"
      },
    ]
  },
  "sun": {
    "pinyin_without_tone": "sun",
    "option_list": [
      {
        "pinyin": "sūn",
        "tone": 1,
        "char": "孙",
        "char_list": [
          "孙"
        ],
        "pinyin_without_tone": "sun"
      },
      {
        "pinyin": "sǔn",
        "tone": 3,
        "char": "笋",
        "char_list": [
          "损",
          "笋"
        ],
        "pinyin_without_tone": "sun"
      }
    ]
  },
  "suo": {
    "pinyin_without_tone": "suo",
    "option_list": [
      {
        "pinyin": "suō",
        "tone": 1,
        "char": "缩",
        "char_list": [
          "唆",
          "梭",
          "缩"
        ],
        "pinyin_without_tone": "suo"
      },
      {
        "pinyin": "suǒ",
        "tone": 3,
        "char": "索",
        "char_list": [
          "所",
          "索",
          "琐",
          "锁"
        ],
        "pinyin_without_tone": "suo"
      },
    ]
  },
  "ta": {
    "pinyin_without_tone": "ta",
    "option_list": [
      {
        "pinyin": "tā",
        "tone": 1,
        "char": "它",
        "char_list": [
          "他",
          "它",
          "她",
          "塌"
        ],
        "pinyin_without_tone": "ta"
      },
      {
        "pinyin": "tǎ",
        "tone": 3,
        "char": "塔",
        "char_list": [
          "塔"
        ],
        "pinyin_without_tone": "ta"
      },
      {
        "pinyin": "tà",
        "tone": 4,
        "char": "踏",
        "char_list": [
          "阘",
          "拓",
          "踏",
          "蹋"
        ],
        "pinyin_without_tone": "ta"
      },
    ]
  },
  "tai": {
    "pinyin_without_tone": "tai",
    "option_list": [
      {
        "pinyin": "tái",
        "tone": 2,
        "char": "台",
        "char_list": [
          "台",
          "苔",
          "苔"
        ],
        "pinyin_without_tone": "tai"
      },
      {
        "pinyin": "tài",
        "tone": 4,
        "char": "泰",
        "char_list": [
          "太",
          "汰",
          "态",
          "泰"
        ],
        "pinyin_without_tone": "tai"
      },
    ]
  },
  "tan": {
    "pinyin_without_tone": "tan",
    "option_list": [
      {
        "pinyin": "tān",
        "tone": 1,
        "char": "滩",
        "char_list": [
          "贪",
          "摊",
          "滩",
          "瘫"
        ],
        "pinyin_without_tone": "tan"
      },
      {
        "pinyin": "tán",
        "tone": 2,
        "char": "坛",
        "char_list": [
          "坛",
          "谈",
          "痰",
          "锬",
          "谭",
          "潭",
          "檀",
          "磹"
        ],
        "pinyin_without_tone": "tan"
      },
      {
        "pinyin": "tǎn",
        "tone": 3,
        "char": "坦",
        "char_list": [
          "坦",
          "毯",
          "璮"
        ],
        "pinyin_without_tone": "tan"
      },
      {
        "pinyin": "tàn",
        "tone": 4,
        "char": "探",
        "char_list": [
          "叹",
          "炭",
          "探",
          "碳"
        ],
        "pinyin_without_tone": "tan"
      },

    ]
  },
  "tang": {
    "pinyin_without_tone": "tang",
    "option_list": [
      {
        "pinyin": "tāng",
        "tone": 1,
        "char": "汤",
        "char_list": [
          "汤",
          "铴"
        ],
        "pinyin_without_tone": "tang"
      },
      {
        "pinyin": "táng",
        "tone": 2,
        "char": "唐",
        "char_list": [
          "唐",
          "堂",
          "棠",
          "鄌",
          "塘",
          "膛",
          "糖",
          "螗"
        ],
        "pinyin_without_tone": "tang"
      },
      {
        "pinyin": "tǎng",
        "tone": 3,
        "char": "淌",
        "char_list": [
          "倘",
          "淌",
          "躺"
        ],
        "pinyin_without_tone": "tang"
      },
      {
        "pinyin": "tàng",
        "tone": 4,
        "char": "趟",
        "char_list": [
          "烫",
          "趟"
        ],
        "pinyin_without_tone": "tang"
      },
    ]
  },
  "tao": {
    "pinyin_without_tone": "tao",
    "option_list": [
      {
        "pinyin": "tāo",
        "tone": 1,
        "char": "涛",
        "char_list": [
          "弢",
          "涛",
          "掏",
          "慆",
          "滔"
        ],
        "pinyin_without_tone": "tao"
      },
      {
        "pinyin": "táo",
        "tone": 2,
        "char": "淘",
        "char_list": [
          "逃",
          "桃",
          "陶",
          "梼",
          "淘",
          "绹",
          "萄",
          "鼗"
        ],
        "pinyin_without_tone": "tao"
      },
      {
        "pinyin": "tào",
        "tone": 4,
        "char": "套",
        "char_list": [
          "套"
        ],
        "pinyin_without_tone": "tao"
      },
    ]
  },
  "te": {
    "pinyin_without_tone": "te",
    "option_list": [
      {
        "pinyin": "tè",
        "tone": 4,
        "char": "特",
        "char_list": [
          "特",
          "铽"
        ],
        "pinyin_without_tone": "te"
      },
    ]
  },
  "teng": {
    "pinyin_without_tone": "teng",
    "option_list": [
      {
        "pinyin": "téng",
        "tone": 2,
        "char": "腾",
        "char_list": [
          "疼",
          "腾",
          "誊",
          "縢",
          "藤"
        ],
        "pinyin_without_tone": "teng"
      },
    ]
  },
  "ti": {
    "pinyin_without_tone": "ti",
    "option_list": [
      {
        "pinyin": "tī",
        "tone": 1,
        "char": "梯",
        "char_list": [
          "剔",
          "梯",
          "踢"
        ],
        "pinyin_without_tone": "ti"
      },
      {
        "pinyin": "tí",
        "tone": 2,
        "char": "题",
        "char_list": [
          "啼",
          "提",
          "瑅",
          "题",
          "蹄"
        ],
        "pinyin_without_tone": "ti"
      },
      {
        "pinyin": "tǐ",
        "tone": 3,
        "char": "体",
        "char_list": [
          "体"
        ],
        "pinyin_without_tone": "ti"
      },
      {
        "pinyin": "tì",
        "tone": 4,
        "char": "替",
        "char_list": [
          "屉",
          "剃",
          "涕",
          "惕",
          "替",
          "裼",
          "趯"
        ],
        "pinyin_without_tone": "ti"
      },
    ]
  },
  "tian": {
    "pinyin_without_tone": "tian",
    "option_list": [
      {
        "pinyin": "tiān",
        "tone": 1,
        "char": "天",
        "char_list": [
          "天",
          "添"
        ],
        "pinyin_without_tone": "tian"
      },
      {
        "pinyin": "tián",
        "tone": 2,
        "char": "田",
        "char_list": [
          "田",
          "沺",
          "恬",
          "盷",
          "甜",
          "填"
        ],
        "pinyin_without_tone": "tian"
      },
    ]
  },
  "tiao": {
    "pinyin_without_tone": "tiao",
    "option_list": [
      {
        "pinyin": "tiāo",
        "tone": 1,
        "char": "挑",
        "char_list": [
          "挑",
          "祧"
        ],
        "pinyin_without_tone": "tiao"
      },
      {
        "pinyin": "tiáo",
        "tone": 2,
        "char": "迢",
        "char_list": [
          "条",
          "迢",
          "龆",
          "鲦"
        ],
        "pinyin_without_tone": "tiao"
      },
      {
        "pinyin": "tiào",
        "tone": 4,
        "char": "跳",
        "char_list": [
          "跳"
        ],
        "pinyin_without_tone": "tiao"
      },
      {
        "pinyin": "tiǎo",
        "tone": 3,
        "char": "朓",
        "char_list": [
          "朓"
        ],
        "pinyin_without_tone": "tiao"
      }
    ]
  },
  "tie": {
    "pinyin_without_tone": "tie",
    "option_list": [
      {
        "pinyin": "tiē",
        "tone": 1,
        "char": "帖",
        "char_list": [
          "帖",
          "贴"
        ],
        "pinyin_without_tone": "tie"
      }
    ]
  },
  "ting": {
    "pinyin_without_tone": "ting",
    "option_list": [
      {
        "pinyin": "tīng",
        "tone": 1,
        "char": "厅",
        "char_list": [
          "厅",
          "听"
        ],
        "pinyin_without_tone": "ting"
      },
      {
        "pinyin": "tíng",
        "tone": 2,
        "char": "庭",
        "char_list": [
          "廷",
          "亭",
          "庭",
          "停",
          "渟",
          "蜓"
        ],
        "pinyin_without_tone": "ting"
      },
      {
        "pinyin": "tǐng",
        "tone": 3,
        "char": "挺",
        "char_list": [
          "挺",
          "艇"
        ],
        "pinyin_without_tone": "ting"
      },
    ]
  },
  "tong": {
    "pinyin_without_tone": "tong",
    "option_list": [
      {
        "pinyin": "tōng",
        "tone": 1,
        "char": "通",
        "char_list": [
          "通"
        ],
        "pinyin_without_tone": "tong"
      },
      {
        "pinyin": "tóng",
        "tone": 2,
        "char": "彤",
        "char_list": [
          "仝",
          "同",
          "彤",
          "桐",
          "烔",
          "铜",
          "童",
          "曈",
          "瞳",
          "筒"
        ],
        "pinyin_without_tone": "tong"
      },
      {
        "pinyin": "tǒng",
        "tone": 3,
        "char": "统",
        "char_list": [
          "统",
          "捅",
          "桶"
        ],
        "pinyin_without_tone": "tong"
      },
    ]
  },
  "tou": {
    "pinyin_without_tone": "tou",
    "option_list": [
      {
        "pinyin": "tóu",
        "tone": 2,
        "char": "头",
        "char_list": [
          "头",
          "投"
        ],
        "pinyin_without_tone": "tou"
      },
      {
        "pinyin": "tòu",
        "tone": 4,
        "char": "透",
        "char_list": [
          "透",
          "绣"
        ],
        "pinyin_without_tone": "tou"
      }
    ]
  },
  "tu": {
    "pinyin_without_tone": "tu",
    "option_list": [
      {
        "pinyin": "tū",
        "tone": 1,
        "char": "突",
        "char_list": [
          "凸",
          "秃",
          "突",
          "葖"
        ],
        "pinyin_without_tone": "tu"
      },
      {
        "pinyin": "tú",
        "tone": 2,
        "char": "图",
        "char_list": [
          "图",
          "徒",
          "涂",
          "途",
          "屠",
          "梌",
          "稌",
          "腯",
          "酴"
        ],
        "pinyin_without_tone": "tu"
      },
      {
        "pinyin": "tǔ",
        "tone": 3,
        "char": "土",
        "char_list": [
          "土",
          "吐"
        ],
        "pinyin_without_tone": "tu"
      },
      {
        "pinyin": "tù",
        "tone": 4,
        "char": "兔",
        "char_list": [
          "兔"
        ],
        "pinyin_without_tone": "tu"
      },
    ]
  },
  "tuan": {
    "pinyin_without_tone": "tuan",
    "option_list": [
      {
        "pinyin": "tuán",
        "tone": 2,
        "char": "团",
        "char_list": [
          "团"
        ],
        "pinyin_without_tone": "tuan"
      },
    ]
  },
  "tui": {
    "pinyin_without_tone": "tui",
    "option_list": [
      {
        "pinyin": "tuī",
        "tone": 1,
        "char": "推",
        "char_list": [
          "推"
        ],
        "pinyin_without_tone": "tui"
      },
      {
        "pinyin": "tuì",
        "tone": 4,
        "char": "退",
        "char_list": [
          "退",
          "蜕",
          "褪"
        ],
        "pinyin_without_tone": "tui"
      },
    ]
  },
  "tun": {
    "pinyin_without_tone": "tun",
    "option_list": [
      {
        "pinyin": "tūn",
        "tone": 1,
        "char": "吞",
        "char_list": [
          "吞"
        ],
        "pinyin_without_tone": "tun"
      },
      {
        "pinyin": "tún",
        "tone": 2,
        "char": "屯",
        "char_list": [
          "屯",
          "坉",
          "豚",
          "臀"
        ],
        "pinyin_without_tone": "tun"
      },
    ]
  },
  "tuo": {
    "pinyin_without_tone": "tuo",
    "option_list": [
      {
        "pinyin": "tuō",
        "tone": 1,
        "char": "托",
        "char_list": [
          "托",
          "侂",
          "拖",
          "脱"
        ],
        "pinyin_without_tone": "tuo"
      },
      {
        "pinyin": "tuó",
        "tone": 2,
        "char": "驼",
        "char_list": [
          "驮",
          "驼",
          "鸵"
        ],
        "pinyin_without_tone": "tuo"
      },
      {
        "pinyin": "tuǒ",
        "tone": 3,
        "char": "妥",
        "char_list": [
          "妥",
          "椭"
        ],
        "pinyin_without_tone": "tuo"
      },
    ]
  },
  // 到这里了
  "wa": {
    "pinyin_without_tone": "wa",
    "option_list": [
      {
        "pinyin": "wā",
        "tone": 1,
        "char": "洼",
        "char_list": [
          "挖",
          "洼",
          "畖",
          "窊",
          "蛙"
        ],
        "pinyin_without_tone": "wa"
      },
      {
        "pinyin": "wá",
        "tone": 2,
        "char": "娃",
        "char_list": [
          "娃"
        ],
        "pinyin_without_tone": "wa"
      },
      {
        "pinyin": "wǎ",
        "tone": 3,
        "char": "瓦",
        "char_list": [
          "瓦"
        ],
        "pinyin_without_tone": "wa"
      },
    ]
  },
  "wai": {
    "pinyin_without_tone": "wai",
    "option_list": [
      {
        "pinyin": "wài",
        "tone": 4,
        "char": "外",
        "char_list": [
          "外"
        ],
        "pinyin_without_tone": "wai"
      }
    ]
  },
  "wan": {
    "pinyin_without_tone": "wan",
    "option_list": [
      {
        "pinyin": "wān",
        "tone": 1,
        "char": "湾",
        "char_list": [
          "弯",
          "湾",
          "豌"
        ],
        "pinyin_without_tone": "wan"
      },
      {
        "pinyin": "wán",
        "tone": 2,
        "char": "丸",
        "char_list": [
          "丸",
          "完",
          "玩",
          "顽"
        ],
        "pinyin_without_tone": "wan"
      },
      {
        "pinyin": "wǎn",
        "tone": 3,
        "char": "婉",
        "char_list": [
          "宛",
          "挽",
          "婉",
          "惋",
          "晚",
          "椀",
          "皖"
        ],
        "pinyin_without_tone": "wan"
      },
      {
        "pinyin": "wàn",
        "tone": 4,
        "char": "万",
        "char_list": [
          "万",
          "腕"
        ],
        "pinyin_without_tone": "wan"
      },
    ]
  },
  "wang": {
    "pinyin_without_tone": "wang",
    "option_list": [
      {
        "pinyin": "wāng",
        "tone": 1,
        "char": "汪",
        "char_list": [
          "尪",
          "汪"
        ],
        "pinyin_without_tone": "wang"
      },
      {
        "pinyin": "wáng",
        "tone": 2,
        "char": "王",
        "char_list": [
          "亡",
          "王"
        ],
        "pinyin_without_tone": "wang"
      },
      {
        "pinyin": "wǎng",
        "tone": 3,
        "char": "网",
        "char_list": [
          "网",
          "往",
          "枉"
        ],
        "pinyin_without_tone": "wang"
      },
      {
        "pinyin": "wàng",
        "tone": 4,
        "char": "望",
        "char_list": [
          "妄",
          "忘",
          "旺",
          "望"
        ],
        "pinyin_without_tone": "wang"
      }
    ]
  },
  "wei": {
    "pinyin_without_tone": "wei",
    "option_list": [
      {
        "pinyin": "wēi",
        "tone": 1,
        "char": "威",
        "char_list": [
          "危",
          "威",
          "偎",
          "萎",
          "微",
          "薇",
          "鳂",
          "巍"
        ],
        "pinyin_without_tone": "wei"
      },
      {
        "pinyin": "wéi",
        "tone": 2,
        "char": "维",
        "char_list": [
          "围",
          "违",
          "洈",
          "唯",
          "帷",
          "惟",
          "维"
        ],
        "pinyin_without_tone": "wei"
      },
      {
        "pinyin": "wěi",
        "tone": 3,
        "char": "伟",
        "char_list": [
          "花",
          "伟",
          "伪",
          "尾",
          "纬",
          "苇",
          "委",
          "硊",
          "艉"
        ],
        "pinyin_without_tone": "wei"
      },
      {
        "pinyin": "wèi",
        "tone": 4,
        "char": "卫",
        "char_list": [
          "卫",
          "为",
          "未",
          "位",
          "味",
          "畏",
          "胃",
          "尉",
          "谓",
          "喂",
          "猬",
          "煟",
          "蔚",
          "慰",
          "魏",
          "鳚"
        ],
        "pinyin_without_tone": "wei"
      },
    ]
  },
  "wen": {
    "pinyin_without_tone": "wen",
    "option_list": [
      {
        "pinyin": "wēn",
        "tone": 1,
        "char": "温",
        "char_list": [
          "温",
          "瘟",
          "鳁"
        ],
        "pinyin_without_tone": "wen"
      },
      {
        "pinyin": "wén",
        "tone": 2,
        "char": "文",
        "char_list": [
          "文",
          "纹",
          "芠",
          "炆",
          "玟",
          "闻",
          "蚊",
          "阌"
        ],
        "pinyin_without_tone": "wen"
      },
      {
        "pinyin": "wěn",
        "tone": 3,
        "char": "稳",
        "char_list": [
          "吻",
          "紊",
          "稳"
        ],
        "pinyin_without_tone": "wen"
      },
      {
        "pinyin": "wèn",
        "tone": 4,
        "char": "问",
        "char_list": [
          "问"
        ],
        "pinyin_without_tone": "wen"
      },
    ]
  },
  "weng": {
    "pinyin_without_tone": "weng",
    "option_list": [
      {
        "pinyin": "wēng",
        "tone": 1,
        "char": "翁",
        "char_list": [
          "翁",
          "嗡",
          "鹟"
        ],
        "pinyin_without_tone": "weng"
      },
    ]
  },
  "wo": {
    "pinyin_without_tone": "wo",
    "option_list": [
      {
        "pinyin": "wō",
        "tone": 1,
        "char": "涡",
        "char_list": [
          "涡",
          "窝",
          "蜗"
        ],
        "pinyin_without_tone": "wo"
      },
      {
        "pinyin": "wǒ",
        "tone": 3,
        "char": "我",
        "char_list": [
          "我"
        ],
        "pinyin_without_tone": "wo"
      },
      {
        "pinyin": "wò",
        "tone": 4,
        "char": "卧",
        "char_list": [
          "沃",
          "卧",
          "偓",
          "涴",
          "握",
          "硪"
        ],
        "pinyin_without_tone": "wo"
      }
    ]
  },
  "wu": {
    "pinyin_without_tone": "wu",
    "option_list": [
      {
        "pinyin": "wū",
        "tone": 1,
        "char": "屋",
        "char_list": [
          "乌",
          "污",
          "呜",
          "巫",
          "屋",
          "洿",
          "诬"
        ],
        "pinyin_without_tone": "wu"
      },
      {
        "pinyin": "wú",
        "tone": 2,
        "char": "无",
        "char_list": [
          "无",
          "吴",
          "吾",
          "芜",
          "梧",
          "珸",
          "鹀",
          "蜈"
        ],
        "pinyin_without_tone": "wu"
      },
      {
        "pinyin": "wǔ",
        "tone": 3,
        "char": "武",
        "char_list": [
          "五",
          "午",
          "伍",
          "武",
          "侮",
          "捂",
          "珷",
          "鹉",
          "舞"
        ],
        "pinyin_without_tone": "wu"
      },
      {
        "pinyin": "wù",
        "tone": 4,
        "char": "务",
        "char_list": [
          "勿",
          "务",
          "戊",
          "屼",
          "芴",
          "物",
          "误",
          "悟",
          "雾"
        ],
        "pinyin_without_tone": "wu"
      },
    ]
  },
  "xi": {
    "pinyin_without_tone": "xi",
    "option_list": [
      {
        "pinyin": "xī",
        "tone": 1,
        "char": "惜",
        "char_list": [
          "夕",
          "吸",
          "西",
          "希",
          "昔",
          "析",
          "穸",
          "俙",
          "饻",
          "息",
          "牺",
          "悉",
          "惜",
          "菥",
          "傒",
          "晰",
          "犀",
          "睎",
          "稀",
          "舾",
          "溪",
          "锡",
          "熄",
          "熙",
          "嘻",
          "膝",
          "憙",
          "熻",
          "蟋",
          "巇",
          "爔",
          "酅",
          "鼷",
          "觿"
        ],
        "pinyin_without_tone": "xi"
      },
      {
        "pinyin": "xí",
        "tone": 2,
        "char": "席",
        "char_list": [
          "习",
          "席",
          "袭",
          "媳",
          "嶍"
        ],
        "pinyin_without_tone": "xi"
      },
      {
        "pinyin": "xǐ",
        "tone": 3,
        "char": "喜",
        "char_list": [
          "枲",
          "洗",
          "徙",
          "喜",
          "蓰"
        ],
        "pinyin_without_tone": "xi"
      },
      {
        "pinyin": "xì",
        "tone": 4,
        "char": "细",
        "char_list": [
          "戏",
          "屃",
          "系",
          "细",
          "绤",
          "隙"
        ],
        "pinyin_without_tone": "xi"
      },
    ]
  },
  "xia": {
    "pinyin_without_tone": "xia",
    "option_list": [
      {
        "pinyin": "xiā",
        "tone": 1,
        "char": "虾",
        "char_list": [
          "虾",
          "瞎"
        ],
        "pinyin_without_tone": "xia"
      },
      {
        "pinyin": "xiá",
        "tone": 2,
        "char": "霞",
        "char_list": [
          "匣",
          "侠",
          "峡",
          "狭",
          "翈",
          "暇",
          "辖",
          "霞"
        ],
        "pinyin_without_tone": "xia"
      },
      {
        "pinyin": "xià",
        "tone": 4,
        "char": "夏",
        "char_list": [
          "下",
          "吓",
          "夏"
        ],
        "pinyin_without_tone": "xia"
      }
    ]
  },
  "xian": {
    "pinyin_without_tone": "xian",
    "option_list": [
      {
        "pinyin": "xiān",
        "tone": 1,
        "char": "仙",
        "char_list": [
          "仙",
          "先",
          "忺",
          "莶",
          "掀"
        ],
        "pinyin_without_tone": "xian"
      },
      {
        "pinyin": "xián",
        "tone": 2,
        "char": "贤",
        "char_list": [
          "伭",
          "闲",
          "弦",
          "贤",
          "咸",
          "衔",
          "嫌"
        ],
        "pinyin_without_tone": "xian"
      },
      {
        "pinyin": "xiǎn",
        "tone": 3,
        "char": "鲜",
        "char_list": [
          "鲜",
          "显",
          "险",
          "崄",
          "筅",
          "禒"
        ],
        "pinyin_without_tone": "xian"
      },
      {
        "pinyin": "xiàn",
        "tone": 4,
        "char": "宪",
        "char_list": [
          "县",
          "现",
          "线",
          "限",
          "宪",
          "陷",
          "馅",
          "缐",
          "羡",
          "献",
          "腺"
        ],
        "pinyin_without_tone": "xian"
      },
    ]
  },
  "xiang": {
    "pinyin_without_tone": "xiang",
    "option_list": [
      {
        "pinyin": "xiāng",
        "tone": 1,
        "char": "相",
        "char_list": [
          "乡",
          "相",
          "香",
          "厢",
          "湘",
          "葙",
          "箱",
          "瓖",
          "镶"
        ],
        "pinyin_without_tone": "xiang"
      },
      {
        "pinyin": "xiáng",
        "tone": 2,
        "char": "祥",
        "char_list": [
          "详",
          "祥",
          "翔"
        ],
        "pinyin_without_tone": "xiang"
      },
      {
        "pinyin": "xiǎng",
        "tone": 3,
        "char": "响",
        "char_list": [
          "享",
          "响",
          "想",
          "向"
        ],
        "pinyin_without_tone": "xiang"
      },
      {
        "pinyin": "xiàng",
        "tone": 4,
        "char": "向",
        "char_list": [
          "向",
          "巷",
          "项",
          "珦",
          "象",
          "像",
          "橡"
        ],
        "pinyin_without_tone": "xiang"
      }
    ]
  },
  "xiao": {
    "pinyin_without_tone": "xiao",
    "option_list": [
      {
        "pinyin": "xiāo",
        "tone": 1,
        "char": "潇",
        "char_list": [
          "哮",
          "宵",
          "消",
          "虓",
          "萧",
          "硝",
          "销",
          "潇",
          "箫",
          "霄",
          "蟏",
          "嚣"
        ],
        "pinyin_without_tone": "xiao"
      },
      {
        "pinyin": "xiǎo",
        "tone": 3,
        "char": "晓",
        "char_list": [
          "小",
          "晓"
        ],
        "pinyin_without_tone": "xiao"
      },
      {
        "pinyin": "xiào",
        "tone": 4,
        "char": "孝",
        "char_list": [
          "孝",
          "肖",
          "效",
          "校",
          "涍",
          "笑",
          "啸"
        ],
        "pinyin_without_tone": "xiao"
      },
    ]
  },
  "xie": {
    "pinyin_without_tone": "xie",
    "option_list": [
      {
        "pinyin": "xié",
        "tone": 2,
        "char": "协",
        "char_list": [
          "协",
          "邪",
          "胁",
          "挟",
          "斜",
          "谐",
          "携",
          "鞋"
        ],
        "pinyin_without_tone": "xie"
      },
      {
        "pinyin": "xiè",
        "tone": 4,
        "char": "谢",
        "char_list": [
          "泄",
          "泻",
          "卸",
          "屑",
          "偰",
          "械",
          "谢",
          "榍",
          "懈",
          "蟹"
        ],
        "pinyin_without_tone": "xie"
      },
    ]
  },
  "xin": {
    "pinyin_without_tone": "xin",
    "option_list": [
      {
        "pinyin": "xīn",
        "tone": 1,
        "char": "心",
        "char_list": [
          "心",
          "芯",
          "辛",
          "欣",
          "锌",
          "新",
          "薪",
          "䜣",
          "馨"
        ],
        "pinyin_without_tone": "xin"
      },
      {
        "pinyin": "xìn",
        "tone": 4,
        "char": "信",
        "char_list": [
          "信",
          "衅"
        ],
        "pinyin_without_tone": "xin"
      },
    ]
  },
  "xing": {
    "pinyin_without_tone": "xing",
    "option_list": [
      {
        "pinyin": "xīng",
        "tone": 1,
        "char": "星",
        "char_list": [
          "星",
          "猩",
          "煋",
          "瑆",
          "腥"
        ],
        "pinyin_without_tone": "xing"
      },
      {
        "pinyin": "xíng",
        "tone": 2,
        "char": "形",
        "char_list": [
          "刑",
          "行",
          "形",
          "型",
          "铏"
        ],
        "pinyin_without_tone": "xing"
      },
      {
        "pinyin": "xǐng",
        "tone": 3,
        "char": "醒",
        "char_list": [
          "醒"
        ],
        "pinyin_without_tone": "xing"
      },
      {
        "pinyin": "xìng",
        "tone": 4,
        "char": "杏",
        "char_list": [
          "兴",
          "杏",
          "姓",
          "幸",
          "性",
          "婞"
        ],
        "pinyin_without_tone": "xing"
      },
    ]
  },
  "xiong": {
    "pinyin_without_tone": "xiong",
    "option_list": [
      {
        "pinyin": "xiōng",
        "tone": 1,
        "char": "汹",
        "char_list": [
          "凶",
          "兄",
          "匈",
          "讻",
          "汹",
          "胸"
        ],
        "pinyin_without_tone": "xiong"
      },
      {
        "pinyin": "xióng",
        "tone": 2,
        "char": "雄",
        "char_list": [
          "雄",
          "熊"
        ],
        "pinyin_without_tone": "xiong"
      },
    ]
  },
  "xiu": {
    "pinyin_without_tone": "xiu",
    "option_list": [
      {
        "pinyin": "xiū",
        "tone": 1,
        "char": "修",
        "char_list": [
          "休",
          "修",
          "修",
          "羞",
          "鸺"
        ],
        "pinyin_without_tone": "xiu"
      },
      {
        "pinyin": "xiǔ",
        "tone": 3,
        "char": "朽",
        "char_list": [
          "朽"
        ],
        "pinyin_without_tone": "xiu"
      },
      {
        "pinyin": "xiù",
        "tone": 4,
        "char": "秀",
        "char_list": [
          "秀",
          "珛",
          "袖",
          "锈",
          "嗅"
        ],
        "pinyin_without_tone": "xiu"
      },
    ]
  },
  "xu": {
    "pinyin_without_tone": "xu",
    "option_list": [
      {
        "pinyin": "xū",
        "tone": 1,
        "char": "须",
        "char_list": [
          "吁",
          "戌",
          "须",
          "虚",
          "谞",
          "墟",
          "需"
        ],
        "pinyin_without_tone": "xu"
      },
      {
        "pinyin": "xú",
        "tone": 2,
        "char": "徐",
        "char_list": [
          "徐"
        ],
        "pinyin_without_tone": "xu"
      },
      {
        "pinyin": "xǔ",
        "tone": 3,
        "char": "许",
        "char_list": [
          "许",
          "冔",
          "珝",
          "糈",
          "醑"
        ],
        "pinyin_without_tone": "xu"
      },
      {
        "pinyin": "xù",
        "tone": 4,
        "char": "序",
        "char_list": [
          "旭",
          "序",
          "叙",
          "恤",
          "昫",
          "垿",
          "绪",
          "续",
          "酗",
          "婿",
          "絮",
          "蓄"
        ],
        "pinyin_without_tone": "xu"
      },
    ]
  },
  "xuan": {
    "pinyin_without_tone": "xuan",
    "option_list": [
      {
        "pinyin": "xuān",
        "tone": 1,
        "char": "宣",
        "char_list": [
          "轩",
          "宣",
          "喧",
          "愃",
          "儇"
        ],
        "pinyin_without_tone": "xuan"
      },
      {
        "pinyin": "xuán",
        "tone": 2,
        "char": "旋",
        "char_list": [
          "玄",
          "玹",
          "痃",
          "悬",
          "旋",
          "暶"
        ],
        "pinyin_without_tone": "xuan"
      },
      {
        "pinyin": "xuǎn",
        "tone": 3,
        "char": "选",
        "char_list": [
          "选",
          "晅",
          "癣"
        ],
        "pinyin_without_tone": "xuan"
      },
      {
        "pinyin": "xuàn",
        "tone": 4,
        "char": "绚",
        "char_list": [
          "昡",
          "炫",
          "绚",
          "衒",
          "渲",
          "碹"
        ],
        "pinyin_without_tone": "xuan"
      },
    ]
  },
  "xue": {
    "pinyin_without_tone": "xue",
    "option_list": [
      {
        "pinyin": "xué",
        "tone": 2,
        "char": "学",
        "char_list": [
          "穴",
          "学"
        ],
        "pinyin_without_tone": "xue"
      },
      {
        "pinyin": "xuě",
        "tone": 3,
        "char": "雪",
        "char_list": [
          "雪"
        ],
        "pinyin_without_tone": "xue"
      },
      {
        "pinyin": "xuè",
        "tone": 4,
        "char": "血",
        "char_list": [
          "血"
        ],
        "pinyin_without_tone": "xue"
      },
    ]
  },
  "xun": {
    "pinyin_without_tone": "xun",
    "option_list": [
      {
        "pinyin": "xún",
        "tone": 2,
        "char": "巡",
        "char_list": [
          "寻",
          "旬",
          "巡",
          "驯",
          "询",
          "循"
        ],
        "pinyin_without_tone": "xun"
      },
      {
        "pinyin": "xùn",
        "tone": 4,
        "char": "训",
        "char_list": [
          "训",
          "讯",
          "汛",
          "迅",
          "逊",
          "殉",
          "噀"
        ],
        "pinyin_without_tone": "xun"
      },
      {
        "pinyin": "xūn",
        "tone": 1,
        "char": "勋",
        "char_list": [
          "勋",
          "熏",
          "獯"
        ],
        "pinyin_without_tone": "xun"
      },
    ]
  },
  "ya": {
    "pinyin_without_tone": "ya",
    "option_list": [
      {
        "pinyin": "yā",
        "tone": 1,
        "char": "压",
        "char_list": [
          "丫",
          "压",
          "吖",
          "押",
          "鸦",
          "桠",
          "鸭"
        ],
        "pinyin_without_tone": "ya"
      },
      {
        "pinyin": "yá",
        "tone": 2,
        "char": "崖",
        "char_list": [
          "牙",
          "芽",
          "琊",
          "堐",
          "崖",
          "涯",
          "衙"
        ],
        "pinyin_without_tone": "ya"
      },
      {
        "pinyin": "yǎ",
        "tone": 3,
        "char": "雅",
        "char_list": [
          "哑",
          "雅"
        ],
        "pinyin_without_tone": "ya"
      },
      {
        "pinyin": "yà",
        "tone": 4,
        "char": "亚",
        "char_list": [
          "轧",
          "亚",
          "讶",
          "砑"
        ],
        "pinyin_without_tone": "ya"
      },
    ]
  },
  "yan": {
    "pinyin_without_tone": "yan",
    "option_list": [
      {
        "pinyin": "yān",
        "tone": 1,
        "char": "烟",
        "char_list": [
          "烟",
          "淹",
          "焉",
          "漹"
        ],
        "pinyin_without_tone": "yan"
      },
      {
        "pinyin": "yán",
        "tone": 2,
        "char": "延",
        "char_list": [
          "延",
          "闫",
          "严",
          "言",
          "岩",
          "沿",
          "炎",
          "研",
          "盐",
          "阎",
          "蜒",
          "颜",
          "虤",
          "檐"
        ],
        "pinyin_without_tone": "yan"
      },
      {
        "pinyin": "yǎn",
        "tone": 3,
        "char": "演",
        "char_list": [
          "弇",
          "衍",
          "厣",
          "掩",
          "眼",
          "扊",
          "棪",
          "演",
          "戭",
          "蝘",
          "黡",
          "甗"
        ],
        "pinyin_without_tone": "yan"
      },
      {
        "pinyin": "yàn",
        "tone": 4,
        "char": "艳",
        "char_list": [
          "厌",
          "觃",
          "咽",
          "砚",
          "唁",
          "宴",
          "艳",
          "验",
          "谚",
          "堰",
          "焰",
          "雁",
          "墕",
          "燕",
          "嬿"
        ],
        "pinyin_without_tone": "yan"
      },
    ]
  },
  "yang": {
    "pinyin_without_tone": "yang",
    "option_list": [
      {
        "pinyin": "yāng",
        "tone": 1,
        "char": "央",
        "char_list": [
          "央",
          "咉",
          "殃",
          "秧",
          "鸯"
        ],
        "pinyin_without_tone": "yang"
      },
      {
        "pinyin": "yáng",
        "tone": 2,
        "char": "扬",
        "char_list": [
          "扬",
          "羊",
          "阳",
          "杨",
          "飏",
          "钖",
          "垟",
          "洋"
        ],
        "pinyin_without_tone": "yang"
      },
      {
        "pinyin": "yǎng",
        "tone": 3,
        "char": "仰",
        "char_list": [
          "仰",
          "养",
          "氧",
          "痒"
        ],
        "pinyin_without_tone": "yang"
      },
      {
        "pinyin": "yàng",
        "tone": 4,
        "char": "样",
        "char_list": [
          "样",
          "羕",
          "漾"
        ],
        "pinyin_without_tone": "yang"
      }
    ]
  },
  "yao": {
    "pinyin_without_tone": "yao",
    "option_list": [
      {
        "pinyin": "yāo",
        "tone": 1,
        "char": "邀",
        "char_list": [
          "夭",
          "吆",
          "妖",
          "腰",
          "邀"
        ],
        "pinyin_without_tone": "yao"
      },
      {
        "pinyin": "yáo",
        "tone": 2,
        "char": "遥",
        "char_list": [
          "尧",
          "肴",
          "垚",
          "姚",
          "轺",
          "窑",
          "谣",
          "媱",
          "摇",
          "猺",
          "遥"
        ],
        "pinyin_without_tone": "yao"
      },
      {
        "pinyin": "yào",
        "tone": 4,
        "char": "耀",
        "char_list": [
          "药",
          "要",
          "耀"
        ],
        "pinyin_without_tone": "yao"
      },
    ]
  },
  "ye": {
    "pinyin_without_tone": "ye",
    "option_list": [
      {
        "pinyin": "yé",
        "tone": 2,
        "char": "爷",
        "char_list": [
          "爷",
          "铘"
        ],
        "pinyin_without_tone": "ye"
      },
      {
        "pinyin": "yě",
        "tone": 3,
        "char": "冶",
        "char_list": [
          "也",
          "冶",
          "野"
        ],
        "pinyin_without_tone": "ye"
      },
      {
        "pinyin": "yè",
        "tone": 4,
        "char": "业",
        "char_list": [
          "业",
          "叶",
          "页",
          "夜",
          "晔",
          "液",
          "腋",
          "馌"
        ],
        "pinyin_without_tone": "ye"
      },
      {
        "pinyin": "yē",
        "tone": 1,
        "char": "椰",
        "char_list": [
          "倻",
          "椰"
        ],
        "pinyin_without_tone": "ye"
      },
    ]
  },
  "yi": {
    "pinyin_without_tone": "yi",
    "option_list": [
      {
        "pinyin": "yī",
        "tone": 1,
        "char": "依",
        "char_list": [
          "一",
          "伊",
          "衣",
          "医",
          "依",
          "洢",
          "壹",
          "欹"
        ],
        "pinyin_without_tone": "yi"
      },
      {
        "pinyin": "yí",
        "tone": 2,
        "char": "仪",
        "char_list": [
          "仪",
          "夷",
          "宜",
          "怡",
          "姨",
          "贻",
          "宧",
          "扅",
          "胰",
          "移",
          "遗",
          "椸",
          "疑",
          "簃"
        ],
        "pinyin_without_tone": "yi"
      },
      {
        "pinyin": "yǐ",
        "tone": 3,
        "char": "倚",
        "char_list": [
          "乙",
          "已",
          "佁",
          "矣",
          "舣",
          "蚁",
          "倚",
          "扆",
          "酏",
          "椅"
        ],
        "pinyin_without_tone": "yi"
      },
      {
        "pinyin": "yì",
        "tone": 4,
        "char": "忆",
        "char_list": [
          "义",
          "亿",
          "忆",
          "艺",
          "议",
          "亦",
          "屹",
          "异",
          "役",
          "抑",
          "杙",
          "译",
          "邑",
          "易",
          "枍",
          "绎",
          "疫",
          "益",
          "谊",
          "勚",
          "逸",
          "意",
          "溢",
          "裛",
          "嫕",
          "潩",
          "瘗",
          "毅",
          "鹝",
          "鹢",
          "翼",
          "镱"
        ],
        "pinyin_without_tone": "yi"
      },
    ]
  },
  "yin": {
    "pinyin_without_tone": "yin",
    "option_list": [
      {
        "pinyin": "yīn",
        "tone": 1,
        "char": "因",
        "char_list": [
          "因",
          "阴",
          "姻",
          "茵",
          "音",
          "殷",
          "溵",
          "禋"
        ],
        "pinyin_without_tone": "yin"
      },
      {
        "pinyin": "yín",
        "tone": 2,
        "char": "银",
        "char_list": [
          "吟",
          "寅",
          "崟",
          "淫",
          "银",
          "嚚"
        ],
        "pinyin_without_tone": "yin"
      },
      {
        "pinyin": "yǐn",
        "tone": 3,
        "char": "隐",
        "char_list": [
          "引",
          "饮",
          "蚓",
          "隐",
          "瘾"
        ],
        "pinyin_without_tone": "yin"
      },
      {
        "pinyin": "yìn",
        "tone": 4,
        "char": "印",
        "char_list": [
          "荫",
          "印"
        ],
        "pinyin_without_tone": "yin"
      },
    ]
  },
  "ying": {
    "pinyin_without_tone": "ying",
    "option_list": [
      {
        "pinyin": "yīng",
        "tone": 1,
        "char": "应",
        "char_list": [
          "应",
          "英",
          "莺",
          "婴",
          "媖",
          "樱",
          "鹦",
          "鹰"
        ],
        "pinyin_without_tone": "ying"
      },
      {
        "pinyin": "yíng",
        "tone": 2,
        "char": "迎",
        "char_list": [
          "迎",
          "盈",
          "荧",
          "莹",
          "萤",
          "营",
          "溁",
          "溁",
          "潆",
          "蝇",
          "赢"
        ],
        "pinyin_without_tone": "ying"
      },
      {
        "pinyin": "yǐng",
        "tone": 3,
        "char": "影",
        "char_list": [
          "颖",
          "影"
        ],
        "pinyin_without_tone": "ying"
      },
      {
        "pinyin": "yìng",
        "tone": 4,
        "char": "映",
        "char_list": [
          "映",
          "硬"
        ],
        "pinyin_without_tone": "ying"
      },
    ]
  },
  "yong": {
    "pinyin_without_tone": "yong",
    "option_list": [
      {
        "pinyin": "yōng",
        "tone": 1,
        "char": "庸",
        "char_list": [
          "佣",
          "拥",
          "庸",
          "鄘",
          "澭"
        ],
        "pinyin_without_tone": "yong"
      },
      {
        "pinyin": "yǒng",
        "tone": 3,
        "char": "永",
        "char_list": [
          "永",
          "咏",
          "泳",
          "勇",
          "栐",
          "埇",
          "涌",
          "踊",
          "鲬"
        ],
        "pinyin_without_tone": "yong"
      },
      {
        "pinyin": "yòng",
        "tone": 4,
        "char": "用",
        "char_list": [
          "用"
        ],
        "pinyin_without_tone": "yong"
      },
    ]
  },
  "you": {
    "pinyin_without_tone": "you",
    "option_list": [
      {
        "pinyin": "yōu",
        "tone": 1,
        "char": "优",
        "char_list": [
          "优",
          "忧",
          "幽",
          "悠",
          "麀",
          "耰"
        ],
        "pinyin_without_tone": "you"
      },
      {
        "pinyin": "yóu",
        "tone": 2,
        "char": "游",
        "char_list": [
          "尢",
          "尤",
          "由",
          "犹",
          "邮",
          "油",
          "游"
        ],
        "pinyin_without_tone": "you"
      },
      {
        "pinyin": "yǒu",
        "tone": 3,
        "char": "友",
        "char_list": [
          "友",
          "有",
          "酉",
          "铕",
          "槱"
        ],
        "pinyin_without_tone": "you"
      },
      {
        "pinyin": "yòu",
        "tone": 4,
        "char": "右",
        "char_list": [
          "又",
          "右",
          "幼",
          "佑",
          "祐",
          "诱"
        ],
        "pinyin_without_tone": "you"
      },
    ]
  },
  "yu": {
    "pinyin_without_tone": "yu",
    "option_list": [
      {
        "pinyin": "yú",
        "tone": 2,
        "char": "渔",
        "char_list": [
          "于",
          "邘",
          "余",
          "鱼",
          "舁",
          "娱",
          "渔",
          "隅",
          "愉",
          "渝",
          "逾",
          "愚",
          "榆",
          "艅",
          "窬",
          "舆",
          "褕",
          "髃"
        ],
        "pinyin_without_tone": "yu"
      },
      {
        "pinyin": "yǔ",
        "tone": 3,
        "char": "羽",
        "char_list": [
          "与",
          "予",
          "宇",
          "屿",
          "羽",
          "雨",
          "禹",
          "语",
          "敔",
          "鄅",
          "瑀"
        ],
        "pinyin_without_tone": "yu"
      },
      {
        "pinyin": "yù",
        "tone": 4,
        "char": "玉",
        "char_list": [
          "玉",
          "芋",
          "育",
          "郁",
          "狱",
          "浴",
          "预",
          "域",
          "欲",
          "喻",
          "寓",
          "御",
          "棫",
          "矞",
          "裕",
          "遇",
          "愈",
          "蓣",
          "誉",
          "薁",
          "豫",
          "遹",
          "燏"
        ],
        "pinyin_without_tone": "yu"
      },
    ]
  },
  "yuan": {
    "pinyin_without_tone": "yuan",
    "option_list": [
      {
        "pinyin": "yuān",
        "tone": 1,
        "char": "渊",
        "char_list": [
          "冤",
          "眢",
          "鸳",
          "渊",
          "蜎"
        ],
        "pinyin_without_tone": "yuan"
      },
      {
        "pinyin": "yuán",
        "tone": 2,
        "char": "元",
        "char_list": [
          "元",
          "员",
          "园",
          "原",
          "圆",
          "袁",
          "援",
          "缘",
          "嫄",
          "源",
          "猿",
          "羱"
        ],
        "pinyin_without_tone": "yuan"
      },
      {
        "pinyin": "yuǎn",
        "tone": 3,
        "char": "远",
        "char_list": [
          "远"
        ],
        "pinyin_without_tone": "yuan"
      },
      {
        "pinyin": "yuàn",
        "tone": 4,
        "char": "院",
        "char_list": [
          "苑",
          "怨",
          "院",
          "愿"
        ],
        "pinyin_without_tone": "yuan"
      },
    ]
  },
  "yue": {
    "pinyin_without_tone": "yue",
    "option_list": [
      {
        "pinyin": "yuē",
        "tone": 1,
        "char": "约",
        "char_list": [
          "曰",
          "约"
        ],
        "pinyin_without_tone": "yue"
      },
      {
        "pinyin": "yuè",
        "tone": 4,
        "char": "月",
        "char_list": [
          "钥",
          "月",
          "岳",
          "悦",
          "阅",
          "跃",
          "粤",
          "越",
          "瀹",
          "爚",
          "籥"
        ],
        "pinyin_without_tone": "yue"
      },
    ]
  },
  "yun": {
    "pinyin_without_tone": "yun",
    "option_list": [
      {
        "pinyin": "yūn",
        "tone": 1,
        "char": "缊",
        "char_list": [
          "晕",
          "缊"
        ],
        "pinyin_without_tone": "yun"
      },
      {
        "pinyin": "yún",
        "tone": 2,
        "char": "云",
        "char_list": [
          "云",
          "匀",
          "妘",
          "耘",
          "筼"
        ],
        "pinyin_without_tone": "yun"
      },
      {
        "pinyin": "yǔn",
        "tone": 3,
        "char": "允",
        "char_list": [
          "允",
          "陨"
        ],
        "pinyin_without_tone": "yun"
      },
      {
        "pinyin": "yùn",
        "tone": 4,
        "char": "韵",
        "char_list": [
          "孕",
          "运",
          "酝",
          "酝",
          "韵",
          "蕴"
        ],
        "pinyin_without_tone": "yun"
      },
    ]
  },
  "za": {
    "pinyin_without_tone": "za",
    "option_list": [
      {
        "pinyin": "zá",
        "tone": 2,
        "char": "杂",
        "char_list": [
          "杂",
          "砸"
        ],
        "pinyin_without_tone": "za"
      },
    ]
  },
  "zai": {
    "pinyin_without_tone": "zai",
    "option_list": [
      {
        "pinyin": "zāi",
        "tone": 1,
        "char": "哉",
        "char_list": [
          "灾",
          "哉",
          "栽"
        ],
        "pinyin_without_tone": "zai"
      },
      {
        "pinyin": "zǎi",
        "tone": 3,
        "char": "宰",
        "char_list": [
          "宰"
        ],
        "pinyin_without_tone": "zai"
      },
      {
        "pinyin": "zài",
        "tone": 4,
        "char": "载",
        "char_list": [
          "再",
          "在",
          "载"
        ],
        "pinyin_without_tone": "zai"
      }
    ]
  },
  "zan": {
    "pinyin_without_tone": "zan",
    "option_list": [

      {
        "pinyin": "zàn",
        "tone": 4,
        "char": "赞",
        "char_list": [
          "暂",
          "赞"
        ],
        "pinyin_without_tone": "zan"
      },
    ]
  },
  "zao": {
    "pinyin_without_tone": "zao",
    "option_list": [
      {
        "pinyin": "zǎo",
        "tone": 3,
        "char": "早",
        "char_list": [
          "早",
          "枣",
          "蚤",
          "澡",
          "藻"
        ],
        "pinyin_without_tone": "zao"
      },
      {
        "pinyin": "zào",
        "tone": 4,
        "char": "造",
        "char_list": [
          "灶",
          "皂",
          "造",
          "噪",
          "簉",
          "燥",
          "躁"
        ],
        "pinyin_without_tone": "zao"
      },
      {
        "pinyin": "záo",
        "tone": 2,
        "char": "凿",
        "char_list": [
          "凿"
        ],
        "pinyin_without_tone": "zao"
      },
    ]
  },
  "ze": {
    "pinyin_without_tone": "ze",
    "option_list": [
      {
        "pinyin": "zé",
        "tone": 2,
        "char": "泽",
        "char_list": [
          "则",
          "择",
          "泽",
          "责"
        ],
        "pinyin_without_tone": "ze"
      }
    ]
  },
  "zeng": {
    "pinyin_without_tone": "zeng",
    "option_list": [
      {
        "pinyin": "zēng",
        "tone": 1,
        "char": "增",
        "char_list": [
          "鄫",
          "增",
          "憎"
        ],
        "pinyin_without_tone": "zeng"
      },
      {
        "pinyin": "zèng",
        "tone": 4,
        "char": "赠",
        "char_list": [
          "赠"
        ],
        "pinyin_without_tone": "zeng"
      },
    ]
  },
  "zha": {
    "pinyin_without_tone": "zha",
    "option_list": [
      {
        "pinyin": "zhā",
        "tone": 1,
        "char": "扎",
        "char_list": [
          "查",
          "扎",
          "挓",
          "哳",
          "喳",
          "渣"
        ],
        "pinyin_without_tone": "zha"
      },
      {
        "pinyin": "zhá",
        "tone": 2,
        "char": "闸",
        "char_list": [
          "闸"
        ],
        "pinyin_without_tone": "zha"
      },
      {
        "pinyin": "zhǎ",
        "tone": 3,
        "char": "眨",
        "char_list": [
          "眨",
          "鲝"
        ],
        "pinyin_without_tone": "zha"
      },
      {
        "pinyin": "zhà",
        "tone": 4,
        "char": "炸",
        "char_list": [
          "乍",
          "诈",
          "炸",
          "痄",
          "榨"
        ],
        "pinyin_without_tone": "zha"
      },
    ]
  },
  "zhai": {
    "pinyin_without_tone": "zhai",
    "option_list": [
      {
        "pinyin": "zhāi",
        "tone": 1,
        "char": "斋",
        "char_list": [
          "斋",
          "摘"
        ],
        "pinyin_without_tone": "zhai"
      },
      {
        "pinyin": "zhái",
        "tone": 2,
        "char": "宅",
        "char_list": [
          "宅"
        ],
        "pinyin_without_tone": "zhai"
      },
      {
        "pinyin": "zhǎi",
        "tone": 3,
        "char": "窄",
        "char_list": [
          "窄"
        ],
        "pinyin_without_tone": "zhai"
      },
      {
        "pinyin": "zhài",
        "tone": 4,
        "char": "寨",
        "char_list": [
          "债",
          "寨"
        ],
        "pinyin_without_tone": "zhai"
      }
    ]
  },
  "zhan": {
    "pinyin_without_tone": "zhan",
    "option_list": [
      {
        "pinyin": "zhān",
        "tone": 1,
        "char": "沾",
        "char_list": [
          "沾",
          "沾",
          "毡",
          "栴",
          "粘",
          "瞻",
          "鹯",
          "鳣",
          "嶦",
        ],
        "pinyin_without_tone": "zhan"
      },
      {
        "pinyin": "zhǎn",
        "tone": 3,
        "char": "展",
        "char_list": [
          "辗",
          "斩",
          "飐",
          "展",
          "盏",
          "崭",
          "搌"
        ],
        "pinyin_without_tone": "zhan"
      },
      {
        "pinyin": "zhàn",
        "tone": 4,
        "char": "战",
        "char_list": [
          "占",
          "战",
          "栈",
          "站",
          "偡",
          "绽"
        ],
        "pinyin_without_tone": "zhan"
      },
    ]
  },
  "zhang": {
    "pinyin_without_tone": "zhang",
    "option_list": [
      {
        "pinyin": "zhāng",
        "tone": 1,
        "char": "彰",
        "char_list": [
          "张",
          "章",
          "鄣",
          "嫜",
          "彰",
          "暲",
          "樟"
        ],
        "pinyin_without_tone": "zhang"
      },
      {
        "pinyin": "zhǎng",
        "tone": 3,
        "char": "涨",
        "char_list": [
          "长",
          "涨",
          "掌"
        ],
        "pinyin_without_tone": "zhang"
      },
      {
        "pinyin": "zhàng",
        "tone": 4,
        "char": "仗",
        "char_list": [
          "丈",
          "仗",
          "帐",
          "杖",
          "胀",
          "账",
          "障"
        ],
        "pinyin_without_tone": "zhang"
      }
    ]
  },
  "zhao": {
    "pinyin_without_tone": "zhao",
    "option_list": [
      {
        "pinyin": "zhāo",
        "tone": 1,
        "char": "招",
        "char_list": [
          "招",
          "昭"
        ],
        "pinyin_without_tone": "zhao"
      },
      {
        "pinyin": "zhǎo",
        "tone": 3,
        "char": "沼",
        "char_list": [
          "爪",
          "找",
          "沼"
        ],
        "pinyin_without_tone": "zhao"
      },
      {
        "pinyin": "zhào",
        "tone": 4,
        "char": "照",
        "char_list": [
          "召",
          "兆",
          "赵",
          "旐",
          "照",
          "罩",
          "肇",
          "曌"
        ],
        "pinyin_without_tone": "zhao"
      },
    ]
  },
  "zhe": {
    "pinyin_without_tone": "zhe",
    "option_list": [
      {
        "pinyin": "zhe",
        "tone": 0,
        "char": "着",
        "char_list": [
          "着",
          "著"
        ],
        "pinyin_without_tone": "zhe"
      },
      {
        "pinyin": "zhē",
        "tone": 1,
        "char": "遮",
        "char_list": [
          "遮"
        ],
        "pinyin_without_tone": "zhe"
      },
      {
        "pinyin": "zhé",
        "tone": 2,
        "char": "哲",
        "char_list": [
          "折",
          "哲",
          "詟",
          "辙",
          "晢",
          "喆"
        ],
        "pinyin_without_tone": "zhe"
      },
      {
        "pinyin": "zhě",
        "tone": 3,
        "char": "者",
        "char_list": [
          "者",
          "啫"
        ],
        "pinyin_without_tone": "zhe"
      },
      {
        "pinyin": "zhè",
        "tone": 4,
        "char": "浙",
        "char_list": [
          "这",
          "浙",
          "蔗"
        ],
        "pinyin_without_tone": "zhe"
      },
    ]
  },
  "zhen": {
    "pinyin_without_tone": "zhen",
    "option_list": [
      {
        "pinyin": "zhēn",
        "tone": 1,
        "char": "贞",
        "char_list": [
          "贞",
          "针",
          "针",
          "侦",
          "浈",
          "珍",
          "真",
          "葴",
          "斟",
          "瑧",
          "禛"
        ],
        "pinyin_without_tone": "zhen"
      },
      {
        "pinyin": "zhěn",
        "tone": 3,
        "char": "诊",
        "char_list": [
          "诊",
          "枕",
          "昣",
          "疹",
          "袗",
          "稹"
        ],
        "pinyin_without_tone": "zhen"
      },
      {
        "pinyin": "zhèn",
        "tone": 4,
        "char": "阵",
        "char_list": [
          "阵",
          "纼",
          "振",
          "镇",
          "震"
        ],
        "pinyin_without_tone": "zhen"
      },
    ]
  },
  "zheng": {
    "pinyin_without_tone": "zheng",
    "option_list": [
      {
        "pinyin": "zhēng",
        "tone": 1,
        "char": "征",
        "char_list": [
          "鲭",
          "争",
          "征",
          "怔",
          "挣",
          "狰",
          "睁",
          "筝",
          "蒸"
        ],
        "pinyin_without_tone": "zheng"
      },
      {
        "pinyin": "zhěng",
        "tone": 3,
        "char": "整",
        "char_list": [
          "拯",
          "整"
        ],
        "pinyin_without_tone": "zheng"
      },
      {
        "pinyin": "zhèng",
        "tone": 4,
        "char": "政",
        "char_list": [
          "正",
          "证",
          "郑",
          "政",
          "症"
        ],
        "pinyin_without_tone": "zheng"
      },
    ]
  },
  "zhi": {
    "pinyin_without_tone": "zhi",
    "option_list": [
      {
        "pinyin": "zhī",
        "tone": 1,
        "char": "芝",
        "char_list": [
          "之",
          "支",
          "汁",
          "芝",
          "吱",
          "枝",
          "知",
          "织",
          "肢",
          "脂",
          "稙",
          "榰",
          "蜘"
        ],
        "pinyin_without_tone": "zhi"
      },
      {
        "pinyin": "zhí",
        "tone": 2,
        "char": "执",
        "char_list": [
          "铁",
          "执",
          "侄",
          "直",
          "值",
          "职",
          "植",
          "殖",
          "絷"
        ],
        "pinyin_without_tone": "zhi"
      },
      {
        "pinyin": "zhǐ",
        "tone": 3,
        "char": "址",
        "char_list": [
          "止",
          "只",
          "只",
          "旨",
          "址",
          "纸",
          "指",
          "轵",
          "趾",
          "黹"
        ],
        "pinyin_without_tone": "zhi"
      },
      {
        "pinyin": "zhì",
        "tone": 4,
        "char": "志",
        "char_list": [
          "至",
          "志",
          "忮",
          "制",
          "帜",
          "治",
          "质",
          "庤",
          "挚",
          "晊",
          "秩",
          "致",
          "掷",
          "梽",
          "畤",
          "窒",
          "铚",
          "智",
          "滞",
          "滍",
          "稚",
          "置",
          "锧"
        ],
        "pinyin_without_tone": "zhi"
      },
    ]
  },
  "zhong": {
    "pinyin_without_tone": "zhong",
    "option_list": [
      {
        "pinyin": "zhōng",
        "tone": 1,
        "char": "中",
        "char_list": [
          "中",
          "忠",
          "终",
          "柊",
          "钟",
          "钟",
          "舯",
          "衷",
          "锺"
        ],
        "pinyin_without_tone": "zhong"
      },
      {
        "pinyin": "zhǒng",
        "tone": 3,
        "char": "种",
        "char_list": [
          "肿",
          "种",
          "穜"
        ],
        "pinyin_without_tone": "zhong"
      },
      {
        "pinyin": "zhòng",
        "tone": 4,
        "char": "众",
        "char_list": [
          "仲",
          "众",
          "茽",
          "重"
        ],
        "pinyin_without_tone": "zhong"
      }
    ]
  },
  "zhou": {
    "pinyin_without_tone": "zhou",
    "option_list": [
      {
        "pinyin": "zhōu",
        "tone": 1,
        "char": "舟",
        "char_list": [
          "州",
          "舟",
          "周",
          "洲",
          "辀",
          "鸼",
          "粥"
        ],
        "pinyin_without_tone": "zhou"
      },
      {
        "pinyin": "zhòu",
        "tone": 4,
        "char": "宙",
        "char_list": [
          "咒",
          "宙",
          "昼",
          "皱",
          "酎",
          "骤"
        ],
        "pinyin_without_tone": "zhou"
      },
      {
        "pinyin": "zhóu",
        "tone": 2,
        "char": "轴",
        "char_list": [
          "轴"
        ],
        "pinyin_without_tone": "zhou"
      },
    ]
  },
  "zhu": {
    "pinyin_without_tone": "zhu",
    "option_list": [
      {
        "pinyin": "zhū",
        "tone": 1,
        "char": "珠",
        "char_list": [
          "朱",
          "株",
          "珠",
          "诸",
          "猪",
          "蛛",
          "橥"
        ],
        "pinyin_without_tone": "zhu"
      },
      {
        "pinyin": "zhú",
        "tone": 2,
        "char": "竹",
        "char_list": [
          "竹",
          "烛",
          "逐",
          "舳",
          "蠋",
          "筑"
        ],
        "pinyin_without_tone": "zhu"
      },
      {
        "pinyin": "zhǔ",
        "tone": 3,
        "char": "主",
        "char_list": [
          "主",
          "拄",
          "煮",
          "嘱",
          "瞩"
        ],
        "pinyin_without_tone": "zhu"
      },
      {
        "pinyin": "zhù",
        "tone": 4,
        "char": "祝",
        "char_list": [
          "住",
          "助",
          "纻",
          "注",
          "贮",
          "驻",
          "柱",
          "祝",
          "疰",
          "砫",
          "蛀",
          "铸"
        ],
        "pinyin_without_tone": "zhu"
      },
    ]
  },
  "zhuan": {
    "pinyin_without_tone": "zhuan",
    "option_list": [
      {
        "pinyin": "zhuān",
        "tone": 1,
        "char": "专",
        "char_list": [
          "专",
          "砖"
        ],
        "pinyin_without_tone": "zhuan"
      },
      {
        "pinyin": "zhuǎn",
        "tone": 3,
        "char": "转",
        "char_list": [
          "转"
        ],
        "pinyin_without_tone": "zhuan"
      },
      {
        "pinyin": "zhuàn",
        "tone": 4,
        "char": "赚",
        "char_list": [
          "瑑",
          "赚",
          "撰"
        ],
        "pinyin_without_tone": "zhuan"
      },
    ]
  },
  "zhuang": {
    "pinyin_without_tone": "zhuang",
    "option_list": [
      {
        "pinyin": "zhuāng",
        "tone": 1,
        "char": "庄",
        "char_list": [
          "妆",
          "庄",
          "桩",
          "装"
        ],
        "pinyin_without_tone": "zhuang"
      },
      {
        "pinyin": "zhuàng",
        "tone": 4,
        "char": "壮",
        "char_list": [
          "壮",
          "状",
          "漴",
          "撞"
        ],
        "pinyin_without_tone": "zhuang"
      }
    ]
  },
  "zhui": {
    "pinyin_without_tone": "zhui",
    "option_list": [
      {
        "pinyin": "zhuī",
        "tone": 1,
        "char": "追",
        "char_list": [
          "隹",
          "追",
          "锥"
        ],
        "pinyin_without_tone": "zhui"
      },
      {
        "pinyin": "zhuì",
        "tone": 4,
        "char": "缀",
        "char_list": [
          "坠",
          "缀",
          "赘"
        ],
        "pinyin_without_tone": "zhui"
      }
    ]
  },
  "zhun": {
    "pinyin_without_tone": "zhun",
    "option_list": [
      {
        "pinyin": "zhǔn",
        "tone": 3,
        "char": "准",
        "char_list": [
          "准"
        ],
        "pinyin_without_tone": "zhun"
      },
    ]
  },
  "zhuo": {
    "pinyin_without_tone": "zhuo",
    "option_list": [
      {
        "pinyin": "zhuō",
        "tone": 1,
        "char": "卓",
        "char_list": [
          "卓",
          "拙",
          "捉",
          "桌"
        ],
        "pinyin_without_tone": "zhuo"
      },
      {
        "pinyin": "zhuó",
        "tone": 2,
        "char": "浊",
        "char_list": [
          "灼",
          "叕",
          "茁",
          "浊",
          "酌",
          "啄",
          "晫",
          "椓",
          "禚"
        ],
        "pinyin_without_tone": "zhuo"
      },
    ]
  },
  "zi": {
    "pinyin_without_tone": "zi",
    "option_list": [
      {
        "pinyin": "zī",
        "tone": 1,
        "char": "姿",
        "char_list": [
          "兹",
          "咨",
          "姿",
          "赀",
          "资",
          "滋",
          "粢",
          "鄑",
          "觜",
          "鼒"
        ],
        "pinyin_without_tone": "zi"
      },
      {
        "pinyin": "zǐ",
        "tone": 3,
        "char": "仔",
        "char_list": [
          "仔",
          "姊",
          "籽",
          "耔",
          "笫",
          "紫"
        ],
        "pinyin_without_tone": "zi"
      },
      {
        "pinyin": "zì",
        "tone": 4,
        "char": "自",
        "char_list": [
          "字",
          "自"
        ],
        "pinyin_without_tone": "zi"
      },

    ]
  },
  "zong": {
    "pinyin_without_tone": "zong",
    "option_list": [
      {
        "pinyin": "zōng",
        "tone": 1,
        "char": "宗",
        "char_list": [
          "宗",
          "倧",
          "综",
          "棕",
          "腙",
          "踪",
          "鬷"
        ],
        "pinyin_without_tone": "zong"
      },
      {
        "pinyin": "zǒng",
        "tone": 3,
        "char": "总",
        "char_list": [
          "总"
        ],
        "pinyin_without_tone": "zong"
      },
      {
        "pinyin": "zòng",
        "tone": 4,
        "char": "纵",
        "char_list": [
          "纵"
        ],
        "pinyin_without_tone": "zong"
      }
    ]
  },
  "zou": {
    "pinyin_without_tone": "zou",
    "option_list": [

      {
        "pinyin": "zòu",
        "tone": 4,
        "char": "奏",
        "char_list": [
          "奏",
          "揍"
        ],
        "pinyin_without_tone": "zou"
      },

    ]
  },
  "zu": {
    "pinyin_without_tone": "zu",
    "option_list": [
      {
        "pinyin": "zú",
        "tone": 2,
        "char": "族",
        "char_list": [
          "足",
          "卒",
          "族"
        ],
        "pinyin_without_tone": "zu"
      },
      {
        "pinyin": "zǔ",
        "tone": 3,
        "char": "祖",
        "char_list": [
          "阻",
          "组",
          "珇",
          "祖"
        ],
        "pinyin_without_tone": "zu"
      },
    ]
  },
  "zui": {
    "pinyin_without_tone": "zui",
    "option_list": [
      {
        "pinyin": "zuì",
        "tone": 4,
        "char": "最",
        "char_list": [
          "最",
          "罪",
          "槜",
          "醉"
        ],
        "pinyin_without_tone": "zui"
      }
    ]
  },
  "zun": {
    "pinyin_without_tone": "zun",
    "option_list": [
      {
        "pinyin": "zūn",
        "tone": 1,
        "char": "尊",
        "char_list": [
          "尊",
          "嶟",
          "遵"
        ],
        "pinyin_without_tone": "zun"
      },
    ]
  },
  "zuo": {
    "pinyin_without_tone": "zuo",
    "option_list": [

      {
        "pinyin": "zuǒ",
        "tone": 3,
        "char": "左",
        "char_list": [
          "左",
          "佐"
        ],
        "pinyin_without_tone": "zuo"
      },
      {
        "pinyin": "zuò",
        "tone": 4,
        "char": "作",
        "char_list": [
          "作",
          "坐",
          "阼",
          "岞",
          "座",
          "做"
        ],
        "pinyin_without_tone": "zuo"
      }
    ]
  },
  "chuo": {
    "pinyin_without_tone": "chuo",
    "option_list": [
      {
        "pinyin": "chuò",
        "tone": 4,
        "char": "绰",
        "char_list": [
          "绰"
        ],
        "pinyin_without_tone": "chuo"
      },
    ]
  },
  "seng": {
    "pinyin_without_tone": "seng",
    "option_list": [
      {
        "pinyin": "sēng",
        "tone": 1,
        "char": "僧",
        "char_list": [
          "僧"
        ],
        "pinyin_without_tone": "seng"
      }
    ]
  },

}

/**
 * 根据字的范围, 过滤
 */
function pinyin_filter(legal_char_list: string[]) {
  let legal_char_set = new Set(legal_char_list)

  let new_pinyin_map: {
    [key: string]: Type_Pinyin
  } = {}
  for (let pinyin_without_tone of Object.keys(total_result)) {
    let item = total_result[pinyin_without_tone]
    let new_option_list: Type_Pinyin['option_list'] = []
    for (let option_item of item.option_list) {
      let legal_char_list = option_item.char_list.filter(char => {
        return legal_char_set.has(char)
      })
      if (legal_char_list.length === 0) {
        continue
      }
      let new_option_item: typeof option_item = {
        ...option_item,
        "char_list": legal_char_list
      }
      if (new_option_item.char_list.includes(new_option_item.char) === false) {
        new_option_item.char = new_option_item.char_list[0]
        new_option_item.is_need_check = true
      }
      new_option_list.push(new_option_item)

      // 对新选项列表进行排序
      new_option_list.sort((a, b) => { return a.tone - b.tone })
    }
    if (new_option_list.length === 0) {
      continue
    }
    new_pinyin_map[pinyin_without_tone] = {
      "option_list": new_option_list,
      pinyin_without_tone
    }
  }
  return new_pinyin_map
}

export const Const_Level_0_Pinyin = pinyin_filter(Const_Level_0)
export const Const_Level_1_Pinyin = pinyin_filter([...Const_Level_0, ...Const_Level_1])
export const Const_Level_2_Pinyin = pinyin_filter([...Const_Level_0, ...Const_Level_1, ...Const_Level_2])

export default total_result