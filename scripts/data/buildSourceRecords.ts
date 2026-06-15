import path from "node:path";
import { dataSourceAdapters } from "./adapters";
import type { NormalizedSourceRecord, SourceManifest } from "./types";
import { createBuildContext } from "./lib/paths";
import { writeJson } from "./lib/writeJson";
import { runIfMain } from "./lib/run";

function toStoredSourceRecords(sourceId: string, records: NormalizedSourceRecord[]): unknown[] {
  switch (sourceId) {
    case "wealth":
      return records.map((record) => [
        record.rawIndex,
        record.normalizedFields.content || "",
        record.normalizedFields.count || 0,
      ]);
    case "modern_people":
      return records.map((record) => [
        record.rawIndex,
        record.normalizedFields.name || "",
        record.normalizedFields.counter || 1,
        record.normalizedFields.length || 0,
      ]);
    case "science_people":
      return records.map((record) => [
        record.rawIndex,
        record.normalizedFields.fullName || "",
        record.normalizedFields.sourceDetail || "",
        record.normalizedFields.candidateSourceId || "",
      ]);
    case "imperial_exam":
      return records.map((record) => [
        record.rawIndex,
        record.normalizedFields.fullName || "",
        record.normalizedFields.courtesyNames || [],
      ]);
    case "ancient_names":
      return records.map((record) => [
        record.rawIndex,
        record.normalizedFields.rawName || "",
        record.normalizedFields.surname || "",
        record.normalizedFields.givenName || "",
        record.normalizedFields.courtesyName || "",
      ]);
    default:
      return records.map((record) => [record.rawIndex, record.normalizedFields]);
  }
}

export async function buildSourceRecords(): Promise<SourceManifest> {
  const context = createBuildContext();
  const sourceDir = path.resolve(context.databaseDir, "source");
  const manifest: SourceManifest = {
    generatedAt: new Date().toISOString(),
    sources: [],
  };

  for (const adapter of dataSourceAdapters) {
    const records = await adapter.buildRecords(context);
    writeJson(path.resolve(sourceDir, adapter.recordFile), {
      recordMode: "compact_source_tuple_v1",
      sourceId: adapter.sourceId,
      records: toStoredSourceRecords(adapter.sourceId, records),
    });
    manifest.sources.push({
      sourceId: adapter.sourceId,
      sourceLabel: adapter.sourceLabel,
      inputFiles: adapter.inputFiles,
      recordFile: adapter.recordFile,
      recordCount: records.length,
    });
    console.log(`[source] ${adapter.sourceLabel}: ${records.length} records`);
  }

  writeJson(path.resolve(sourceDir, "source_manifest.json"), manifest);
  return manifest;
}

runIfMain("buildSourceRecords.ts", async () => {
  await buildSourceRecords();
});

