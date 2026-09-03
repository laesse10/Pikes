import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { SponsorMark } from "@/components/SponsorMark";
import { sponsors, sponsorTiers, type Sponsor } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sponsoren",
  description:
    "Hauptsponsoren, Co-Sponsoren und Supporter der Zürisee Pikes. Wir danken allen Partnern, die unseren Plausch-Eishockeyclub unterstützen.",
};

const tierMeta: Record<string, { label: string; note: string }> = {
  Hauptsponsor: { label: "Hauptsponsoren", note: "Unsere wichtigsten Partner – ganz vorne mit dabei." },
  "Co-Sponsor": { label: "Co-Sponsoren", note: "Starke Unterstützung Saison für Saison." },
  Supporter: { label: "Supporter", note: "Lokale Betriebe, die den Pikes den Rücken stärken." },
};

function MainSponsorCard({ s }: { s: Sponsor }) {
  return (
    <Link
      href={s.url}
      className="card group relative flex flex-col overflow-hidden rounded p-8 transition-shadow hover:shadow-[var(--shadow-lift)] sm:p-10"
    >
      <span className="absolute right-0 top-0 rounded-bl bg-olive px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-cream-soft">
        Hauptsponsor
      </span>
      <div className="text-navy">
        <SponsorMark glyph={s.glyph} size={56} />
      </div>
      <h3 className="mt-6 font-display text-3xl font-bold uppercase text-navy">{s.name}</h3>
      {s.tagline && <p className="mt-3 max-w-md text-sm leading-relaxed text-navy/65">{s.tagline}</p>}
      <span className="link-underline mt-6 self-start font-display text-sm font-semibold uppercase tracking-wide text-olive">
        Zur Website →
      </span>
    </Link>
  );
}

function SponsorCard({ s, size }: { s: Sponsor; size: "md" | "sm" }) {
  const pad = size === "md" ? "p-6" : "p-5";
  const glyph = size === "md" ? 34 : 26;
  const text = size === "md" ? "text-xl" : "text-base";
  return (
    <Link
      href={s.url}
      className="card group flex items-center gap-4 rounded text-navy/70 transition-colors hover:text-navy"
    >
      <div className={`flex w-full items-center gap-4 ${pad}`}>
        <span className="shrink-0 text-navy/70 transition-colors group-hover:text-olive">
          <SponsorMark glyph={s.glyph} size={glyph} />
        </span>
        <span className={`font-display font-semibold uppercase leading-tight ${text}`}>{s.name}</span>
      </div>
    </Link>
  );
}

export default function SponsorsPage() {
  const byTier = (t: string) => sponsors.filter((s) => s.tier === t);

  return (
    <>
      <PageHero
        eyebrow="Unsere Partner"
        title="Sponsoren"
        intro="Ohne unsere Sponsoren gäbe es kein Eis, keine Trikots und kein Drittel-Bier. Ein riesiges Dankeschön an alle, die die Zürisee Pikes unterstützen!"
      />

      <section className="py-16 sm:py-20">
        <div className="shell container-px space-y-20">
          {sponsorTiers.map((tier) => {
            const list = byTier(tier);
            const meta = tierMeta[tier];
            return (
              <div key={tier}>
                <SectionHeading eyebrow={meta.note} title={meta.label} />
                <div className="mt-10">
                  {tier === "Hauptsponsor" && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {list.map((s, i) => (
                        <Reveal key={s.name} delay={i * 90}>
                          <MainSponsorCard s={s} />
                        </Reveal>
                      ))}
                    </div>
                  )}
                  {tier === "Co-Sponsor" && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {list.map((s, i) => (
                        <Reveal key={s.name} delay={(i % 3) * 70}>
                          <SponsorCard s={s} size="md" />
                        </Reveal>
                      ))}
                    </div>
                  )}
                  {tier === "Supporter" && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {list.map((s, i) => (
                        <Reveal key={s.name} delay={(i % 4) * 50}>
                          <SponsorCard s={s} size="sm" />
                        </Reveal>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Become a sponsor */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-cream">
        <div className="noise absolute inset-0" />
        <div className="shell container-px relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading
              variant="light"
              eyebrow="Partner werden"
              title="Werde Teil der Pikes-Familie"
              intro="Vom Trikot-Sponsoring bis zur Bandenwerbung: Wir bieten attraktive Pakete für Unternehmen aus der Region Zürichsee. Sichtbarkeit am Eis, in der Garderobe und online – und ganz viel Sympathie."
            />
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link href="/mitmachen" className="btn btn-olive w-full justify-center lg:w-auto">Sponsoring anfragen</Link>
            <a href="mailto:info@zueriseepikes.ch" className="btn btn-ghost w-full justify-center lg:w-auto">info@zueriseepikes.ch</a>
          </div>
        </div>
      </section>
    </>
  );
}
