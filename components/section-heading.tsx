import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={
        align === "center"
          ? "flex flex-col items-center text-center"
          : "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      }
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`eyebrow ${light ? "text-gold" : "text-gold"}`}>{eyebrow}</p>
        )}
        <h2
          className={`mt-2 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.85rem] ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-3 text-sm leading-relaxed ${
              light ? "text-cream/55" : "text-stone"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {href && align === "left" && (
        <Link
          href={href}
          className={`group inline-flex shrink-0 items-center gap-2 border-b pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
            light
              ? "border-cream/30 text-cream hover:border-gold hover:text-gold"
              : "border-ink/25 text-ink hover:border-gold hover:text-gold"
          }`}
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}
