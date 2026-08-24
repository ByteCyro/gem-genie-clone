import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User, ChevronDown, Menu } from "lucide-react";

import hero from "@/assets/hero.jpg";
import editorial from "@/assets/editorial.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURVM — Bold Silver Jewellery, Chains, Rings & Cuffs" },
      {
        name: "description",
        content:
          "AURVM crafts heavyweight 925 silver chains, signet rings, hoops and cuffs. Limited drops, no restocks, ships in 48 hours.",
      },
      { property: "og:title", content: "AURVM — Bold Silver Jewellery" },
      {
        property: "og:description",
        content:
          "Heavyweight 925 silver chains, signet rings, hoops and cuffs. Limited drops, no restocks.",
      },
    ],
  }),
  component: Index,
});

const NAV = ["NEW DROPS", "CHAINS", "RINGS", "EARRINGS", "BRACELETS"];

type Product = {
  name: string;
  img: string;
  price: number;
  mrp: number;
  cat: string;
};

const PRODUCTS: Product[] = [
  { name: "Vantage Cuban Chain", img: p1, price: 4299, mrp: 6499, cat: "CHAINS" },
  { name: "Crest Signet Ring", img: p2, price: 2899, mrp: 3999, cat: "RINGS" },
  { name: "Spike Hoop Earrings", img: p3, price: 1899, mrp: 2799, cat: "EARRINGS" },
  { name: "Forge Hammered Cuff", img: p4, price: 3499, mrp: 4999, cat: "BRACELETS" },
  { name: "Vigil Cross Pendant", img: p5, price: 2299, mrp: 3499, cat: "CHAINS" },
  { name: "Onyx Stack Ring Set", img: p6, price: 2699, mrp: 3899, cat: "RINGS" },
];

const TICKER = ["SHIPS UNDER 48 HOURS", "LIMITED QUANTITIES", "NO RESTOCKS", "925 STERLING SILVER"];

function useCountdown(hours = 12) {
  const [left, setLeft] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  return {
    d: String(Math.floor(left / 86400)).padStart(2, "0"),
    h: String(Math.floor((left % 86400) / 3600)).padStart(2, "0"),
    m: String(Math.floor((left % 3600) / 60)).padStart(2, "0"),
    s: String(left % 60).padStart(2, "0"),
  };
}

function ProductCard({ product }: { product: Product }) {
  const save = Math.round(100 - (product.price / product.mrp) * 100);
  return (
    <article className="group">
      <div className="relative overflow-hidden bg-secondary">
        <span className="absolute left-0 top-0 z-10 bg-accent px-2 py-1 text-[0.65rem] font-semibold tracking-widest text-accent-foreground">
          SAVE {save}%
        </span>
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          width={900}
          height={1100}
          className="aspect-[9/11] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button className="absolute inset-x-0 bottom-0 translate-y-full bg-primary py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground transition-transform duration-300 group-hover:translate-y-0">
          CHOOSE OPTIONS
        </button>
      </div>
      <h3 className="mt-3 text-lg font-normal tracking-wide text-foreground">{product.name}</h3>
      <p className="mt-1 text-sm">
        <span className="text-foreground">Rs. {product.price.toLocaleString("en-IN")}</span>{" "}
        <span className="text-muted-foreground line-through">
          Rs. {product.mrp.toLocaleString("en-IN")}
        </span>
      </p>
    </article>
  );
}

function Index() {
  const { d, h, m, s } = useCountdown();
  const [tab, setTab] = useState("CHAINS");
  const filtered = PRODUCTS.filter((p) => p.cat === tab);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* announcement */}
      <div className="border-b border-border bg-background py-2 text-center">
        <p className="eyebrow text-muted-foreground">LOVED BY 120,000+ CUSTOMERS ★</p>
      </div>

      {/* promo + countdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-8">
        <p className="eyebrow">FESTIVE SILVER SALE \\ UPTO 40% OFF</p>
        <div className="flex items-center gap-3">
          {[
            [d, "DAY"],
            [h, "HRS"],
            [m, "MIN"],
            [s, "SEC"],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-xl leading-none">{v}</div>
              <div className="text-[0.55rem] tracking-[0.2em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* hero with overlay nav */}
      <header className="relative">
        <img
          src={hero}
          alt="Models wearing layered silver chains and rings"
          width={1920}
          height={1088}
          className="h-[68vh] w-full object-cover md:h-[86vh]"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-5 md:px-8">
          <a href="/" className="font-display text-2xl tracking-[0.3em]">
            AURVM
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href="#drops"
                className="text-xs font-medium tracking-[0.18em] transition-opacity hover:opacity-60"
              >
                {item}
              </a>
            ))}
            <a href="#drops" className="flex items-center gap-2 text-xs tracking-[0.18em]">
              <span className="h-2 w-2 rounded-full bg-accent" /> CLEARANCE
              <span className="bg-accent px-1.5 py-0.5 text-[0.6rem] text-accent-foreground">
                SALE
              </span>
            </a>
          </nav>
          <div className="flex items-center gap-5">
            <button className="hidden items-center gap-1 text-xs tracking-widest md:flex">
              INR ₹ <ChevronDown className="h-3 w-3" />
            </button>
            <User className="h-5 w-5" />
            <Search className="h-5 w-5" />
            <ShoppingBag className="h-5 w-5" />
            <Menu className="h-5 w-5 lg:hidden" />
          </div>
        </div>
        <div className="absolute bottom-14 left-4 max-w-xl md:left-8">
          <p className="eyebrow text-muted-foreground">DROP 04 — SILVER RITUAL</p>
          <h1 className="mt-2 text-6xl leading-[0.9] md:text-8xl">
            WEIGHT YOU
            <br />
            CAN FEEL
          </h1>
          <a
            href="#drops"
            className="mt-6 inline-block bg-primary px-8 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-80"
          >
            SHOP THE DROP
          </a>
        </div>
      </header>

      {/* marquee */}
      <div className="overflow-hidden border-y border-border bg-secondary py-3">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
                <span key={`${k}-${i}`} className="eyebrow px-8 text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* just dropped */}
      <section id="drops" className="px-4 py-16 md:px-8">
        <div className="text-center">
          <p className="eyebrow text-muted-foreground">NEW ARRIVALS</p>
          <h2 className="mt-2 text-5xl md:text-6xl">JUST DROPPED</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* category tabs */}
      <section className="border-t border-border px-4 py-16 md:px-8">
        <div className="flex flex-wrap justify-center gap-6">
          {["CHAINS", "RINGS", "EARRINGS", "BRACELETS"].map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`pb-1 text-xs tracking-[0.2em] transition-colors ${
                tab === c
                  ? "border-b border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* editorial */}
      <section className="relative">
        <img
          src={editorial}
          alt="Close-up of layered silver chains on a model"
          loading="lazy"
          width={1400}
          height={900}
          className="h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 text-center">
          <h2 className="text-5xl md:text-7xl">MADE IN 925</h2>
          <p className="mt-3 max-w-md px-6 text-sm text-muted-foreground">
            Solid sterling silver, anti-tarnish finished and hand-polished in small batches. Once a
            drop sells out, it never comes back.
          </p>
        </div>
      </section>

      {/* value props */}
      <section className="grid gap-px border-y border-border bg-border md:grid-cols-3">
        {[
          ["48 HOUR DISPATCH", "Every order leaves our studio within two days."],
          ["LIFETIME POLISH", "Free re-polishing on all AURVM pieces, forever."],
          ["EASY RETURNS", "7-day no-questions returns across India."],
        ].map(([t, sub]) => (
          <div key={t} className="bg-background px-6 py-10 text-center">
            <h3 className="text-2xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
          </div>
        ))}
      </section>

      <footer className="px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl tracking-[0.3em]">AURVM</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Heavyweight silver jewellery for people who don't do subtle.
            </p>
          </div>
          {[
            ["SHOP", ["Chains", "Rings", "Earrings", "Bracelets"]],
            ["HELP", ["Shipping", "Returns", "Size Guide", "Care"]],
            ["BRAND", ["Our Story", "Contact", "Terms", "Privacy"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <h3 className="text-lg">{title as string}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {(items as string[]).map((i) => (
                  <li key={i}>
                    <a href="#drops" className="hover:text-foreground">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AURVM. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
