import Link from "next/link";
import { LogoMark } from "./Logo";
import { club, primaryNav, legalNav } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy-900 text-cream">
      <div className="shell container-px grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark size={52} />
            <div>
              <p className="font-display text-xl font-bold uppercase tracking-wide">{club.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/55">{club.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
            Plausch-Eishockeyclub vom Zürichsee. Gegründet {club.founded}. Wir spielen in der{" "}
            <a href={club.leagueUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-cream">
              {club.league}
            </a>
            .
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={club.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-cream/20 transition-colors hover:bg-cream hover:text-navy-900"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={club.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-cream/20 transition-colors hover:bg-cream hover:text-navy-900"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.2c0-.84.26-1.42 1.47-1.42h1.43V5.18c-.7-.07-1.4-.1-2.1-.1-2.1 0-3.5 1.27-3.5 3.6v2.02H8.5V14h2.2v7h2.8Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav className="md:col-span-3">
          <p className="eyebrow text-olive-200">Navigation</p>
          <ul className="mt-4 space-y-2.5">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow text-olive-200">Kontakt</p>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            <li>
              <span className="block text-cream/45">Heimeis</span>
              {club.homeRink}
            </li>
            <li>
              <span className="block text-cream/45">E-Mail</span>
              <a href={`mailto:${club.email}`} className="link-underline">{club.email}</a>
            </li>
            <li>
              <span className="block text-cream/45">Region</span>
              {club.region}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="shell container-px flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {club.name}. Alle Angaben sind Demo-Daten.</p>
          <div className="flex gap-5">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-cream">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
