"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "./store-provider";
import { ProductCard } from "./product-card";

export function WishlistView() {
  const { hydrated, wishlistItems, wishlist, addToCart, toggleWishlist } = useStore();

  return (
    <section className="shell py-12 lg:py-16">
      <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-gold">Saved for later</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            Your wishlist
          </h1>
          <p className="mt-3 text-sm text-stone">
            {hydrated
              ? wishlist.length === 0
                ? "The pieces you love, kept in one place."
                : `${wishlist.length} ${wishlist.length === 1 ? "timepiece" : "timepieces"} saved`
              : "Loading your saved pieces…"}
          </p>
        </div>
        {hydrated && wishlist.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                wishlistItems
                  .filter((watch) => watch.stock > 0)
                  .forEach((watch) => addToCart(watch.slug));
                wishlist.forEach((slug) => toggleWishlist(slug));
              }}
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-graphite"
            >
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
              Move all to bag
            </button>
            <button
              type="button"
              onClick={() => wishlist.forEach((slug) => toggleWishlist(slug))}
              className="inline-flex items-center gap-2 border border-line px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone transition-colors hover:border-ink hover:text-ink"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              Clear
            </button>
          </div>
        )}
      </div>

      {!hydrated ? (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="aspect-[4/5] animate-pulse bg-cream" />
              <div className="mt-4 h-3 w-1/3 animate-pulse bg-cream" />
              <div className="mt-2 h-4 w-2/3 animate-pulse bg-cream" />
            </div>
          ))}
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center border border-line bg-cream/40 px-6 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-ivory">
            <Heart className="h-8 w-8 text-stone" strokeWidth={1.2} />
          </div>
          <h2 className="mt-6 font-display text-3xl">Nothing saved yet</h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone">
            Tap the heart on any watch to keep it here. We&apos;ll hold onto it while
            you decide.
          </p>
          <Link
            href="/watches"
            className="mt-7 inline-flex bg-ink px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite"
          >
            Explore the collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-7 xl:grid-cols-4">
          {wishlistItems.map((watch) => (
            <ProductCard key={watch.slug} watch={watch} />
          ))}
        </div>
      )}
    </section>
  );
}
