"use client";

import Link from "next/link";
import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useStore } from "./store-provider";
import { WatchThumb } from "./watch-thumb";
import { getBrand } from "@/lib/brands";
import { formatPrice, SHIPPING_THRESHOLD } from "@/lib/format";

export function CartView() {
  const {
    hydrated,
    cartItems,
    cartCount,
    subtotal,
    shipping,
    tax,
    total,
    setQuantity,
    removeFromCart,
  } = useStore();

  if (!hydrated) {
    return (
      <section className="shell py-16">
        <div className="h-10 w-48 animate-pulse bg-cream" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex gap-5 border-b border-line pb-6">
                <div className="h-32 w-24 animate-pulse bg-cream" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-3 w-24 animate-pulse bg-cream" />
                  <div className="h-5 w-1/2 animate-pulse bg-cream" />
                  <div className="h-3 w-1/3 animate-pulse bg-cream" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-72 animate-pulse bg-cream" />
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="shell py-16 lg:py-24">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-cream">
            <ShoppingBag className="h-8 w-8 text-stone" strokeWidth={1.2} />
          </div>
          <h1 className="mt-6 font-display text-4xl">Your bag is empty</h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">
            A watch is a small, deliberate choice. Start with the collection and
            take your time.
          </p>
          <Link
            href="/watches"
            className="mt-8 inline-flex items-center gap-2 bg-ink px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite"
          >
            Explore the collection
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    );
  }

  const remaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);

  return (
    <section className="shell py-10 lg:py-14">
      <div className="flex flex-col justify-between gap-3 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-gold">Almost yours</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            Your bag
          </h1>
        </div>
        <p className="text-sm text-stone">
          {cartCount} {cartCount === 1 ? "timepiece" : "timepieces"}
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div>
          <ul className="divide-y divide-line border-b border-line">
            {cartItems.map(({ watch, qty }) => (
              <li key={watch.slug} className="flex flex-col gap-4 py-6 sm:flex-row sm:gap-6">
                <Link
                  href={`/watches/${watch.slug}`}
                  className="watch-stage relative block h-40 w-32 shrink-0 overflow-hidden border border-line/70"
                >
                  <WatchThumb watch={watch} sizes="128px" />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-stone">
                        {getBrand(watch.brand)?.name ?? watch.brand}
                      </p>
                      <Link
                        href={`/watches/${watch.slug}`}
                        className="mt-1 block font-display text-xl leading-tight transition-colors hover:text-gold sm:text-2xl"
                      >
                        {watch.name}
                      </Link>
                      <p className="mt-1.5 text-[11px] text-stone">
                        {watch.reference ? `Ref. ${watch.reference} · ` : ""}
                        {watch.movement} · {watch.caseSize} mm
                      </p>
                      <p className="mt-1 text-[11px] text-stone">
                        {watch.dialName} dial · {watch.strapName}
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

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                    <div className="flex items-center border border-line bg-ivory">
                      <button
                        type="button"
                        onClick={() => setQuantity(watch.slug, qty - 1)}
                        className="p-2.5 text-ink transition-colors hover:text-gold"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                      <span className="min-w-8 text-center text-sm tabular-nums">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(watch.slug, qty + 1)}
                        disabled={qty >= watch.stock}
                        className="p-2.5 text-ink transition-colors hover:text-gold disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium">{formatPrice(watch.price * qty)}</p>
                      {qty > 1 && (
                        <p className="text-[10px] text-stone">{formatPrice(watch.price)} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Link
              href="/watches"
              className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-gold"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
              Continue shopping
            </Link>
            <p className="hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-stone sm:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
              Secure checkout
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-line bg-cream/50 p-6">
            <h2 className="font-display text-2xl">Order summary</h2>

            {remaining > 0 ? (
              <div className="mt-4 border border-line bg-ivory p-3">
                <p className="flex items-center gap-2 text-[11px] text-ink/75">
                  <Truck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  Add <span className="font-semibold">{formatPrice(remaining)}</span> for
                  complimentary insured shipping
                </p>
                <div className="mt-2 h-1 w-full bg-line">
                  <div className="h-1 bg-gold" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : (
              <p className="mt-4 flex items-center gap-2 border border-line bg-ivory p-3 text-[11px] text-ink/75">
                <Truck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                You&apos;ve unlocked complimentary insured shipping
              </p>
            )}

            <dl className="mt-5 space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-stone">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-stone">Shipping</dt>
                <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-stone">Estimated tax</dt>
                <dd>{formatPrice(tax)}</dd>
              </div>
            </dl>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="font-display text-xl">Total</span>
              <span className="font-display text-2xl">{formatPrice(total)}</span>
            </div>
            <p className="mt-1 text-right text-[10px] text-stone">USD · taxes included at checkout</p>

            <Link
              href="/checkout"
              className="mt-5 flex items-center justify-center gap-2 bg-ink px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite"
            >
              Proceed to checkout
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>

            <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[11px] text-stone">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                Every watch authenticated in-house
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                Fully insured, signature-required delivery
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                14-day returns, no questions asked
              </li>
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.14em] text-stone">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
