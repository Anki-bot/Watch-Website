"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import type { Watch } from "@/lib/types";
import { cn } from "@/lib/format";
import { WatchVisual } from "./watch-visual";

const views = [
  { key: "front", label: "Front", transform: "" },
  { key: "angled", label: "Angled", transform: "rotate-[-9deg] scale-[0.94]" },
  { key: "macro", label: "Dial", transform: "scale-[1.75] -translate-y-[2%]" },
  { key: "case", label: "Case", transform: "scale-[1.28] translate-y-[7%]" },
];

type ProductGalleryProps = {
  watch: Watch;
  brandName: string;
};

export function ProductGallery({ watch, brandName }: ProductGalleryProps) {
  if (watch.images?.length) {
    return <PhotoGallery watch={watch} brandName={brandName} />;
  }

  return <SyntheticGallery watch={watch} brandName={brandName} />;
}

function PhotoGallery({ watch, brandName }: ProductGalleryProps) {
  const images = watch.images ?? [];
  const [active, setActive] = useState(0);
  const image = images[active];
  if (!image) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative overflow-hidden border border-line/70 bg-cream">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          {watch.reference && (
            <span className="absolute left-4 top-4 border border-ink/10 bg-cream/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur">
              Ref. {watch.reference}
            </span>
          )}
          <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 border border-ink/10 bg-cream/85 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-ink/70 backdrop-blur">
            <Expand className="h-3 w-3" strokeWidth={1.5} />
            {brandName}
          </span>
          {watch.stock <= 0 && (
            <div className="absolute inset-x-0 top-0 flex justify-center bg-ink/85 py-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-ivory backdrop-blur">
              Currently unavailable
            </div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-square overflow-hidden border transition-colors",
                index === active
                  ? "border-ink"
                  : "border-line hover:border-ink/40",
              )}
              aria-label={`View photo ${index + 1}`}
              aria-pressed={index === active}
            >
              <Image
                src={item.thumb ?? item.src}
                alt={item.alt}
                fill
                sizes="25vw"
                loading="lazy"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <p className="text-center text-[10px] uppercase tracking-[0.14em] text-stone/70">
        Photographed in boutique · Actual watch may vary slightly
      </p>
    </div>
  );
}

function SyntheticGallery({ watch, brandName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const view = views[active];

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative overflow-hidden border border-line/70 watch-stage">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center px-6 py-8 transition-transform duration-700 ease-out",
              view.transform,
            )}
          >
            <WatchVisual watch={watch} />
          </div>
          <span className="absolute left-4 top-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone">
            Ref. {watch.reference}
          </span>
          <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-stone/70">
            <Expand className="h-3 w-3" strokeWidth={1.5} />
            {brandName}
          </span>
          {watch.stock <= 0 && (
            <div className="absolute inset-x-0 top-0 flex justify-center bg-ink/85 py-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-ivory backdrop-blur">
              Currently unavailable
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {views.map((item, index) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "group relative overflow-hidden border transition-colors",
              index === active ? "border-ink" : "border-line hover:border-ink/40",
            )}
            aria-label={`View ${item.label}`}
            aria-pressed={index === active}
          >
            <div className="watch-stage aspect-square overflow-hidden">
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center px-1 py-2 transition-transform duration-500",
                  item.transform === views[0].transform ? "" : "scale-[1.35]",
                )}
              >
                <WatchVisual watch={watch} className="h-full w-full" />
              </div>
            </div>
            <span className="absolute inset-x-0 bottom-0 bg-ivory/90 py-1 text-center text-[8px] font-medium uppercase tracking-[0.14em] text-ink">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <p className="text-center text-[10px] uppercase tracking-[0.14em] text-stone/70">
        Studio rendering · Actual dial may vary slightly
      </p>
    </div>
  );
}
