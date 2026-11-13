import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { watches } from "@/lib/watches";
import { getBrand } from "@/lib/brands";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Women's Watches",
  description:
    "The Meridian women's collection — petite rectangles, cushion cases, crystal-set bezels and open-heart automatics, from Cartier and Rolex to Fossil.",
  openGraph: {
    title: "Women's Watches · Meridian",
    description:
      "Petite rectangles, cushion cases, crystal-set bezels and open-heart automatics — the women's collection at Meridian.",
  },
};

export default function WomenPage() {
  const women = watches
    .filter((watch) => watch.gender === "Women")
    .sort((a, b) => {
      const brandA = getBrand(a.brand)?.name ?? a.brand;
      const brandB = getBrand(b.brand)?.name ?? b.brand;
      return brandA.localeCompare(brandB) || a.name.localeCompare(b.name);
    });

  const maisonSlugs = [...new Set(women.map((watch) => watch.brand))];
  const maisons = maisonSlugs
    .map((slug) => getBrand(slug))
    .filter((brand): brand is NonNullable<typeof brand> => Boolean(brand))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-cream">
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(205,176,131,0.6) 0%, rgba(205,176,131,0) 70%)",
          }}
        />
        <div className="shell relative pb-12 pt-8 lg:pb-16 lg:pt-10">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cream/45">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <span className="text-cream/80">Women</span>
          </nav>

          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <p className="eyebrow text-gold">For her</p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                Women&rsquo;s Watches
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/55">
                Petite rectangles, cushion cases, crystal-set bezels and open-heart
                automatics. A collection chosen for smaller wrists and quieter
                details — from the great houses to everyday favourites.
              </p>
            </div>
            <dl className="hidden items-end gap-10 md:flex">
              <div>
                <dd className="font-display text-4xl">{women.length}</dd>
                <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/40">
                  Pieces
                </dt>
              </div>
              <div>
                <dd className="font-display text-4xl">{maisons.length}</dd>
                <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/40">
                  Maisons
                </dt>
              </div>
              <div>
                <dd className="font-display text-4xl">24</dd>
                <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/40">
                  Month warranty
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream/50">
        <div className="shell flex flex-wrap items-center gap-x-3 gap-y-2 py-5">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-stone">
            Maisons
          </span>
          {maisons.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="border border-line px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ink/70 transition-colors hover:border-gold hover:text-gold"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="shell py-12 lg:py-16">
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-gold">The collection</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              Every piece for her
            </h2>
          </div>
          <Link
            href="/watches?gender=Women"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone transition-colors hover:text-gold"
          >
            Refine with filters
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6">
          {women.map((watch) => (
            <ProductCard key={watch.slug} watch={watch} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-line pt-10 text-center">
          <p className="max-w-md text-[12px] leading-relaxed text-stone">
            Looking for a specific size, dial colour or strap? The full catalogue
            can be filtered by maison, case size, movement and more.
          </p>
          <Link
            href="/watches?gender=Women"
            className="mt-1 inline-flex h-11 items-center gap-2 bg-ink px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-graphite"
          >
            Browse the women&rsquo;s catalogue
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </>
  );
}
