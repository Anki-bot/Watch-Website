"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Mail, MapPin, Package } from "lucide-react";
import { getWatch } from "@/lib/watches";
import { formatPrice } from "@/lib/format";
import { WatchThumb } from "@/components/watch-thumb";

type StoredOrder = {
  id: string;
  email: string;
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: {
    slug: string;
    name: string;
    brand: string;
    price: number;
    qty: number;
    caseSize: number;
    reference: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  count: number;
  placedAt: string;
  cardLast4: string;
};

export function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("meridian:last-order");
      if (raw) {
        const parsed = JSON.parse(raw) as StoredOrder;
        if (!orderParam || parsed.id === orderParam) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setOrder(parsed);
        }
      }
    } catch {
      // ignore malformed storage
    }
    setLoaded(true);
  }, [orderParam]);

  const orderNumber = order?.id ?? orderParam ?? "MN-000000";

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const deliveryLabel = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="shell py-14 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-cream">
            <Check className="h-8 w-8 text-gold" strokeWidth={1.4} />
          </div>
          <p className="eyebrow mt-6 text-gold">Order confirmed</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            Thank you{order?.name ? `, ${order.name.split(" ")[0]}` : ""}.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone">
            This is a demonstration checkout — no payment has been taken and no email
            has been sent. In a live boutique order, your timepiece would now be
            prepared by our atelier.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 border border-line bg-ivory px-4 py-2 text-[11px] uppercase tracking-[0.14em]">
            Order <span className="font-semibold">{orderNumber}</span>
          </p>
        </div>

        <div className="mt-10 grid gap-3 border-y border-line py-6 text-[12px] sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <Mail className="mt-0.5 h-4 w-4 text-gold" strokeWidth={1.5} />
            <div>
              <p className="font-medium">Order contact</p>
              <p className="mt-0.5 text-stone">{order?.email ?? "Your email inbox"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Package className="mt-0.5 h-4 w-4 text-gold" strokeWidth={1.5} />
            <div>
              <p className="font-medium">Delivery estimate</p>
              <p className="mt-0.5 text-stone">{deliveryLabel}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 text-gold" strokeWidth={1.5} />
            <div>
              <p className="font-medium">Shipping to</p>
              <p className="mt-0.5 text-stone">
                {order
                  ? `${order.address.city}, ${order.address.country}`
                  : "Your billing address"}
              </p>
            </div>
          </div>
        </div>

        {order && order.items.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Your pieces</h2>
              <span className="text-[10px] uppercase tracking-[0.14em] text-stone">
                {order.count} {order.count === 1 ? "item" : "items"}
              </span>
            </div>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {order.items.map((item) => {
                const watch = getWatch(item.slug);
                return (
                  <li key={item.slug} className="flex gap-4 py-4">
                    {watch && (
                      <Link
                        href={`/watches/${item.slug}`}
                        className="watch-stage relative h-24 w-20 shrink-0 overflow-hidden border border-line/70"
                      >
                        <WatchThumb watch={watch} sizes="80px" />
                      </Link>
                    )}
                    <div className="flex flex-1 flex-col">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-stone">
                        {item.brand}
                      </p>
                      <p className="mt-0.5 font-display text-lg leading-tight">{item.name}</p>
                      <p className="mt-1 text-[11px] text-stone">
                        Ref. {item.reference} · {item.caseSize} mm · Qty {item.qty}
                      </p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.qty)}</p>
                  </li>
                );
              })}
            </ul>

            <dl className="ml-auto mt-5 max-w-xs space-y-2 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-stone">Subtotal</dt>
                <dd>{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Shipping</dt>
                <dd>{order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Tax</dt>
                <dd>{formatPrice(order.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2">
                <dt className="font-display text-lg">Total</dt>
                <dd className="font-display text-lg">{formatPrice(order.total)}</dd>
              </div>
              <p className="text-right text-[10px] text-stone">
                Demo payment · card ending {order.cardLast4}
              </p>
            </dl>
          </div>
        )}

        {loaded && !order && (
          <p className="mt-8 border border-line bg-cream/50 p-4 text-center text-[12px] leading-relaxed text-stone">
            We couldn&apos;t find the full details for this order in this browser. The
            demonstration checkout still completed — nothing was charged.
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-center text-[12px] text-stone sm:text-left">
            Thank you for exploring Meridian. This is a demonstration storefront — no
            charge was made.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/watches"
              className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-graphite"
            >
              Continue shopping
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/wishlist"
              className="inline-flex border border-line px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
            >
              View wishlist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
