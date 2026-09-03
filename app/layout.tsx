import type { Metadata } from "next";
import { Oswald, Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { club } from "@/lib/data";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zueriseepikes.ch"),
  alternates: { canonical: "/" },
  title: {
    default: `${club.name} — ${club.tagline}`,
    template: `%s · ${club.name}`,
  },
  description:
    "Zürisee Pikes – Plausch-Eishockeyclub vom Zürichsee in der ZEP (Zürcher Eishockey Plauschliga). Team, Spielplan, Resultate, Sponsoren und Galerie.",
  keywords: ["Eishockey", "Zürichsee", "ZEP", "Plauschliga", "Zürisee Pikes", "Küsnacht"],
  openGraph: {
    title: `${club.name} — ${club.tagline}`,
    description: "Plausch-Eishockey vom Zürichsee. Team, Spielplan & Resultate.",
    url: "https://www.zueriseepikes.ch",
    siteName: club.name,
    locale: "de_CH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de-CH"
      className={`${oswald.variable} ${inter.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">{children}</body>
    </html>
  );
}
