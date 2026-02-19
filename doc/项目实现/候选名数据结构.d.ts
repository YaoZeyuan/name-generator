type CandidateName = {
    // 候选名
    name: string;
    // 原始数据来源
    source: string;
    chars: Char[]; // 字级信息
    // 评分
    score: {
        // 最终评分结果
        overall: number;
        // 分项评分
        breakdown: {
            phonetic: ScorePhonetic; // 发音计算结果
            semantic: ScoreSemantic; // 语义评价
            culture: ScoreCulture; // 典故出处
            rarity: ScoreRarity; // 稀有度
            visual: ScoreVisual; // 字形
        }
    }
    // 标志位
    "flags": {
        // 是否常用名
        "isCommon": boolean,
        // 是否有稀有字
        "hasRareChar": boolean,
        // 是否难发音
        "isHardPronounce": boolean
    }

    // 其他字段，根据实际需求预留

}

// 分项数据结构定义-含字段含义
// 发音计算-对应组合
type ScorePhonetic = {
    // 声母列表
    initials: string[];
    // 韵母列表
    finals: string[];
    // 音调列表
    tones: number[];
    // 音调模式
    tonePattern: string;
    // 是否有重复声母
    doubleInitial: boolean;
    // 是否有重复韵母
    doubleFinal: boolean;
    // 平滑度评分
    smoothScore: number;
}

// 语义评价-对应组合
type ScoreSemantic = {
    // 含义评分
    meaningScore: number;
    // 情感倾向
    sentiment: string;
    // 标签列表
    tags: string[];
}

// 典故评价-对应组合
type ScoreCulture = {
    // 是否有来源
    hasSource: boolean;
    // 来源类型
    sourceType: string;
    // 来源详情
    sourceDetail: string;
    // 来源质量评分
    sourceScore: number;
}

// 稀有度评价-对应组合
type ScoreRarity = {
    // 字符频率平均分
    charFreqAvg: number;
    // 名称出现频率
    nameFreq: number;
    // 稀有度评分
    rarityScore: number;
}

// 字形评价-对应组合
type ScoreVisual = {
    // 是否对称
    symmetry: boolean;
    // 笔画均衡评分
    balanceScore: number;
}

type Char = {
    // 具体字
    "char": string;
    // 对应拼音+音调，可能有多个
    "pinyin": {
        current: Pinyin,
        all: Pinyin[]
    }
    // 部首
    "radical": string;
    // 笔画数
    "strokes": number;
    // 字形结构
    "structure": StructureType;
    // 是否多音字
    "isPolyphone": boolean;
    // 字符频率
    "frequency": number;
}

// 字形结构类型
type StructureType = "上下" | "左右" | "其他";

type Pinyin = {
    // 具体拼音
    "pinyin": string;
    // 音调
    "tone": number;
    // 音调模式
    "tonePattern": TonePatternType;
    // 声母
    "initialConsonant": initialConsonantType;
    // 韵母
    "finalVowel": finalVowelType
}

type initialConsonantType = 'b' | 'p' | 'm' | 'f' | 'd' | 't' | 'n' | 'l' | 'g' | 'k' | 'h' | 'j' | 'q' | 'x' | 'zh' | 'ch' | 'sh' | 'r' | 'z' | 'c' | 's' | 'y' | 'w';
type finalVowelType = 'a' | 'e' | 'i' | 'o' | 'u' | 'ai' | 'ei' | 'ou' | 'iu' | 'ua' | 'ue' | 'ui' | 'uo';

// 音调模式类型
type TonePatternType = "仄平" | "仄上" | "仄下" | "平上" | "平下" | "上平" | "下平";
