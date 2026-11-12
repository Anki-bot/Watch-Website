import { getBrand } from "./brands";
import type { Watch } from "./types";

export type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating"
  | "name";

export type Filters = {
  q: string;
  brands: string[];
  genders: string[];
  movements: string[];
  price: string;
  sizes: string[];
  dials: string[];
  straps: string[];
  conditions: string[];
};

export type FilterSearchParams = Record<
  string,
  string | string[] | undefined
>;

export const emptyFilters: Filters = {
  q: "",
  brands: [],
  genders: [],
  movements: [],
  price: "",
  sizes: [],
  dials: [],
  straps: [],
  conditions: [],
};

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "newest", label: "Newest arrivals" },
  { key: "rating", label: "Top rated" },
  { key: "name", label: "Name: A to Z" },
];

export const priceBands = [
  { key: "under-500", label: "Under $500", min: 0, max: 499.99 },
  { key: "500-1000", label: "$500 – $1,000", min: 500, max: 1000 },
  { key: "1000-3000", label: "$1,000 – $3,000", min: 1000, max: 3000 },
  { key: "3000-7000", label: "$3,000 – $7,000", min: 3000, max: 7000 },
  { key: "7000-plus", label: "$7,000 & above", min: 7000, max: Infinity },
];

export const sizeBands = [
  { key: "up-to-36", label: "Up to 36 mm", min: 0, max: 36.9 },
  { key: "37-40", label: "37 – 40 mm", min: 37, max: 40.9 },
  { key: "41-43", label: "41 – 43 mm", min: 41, max: 43.9 },
  { key: "44-plus", label: "44 mm & above", min: 44, max: Infinity },
];

export const movementOptions = [
  "Automatic",
  "Manual",
  "Quartz",
  "Solar",
  "Spring Drive",
];

export const genderOptions = ["Men", "Women", "Unisex"];

export const strapOptions = [
  "Leather",
  "Steel",
  "Titanium",
  "Gold",
  "Rubber",
  "NATO",
];

export const conditionOptions = ["New", "Pre-owned"];

export const dialOptions: { name: string; hex: string }[] = [
  { name: "Black", hex: "#16181b" },
  { name: "Blue", hex: "#1d3f68" },
  { name: "Silver", hex: "#dcdcd6" },
  { name: "White", hex: "#f2efe7" },
  { name: "Grey", hex: "#4a4e54" },
  { name: "Champagne", hex: "#e6d3a3" },
  { name: "Mother-of-Pearl", hex: "#f3e9e2" },
];

function readList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value : [value];
  return raw
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter(Boolean);
}

function readSingle(value: string | string[] | undefined): string {
  if (!value) return "";
  return Array.isArray(value) ? value[0] ?? "" : value;
}

export function parseFilters(params: FilterSearchParams): Filters {
  return {
    q: readSingle(params.q).trim(),
    brands: readList(params.brand),
    genders: readList(params.gender),
    movements: readList(params.movement),
    price: readSingle(params.price),
    sizes: readList(params.size),
    dials: readList(params.dial),
    straps: readList(params.strap),
    conditions: readList(params.condition),
  };
}

export function parseSort(value: string | string[] | undefined): SortKey {
  const key = readSingle(value);
  return sortOptions.some((option) => option.key === key)
    ? (key as SortKey)
    : "featured";
}

export function parsePage(value: string | string[] | undefined): number {
  const parsed = Number.parseInt(readSingle(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function filterWatches(list: Watch[], filters: Filters): Watch[] {
  const priceBand = priceBands.find((band) => band.key === filters.price);
  const sizeBandsSelected = sizeBands.filter((band) =>
    filters.sizes.includes(band.key),
  );
  const query = filters.q.toLowerCase();

  return list.filter((watch) => {
    if (filters.brands.length && !filters.brands.includes(watch.brand)) {
      return false;
    }
    if (
      filters.genders.length &&
      !filters.genders.includes(watch.gender)
    ) {
      return false;
    }
    if (
      filters.movements.length &&
      !filters.movements.includes(watch.movement)
    ) {
      return false;
    }
    if (priceBand) {
      if (watch.priceOnRequest) return false;
      if (watch.price < priceBand.min || watch.price > priceBand.max) {
        return false;
      }
    }
    if (
      sizeBandsSelected.length &&
      !sizeBandsSelected.some(
        (band) => watch.caseSize >= band.min && watch.caseSize <= band.max,
      )
    ) {
      return false;
    }
    if (filters.dials.length && !filters.dials.includes(watch.dialName)) {
      return false;
    }
    if (
      filters.straps.length &&
      !filters.straps.includes(watch.strapType)
    ) {
      return false;
    }
    if (
      filters.conditions.length &&
      !filters.conditions.includes(watch.condition)
    ) {
      return false;
    }
    if (query) {
      const brandName = getBrand(watch.brand)?.name ?? watch.brand;
      const haystack = [
        watch.name,
        watch.collection,
        watch.reference ?? "",
        brandName,
        watch.description,
        watch.dialName,
        watch.movement,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function sortWatches(list: Watch[], sort: SortKey): Watch[] {
  const sorted = [...list];
  const ascending = (watch: Watch) =>
    watch.priceOnRequest ? Number.POSITIVE_INFINITY : watch.price;
  const descending = (watch: Watch) =>
    watch.priceOnRequest ? Number.NEGATIVE_INFINITY : watch.price;

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => ascending(a) - ascending(b));
    case "price-desc":
      return sorted.sort((a, b) => descending(b) - descending(a));
    case "newest":
      return sorted.sort(
        (a, b) =>
          b.year - a.year ||
          (b.badges?.includes("New Arrival") ? 1 : 0) -
            (a.badges?.includes("New Arrival") ? 1 : 0),
      );
    case "rating":
      return sorted.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default: {
      const list = [...sorted];
      return list.sort((a, b) => {
        const aFeatured = a.badges?.includes("Best Seller") ? 1 : 0;
        const bFeatured = b.badges?.includes("Best Seller") ? 1 : 0;
        return bFeatured - aFeatured;
      });
    }
  }
}

export function brandCounts(
  list: Watch[],
  filters: Filters,
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const watch of filterWatches(list, { ...filters, brands: [] })) {
    counts[watch.brand] = (counts[watch.brand] ?? 0) + 1;
  }
  return counts;
}

export function countActiveFilters(filters: Filters): number {
  return (
    filters.brands.length +
    filters.genders.length +
    filters.movements.length +
    filters.sizes.length +
    filters.dials.length +
    filters.straps.length +
    filters.conditions.length +
    (filters.price ? 1 : 0) +
    (filters.q ? 1 : 0)
  );
}

export function filtersToQuery(
  filters: Filters,
  options: { sort?: SortKey; page?: number } = {},
): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.brands.length) params.set("brand", filters.brands.join(","));
  if (filters.genders.length) params.set("gender", filters.genders.join(","));
  if (filters.movements.length)
    params.set("movement", filters.movements.join(","));
  if (filters.price) params.set("price", filters.price);
  if (filters.sizes.length) params.set("size", filters.sizes.join(","));
  if (filters.dials.length) params.set("dial", filters.dials.join(","));
  if (filters.straps.length) params.set("strap", filters.straps.join(","));
  if (filters.conditions.length)
    params.set("condition", filters.conditions.join(","));
  if (options.sort && options.sort !== "featured") {
    params.set("sort", options.sort);
  }
  if (options.page && options.page > 1) {
    params.set("page", String(options.page));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function toggleInList(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function searchParamsToObject(
  params: Record<string, string | string[] | undefined>,
): FilterSearchParams {
  return params;
}
