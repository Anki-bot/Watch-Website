import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccess } from "@/components/order-success";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="shell py-20">
          <div className="mx-auto max-w-xl space-y-4 text-center">
            <div className="mx-auto h-20 w-20 animate-pulse rounded-full bg-cream" />
            <div className="mx-auto h-8 w-2/3 animate-pulse bg-cream" />
            <div className="mx-auto h-4 w-1/2 animate-pulse bg-cream" />
          </div>
        </div>
      }
    >
      <OrderSuccess />
    </Suspense>
  );
}
