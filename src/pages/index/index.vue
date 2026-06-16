<template>
  <view class="index-page">
    <view class="top-bar">
      <view>
        <text class="app-title">好名有据</text>
        <text class="app-subtitle">筛选替代生成 · 好音律 · 好名字</text>
      </view>
      <view class="data-pill" :class="{ ready: sourceIndexReady }">
        {{ sourceIndexReady ? "数据已就绪" : "加载中" }}
      </view>
    </view>

    <view class="query-panel">
      <view class="form-grid">
        <view class="field-block compact">
          <text class="field-label">姓氏</text>
          <input
            class="text-input surname-input"
            maxlength="4"
            :value="surname"
            @input="onInput('surname', $event)"
          />
        </view>

        <view class="field-block">
          <text class="field-label">来源</text>
          <view class="source-scroll">
            <view
              v-for="source in sourceOptions"
              :key="source.id"
              class="source-chip"
              :class="{ active: selectedSourceId === source.id }"
              @click="selectSource(source.id)"
            >
              <view class="source-chip-main">
                <text>{{ source.shortLabel }}</text>
                <text class="source-count">{{ source.countText }}</text>
              </view>
              <button
                class="source-help-button"
                @click.stop="showSourceInfo(source.id)"
              >
                ?
              </button>
            </view>
          </view>
        </view>

        <view v-if="frequencyFilterEnabled" class="field-block wide">
          <view class="label-row">
            <text class="field-label">出现频率</text>
            <text class="field-help">{{ frequencySummary }}</text>
          </view>
          <view class="range-number-row">
            <view class="range-number">
              <text>从常见前</text>
              <input
                class="text-input range-number-input"
                type="number"
                min="1"
                max="100"
                :value="String(frequencyMin)"
                @input="onFrequencyInput('min', $event)"
              />
              <text>%</text>
            </view>
            <view class="range-number">
              <text>到常见前</text>
              <input
                class="text-input range-number-input"
                type="number"
                min="1"
                max="100"
                :value="String(frequencyMax)"
                @input="onFrequencyInput('max', $event)"
              />
              <text>%</text>
            </view>
          </view>
          <text class="range-hint">1% 更常见，100% 更少见</text>
        </view>

        <view class="field-block">
          <text class="field-label">风格</text>
          <view class="segmented">
            <button
              v-for="item in styleOptions"
              :key="item.value"
              class="segment-button"
              :class="{ active: style === item.value }"
              @click="style = item.value"
            >
              {{ item.label }}
            </button>
          </view>
        </view>

        <view class="field-block">
          <text class="field-label">位置</text>
          <view class="segmented">
            <button
              v-for="item in positionOptions"
              :key="item.value"
              class="segment-button"
              :class="{ active: mustPosition === item.value }"
              @click="mustPosition = item.value"
            >
              {{ item.label }}
            </button>
          </view>
        </view>

        <view class="field-block wide" :class="{ disabled: looseMode }">
          <view class="label-row">
            <text class="field-label">指定字</text>
            <text class="field-help">可填多个字，候选名至少包含其中一个</text>
          </view>
          <textarea
            class="text-area must-area"
            :class="{ disabled: looseMode }"
            :value="mustText"
            maxlength="160"
            :disabled="looseMode"
            @input="onInput('mustText', $event)"
          />
          <view class="loose-action-row">
            <button class="reset-button" @click="handleReset">重置</button>
            <button
              class="toggle-button"
              :class="{ active: looseMode }"
              @click="looseMode = !looseMode"
            >
              不指定字，随便看看
            </button>
          </view>
        </view>

        <view class="field-block">
          <text class="field-label">返回候选数</text>
          <view class="limit-control">
            <button class="icon-button" @click="setLimit(limit - 5)">-</button>
            <input
              class="text-input limit-input"
              type="number"
              :value="String(limit)"
              @input="onLimitInput"
            />
            <button class="icon-button" @click="setLimit(limit + 5)">+</button>
          </view>
        </view>

        <view class="field-block">
          <text class="field-label">排序</text>
          <checkbox-group class="checkbox-group" @change="onRandomSortChange">
            <label class="checkbox-option">
              <checkbox value="random" :checked="randomSort" color="#1a7668" />
              <text>随机排序</text>
            </label>
          </checkbox-group>
        </view>

        <view class="field-block wide">
          <text class="field-label">避讳</text>
          <textarea
            class="text-area"
            :value="avoidText"
            maxlength="120"
            @input="onInput('avoidText', $event)"
          />
        </view>
      </view>

      <view class="action-row">
        <view class="load-summary">
          <text>{{ selectedSourceLabel }}</text>
          <text>{{ selectedSourceMeta }}</text>
        </view>
        <view class="action-buttons">
          <button class="secondary-action-button" @click="showFavorites">
            查看收藏
          </button>
          <button class="secondary-action-button" @click="exportCsv">
            导出 csv
          </button>
          <button
            class="at-button at-button--primary generate-action-button"
            :class="{ 'at-button--disabled': isSearching }"
            :disabled="isSearching"
            :loading="isSearching"
            @click="handleSearch"
          >
            <text class="at-button__text">{{ searchButtonText }}</text>
          </button>
        </view>
      </view>
    </view>

    <view
      v-if="activeSourceInfo"
      class="modal-backdrop"
      @click="closeSourceInfo"
    >
      <view class="source-info-dialog" @click.stop>
        <view class="source-info-header">
          <text class="source-info-title">{{ activeSourceInfo.title }}</text>
          <button class="source-info-close" @click="closeSourceInfo">
            关闭
          </button>
        </view>
        <text class="source-info-summary">{{ activeSourceInfo.summary }}</text>
        <view class="source-info-list">
          <view
            v-for="item in activeSourceInfo.items"
            :key="item.label"
            class="source-info-item"
          >
            <button
              v-if="item.url"
              class="source-info-link"
              @click="openExternal(item.url)"
            >
              {{ item.label }}
            </button>
            <text v-else class="source-info-text">{{ item.label }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="errorMessage" class="state-block error-state">
      {{ errorMessage }}
    </view>

    <view v-else-if="emptyStateText" class="state-block">
      {{ emptyStateText }}
    </view>

    <view v-if="results.length > 0" class="result-section">
      <view class="result-header">
        <view>
          <text class="section-title">{{ resultTitle }}</text>
          <text class="section-subtitle">{{ resultSummary }}</text>
        </view>
        <text class="section-count">{{ resultCount }}</text>
      </view>

      <view v-if="displayMode === 'generated'" class="pagination-row">
        <button
          class="page-button"
          :disabled="currentPage <= 1 || isSearching"
          @click="goToPreviousPage"
        >
          上一页
        </button>
        <text class="page-current">第 {{ currentPage }} 页</text>
        <button
          class="page-button"
          :disabled="reachedEnd || isSearching"
          @click="goToNextPage"
        >
          下一页
        </button>
      </view>

      <view class="result-list">
        <view
          v-for="(item, index) in results"
          :key="`${displayMode}-${item.fullName}`"
          class="result-card"
          :class="{ favorite: isFavorite(item.fullName) }"
        >
          <view class="rank">{{ getRankNumber(index) }}</view>
          <view class="result-main">
            <view class="name-line">
              <view class="name-title">
                <text v-if="isFavorite(item.fullName)" class="favorite-star"
                  >★</text
                >
                <text class="full-name">{{ item.fullName }}</text>
              </view>
              <view class="name-actions">
                <text class="score">{{ item.score }}</text>
                <button
                  class="favorite-card-button"
                  :class="{ active: isFavorite(item.fullName) }"
                  @click="toggleFavorite(item)"
                >
                  {{ isFavorite(item.fullName) ? "已收藏" : "收藏" }}
                </button>
              </view>
            </view>
            <view class="meta-line">
              <text>{{ item.pinyin.join(" · ") }}</text>
              <text>{{ item.tonePattern }}</text>
              <text>{{ item.sources.join("、") }}</text>
            </view>
            <view class="reason-line">
              <text v-if="item.semantic">{{ item.semantic }}</text>
              <text>{{ item.phonetic }}</text>
            </view>
            <view v-if="item.sourceNames.length > 0" class="source-name-row">
              <button
                v-for="sourceName in item.sourceNames"
                :key="`${item.name}-${sourceName}`"
                class="source-link"
                @click="openSourcePerson(sourceName)"
              >
                查 {{ sourceName }}
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro, { useLoad } from "@tarojs/taro";
import { computed, onMounted, ref, watch } from "vue";
import {
  DEFAULT_SOURCE_ID,
  SOURCE_CONFIGS,
  hydrateCandidateDb,
  queryNames,
  toPublicResult,
  type CandidateName,
  type CharDb,
  type MustPosition,
  type NameStyle,
  type QueryConfig,
  type SourceConfig,
  type SourcePreference,
} from "../../../packages/name-core/src";

const DEFAULT_API_BASE = "/";
const API_BASE = process.env.TARO_APP_API_BASE || DEFAULT_API_BASE;

function getNoCacheUrl(url: string): string {
  const timestamp = Date.now();
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}t=${timestamp}`;
}

function joinUrl(base: string, path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}

type PercentileFilter = {
  enabled: boolean;
  bucketCount: number;
  autoExcludeTopPercent?: number;
  minSelectablePercent: number;
  defaultMinPercent: number;
  defaultMaxPercent: number;
};

type SourceStats = {
  id: string;
  label: string;
  candidateCount: number;
  file: string;
  byteSize: number;
  percentileFilter?: PercentileFilter;
  sourceNameFile?: string;
};

type SourceIndex = {
  defaultSourceId: string;
  sources: Record<string, SourceStats>;
  sourcePriority: SourceConfig[];
};

type PublicResult = ReturnType<typeof toPublicResult>;
type DisplayMode = "generated" | "favorites";
type FavoriteResult = PublicResult & { favoritedAt: number };

type StoredQueryConfig = {
  surname: string;
  selectedSourceId: SourcePreference;
  frequencyMin: number;
  frequencyMax: number;
  style: NameStyle;
  mustText: string;
  looseMode: boolean;
  mustPosition: MustPosition;
  avoidText: string;
  limit: number;
  randomSort: boolean;
};

const DATABASE_BASE = "/api/database/candidate";
const QUERY_CONFIG_STORAGE_KEY = "name-generator:index-query-config:v1";
const FAVORITES_STORAGE_KEY = "name-generator:favorites:v1";
const DEFAULT_MUST_TEXT = [
  "素处以默",
  "妙机其微",
  "饮之太和",
  "独鹤与飞",
  "犹之惠风",
  "荏苒在衣",
  "阅音修篁",
  "美曰载归",
  "遇之匪深",
  "即之愈希",
  "脱有形似",
  "握手已违",
].join("\n");

type SourceInfo = {
  title: string;
  summary: string;
  items: Array<{ label: string; url?: string }>;
};

const SOURCE_INFO: Partial<Record<SourcePreference, SourceInfo>> = {
  wealth: {
    title: "财富论",
    summary:
      "基于私募基金名和私募基金管理公司名整理，偏向稳健、资产、品牌语感较强的二字词。",
    items: [
      {
        label: "中国证券投资基金业协会私募基金公示",
        url: "https://gs.amac.org.cn/amac-infodisc/res/pof/fund/index.html",
      },
      { label: "私募基金管理公司名称" },
      { label: "已公布私募基金名" },
    ],
  },
  academic: {
    title: "五道口",
    summary:
      "基于科研项目负责人、两院院士等公开资料整理，偏向现代、稳重、学术语感。",
    items: [
      {
        label: "国家自然科学研究基金资助项目",
        url: "https://kd.nsfc.gov.cn/",
      },
      {
        label: "国家社会科学研究基金资助项目",
        url: "http://fz.people.com.cn/skygb/sk/index.php/Index/seach",
      },
      { label: "科学院院士名录" },
      { label: "工程院院士名录" },
      { label: "CNKI 科研项目" },
    ],
  },
  modern_people: {
    title: "他山石",
    summary: "基于政府公示信息等现代公开姓名整理，贴近现实姓名语感。",
    items: [{ label: "政府公示信息，例如北京积分落户公示" }],
  },
  imperial_exam: {
    title: "登科录",
    summary: "基于中国历代登科进士资料整理，包含姓名、字号等历史人物信息。",
    items: [
      {
        label: "中国历代人物传记资料库 CBDB",
        url: "https://projects.iq.harvard.edu/chinesecbdb/home",
      },
    ],
  },
  ancient_names: {
    title: "古人云",
    summary: "基于古人姓名与字整理，强调典故、出处和文化来源。",
    items: [
      {
        label: "古人名字解诂",
        url: "https://book.douban.com/subject/35479474/",
      },
    ],
  },
};

const surname = ref("张");
const selectedSourceId = ref<SourcePreference>(
  DEFAULT_SOURCE_ID as SourcePreference,
);
const frequencyMin = ref(1);
const frequencyMax = ref(100);
const style = ref<NameStyle>("any");
const mustText = ref(DEFAULT_MUST_TEXT);
const looseMode = ref(false);
const mustPosition = ref<MustPosition>("any");
const avoidText = ref("赵钱孙\n刘强\n李建国");
const limit = ref(30);
const randomSort = ref(true);

const sourceIndex = ref<SourceIndex | null>(null);
const charDb = ref<CharDb | null>(null);
const candidateCache = new Map<string, CandidateName[]>();
const sourceNameCache = new Map<string, Record<string, string[]>>();
const results = ref<PublicResult[]>([]);
const errorMessage = ref("");
const isSearching = ref(false);
const hasSearched = ref(false);
const hasOpenedFavorites = ref(false);
const displayMode = ref<DisplayMode>("generated");
const currentPage = ref(1);
const reachedEnd = ref(false);
const lastSearchSignature = ref("");
const randomizedSearchSignature = ref("");
const randomizedResults = ref<PublicResult[]>([]);
const favorites = ref<FavoriteResult[]>([]);
const storageReady = ref(false);
const activeSourceInfo = ref<SourceInfo | null>(null);

const styleOptions: Array<{ label: string; value: NameStyle }> = [
  { label: "不限", value: "any" },
  { label: "响亮", value: "loud" },
  { label: "柔和", value: "soft" },
];

const positionOptions: Array<{ label: string; value: MustPosition }> = [
  { label: "不限", value: "any" },
  { label: "第二位", value: "second" },
  { label: "第三位", value: "third" },
];

const sourceIndexReady = computed(() => Boolean(sourceIndex.value));

const sourceOptions = computed(() => {
  const index = sourceIndex.value;
  const ordered = index?.sourcePriority?.length
    ? index.sourcePriority
    : SOURCE_CONFIGS;
  return ordered.map((source) => {
    const stats = index?.sources?.[source.id];
    return {
      id: source.id as SourcePreference,
      shortLabel: source.label.replace("-", "\n"),
      label: source.label,
      countText: stats ? `${stats.candidateCount}` : "--",
      byteSize: stats?.byteSize ?? 0,
    };
  });
});

const selectedSource = computed(() => {
  return sourceOptions.value.find((item) => item.id === selectedSourceId.value);
});

const selectedSourceStats = computed(
  () => sourceIndex.value?.sources?.[selectedSourceId.value],
);

const selectedSourceLabel = computed(
  () => selectedSource.value?.label || "默认来源",
);

const frequencyFilterEnabled = computed(() =>
  Boolean(selectedSourceStats.value?.percentileFilter?.enabled),
);

const selectedSourceMeta = computed(() => {
  const stats = selectedSourceStats.value;
  if (!stats) return "候选加载后显示";
  if (!frequencyFilterEnabled.value) {
    return `${stats.candidateCount} 个候选 · ${formatByteSize(stats.byteSize)}`;
  }
  return `${currentFrequencyCount(stats.candidateCount)} / ${stats.candidateCount} 个候选 · 出现频率 ${frequencyMin.value}%~${frequencyMax.value}%`;
});

const frequencySummary = computed(() => {
  const stats = selectedSourceStats.value;
  if (!stats) return "";
  const autoExcludePercent =
    selectedSourceStats.value?.percentileFilter?.autoExcludeTopPercent ?? 1;
  return `自动去除最高频前${formatPercent(autoExcludePercent)}%，当前候选名约${currentFrequencyCount(stats.candidateCount)}个`;
});

const currentSearchSignature = computed(() => getCurrentSearchSignature());

const canContinueCurrentSearch = computed(() => {
  return (
    displayMode.value === "generated" &&
    hasSearched.value &&
    !reachedEnd.value &&
    lastSearchSignature.value === currentSearchSignature.value
  );
});

const searchButtonText = computed(() => {
  return `生成候选`;
});

const resultTitle = computed(() =>
  displayMode.value === "favorites" ? "收藏名" : "候选名",
);

const resultCount = computed(() => {
  if (displayMode.value === "favorites") return favorites.value.length;
  return results.value.length;
});

const resultSummary = computed(() => {
  if (displayMode.value === "favorites") {
    return favorites.value.length > 0
      ? `已收藏 ${favorites.value.length} 个名字`
      : "尚未收藏名字";
  }
  if (!hasSearched.value) return selectedSourceLabel.value;
  return `第 ${currentPage.value} 页 · ${selectedSourceLabel.value}`;
});

const emptyStateText = computed(() => {
  if (isSearching.value || errorMessage.value) return "";
  if (
    displayMode.value === "favorites" &&
    hasOpenedFavorites.value &&
    results.value.length === 0
  ) {
    return "还没有收藏的名字";
  }
  if (
    displayMode.value === "generated" &&
    hasSearched.value &&
    results.value.length === 0
  ) {
    return currentPage.value > 1
      ? "没有更多符合条件的候选名"
      : "没有符合条件的候选名";
  }
  return "";
});

onMounted(async () => {
  try {
    restoreQueryConfig();
    restoreFavorites();
    await loadSourceIndex();
    storageReady.value = true;
    saveQueryConfig();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  }
});

useLoad(async (options) => {
  // 支持分享
  Taro.showShareMenu({
    withShareTicket: true,
    showShareItems: ["wechatFriends", "wechatMoment"],
  });
});

watch(
  [
    surname,
    selectedSourceId,
    frequencyMin,
    frequencyMax,
    style,
    mustText,
    looseMode,
    mustPosition,
    avoidText,
    limit,
    randomSort,
  ],
  () => {
    if (storageReady.value) {
      saveQueryConfig();
    }
  },
);

watch(
  favorites,
  () => {
    if (storageReady.value) {
      saveFavorites();
    }
    if (displayMode.value === "favorites") {
      refreshFavoriteResults();
    }
  },
  { deep: true },
);

function selectSource(sourceId: SourcePreference) {
  selectedSourceId.value = sourceId;
  resetFrequencyRange();
}

function resetFrequencyRange() {
  const filter = selectedSourceStats.value?.percentileFilter;
  frequencyMin.value = filter?.defaultMinPercent ?? 1;
  frequencyMax.value = filter?.defaultMaxPercent ?? 100;
}

function onInput(field: "surname" | "mustText" | "avoidText", event: any) {
  const value = event?.detail?.value ?? "";
  if (field === "surname") surname.value = stripNonChinese(value).slice(0, 4);
  if (field === "mustText")
    mustText.value = sliceText(normalizeMustText(value), 160);
  if (field === "avoidText") avoidText.value = value;
}

function onLimitInput(event: any) {
  setLimit(Number(event?.detail?.value || 0));
}

function onRandomSortChange(event: any) {
  const values = event?.detail?.value;
  randomSort.value = Array.isArray(values) && values.includes("random");
}

function onFrequencyInput(bound: "min" | "max", event: any) {
  const value = Number(event?.detail?.value || 0);
  setFrequencyRange(bound, value);
}

function setFrequencyRange(bound: "min" | "max", value: number) {
  const filter = selectedSourceStats.value?.percentileFilter;
  const minSelectable = filter?.minSelectablePercent ?? 1;
  const next = Math.max(
    minSelectable,
    Math.min(100, Number.isFinite(value) ? Math.round(value) : minSelectable),
  );
  if (bound === "min") {
    frequencyMin.value = Math.min(next, frequencyMax.value);
  } else {
    frequencyMax.value = Math.max(next, frequencyMin.value);
  }
}

function setLimit(next: number) {
  limit.value = Math.max(
    5,
    Math.min(50, Number.isFinite(next) ? Math.round(next) : 30),
  );
}

function getCurrentQueryConfig(): StoredQueryConfig {
  return {
    surname: stripNonChinese(surname.value).slice(0, 4) || "张",
    selectedSourceId: selectedSourceId.value,
    frequencyMin: frequencyMin.value,
    frequencyMax: frequencyMax.value,
    style: style.value,
    mustText: mustText.value,
    looseMode: looseMode.value,
    mustPosition: mustPosition.value,
    avoidText: avoidText.value,
    limit: limit.value,
    randomSort: randomSort.value,
  };
}

function getCurrentSearchSignature(): string {
  return JSON.stringify(getCurrentQueryConfig());
}

function restoreQueryConfig() {
  const stored = readStorageJson<Partial<StoredQueryConfig>>(
    QUERY_CONFIG_STORAGE_KEY,
  );
  if (!stored || typeof stored !== "object") return;

  const storedSurname = stripNonChinese(String(stored.surname || "")).slice(
    0,
    4,
  );
  if (storedSurname) surname.value = storedSurname;
  if (isSourcePreference(stored.selectedSourceId))
    selectedSourceId.value = stored.selectedSourceId;
  if (typeof stored.frequencyMin === "number")
    frequencyMin.value = clampFrequencyPercent(stored.frequencyMin);
  if (typeof stored.frequencyMax === "number")
    frequencyMax.value = clampFrequencyPercent(stored.frequencyMax);
  if (isNameStyle(stored.style)) style.value = stored.style;
  if (typeof stored.mustText === "string") {
    mustText.value = sliceText(normalizeMustText(stored.mustText), 160);
  }
  if (typeof stored.looseMode === "boolean") looseMode.value = stored.looseMode;
  if (isMustPosition(stored.mustPosition))
    mustPosition.value = stored.mustPosition;
  if (typeof stored.avoidText === "string") avoidText.value = stored.avoidText;
  if (typeof stored.limit === "number") setLimit(stored.limit);
  if (typeof stored.randomSort === "boolean")
    randomSort.value = stored.randomSort;
}

function saveQueryConfig() {
  writeStorageJson(QUERY_CONFIG_STORAGE_KEY, getCurrentQueryConfig());
}

function restoreFavorites() {
  const stored = readStorageJson<FavoriteResult[]>(FAVORITES_STORAGE_KEY);
  if (!Array.isArray(stored)) return;
  favorites.value = stored.filter(isFavoriteResult).map((item) => ({
    ...item,
    favoritedAt: Number(item.favoritedAt || Date.now()),
  }));
}

function saveFavorites() {
  writeStorageJson(FAVORITES_STORAGE_KEY, favorites.value);
}

function showFavorites() {
  errorMessage.value = "";
  hasOpenedFavorites.value = true;
  displayMode.value = "favorites";
  refreshFavoriteResults();
}

function refreshFavoriteResults() {
  results.value = favorites.value.map((item) => {
    const { favoritedAt: _favoritedAt, ...result } = item;
    return result;
  });
}

function isFavorite(fullName: string): boolean {
  return favorites.value.some((item) => item.fullName === fullName);
}

function toggleFavorite(item: PublicResult) {
  const index = favorites.value.findIndex(
    (favorite) => favorite.fullName === item.fullName,
  );
  if (index >= 0) {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.fullName !== item.fullName,
    );
    return;
  }
  favorites.value = [{ ...item, favoritedAt: Date.now() }, ...favorites.value];
}

function getRankNumber(index: number): number {
  if (displayMode.value === "favorites") return index + 1;
  return (currentPage.value - 1) * limit.value + index + 1;
}

function exportCsv() {
  if (results.value.length === 0) {
    showToast("暂无可导出的名字");
    return;
  }

  const rows = [
    [
      "姓名",
      "二字名",
      "评分",
      "拼音",
      "声调",
      "来源",
      "来源名",
      "避讳说明",
      "音律说明",
    ],
    ...results.value.map((item) => [
      item.fullName,
      item.name,
      item.score,
      item.pinyin.join(" "),
      item.tonePattern,
      item.sources.join("、"),
      item.sourceNames.join("、"),
      item.semantic,
      item.phonetic,
    ]),
  ];
  const csv = `\uFEFF${rows.map((row) => row.map(escapeCsvValue).join(",")).join("\r\n")}`;
  const filenamePrefix =
    displayMode.value === "favorites" ? "收藏名字" : "候选名字";
  downloadTextFile(csv, `${filenamePrefix}_${formatDateTime(new Date())}.csv`);
}

function handleReset() {
  clearLocalStorage();
  reloadPage();
}

function isSourcePreference(value: unknown): value is SourcePreference {
  const sourceId = String(value || "");
  return (
    sourceId === "default" ||
    SOURCE_CONFIGS.some((source) => source.id === sourceId)
  );
}

function isNameStyle(value: unknown): value is NameStyle {
  return styleOptions.some((item) => item.value === value);
}

function isMustPosition(value: unknown): value is MustPosition {
  return positionOptions.some((item) => item.value === value);
}

function isFavoriteResult(value: unknown): value is FavoriteResult {
  const item = value as Partial<FavoriteResult>;
  return Boolean(
    item &&
    typeof item.fullName === "string" &&
    typeof item.name === "string" &&
    Array.isArray(item.pinyin) &&
    Array.isArray(item.sources) &&
    Array.isArray(item.sourceNames),
  );
}

function readStorageJson<T>(key: string): T | null {
  const value = readStorageValue(key);
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch (_error) {
    return null;
  }
}

function writeStorageJson(key: string, value: unknown) {
  const serialized = JSON.stringify(value);
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(key, serialized);
    return;
  }
  Taro.setStorageSync(key, serialized);
}

function readStorageValue(key: string): string | null {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage.getItem(key);
  }
  try {
    const value = Taro.getStorageSync(key);
    if (!value) return null;
    return typeof value === "string" ? value : JSON.stringify(value);
  } catch (_error) {
    return null;
  }
}

function clearLocalStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.clear();
    return;
  }
  Taro.clearStorageSync();
}

function reloadPage() {
  if (typeof window !== "undefined" && window.location) {
    window.location.reload();
    return;
  }
  Taro.redirectTo({ url: "/pages/index/index" });
}

function escapeCsvValue(value: unknown): string {
  const text = String(value ?? "").replace(/\r?\n/gu, " ");
  if (/[",\r\n]/u.test(text)) {
    return `"${text.replace(/"/gu, '""')}"`;
  }
  return text;
}

function downloadTextFile(content: string, filename: string) {
  if (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof Blob !== "undefined"
  ) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return;
  }
  Taro.setClipboardData({ data: content });
  showToast("已复制csv内容");
}

function formatDateTime(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function showToast(title: string) {
  Taro.showToast({ title, icon: "none" });
}

async function handleSearch() {
  const isContinuing = canContinueCurrentSearch.value;
  const nextPage = isContinuing ? currentPage.value + 1 : 1;
  await runSearchPage(nextPage, { refreshRandom: !isContinuing });
}

async function goToPreviousPage() {
  if (currentPage.value <= 1 || isSearching.value) return;
  await runSearchPage(currentPage.value - 1);
}

async function goToNextPage() {
  if (reachedEnd.value || isSearching.value) return;
  await runSearchPage(currentPage.value + 1);
}

async function runSearchPage(
  page: number,
  options: { refreshRandom?: boolean } = {},
) {
  errorMessage.value = "";
  hasSearched.value = true;
  displayMode.value = "generated";
  const cleanedSurname = stripNonChinese(surname.value);
  if (!cleanedSurname) {
    errorMessage.value = "请输入姓氏";
    return;
  }

  const must = looseMode.value ? [] : splitChineseChars(mustText.value);
  if (!looseMode.value && must.length === 0) {
    errorMessage.value = "请填写至少一个指定字，或选择“不指定字，随便看看”";
    return;
  }

  isSearching.value = true;
  try {
    const candidateDb = applyFrequencyRange(
      await loadCandidateDb(selectedSourceId.value),
    );
    const loadedCharDb = await loadCharDb();
    const pageSize = limit.value;
    const start = (page - 1) * pageSize;
    const searchLimit = randomSort.value
      ? candidateDb.length
      : page * pageSize + 1;
    const query: QueryConfig = {
      surname: cleanedSurname,
      avoid: parseAvoidList(avoidText.value),
      must,
      mustPosition: mustPosition.value,
      style: style.value,
      sourcePreference: selectedSourceId.value,
      limit: searchLimit,
    };
    let queriedResults: PublicResult[];
    const searchSignature = getCurrentSearchSignature();
    if (randomSort.value) {
      if (
        options.refreshRandom ||
        randomizedSearchSignature.value !== searchSignature ||
        randomizedResults.value.length === 0
      ) {
        randomizedResults.value = shuffleResults(
          queryNames({ candidateDb, charDb: loadedCharDb, query }).map(
            toPublicResult,
          ),
        );
        randomizedSearchSignature.value = searchSignature;
      }
      queriedResults = randomizedResults.value;
    } else {
      randomizedResults.value = [];
      randomizedSearchSignature.value = "";
      queriedResults = queryNames({
        candidateDb,
        charDb: loadedCharDb,
        query,
      }).map(toPublicResult);
    }
    results.value = queriedResults.slice(start, start + pageSize);
    currentPage.value = page;
    reachedEnd.value = queriedResults.length <= start + pageSize;
    lastSearchSignature.value = searchSignature;
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
    results.value = [];
  } finally {
    isSearching.value = false;
  }
}

async function loadSourceIndex() {
  const index = await requestJson<SourceIndex>(
    `${DATABASE_BASE}/source_index.json`,
  );
  sourceIndex.value = index;
  if (!index.sources?.[selectedSourceId.value]) {
    selectedSourceId.value = (index.defaultSourceId ||
      DEFAULT_SOURCE_ID) as SourcePreference;
    resetFrequencyRange();
  } else {
    setFrequencyRange("min", frequencyMin.value);
    setFrequencyRange("max", frequencyMax.value);
  }
}

async function loadCharDb(): Promise<CharDb> {
  if (charDb.value) return charDb.value;
  charDb.value = await requestJson<CharDb>(
    `${DATABASE_BASE}/candidate_char_db.json`,
  );
  return charDb.value;
}

async function loadSourceNameMap(
  sourceId: SourcePreference,
): Promise<Record<string, string[]>> {
  const cached = sourceNameCache.get(String(sourceId));
  if (cached) return cached;
  const file = sourceIndex.value?.sources?.[sourceId]?.sourceNameFile;
  if (!file) {
    sourceNameCache.set(String(sourceId), {});
    return {};
  }
  const sourceNames = await requestJson<Record<string, string[]>>(
    `${DATABASE_BASE}/${file.replace(/\\/g, "/")}`,
  );
  sourceNameCache.set(String(sourceId), sourceNames);
  return sourceNames;
}

async function loadCandidateDb(
  sourceId: SourcePreference,
): Promise<CandidateName[]> {
  const cacheKey = String(sourceId);
  const cached = candidateCache.get(cacheKey);
  if (cached) return cached;

  const stats = sourceIndex.value?.sources?.[sourceId];
  const file = stats?.file || `sources/${sourceId}.candidate_names.json`;
  const [loadedCharDb, compactCandidateDb, sourceNamesByName] =
    await Promise.all([
      loadCharDb(),
      requestJson<unknown>(`${DATABASE_BASE}/${file.replace(/\\/g, "/")}`),
      loadSourceNameMap(sourceId),
    ]);
  const candidateDb = hydrateCandidateDb({
    data: compactCandidateDb as any,
    sourceId,
    charDb: loadedCharDb,
    sourceNamesByName,
  });
  candidateCache.set(cacheKey, candidateDb);
  return candidateDb;
}

async function requestJson<T>(filePath: string): Promise<T> {
  const url = getNoCacheUrl(joinUrl(API_BASE, filePath));
  console.log("url2 => ", url);
  try {
    const response: any = await Taro.request({
      url,
      method: "GET",
      timeout: 60000,
    });
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(`数据加载失败：${url}`);
    }
    const data = response.data;
    if (typeof data === "string") {
      return JSON.parse(data.replace(/^\uFEFF/u, "")) as T;
    }
    return data as T;
  } catch (e) {
    console.warn("filePath 加载失败 => ", filePath);
    return {} as T;
  }
}

function applyFrequencyRange(candidateDb: CandidateName[]): CandidateName[] {
  if (!frequencyFilterEnabled.value) return candidateDb;
  const { start, end } = getFrequencyIndexes(candidateDb.length);
  return candidateDb.slice(start, end);
}

function currentFrequencyCount(total: number): number {
  const { start, end } = getFrequencyIndexes(total);
  return Math.max(0, end - start);
}

function getFrequencyIndexes(total: number): { start: number; end: number } {
  if (total <= 0) return { start: 0, end: 0 };
  const autoExcludePercent =
    selectedSourceStats.value?.percentileFilter?.autoExcludeTopPercent ?? 1;
  const autoExcluded = Math.min(
    total,
    Math.floor((clampPercent(autoExcludePercent) / 100) * total),
  );
  const selectableTotal = Math.max(0, total - autoExcluded);
  const startPercent = (clampFrequencyPercent(frequencyMin.value) - 1) / 100;
  const endPercent = clampFrequencyPercent(frequencyMax.value) / 100;
  const start = Math.min(
    total,
    autoExcluded + Math.floor(startPercent * selectableTotal),
  );
  const end = Math.min(
    total,
    autoExcluded + Math.ceil(endPercent * selectableTotal),
  );
  return { start, end: Math.max(start, end) };
}

function shuffleResults<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index];
    shuffled[index] = shuffled[swapIndex];
    shuffled[swapIndex] = current;
  }
  return shuffled;
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
}

function clampFrequencyPercent(value: number): number {
  return Math.max(1, Math.min(100, Number.isFinite(value) ? value : 1));
}

function parseAvoidList(input: string): string[] {
  return input
    .split(/[\n,，、；;\s]+/u)
    .map((item) => stripNonChinese(item))
    .filter(Boolean);
}

function splitChineseChars(input: string): string[] {
  return Array.from(stripNonChinese(input));
}

function normalizeMustText(input: string): string {
  return Array.from((input || "").replace(/\r\n?/gu, "\n"))
    .filter((char) => char === "\n" || /[\u3400-\u9fff]/u.test(char))
    .join("");
}

function sliceText(input: string, maxLength: number): string {
  return Array.from(input).slice(0, maxLength).join("");
}

function stripNonChinese(input: string): string {
  return Array.from(input || "")
    .filter((char) => /[\u3400-\u9fff]/u.test(char))
    .join("");
}

function formatPercent(value: number): string {
  const percent = clampPercent(value);
  return Number.isInteger(percent) ? String(percent) : percent.toFixed(1);
}

function formatByteSize(size: number): string {
  if (!size) return "--";
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)}MB`;
  return `${Math.round(size / 1024)}KB`;
}

function openSourcePerson(sourceName: string) {
  const searchName = sourceName.replace(/^(基金|公司):/u, "");
  openExternal(`https://www.baidu.com/s?wd=${encodeURIComponent(searchName)}`);
}

function showSourceInfo(sourceId: SourcePreference) {
  activeSourceInfo.value = SOURCE_INFO[sourceId] || null;
}

function closeSourceInfo() {
  activeSourceInfo.value = null;
}

function openExternal(url: string) {
  if (typeof window !== "undefined" && window.open) {
    window.open(url, "_blank");
    return;
  }
  Taro.setClipboardData({ data: url });
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "查询失败";
}
</script>

<style lang="less">
.index-page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 28px;
  background: #f6f7f5;
  color: #1f2523;
}

.top-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.app-title {
  display: block;
  font-size: 40px;
  line-height: 48px;
  font-weight: 700;
  color: #18211f;
}

.app-subtitle {
  display: block;
  margin-top: 8px;
  font-size: 22px;
  line-height: 30px;
  color: #6a746f;
}

.data-pill {
  flex: 0 0 auto;
  min-width: 112px;
  height: 44px;
  padding: 0 18px;
  border: 1px solid #d8dcd6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #7d6750;
  background: #fff8eb;
}

.data-pill.ready {
  color: #176b5b;
  background: #eaf7f0;
  border-color: #b7d9cc;
}

.query-panel {
  border: 1px solid #dfe4df;
  border-radius: 8px;
  background: #ffffff;
  padding: 22px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.field-block {
  min-width: 0;
}

.field-block.compact {
  max-width: 220px;
}

.field-block.wide {
  grid-column: 1 / -1;
}

.label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.field-label {
  display: block;
  margin-bottom: 10px;
  font-size: 22px;
  line-height: 30px;
  color: #56615d;
  font-weight: 600;
}

.label-row .field-label {
  margin-bottom: 0;
}

.field-help {
  min-width: 0;
  color: #7a837f;
  font-size: 20px;
  line-height: 28px;
  text-align: right;
}

.field-block.disabled .field-label,
.field-block.disabled .field-help {
  color: #9aa39f;
}

.text-input,
.text-area {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #d7ddd8;
  border-radius: 8px;
  background: #fbfcfb;
  color: #17211e;
  font-size: 28px;
}

.text-input:disabled,
.text-area:disabled,
.text-area.disabled {
  background: #eef1ee;
  color: #9aa39f;
}

.text-input {
  height: 72px;
  padding: 0 20px;
}

.surname-input {
  font-size: 34px;
  font-weight: 700;
}

.text-area {
  min-height: 112px;
  padding: 16px 20px;
  line-height: 38px;
}

.must-area {
  min-height: 92px;
}

.source-scroll {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.source-chip,
.segment-button,
.icon-button,
.toggle-button,
.reset-button,
.secondary-action-button,
.page-button,
.favorite-card-button,
.source-link {
  border: 1px solid #d8ddd8;
  background: #f8faf8;
  color: #27312e;
  border-radius: 8px;
  padding: 0;
  margin: 0;
}

.source-chip {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 16px;
  font-size: 22px;
  line-height: 28px;
  white-space: pre-line;
}

.source-chip-main {
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.source-help-button {
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  border: 1px solid #c6d8d2;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  background: #ffffff;
  color: #176b5b;
  font-size: 22px;
  line-height: 36px;
  font-weight: 700;
}

.source-chip.active,
.segment-button.active,
.toggle-button.active,
.favorite-card-button.active {
  border-color: #1a7668;
  background: #e8f5f1;
  color: #125e53;
  font-weight: 700;
}

.source-count {
  flex: 0 0 auto;
  color: #8a725c;
  font-size: 20px;
}

.range-number-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.range-number {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  color: #56615d;
  font-size: 22px;
}

.range-number-input {
  height: 58px;
  text-align: center;
  font-size: 24px;
}

.range-hint {
  display: block;
  margin-top: 10px;
  color: #7a837f;
  font-size: 20px;
  line-height: 28px;
}

.segmented {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.segment-button {
  height: 72px;
  font-size: 24px;
}

.loose-action-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.toggle-button,
.reset-button {
  width: 100%;
  height: 64px;
  font-size: 22px;
}

.limit-control {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) 72px;
  gap: 10px;
}

.checkbox-group {
  height: 72px;
  display: flex;
  align-items: center;
}

.checkbox-option {
  box-sizing: border-box;
  width: 100%;
  min-height: 72px;
  border: 1px solid #d8ddd8;
  border-radius: 8px;
  background: #f8faf8;
  color: #27312e;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 18px;
  font-size: 24px;
}

.icon-button {
  height: 72px;
  font-size: 34px;
  line-height: 72px;
}

.limit-input {
  text-align: center;
}

.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 24px;
}

.action-buttons {
  min-width: min(100%, 520px);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.secondary-action-button,
.generate-action-button {
  flex: 1 1 150px;
  min-width: 0;
  min-height: 64px;
  box-sizing: border-box;
  font-size: 22px;
}

.generate-action-button {
  flex-basis: 180px;
  height: 64px;
  margin: 0;
  border-radius: 8px;
  border-color: #1a7668;
  background: #1a7668;
  font-size: 22px;
  line-height: 62px;
}

.generate-action-button.at-button {
  min-height: 64px;
  color: #ffffff;
}

.load-summary {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 22px;
  line-height: 30px;
  color: #5b6762;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 20;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: rgba(18, 28, 25, 0.36);
}

.source-info-dialog {
  width: 100%;
  max-width: 680px;
  box-sizing: border-box;
  border: 1px solid #dfe4df;
  border-radius: 8px;
  background: #ffffff;
  padding: 24px;
}

.source-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.source-info-title {
  min-width: 0;
  flex: 1;
  font-size: 30px;
  line-height: 38px;
  font-weight: 700;
  color: #17211e;
}

.source-info-close {
  flex: 0 0 96px;
  width: 96px;
  min-width: 96px;
  height: 44px;
  border: 1px solid #d8ddd8;
  border-radius: 8px;
  padding: 0 18px;
  margin: 0;
  background: #f8faf8;
  color: #56615d;
  font-size: 20px;
  line-height: 42px;
}

.source-info-summary,
.source-info-note,
.source-info-text {
  display: block;
  color: #5b6762;
  font-size: 22px;
  line-height: 32px;
}

.source-info-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.source-info-item {
  min-width: 0;
}

.source-info-link {
  width: 100%;
  min-height: 54px;
  border: 1px solid #b7d9cc;
  border-radius: 8px;
  padding: 10px 14px;
  margin: 0;
  background: #f2fbf7;
  color: #125e53;
  font-size: 21px;
  line-height: 30px;
  text-align: left;
}

.source-info-note {
  margin-top: 16px;
  color: #7a837f;
}

.state-block {
  margin-top: 24px;
  padding: 24px;
  border: 1px solid #dde2dd;
  border-radius: 8px;
  background: #ffffff;
  color: #5b6762;
  font-size: 24px;
}

.error-state {
  border-color: #edc2b8;
  background: #fff4ef;
  color: #9a3f2e;
}

.result-section {
  margin-top: 24px;
}

.result-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 14px;
}

.pagination-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.page-button {
  width: 128px;
  height: 52px;
  font-size: 21px;
}

.page-button:disabled {
  color: #a0a7a3;
  background: #eef1ee;
}

.page-current {
  color: #5b6762;
  font-size: 22px;
  line-height: 30px;
}

.section-title {
  display: block;
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
}

.section-subtitle {
  display: block;
  margin-top: 6px;
  font-size: 22px;
  line-height: 30px;
  color: #6b746f;
}

.section-count {
  font-size: 24px;
  color: #9a6a39;
  font-weight: 700;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.result-card {
  position: relative;
  min-height: 150px;
  display: flex;
  gap: 18px;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #dfe4df;
  border-radius: 8px;
  background: #ffffff;
}

.result-card.favorite {
  border-color: #ead08a;
  background: #fffdf7;
}

.rank {
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #f1ece4;
  color: #765b3f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
}

.result-main {
  min-width: 0;
  flex: 1;
}

.name-line {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.name-title {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.favorite-star {
  flex: 0 0 auto;
  color: #e2aa1f;
  font-size: 30px;
  line-height: 40px;
}

.name-actions {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.full-name {
  font-size: 40px;
  line-height: 48px;
  font-weight: 800;
  color: #161f1c;
}

.score {
  flex: 0 0 auto;
  font-size: 26px;
  font-weight: 700;
  color: #12685d;
}

.favorite-card-button {
  width: 92px;
  height: 44px;
  font-size: 19px;
  line-height: 42px;
}

.meta-line,
.reason-line,
.source-name-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: 12px;
  font-size: 22px;
  line-height: 30px;
}

.meta-line {
  color: #6b5f52;
}

.reason-line {
  color: #5b6762;
}

.source-name-row {
  gap: 10px;
}

.source-link {
  min-height: 50px;
  max-width: 100%;
  padding: 8px 14px;
  color: #125e53;
  border-color: #b7d9cc;
  background: #f2fbf7;
  font-size: 20px;
  line-height: 30px;
  text-align: left;
  white-space: normal;
}

@media (max-width: 640px) {
  .index-page {
    padding: 22px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .field-block.compact {
    max-width: none;
  }

  .source-scroll,
  .range-number-row {
    grid-template-columns: 1fr;
  }

  .action-row {
    align-items: stretch;
    flex-direction: column;
  }

  .action-buttons {
    min-width: 0;
    justify-content: stretch;
  }

  .secondary-action-button,
  .generate-action-button {
    flex-basis: calc(50% - 6px);
  }

  .generate-action-button {
    flex-basis: 100%;
  }

  .name-line {
    flex-direction: column;
  }

  .name-actions {
    width: 100%;
    justify-content: space-between;
  }

  .top-bar {
    flex-direction: column;
  }

  .label-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .field-help {
    text-align: left;
  }
}
</style>
