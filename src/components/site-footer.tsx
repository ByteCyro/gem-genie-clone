import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-14 md:px-8">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl tracking-[0.3em]">AURVM</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Heavyweight silver jewellery for people who don't do subtle.
          </p>
        </div>
        <div>
          <h3 className="text-lg">SHOP</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop/$category"
                  params={{ category: c.slug }}
                  className="hover:text-foreground"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg">HELP</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Size Guide
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Care Guide
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-foreground">
                Your Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg">BRAND</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-foreground">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AURVM. All rights reserved.
      </p>
    </footer>
  );
}
