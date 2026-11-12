# Meridian — Fine Timepieces

A complete, production-style watch e-commerce storefront built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

Everything runs locally with no database, API keys or external image services. The 46 watches are rendered as original, configurable SVG illustrations, so the store looks just as good offline.

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
- **Brand pages** (`/brands`, `/brands/[slug]`) — all 14 maisons with dedicated collection pages.
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
  watches.ts               46-watch catalogue + helpers
  brands.ts                14 maisons
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

### Swap the illustrations for photography

`components/watch-visual.tsx` renders every watch from data. To use real photos, replace that component's usage in `product-card.tsx`, `product-gallery.tsx`, `cart-drawer.tsx`, etc. with `next/image` and add remote patterns in `next.config.ts`.

## Notes

- Cart and wishlist are stored client-side in `localStorage`.
- Checkout is a demonstration: card fields are validated for format but nothing is charged or stored.
- Studio watch renders are illustrative and generated from product attributes.
