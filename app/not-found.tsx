import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-cream">
        <Clock className="h-7 w-7 text-gold" strokeWidth={1.2} />
      </div>
      <p className="eyebrow mt-6 text-gold">404 · Out of time</p>
      <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">
        This page has stopped ticking.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
        The page you&apos;re looking for may have moved, sold, or never existed. Let&apos;s
        get you back to something worth wearing.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/watches"
          className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite"
        >
          Explore the collection
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
        <Link
          href="/"
          className="inline-flex border border-line px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
