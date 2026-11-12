import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Your Bag",
  description: "Review the watches in your Meridian bag.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <div className="border-b border-line bg-cream/50">
        <nav
          className="shell flex items-center gap-2 py-4 text-[10px] uppercase tracking-[0.15em] text-stone"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/watches" className="transition-colors hover:text-ink">
            Watches
          </Link>
          <span>/</span>
          <span className="text-ink">Bag</span>
        </nav>
      </div>
      <CartView />
    </>
  );
}
