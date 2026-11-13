# Meridian — Fine Timepieces

A complete, production-style watch e-commerce storefront built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

Everything runs locally with no database, API keys or external image services. The catalogue holds 72 watches: pieces with real boutique photography use those photos, and every other piece is rendered as an original, configurable SVG illustration, so the store looks just as good offline.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build and run the production version:

```bash
npm run build
npm start
```

## What's included

- **Homepage** — editorial hero, brand marquee, shop-by-character categories, curated edit, brand story, new arrivals, maison directory and trust sections.
- **Shop / catalogue** (`/watches`) — server-side filtering and sorting with shareable URLs:
  - maison, price band, case size, movement, gender, dial colour and strap
  - search across name, collection, reference, brand and description
  - 6 sort options, active-filter chips, mobile filter drawer, pagination
- **Product pages** (`/watches/[slug]`) — multi-view gallery, full specifications, highlights, quantity, wishlist, stock states, related watches, brand story and Product JSON-LD.
- **Brand pages** (`/brands`, `/brands/[slug]`) — all 17 maisons with dedicated collection pages, plus photo libraries for the houses where boutique photography exists.
- **Women's section** (`/women`) — every women's piece in one editorial page, with maison shortcuts and a link into the filtered catalogue.
- **Wishlist** (`/wishlist`) — persisted in `localStorage`, move-all-to-bag and clear actions.
- **Bag** (`/cart`) — slide-over drawer + full cart page, stock-aware quantities, free-shipping progress and order summary.
- **Checkout** (`/checkout`) — validated demo form, payment mock, delivery and order summary. No real payment is taken.
- **Order confirmation** (`/checkout/success`) — order number, items, totals and delivery estimate.
- **Information pages** (`/info/[slug]`) — about, shipping & returns, warranty, authentication, contact (with form), FAQ, privacy and terms.
- **Polish** — responsive design, accessible labels and keyboard support, custom 404, SEO metadata, sitemap, robots and a custom favicon.

## Project structure

```
app/
  page.tsx                 Homepage
  watches/                 Catalogue + product pages
  brands/                  Maison index + brand pages
  women/                   Women's collection
  wishlist/  cart/         Saved pieces and bag
  checkout/                Demo checkout + confirmation
  info/[slug]/             Editorial and legal pages
  globals.css              Tailwind theme, base styles, animations
components/
  watch-visual.tsx         Parametric SVG watch renderer
  store-provider.tsx       Cart + wishlist state (localStorage)
  header.tsx  footer.tsx   Site chrome
  filters-panel.tsx        URL-driven filters and sort
  product-card.tsx         Collection card
  ...                      Gallery, checkout, cart, wishlist views
lib/
  types.ts                 Domain types
  watches.ts               Watch catalogue + helpers
  brands.ts                17 maisons
  filters.ts               Filtering, sorting, URL query helpers
  info.ts                  Information page content
  format.ts                Price, cart and small utilities
```

## Customising the store

### Add or edit a watch

Edit `lib/watches.ts`. Each entry controls both product data and the SVG illustration:

```ts
{
  slug: "brand-reference",
  name: "Model Name",
  brand: "rolex",              // matches a slug in lib/brands.ts
  collection: "Submariner",
  price: 10250,
  gender: "Men",
  movement: "Automatic",
  caseSize: 41,
  caseMaterial: "Oystersteel",
  caseTone: "steel",           // steel | gold | rose-gold | two-tone | titanium | black
  dialName: "Black",
  dialHex: "#16181b",
  dialTexture: "sunburst",     // sunburst | matte | mother-of-pearl | snowflake
  dialStyle: "batons",         // batons | roman | arabic | digital
  strapName: "Oyster bracelet",
  strapType: "Steel",          // Steel | Titanium | Gold | Leather | Rubber | NATO
  strapHex: "#b9c0c7",
  bezel: "dive",               // smooth | fluted | dive | tachymeter | gmt
  bezelHex: "#1e5a3a",
  // ...specs, description, features, stock
}
```

Set `stock: 0` to show the sold-out state. Set `chrono: true` for chronograph subdials, or `caseShape: "tank"` for a rectangular case.

### Rebrand

- Store name/copy: `components/header.tsx`, `components/footer.tsx`, `app/layout.tsx`.
- Colours and fonts: the `@theme` block in `app/globals.css`.
- Brand information: `lib/brands.ts`.

### Adding real photography

Pieces with boutique photos just carry an `images` array; everything else falls
back to the SVG renderer automatically.

1. Optimise the photos into `public/watches/<brand-slug>/<family>/` and
   `public/watches/<brand-slug>/thumbs/<family>/` (1400 px and 640 px on the
   long edge, JPEG quality ~80–84).
2. Generate a gallery data file — see `lib/fossil-gallery.ts`,
   `lib/tommy-gallery.ts`, `lib/tissot-gallery.ts`. Each item needs `src`,
   `thumb`, `alt`, `title`, `folder`, `group`, `width` and `height`.
3. Register it in `lib/brand-galleries.ts` so the brand page shows the photo
   library and lightbox.
4. Attach the group to a product in `lib/watches.ts` via the `imagesFrom`
   helper, e.g. `images: fossilImages("Petite Rectangle")`. The whole family
   then appears in that product's gallery.

If a piece has no confirmed price yet, set `price: 0` and
`priceOnRequest: true`. The card shows "Price on request", the product page
shows an "Enquire about this piece" button linking to `/info/contact`, and the
piece is excluded from the bag.

## Notes

- Cart and wishlist are stored client-side in `localStorage`.
- Checkout is a demonstration: card fields are validated for format but nothing is charged or stored.
- Studio watch renders are illustrative and generated from product attributes. Pieces with real photography show those photos instead.
