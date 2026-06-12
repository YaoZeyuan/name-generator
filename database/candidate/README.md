# 候选名数据库

本目录由 `scripts/data/buildCandidateDb.ts` 生成，输入来自 `database/extracted/name_tokens.json`。

- `candidate_name_db.json`: 默认来源（wealth_selected）候选二字名库，保留兼容 `name-core` 的字段，并追加 `sourceRefs`、频次和抽取方法。
- `sources/*.candidate_name_db.json`: 按来源拆分的候选二字名库。实际查询应按 `sourcePreference` 只加载一个来源分片。
- `candidate_char_db.json`: 查询和评分所需字级拼音信息，读音数据来自旧拼音字库。
- `source_index.json`: 来源优先级和生成统计。

生成时间：2026-06-12T17:54:06.632Z

去重候选名总数：138856

默认来源候选名数：5764
