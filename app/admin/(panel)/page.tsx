import { getResultsFresh } from "@/lib/store";
import { fixtures, formatDate, toGames } from "@/lib/data";
import { saveResultAction, clearResultAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TeamLogo } from "@/components/TeamLogo";
import { fieldInput, fieldLabel } from "@/components/admin/styles";

const ERRORS: Record<string, string> = {
  invalid: "Bitte für beide Teams eine Torzahl zwischen 0 und 99 eintragen.",
  unknown: "Dieses Spiel steht nicht im Spielplan.",
};

export default async function AdminResults({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; deleted?: string; error?: string }>;
}) {
  const { ok, deleted, error } = await searchParams;
  const doc = await getResultsFresh();
  const games = toGames(doc.results).sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const played = games.filter((g) => g.result).length;

  return (
    <div>
      <h1 className="text-3xl uppercase text-navy">Resultate</h1>
      <p className="mt-2 max-w-2xl text-sm text-navy/60">
        Trage nach jedem Spiel das Schlussresultat ein. Alles andere auf der Website – Spielplan,
        Kader, Sponsoren, Galerie – ist fest im Code hinterlegt und ändert sich nur per Deploy.
      </p>

      {error && ERRORS[error] && (
        <div className="mt-6 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {ERRORS[error]}
        </div>
      )}
      {(ok || deleted) && (
        <div className="mt-6 rounded border border-olive/40 bg-olive/10 px-4 py-3 text-sm font-medium text-olive-600">
          {ok ? "Resultat gespeichert ✓" : "Resultat entfernt ✓"}
        </div>
      )}

      <p className="mt-6 font-stat text-2xl font-bold text-olive tabular">
        {played} <span className="font-display text-base font-semibold uppercase text-navy/45">von {games.length} Spielen erfasst</span>
      </p>

      <div className="mt-6 space-y-3">
        {games.map((g) => {
          const kickoff = formatDate(g.date, {
            weekday: "short", day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
          });
          return (
            <section key={g.id} className="card rounded-lg p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <TeamLogo team={g.opponent} size={36} />

                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold uppercase text-navy">
                    Pikes {g.isHome ? "vs" : "@"} {g.opponent}
                  </p>
                  <p className="text-xs text-navy/50">
                    {kickoff} Uhr · {g.venue}
                  </p>
                </div>

                <form action={saveResultAction} className="flex items-end gap-2">
                  <input type="hidden" name="id" value={g.id} />
                  <div className="w-20">
                    <label className={fieldLabel} htmlFor={`gf-${g.id}`}>Pikes</label>
                    <input
                      id={`gf-${g.id}`}
                      type="number"
                      name="gf"
                      min={0}
                      max={99}
                      required
                      defaultValue={g.result?.gf ?? ""}
                      placeholder="–"
                      className={fieldInput}
                    />
                  </div>
                  <div className="w-20">
                    <label className={fieldLabel} htmlFor={`ga-${g.id}`}>Gegner</label>
                    <input
                      id={`ga-${g.id}`}
                      type="number"
                      name="ga"
                      min={0}
                      max={99}
                      required
                      defaultValue={g.result?.ga ?? ""}
                      placeholder="–"
                      className={fieldInput}
                    />
                  </div>
                  <SubmitButton variant="olive">Speichern</SubmitButton>
                </form>

                {g.result && (
                  <form action={clearResultAction}>
                    <input type="hidden" name="id" value={g.id} />
                    <SubmitButton variant="ghost" confirm="Resultat für dieses Spiel entfernen?">
                      Zurücksetzen
                    </SubmitButton>
                  </form>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-navy/45">
        {doc.updatedAt === new Date(0).toISOString()
          ? `Noch kein Resultat gespeichert. Der Spielplan umfasst ${fixtures.length} Spiele.`
          : `Zuletzt gespeichert: ${formatDate(doc.updatedAt, { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })} Uhr`}
      </p>
    </div>
  );
}
