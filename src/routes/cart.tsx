import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import { useCart } from "@/lib/cart";
import { inr } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — AURVM Silver Jewellery" },
      {
        name: "description",
        content: "Review the AURVM silver pieces in your cart and checkout in a couple of taps.",
      },
      { property: "og:title", content: "Your Cart — AURVM" },
      { property: "og:description", content: "Review your AURVM silver pieces and checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="px-4 py-24 text-center md:px-8">
        <h1 className="text-5xl">ORDER PLACED</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Thanks — your pieces are being packed. You'll get a dispatch email within 48 hours.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-primary px-8 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground"
        >
          KEEP SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-14 md:px-8">
      <h1 className="text-5xl md:text-7xl">YOUR CART</h1>

      {detailed.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-primary px-8 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground"
          >
            SHOP THE DROP
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
          <ul className="divide-y divide-border border-y border-border">
            {detailed.map((l) => (
              <li key={`${l.slug}-${l.size}`} className="flex gap-4 py-5">
                <img
                  src={l.product.img}
                  alt={l.product.name}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="h-28 w-24 object-cover"
                />
                <div className="flex-1">
                  <Link to="/product/$slug" params={{ slug: l.slug }} className="text-lg">
                    {l.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">Size {l.size}</p>
                  <p className="mt-1 text-sm">{inr(l.product.price)}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-border">
                      <button
                        className="px-3 py-1"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(l.slug, l.size, l.qty - 1)}
                      >
                        −
                      </button>
                      <span className="px-3 text-sm">{l.qty}</span>
                      <button
                        className="px-3 py-1"
                        aria-label="Increase quantity"
                        onClick={() => setQty(l.slug, l.size, l.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(l.slug, l.size)}
                      aria-label="Remove item"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm">{inr(l.product.price * l.qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border p-6">
            <h2 className="text-2xl">SUMMARY</h2>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4">
              <span>Total</span>
              <span>{inr(subtotal)}</span>
            </div>
            <button
              onClick={() => {
                clear();
                setPlaced(true);
              }}
              className="mt-6 w-full bg-primary py-4 text-xs font-semibold tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-80"
            >
              CHECKOUT
            </button>
            <Link
              to="/shop"
              className="mt-3 block w-full border border-border py-4 text-center text-xs tracking-[0.2em] hover:border-foreground"
            >
              CONTINUE SHOPPING
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
