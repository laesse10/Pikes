import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { SponsorTile } from "@/components/SponsorTile";
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

type Section = {
  key: string;
  label: string;
  note: string;
  size: "sm" | "md" | "lg";
  cols: string;
  list: Sponsor[];
};

/** Tier sections, plus everyone who has not been assigned a tier yet. */
function sponsorSections(): Section[] {
  const sections: Section[] = sponsorTiers.map((tier) => ({
    key: tier,
    label: tierMeta[tier].label,
    note: tierMeta[tier].note,
    size: tier === "Hauptsponsor" ? "lg" : tier === "Co-Sponsor" ? "md" : "sm",
    cols: tier === "Hauptsponsor" ? "sm:grid-cols-2" : tier === "Co-Sponsor" ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-3 lg:grid-cols-4",
    list: sponsors.filter((s) => s.tier === tier),
  }));
  sections.push({
    key: "Partner",
    label: "Unsere Partner",
    note: "Sie machen den Pikes das Eis möglich.",
    size: "md",
    cols: "sm:grid-cols-2 lg:grid-cols-3",
    list: sponsors.filter((s) => !s.tier),
  });
  return sections.filter((s) => s.list.length > 0);
}

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Unsere Partner"
        title="Sponsoren"
        intro="Ohne unsere Sponsoren gäbe es kein Eis, keine Trikots und kein Drittel-Bier. Ein riesiges Dankeschön an alle, die die Zürisee Pikes unterstützen!"
      />

      <section className="py-16 sm:py-20">
        <div className="shell container-px space-y-20">
          {sponsorSections().map((section) => (
            <div key={section.key}>
              <SectionHeading eyebrow={section.note} title={section.label} />
              <div className={`mt-10 grid gap-5 ${section.cols}`}>
                {section.list.map((s, i) => (
                  <Reveal key={s.name} delay={(i % 3) * 70}>
                    <SponsorTile sponsor={s} size={section.size} />
                    <p className="mt-3 text-center font-display text-sm font-semibold uppercase tracking-wide text-navy/70">
                      {s.name}
                    </p>
                    {s.tagline && (
                      <p className="mt-1 text-center text-xs leading-relaxed text-navy/55">{s.tagline}</p>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
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
