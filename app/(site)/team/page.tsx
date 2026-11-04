import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { PlayerPortrait } from "@/components/Placeholder";
import { Photo } from "@/components/Photo";
import jerseyFront from "@/assets/trikot-vorne.png";
import jerseyBack from "@/assets/trikot-hinten.png";
import { historyIntro, historyText, roster, milestones, teamPhoto, teamPhotoFocus, type Position, type Player } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description: "Der Kader der Zürisee Pikes: Torhüter, Verteidigung, Sturm und die Vereinsgeschichte.",
  // Names next to the team photo: keep the page out of search results and image search.
  robots: { index: false, follow: false, noarchive: true, noimageindex: true },
};

type Tone = "navy" | "olive" | "cream";

const groups: { key: Position; title: string; tone: Tone }[] = [
  { key: "Torhüter", title: "Torhüter", tone: "olive" },
  { key: "Verteidigung", title: "Verteidigung", tone: "navy" },
  { key: "Sturm", title: "Sturm", tone: "cream" },
];

/** Position groups, plus everyone whose position is not recorded yet. */
function squadSections(): { title: string; tone: Tone; players: Player[] }[] {
  const sections = groups.map((g) => ({
    title: g.title,
    tone: g.tone,
    players: roster.filter((p) => p.position === g.key),
  }));
  sections.push({
    title: "Kader",
    tone: "navy",
    players: roster.filter((p) => !p.position),
  });
  return sections.filter((s) => s.players.length > 0);
}

function RoleBadge({ role }: { role: NonNullable<Player["role"]> }) {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-olive font-display text-xs font-bold text-cream-soft" title={role === "C" ? "Captain" : "Assistent"}>
      {role}
    </span>
  );
}

function PlayerCard({ player, tone }: { player: Player; tone: Tone }) {
  return (
    <article className="card group overflow-hidden rounded">
      <div className="relative">
        <PlayerPortrait number={player.number} name={player.name} tone={tone} />
        {player.role && (
          <span className="absolute right-3 top-3">
            <RoleBadge role={player.role} />
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold uppercase leading-tight text-navy">{player.name}</h3>
          <span className="font-stat text-sm text-navy/40">#{player.number}</span>
        </div>
        {(player.position || player.shoots) && (
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-olive">
            {player.position}
            {player.shoots && <span className="text-navy/40"> · Schuss {player.shoots}</span>}
          </p>
        )}
        {player.note && <p className="mt-2 text-xs text-navy/55">{player.note}</p>}
      </div>
    </article>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Der Kader"
        title="Unser Team"
        intro={`${roster.length} Spieler und eine volle Garderobe. Lerne die Cracks kennen, die für die Pikes aufs Eis gehen.`}
      />

      {/* Team photo */}
      <section className="bg-cream py-12">
        <div className="shell container-px">
          <Reveal className="overflow-hidden rounded shadow-[var(--shadow-lift)]">
            <Photo
              src={teamPhoto}
              focus={teamPhotoFocus}
              quality={85}
              alt="Mannschaftsfoto Zürisee Pikes"
              tone="navy"
              ratio="21/9"
              showLogo
              eager
              sizes="(min-width: 1280px) 1216px, 100vw"
              label="Mannschaftsfoto Saison 2026/27"
              sublabel="Platzhalter – euer offizielles Teambild kommt hierhin"
            />
          </Reveal>
        </div>
      </section>

      {/* Roster */}
      <section className="py-12 sm:py-16">
        <div className="shell container-px space-y-16">
          {squadSections().map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-4">
                <h2 className="text-3xl uppercase text-navy">{section.title}</h2>
                <span className="font-stat text-lg text-navy/35">{section.players.length}</span>
                <span className="h-px flex-1 bg-navy/10" />
              </div>
              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {section.players.map((p, i) => (
                  <Reveal key={p.number} delay={(i % 6) * 60}>
                    <PlayerCard player={p} tone={section.tone} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jersey */}
      <section className="ice-grid border-y border-navy/10 py-20">
        <div className="shell container-px grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Saison 2026/27"
              title="Unser Trikot"
              intro="Oliv mit weissen Streifen, crèmefarbenem Kragen und dem Hecht auf der Brust."
            />
            <p className="mt-4 text-[0.95rem] leading-relaxed text-navy/70">
              Auf dem Trikot tragen wir alle unsere Partner mit aufs Eis – von der Mobiliar auf der
              Brust bis zu Teximp auf dem Rücken.{" "}
              <Link href="/sponsoren" className="link-underline font-medium text-navy">
                Unsere Sponsoren
              </Link>
            </p>
          </div>
          <div className="grid grid-cols-2 items-end gap-4 sm:gap-8 lg:col-span-8">
            {[
              { src: jerseyFront, label: "Vorderseite", alt: "Trikot der Zürisee Pikes, Vorderseite mit Hecht-Logo" },
              { src: jerseyBack, label: "Rückseite", alt: "Trikot der Zürisee Pikes, Rückseite mit Name und Nummer" },
            ].map((j, i) => (
              <Reveal key={j.label} delay={i * 100}>
                <figure>
                  <Image
                    src={j.src}
                    alt={j.alt}
                    placeholder="blur"
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 32vw, 50vw"
                    className="h-auto w-full drop-shadow-[0_18px_24px_rgba(15,27,45,0.18)]"
                  />
                  <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-navy/50">
                    {j.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 sm:py-28">
        <div className="shell container-px grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Seit 2026" title="Unsere Geschichte" />
            <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-navy/75">
              <p>{historyIntro}</p>
              <p>{historyText}</p>
            </div>
          </div>

          <Reveal delay={120}>
            <ol className="relative space-y-8 border-l-2 border-navy/15 pl-8">
              {milestones.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[2.6rem] top-0.5 grid h-7 w-7 place-items-center rounded-full bg-navy text-[0.6rem] font-bold text-cream ring-4 ring-cream">
                    ●
                  </span>
                  <p className="font-stat text-2xl font-bold text-olive">{m.year}</p>
                  <h3 className="mt-1 font-display text-lg font-bold uppercase text-navy">{m.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/65">{m.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
