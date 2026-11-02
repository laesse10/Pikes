import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { club } from "@/lib/data";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung des Vereins Zürisee Pikes gemäss revidiertem Schweizer Datenschutzgesetz (revDSG).",
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Datenschutz" crumb="Datenschutz" />

      <section className="py-16">
        <div className="shell container-px max-w-3xl">
          <div className="prose-legal">
            <p className="text-xs uppercase tracking-[0.14em] text-navy/45">
              Datenschutzerklärung gemäss revDSG · Demo-Inhalte
            </p>

            <p>
              Der Schutz deiner persönlichen Daten ist uns ein wichtiges Anliegen. Wir bearbeiten
              deine Daten ausschliesslich im Einklang mit dem schweizerischen Datenschutzgesetz
              (revDSG) sowie – soweit anwendbar – der europäischen Datenschutz-Grundverordnung
              (DSGVO).
            </p>

            <h2>1. Verantwortliche Stelle</h2>
            <p>
              <strong>{club.name}</strong>
              <br />
              Postfach 123, 8700 Küsnacht ZH
              <br />
              E-Mail: <a href={`mailto:${club.email}`}>{club.email}</a>
            </p>

            <h2>2. Bearbeitung von Personendaten</h2>
            <p>
              Grundsätzlich kannst du unsere Website besuchen, ohne Angaben zu deiner Person zu
              machen. Wir bearbeiten Personendaten nur, soweit dies für die Bereitstellung einer
              funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
            </p>

            <h2>3. Kontakt- und Anmeldeformular</h2>
            <p>
              Wenn du uns über das Kontaktformular eine Anfrage zukommen lässt, werden deine
              Angaben aus dem Formular (z.&nbsp;B. Name, E-Mail-Adresse, Telefonnummer, Nachricht)
              per E-Mail an uns übermittelt und zwecks Bearbeitung der Anfrage bei uns gespeichert.
              Für den Versand nutzen wir den E-Mail-Dienst Resend (Resend, Inc., USA). Zum Schutz
              vor Spam speichern wir eine pseudonymisierte (gehashte) Form deiner IP-Adresse für
              eine Stunde bei Upstash (Upstash, Inc.). Diese Daten geben wir nicht ohne deine
              Einwilligung weiter. Die Daten werden gelöscht, sobald sie für die Zweckerreichung
              nicht mehr erforderlich sind.
            </p>

            <h2>4. Server-Logfiles &amp; Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Website werden durch den
              Hosting-Provider automatisch Informationen erfasst und in Server-Logfiles gespeichert
              (z.&nbsp;B. IP-Adresse, Datum und Uhrzeit, abgerufene Seite, Browsertyp). Diese Daten
              dienen der technischen Bereitstellung und Sicherheit der Website.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Unsere Website verwendet keine Tracking- oder Marketing-Cookies. Es werden lediglich
              technisch notwendige Cookies eingesetzt, die für den Betrieb der Seite erforderlich
              sind.
            </p>

            <h2>6. Externe Inhalte und Links</h2>
            <p>
              Auf unserer Website finden sich Links zu externen Websites (z.&nbsp;B. Sponsoren,
              ZEP). Beim Anklicken gelangst du auf Seiten Dritter, für deren
              Datenbearbeitung die jeweiligen Anbieter verantwortlich sind.
            </p>
            <ul>
              <li>ZEP – Zürcher Eishockey Plauschliga (<a href={club.leagueUrl} target="_blank" rel="noopener noreferrer">zep.ch</a>)</li>
            </ul>

            <h2>7. Deine Rechte</h2>
            <p>Im Rahmen der geltenden Datenschutzgesetzgebung hast du das Recht auf:</p>
            <ul>
              <li>Auskunft über die von uns bearbeiteten Personendaten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung deiner Daten</li>
              <li>Einschränkung der Datenbearbeitung</li>
              <li>Widerspruch gegen die Datenbearbeitung</li>
            </ul>
            <p>
              Zur Ausübung dieser Rechte genügt eine Mitteilung an{" "}
              <a href={`mailto:${club.email}`}>{club.email}</a>.
            </p>

            <h2>8. Änderungen</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen, damit sie stets
              den aktuellen rechtlichen Anforderungen entspricht.
            </p>

            <p className="mt-10 text-xs text-navy/45">Stand: Juni 2026</p>
          </div>
        </div>
      </section>
    </>
  );
}
