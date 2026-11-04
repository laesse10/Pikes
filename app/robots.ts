import type { MetadataRoute } from "next";
import { teamPhoto } from "@/lib/data";

// The team photo is also on the home page, so block the file itself. Its name
// appears in the original and in every resized /_next/image URL.
const photoRules = teamPhoto ? [`/*${teamPhoto.src.split("/").pop()}`] : [];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search engines may read /team so they see its noindex tag. A robots.txt
      // block would hide that tag, and Google could still list the bare URL.
      { userAgent: ["Googlebot", "Bingbot"], allow: "/", disallow: ["/admin", ...photoRules] },
      // Every other bot (AI crawlers, scrapers) stays off the team page entirely.
      { userAgent: "*", allow: "/", disallow: ["/admin", "/team", ...photoRules] },
    ],
    sitemap: "https://www.zueriseepikes.ch/sitemap.xml",
  };
}
