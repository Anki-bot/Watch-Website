import type { Metadata } from "next";
import Link from "next/link";
import { WishlistView } from "@/components/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The watches you've saved at Meridian.",
  robots: { index: false },
};

export default function WishlistPage() {
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
          <span className="text-ink">Wishlist</span>
        </nav>
      </div>
      <WishlistView />
    </>
  );
}
