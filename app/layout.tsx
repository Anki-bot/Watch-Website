import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://meridian.watch"),
  title: {
    default: "Meridian — Fine Timepieces",
    template: "%s · Meridian",
  },
  description:
    "Discover fine watches from Rolex, Omega, Grand Seiko, Cartier and more. Curated timepieces, authenticated and delivered with care by Meridian.",
  keywords: [
    "luxury watches",
    "watches",
    "Rolex",
    "Omega",
    "Grand Seiko",
    "Cartier",
    "watch boutique",
    "fine timepieces",
  ],
  openGraph: {
    title: "Meridian — Fine Timepieces",
    description:
      "A curated collection of fine watches from the world's most respected houses.",
    type: "website",
    siteName: "Meridian",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full ${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-full">
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
