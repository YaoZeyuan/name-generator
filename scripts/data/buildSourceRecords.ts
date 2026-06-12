import path from "node:path";
import { dataSourceAdapters } from "./adapters";
import type { SourceManifest } from "./types";
import { createBuildContext } from "./lib/paths";
import { writeJson } from "./lib/writeJson";
import { runIfMain } from "./lib/run";

export async function buildSourceRecords(): Promise<SourceManifest> {
  const context = createBuildContext();
  const sourceDir = path.resolve(context.databaseDir, "source");
  const manifest: SourceManifest = {
    generatedAt: new Date().toISOString(),
    sources: [],
  };

  for (const adapter of dataSourceAdapters) {
    const records = await adapter.buildRecords(context);
    writeJson(path.resolve(sourceDir, adapter.recordFile), records);
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

