import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { club } from "@/lib/data";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Angaben gemäss Schweizer Recht für den Verein Zürisee Pikes.",
};

export default function ImpressumPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Impressum" crumb="Impressum" />

      <section className="py-16">
        <div className="shell container-px max-w-3xl">
          <div className="prose-legal">
            <p className="text-xs uppercase tracking-[0.14em] text-navy/45">
              Angaben gemäss Schweizer Recht · Demo-Inhalte
            </p>

            <h2>Verein</h2>
            <p>
              <strong>{club.name}</strong>
              <br />
              Eishockeyverein (nicht im Handelsregister eingetragen)
              <br />
              Postfach 123
              <br />
              8700 Küsnacht ZH
              <br />
              Schweiz
            </p>

            <h2>Kontakt</h2>
            <p>
              E-Mail: <a href={`mailto:${club.email}`}>{club.email}</a>
              <br />
              Web: www.zueriseepikes.ch
            </p>

            <h2>Vertretungsberechtigte Personen</h2>
            <p>
              Nico Huber (Präsident)
              <br />
              Sandra Lüthi (Sekretariat / Kassier)
            </p>

            <h2>Vereinszweck</h2>
            <p>
              Der Verein {club.name} bezweckt die Förderung des Plausch-Eishockeys in der Region
              Zürichsee sowie die Teilnahme am Spielbetrieb der {club.league}. Der Verein ist
              politisch und konfessionell neutral und nicht gewinnorientiert.
            </p>

            <h2>Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr
              übernommen. Bei dieser Website handelt es sich um eine Demonstration; sämtliche
              Namen, Resultate, Sponsoren und Bilder sind Platzhalter.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Verweise und Links auf Websites Dritter liegen ausserhalb unseres
              Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Websites abgelehnt.
              Der Zugriff und die Nutzung solcher Websites erfolgen auf eigene Gefahr der Nutzerin
              oder des Nutzers.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien
              auf dieser Website gehören ausschliesslich dem {club.name} oder den speziell genannten
              Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche
              Zustimmung der Urheberrechtsträger im Voraus einzuholen.
            </p>

            <h2>Bildnachweis</h2>
            <p>
              Logo: {club.name}. Sämtliche weiteren Bilder auf dieser Demo-Website sind grafische
              Platzhalter.
            </p>

            <p className="mt-10 text-xs text-navy/45">Stand: Juni 2026</p>
          </div>
        </div>
      </section>
    </>
  );
}
