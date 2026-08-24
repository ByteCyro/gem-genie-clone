import { Link } from "@tanstack/react-router";
import { inr, savePercent, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden bg-secondary"
      >
        <span className="absolute left-0 top-0 z-10 bg-accent px-2 py-1 text-[0.65rem] font-semibold tracking-widest text-accent-foreground">
          SAVE {savePercent(product)}%
        </span>
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          width={900}
          height={1100}
          className="aspect-[9/11] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-primary py-3 text-center text-xs font-semibold tracking-[0.2em] text-primary-foreground transition-transform duration-300 group-hover:translate-y-0">
          VIEW PRODUCT
        </span>
      </Link>
      <h3 className="mt-3 text-lg font-normal tracking-wide">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm">
        <span>{inr(product.price)}</span>{" "}
        <span className="text-muted-foreground line-through">{inr(product.mrp)}</span>
      </p>
    </article>
  );
}
