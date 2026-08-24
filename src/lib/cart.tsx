import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartLine = { slug: string; size: string; qty: number };

type CartContext = {
  lines: CartLine[];
  add: (slug: string, size: string, qty?: number) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: (CartLine & { product: Product })[];
};

const Ctx = createContext<CartContext | null>(null);
const KEY = "aurvm-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartContext>(() => {
    const detailed = lines
      .map((l) => {
        const product = PRODUCTS.find((p) => p.slug === l.slug);
        return product ? { ...l, product } : null;
      })
      .filter(Boolean) as (CartLine & { product: Product })[];

    return {
      lines,
      detailed,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: detailed.reduce((n, l) => n + l.product.price * l.qty, 0),
      add: (slug, size, qty = 1) =>
        setLines((prev) => {
          const i = prev.findIndex((l) => l.slug === slug && l.size === size);
          if (i === -1) return [...prev, { slug, size, qty }];
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }),
      remove: (slug, size) =>
        setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size))),
      setQty: (slug, size, qty) =>
        setLines((prev) =>
          prev
            .map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        ),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
