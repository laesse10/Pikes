// ============================================================
// The one thing that is editable at runtime: the score of each game.
// Everything else on the site is static and lives in lib/data.ts.
// ============================================================
import type { Result } from "./data";

/** Scores keyed by fixture id. A fixture without an entry is still upcoming. */
export type ResultsDoc = {
  results: Record<string, Result>;
  updatedAt: string;
};

export function emptyResults(): ResultsDoc {
  return { results: {}, updatedAt: new Date(0).toISOString() };
}

/** Defensive parser so a malformed or older document never breaks the site. */
export function normalizeResults(input: unknown): ResultsDoc {
  if (!input || typeof input !== "object") return emptyResults();
  const doc = input as Partial<ResultsDoc>;

  const raw = doc.results;
  if (!raw || typeof raw !== "object") return emptyResults();

  const results: Record<string, Result> = {};
  for (const [id, value] of Object.entries(raw)) {
    if (!value || typeof value !== "object") continue;
    const { gf, ga } = value as Partial<Result>;
    if (typeof gf !== "number" || typeof ga !== "number") continue;
    if (!Number.isFinite(gf) || !Number.isFinite(ga) || gf < 0 || ga < 0) continue;
    results[id] = { gf, ga };
  }

  return {
    results,
    updatedAt: typeof doc.updatedAt === "string" ? doc.updatedAt : emptyResults().updatedAt,
  };
}
