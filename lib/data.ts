import type { StaticImageData } from "next/image";
import teamPhotoImage from "@/assets/mannschaftsfoto-2026-27.jpg";

// ============================================================
// Zürisee Pikes — all site content.
// Everything here is static and ships with the build. The only thing
// editable at runtime is the score of each game (see lib/store.ts).
// Kader, Sponsoren und Galerie sind noch Platzhalter.
// ============================================================

export const club = {
  name: "Zürisee Pikes",
  shortName: "Pikes",
  tagline: "Hockey mit Biss",
  league: "ZEP – Zürcher Eishockey Plauschliga",
  leagueUrl: "https://www.zep.ch/",
  division: "Gruppe D",
  founded: 2026,
  homeRink: "Kunsteisbahn Küsnacht (KEK)",
  homeRinkAddress: "Johannisburgstrasse 22, 8700 Küsnacht ZH",
  email: "info@zueriseepikes.ch",
  region: "Zürichsee, Kanton Zürich",
  colors: ["Navy", "Crème", "Oliv"],
} as const;

/**
 * Mannschaftsfoto. Statisch importiert, damit Next.js Grösse und eine
 * Unschärfe-Vorschau kennt und für jeden Bildschirm eine passende WebP-Version
 * ausliefert. Die Quelldatei ist auf 3200 px Breite verkleinert.
 */
export const teamPhoto: StaticImageData | undefined = teamPhotoImage;

/** Bildausschnitt: die Mannschaft steht im unteren Teil des Bildes. */
export const teamPhotoFocus = "50% 70%";

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Team", href: "/team" },
  { label: "Spielplan", href: "/spielplan" },
  { label: "Sponsoren", href: "/sponsoren" },
  { label: "Galerie", href: "/galerie" },
  { label: "Mitmachen", href: "/mitmachen" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

// ------------------------------------------------------------
// Roster
// ------------------------------------------------------------
export type Position = "Torhüter" | "Verteidigung" | "Sturm";

export type Player = {
  /** Jersey number as printed on the shirt — a string, so "00" stays "00". */
  number: string;
  name: string;
  /** Not yet known for the current squad; players without one show under "Kader". */
  position?: Position;
  shoots?: "L" | "R";
  since?: number;
  role?: "C" | "A"; // Captain / Assistant
  note?: string;
};

// Kader 2026/27. Positionen, Captain/Assistent und Schusshand sind noch offen –
// einfach beim jeweiligen Spieler ergänzen, z. B.:
//   { number: "11", name: "Lars Hulsbergen", position: "Sturm", shoots: "L", role: "C" },
export const roster: Player[] = [
  { number: "00", name: "Sebastian Bensland" },
  { number: "7", name: "Oliver Binkert" },
  { number: "11", name: "Lars Hulsbergen" },
  { number: "13", name: "Loris Bornatico" },
  { number: "14", name: "Alexander Lebeda" },
  { number: "15", name: "Erik Meier" },
  { number: "16", name: "Robin Schellenberg" },
  { number: "17", name: "Julius Unger" },
  { number: "18", name: "Raphael Messerli" },
  { number: "21", name: "Gian Welti" },
  { number: "28", name: "Leandro Bornatico" },
  { number: "29", name: "Kevin Vizner" },
  { number: "31", name: "Nikolas Unger" },
  { number: "33", name: "Eric Frey" },
  { number: "34", name: "Oliver Kalla" },
  { number: "39", name: "Dominik Gut" },
  { number: "66", name: "Alexander Bensland" },
  { number: "71", name: "Benedict Stüdi" },
  { number: "76", name: "Vincent Brely-Demeules" },
  { number: "77", name: "Benedikt Steiner" },
  { number: "81", name: "Marc Ramseier" },
  { number: "87", name: "Maximilian Eberle" },
  { number: "89", name: "Milo Marsland" },
  { number: "90", name: "Colin Rieffel" },
];

// ------------------------------------------------------------
// Club history
// ------------------------------------------------------------
export const historyIntro =
  "Die Zürisee Pikes wurden 2026 von einer Handvoll eishockeyverrückter Freunde aus der Region Zürichsee gegründet. Der Name war schnell gefunden: Der Hecht («Pike») ist der König des Sees – schnell, wendig und mit ordentlich Biss. Genau so wollten wir Eishockey spielen.";

export const historyText =
  "Aus dem losen Plauschteam wurde ein fester Verein in der Zürcher Eishockey Plauschliga (ZEP). Wir starteten zuunterst und lernen in jeder Saison dazu. Heute spielen wir in der Gruppe D – aber wichtiger als jede Tabelle ist, dass nach dem Schlusspfiff alle gemeinsam in der Garderobe sitzen. Fairplay, Kameradschaft und Freude am Spiel stehen bei uns über dem Resultat.";

export type Milestone = { year: string; title: string; text: string };

export const milestones: Milestone[] = [
  { year: "2026", title: "Die Gründung", text: "Eine Handvoll eishockeyverrückter Freunde gründet die Zürisee Pikes" },
  { year: "2026", title: "Logo & Name", text: "Der Hecht («Pike») wird zum Wappentier: schnell, wendig und mit ordentlich Biss. Das Emblem ist geboren." },
  { year: "2026", title: "Erstes Eistraining", text: "Premiere auf dem Eis der Kunsteisbahn Küsnacht – die ersten Schlittschuhe werden geschnürt." },
  { year: "2026", title: "Aufnahme in die ZEP", text: "Die Pikes werden in die Zürcher Eishockey Plauschliga aufgenommen." },
  { year: "2026/27", title: "Erste Saison", text: "Die Pikes bestreiten ihre erste Spielzeit in der Gruppe D." },
];

// ------------------------------------------------------------
// Schedule
// Dates, opponents and venues are fixed for the whole season, so the
// schedule is static. Scores are not part of a Fixture — they are entered
// in the admin and merged in via toGames().
// ------------------------------------------------------------
export type Competition = "Gruppe D" | "Playoff" | "Vorbereitung 2026/27";

export type Fixture = {
  id: string;
  date: string; // ISO datetime
  opponent: string;
  isHome: boolean;
  venue: string;
  competition: Competition;
  round?: string;
};

/** One Pikes goal. The scorer is a roster name; missing means not known. */
export type Goal = { scorer?: string };

/**
 * Goals for/against the Pikes, plus who scored the Pikes goals in order —
 * the only runtime-editable data on the site.
 */
export type Result = { gf: number; ga: number; goals?: Goal[] };

/** A fixture with its score merged in. This is what the pages render. */
export type Game = Fixture & {
  result?: Result;
  status: "final" | "upcoming";
};

export const fixtures: Fixture[] = [
  // -- Qualifikation 2026/27 (Spielplan ZEP) --
  { id: "g2627-01", date: "2026-10-11T08:00:00+02:00", opponent: "Horgner Dolphins", isHome: true, venue: "Kunsteisbahn Küsnacht", competition: "Gruppe D" },
  { id: "g2627-02", date: "2026-11-01T08:00:00+01:00", opponent: "EHC Züri Devils", isHome: true, venue: "Kunsteisbahn Küsnacht", competition: "Gruppe D" },
  { id: "g2627-03", date: "2026-11-29T15:00:00+01:00", opponent: "Horgner Dolphins", isHome: false, venue: "Trainingshalle od. Arena Zug", competition: "Gruppe D" },
  { id: "g2627-04", date: "2026-12-13T07:45:00+01:00", opponent: "Cat Lake City Flyers", isHome: false, venue: "Eishalle Neudorf Oerlikon", competition: "Gruppe D" },
  { id: "g2627-06", date: "2026-12-18T20:30:00+01:00", opponent: "EHC Blau-Weiss Dübendorf", isHome: false, venue: "Eishalle Dübendorf", competition: "Gruppe D" },
  { id: "g2627-05", date: "2027-01-03T08:00:00+01:00", opponent: "Cat Lake City Flyers", isHome: true, venue: "Kunsteisbahn Küsnacht", competition: "Gruppe D" },
  { id: "g2627-07", date: "2027-01-16T19:15:00+01:00", opponent: "The Pinguins", isHome: true, venue: "Kunsteisbahn Küsnacht", competition: "Gruppe D" },
  { id: "g2627-08", date: "2027-01-30T19:15:00+01:00", opponent: "EHC Blau-Weiss Dübendorf", isHome: true, venue: "Kunsteisbahn Küsnacht", competition: "Gruppe D" },
  { id: "g2627-09", date: "2027-01-31T17:00:00+01:00", opponent: "EHC Züri Devils", isHome: false, venue: "Eishalle Wetzikon", competition: "Gruppe D" },
  { id: "g2627-10", date: "2027-02-07T20:00:00+01:00", opponent: "The Pinguins", isHome: false, venue: "Kunsteisbahn Urdorf", competition: "Gruppe D" },
  { id: "g2627-11", date: "2027-02-20T19:15:00+01:00", opponent: "SC Blue Eagles", isHome: true, venue: "Kunsteisbahn Küsnacht", competition: "Gruppe D" },
  { id: "g2627-12", date: "2027-03-12T21:30:00+01:00", opponent: "SC Blue Eagles", isHome: false, venue: "Eishalle Wetzikon", competition: "Gruppe D" },
];

/** Merge the stored scores onto the static schedule. */
export function toGames(results: Record<string, Result>, list: Fixture[] = fixtures): Game[] {
  return list.map((f) => {
    const result = results[f.id];
    return { ...f, result, status: result ? "final" : "upcoming" };
  });
}

/** Detail page of a game. */
export function gameHref(id: string): string {
  return `/spielplan/${id}`;
}

export function nextFixture(list: Game[], now: Date = new Date()): Game | undefined {
  return [...list]
    .filter((g) => g.status === "upcoming" && new Date(g.date).getTime() > now.getTime())
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];
}

export function latestResult(list: Game[], now: Date = new Date()): Game | undefined {
  return [...list]
    .filter((g) => g.result && new Date(g.date).getTime() <= now.getTime())
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))[0];
}

export function resultLabel(g: Game): "S" | "U" | "N" | null {
  if (!g.result) return null;
  const { gf, ga } = g.result;
  if (gf > ga) return "S"; // Sieg
  if (gf < ga) return "N"; // Niederlage
  return "U"; // Unentschieden
}

// ------------------------------------------------------------
// Team logos (files live in /public/opponents, Pikes emblem in /public)
// ------------------------------------------------------------
const TEAM_LOGOS: Record<string, string> = {
  "Zürisee Pikes": "/logo.png",
  "Cat Lake City Flyers": "/opponents/cat-lake-city-flyers.gif",
  "EHC Blau-Weiss Dübendorf": "/opponents/ehc-blau-weiss-duebendorf.jpg",
  "EHC Züri Devils": "/opponents/ehc-zueri-devils.gif",
  "Horgner Dolphins": "/opponents/horgner-dolphins.gif",
  "SC Blue Eagles": "/opponents/sc-blue-eagles.png",
  "The Pinguins": "/opponents/the-pinguins.png",
};

/** Logo path for a team, or undefined when we have none (admin can add teams). */
export function teamLogo(team: string): string | undefined {
  return TEAM_LOGOS[team.trim()];
}

/** Fallback badge text for teams without a logo file. */
export function teamInitials(team: string): string {
  return team
    .replace(/^(EHC|SC|HC|EV|The)\s+/i, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ------------------------------------------------------------
// Sponsors
// Logo files live in /public/sponsors. The originals under sponsors/ are white
// artwork on transparency, which is invisible on our cream pages; the web
// copies are recoloured to near-black so they read on a light background.
// ------------------------------------------------------------
export type SponsorTier = "Hauptsponsor" | "Co-Sponsor" | "Supporter";

export type Sponsor = {
  name: string;
  /** Path under /public. */
  logo: string;
  /** Not yet assigned; sponsors without a tier show under "Unsere Partner". */
  tier?: SponsorTier;
  url?: string;
  tagline?: string;
};

export const sponsors: Sponsor[] = [
  { name: "die Mobiliar", logo: "/sponsors/mobiliar.png" },
  { name: "Quadrik Asset Management AG", logo: "/sponsors/quadrik.png" },
  { name: "Teximp", logo: "/sponsors/teximp.png" },
  { name: "MRI Medizinisch Radiologisches Institut", logo: "/sponsors/mri.png" },
  { name: "Frauenpraxis Küsnacht", logo: "/sponsors/frauenpraxis.png" },
  { name: "Villa Trasqua", logo: "/sponsors/trasqua.png" },
  { name: "IN", logo: "/sponsors/in.png" },
];

export const sponsorTiers: SponsorTier[] = ["Hauptsponsor", "Co-Sponsor", "Supporter"];

// ------------------------------------------------------------
// Gallery
// ------------------------------------------------------------
export type GalleryCategory = "Spieltag" | "Team-Event" | "Garderobe";

export type GalleryItem = {
  id: string;
  caption: string;
  category: GalleryCategory;
  tone: "navy" | "olive" | "cream";
  span?: "tall" | "wide";
};

export const gallery: GalleryItem[] = [
  { id: "ph01", caption: "Bully zum Saisonstart", category: "Spieltag", tone: "navy", span: "tall" },
  { id: "ph02", caption: "Powerplay gegen die Wildcats", category: "Spieltag", tone: "olive" },
  { id: "ph03", caption: "Jubel nach dem 5:2", category: "Spieltag", tone: "cream" },
  { id: "ph04", caption: "Drittelpause in der Garderobe", category: "Garderobe", tone: "navy", span: "wide" },
  { id: "ph05", caption: "Sommer-Grillfest am See", category: "Team-Event", tone: "olive" },
  { id: "ph06", caption: "Torjubel im Heimspiel", category: "Spieltag", tone: "cream" },
  { id: "ph07", caption: "Mannschaftsfoto 2025/26", category: "Team-Event", tone: "navy" },
  { id: "ph08", caption: "Goalie-Wand Marco hält", category: "Spieltag", tone: "olive", span: "tall" },
  { id: "ph09", caption: "Pikes-Fans an der Bande", category: "Spieltag", tone: "cream" },
];

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("de-CH", {
    timeZone: "Europe/Zurich",
    ...(opts ?? { day: "2-digit", month: "long", year: "numeric" }),
  }).format(new Date(iso));
}

export function formatDayTime(iso: string): string {
  return new Intl.DateTimeFormat("de-CH", {
    timeZone: "Europe/Zurich",
    weekday: "short", day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}
