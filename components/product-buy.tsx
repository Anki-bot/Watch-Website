"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import type { Watch } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useStore } from "./store-provider";
import { WishlistButton } from "./wishlist-button";

export function ProductBuy({ watch }: { watch: Watch }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useStore();
  const soldOut = watch.stock <= 0;
  const lowStock = watch.stock > 0 && watch.stock <= 3;
  const savings = watch.compareAtPrice ? watch.compareAtPrice - watch.price : 0;
  const installments = Math.round((watch.price / 4) * 100) / 100;

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-3xl">{formatPrice(watch.price)}</span>
        {watch.compareAtPrice && (
          <>
            <span className="text-base text-stone line-through">
              {formatPrice(watch.compareAtPrice)}
            </span>
            <span className="bg-cream px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink">
              Save {formatPrice(savings)}
            </span>
          </>
        )}
      </div>
      <p className="mt-1.5 text-[11px] text-stone">
        or 4 interest-free payments of {formatPrice(installments)} with{" "}
        <span className="font-medium text-ink">Meridian Pay</span>
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px]">
        {soldOut ? (
          <span className="flex items-center gap-1.5 text-[#9a4a38]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9a4a38]" />
            Currently unavailable
          </span>
        ) : lowStock ? (
          <span className="flex items-center gap-1.5 text-[#8a6a2b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a45c]" />
            Only {watch.stock} available
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-[#3c6b4a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4d7d5a]" />
            In stock · ships within 24 hours
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <div className="flex h-[52px] items-center justify-between border border-line bg-ivory sm:w-32">
          <button
            type="button"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            disabled={soldOut || qty <= 1}
            className="flex h-full w-10 items-center justify-center text-ink transition-colors hover:text-gold disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
          <span className="min-w-8 text-center text-sm tabular-nums">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((value) => Math.min(watch.stock, value + 1))}
            disabled={soldOut || qty >= watch.stock}
            className="flex h-full w-10 items-center justify-center text-ink transition-colors hover:text-gold disabled:opacity-30"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => addToCart(watch.slug, qty)}
          disabled={soldOut}
          className="flex h-[52px] flex-1 items-center justify-center gap-2.5 bg-ink px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite disabled:cursor-not-allowed disabled:bg-stone/40"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          {soldOut ? "Sold out" : "Add to bag"}
        </button>

        <WishlistButton
          slug={watch.slug}
          withLabel
          className="h-[52px] border border-line bg-ivory px-5 text-ink hover:border-ink/40 sm:w-auto"
        />
      </div>

      {soldOut && (
        <p className="mt-3 text-[11px] leading-relaxed text-stone">
          This piece is currently reserved.{" "}
          <Link href="/info/contact" className="text-ink underline underline-offset-4 hover:text-gold">
            Contact our concierge
          </Link>{" "}
          to join the waiting list.
        </p>
      )}

      <div className="mt-6 grid gap-2.5 border-y border-line py-5 text-[11px] text-stone sm:grid-cols-3">
        <span className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-gold" strokeWidth={1.5} />
          Free insured delivery
        </span>
        <span className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-gold" strokeWidth={1.5} />
          14-day returns
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.5} />
          24-month warranty
        </span>
      </div>
    </div>
  );
}
