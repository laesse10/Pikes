import "server-only";
import { cache } from "react";
import { Redis } from "@upstash/redis";
import { revalidatePath, unstable_cache, updateTag } from "next/cache";
import { normalizeResults, emptyResults, type ResultsDoc } from "./content";
import type { Result } from "./data";

// Scores live in Upstash Redis (Vercel Marketplace): one hash, field = fixture
// id, value = that game's score. Saving a game writes only its own field, so
// two people saving different games at once can't overwrite each other.
const RESULTS_KEY = "pikes:results";
const UPDATED_KEY = "pikes:results:updatedAt";

// Public pages read through this cache, which every save expires, so a page
// view doesn't cost a Redis call. The TTL is only a safety net.
const CONTENT_TAG = "results";
const CONTENT_TTL_SECONDS = 3600;

let client: Redis | null | undefined;

/** The Redis client, or null where no store is connected (e.g. a fresh clone). */
function redis(): Redis | null {
  if (client === undefined) {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    client = url && token ? Redis.fromEnv() : null;
  }
  return client;
}

/**
 * Read every score. Errors are thrown, not swallowed: a failed refresh then
 * keeps serving the last good page instead of caching "no scores".
 */
async function readResultsRaw(): Promise<ResultsDoc> {
  const db = redis();
  if (!db) return emptyResults();
  const [results, updatedAt] = await Promise.all([
    db.hgetall<Record<string, unknown>>(RESULTS_KEY),
    db.get<string>(UPDATED_KEY),
  ]);
  return {
    results: normalizeResults(results),
    updatedAt: typeof updatedAt === "string" ? updatedAt : emptyResults().updatedAt,
  };
}

const readResultsCached = unstable_cache(readResultsRaw, ["results-redis"], {
  tags: [CONTENT_TAG],
  revalidate: CONTENT_TTL_SECONDS,
});

/** Read for public pages. Cached; every save expires it. */
export const getResults = cache(async (): Promise<Record<string, Result>> => {
  return (await readResultsCached()).results;
});

/** Fresh read for the admin, which must always see what it just saved. */
export async function getResultsFresh(): Promise<ResultsDoc> {
  return readResultsRaw();
}

function requireRedis(): Redis {
  const db = redis();
  if (!db) throw new Error("Kein Speicher verbunden (KV_REST_API_URL / KV_REST_API_TOKEN fehlen).");
  return db;
}

/** Expire the cached scores and every rendered page that shows one. */
function publish() {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

/** Record the score of one game, with its goal scorers. */
export async function setResult(fixtureId: string, result: Result): Promise<void> {
  await requireRedis()
    .multi()
    .hset(RESULTS_KEY, { [fixtureId]: result })
    .set(UPDATED_KEY, new Date().toISOString())
    .exec();
  publish();
}

/** Remove a score, putting the game back to "upcoming". */
export async function clearResult(fixtureId: string): Promise<void> {
  await requireRedis()
    .multi()
    .hdel(RESULTS_KEY, fixtureId)
    .set(UPDATED_KEY, new Date().toISOString())
    .exec();
  publish();
}

/** Whether a Redis store is connected; the admin warns when it isn't. */
export const STORE_CONFIGURED = () => redis() !== null;
