import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { RinkMap, RinkRouteLinks } from "@/components/RinkMap";
import { ContactForm } from "@/components/ContactForm";
import { club } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mitmachen & Kontakt",
  description:
    "Der Kader der Zürisee Pikes ist voll besetzt. Trag dich auf die Warteliste ein – wir melden uns, sobald ein Platz frei wird.",
};

const facts = [
  { icon: "🏒", title: "Training", text: "Dienstags & freitags, 20:15–21:45 Uhr (Wintersaison)" },
  { icon: "📍", title: "Heimeis", text: `${club.homeRink}, Küsnacht ZH` },
  { icon: "🎿", title: "Niveau", text: "Plausch-Eishockey – Spass vor Resultat, alle Levels willkommen" },
  { icon: "🧤", title: "Ausrüstung", text: "Eigene Ausrüstung von Vorteil" },
];

const steps = [
  { n: "01", title: "Trag dich ein", text: "Melde dich übers Formular mit «Warteliste» – kurz wer du bist, Position und Erfahrung." },
  { n: "02", title: "Wir melden uns", text: "Sobald im Kader ein Platz frei wird, gehen wir die Warteliste der Reihe nach durch." },
  { n: "03", title: "Werde Pike", text: "Passt es für beide Seiten, bist du Teil der Mannschaft – inklusive Garderobenplatz." },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Mitmachen & Kontakt"
        title="Kader voll – Warteliste offen"
        intro="Unser Team ist aktuell voll besetzt, Schnuppertrainings bieten wir deshalb keine an. Trag dich auf die Warteliste ein – sobald ein Platz frei wird, melden wir uns bei dir."
        crumb="Mitmachen"
      />

      {/* Facts */}
      <section className="py-16 sm:py-20">
        <div className="shell container-px">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <div className="card h-full rounded p-6">
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="mt-4 font-display text-lg font-bold uppercase text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/65">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="ice-grid border-y border-navy/10 py-20">
        <div className="shell container-px">
          <SectionHeading eyebrow="So läuft's" title="Über die Warteliste aufs Eis" align="center" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} className="relative text-center">
                <span className="font-stat text-6xl font-bold text-olive/30">{s.n}</span>
                <h3 className="mt-2 text-xl uppercase text-navy">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-navy/65">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + contact */}
      <section className="py-20">
        <div className="shell container-px grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <SectionHeading eyebrow="Schreib uns" title="Warteliste & Kontakt" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="card rounded p-6">
              <h3 className="font-display text-lg font-bold uppercase text-navy">Direkt erreichen</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <span className="block text-xs uppercase tracking-[0.12em] text-navy/45">E-Mail</span>
                  <a href={`mailto:${club.email}`} className="link-underline font-medium text-navy">{club.email}</a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-[0.12em] text-navy/45">Heimeis</span>
                  <span className="font-medium text-navy">{club.homeRink}</span>
                  <span className="block text-navy/60">{club.homeRinkAddress}</span>
                  <RinkRouteLinks className="mt-3" />
                </li>
              </ul>
            </div>
            <RinkMap />
          </div>
        </div>
      </section>
    </>
  );
}
