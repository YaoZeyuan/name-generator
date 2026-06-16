import type { DataSourceAdapter } from "../types";
import { ancientNamesAdapter } from "./ancientNames";
import { imperialExamAdapter } from "./imperialExam";
import { modernPeopleAdapter } from "./modernPeople";
import { sciencePeopleAdapter } from "./sciencePeople";
import { wealthWordsAdapter } from "./wealthWords";

export const dataSourceAdapters: DataSourceAdapter[] = [
  modernPeopleAdapter,
  ancientNamesAdapter,
  sciencePeopleAdapter,
  imperialExamAdapter,
  wealthWordsAdapter,
];

