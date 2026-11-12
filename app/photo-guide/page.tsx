import type { Metadata } from "next";
import Link from "next/link";
import { brands, getBrand } from "@/lib/brands";
import { watches } from "@/lib/watches";
import { WatchVisual } from "@/components/watch-visual";

export const metadata: Metadata = {
  title: "Photo matching guide",
  robots: { index: false, follow: false },
};

function folderName(name: string) {
  return name.replace(/["/:*?<>|]/g, "").replace(/\s+/g, " ").trim();
}

export default function PhotoGuidePage() {
  const groups = brands
    .map((brand) => ({
      brand,
      items: watches.filter((watch) => watch.brand === brand.slug),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="shell py-12 lg:py-16">
      <div className="max-w-3xl">
        <p className="eyebrow text-gold">Internal tool — not linked in the shop</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Photo matching guide
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/65">
          Find the illustration that matches your photo, then drop the photo into the
          folder shown under that watch. You do not need to know the model name or the
          reference number — matching by sight is enough.
        </p>
        <div className="mt-6 border border-line bg-cream/60 p-4 text-[12px] leading-relaxed text-ink/70">
          <p className="font-medium text-ink">Where the folders are</p>
          <code className="mt-2 block break-all text-[11px] text-stone">
            watch-photos/incoming/&lt;brand&gt;/&lt;watch folder&gt;/
          </code>
          <p className="mt-2">
            In Finder press <kbd className="border border-line bg-ivory px-1">⇧⌘G</kbd> and
            paste{" "}
            <code className="break-all">
              /Users/ankitkumar/Desktop/CODE/2D-WatchWeb/watch-photos/incoming
            </code>
            . If you cannot identify a watch, put the photo in that brand&apos;s{" "}
            <code>_unsorted</code> folder and tell me — I&apos;ll match it.
          </p>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Jump to brand">
          {groups.map((group) => (
            <a
              key={group.brand.slug}
              href={`#${group.brand.slug}`}
              className="border border-line bg-ivory px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-stone transition-colors hover:border-ink/40 hover:text-ink"
            >
              {group.brand.name} ({group.items.length})
            </a>
          ))}
        </nav>
      </div>

      {groups.map((group) => (
        <section key={group.brand.slug} id={group.brand.slug} className="mt-16 scroll-mt-8">
          <div className="flex items-end justify-between gap-6 border-b border-ink/15 pb-4">
            <div>
              <h2 className="font-display text-3xl">{group.brand.name}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-stone">
                {group.brand.country} · {group.items.length}{" "}
                {group.items.length === 1 ? "piece" : "pieces"}
              </p>
            </div>
            <p className="text-right text-[10px] text-stone">
              Drop photos in
              <br />
              <code className="text-[10px] text-ink">incoming/{group.brand.slug}/</code>
            </p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((watch) => {
              const folder = folderName(watch.name);
              return (
                <article key={watch.slug} className="border border-line bg-ivory">
                  <div className="watch-stage relative aspect-[4/5]">
                    <div className="absolute inset-0 px-5 py-6">
                      <WatchVisual watch={watch} />
                    </div>
                  </div>
                  <div className="border-t border-line p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-stone">
                      {getBrand(watch.brand)?.name}
                    </p>
                    <h3 className="mt-1 font-display text-xl leading-tight">{watch.name}</h3>
                    <p className="mt-1 text-[11px] text-stone">
                      {watch.gender} · {watch.caseSize} mm · Ref. {watch.reference}
                    </p>
                    <p className="mt-3 border border-line bg-cream/60 px-2.5 py-2 text-[10px] leading-relaxed text-ink/80">
                      <span className="block text-[9px] uppercase tracking-[0.14em] text-stone">
                        Folder
                      </span>
                      <code className="mt-0.5 block break-all">
                        incoming/{watch.brand}/{folder}/
                      </code>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-14 border-t border-line pt-6 text-[12px] text-stone">
        Done? Tell me <span className="font-medium text-ink">&ldquo;photos are in&rdquo;</span>.
        Back to the{" "}
        <Link href="/" className="text-ink underline underline-offset-2 hover:text-gold">
          storefront
        </Link>
        .
      </div>
    </div>
  );
}
