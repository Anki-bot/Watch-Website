import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/wishlist"],
    },
    sitemap: "https://meridian.watch/sitemap.xml",
  };
}
