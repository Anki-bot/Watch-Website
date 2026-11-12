"use client";

import { Heart } from "lucide-react";
import { useStore } from "./store-provider";
import { cn } from "@/lib/format";

export function WishlistButton({
  slug,
  className,
  iconClassName,
  withLabel = false,
}: {
  slug: string;
  className?: string;
  iconClassName?: string;
  withLabel?: boolean;
}) {
  const { toggleWishlist, isWishlisted } = useStore();
  const active = isWishlisted(slug);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Save to wishlist"}
      className={cn(
        "group/wish flex items-center justify-center gap-2 transition-colors",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-[18px] w-[18px] transition-colors",
          active ? "fill-gold text-gold" : "text-ink group-hover/wish:text-gold",
          iconClassName,
        )}
        strokeWidth={1.5}
      />
      {withLabel && (
        <span className="text-[11px] font-medium uppercase tracking-[0.16em]">
          {active ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
