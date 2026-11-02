import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { TeamLogo } from "@/components/TeamLogo";
import { club, fixtures, roster, toGames, formatDate, resultLabel, type Game } from "@/lib/data";
import { getResults } from "@/lib/store";

// Every game page is prerendered. dynamicParams stays on: with it off, a save
// (revalidatePath) leaves the pages unable to re-render and they 404. Unknown
// ids still 404 through notFound() below.
type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return fixtures.map((f) => ({ id: f.id }));
}

const OUTCOME = { S: "Sieg", U: "Unentschieden", N: "Niederlage" } as const;

const matchTitle = (f: { opponent: string; isHome: boolean }) =>
  `Pikes ${f.isHome ? "vs" : "@"} ${f.opponent}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const f = fixtures.find((x) => x.id === id);
  if (!f) return {};
  return {
    title: `${matchTitle(f)} · ${formatDate(f.date, { day: "2-digit", month: "2-digit", year: "numeric" })}`,
    description: `${matchTitle(f)} – ${f.competition}, ${f.venue}. Resultat und Torschützen der Zürisee Pikes.`,
  };
}

async function getGame(id: string): Promise<Game | undefined> {
  return toGames(await getResults()).find((g) => g.id === id);
}

function Side({ team, label }: { team: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <TeamLogo team={team} size={88} tone="dark" />
      <div>
        <p className="font-display text-lg font-bold uppercase leading-tight sm:text-xl">{team}</p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-cream/50">{label}</p>
      </div>
    </div>
  );
}

function Scorers({ game }: { game: Game }) {
  const result = game.result;
  if (!result) {
    return (
      <p className="text-sm leading-relaxed text-navy/60">
        Das Spiel hat noch nicht stattgefunden. Resultat und Torschützen erscheinen hier nach dem Schlusspfiff.
      </p>
    );
  }
  if (result.gf === 0) {
    return <p className="text-sm text-navy/60">In diesem Spiel haben die Pikes kein Tor erzielt.</p>;
  }
  if (!result.goals?.length) {
    return <p className="text-sm text-navy/60">Die Torschützen sind für dieses Spiel noch nicht erfasst.</p>;
  }

  const numberOf = new Map(roster.map((p) => [p.name, p.number]));
  return (
    <ol className="divide-y divide-navy/8">
      {Array.from({ length: result.gf }, (_, i) => {
        const scorer = result.goals?.[i]?.scorer;
        const number = scorer ? numberOf.get(scorer) : undefined;
        return (
          <li key={i} className="flex items-center gap-4 py-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-olive font-stat text-sm font-bold text-cream-soft tabular">
              {i + 1}
            </span>
            <span className={`font-display text-base font-semibold uppercase ${scorer ? "text-navy" : "text-navy/40"}`}>
              {scorer ?? "Unbekannt"}
            </span>
            {number && <span className="ml-auto font-stat text-sm text-navy/40">#{number}</span>}
          </li>
        );
      })}
    </ol>
  );
}

export default async function GamePage({ params }: Props) {
  const { id } = await params;
  const game = await getGame(id);
  if (!game) notFound();

  const outcome = resultLabel(game);
  const kickoffDate = formatDate(game.date, { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  const kickoffTime = formatDate(game.date, { hour: "2-digit", minute: "2-digit" });

  const info = [
    { label: "Datum", value: kickoffDate },
    { label: "Anpfiff", value: `${kickoffTime} Uhr` },
    { label: "Spielort", value: game.venue },
    { label: "Spiel", value: game.isHome ? "Heimspiel" : "Auswärtsspiel" },
    { label: "Wettbewerb", value: `${club.league.split("–")[0].trim()} · ${game.competition}` },
  ];

  return (
    <>
      {/* ========================= SCOREBOARD ========================= */}
      <section className="relative isolate overflow-hidden bg-navy-900 text-cream">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-ink" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "repeating-linear-gradient(115deg, #f3e9d3 0 1px, transparent 1px 26px)" }}
        />
        <div className="noise absolute inset-0" />
        <div className="pointer-events-none absolute -right-16 -top-20 opacity-[0.13]">
          <Image src="/logo.png" alt="" width={420} height={420} className="rotate-6" />
        </div>

        <div className="shell container-px relative pb-14 pt-16 sm:pb-16 sm:pt-20">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cream/50">
            <Link href="/" className="transition-colors hover:text-cream">Start</Link>
            <span>/</span>
            <Link href="/spielplan" className="transition-colors hover:text-cream">Spielplan</Link>
            <span>/</span>
            <span className="text-olive-200">{game.opponent}</span>
          </nav>
          <span className="eyebrow mt-6 flex items-center gap-3 text-olive-200">
            <span className="h-px w-8 bg-current opacity-60" />
            {game.competition} · {formatDate(game.date, { day: "2-digit", month: "long", year: "numeric" })}
          </span>
          <h1 className="sr-only">{matchTitle(game)}</h1>

          <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-10">
            <Side team={club.name} label={game.isHome ? "Heim" : "Gast"} />

            <div className="text-center">
              {game.result ? (
                <>
                  <p className="font-stat text-6xl font-bold leading-none tabular sm:text-8xl">
                    {game.result.gf}
                    <span className="mx-1 text-cream/35 sm:mx-2">:</span>
                    {game.result.ga}
                  </p>
                  {outcome && (
                    <p className="mt-3 inline-block rounded-full bg-cream/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-olive-200">
                      {OUTCOME[outcome]}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="font-display text-3xl font-bold uppercase text-cream/40 sm:text-5xl">vs</p>
                  <p className="mt-3 font-stat text-lg font-semibold tabular text-cream/80">{kickoffTime} Uhr</p>
                </>
              )}
            </div>

            <Side team={game.opponent} label={game.isHome ? "Gast" : "Heim"} />
          </div>

          {!game.result && (
            <div className="mt-10 flex justify-center">
              <Countdown targetIso={game.date} />
            </div>
          )}
        </div>
      </section>

      {/* =========================== DETAILS =========================== */}
      <section className="py-14 sm:py-20">
        <div className="shell container-px grid gap-6 lg:grid-cols-5">
          <Reveal className="card rounded p-6 sm:p-8 lg:col-span-3">
            <h2 className="text-2xl uppercase text-navy">Torschützen Pikes</h2>
            <div className="mt-5">
              <Scorers game={game} />
            </div>
          </Reveal>

          <Reveal delay={80} className="card rounded p-6 sm:p-8 lg:col-span-2">
            <h2 className="text-2xl uppercase text-navy">Spielinfo</h2>
            <dl className="mt-5 divide-y divide-navy/8">
              {info.map((row) => (
                <div key={row.label} className="flex justify-between gap-6 py-3 text-sm">
                  <dt className="text-xs uppercase tracking-[0.12em] text-navy/50">{row.label}</dt>
                  <dd className="text-right font-medium text-navy">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="lg:col-span-5">
            <Link href="/spielplan" className="link-underline text-sm font-medium text-navy">
              ← Zurück zum Spielplan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
