import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop All Silver Jewellery — AURVM" },
      {
        name: "description",
        content:
          "Browse every AURVM piece: 925 silver chains, signet rings, spike hoops and hammered cuffs. Limited drops, no restocks.",
      },
      { property: "og:title", content: "Shop All Silver Jewellery — AURVM" },
      {
        property: "og:description",
        content: "Every AURVM piece in solid 925 silver. Limited drops, no restocks.",
      },
    ],
  }),
  component: ShopIndex,
});

function ShopIndex() {
  return (
    <div className="px-4 py-14 md:px-8">
      <p className="eyebrow text-muted-foreground">ALL PRODUCTS</p>
      <h1 className="mt-2 text-5xl md:text-7xl">THE FULL RANGE</h1>
      <div className="mt-8 flex flex-wrap gap-6">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to="/shop/$category"
            params={{ category: c.slug }}
            className="pb-1 text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            {c.label.toUpperCase()}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
