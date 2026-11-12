# Watch photography — drop-off folder

Put **original** photos here. Nothing in this folder is served publicly — it is a
staging area. I will crop, optimise and move the final files into `public/watches/`
and wire them into the product data.

## Fastest way to give me photos

1. Open `manifest.csv` (46 watches, already filled with each watch's slug, brand,
   gender and reference).
2. Drop your photos into `incoming/<brand>/` — for example
   `incoming/rolex/rolex-submariner-date-41-front.jpg`.
3. Either follow the naming pattern below, or write the filenames into the
   matching columns of `manifest.csv`.

```
incoming/
  rolex/
    rolex-submariner-date-41-front.jpg
    rolex-submariner-date-41-angled.jpg
    rolex-submariner-date-41-caseback.jpg
    rolex-submariner-date-41-wrist.jpg
  omega/
    omega-speedmaster-moonwatch-front.jpg
    ...
```

If you only have one photo per watch, name it `<watch-slug>.jpg` and leave the
extra columns blank.

## Naming rules

- `<watch-slug>-front` — straight-on product shot (used on cards, catalog, cart)
- `<watch-slug>-angled` — three-quarter view (PDP gallery)
- `<watch-slug>-caseback`
- `<watch-slug>-wrist` — lifestyle / on-wrist
- `<watch-slug>-detail` — dial or movement macro (optional extras are fine)

Use the exact `watch_slug` from `manifest.csv`. Lowercase, hyphens, no spaces.
Accepted files: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tif`. Keep originals — do not
crop, resize or apply filters before sending.

## Quality checklist

- **Resolution:** at least 1600 px on the long edge; 2000–3000 px is ideal.
  Never upscale a small image — send the largest original you have.
- **Aspect ratio:** 4:5 portrait for the main/front image. Other views can be any
  shape; I'll crop them consistently.
- **Framing:** watch centred, filling roughly 80–90% of the frame, same angle and
  zoom across a brand (and ideally across the whole site).
- **Background:** transparent PNG cutout, clean white/cream, or a consistent
  lifestyle set. Avoid busy backgrounds and harsh reflections.
- **Colour:** sRGB. No heavy filters, no Instagram compression.
- **Watermarks:** none, especially other retailers' watermarks.
- **File size:** under ~15 MB per original.
- **Accuracy:** the photo must match the watch's reference. If your photo is a
  different reference, dial colour or bracelet, note it in the `notes` column and
  I'll update the product data.

## How gender sections will work

Each watch already has a `gender` field (`Men`, `Women`, `Unisex`) and the catalog
already supports `?brand=rolex&gender=Men`. Once photos are wired up I'll add
gender tabs to every brand page —

```
/brands/rolex            All
/brands/rolex?gender=Men Rolex for men
/brands/rolex?gender=Women
```

— plus matching counts. Unisex pieces appear in both views. If you want physical
folders named "men"/"women", that's fine, but the `manifest.csv` values are what
actually controls the sections.

## Rights

Only send images you own or have a licence to use commercially. Retailer or
marketplace images are usually not licensed for a storefront, even when they are
publicly visible.

## What happens after you drop them

I will:

1. Match each file to its watch and flag anything ambiguous or missing.
2. Crop to consistent 4:5, strip metadata, and generate AVIF/WebP + JPEG fallbacks
   at responsive widths (no destructive edit to your originals).
3. Add the image paths to `lib/watches.ts`.
4. Replace the SVG illustration on cards, PDP gallery, hero, brand pages, cart and
   order confirmation with the real photos — falling back to the SVG automatically
   for any watch that has no photo yet.
5. Add descriptive alt text, blur placeholders, `sizes`/priority loading and
   per-product social share images.
6. Build, screenshot and verify the grid at desktop and mobile before handing back.
