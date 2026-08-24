import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Product = {
  slug: string;
  name: string;
  img: string;
  price: number;
  mrp: number;
  category: CategorySlug;
  material: string;
  description: string;
  details: string[];
  sizes: string[];
};

export type CategorySlug = "chains" | "rings" | "earrings" | "bracelets";

export const CATEGORIES: { slug: CategorySlug; label: string; blurb: string }[] = [
  { slug: "chains", label: "Chains", blurb: "Heavyweight links and pendants in solid 925 silver." },
  { slug: "rings", label: "Rings", blurb: "Signets, stacks and stones cast to be worn daily." },
  { slug: "earrings", label: "Earrings", blurb: "Hoops, studs and spikes with real presence." },
  { slug: "bracelets", label: "Bracelets", blurb: "Cuffs and chain bracelets with serious weight." },
];

export const PRODUCTS: Product[] = [
  {
    slug: "vantage-cuban-chain",
    name: "Vantage Cuban Chain",
    img: p1,
    price: 4299,
    mrp: 6499,
    category: "chains",
    material: "925 Sterling Silver",
    description:
      "A 7mm diamond-cut cuban link with a hand-polished mirror finish and a reinforced box clasp. Built to sit heavy and hold shape.",
    details: ["7mm width", "Reinforced box clasp", "Anti-tarnish rhodium finish", "Weighs 62g"],
    sizes: ['18"', '20"', '22"'],
  },
  {
    slug: "crest-signet-ring",
    name: "Crest Signet Ring",
    img: p2,
    price: 2899,
    mrp: 3999,
    category: "rings",
    material: "925 Sterling Silver",
    description:
      "A domed signet with a hand-engraved crest set in oxidised black. Rounded inner band for all-day wear.",
    details: ["18mm face", "Oxidised crest detail", "Comfort-fit band", "Weighs 14g"],
    sizes: ["16", "18", "20", "22"],
  },
  {
    slug: "spike-hoop-earrings",
    name: "Spike Hoop Earrings",
    img: p3,
    price: 1899,
    mrp: 2799,
    category: "earrings",
    material: "925 Sterling Silver",
    description:
      "Fine 35mm hoops loaded with solid cone spikes. Light on the ear, loud on the eye.",
    details: ["35mm diameter", "Solid cast spikes", "Hypoallergenic posts", "Sold as a pair"],
    sizes: ["One size"],
  },
  {
    slug: "forge-hammered-cuff",
    name: "Forge Hammered Cuff",
    img: p4,
    price: 3499,
    mrp: 4999,
    category: "bracelets",
    material: "925 Sterling Silver",
    description:
      "A wide open cuff finished with a hand-hammered texture that catches light from every angle.",
    details: ["20mm width", "Hand-hammered surface", "Adjustable open back", "Weighs 41g"],
    sizes: ["S/M", "L/XL"],
  },
  {
    slug: "vigil-cross-pendant",
    name: "Vigil Cross Pendant",
    img: p5,
    price: 2299,
    mrp: 3499,
    category: "chains",
    material: "925 Sterling Silver",
    description:
      "A sandblasted cross pendant with polished edges, hung on a fine cable chain. Quiet, but never plain.",
    details: ["32mm pendant", "Sandblasted centre", "Includes 20in cable chain", "Weighs 11g"],
    sizes: ['18"', '20"'],
  },
  {
    slug: "onyx-stack-ring-set",
    name: "Onyx Stack Ring Set",
    img: p6,
    price: 2699,
    mrp: 3899,
    category: "rings",
    material: "925 Silver & Black Onyx",
    description:
      "Three slim bands, one set with a cabochon black onyx. Wear stacked or split them across fingers.",
    details: ["Set of 3 bands", "Natural black onyx", "2mm band width", "Weighs 9g total"],
    sizes: ["16", "18", "20"],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const byCategory = (category: CategorySlug) =>
  PRODUCTS.filter((p) => p.category === category);

export const savePercent = (p: Product) => Math.round(100 - (p.price / p.mrp) * 100);

export const inr = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;
