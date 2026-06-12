# 候选名数据库

本目录由 `scripts/data/buildCandidateDb.ts` 生成，输入来自 `database/extracted/name_tokens.json`。

- `candidate_name_db.json`: 统一候选二字名库，保留兼容 `name-core` 的字段，并追加 `sourceRefs`、频次和抽取方法。
- `candidate_char_db.json`: 查询和评分所需字级拼音信息，读音数据来自旧拼音字库。
- `source_index.json`: 来源优先级和生成统计。

生成时间：2026-06-12T17:12:12.453Z

候选名总数：138856
