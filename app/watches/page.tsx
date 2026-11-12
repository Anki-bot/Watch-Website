import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { watches } from "@/lib/watches";
import {
  brandCounts,
  filterWatches,
  parseFilters,
  parsePage,
  parseSort,
  sortWatches,
} from "@/lib/filters";
import { ProductCard } from "@/components/product-card";
import { FiltersPanel } from "@/components/filters-panel";
import { CatalogControls } from "@/components/catalog-controls";
import { Pagination } from "@/components/pagination";
import { brands } from "@/lib/brands";

const PAGE_SIZE = 24;

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Browse the full Meridian collection of fine watches. Filter by maison, price, movement, case size, dial colour and strap.",
};

type WatchesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WatchesPage({ searchParams }: WatchesPageProps) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const sort = parseSort(params.sort);
  const filtered = sortWatches(filterWatches(watches, filters), sort);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(parsePage(params.page), totalPages);
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const counts = brandCounts(watches, filters);

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
            <span className="text-cream/80">Watches</span>
          </nav>

          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <p className="eyebrow text-gold">Curated since 2014</p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                The Collection
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/55">
                From everyday automatics to rare complications — every watch in our
                collection is sourced with intention, inspected by our watchmakers,
                and delivered with a 24-month warranty.
              </p>
            </div>
            <dl className="hidden items-end gap-10 md:flex">
              <div>
                <dd className="font-display text-4xl">{watches.length}</dd>
                <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/40">
                  Pieces
                </dt>
              </div>
              <div>
                <dd className="font-display text-4xl">{brands.length}</dd>
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

      <section className="shell py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[230px_1fr] xl:grid-cols-[250px_1fr] xl:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-3 hide-scrollbar">
              <FiltersPanel filters={filters} sort={sort} counts={counts} />
            </div>
          </aside>

          <div>
            <CatalogControls
              filters={filters}
              sort={sort}
              counts={counts}
              total={filtered.length}
              totalAll={watches.length}
            />

            {items.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12">
                {items.map((watch) => (
                  <ProductCard key={watch.slug} watch={watch} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border border-line bg-cream/40 px-6 py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-ivory">
                  <SearchX className="h-7 w-7 text-stone" strokeWidth={1.2} />
                </div>
                <h2 className="mt-6 font-display text-3xl">No watches found</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-stone">
                  We couldn&apos;t find a piece matching this combination. Try
                  removing a filter or exploring the full collection.
                </p>
                <Link
                  href="/watches"
                  className="mt-7 inline-flex bg-ink px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite"
                >
                  View all watches
                </Link>
              </div>
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              filters={filters}
              sort={sort}
            />
          </div>
        </div>
      </section>
    </>
  );
}
