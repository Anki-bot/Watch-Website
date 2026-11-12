import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { filtersToQuery, type Filters, type SortKey } from "@/lib/filters";
import { cn } from "@/lib/format";

function pageList(current: number, total: number): (number | "gap")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const pages: (number | "gap")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("gap");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < total - 1) pages.push("gap");
  pages.push(total);
  return pages;
}

export function Pagination({
  page,
  totalPages,
  filters,
  sort,
}: {
  page: number;
  totalPages: number;
  filters: Filters;
  sort: SortKey;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Link
          href={`/watches${filtersToQuery(filters, { sort, page: page - 1 })}`}
          className="pagination-link"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      ) : (
        <span className="pagination-link cursor-not-allowed opacity-35" aria-hidden="true">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </span>
      )}

      {pageList(page, totalPages).map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} className="px-1 text-stone">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={`/watches${filtersToQuery(filters, { sort, page: item })}`}
            aria-current={item === page ? "page" : undefined}
            data-active={item === page}
            className={cn("pagination-link")}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={`/watches${filtersToQuery(filters, { sort, page: page + 1 })}`}
          className="pagination-link"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      ) : (
        <span className="pagination-link cursor-not-allowed opacity-35" aria-hidden="true">
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      )}
    </nav>
  );
}
