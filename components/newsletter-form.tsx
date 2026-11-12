"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setEmail("");
  };

  if (status === "done") {
    return (
      <div
        className={`flex items-center gap-2 border px-4 py-3 text-sm ${
          dark ? "border-cream/25 text-cream" : "border-line text-ink"
        }`}
      >
        <Check className="h-4 w-4 text-gold" strokeWidth={2} />
        You&apos;re on the list. Welcome to Meridian.
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={submit} className="flex items-stretch">
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
          }}
          placeholder="Your email address"
          aria-label="Email address"
          className={`min-w-0 flex-1 border px-4 py-3 text-sm outline-none transition-colors ${
            dark
              ? "border-cream/25 bg-transparent text-cream placeholder:text-cream/40 focus:border-gold"
              : "border-line bg-ivory text-ink placeholder:text-stone/60 focus:border-gold"
          }`}
        />
        <button
          type="submit"
          aria-label="Subscribe to the newsletter"
          className={`flex w-12 items-center justify-center transition-colors ${
            dark ? "bg-cream text-ink hover:bg-gold hover:text-ivory" : "bg-ink text-ivory hover:bg-graphite"
          }`}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </form>
      {status === "error" && (
        <p className={`mt-2 text-[11px] ${dark ? "text-[#e6b3a8]" : "text-[#a14838]"}`}>
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
}
