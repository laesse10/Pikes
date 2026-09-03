import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ResultPill } from "@/components/ResultPill";
import { TeamLogo } from "@/components/TeamLogo";
import { club, toGames, formatDate, type Game, type Competition } from "@/lib/data";
import { getResults } from "@/lib/store";

export const metadata: Metadata = {
  title: "Spielplan & Resultate",
  description:
    "Alle Spiele und Resultate der Zürisee Pikes in der Saison 2026/27 – Stärkeklasse 3, Gruppe Ost.",
};

function FixtureRow({ f }: { f: Game }) {
  const upcoming = f.status === "upcoming";
  const time = new Intl.DateTimeFormat("de-CH", { timeZone: "Europe/Zurich", hour: "2-digit", minute: "2-digit" }).format(new Date(f.date));
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3.5 transition-colors hover:bg-cream-soft sm:grid-cols-[7.5rem_1fr_auto] sm:px-6">
      {/* Date */}
      <div className="leading-tight">
        <p className="font-stat text-sm font-semibold text-navy tabular">
          {formatDate(f.date, { day: "2-digit", month: "short" })}
        </p>
        <p className="text-xs text-navy/45 tabular">{upcoming ? `${time} Uhr` : (f.round ?? `${time} Uhr`)}</p>
      </div>

      {/* Matchup */}
      <div className="flex min-w-0 items-center gap-3">
        <TeamLogo team={f.opponent} size={40} />
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold uppercase text-navy">
            Pikes <span className="text-navy/40">{f.isHome ? "vs" : "@"}</span> {f.opponent}
          </p>
          <p className="truncate text-xs text-navy/50">
            <span className={`mr-2 inline-block rounded-sm px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide ${f.isHome ? "bg-olive/15 text-olive-600" : "bg-navy/10 text-navy/60"}`}>
              {f.isHome ? "Heim" : "Auswärts"}
            </span>
            {f.venue}
          </p>
        </div>
      </div>

      {/* Result / time */}
      <div className="text-right">
        {upcoming ? (
          <span className="font-stat text-base font-semibold text-navy/70 tabular sm:hidden">{time}</span>
        ) : (
          <ResultPill game={f} withScore />
        )}
        {upcoming && (
          <span className="hidden rounded-full bg-navy/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-navy/60 sm:inline-block">
            Vorschau
          </span>
        )}
      </div>
    </div>
  );
}

function FixtureGroup({ title, items, accent }: { title: string; items: Game[]; accent?: string }) {
  if (items.length === 0) return null;
  return (
    <Reveal className="card overflow-hidden rounded">
      <div className="flex items-center justify-between gap-3 border-b border-navy/10 bg-navy px-5 py-3.5 text-cream sm:px-6">
        <h3 className="font-display text-base font-bold uppercase tracking-wide">{title}</h3>
        {accent && <span className="text-xs uppercase tracking-[0.14em] text-cream/55">{accent}</span>}
      </div>
      <div className="divide-y divide-navy/8">
        {items.map((f) => (
          <FixtureRow key={f.id} f={f} />
        ))}
      </div>
    </Reveal>
  );
}

export default async function SchedulePage() {
  const games = toGames(await getResults());
  const upcoming = games
    .filter((g) => g.status === "upcoming")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

  const byCompetition = (c: Competition) =>
    games.filter((g) => g.competition === c && g.status === "final");

  const liga = byCompetition("Stärkeklasse 3 · Gruppe Ost");
  const playoff = byCompetition("Playoff");

  const upcomingComp = upcoming[0]?.competition ?? "Vorbereitung 2026/27";

  return (
    <>
      <PageHero
        eyebrow="Saison 2026/27"
        title="Spielplan & Resultate"
        intro="Die Pikes spielen in der Stärkeklasse 3, Gruppe Ost der ZEP. Unten findest du alle Partien der Saison 2026/27 und die Resultate der bereits gespielten Runden."
      />

      <section className="py-14 sm:py-20">
        <div className="shell container-px space-y-12">
          {/* Upcoming */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-olive" />
              </span>
              <h2 className="text-3xl uppercase text-navy">Kommende Spiele</h2>
            </div>
            {upcoming.length > 0 ? (
              <FixtureGroup title={upcomingComp} items={upcoming} accent={club.division} />
            ) : (
              <p className="card rounded p-6 text-navy/60">Aktuell sind keine Spiele angesetzt – der neue Spielplan folgt.</p>
            )}
          </div>

          {/* Results */}
          {liga.length + playoff.length > 0 && (
            <div>
              <h2 className="mb-6 text-3xl uppercase text-navy">Resultate 2026/27</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                <FixtureGroup title="Stärkeklasse 3 · Gruppe Ost" items={liga} accent="Qualifikation" />
                <FixtureGroup title="Playoff" items={playoff} accent="K.-o.-Runde" />
              </div>
            </div>
          )}

          {/* League table lives on the ZEP site — we do not keep a copy */}
          <div>
            <h2 className="mb-6 text-3xl uppercase text-navy">Tabelle</h2>
            <Reveal className="card flex flex-col items-start gap-4 rounded p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-display text-lg font-bold uppercase text-navy">
                  Aktueller Tabellenstand
                </p>
                <p className="mt-1 max-w-lg text-sm leading-relaxed text-navy/60">
                  Die offizielle Tabelle der {club.division} wird von der {club.league} geführt und dort laufend aktualisiert.
                </p>
              </div>
              <a
                href={club.leagueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary shrink-0"
              >
                Tabelle auf zep.ch
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
