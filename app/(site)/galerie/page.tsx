import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { gallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Spieltag-Action, Team-Events und Garderoben-Kultur der Zürisee Pikes in Bildern.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="In Bildern"
        title="Galerie"
        intro="Vom ersten Bully bis zum Jubel nach der Schlusssirene – ein paar Eindrücke vom Pikes-Leben auf und neben dem Eis. (Aktuell Platzhalter – eure echten Fotos kommen hier rein.)"
      />

      <section className="py-14 sm:py-20">
        <div className="shell container-px">
          <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] md:grid-cols-3 lg:grid-cols-4">
            {gallery.map((item, i) => {
              const span =
                item.span === "tall"
                  ? "row-span-2"
                  : item.span === "wide"
                    ? "col-span-2"
                    : "";
              return (
                <Reveal
                  key={item.id}
                  delay={(i % 4) * 60}
                  className={`group relative overflow-hidden rounded shadow-[var(--shadow-card)] ${span}`}
                >
                  <Photo
                    alt={item.caption}
                    tone={item.tone}
                    label={item.caption}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-olive-200">{item.category}</span>
                    <p className="mt-1 font-display text-sm font-semibold uppercase text-cream">{item.caption}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-navy/50">
            Mehr Bilder findest du auf unserem{" "}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link-underline font-medium text-navy">
              Instagram-Kanal
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
