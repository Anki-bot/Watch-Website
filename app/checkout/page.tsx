import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Meridian order.",
  robots: { index: false },
};

export default function CheckoutPage() {
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
          <Link href="/cart" className="transition-colors hover:text-ink">
            Bag
          </Link>
          <span>/</span>
          <span className="text-ink">Checkout</span>
        </nav>
      </div>
      <CheckoutForm />
    </>
  );
}
