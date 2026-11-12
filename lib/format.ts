export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCaseSize(value: number): string {
  return `${value} mm`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const SHIPPING_THRESHOLD = 1000;
export const SHIPPING_FEE = 25;
export const TAX_RATE = 0.08;

export function cartTotals(subtotal: number) {
  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return {
    shipping,
    tax,
    total: subtotal + shipping + tax,
  };
}
