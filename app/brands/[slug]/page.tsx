import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { brands, getBrand } from "@/lib/brands";
import { getBrandWatches } from "@/lib/watches";
import { ProductCard } from "@/components/product-card";
import { TissotGallery } from "@/components/tissot-gallery";
import { WatchThumb } from "@/components/watch-thumb";
import { tissotGallery } from "@/lib/tissot-gallery";

type BrandPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Maison not found" };

  return {
    title: brand.name,
    description: brand.description,
    openGraph: {
      title: `${brand.name} · Meridian`,
      description: brand.description,
      type: "website",
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const brandWatches = getBrandWatches(brand.slug);
  const flagship = brandWatches[0];
  const others = brands.filter((item) => item.slug !== brand.slug).slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-cream">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${brand.accent} 0%, rgba(0,0,0,0) 68%)`,
          }}
        />
        <div className="shell relative pb-14 pt-8 lg:pb-20 lg:pt-10">
          <nav
            className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cream/45"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <Link href="/brands" className="transition-colors hover:text-gold">
              Maisons
            </Link>
            <span>/</span>
            <span className="text-cream/80">{brand.name}</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow text-gold">
                {brand.country} · Founded {brand.founded}
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-[5.2rem]">
                {brand.name}
              </h1>
              <p className="mt-4 font-display text-xl italic text-cream/70 sm:text-2xl">
                {brand.tagline}
              </p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/55">
                {brand.description}
              </p>

              <dl className="mt-10 flex flex-wrap items-center gap-10 border-t border-cream/10 pt-6">
                <div>
                  <dd className="font-display text-2xl">{brandWatches.length}</dd>
                  <dt className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-cream/40">
                    Pieces in collection
                  </dt>
                </div>
                <div>
                  <dd className="font-display text-2xl">{brand.founded}</dd>
                  <dt className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-cream/40">
                    Year founded
                  </dt>
                </div>
                <div>
                  <dd className="font-display text-2xl">24</dd>
                  <dt className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-cream/40">
                    Month warranty
                  </dt>
                </div>
              </dl>
            </div>

            {flagship && (
              <div className="relative mx-auto w-full max-w-sm">
                <div className="border border-cream/10 watch-stage-dark">
                  <div className="relative aspect-[4/5] px-6 py-8">
                    <WatchThumb
                      watch={flagship}
                      sizes="(min-width: 1024px) 24rem, 80vw"
                      priority
                    />
                    <span className="absolute left-5 top-5 border border-cream/15 bg-ink/70 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-cream/80 backdrop-blur">
                      House signature
                    </span>
                  </div>
                </div>
                <div className="absolute inset-x-4 -bottom-5 flex items-center justify-between border border-ink/10 bg-cream px-4 py-3 text-ink shadow-xl">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-stone">
                      {brand.name}
                    </p>
                    <p className="mt-0.5 font-display text-base leading-tight">{flagship.name}</p>
                  </div>
                  <Link
                    href={`/watches/${flagship.slug}`}
                    aria-label={`View ${flagship.name}`}
                    className="flex h-9 w-9 items-center justify-center border border-ink/15 transition-colors hover:bg-ink hover:text-ivory"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="shell py-14 lg:py-20">
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-gold">The collection</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              {brand.name} at Meridian
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {brand.slug === "tissot" && (
              <Link
                href="#tissot-photos"
                className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone transition-colors hover:text-gold"
              >
                All {tissotGallery.length} photos
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            )}
            <Link
              href={`/watches?brand=${brand.slug}`}
              className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-gold"
            >
              Shop with filters
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12">
          {brandWatches.map((watch) => (
            <ProductCard key={watch.slug} watch={watch} />
          ))}
        </div>
      </section>

      {brand.slug === "tissot" && (
        <section
          id="tissot-photos"
          className="scroll-mt-20 border-t border-line bg-cream/40"
        >
          <div className="shell py-14 lg:py-20">
            <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow text-gold">The full collection</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl">
                  Every Tissot in store
                </h2>
              </div>
              <p className="max-w-sm text-[11px] leading-relaxed text-stone">
                {tissotGallery.length} photographs from the boutique. Some pieces are
                one-off or not yet listed online — tap any photo to view it full size,
                or ask the concierge about availability.
              </p>
            </div>

            <div className="mt-8">
              <TissotGallery items={tissotGallery} />
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-cream/60">
        <div className="shell py-12 lg:py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-stone">Continue exploring</p>
              <h2 className="mt-2 font-display text-3xl">Other maisons</h2>
            </div>
            <Link
              href="/brands"
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone transition-colors hover:text-ink"
            >
              View all
            </Link>
          </div>
          <div className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/brands/${item.slug}`}
                className="group flex items-center justify-between border-b border-ink/10 py-4 transition-colors hover:border-gold"
              >
                <span className="font-display text-xl transition-colors group-hover:text-gold">
                  {item.name}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-stone transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                  strokeWidth={1.5}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
