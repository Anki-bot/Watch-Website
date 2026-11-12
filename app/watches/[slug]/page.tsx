import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { getRelatedWatches, getWatch, watches } from "@/lib/watches";
import { getBrand } from "@/lib/brands";
import { ProductGallery } from "@/components/product-gallery";
import { ProductBuy } from "@/components/product-buy";
import { ProductCard } from "@/components/product-card";
import { Rating } from "@/components/rating";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return watches.map((watch) => ({ slug: watch.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const watch = getWatch(slug);
  if (!watch) return { title: "Watch not found" };
  const brand = getBrand(watch.brand);

  return {
    title: `${brand?.name ?? watch.brand} ${watch.name}`,
    description: watch.description,
    openGraph: {
      title: `${brand?.name ?? watch.brand} ${watch.name} · Meridian`,
      description: watch.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const watch = getWatch(slug);
  if (!watch) notFound();

  const brand = getBrand(watch.brand);
  const related = getRelatedWatches(watch, 4);
  const specs: [string, string][] = [
    ["Collection", watch.collection],
    ["Movement", watch.movement],
    ["Case size", `${watch.caseSize} mm`],
    ["Case material", watch.caseMaterial],
    ["Dial", watch.dialName],
    ["Strap", watch.strapName],
    ["Glass", watch.glass],
    ["Water resistance", watch.waterResistance],
    ["Condition", watch.condition],
    ["Year", String(watch.year)],
    ["Warranty", "24 months"],
  ];
  if (watch.reference) specs.unshift(["Reference", watch.reference]);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand?.name ?? watch.brand} ${watch.name}`,
    brand: { "@type": "Brand", name: brand?.name ?? watch.brand },
    description: watch.description,
    sku: watch.reference ?? watch.slug,
  };

  if (!watch.priceOnRequest && watch.price > 0) {
    jsonLd.offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      price: watch.price,
      availability:
        watch.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    };
  }

  if (watch.reviewCount > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: watch.rating,
      reviewCount: watch.reviewCount,
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-line bg-cream/50">
        <nav
          className="shell flex flex-wrap items-center gap-2 py-4 text-[10px] uppercase tracking-[0.15em] text-stone"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/watches" className="transition-colors hover:text-ink">
            Watches
          </Link>
          <span>/</span>
          <Link href={`/brands/${watch.brand}`} className="transition-colors hover:text-ink">
            {brand?.name ?? watch.brand}
          </Link>
          <span>/</span>
          <span className="text-ink">{watch.name}</span>
        </nav>
      </div>

      <section className="shell py-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_1fr] xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery watch={watch} brandName={brand?.name ?? watch.brand} />
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  href={`/brands/${watch.brand}`}
                  className="group inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone transition-colors hover:text-gold"
                >
                  {brand?.name ?? watch.brand}
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </Link>
                <h1 className="mt-3 font-display text-4xl leading-[1.02] sm:text-5xl">
                  {watch.name}
                </h1>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-stone">
                  {watch.collection}
                  {watch.reference ? ` · Ref. ${watch.reference}` : ""} · {watch.year}
                </p>
              </div>
              {watch.badges?.[0] && (
                <span className="shrink-0 border border-line bg-cream px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em]">
                  {watch.badges[0]}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {watch.reviewCount > 0 && (
                <>
                  <Rating rating={watch.rating} count={watch.reviewCount} />
                  <span className="h-3 w-px bg-line" />
                </>
              )}
              <span className="text-[11px] text-stone">
                {watch.condition} condition · Inspected by our watchmakers
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink/75">{watch.description}</p>

            <div className="mt-6">
              <ProductBuy watch={watch} />
            </div>

            <div className="mt-6">
              <details className="group border-b border-line py-4" open>
                <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Highlights
                  <ChevronDown className="h-4 w-4 text-stone transition-transform group-open:rotate-180" strokeWidth={1.5} />
                </summary>
                <ul className="mt-4 space-y-2.5">
                  {watch.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-ink/75">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </details>

              <details className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Specifications
                  <ChevronDown className="h-4 w-4 text-stone transition-transform group-open:rotate-180" strokeWidth={1.5} />
                </summary>
                <dl className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {specs.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-3 border-b border-line/70 py-2 text-[12px]"
                    >
                      <dt className="text-stone">{label}</dt>
                      <dd className="text-right font-medium text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </details>

              <details className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Shipping & returns
                  <ChevronDown className="h-4 w-4 text-stone transition-transform group-open:rotate-180" strokeWidth={1.5} />
                </summary>
                <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-ink/75">
                  <p>
                    Orders are dispatched within 24 hours on business days with fully
                    insured, tracked delivery. Shipping is complimentary on orders over
                    $1,000.
                  </p>
                  <p>
                    Not quite right? Return your watch within 14 days in unworn
                    condition for a full refund. Return shipping is on us.
                  </p>
                  <Link
                    href="/info/shipping"
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink underline underline-offset-4 hover:text-gold"
                  >
                    Read the full policy
                    <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </Link>
                </div>
              </details>

              <details className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Authenticity & warranty
                  <ChevronDown className="h-4 w-4 text-stone transition-transform group-open:rotate-180" strokeWidth={1.5} />
                </summary>
                <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-ink/75">
                  <p className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    Every watch is authenticated in-house and comes with a Meridian
                    certificate. Your purchase is covered by our 24-month mechanical
                    warranty.
                  </p>
                  <Link
                    href="/info/authentication"
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink underline underline-offset-4 hover:text-gold"
                  >
                    How we authenticate
                    <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </Link>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {brand && (
        <section className="border-y border-line bg-cream/60">
          <div className="shell grid gap-8 py-12 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-14 lg:py-14">
            <p className="font-display text-4xl text-ink lg:text-5xl">{brand.name}</p>
            <div className="max-w-2xl">
              <p className="eyebrow text-stone">The maison</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{brand.description}</p>
            </div>
            <Link
              href={`/brands/${brand.slug}`}
              className="inline-flex items-center gap-2 self-start border border-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-ivory lg:self-auto"
            >
              Explore {brand.name}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="shell py-14 lg:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gold">Continue exploring</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">You may also like</h2>
            </div>
            <Link
              href="/watches"
              className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold sm:flex"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">
            {related.map((item) => (
              <ProductCard key={item.slug} watch={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
