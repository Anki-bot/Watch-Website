import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brands } from "@/lib/brands";
import { getBrandWatches } from "@/lib/watches";
import { WatchThumb } from "@/components/watch-thumb";

export const metadata: Metadata = {
  title: "The Maisons",
  description:
    "Explore the watch houses of Meridian — Rolex, Omega, Cartier, Grand Seiko, Seiko, Tudor and more.",
};

export default function BrandsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-cream">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(205,176,131,0.65) 0%, rgba(205,176,131,0) 70%)",
          }}
        />
        <div className="shell relative pb-14 pt-8 lg:pb-20 lg:pt-10">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cream/45">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <span className="text-cream/80">Maisons</span>
          </nav>
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow text-gold">Fourteen houses, one standard</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              The Maisons
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/55">
              From the Swiss valleys to the Japanese mountains, these are the houses
              whose watches we choose to keep — each with a distinct philosophy and a
              history worth wearing.
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-12 lg:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {brands.map((brand) => {
            const brandWatches = getBrandWatches(brand.slug);
            const flagship = brandWatches[0];
            return (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group relative flex min-h-[250px] overflow-hidden border border-line/70 bg-cream transition-colors hover:border-gold/60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/95 to-cream/20" />
                <div className="relative z-10 flex max-w-[62%] flex-col p-6 sm:p-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-stone">
                    {brand.country} · Est. {brand.founded}
                  </p>
                  <h2 className="mt-2 font-display text-3xl leading-tight transition-colors group-hover:text-gold sm:text-4xl">
                    {brand.name}
                  </h2>
                  <p className="mt-2 font-display text-sm italic text-stone">
                    {brand.tagline}
                  </p>
                  <p className="mt-4 line-clamp-3 max-w-sm text-[12px] leading-relaxed text-stone">
                    {brand.description}
                  </p>
                  <div className="mt-auto flex items-center gap-4 pt-6">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em]">
                      {brandWatches.length} {brandWatches.length === 1 ? "piece" : "pieces"}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-stone transition-colors group-hover:text-ink">
                      Explore
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
                {flagship && (
                  <div className="absolute -bottom-12 -right-6 h-[115%] w-[58%] transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1">
                    <WatchThumb
                      watch={flagship}
                      sizes="(min-width: 1024px) 20vw, 45vw"
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-stone">
            Looking for a specific reference we don&apos;t list? Our concierge can source it.
          </p>
          <Link
            href="/info/contact"
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink underline underline-offset-4 transition-colors hover:text-gold"
          >
            Request a watch
          </Link>
        </div>
      </section>
    </>
  );
}
