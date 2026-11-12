"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useStore } from "./store-provider";
import { WatchThumb } from "./watch-thumb";
import { getBrand } from "@/lib/brands";
import { formatPrice } from "@/lib/format";

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const initialForm: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  phone: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function formatCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function CheckoutForm() {
  const router = useRouter();
  const { hydrated, cartItems, subtotal, shipping, tax, total, cartCount, clearCart } =
    useStore();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  const update =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setForm((current) => ({
        ...current,
        [key]:
          key === "cardNumber"
            ? formatCard(value)
            : key === "expiry"
              ? formatExpiry(value)
              : value,
      }));
      setError("");
    };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const cardDigits = form.cardNumber.replace(/\s/g, "");
    if (cardDigits.length < 15) {
      setError("Please enter a valid card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      setError("Please enter the expiry as MM/YY.");
      return;
    }
    if (!/^\d{3,4}$/.test(form.cvc)) {
      setError("Please enter a valid security code.");
      return;
    }
    if (!terms) {
      setError("Please accept the terms to continue.");
      return;
    }

    setSubmitting(true);
    const orderId = `MN-${Date.now().toString().slice(-6)}`;
    const order = {
      id: orderId,
      email: form.email,
      name: `${form.firstName} ${form.lastName}`,
      address: {
        line1: form.address,
        line2: form.apartment,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      },
      items: cartItems.map(({ watch, qty }) => ({
        slug: watch.slug,
        name: watch.name,
        brand: getBrand(watch.brand)?.name ?? watch.brand,
        price: watch.price,
        qty,
        caseSize: watch.caseSize,
        reference: watch.reference,
      })),
      subtotal,
      shipping,
      tax,
      total,
      count: cartCount,
      placedAt: new Date().toISOString(),
      cardLast4: cardDigits.slice(-4),
    };

    window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("meridian:last-order", JSON.stringify(order));
      } catch {
        // ignore storage errors
      }
      clearCart();
      router.push(`/checkout/success?order=${orderId}`);
    }, 1300);
  };

  if (!hydrated) {
    return (
      <section className="shell py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <div className="h-8 w-48 animate-pulse bg-cream" />
            <div className="h-64 animate-pulse bg-cream" />
            <div className="h-64 animate-pulse bg-cream" />
          </div>
          <div className="h-96 animate-pulse bg-cream" />
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="shell py-20">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-cream">
            <ShoppingBag className="h-8 w-8 text-stone" strokeWidth={1.2} />
          </div>
          <h1 className="mt-6 font-display text-4xl">Your bag is empty</h1>
          <p className="mt-3 text-sm text-stone">
            Add a timepiece to your bag before heading to checkout.
          </p>
          <Link
            href="/watches"
            className="mt-7 inline-flex bg-ink px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory"
          >
            Explore the collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="shell py-10 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-3 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-gold">Secure checkout</p>
            <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
              Complete your order
            </h1>
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-stone">
            <span className="text-ink">Bag</span>
            <span>/</span>
            <span className="text-gold">Details</span>
            <span>/</span>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2.5 border border-line bg-cream/60 p-3 text-[11px] leading-relaxed text-stone">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
          Demonstration checkout — no payment will be taken and no card details are
          stored. Use any valid-format test card.
        </div>

        <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div className="space-y-10">
            <fieldset>
              <legend className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink text-[10px] font-semibold">
                  1
                </span>
                <span className="font-display text-2xl">Contact</span>
              </legend>
              <div className="mt-5 grid gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    Email address
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className="field"
                    autoComplete="email"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    Phone <span className="normal-case tracking-normal text-stone/60">(for delivery updates)</span>
                  </span>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+1 (555) 000-0000"
                    className="field"
                    autoComplete="tel"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="border-t border-line pt-8">
              <legend className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink text-[10px] font-semibold">
                  2
                </span>
                <span className="font-display text-2xl">Shipping address</span>
              </legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    First name
                  </span>
                  <input required value={form.firstName} onChange={update("firstName")} className="field" autoComplete="given-name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    Last name
                  </span>
                  <input required value={form.lastName} onChange={update("lastName")} className="field" autoComplete="family-name" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    Address
                  </span>
                  <input required value={form.address} onChange={update("address")} className="field" autoComplete="address-line1" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    Apartment, suite, etc. <span className="normal-case tracking-normal text-stone/60">(optional)</span>
                  </span>
                  <input value={form.apartment} onChange={update("apartment")} className="field" autoComplete="address-line2" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    City
                  </span>
                  <input required value={form.city} onChange={update("city")} className="field" autoComplete="address-level2" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    State / region
                  </span>
                  <input required value={form.state} onChange={update("state")} className="field" autoComplete="address-level1" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    Postal code
                  </span>
                  <input required value={form.zip} onChange={update("zip")} className="field" autoComplete="postal-code" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                    Country
                  </span>
                  <select
                    value={form.country}
                    onChange={update("country")}
                    className="field appearance-none"
                    autoComplete="country-name"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Japan</option>
                    <option>Singapore</option>
                    <option>United Arab Emirates</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="border-t border-line pt-8">
              <legend className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink text-[10px] font-semibold">
                  3
                </span>
                <span className="font-display text-2xl">Delivery</span>
              </legend>
              <div className="mt-5 border border-gold/60 bg-cream/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-ink">
                    <span className="h-2 w-2 rounded-full bg-ink" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium">Insured express delivery</p>
                      <p className="text-[11px] font-medium">
                        {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                      </p>
                    </div>
                    <p className="mt-1 text-[11px] text-stone">
                      Signature required · arrives in 2–4 business days · fully insured
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border-t border-line pt-8">
              <legend className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink text-[10px] font-semibold">
                  4
                </span>
                <span className="font-display text-2xl">Payment</span>
              </legend>
              <div className="mt-5 border border-line bg-cream/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-stone">
                    <CreditCard className="h-4 w-4 text-gold" strokeWidth={1.5} />
                    Card payment
                  </p>
                  <span className="flex gap-2 text-[9px] uppercase tracking-[0.1em] text-stone">
                    <span>Visa</span>
                    <span>MC</span>
                    <span>Amex</span>
                  </span>
                </div>
                <div className="mt-4 grid gap-4">
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                      Name on card
                    </span>
                    <input required value={form.cardName} onChange={update("cardName")} className="field" autoComplete="cc-name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                      Card number
                    </span>
                    <input
                      required
                      inputMode="numeric"
                      value={form.cardNumber}
                      onChange={update("cardNumber")}
                      placeholder="4242 4242 4242 4242"
                      className="field tabular-nums"
                      autoComplete="cc-number"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                        Expiry
                      </span>
                      <input
                        required
                        inputMode="numeric"
                        value={form.expiry}
                        onChange={update("expiry")}
                        placeholder="MM/YY"
                        className="field tabular-nums"
                        autoComplete="cc-exp"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                        Security code
                      </span>
                      <input
                        required
                        inputMode="numeric"
                        value={form.cvc}
                        onChange={update("cvc")}
                        placeholder="CVC"
                        className="field tabular-nums"
                        autoComplete="cc-csc"
                      />
                    </label>
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-[10px] text-stone">
                  <Lock className="h-3 w-3" strokeWidth={1.5} />
                  Demo mode — no charge is made, no card data is saved.
                </p>
              </div>
            </fieldset>

            <label className="flex items-start gap-3 text-[12px] leading-relaxed text-stone">
              <input
                type="checkbox"
                checked={terms}
                onChange={(event) => setTerms(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#101113]"
              />
              <span>
                I agree to the{" "}
                <Link href="/info/terms" className="text-ink underline underline-offset-2 hover:text-gold">
                  terms of sale
                </Link>{" "}
                and{" "}
                <Link href="/info/privacy" className="text-ink underline underline-offset-2 hover:text-gold">
                  privacy policy
                </Link>
                , and understand this is a demonstration checkout.
              </span>
            </label>

            {error && (
              <p className="border border-[#b5664f]/40 bg-[#fbeee9] px-4 py-3 text-[12px] text-[#8d3f2b]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2.5 bg-ink px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-graphite disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border border-ivory/40 border-t-ivory" />
                  Placing your order…
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Place order · {formatPrice(total)}
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-stone">
              By placing this order you agree to our 14-day return policy.
            </p>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-line bg-cream/50">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="font-display text-xl">Order summary</h2>
                <span className="text-[10px] uppercase tracking-[0.14em] text-stone">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              </div>

              <ul className="max-h-[22rem] divide-y divide-line overflow-y-auto px-5">
                {cartItems.map(({ watch, qty }) => (
                  <li key={watch.slug} className="flex gap-3 py-4">
                    <Link
                      href={`/watches/${watch.slug}`}
                      className="watch-stage relative h-20 w-16 shrink-0 overflow-hidden border border-line/70"
                    >
                      <WatchThumb watch={watch} sizes="64px" />
                      <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-ink px-1 text-[9px] text-ivory">
                        {qty}
                      </span>
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-stone">
                        {getBrand(watch.brand)?.name ?? watch.brand}
                      </p>
                      <p className="mt-0.5 truncate font-display text-sm leading-tight">
                        {watch.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-stone">
                        {watch.caseSize} mm
                        {watch.reference ? ` · ${watch.reference}` : ""}
                      </p>
                    </div>
                    <p className="text-xs font-medium">{formatPrice(watch.price * qty)}</p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-line px-5 py-4">
                <dl className="space-y-2 text-[13px]">
                  <div className="flex items-center justify-between">
                    <dt className="text-stone">Subtotal</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-stone">Shipping</dt>
                    <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-stone">Tax</dt>
                    <dd>{formatPrice(tax)}</dd>
                  </div>
                </dl>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-xl">{formatPrice(total)}</span>
                </div>
                <p className="mt-1 text-right text-[10px] text-stone">USD</p>
              </div>

              <div className="space-y-2.5 border-t border-line px-5 py-4 text-[11px] text-stone">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  Authenticated and warrantied for 24 months
                </p>
                <p className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  Fully insured, signature-required delivery
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  14-day returns, return shipping covered
                </p>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-4 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone transition-colors hover:text-ink"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" strokeWidth={1.5} />
              Return to bag
            </Link>
          </aside>
        </form>
      </div>
    </section>
  );
}
