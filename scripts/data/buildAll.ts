import { buildSourceRecords } from "./buildSourceRecords";
import { extractNameTokens } from "./extractNameTokens";
import { buildCandidateDb } from "./buildCandidateDb";
import { validateData } from "./validateData";
import { runIfMain } from "./lib/run";

export async function buildAll(): Promise<void> {
  await buildSourceRecords();
  await extractNameTokens();
  await buildCandidateDb();
  await validateData();
}

runIfMain("buildAll.ts", async () => {
  await buildAll();
});

