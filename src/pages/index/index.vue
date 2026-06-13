<template>
  <view class="index-page">
    <view class="top-bar">
      <view>
        <text class="app-title">诗云起名</text>
        <text class="app-subtitle">候选来源 · 音律 · 避讳</text>
      </view>
      <view class="data-pill" :class="{ ready: sourceIndexReady }">
        {{ sourceIndexReady ? '数据已就绪' : '加载中' }}
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
            <button
              v-for="source in sourceOptions"
              :key="source.id"
              class="source-chip"
              :class="{ active: selectedSourceId === source.id }"
              @click="selectedSourceId = source.id"
            >
              <text>{{ source.shortLabel }}</text>
              <text class="source-count">{{ source.countText }}</text>
            </button>
          </view>
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
          <text class="field-label">指定字</text>
          <input
            class="text-input"
            maxlength="8"
            :value="mustText"
            @input="onInput('mustText', $event)"
          />
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

        <view class="field-block">
          <text class="field-label">数量</text>
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
        <nut-button type="primary" :loading="isSearching" @click="handleSearch">
          生成候选
        </nut-button>
      </view>
    </view>

    <view v-if="errorMessage" class="state-block error-state">
      {{ errorMessage }}
    </view>

    <view v-else-if="hasSearched && results.length === 0 && !isSearching" class="state-block">
      没有符合条件的候选名
    </view>

    <view v-if="results.length > 0" class="result-section">
      <view class="result-header">
        <view>
          <text class="section-title">候选名</text>
          <text class="section-subtitle">{{ resultSummary }}</text>
        </view>
        <text class="section-count">{{ results.length }}</text>
      </view>

      <view class="result-list">
        <view v-for="(item, index) in results" :key="item.fullName" class="result-card">
          <view class="rank">{{ index + 1 }}</view>
          <view class="result-main">
            <view class="name-line">
              <text class="full-name">{{ item.fullName }}</text>
              <text class="score">{{ item.score }}</text>
            </view>
            <view class="meta-line">
              <text>{{ item.pinyin.join(' · ') }}</text>
              <text>{{ item.tonePattern }}</text>
              <text>{{ item.sources.join('、') }}</text>
            </view>
            <view class="reason-line">
              <text>{{ item.semantic }}</text>
              <text>{{ item.phonetic }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { computed, onMounted, ref } from 'vue'
import {
  DEFAULT_SOURCE_ID,
  SOURCE_CONFIGS,
  queryNames,
  toPublicResult,
  type CandidateName,
  type CharDb,
  type MustPosition,
  type NameStyle,
  type QueryConfig,
  type SourceConfig,
  type SourcePreference,
} from '../../../packages/name-core/src'

type SourceStats = {
  id: string
  label: string
  candidateCount: number
  file: string
  byteSize: number
}

type SourceIndex = {
  defaultSourceId: string
  sources: Record<string, SourceStats>
  sourcePriority: SourceConfig[]
}

type PublicResult = ReturnType<typeof toPublicResult>

const DATABASE_BASE = '/api/database/candidate'

const surname = ref('姚')
const selectedSourceId = ref<SourcePreference>(DEFAULT_SOURCE_ID as SourcePreference)
const style = ref<NameStyle>('any')
const mustText = ref('')
const mustPosition = ref<MustPosition>('any')
const avoidText = ref('赵钱孙\n刘强\n李建国')
const limit = ref(30)

const sourceIndex = ref<SourceIndex | null>(null)
const charDb = ref<CharDb | null>(null)
const candidateCache = new Map<string, CandidateName[]>()
const results = ref<PublicResult[]>([])
const errorMessage = ref('')
const isSearching = ref(false)
const hasSearched = ref(false)

const styleOptions: Array<{ label: string; value: NameStyle }> = [
  { label: '不限', value: 'any' },
  { label: '响亮', value: 'loud' },
  { label: '柔和', value: 'soft' },
]

const positionOptions: Array<{ label: string; value: MustPosition }> = [
  { label: '不限', value: 'any' },
  { label: '第二位', value: 'second' },
  { label: '第三位', value: 'third' },
]

const sourceIndexReady = computed(() => Boolean(sourceIndex.value))

const sourceOptions = computed(() => {
  const index = sourceIndex.value
  const ordered = index?.sourcePriority?.length ? index.sourcePriority : SOURCE_CONFIGS
  return ordered.map((source) => {
    const stats = index?.sources?.[source.id]
    return {
      id: source.id as SourcePreference,
      shortLabel: source.label.replace('-', '\n'),
      label: source.label,
      countText: stats ? `${stats.candidateCount}` : '--',
      byteSize: stats?.byteSize ?? 0,
    }
  })
})

const selectedSource = computed(() => {
  return sourceOptions.value.find((item) => item.id === selectedSourceId.value)
})

const selectedSourceLabel = computed(() => selectedSource.value?.label || '默认来源')

const selectedSourceMeta = computed(() => {
  const stats = sourceIndex.value?.sources?.[selectedSourceId.value]
  if (!stats) return '候选加载后显示'
  return `${stats.candidateCount} 个候选 · ${formatByteSize(stats.byteSize)}`
})

const resultSummary = computed(() => {
  if (!hasSearched.value) return selectedSourceLabel.value
  return `${surname.value}${results.value[0]?.name || ''} · ${selectedSourceLabel.value}`
})

onMounted(async () => {
  try {
    await loadSourceIndex()
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  }
})

function onInput(field: 'surname' | 'mustText' | 'avoidText', event: any) {
  const value = event?.detail?.value ?? ''
  if (field === 'surname') surname.value = stripNonChinese(value).slice(0, 4)
  if (field === 'mustText') mustText.value = stripNonChinese(value).slice(0, 8)
  if (field === 'avoidText') avoidText.value = value
}

function onLimitInput(event: any) {
  setLimit(Number(event?.detail?.value || 0))
}

function setLimit(next: number) {
  limit.value = Math.max(5, Math.min(50, Number.isFinite(next) ? Math.round(next) : 30))
}

async function handleSearch() {
  errorMessage.value = ''
  hasSearched.value = true
  const cleanedSurname = stripNonChinese(surname.value)
  if (!cleanedSurname) {
    errorMessage.value = '请输入姓氏'
    return
  }

  isSearching.value = true
  try {
    const [loadedCharDb, candidateDb] = await Promise.all([
      loadCharDb(),
      loadCandidateDb(selectedSourceId.value),
    ])
    const query: QueryConfig = {
      surname: cleanedSurname,
      avoid: parseAvoidList(avoidText.value),
      must: splitChineseChars(mustText.value),
      mustPosition: mustPosition.value,
      style: style.value,
      sourcePreference: selectedSourceId.value,
      limit: limit.value,
    }
    results.value = queryNames({ candidateDb, charDb: loadedCharDb, query }).map(toPublicResult)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
    results.value = []
  } finally {
    isSearching.value = false
  }
}

async function loadSourceIndex() {
  const index = await requestJson<SourceIndex>(`${DATABASE_BASE}/source_index.json`)
  sourceIndex.value = index
  selectedSourceId.value = (index.defaultSourceId || DEFAULT_SOURCE_ID) as SourcePreference
}

async function loadCharDb(): Promise<CharDb> {
  if (charDb.value) return charDb.value
  charDb.value = await requestJson<CharDb>(`${DATABASE_BASE}/candidate_char_db.json`)
  return charDb.value
}

async function loadCandidateDb(sourceId: SourcePreference): Promise<CandidateName[]> {
  const cacheKey = String(sourceId)
  const cached = candidateCache.get(cacheKey)
  if (cached) return cached

  const stats = sourceIndex.value?.sources?.[sourceId]
  const file = stats?.file || `sources/${sourceId}.candidate_name_db.json`
  const candidateDb = await requestJson<CandidateName[]>(`${DATABASE_BASE}/${file.replace(/\\/g, '/')}`)
  candidateCache.set(cacheKey, candidateDb)
  return candidateDb
}

async function requestJson<T>(url: string): Promise<T> {
  const response: any = await Taro.request({ url, method: 'GET' })
  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`数据加载失败：${url}`)
  }
  const data = response.data
  if (typeof data === 'string') {
    return JSON.parse(data.replace(/^\uFEFF/u, '')) as T
  }
  return data as T
}

function parseAvoidList(input: string): string[] {
  return input
    .split(/[\n,，、;；\s]+/u)
    .map((item) => stripNonChinese(item))
    .filter(Boolean)
}

function splitChineseChars(input: string): string[] {
  return Array.from(stripNonChinese(input))
}

function stripNonChinese(input: string): string {
  return Array.from(input || '')
    .filter((char) => /[\u3400-\u9fff]/u.test(char))
    .join('')
}

function formatByteSize(size: number): string {
  if (!size) return '--'
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)}MB`
  return `${Math.round(size / 1024)}KB`
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return '查询失败'
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

.field-label {
  display: block;
  margin-bottom: 10px;
  font-size: 22px;
  line-height: 30px;
  color: #56615d;
  font-weight: 600;
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

.source-scroll {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.source-chip,
.segment-button,
.icon-button {
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

.source-chip.active,
.segment-button.active {
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

.segmented {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.segment-button {
  height: 72px;
  font-size: 24px;
}

.limit-control {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) 72px;
  gap: 10px;
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

.load-summary {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 22px;
  line-height: 30px;
  color: #5b6762;
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
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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

.meta-line,
.reason-line {
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

  .source-scroll {
    grid-template-columns: 1fr;
  }

  .action-row {
    align-items: stretch;
    flex-direction: column;
  }

  .top-bar {
    flex-direction: column;
  }
}
</style>
