"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery";

type PhotoGalleryProps = {
  items: GalleryItem[];
};

export function PhotoGallery({ items }: PhotoGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (direction: number) => {
      setActive((current) =>
        current === null
          ? null
          : (current + direction + items.length) % items.length,
      );
    },
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close, step]);

  const current = active === null ? null : items[active];

  return (
    <>
      <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
        {items.map((item, index) => (
          <figure key={item.src} className="group">
            <button
              type="button"
              onClick={() => setActive(index)}
              className="block w-full bg-cream text-left"
              aria-label={`Open ${item.alt}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.thumb}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
              </div>
            </button>
            <figcaption className="pt-2.5">
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-stone">
                {item.folder}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink/80">
                {item.title}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close photo"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-cream/20 text-cream/80 transition-colors hover:border-cream/50 hover:text-cream sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-cream/20 text-cream/80 transition-colors hover:border-cream/50 hover:text-cream sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-cream/20 text-cream/80 transition-colors hover:border-cream/50 hover:text-cream sm:right-8"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <figure
            className="flex max-h-[88vh] max-w-[92vw] flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[78vh] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-4 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cream/45">
                {current.folder}
              </p>
              <p className="mt-1 font-display text-lg text-cream sm:text-xl">
                {current.title}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-cream/35">
                {String((active ?? 0) + 1).padStart(2, "0")} / {items.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
