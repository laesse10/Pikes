import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SponsorStrip } from "@/components/SponsorStrip";
import { ResultPill } from "@/components/ResultPill";
import { Placeholder } from "@/components/Placeholder";
import { Photo } from "@/components/Photo";
import { TeamLogo } from "@/components/TeamLogo";
import {
  club,
  roster,
  teamPhotoUrl,
  toGames,
  nextFixture,
  latestResult,
  formatDayTime,
  formatDate,
} from "@/lib/data";
import { getResults } from "@/lib/store";

function Matchup({ opponent, isHome, light = false }: { opponent: string; isHome: boolean; light?: boolean }) {
  const sub = light ? "text-cream/55" : "text-navy/55";
  return (
    <div className="flex items-center gap-3">
      <TeamLogo team={opponent} size={44} tone={light ? "dark" : "light"} />
      <div className="leading-tight">
        <p className="font-display text-lg font-bold uppercase">
          Pikes <span className={`${sub} font-normal`}>{isHome ? "vs" : "@"}</span> {opponent}
        </p>
        <p className={`text-xs uppercase tracking-wide ${sub}`}>{isHome ? "Heimspiel" : "Auswärtsspiel"}</p>
      </div>
    </div>
  );
}

export default async function Home() {
  const games = toGames(await getResults());
  const next = nextFixture(games);
  const last = latestResult(games);
  const scheduled = games.length;

  const stats = [
    { value: club.founded.toString(), label: "Gegründet" },
    { value: "3", label: "Stärkeklasse" },
    { value: roster.length.toString(), label: "Spieler" },
    { value: scheduled.toString(), label: "Spiele 26/27" },
  ];

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden bg-navy-900 text-cream">
        {/* Background: team photo (uploaded) or branded gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-ink" />
        {teamPhotoUrl && (
          <Image src={teamPhotoUrl} alt="Mannschaftsfoto Zürisee Pikes" fill priority sizes="100vw" className="object-cover opacity-55" />
        )}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "repeating-linear-gradient(115deg, #f3e9d3 0 1px, transparent 1px 26px)" }}
        />
        <div className="noise absolute inset-0" />
        {/* Emblem watermark (only without a real photo) */}
        {!teamPhotoUrl && (
          <div className="pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 opacity-[0.12] md:block lg:opacity-20">
            <Image src="/logo.png" alt="" width={680} height={680} className="rotate-6" priority />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/55 to-navy-900/30" />
        {!teamPhotoUrl && (
          <span className="absolute right-4 top-24 z-10 rounded-full bg-cream/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-cream/60 ring-1 ring-cream/15 md:right-6">
            Mannschaftsfoto · Platzhalter
          </span>
        )}

        <div className="shell container-px relative grid w-full gap-12 pb-16 pt-28 lg:grid-cols-12 lg:items-end lg:pb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-3 text-olive-200">
                <span className="h-px w-8 bg-current opacity-60" />
                {club.league}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-6xl uppercase leading-[0.92] sm:text-7xl lg:text-8xl">
                Zürisee
                <br />
                <span className="text-olive-200">Pikes</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">
                Schnell, wendig und mit ordentlich Biss – Plausch-Eishockey vom Zürichsee.
                Seit {club.founded} auf dem Eis der {club.homeRink}.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/spielplan" className="btn btn-olive">Spielplan & Resultate</Link>
                <Link href="/mitmachen" className="btn btn-ghost">Mitspielen</Link>
              </div>
            </Reveal>
          </div>

          {/* Next game card */}
          <Reveal delay={200} className="lg:col-span-5">
            <div className="card !border-cream/10 !bg-navy-800/90 p-6 backdrop-blur sm:p-7">
              {next ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-olive-200">Nächstes Spiel</span>
                    <span className="rounded-full bg-cream/10 px-2.5 py-1 text-[0.6rem] uppercase tracking-wide text-cream/65">
                      {next.competition.split("·")[0].trim()}
                    </span>
                  </div>
                  <div className="mt-5">
                    <Matchup opponent={next.opponent} isHome={next.isHome} light />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-cream/65">
                    <span className="tabular">📅 {formatDayTime(next.date)}</span>
                    <span>📍 {next.venue}</span>
                  </div>
                  <div className="my-6 h-px bg-cream/10" />
                  <Countdown targetIso={next.date} />
                </>
              ) : (
                <div className="py-6 text-center">
                  <span className="eyebrow text-olive-200">Off-Season</span>
                  <p className="mt-3 font-display text-2xl uppercase">Die neue Saison startet bald</p>
                  <p className="mt-2 text-sm text-cream/60">Spielplan folgt – bis dann: Sommertraining!</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== RESULT BANNER ====================== */}
      {last && (
        <section className="bg-olive text-cream-soft">
          <div className="shell container-px flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <span className="eyebrow text-cream-soft/80">Letztes Resultat</span>
              <span className="hidden h-4 w-px bg-cream-soft/30 sm:block" />
              <span className="font-display text-base uppercase">
                Pikes {last.isHome ? "vs" : "@"} {last.opponent}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ResultPill game={last} withScore />
              <span className="text-xs uppercase tracking-wide text-cream-soft/70">
                {last.round ?? last.competition} · {formatDate(last.date, { day: "2-digit", month: "short", year: "numeric" })}
              </span>
              <Link href="/spielplan" className="link-underline text-sm font-medium">Alle Resultate →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================= INTRO ========================= */}
      <section className="ice-grid relative py-20 sm:py-28">
        <div className="shell container-px grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Willkommen"
              title="Ein See. Ein Team. Ein Biss."
              intro="Die Zürisee Pikes sind ein Plausch-Eishockeyclub für alle, die Freude am Spiel über das Resultat stellen. Bei uns zählen Fairplay, Kameradschaft und der gemeinsame Plausch – auf dem Eis und in der Garderobe."
            />
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded border border-navy/10 bg-navy/10">
              {stats.map((s) => (
                <div key={s.label} className="bg-parchment px-5 py-6">
                  <p className="font-stat text-4xl font-bold text-navy tabular">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-navy/55">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/team" className="btn btn-primary">Unser Team</Link>
              <Link href="/galerie" className="btn btn-olive">Galerie</Link>
            </div>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <div className="overflow-hidden rounded shadow-[var(--shadow-lift)]">
                <Photo
                  url={teamPhotoUrl}
                  alt="Mannschaftsfoto Zürisee Pikes"
                  tone="navy"
                  ratio="4/5"
                  showLogo
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  label="Teamfoto Saison 2026/27"
                  sublabel="Hier kommt euer Mannschaftsbild hin"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden w-40 rotate-[-4deg] bg-cream p-3 shadow-[var(--shadow-card)] sm:block">
                <div className="overflow-hidden">
                  <Placeholder tone="olive" ratio="1/1" label="Garderobe" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== SPONSORS ====================== */}
      <SponsorStrip />

      {/* ======================== JOIN CTA ======================== */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-cream">
        <div className="noise absolute inset-0" />
        <div className="pointer-events-none absolute -left-16 -top-16 opacity-10">
          <Image src="/logo.png" alt="" width={360} height={360} />
        </div>
        <div className="shell container-px relative flex flex-col items-center gap-6 text-center">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Mitmachen"
            title="Lust auf Eishockey am See?"
            intro="Egal ob Wiedereinsteiger oder erfahrener Crack – bei den Pikes ist jede:r willkommen, die Freude am Spiel und Teamgeist mitbringt. Komm zu einem Schnuppertraining vorbei."
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/mitmachen" className="btn btn-olive">Schnuppertraining anfragen</Link>
            <Link href="/team" className="btn btn-ghost">Team kennenlernen</Link>
          </div>
        </div>
      </section>
    </>
  );
}
