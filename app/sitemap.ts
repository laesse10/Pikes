import type { MetadataRoute } from "next";
import { fixtures, gameHref } from "@/lib/data";

const base = "https://www.zueriseepikes.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/team", "/spielplan", "/sponsoren", "/galerie", "/mitmachen", "/impressum", "/datenschutz",
    ...fixtures.map((f) => gameHref(f.id)),
  ];
  const now = new Date();

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
