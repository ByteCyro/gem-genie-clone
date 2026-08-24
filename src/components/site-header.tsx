import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

import { CATEGORIES } from "@/lib/products";
import { useCart } from "@/lib/cart";

function Countdown() {
  const [left, setLeft] = useState(12 * 3600);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const parts: [string, string][] = [
    [String(Math.floor(left / 86400)).padStart(2, "0"), "DAY"],
    [String(Math.floor((left % 86400) / 3600)).padStart(2, "0"), "HRS"],
    [String(Math.floor((left % 3600) / 60)).padStart(2, "0"), "MIN"],
    [String(left % 60).padStart(2, "0"), "SEC"],
  ];
  return (
    <div className="flex items-center gap-3">
      {parts.map(([v, l]) => (
        <div key={l} className="text-center">
          <div className="font-display text-xl leading-none">{v}</div>
          <div className="text-[0.55rem] tracking-[0.2em] text-muted-foreground">{l}</div>
        </div>
      ))}
    </div>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      <Link
        to="/shop"
        className="text-xs font-medium tracking-[0.18em] transition-opacity hover:opacity-60"
        onClick={() => setOpen(false)}
      >
        NEW DROPS
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          to="/shop/$category"
          params={{ category: c.slug }}
          className="text-xs font-medium tracking-[0.18em] transition-opacity hover:opacity-60"
          onClick={() => setOpen(false)}
        >
          {c.label.toUpperCase()}
        </Link>
      ))}
      <Link
        to="/about"
        className="text-xs font-medium tracking-[0.18em] transition-opacity hover:opacity-60"
        onClick={() => setOpen(false)}
      >
        ABOUT
      </Link>
      <Link
        to="/contact"
        className="text-xs font-medium tracking-[0.18em] transition-opacity hover:opacity-60"
        onClick={() => setOpen(false)}
      >
        CONTACT
      </Link>
    </>
  );

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30"
          : "sticky top-0 z-30 border-b border-border bg-background"
      }
    >
      {!overlay && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2 md:px-8">
          <p className="eyebrow">FESTIVE SILVER SALE \\ UPTO 40% OFF</p>
          <Countdown />
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-5 md:px-8">
        <Link to="/" className="font-display text-2xl tracking-[0.3em]">
          AURVM
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">{nav}</nav>
        <div className="flex items-center gap-5">
          <Link to="/shop" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/contact" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border bg-background px-4 py-6 lg:hidden">
          {nav}
        </nav>
      )}
    </header>
  );
}
