export const 音调_Map = {
    ü: 0,
    ǜ: 4,
    ǚ: 3,
    ǘ: 2,
    ǖ: 1,
    u: 0,
    ù: 4,
    ǔ: 3,
    ú: 2,
    ū: 1,
    o: 0,
    ò: 4,
    ǒ: 3,
    ó: 2,
    ō: 1,
    i: 0,
    ì: 4,
    ǐ: 3,
    í: 2,
    ī: 1,
    e: 0,
    è: 4,
    ě: 3,
    é: 2,
    ē: 1,
    a: 0,
    à: 4,
    ǎ: 3,
    á: 2,
    ā: 1,
};


const 音标_To_原字母 = {
    ü: "ü",
    ǜ: "ü",
    ǚ: "ü",
    ǘ: "ü",
    ǖ: "ü",
    u: "u",
    ù: "u",
    ǔ: "u",
    ú: "u",
    ū: "u",
    o: "o",
    ò: "o",
    ǒ: "o",
    ó: "o",
    ō: "o",
    i: "i",
    ì: "i",
    ǐ: "i",
    í: "i",
    ī: "i",
    e: "e",
    è: "e",
    ě: "e",
    é: "e",
    ē: "e",
    a: "a",
    à: "a",
    ǎ: "a",
    á: "a",
    ā: "a",
};

/**
 * 移除音标中的音调
 * @param voice 
 */
export function remove音调(voice: string) {
    let newVoice = []
    for (let char of voice) {
        let newChar = 音标_To_原字母[char] || char
        newVoice.push(newChar)
    }
    return newVoice.join("")
}

export type Type_音调 = 0 | 1 | 2 | 3 | 4
/**
 * 获取音标对应的音调(只会有一个韵母带音调, 且带音调的字母对应音调一定高于0. 所以可以转换为求最大值问题)
 * @param input 
 */
export function parse音标音调(input: string): Type_音调 {
    let max音调: Type_音调 = 0
    for (let char of input) {
        // 没有取到韵母/韵母为轻声, 相当于音调为0
        let 当前音调 = 音调_Map[char] || 0
        if (当前音调 >= max音调) {
            max音调 = 当前音调
        }
    }
    return max音调
}