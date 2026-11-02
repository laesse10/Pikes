"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { fieldInput, fieldLabel } from "@/components/admin/styles";
import type { Goal } from "@/lib/data";

// One select per Pikes goal; past this a score is almost certainly a typo.
const MAX_SCORER_FIELDS = 20;

/**
 * Score of one game plus a scorer select for every Pikes goal. The number of
 * selects follows the Pikes score as it is typed, so both go in one save.
 */
export function ResultForm({
  id,
  gf,
  ga,
  goals,
  players,
  action,
}: {
  id: string;
  gf?: number;
  ga?: number;
  goals?: Goal[];
  players: { number: string; name: string }[];
  action: (fd: FormData) => Promise<void>;
}) {
  const [pikes, setPikes] = useState(gf?.toString() ?? "");
  const scorerFields = Math.min(Math.max(Number.parseInt(pikes, 10) || 0, 0), MAX_SCORER_FIELDS);

  return (
    <form action={action} className="mt-4 border-t border-navy/10 pt-4">
      <input type="hidden" name="id" value={id} />
      <div className="flex flex-wrap items-end gap-2">
        <div className="w-20">
          <label className={fieldLabel} htmlFor={`gf-${id}`}>Pikes</label>
          <input
            id={`gf-${id}`}
            type="number"
            name="gf"
            min={0}
            max={99}
            required
            value={pikes}
            onChange={(e) => setPikes(e.target.value)}
            placeholder="–"
            className={fieldInput}
          />
        </div>
        <div className="w-20">
          <label className={fieldLabel} htmlFor={`ga-${id}`}>Gegner</label>
          <input
            id={`ga-${id}`}
            type="number"
            name="ga"
            min={0}
            max={99}
            required
            defaultValue={ga ?? ""}
            placeholder="–"
            className={fieldInput}
          />
        </div>
        <SubmitButton variant="olive">Speichern</SubmitButton>
      </div>

      {scorerFields > 0 && (
        <fieldset className="mt-4">
          <legend className={fieldLabel}>Torschützen Pikes</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {Array.from({ length: scorerFields }, (_, i) => (
              <label key={i} className="flex items-center gap-3">
                <span className="w-12 shrink-0 font-stat text-sm font-semibold text-navy/55 tabular">
                  {i + 1}. Tor
                </span>
                <select name="scorer" defaultValue={goals?.[i]?.scorer ?? ""} className={`${fieldInput} !mt-0`}>
                  <option value="">– unbekannt –</option>
                  {players.map((p) => (
                    <option key={p.name} value={p.name}>
                      #{p.number} {p.name}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </form>
  );
}
