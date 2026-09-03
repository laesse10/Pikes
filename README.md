# Zürisee Pikes — Vereinswebsite

Offizielle Website des **Zürisee Pikes**, eines Plausch-Eishockeyclubs vom Zürichsee, der in der
[ZEP – Zürcher Eishockey Plauschliga](https://www.zep.ch/) spielt.

Gebaut mit **Next.js 16** (App Router), **React 19**, **TypeScript** und **Tailwind CSS v4**,
zum Deployment auf **Vercel**.

## Design

Das Farb- und Stilkonzept leitet sich direkt vom Vereinslogo ab (`public/logo.jpg`):

| Token | Farbe | Verwendung |
| --- | --- | --- |
| `navy` | `#1b3b58` | Primärfarbe, Header/Footer, Flächen |
| `cream` | `#f3e9d3` | Hintergrund |
| `olive` | `#6e7548` | Akzent (Hecht-Grün) |

Typografie: **Oswald** (Display, condensed), **Inter** (Fliesstext), **Barlow Condensed** (Zahlen).

## Seiten

- `/` – Home: Hero (Teamfoto), Countdown zum nächsten Spiel, Resultat-Banner, Sponsoren-Strip, Intro
- `/team` – Kader nach Position, Trainerstaff, Vereinsgeschichte
- `/spielplan` – Spielplan & Resultate, gegliedert nach Stärkeklasse / Playoff / Vorbereitung, Schlusstabelle
- `/sponsoren` – Hauptsponsoren / Co-Sponsoren / Supporter
- `/galerie` – Bildergalerie (Platzhalter)
- `/news` + `/news/[slug]` – Spielberichte & Vereins-News
- `/mitmachen` – Kontaktformular & Infos für neue Spieler:innen
- `/impressum`, `/datenschutz` – Rechtliches (CH)

> **Hinweis:** Sämtliche Spieler, Resultate, Sponsoren und Bilder sind **Demo-Platzhalter**.
> Inhalte werden zentral in [`lib/data.ts`](lib/data.ts) gepflegt.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktions-Build
npm run lint       # ESLint
```

## Deployment

Zero-Config-Deployment auf Vercel:

```bash
npx vercel          # Preview
npx vercel --prod   # Produktion
```
