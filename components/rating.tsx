"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/format";

export function Rating({
  rating,
  count,
  className,
  showCount = true,
}: {
  rating: number;
  count?: number;
  className?: string;
  showCount?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1} />
      <span className="text-xs font-medium text-ink">{rating.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className="text-[11px] text-stone">({count})</span>
      )}
    </div>
  );
}
