"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "A watch enquiry", message: "" });

  const update =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  if (sent) {
    return (
      <div className="border border-line bg-cream/50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ivory">
          <Check className="h-6 w-6 text-gold" strokeWidth={1.5} />
        </div>
        <h3 className="mt-5 font-display text-2xl">Message received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-stone">
          Thank you, {form.name.split(" ")[0] || "friend"}. A member of our concierge
          team will reply within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", topic: "A watch enquiry", message: "" });
          }}
          className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4 hover:text-gold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="border border-line bg-ivory p-6 sm:p-8">
      <h3 className="font-display text-2xl">Write to us</h3>
      <p className="mt-1 text-[12px] text-stone">
        We reply to every message within one business day.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
        className="mt-5 grid gap-4 sm:grid-cols-2"
      >
        <label className="block">
          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
            Name
          </span>
          <input required value={form.name} onChange={update("name")} className="field" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
            Email
          </span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            className="field"
            placeholder="you@example.com"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
            Topic
          </span>
          <select value={form.topic} onChange={update("topic")} className="field appearance-none">
            <option>A watch enquiry</option>
            <option>Sourcing a specific reference</option>
            <option>Servicing & warranty</option>
            <option>An existing order</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
            Message
          </span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={update("message")}
            className="field resize-none"
            placeholder="How can we help?"
          />
        </label>
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-graphite sm:col-span-2"
        >
          Send message
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </form>
    </div>
  );
}

export function ContactDetails() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        { icon: Mail, label: "Email", value: "care@meridian.watch", href: "mailto:care@meridian.watch" },
        { icon: Phone, label: "Telephone", value: "+1 (212) 555-0148", href: "tel:+12125550148" },
        { icon: MapPin, label: "Atelier", value: "18 Crosby St, New York", href: "/info/contact" },
      ].map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="group border border-line bg-cream/50 p-4 transition-colors hover:border-gold/60"
        >
          <item.icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
          <p className="mt-3 text-[9px] uppercase tracking-[0.16em] text-stone">{item.label}</p>
          <p className="mt-1 text-[13px] font-medium transition-colors group-hover:text-gold">
            {item.value}
          </p>
        </a>
      ))}
    </div>
  );
}
