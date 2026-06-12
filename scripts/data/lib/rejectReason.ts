import type { CharDb } from "../../../packages/name-core/src";
import type { ExtractedNameToken, RejectReasonCode } from "../types";
import { isTwoChineseChars, splitChars } from "./normalizeText";

export const REJECT_REASON_LABELS: Record<RejectReasonCode, string> = {
  empty_text: "空文本",
  not_two_chinese_chars: "不是二字中文候选",
  char_not_in_db: "候选字不在读音字库中",
  contains_polyphone: "包含未主动定音的多音字",
  non_name_word: "明显不是人名词",
  missing_source_ref: "缺少可追溯来源",
  unsupported_source_shape: "来源结构暂不支持",
};

export function validateToken(token: ExtractedNameToken, charDb: CharDb): RejectReasonCode[] {
  const reasons = new Set<RejectReasonCode>(token.rejectReasons ?? []);
  if (!token.token) {
    reasons.add("empty_text");
  }
  if (!isTwoChineseChars(token.token)) {
    reasons.add("not_two_chinese_chars");
  }
  for (const char of splitChars(token.token)) {
    if (!charDb[char]) {
      reasons.add("char_not_in_db");
    }
  }
  if (token.sourceRefs.length === 0) {
    reasons.add("missing_source_ref");
  }
  return Array.from(reasons);
}

export function isKnownRejectReason(reason: string): reason is RejectReasonCode {
  return Object.prototype.hasOwnProperty.call(REJECT_REASON_LABELS, reason);
}

