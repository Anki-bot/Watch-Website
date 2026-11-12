"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getWatch } from "@/lib/watches";
import type { Watch } from "@/lib/types";
import { cartTotals } from "@/lib/format";

export type CartLine = { slug: string; qty: number };
export type CartItem = { watch: Watch; qty: number };

type StoreValue = {
  hydrated: boolean;
  cart: CartLine[];
  cartItems: CartItem[];
  cartCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  addToCart: (slug: string, qty?: number) => void;
  setQuantity: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  wishlist: string[];
  wishlistItems: Watch[];
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "meridian:cart";
const WISHLIST_KEY = "meridian:wishlist";

function safeParse(value: string | null): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = safeParse(window.localStorage.getItem(CART_KEY));
    const storedWishlist = safeParse(window.localStorage.getItem(WISHLIST_KEY));

    if (Array.isArray(storedCart)) {
      const valid = storedCart.filter(
        (line): line is CartLine =>
          Boolean(line) &&
          typeof line === "object" &&
          typeof (line as CartLine).slug === "string" &&
          typeof (line as CartLine).qty === "number" &&
          Boolean(getWatch((line as CartLine).slug)),
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCart(valid.map((line) => ({ slug: line.slug, qty: Math.max(1, line.qty) })));
    }

    if (Array.isArray(storedWishlist)) {
      setWishlist(
        storedWishlist.filter(
          (slug): slug is string => typeof slug === "string" && Boolean(getWatch(slug)),
        ),
      );
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!cartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen]);

  const addToCart = useCallback((slug: string, qty = 1) => {
    const watch = getWatch(slug);
    if (!watch || watch.stock <= 0 || watch.priceOnRequest) return;
    setCart((current) => {
      const existing = current.find((line) => line.slug === slug);
      if (existing) {
        return current.map((line) =>
          line.slug === slug
            ? { ...line, qty: Math.min(watch.stock, line.qty + qty) }
            : line,
        );
      }
      return [...current, { slug, qty: Math.min(watch.stock, Math.max(1, qty)) }];
    });
    setCartOpen(true);
  }, []);

  const setQuantity = useCallback((slug: string, qty: number) => {
    const watch = getWatch(slug);
    if (!watch) return;
    setCart((current) =>
      qty <= 0
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) =>
            line.slug === slug
              ? { ...line, qty: Math.min(watch.stock, qty) }
              : line,
          ),
    );
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }, []);

  const cartItems = useMemo(
    () =>
      cart
        .map((line) => {
          const watch = getWatch(line.slug);
          return watch ? { watch, qty: line.qty } : null;
        })
        .filter((item): item is CartItem => Boolean(item)),
    [cart],
  );

  const wishlistItems = useMemo(
    () =>
      wishlist
        .map((slug) => getWatch(slug))
        .filter((watch): watch is Watch => Boolean(watch)),
    [wishlist],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.watch.price * item.qty, 0),
    [cartItems],
  );

  const totals = useMemo(() => cartTotals(subtotal), [subtotal]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems],
  );

  const value: StoreValue = {
    hydrated,
    cart,
    cartItems,
    cartCount,
    subtotal,
    ...totals,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    wishlistItems,
    toggleWishlist,
    isWishlisted: (slug: string) => wishlist.includes(slug),
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
