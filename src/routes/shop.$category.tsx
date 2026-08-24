import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { byCategory, CATEGORIES, type CategorySlug } from "@/lib/products";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.slug === params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Collection not found — AURVM" }, { name: "robots", content: "noindex" }],
      };
    }
    const { label, blurb } = loaderData.category;
    return {
      meta: [
        { title: `${label} — Solid 925 Silver ${label} | AURVM` },
        { name: "description", content: blurb },
        { property: "og:title", content: `${label} — AURVM` },
        { property: "og:description", content: blurb },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const products = byCategory(category.slug as CategorySlug);

  return (
    <div className="px-4 py-14 md:px-8">
      <p className="eyebrow text-muted-foreground">COLLECTION</p>
      <h1 className="mt-2 text-5xl md:text-7xl">{category.label.toUpperCase()}</h1>
      <p className="mt-3 max-w-lg text-sm text-muted-foreground">{category.blurb}</p>
      <div className="mt-8 flex flex-wrap gap-6">
        <Link to="/shop" className="pb-1 text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground">
          ALL
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to="/shop/$category"
            params={{ category: c.slug }}
            className={`pb-1 text-xs tracking-[0.2em] ${
              c.slug === category.slug
                ? "border-b border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.label.toUpperCase()}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
