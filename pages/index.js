// pages/index.js
import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import GiftIdeas from "@/components/GiftIdeas";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "fanatics_products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Simple heuristic to surface a handful of featured products
  const featured = products.slice(0, 12);

  // Gift ideas (content-forward for SEO)
  const ideas = [
    { title: "Dorm Room Essentials", subtitle: "Cozy, useful, and school-spirited picks", examples: ["Fleece throws", "Stainless tumblers", "Team blankets"] },
    { title: "Game Day Must-Haves", subtitle: "Gear to stand out in the student section", examples: ["Hoodies & tees", "Sideline caps", "Face decals"] },
    { title: "Alumni Gifts", subtitle: "Celebrate grads and alumni with timeless items", examples: ["Leather wallets", "Decanter sets", "Premium polos"] },
    { title: "Budget-Friendly Picks", subtitle: "Great gifts under $35", examples: ["Keychains", "Socks", "Beanies"] },
    { title: "Cold-Weather Gear", subtitle: "Layer up when the season turns", examples: ["Quarter-zips", "Puffer vests", "Scarves"] },
    { title: "Tailgate Party Kit", subtitle: "Turn parking-lot hangouts into traditions", examples: ["Cornhole sets", "Coolers", "Team chairs"] },
  ];

  return { props: { featured, ideas } };
}

export default function Home({ featured, ideas }) {
  return (
    <Layout title="College Gift Ideas | YourCollegeGift.com" description="Find the best college gift ideas and official Fanatics gear for students, alumni, and fans.">
      <section className="text-center py-16">
        <div className="inline-flex items-center gap-3 bg-white border border-black/5 rounded-2xl px-4 py-2 shadow-soft">
          <div className="badge">New</div>
          <p className="text-sm text-black/70">Curated college gift ideas + official Fanatics gear</p>
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
          The smartest way to shop <span className="text-brand-orange">college gifts</span>
        </h1>
        <p className="mt-4 text-black/70 max-w-2xl mx-auto">
          Discover curated picks by school, category, and price — all from trusted Fanatics partners.
          We may earn commissions from qualifying purchases.
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight">Featured Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {featured.map((p, i) => <ProductCard key={p.Id || i} product={p} />)}
        </div>
      </section>

      <GiftIdeas ideas={ideas} />
    </Layout>
  );
}