import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart";
import { getProduct, inr, PRODUCTS, savePercent } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData }) => {
    const product = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!product) {
      return {
        meta: [{ title: "Product not found — AURVM" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: `${product.name} — ${product.material} | AURVM` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — AURVM` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const product = getProduct(slug)!;
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0]!);
  const [added, setAdded] = useState(false);

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="px-4 py-10 md:px-8">
      <nav className="eyebrow text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">
          SHOP
        </Link>{" "}
        /{" "}
        <Link
          to="/shop/$category"
          params={{ category: product.category }}
          className="hover:text-foreground"
        >
          {product.category.toUpperCase()}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative bg-secondary">
          <span className="absolute left-0 top-0 z-10 bg-accent px-2 py-1 text-[0.65rem] font-semibold tracking-widest text-accent-foreground">
            SAVE {savePercent(product)}%
          </span>
          <img
            src={product.img}
            alt={product.name}
            width={900}
            height={1100}
            className="aspect-[9/11] w-full object-cover"
          />
        </div>

        <div className="lg:pt-6">
          <h1 className="text-4xl md:text-6xl">{product.name.toUpperCase()}</h1>
          <p className="mt-3 text-lg">
            {inr(product.price)}{" "}
            <span className="text-muted-foreground line-through">{inr(product.mrp)}</span>
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="eyebrow text-muted-foreground">SIZE</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 text-xs tracking-widest transition-colors ${
                    size === s
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              add(product.slug, size);
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
            className="mt-8 flex w-full items-center justify-center gap-2 bg-primary py-4 text-xs font-semibold tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-80 md:w-80"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> ADDED TO CART
              </>
            ) : (
              "ADD TO CART"
            )}
          </button>
          <Link
            to="/cart"
            className="mt-3 block w-full border border-border py-4 text-center text-xs font-semibold tracking-[0.2em] hover:border-foreground md:w-80"
          >
            VIEW CART
          </Link>

          <dl className="mt-10 border-t border-border pt-6 text-sm">
            <div className="flex justify-between border-b border-border py-3">
              <dt className="text-muted-foreground">Material</dt>
              <dd>{product.material}</dd>
            </div>
            {product.details.map((d) => (
              <div key={d} className="border-b border-border py-3 text-muted-foreground">
                {d}
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-4xl">YOU MIGHT ALSO LIKE</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
