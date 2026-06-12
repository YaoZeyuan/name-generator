import type { SourceConfig } from "./types";

export const SOURCE_CONFIGS: SourceConfig[] = [
  {
    id: "wealth_selected",
    label: "财富论-精选集",
    priority: 1,
    weight: 16,
    category: "wealth",
    description: "私募基金和公司名中的高频二字词，现代词感较强",
  },
  {
    id: "wealth_broad",
    label: "财富论-集思录",
    priority: 2,
    weight: 12,
    category: "wealth",
    description: "私募基金和公司名中的低频二字词，用于扩展灵感",
  },
  {
    id: "academic_selected",
    label: "五道口-精选集",
    priority: 3,
    weight: 18,
    category: "academic",
    description: "科研基金负责人、两院院士等现代稳重姓名",
  },
  {
    id: "academic_broad",
    label: "五道口-集思录",
    priority: 4,
    weight: 15,
    category: "academic",
    description: "CNKI 项目负责人姓名，用于补充候选",
  },
  {
    id: "modern_people",
    label: "他山石",
    priority: 5,
    weight: 16,
    category: "modern",
    description: "现代公开姓名，贴近现实语感",
  },
  {
    id: "imperial_exam",
    label: "登科录",
    priority: 6,
    weight: 9,
    category: "historic",
    description: "历代进士姓名、字号和别号",
  },
  {
    id: "ancient_names",
    label: "古人云",
    priority: 7,
    weight: 8,
    category: "historic",
    description: "古人姓名与字，文化来源较强",
  },
];

export const DEFAULT_SOURCE_ID = SOURCE_CONFIGS[0].id;

export function getSourceConfig(id: string): SourceConfig {
  const source = SOURCE_CONFIGS.find((item) => item.id === id);
  if (source) {
    return source;
  }
  return {
    id,
    label: id,
    priority: 99,
    weight: 1,
    category: "modern",
    description: "未知来源",
  };
}
