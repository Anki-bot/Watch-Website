import Image from "next/image";
import type { Watch } from "@/lib/types";
import { cn } from "@/lib/format";
import { WatchVisual } from "./watch-visual";

type WatchThumbProps = {
  watch: Watch;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders the first real photo when one exists, otherwise the SVG illustration.
 * The parent element must be positioned (relative/absolute) because the photo
 * uses `fill`.
 */
export function WatchThumb({
  watch,
  className,
  sizes = "128px",
  priority = false,
}: WatchThumbProps) {
  const image = watch.images?.[0];

  if (!image) {
    return <WatchVisual watch={watch} className={className} />;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={cn("object-cover", className)}
    />
  );
}
