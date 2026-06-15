import type { SourceConfig } from "./types";

export const SOURCE_CONFIGS: SourceConfig[] = [
  {
    id: "wealth",
    label: "财富论",
    priority: 1,
    weight: 14,
    category: "wealth",
    description: "私募基金和公司名中的二字词，按出现频率分位筛选",
  },
  {
    id: "academic",
    label: "五道口",
    priority: 2,
    weight: 17,
    category: "academic",
    description: "科研基金负责人、两院院士等现代稳重姓名，按出现频率分位筛选",
  },
  {
    id: "modern_people",
    label: "他山石",
    priority: 3,
    weight: 16,
    category: "modern",
    description: "现代公开姓名，贴近现实语感",
  },
  {
    id: "imperial_exam",
    label: "登科录",
    priority: 4,
    weight: 9,
    category: "historic",
    description: "历代进士姓名、字号和别号",
  },
  {
    id: "ancient_names",
    label: "古人云",
    priority: 5,
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
