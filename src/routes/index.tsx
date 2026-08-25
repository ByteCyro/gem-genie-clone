import { createFileRoute, Link } from "@tanstack/react-router";

import hero from "@/assets/hero.jpg";
import editorial from "@/assets/editorial.jpg";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

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

const TICKER = ["SHIPS UNDER 48 HOURS", "LIMITED QUANTITIES", "NO RESTOCKS", "925 STERLING SILVER"];

function Index() {
  return (
    <div>
      {/* hero */}
      <section className="relative">
        <img
          src={hero}
          alt="Models wearing layered silver chains and rings"
          width={1920}
          height={1088}
          className="h-[68vh] w-full object-cover md:h-[86vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        <div className="absolute bottom-14 left-4 max-w-xl md:left-8">
          <p className="eyebrow text-muted-foreground">DROP 04 — SILVER RITUAL</p>
          <h1 className="mt-2 text-6xl leading-[0.9] md:text-8xl">
            WEIGHT YOU
            <br />
            CAN FEEL
          </h1>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-primary px-8 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-80"
          >
            SHOP THE DROP
          </Link>
        </div>
      </section>

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
      <section className="px-4 py-16 md:px-8">
        <div className="text-center">
          <p className="eyebrow text-muted-foreground">NEW ARRIVALS</p>
          <h2 className="mt-2 text-5xl md:text-6xl">JUST DROPPED</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-block border border-border px-8 py-3 text-xs font-semibold tracking-[0.2em] transition-colors hover:border-foreground"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </section>

      {/* categories */}
      <section className="border-t border-border px-4 py-16 md:px-8">
        <div className="text-center">
          <p className="eyebrow text-muted-foreground">COLLECTIONS</p>
          <h2 className="mt-2 text-5xl md:text-6xl">SHOP BY CATEGORY</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className="group bg-background px-6 py-12 text-center transition-colors hover:bg-secondary"
            >
              <h3 className="text-3xl">{c.label.toUpperCase()}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{c.blurb}</p>
              <p className="eyebrow mt-4 text-muted-foreground transition-colors group-hover:text-foreground">
                SHOP NOW →
              </p>
            </Link>
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
          <Link
            to="/about"
            className="mt-6 inline-block border border-foreground px-8 py-3 text-xs font-semibold tracking-[0.2em] transition-opacity hover:opacity-70"
          >
            OUR STORY
          </Link>
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
    </div>
  );
}
