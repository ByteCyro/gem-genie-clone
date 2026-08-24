import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — AURVM Silver Jewellery" },
      {
        name: "description",
        content:
          "Questions on sizing, shipping or returns? Message the AURVM studio and we reply within one working day.",
      },
      { property: "og:title", content: "Contact & Support — AURVM" },
      {
        property: "og:description",
        content: "Sizing, shipping and returns help from the AURVM studio.",
      },
    ],
  }),
  component: ContactPage,
});

const FAQ: [string, string][] = [
  ["How fast do you ship?", "Every order leaves the studio within 48 hours, India-wide."],
  ["Can I return a piece?", "Yes — 7 days, unworn, with the original pouch."],
  ["How do I find my ring size?", "Message us your finger circumference in mm and we'll size it."],
  ["Will it tarnish?", "All pieces are anti-tarnish finished; free re-polishing for life."],
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="px-4 py-14 md:px-8">
      <p className="eyebrow text-muted-foreground">WE REPLY IN ONE WORKING DAY</p>
      <h1 className="mt-2 text-5xl md:text-7xl">GET IN TOUCH</h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-2">
        <div>
          {sent ? (
            <div className="border border-border p-8">
              <h2 className="text-3xl">MESSAGE SENT</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Thanks for reaching out — the studio will get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label htmlFor="name" className="eyebrow text-muted-foreground">
                  NAME
                </label>
                <input
                  id="name"
                  required
                  className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground"
                />
              </div>
              <div>
                <label htmlFor="email" className="eyebrow text-muted-foreground">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground"
                />
              </div>
              <div>
                <label htmlFor="message" className="eyebrow text-muted-foreground">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary py-4 text-xs font-semibold tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-80 md:w-64"
              >
                SEND MESSAGE
              </button>
            </form>
          )}
          <div className="mt-10 space-y-1 text-sm text-muted-foreground">
            <p>studio@aurvm.example</p>
            <p>+91 98000 00000 · Mon–Sat, 10am–7pm IST</p>
            <p>Unit 4, Silver Lane, Mumbai 400001</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl">FAQ</h2>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {FAQ.map(([q, a]) => (
              <div key={q} className="py-5">
                <dt className="text-sm font-semibold">{q}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
