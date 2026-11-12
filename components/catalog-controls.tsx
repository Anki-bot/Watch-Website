"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getBrand } from "@/lib/brands";
import {
  filtersToQuery,
  priceBands,
  sizeBands,
  type Filters,
  type SortKey,
} from "@/lib/filters";
import { cn } from "@/lib/format";
import { FiltersPanel, SortSelect } from "./filters-panel";

type CatalogControlsProps = {
  filters: Filters;
  sort: SortKey;
  counts: Record<string, number>;
  total: number;
  totalAll: number;
};

export function CatalogControls({
  filters,
  sort,
  counts,
  total,
  totalAll,
}: CatalogControlsProps) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState(filters.q);

  useEffect(() => {
    // Keep the search field in sync when filters are cleared via a URL change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(filters.q);
  }, [filters.q]);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const activeFilters = [
    ...filters.brands.map((slug) => ({
      label: getBrand(slug)?.name ?? slug,
      remove: {
        ...filters,
        brands: filters.brands.filter((item) => item !== slug),
      },
    })),
    ...(filters.price
      ? [
          {
            label: priceBands.find((band) => band.key === filters.price)?.label ?? "",
            remove: { ...filters, price: "" },
          },
        ]
      : []),
    ...filters.sizes.map((key) => ({
      label: sizeBands.find((band) => band.key === key)?.label ?? key,
      remove: {
        ...filters,
        sizes: filters.sizes.filter((item) => item !== key),
      },
    })),
    ...filters.movements.map((value) => ({
      label: value,
      remove: {
        ...filters,
        movements: filters.movements.filter((item) => item !== value),
      },
    })),
    ...filters.genders.map((value) => ({
      label: value,
      remove: {
        ...filters,
        genders: filters.genders.filter((item) => item !== value),
      },
    })),
    ...filters.dials.map((value) => ({
      label: value === "Mother-of-Pearl" ? "Pearl dial" : `${value} dial`,
      remove: {
        ...filters,
        dials: filters.dials.filter((item) => item !== value),
      },
    })),
    ...filters.straps.map((value) => ({
      label: `${value} strap`,
      remove: {
        ...filters,
        straps: filters.straps.filter((item) => item !== value),
      },
    })),
    ...(filters.q
      ? [{ label: `“${filters.q}”`, remove: { ...filters, q: "" } }]
      : []),
  ];

  const activeCount =
    filters.brands.length +
    filters.genders.length +
    filters.movements.length +
    filters.sizes.length +
    filters.dials.length +
    filters.straps.length +
    (filters.price ? 1 : 0) +
    (filters.q ? 1 : 0);

  const navigate = (next: Filters) => {
    router.push(`/watches${filtersToQuery(next, { sort, page: 1 })}`, {
      scroll: false,
    });
  };

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate({ ...filters, q: query.trim() });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
            <span className="font-semibold text-ink">{total}</span>{" "}
            {total === 1 ? "piece" : "pieces"}
            {total !== totalAll && (
              <span className="text-stone/60"> of {totalAll}</span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 border border-line bg-ivory px-3 py-2.5 text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink/40 lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
              Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
            <SortSelect filters={filters} sort={sort} />
          </div>
        </div>

        <form onSubmit={submitSearch} className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
            strokeWidth={1.5}
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search within the collection…"
            aria-label="Search within the collection"
            className="w-full border border-line bg-ivory py-2.5 pl-10 pr-24 text-sm text-ink outline-none transition-colors placeholder:text-stone/60 focus:border-gold"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full bg-ink px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-graphite"
          >
            Search
          </button>
        </form>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-line py-4">
          {activeFilters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => navigate(filter.remove)}
              className="flex items-center gap-1.5 border border-line bg-cream/70 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink/40"
            >
              {filter.label}
              <X className="h-3 w-3 text-stone" strokeWidth={1.5} />
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              navigate({
                ...filters,
                q: "",
                brands: [],
                genders: [],
                movements: [],
                sizes: [],
                dials: [],
                straps: [],
                price: "",
              })
            }
            className="ml-1 text-[10px] uppercase tracking-[0.12em] text-stone underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            Clear all
          </button>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            className="absolute inset-0 bg-ink/45 fade-in"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute inset-y-0 left-0 flex w-[90%] max-w-sm flex-col bg-ivory shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="eyebrow text-stone">Refine</p>
                <h2 className="mt-1 font-display text-2xl">Filters</h2>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-ink"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className={cn("flex-1 overflow-y-auto px-5 pb-6")}>
              <FiltersPanel filters={filters} sort={sort} counts={counts} hideHeader />
            </div>
            <div className="border-t border-line bg-cream/60 p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-ink py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory"
              >
                Show {total} {total === 1 ? "piece" : "pieces"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
