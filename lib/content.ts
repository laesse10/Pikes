// ============================================================
// The one thing that is editable at runtime: the score of each game,
// and who scored the Pikes goals.
// Everything else on the site is static and lives in lib/data.ts.
// ============================================================
import type { Goal, Result } from "./data";

/** Scores keyed by fixture id. A fixture without an entry is still upcoming. */
export type ResultsDoc = {
  results: Record<string, Result>;
  updatedAt: string;
};

export function emptyResults(): ResultsDoc {
  return { results: {}, updatedAt: new Date(0).toISOString() };
}

const isCount = (n: unknown): n is number =>
  typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 99;

/** Defensive parser for one stored score, so a malformed entry never breaks the site. */
export function normalizeResult(value: unknown): Result | null {
  if (!value || typeof value !== "object") return null;
  const { gf, ga, goals } = value as Partial<Result>;
  if (!isCount(gf) || !isCount(ga)) return null;

  const result: Result = { gf, ga };
  if (Array.isArray(goals)) {
    // One entry per Pikes goal, never more goals than the score says.
    const parsed: Goal[] = goals.slice(0, gf).map((g) => {
      const scorer = g && typeof g === "object" ? (g as Goal).scorer : undefined;
      return typeof scorer === "string" && scorer.trim() ? { scorer: scorer.trim() } : {};
    });
    if (parsed.some((g) => g.scorer)) result.goals = parsed;
  }
  return result;
}

/** Parse a map of fixture id → score, dropping entries that don't parse. */
export function normalizeResults(input: unknown): Record<string, Result> {
  if (!input || typeof input !== "object") return {};
  const results: Record<string, Result> = {};
  for (const [id, value] of Object.entries(input)) {
    const result = normalizeResult(value);
    if (result) results[id] = result;
  }
  return results;
}
