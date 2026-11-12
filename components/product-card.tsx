"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import type { Watch } from "@/lib/types";
import { getBrand } from "@/lib/brands";
import { cn, formatPrice } from "@/lib/format";
import { WatchVisual } from "./watch-visual";
import { WishlistButton } from "./wishlist-button";
import { useStore } from "./store-provider";

export function ProductCard({ watch }: { watch: Watch }) {
  const brand = getBrand(watch.brand);
  const { addToCart } = useStore();
  const soldOut = watch.stock <= 0;
  const enquire = Boolean(watch.priceOnRequest);
  const badge =
    watch.badges?.[0] ??
    (enquire ? "In store" : watch.compareAtPrice ? "Sale" : null);
  const photo = watch.images?.[0];

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden border border-line/70 watch-stage">
        <Link
          href={`/watches/${watch.slug}`}
          className="block aspect-[4/5] w-full"
          aria-label={`View ${brand?.name} ${watch.name}`}
        >
          <div
            className={cn(
              "absolute inset-0",
              !photo &&
                "flex items-center justify-center px-5 py-7 transition-transform duration-700 ease-out group-hover:scale-[1.045]",
            )}
          >
            {photo ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              />
            ) : (
              <WatchVisual watch={watch} />
            )}
          </div>
        </Link>

        {badge && (
          <span className="pointer-events-none absolute left-3 top-3 border border-ink/10 bg-ivory/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
            {badge}
          </span>
        )}

        <WishlistButton
          slug={watch.slug}
          className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full border border-ink/10 bg-ivory/95 backdrop-blur hover:bg-ivory"
          iconClassName="h-4 w-4"
        />

        {soldOut ? (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-center bg-ink/85 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-ivory backdrop-blur">
            Sold out
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => addToCart(watch.slug)}
              className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-ivory transition-colors hover:bg-gold sm:hidden"
              aria-label={`Add ${watch.name} to bag`}
            >
              <Plus className="h-4 w-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => addToCart(watch.slug)}
              className="absolute inset-x-3 bottom-3 z-10 hidden translate-y-3 items-center justify-center gap-2 bg-ink/95 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-ivory opacity-0 backdrop-blur transition-all duration-300 hover:bg-gold hover:text-ink group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
            >
              Add to bag
              <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone">
              {brand?.name ?? watch.brand}
            </p>
            <h3 className="mt-1 font-display text-[21px] leading-tight">
              <Link href={`/watches/${watch.slug}`} className="line-clamp-2 transition-colors hover:text-gold">
                {watch.name}
              </Link>
            </h3>
          </div>
        </div>
        <p className="mt-1.5 text-[11px] text-stone">
          {watch.movement} · {watch.caseSize} mm · {watch.gender}
        </p>
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-sm font-medium tracking-wide">{formatPrice(watch.price)}</span>
          {watch.compareAtPrice && (
            <span className="text-xs text-stone line-through">
              {formatPrice(watch.compareAtPrice)}
            </span>
          )}
        </div>
        <Link
          href={`/watches/${watch.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          View details
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
