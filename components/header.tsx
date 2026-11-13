"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useStore } from "./store-provider";
import { cn } from "@/lib/format";

const navLinks = [
  { href: "/watches", label: "Watches" },
  { href: "/women", label: "Women" },
  { href: "/brands", label: "Brands" },
  { href: "/watches?sort=newest", label: "New Arrivals" },
  { href: "/#story", label: "Our Story" },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex flex-col leading-none" aria-label="Meridian home">
      <span
        className={cn(
          "font-display uppercase transition-colors group-hover:text-gold",
          compact ? "text-[22px] tracking-[0.26em]" : "text-2xl tracking-[0.28em]",
        )}
      >
        Meridian
      </span>
      <span className="mt-1 text-[7.5px] font-medium uppercase tracking-[0.46em] text-stone">
        Fine Timepieces
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlist, hydrated, openCart } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Close overlays when the route changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) {
      const timer = window.setTimeout(() => searchInput.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
  }, [searchOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/watches?q=${encodeURIComponent(value)}` : "/watches");
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/watches") return pathname === "/watches";
    if (href === "/women") return pathname === "/women";
    if (href === "/brands") return pathname.startsWith("/brands");
    return false;
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink text-cream/85">
        <div className="shell flex h-9 items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em]">
          <span className="hidden sm:block">Complimentary insured shipping over $1,000</span>
          <span className="sm:hidden">Free insured shipping over $1,000</span>
          <span className="hidden md:block">Authenticity guaranteed · 24-month warranty</span>
          <span className="hidden lg:block">Concierge: +1 (212) 555-0148</span>
        </div>
      </div>

      <div className="border-b border-line/80 bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/80">
        <div className="shell flex h-[74px] items-center justify-between gap-6">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="-ml-2 p-2 text-ink"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="hidden flex-1 items-center lg:flex">
            <Wordmark />
          </div>
          <div className="flex items-center lg:hidden">
            <Wordmark compact />
          </div>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "group relative py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-gold",
                  isActive(link.href) ? "text-ink" : "text-ink/70",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="p-2.5 text-ink transition-colors hover:text-gold"
              aria-label={searchOpen ? "Close search" : "Search watches"}
              aria-expanded={searchOpen}
            >
              {searchOpen ? (
                <X className="h-[19px] w-[19px]" strokeWidth={1.5} />
              ) : (
                <Search className="h-[19px] w-[19px]" strokeWidth={1.5} />
              )}
            </button>
            <Link
              href="/wishlist"
              className="relative p-2.5 text-ink transition-colors hover:text-gold"
              aria-label={`Wishlist${hydrated && wishlist.length ? `, ${wishlist.length} items` : ""}`}
            >
              <Heart className="h-[19px] w-[19px]" strokeWidth={1.5} />
              {hydrated && wishlist.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-ink">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative p-2.5 text-ink transition-colors hover:text-gold"
              aria-label={`Shopping bag${hydrated && cartCount ? `, ${cartCount} items` : ""}`}
            >
              <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.5} />
              {hydrated && cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-semibold text-ivory">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-line bg-ivory shadow-[0_24px_50px_-30px_rgba(16,17,19,0.45)]">
          <div className="shell py-5">
            <form onSubmit={submitSearch} className="flex items-center gap-3 border-b border-ink/20 pb-3">
              <Search className="h-5 w-5 shrink-0 text-stone" strokeWidth={1.5} />
              <input
                ref={searchInput}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search watches, brands, or references…"
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-stone/70"
                aria-label="Search watches"
              />
              <button
                type="submit"
                className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink hover:text-gold"
              >
                Search
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-stone">
              <span className="uppercase tracking-[0.16em]">Popular:</span>
              {["Submariner", "Speedmaster", "Santos", "Tank", "Diver"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    router.push(`/watches?q=${encodeURIComponent(term)}`);
                    setSearchOpen(false);
                  }}
                  className="transition-colors hover:text-gold"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40 fade-in"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-cream p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Wordmark compact />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 text-ink"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={submitSearch} className="mt-8 flex items-center border-b border-ink/25 pb-2">
              <Search className="mr-2 h-4 w-4 text-stone" strokeWidth={1.5} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search the collection"
                className="w-full bg-transparent text-sm outline-none placeholder:text-stone/70"
                aria-label="Search watches"
              />
            </form>

            <nav className="mt-8 flex flex-col" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-ink/10 py-4 font-display text-2xl text-ink"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-stone" strokeWidth={1.5} />
                </Link>
              ))}
              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-ink/10 py-4 font-display text-2xl text-ink"
              >
                Wishlist {hydrated && wishlist.length > 0 ? `(${wishlist.length})` : ""}
                <ChevronRight className="h-4 w-4 text-stone" strokeWidth={1.5} />
              </Link>
            </nav>

            <div className="mt-auto pt-10">
              <p className="eyebrow text-stone">Concierge</p>
              <a href="tel:+12125550148" className="mt-2 block font-display text-xl">
                +1 (212) 555-0148
              </a>
              <a href="mailto:care@meridian.watch" className="mt-1 block text-sm text-stone">
                care@meridian.watch
              </a>
              <Link
                href="/watches"
                onClick={() => setMenuOpen(false)}
                className="mt-6 inline-flex items-center gap-2 bg-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory"
              >
                Shop all watches
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
