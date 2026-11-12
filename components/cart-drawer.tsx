"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useStore } from "./store-provider";
import { WatchThumb } from "./watch-thumb";
import { formatPrice } from "@/lib/format";
import { getBrand } from "@/lib/brands";

export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    cartItems,
    setQuantity,
    removeFromCart,
    subtotal,
    shipping,
    tax,
    total,
    cartCount,
  } = useStore();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button
        type="button"
        className="absolute inset-0 bg-ink/45 fade-in"
        onClick={closeCart}
        aria-label="Close bag"
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-7">
          <div>
            <p className="eyebrow text-stone">Your selection</p>
            <h2 className="mt-1 font-display text-2xl">
              Shopping bag {cartCount > 0 && <span className="text-stone">({cartCount})</span>}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-ink transition-colors hover:text-gold"
            aria-label="Close bag"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-cream">
              <ShoppingBag className="h-8 w-8 text-stone" strokeWidth={1.2} />
            </div>
            <h3 className="mt-6 font-display text-2xl">Your bag is empty</h3>
            <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-stone">
              Discover a timepiece that speaks to you — from everyday automatics to rare
              complications.
            </p>
            <Link
              href="/watches"
              onClick={closeCart}
              className="mt-7 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite"
            >
              Explore the collection
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 sm:px-7">
              <ul className="divide-y divide-line">
                {cartItems.map(({ watch, qty }) => (
                  <li key={watch.slug} className="flex gap-4 py-5">
                    <Link
                      href={`/watches/${watch.slug}`}
                      onClick={closeCart}
                      className="watch-stage relative h-24 w-20 shrink-0 overflow-hidden border border-line/70"
                    >
                      <WatchThumb watch={watch} sizes="80px" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone">
                            {getBrand(watch.brand)?.name ?? watch.brand}
                          </p>
                          <Link
                            href={`/watches/${watch.slug}`}
                            onClick={closeCart}
                            className="mt-0.5 block truncate font-display text-lg leading-tight hover:text-gold"
                          >
                            {watch.name}
                          </Link>
                          <p className="mt-1 text-[11px] text-stone">
                            {watch.reference ? `Ref. ${watch.reference} · ` : ""}
                            {watch.caseSize} mm
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(watch.slug)}
                          className="p-1 text-stone transition-colors hover:text-ink"
                          aria-label={`Remove ${watch.name}`}
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                        <div className="flex items-center border border-line bg-ivory">
                          <button
                            type="button"
                            onClick={() => setQuantity(watch.slug, qty - 1)}
                            className="p-1.5 text-ink transition-colors hover:text-gold disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-7 text-center text-xs tabular-nums">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(watch.slug, qty + 1)}
                            disabled={qty >= watch.stock}
                            className="p-1.5 text-ink transition-colors hover:text-gold disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(watch.price * qty)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line bg-cream/60 px-5 py-5 sm:px-7">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs text-stone">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs text-stone">
                <span>Estimated tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="mt-3 border-t border-line pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-xl">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 bg-ink px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite"
                >
                  Proceed to checkout
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center border border-ink/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
                >
                  View full bag
                </Link>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-stone">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
                Secure checkout · 24-month warranty included
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
