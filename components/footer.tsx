import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M14.5 8.5h2.2V5.5h-2.4c-2.4 0-3.8 1.4-3.8 3.8v1.5H8v3h2.5V21h3.2v-7.2h2.6l.4-3h-3v-1.2c0-.8.3-1.1 1.2-1.1Z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const columns = [
  {
    title: "The Collection",
    links: [
      { label: "All Watches", href: "/watches" },
      { label: "Women's Watches", href: "/women" },
      { label: "New Arrivals", href: "/watches?sort=newest" },
      { label: "Best Sellers", href: "/watches?sort=rating" },
      { label: "Under $1,000", href: "/watches?price=500-1000" },
      { label: "The Maisons", href: "/brands" },
    ],
  },
  {
    title: "Maisons",
    links: [
      { label: "Rolex", href: "/brands/rolex" },
      { label: "Omega", href: "/brands/omega" },
      { label: "Grand Seiko", href: "/brands/grand-seiko" },
      { label: "Cartier", href: "/brands/cartier" },
      { label: "View all brands", href: "/brands" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping & Returns", href: "/info/shipping" },
      { label: "Warranty", href: "/info/warranty" },
      { label: "Authentication", href: "/info/authentication" },
      { label: "Contact", href: "/info/contact" },
      { label: "FAQ", href: "/info/faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="shell py-14 lg:py-20">
        <div className="grid gap-12 border-b border-cream/10 pb-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-3xl uppercase tracking-[0.26em] text-cream">
              Meridian
            </p>
            <p className="mt-2 text-[8px] uppercase tracking-[0.46em] text-cream/45">
              Fine Timepieces
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
              A curated house of fine watches. Every piece is inspected by our
              watchmakers, authenticated, and delivered with a 24-month warranty.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-cream/60 transition-colors hover:text-gold"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-cream/60 transition-colors hover:text-gold"
              >
                <FacebookIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-cream/60 transition-colors hover:text-gold"
              >
                <YoutubeIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="eyebrow text-cream/45">{column.title}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/70 transition-colors hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 border-b border-cream/10 py-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-gold">The Meridian Letter</p>
            <h3 className="mt-3 max-w-md font-display text-3xl leading-tight text-cream sm:text-4xl">
              New arrivals, private releases and quiet stories from the world of watches.
            </h3>
          </div>
          <div className="lg:pl-10">
            <NewsletterForm dark />
            <p className="mt-3 text-[11px] text-cream/40">
              One considered email a month. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 text-[11px] text-cream/45 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Meridian Fine Timepieces</span>
            <Link href="/info/privacy" className="transition-colors hover:text-gold">
              Privacy
            </Link>
            <Link href="/info/terms" className="transition-colors hover:text-gold">
              Terms
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:care@meridian.watch"
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              care@meridian.watch
            </a>
            <a
              href="tel:+12125550148"
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              +1 (212) 555-0148
            </a>
            <span className="hidden h-3 w-px bg-cream/20 sm:block" />
            <span className="flex items-center gap-1.5">
              Secure payments
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
