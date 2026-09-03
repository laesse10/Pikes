import "server-only";
import { cache } from "react";
import { put, list, del } from "@vercel/blob";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { normalizeResults, emptyResults, type ResultsDoc } from "./content";
import type { Result } from "./data";

// Blob bills list() and put() as *advanced* operations, and the Hobby
// allowance for those is small (2k/month). Reading through on every request
// once exhausted it and suspended the store, so public reads go through the
// cache below and are invalidated on save; only the admin reads through.
const CONTENT_TAG = "results";
const CONTENT_TTL_SECONDS = 3600;

// Each save writes a NEW immutable blob (never overwrite). Overwriting the same
// pathname on Vercel Blob is only eventually consistent — the CDN serves stale
// content for a while. Reading the newest object via the (strongly consistent)
// list() metadata API gives immediate read-after-write consistency.
const RESULTS_PREFIX = "results/doc-";

function hasBlob() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function listVersions() {
  const { blobs } = await list({ prefix: RESULTS_PREFIX });
  return blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt));
}

/** Read the newest results document. Falls back to "no scores yet". */
async function readResultsRaw(): Promise<ResultsDoc> {
  if (!hasBlob()) return emptyResults();
  try {
    const versions = await listVersions();
    if (versions.length === 0) return emptyResults();
    const res = await fetch(versions[0].url, { cache: "no-store" });
    if (!res.ok) return emptyResults();
    return normalizeResults(await res.json());
  } catch {
    // Nothing saved yet, or the store is unreachable -> no scores.
    return emptyResults();
  }
}

// Cached across requests and invalidated on save, so a busy day costs a
// handful of Blob operations instead of one per page view. The TTL is only a
// safety net for the case where tag invalidation is missed.
const readResultsCached = unstable_cache(readResultsRaw, ["results-doc"], {
  tags: [CONTENT_TAG],
  revalidate: CONTENT_TTL_SECONDS,
});

/** Read for public pages. Cached; the admin busts the tag whenever it saves. */
export const getResults = cache(async (): Promise<Record<string, Result>> => {
  return (await readResultsCached()).results;
});

/** Fresh read for the admin, which must always see what it just saved. */
export async function getResultsFresh(): Promise<ResultsDoc> {
  return readResultsRaw();
}

async function saveResults(doc: ResultsDoc): Promise<void> {
  if (!hasBlob()) throw new Error("Kein Blob-Speicher konfiguriert (BLOB_READ_WRITE_TOKEN fehlt).");
  const next = { ...doc, updatedAt: new Date().toISOString() };
  const name = `${RESULTS_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2)}.json`;
  await put(name, JSON.stringify(next, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
  // Drop the cached document and every rendered route that shows a score.
  revalidateTag(CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  // Prune old versions, keeping a few recent ones as backup. del() is free;
  // the list() it needs is not, so this only runs when there is enough to
  // make it worth an operation.
  try {
    const versions = await listVersions();
    const stale = versions.slice(5);
    if (stale.length) await del(stale.map((b) => b.url));
  } catch {
    // pruning is best-effort
  }
}

/** Record the score of one game. */
export async function setResult(fixtureId: string, result: Result): Promise<void> {
  const doc = await readResultsRaw();
  await saveResults({ ...doc, results: { ...doc.results, [fixtureId]: result } });
}

/** Remove a score, putting the game back to "upcoming". */
export async function clearResult(fixtureId: string): Promise<void> {
  const doc = await readResultsRaw();
  if (!(fixtureId in doc.results)) return;
  const results = { ...doc.results };
  delete results[fixtureId];
  await saveResults({ ...doc, results });
}

export const STORE_CONFIGURED = hasBlob;
