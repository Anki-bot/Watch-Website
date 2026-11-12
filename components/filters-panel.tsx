"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ChevronDown, X } from "lucide-react";
import { brands } from "@/lib/brands";
import {
  dialOptions,
  filtersToQuery,
  genderOptions,
  movementOptions,
  priceBands,
  sizeBands,
  sortOptions,
  strapOptions,
  type Filters,
  type SortKey,
} from "@/lib/filters";
import { cn } from "@/lib/format";

type FiltersPanelProps = {
  filters: Filters;
  sort: SortKey;
  counts: Record<string, number>;
  onNavigate?: () => void;
  hideHeader?: boolean;
};

function CheckRow({
  label,
  count,
  checked,
  onChange,
  swatch,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
  swatch?: string;
}) {
  const disabled = count === 0 && !checked;
  return (
    <label
      className={cn(
        "group flex cursor-pointer items-center gap-2.5 py-[7px] text-[13px] transition-colors",
        disabled ? "cursor-not-allowed text-stone/45" : "text-ink/80 hover:text-ink",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />
      {swatch ? (
        <span
          className={cn(
            "relative h-4 w-4 shrink-0 rounded-full border border-ink/15 transition-shadow",
            checked && "ring-1 ring-ink ring-offset-2 ring-offset-ivory",
          )}
          style={{ backgroundColor: swatch }}
        />
      ) : (
        <span
          className={cn(
            "flex h-[15px] w-[15px] shrink-0 items-center justify-center border transition-colors",
            checked ? "border-ink bg-ink" : "border-ink/25 bg-transparent group-hover:border-ink/50",
          )}
        >
          {checked && (
            <svg viewBox="0 0 10 10" className="h-2 w-2 text-ivory" fill="none">
              <path d="M1 5 L4 8 L9 1.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
        </span>
      )}
      <span className="flex-1 leading-snug">{label}</span>
      {count !== undefined && (
        <span className="text-[11px] tabular-nums text-stone/70">{count}</span>
      )}
    </label>
  );
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b border-line py-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
        {title}
        <ChevronDown
          className="h-3.5 w-3.5 text-stone transition-transform duration-200 group-open:rotate-180"
          strokeWidth={1.5}
        />
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  );
}

export function FiltersPanel({
  filters,
  sort,
  counts,
  onNavigate,
  hideHeader = false,
}: FiltersPanelProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const navigate = (next: Filters) => {
    startTransition(() => {
      router.push(`/watches${filtersToQuery(next, { sort, page: 1 })}`, {
        scroll: false,
      });
      onNavigate?.();
    });
  };

  const toggle = (
    key: "brands" | "genders" | "movements" | "sizes" | "dials" | "straps",
    value: string,
  ) => {
    const current = filters[key];
    navigate({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    });
  };

  const activeCount =
    filters.brands.length +
    filters.genders.length +
    filters.movements.length +
    filters.sizes.length +
    filters.dials.length +
    filters.straps.length +
    (filters.price ? 1 : 0);

  return (
    <div className={cn("transition-opacity", pending && "opacity-50")}>
      <div
        className={cn(
          "flex items-center justify-between border-b border-ink/15 pb-4",
          hideHeader && "hidden",
        )}
      >
        <p className="eyebrow">Refine</p>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={() =>
              navigate({
                ...filters,
                brands: [],
                genders: [],
                movements: [],
                sizes: [],
                dials: [],
                straps: [],
                price: "",
              })
            }
            className="flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-stone transition-colors hover:text-ink"
          >
            <X className="h-3 w-3" strokeWidth={1.5} />
            Clear ({activeCount})
          </button>
        ) : (
          <span className="text-[10px] uppercase tracking-[0.14em] text-stone/60">
            All pieces
          </span>
        )}
      </div>

      <FilterSection title="Maison">
        {brands.map((brand) => (
          <CheckRow
            key={brand.slug}
            label={brand.name}
            count={counts[brand.slug] ?? 0}
            checked={filters.brands.includes(brand.slug)}
            onChange={() => toggle("brands", brand.slug)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price">
        {priceBands.map((band) => (
          <label
            key={band.key}
            className="group flex cursor-pointer items-center gap-2.5 py-[7px] text-[13px] text-ink/80 transition-colors hover:text-ink"
          >
            <input
              type="radio"
              name="price"
              checked={filters.price === band.key}
              onChange={() =>
                navigate({ ...filters, price: filters.price === band.key ? "" : band.key })
              }
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border transition-colors",
                filters.price === band.key
                  ? "border-ink"
                  : "border-ink/25 group-hover:border-ink/50",
              )}
            >
              {filters.price === band.key && <span className="h-[7px] w-[7px] rounded-full bg-ink" />}
            </span>
            <span className="flex-1">{band.label}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Case size">
        {sizeBands.map((band) => (
          <CheckRow
            key={band.key}
            label={band.label}
            checked={filters.sizes.includes(band.key)}
            onChange={() => toggle("sizes", band.key)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Movement">
        {movementOptions.map((movement) => (
          <CheckRow
            key={movement}
            label={movement}
            checked={filters.movements.includes(movement)}
            onChange={() => toggle("movements", movement)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Gender">
        {genderOptions.map((gender) => (
          <CheckRow
            key={gender}
            label={gender}
            checked={filters.genders.includes(gender)}
            onChange={() => toggle("genders", gender)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Dial colour">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {dialOptions.map((dial) => (
            <CheckRow
              key={dial.name}
              label={dial.name === "Mother-of-Pearl" ? "Pearl" : dial.name}
              checked={filters.dials.includes(dial.name)}
              onChange={() => toggle("dials", dial.name)}
              swatch={dial.hex}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Strap">
        {strapOptions.map((strap) => (
          <CheckRow
            key={strap}
            label={strap}
            checked={filters.straps.includes(strap)}
            onChange={() => toggle("straps", strap)}
          />
        ))}
      </FilterSection>

      <div className="pt-5">
        <p className="text-[11px] leading-relaxed text-stone">
          Every timepiece is inspected and authenticated by our in-house watchmakers
          before dispatch.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-px flex-1 bg-line" />
          <span className="font-display text-sm italic text-stone">Since 2014</span>
          <span className="h-px flex-1 bg-line" />
        </div>
      </div>
    </div>
  );
}

export function SortSelect({
  filters,
  sort,
}: {
  filters: Filters;
  sort: SortKey;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className={cn("relative", pending && "opacity-60")}>
      <label htmlFor="sort" className="sr-only">
        Sort watches
      </label>
      <select
        id="sort"
        value={sort}
        onChange={(event) => {
          const next = event.target.value as SortKey;
          startTransition(() => {
            router.push(`/watches${filtersToQuery(filters, { sort: next, page: 1 })}`, {
              scroll: false,
            });
          });
        }}
        className="w-full cursor-pointer appearance-none border border-line bg-ivory py-2.5 pl-3 pr-9 text-[11px] uppercase tracking-[0.12em] text-ink outline-none transition-colors hover:border-ink/40 focus:border-gold sm:w-auto"
      >
        {sortOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone"
        strokeWidth={1.5}
      />
    </div>
  );
}
