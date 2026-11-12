import type { MetadataRoute } from "next";
import { watches } from "@/lib/watches";
import { brands } from "@/lib/brands";
import { infoSlugs } from "@/lib/info";

const base = "https://meridian.watch";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/watches`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/brands`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...brands.map((brand) => ({
      url: `${base}/brands/${brand.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...watches.map((watch) => ({
      url: `${base}/watches/${watch.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...infoSlugs.map((slug) => ({
      url: `${base}/info/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
