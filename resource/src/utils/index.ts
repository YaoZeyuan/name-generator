import { Type_Char_Item } from "../const/字库"

export function isCharLegal(beforChar: Type_Char_Item, currentChar: Type_Char_Item) {
    // 规则1-两字音调不能相同
    if (beforChar.tone === currentChar.tone) {
        return false
    }
    // 规则2-不能使用叠音
    if (beforChar.pinyin_without_tone === currentChar.pinyin_without_tone) {
        return false
    }
    // 规则3-不使用轻声
    if (currentChar.tone === 0) {
        return false
    }
    // 规则4-音律富于变化
    switch (beforChar.tone) {
        case 0:
        case 1:
            // -
            if (currentChar.tone === 1) {
                // 一声后只有一声是false
                return false
            }
            break
        case 2:
        // 二声和三声收尾都是扬声, 等价
        // /
        case 3:
            // \/
            if (currentChar.tone === 2) {
                // 扬声后二声是false, 不能继续扬
                return false
            }
            break
        case 4:
            // \
            if (currentChar.tone === 4) {
                // 入声后四声是false, 不能继续降
                return false
            }
            break
    }
    return true
}