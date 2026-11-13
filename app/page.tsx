import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { WatchVisual } from "@/components/watch-visual";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  getFeaturedWatches,
  getNewArrivals,
  getWatch,
  watches,
} from "@/lib/watches";
import { brands, getBrand } from "@/lib/brands";
import { formatPrice } from "@/lib/format";
import { emptyFilters, filterWatches } from "@/lib/filters";

const categories = [
  {
    title: "The Divers",
    copy: "Built for depth, worn on land.",
    href: "/watches?q=dive",
    filter: { ...emptyFilters, q: "dive" },
    slug: "rolex-submariner-date-41",
  },
  {
    title: "The Chronographs",
    copy: "Time, measured in moments.",
    href: "/watches?q=chronograph",
    filter: { ...emptyFilters, q: "chronograph" },
    slug: "omega-speedmaster-moonwatch",
  },
  {
    title: "The Dress Watch",
    copy: "Quiet elegance, after hours.",
    href: "/watches?strap=Leather",
    filter: { ...emptyFilters, straps: ["Leather"] },
    slug: "cartier-santos-large",
  },
  {
    title: "The Collector",
    copy: "Rare pieces for the initiated.",
    href: "/watches?price=7000-plus",
    filter: { ...emptyFilters, price: "7000-plus" },
    slug: "grand-seiko-snowflake",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Authenticated",
    copy: "Every watch is examined and verified by our in-house watchmakers before it reaches you.",
  },
  {
    icon: Truck,
    title: "Insured delivery",
    copy: "Fully insured, tracked and signature-required shipping. Complimentary over $1,000.",
  },
  {
    icon: RotateCcw,
    title: "14-day returns",
    copy: "Take your time. If it isn't right, return it unworn within 14 days for a full refund.",
  },
  {
    icon: BadgeCheck,
    title: "24-month warranty",
    copy: "Every timepiece is covered by our own mechanical warranty and lifetime service support.",
  },
];

export default function HomePage() {
  const featured = getFeaturedWatches();
  const newArrivals = getNewArrivals().slice(0, 4);
  const heroWatch = getWatch("rolex-submariner-date-41") ?? featured[0];
  const editorialWatch = getWatch("grand-seiko-snowflake") ?? featured[3];
  const heroBrand = getBrand(heroWatch.brand);
  const homeBrands = [
    "rolex",
    "omega",
    "cartier",
    "grand-seiko",
    "seiko",
    "tudor",
    "tag-heuer",
    "longines",
    "tissot",
    "armani-exchange",
    "tommy-hilfiger",
    "fossil",
  ]
    .map((slug) => brands.find((brand) => brand.slug === slug))
    .filter((brand): brand is NonNullable<typeof brand> => Boolean(brand));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(100% 80% at 78% 20%, rgba(255,253,247,0.9) 0%, rgba(244,239,228,0) 60%)",
          }}
        />
        <div className="shell relative grid items-center gap-12 py-12 lg:min-h-[calc(100svh-113px)] lg:grid-cols-[1.04fr_1fr] lg:gap-8 lg:py-16">
          <div className="fade-up max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="eyebrow text-stone">The Winter Edit · 2026</p>
            </div>
            <h1 className="mt-6 font-display text-[clamp(3.4rem,9vw,7rem)] leading-[0.86] tracking-[-0.01em] text-ink">
              Time,
              <br />
              <span className="italic text-gold">beautifully</span>
              <br />
              kept.
            </h1>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-ink/65">
              A considered collection of fine watches from the world&apos;s most
              respected houses. Authenticated by our watchmakers, delivered with
              care, made to be worn for a lifetime.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/watches"
                className="group inline-flex items-center gap-2.5 bg-ink px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite"
              >
                Shop the collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
              <Link
                href="/watches?sort=newest"
                className="group inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-gold hover:text-gold"
              >
                Discover new arrivals
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
            </div>

            <dl className="mt-12 flex items-center gap-8 border-t border-ink/10 pt-6 sm:gap-12">
              <div>
                <dd className="font-display text-2xl">{watches.length}</dd>
                <dt className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-stone">
                  Curated pieces
                </dt>
              </div>
              <div>
                <dd className="font-display text-2xl">{brands.length}</dd>
                <dt className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-stone">
                  Maisons
                </dt>
              </div>
              <div>
                <dd className="font-display text-2xl">2014</dd>
                <dt className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-stone">
                  Established
                </dt>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:mr-0">
            <div className="relative overflow-hidden border border-ink/10 watch-stage">
              <div className="relative aspect-[4/5]">
                <div className="absolute inset-0 px-5 py-8 sm:px-8">
                  <WatchVisual watch={heroWatch} />
                </div>
                <span className="absolute right-5 top-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone">
                  01 / {watches.length}
                </span>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <div className="border border-ink/10 bg-ivory/95 px-4 py-3 backdrop-blur">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-stone">
                      {heroBrand?.name}
                    </p>
                    <p className="mt-1 font-display text-lg leading-tight">{heroWatch.name}</p>
                    <p className="mt-1 text-[11px] text-ink/70">{formatPrice(heroWatch.price)}</p>
                  </div>
                  <Link
                    href={`/watches/${heroWatch.slug}`}
                    className="flex h-11 w-11 items-center justify-center border border-ink/15 bg-ivory/95 text-ink transition-colors hover:bg-ink hover:text-ivory"
                    aria-label={`View ${heroWatch.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute -left-8 top-16 hidden h-24 w-24 flex-col items-center justify-center rounded-full border border-gold/40 bg-cream/95 text-center backdrop-blur lg:flex">
              <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.5} />
              <span className="mt-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-ink">
                In-house
              </span>
              <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-ink">
                Authenticated
              </span>
            </div>

            <p className="absolute -right-7 top-[38%] hidden rotate-90 text-[8px] uppercase tracking-[0.4em] text-stone/60 lg:block">
              Est. MMXIV · New York
            </p>
          </div>
        </div>

        {/* Brand marquee */}
        <div className="relative border-y border-line bg-ivory/70">
          <div className="overflow-hidden py-5">
            <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
              {[...homeBrands, ...homeBrands, ...homeBrands, ...homeBrands].map((brand, index) => (
                <span key={`${brand.slug}-${index}`} className="flex items-center gap-10">
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="font-display text-xl text-stone/75 transition-colors hover:text-ink"
                  >
                    {brand.name}
                  </Link>
                  <span className="h-1 w-1 rounded-full bg-gold/60" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="shell py-16 lg:py-24">
        <SectionHeading
          eyebrow="Find your form"
          title="Shop by character"
          description="Every wrist has its own rhythm. Begin with the kind of watch you're drawn to."
          href="/watches"
          linkLabel="All watches"
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((category) => {
            const watch = getWatch(category.slug);
            const count = filterWatches(watches, category.filter).length;
            if (!watch) return null;
            return (
              <Link
                key={category.title}
                href={category.href}
                className="group relative block overflow-hidden border border-line/70 bg-cream"
              >
                <div className="relative aspect-[3/4]">
                  <div className="absolute inset-0 watch-stage" />
                  <div className="relative z-10 p-4 sm:p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone/70">
                      {String(categories.indexOf(category) + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-tight sm:text-2xl">
                      {category.title}
                    </h3>
                    <p className="mt-1 hidden text-[10px] uppercase tracking-[0.12em] text-stone sm:block">
                      {count} pieces
                    </p>
                  </div>
                  <div className="absolute inset-x-0 bottom-[-16%] h-[88%] transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:-translate-y-2">
                    <WatchVisual watch={watch} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-cream via-cream/85 to-transparent px-4 pb-4 pt-10 text-[9px] font-semibold uppercase tracking-[0.16em] sm:px-5">
                    <span>{category.copy}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-line bg-ivory py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="The considered few"
            title="Pieces we keep coming back to"
            description="A small edit of watches our team returns to again and again — chosen for design, provenance and the way they wear."
            href="/watches?sort=rating"
            linkLabel="Top rated"
          />
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">
            {featured.slice(0, 4).map((watch) => (
              <ProductCard key={watch.slug} watch={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section id="story" className="bg-ink py-16 text-cream lg:py-24">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-20">
          <div className="relative overflow-hidden border border-cream/10 watch-stage-dark">
            <div className="relative aspect-[4/5]">
              <div className="absolute inset-0 px-8 py-10">
                <WatchVisual watch={editorialWatch} />
              </div>
              <span className="absolute left-6 top-6 text-[9px] uppercase tracking-[0.24em] text-cream/50">
                The art of time
              </span>
              <span className="absolute bottom-6 right-6 text-[9px] uppercase tracking-[0.2em] text-cream/50">
                {getBrand(editorialWatch.brand)?.name}
              </span>
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold">The Meridian standard</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
              A different kind of
              <br />
              watch house.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream/60">
              We don&apos;t stock everything. We choose deliberately — pieces with
              integrity, provenance and a point of view. Each one is inspected,
              authenticated and prepared by our watchmakers before it is offered.
            </p>

            <div className="mt-9 space-y-6">
              {[
                {
                  number: "01",
                  title: "Curated, not catalogued",
                  copy: "A tight collection across fourteen houses, chosen for design and long-term wearability.",
                },
                {
                  number: "02",
                  title: "Examined by hand",
                  copy: "Movement, case, dial and bracelet are independently checked by our in-house watchmakers.",
                },
                {
                  number: "03",
                  title: "Kept, not just sold",
                  copy: "Lifetime servicing support and a 24-month warranty on every watch that leaves our atelier.",
                },
              ].map((item) => (
                <div key={item.number} className="flex gap-5 border-t border-cream/10 pt-5">
                  <span className="font-display text-sm text-gold">{item.number}</span>
                  <div>
                    <p className="text-sm font-medium text-cream">{item.title}</p>
                    <p className="mt-1 max-w-md text-[13px] leading-relaxed text-cream/45">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/info/about"
              className="group mt-9 inline-flex items-center gap-2.5 border border-cream/25 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Our story
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="shell py-16 lg:py-24">
        <SectionHeading
          eyebrow="Just arrived"
          title="New to the collection"
          description="Fresh additions from the atelier — from reissued icons to modern classics."
          href="/watches?sort=newest"
          linkLabel="All new arrivals"
        />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">
          {newArrivals.map((watch) => (
            <ProductCard key={watch.slug} watch={watch} />
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-line bg-cream/60 py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="The houses we keep"
            title="Maisons of distinction"
            description="From Geneva to Shizukuishi, we work with houses that have shaped how the world keeps time."
            href="/brands"
            linkLabel={`All ${brands.length} maisons`}
          />
          <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {homeBrands.map((brand, index) => {
              const count = watches.filter((watch) => watch.brand === brand.slug).length;
              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="group flex items-center justify-between gap-6 border-b border-ink/12 py-4 transition-colors hover:border-gold"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[9px] tabular-nums text-stone/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl transition-colors group-hover:text-gold sm:text-[1.7rem]">
                      {brand.name}
                    </span>
                    <span className="hidden text-[9px] uppercase tracking-[0.16em] text-stone sm:block">
                      {brand.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-stone">{count} pieces</span>
                    <ArrowUpRight
                      className="h-4 w-4 text-stone transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="shell py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {values.map((value) => (
            <div key={value.title} className="border-t border-ink/12 pt-5">
              <value.icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
              <h3 className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em]">
                {value.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-stone">{value.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-ink py-16 text-cream lg:py-20">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 75% 40%, rgba(205,176,131,0.35) 0%, rgba(205,176,131,0) 65%)",
          }}
        />
        <div className="shell relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="eyebrow text-gold">By appointment</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Not sure where to begin?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/55">
              Our concierge will help you find the right piece — whether it&apos;s a
              first automatic or a rare grail. One conversation, no pressure.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/info/contact"
              className="inline-flex items-center gap-2 bg-cream px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold"
            >
              Speak with a concierge
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <a
              href="tel:+12125550148"
              className="text-[11px] uppercase tracking-[0.14em] text-cream/60 transition-colors hover:text-gold"
            >
              +1 (212) 555-0148
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
