import { createFileRoute, Link } from "@tanstack/react-router";
import editorial from "@/assets/editorial.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Hand-Finished 925 Silver | AURVM" },
      {
        name: "description",
        content:
          "AURVM casts heavyweight sterling silver jewellery in small batches. Learn how our drops, materials and lifetime polish promise work.",
      },
      { property: "og:title", content: "Our Story — AURVM" },
      {
        property: "og:description",
        content: "Heavyweight 925 silver, cast and hand-finished in small batches.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="px-4 py-16 md:px-8">
        <p className="eyebrow text-muted-foreground">SINCE 2019</p>
        <h1 className="mt-2 max-w-3xl text-5xl leading-[0.95] md:text-7xl">
          SILVER THAT ACTS LIKE ARMOUR
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          AURVM started in a two-bench studio with one rule: nothing hollow. Every chain, ring and
          cuff is cast in solid 925 sterling silver, filed by hand and polished until it throws
          light. We drop in small runs, and when a run sells out it does not come back.
        </p>
      </section>

      <img
        src={editorial}
        alt="Layered silver chains photographed close up"
        loading="lazy"
        width={1400}
        height={900}
        className="h-[50vh] w-full object-cover"
      />

      <section className="grid gap-px border-y border-border bg-border md:grid-cols-3">
        {[
          ["SOLID, NEVER PLATED", "925 sterling throughout — no filler, no flash-plating."],
          ["SMALL BATCH", "Runs of 150 pieces or fewer, then the mould is retired."],
          ["LIFETIME POLISH", "Send any AURVM piece back for free re-polishing, forever."],
        ].map(([t, s]) => (
          <div key={t} className="bg-background px-6 py-12">
            <h2 className="text-2xl">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s}</p>
          </div>
        ))}
      </section>

      <section className="px-4 py-16 text-center md:px-8">
        <h2 className="text-4xl md:text-5xl">WEAR IT EVERY DAY</h2>
        <Link
          to="/shop"
          className="mt-6 inline-block bg-primary px-8 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground"
        >
          SHOP THE RANGE
        </Link>
      </section>
    </div>
  );
}
