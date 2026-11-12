import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, Mail } from "lucide-react";
import { getInfoPage, infoPages, infoSlugs, type InfoPage } from "@/lib/info";
import { ContactDetails, ContactForm } from "@/components/contact-form";

type InfoPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return infoSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: InfoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) return { title: "Page not found" };
  return {
    title: page.title,
    description: page.intro,
  };
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params;
  const page: InfoPage | undefined = getInfoPage(slug);
  if (!page) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-cream">
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(205,176,131,0.6) 0%, rgba(205,176,131,0) 70%)",
          }}
        />
        <div className="shell relative pb-12 pt-8 lg:pb-16 lg:pt-10">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cream/45">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <span className="text-cream/80">{page.title}</span>
          </nav>
          <div className="mt-10 max-w-2xl">
            <p className="eyebrow text-gold">{page.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/55">{page.intro}</p>
          </div>
        </div>
      </section>

      <section className="shell py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-16">
          <aside className="min-w-0">
            <div className="sticky top-28">
              <p className="eyebrow text-stone">Information</p>
              <nav className="mt-4 flex flex-wrap gap-x-5 lg:flex-col lg:gap-0" aria-label="Information pages">
                {infoPages.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/info/${item.slug}`}
                    className={`whitespace-nowrap border-b py-2.5 text-[12px] transition-colors lg:whitespace-normal ${
                      item.slug === slug
                        ? "border-gold text-ink"
                        : "border-line text-stone hover:border-ink/30 hover:text-ink"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 hidden border border-line bg-cream/50 p-4 lg:block">
                <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <p className="mt-2 text-[11px] font-medium">Still need help?</p>
                <a
                  href="mailto:care@meridian.watch"
                  className="mt-1 block text-[11px] text-stone transition-colors hover:text-gold"
                >
                  care@meridian.watch
                </a>
              </div>
            </div>
          </aside>

          <div className="max-w-2xl min-w-0">
            {slug === "about" && (
              <div className="mb-10 border-l-2 border-gold pl-5">
                <p className="font-display text-2xl italic leading-snug text-ink/85">
                  “We would rather know forty watches intimately than carry a thousand
                  we have never worn.”
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-stone">
                  The Meridian atelier
                </p>
              </div>
            )}

            {page.sections.map((section, index) => (
              <div key={section.heading} className={index > 0 ? "mt-10 border-t border-line pt-8" : ""}>
                <h2 className="font-display text-2xl text-ink sm:text-3xl">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-ink/70">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 space-y-2 border-l border-line pl-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="text-[13px] leading-relaxed text-ink/70">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {page.faqs && (
              <div className="mt-2">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group border-b border-line py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13px] font-medium">
                      {faq.question}
                      <ChevronDown
                        className="mt-0.5 h-4 w-4 shrink-0 text-stone transition-transform group-open:rotate-180"
                        strokeWidth={1.5}
                      />
                    </summary>
                    <p className="mt-3 pr-8 text-[13px] leading-relaxed text-ink/65">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            )}

            {slug === "contact" && (
              <div className="mt-10 space-y-8">
                <ContactDetails />
                <ContactForm />
              </div>
            )}

            {slug === "about" && (
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
                {[
                  ["2014", "Founded"],
                  ["14", "Maisons"],
                  ["24", "Month warranty"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl">{value}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-stone">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[11px] text-stone">
              <span>Last updated November 2026</span>
              <Link
                href="/watches"
                className="font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
              >
                Explore the collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
