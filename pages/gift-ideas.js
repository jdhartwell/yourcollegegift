// pages/gift-ideas.js
import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";

function extractSchool(name = "") {
  const m = name.match(/([A-Z][a-zA-Z]+(?:\s(State|College|University|Tech|A&M))?)/);
  return m ? m[0] : null;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "fanatics_products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Group by inferred school keyword
  const map = new Map();
  for (const p of products) {
    const key = extractSchool(p.Name) || "Popular";
    if (!map.get(key)) map.set(key, []);
    map.get(key).push(p);
  }

  // Create sections
  const sections = Array.from(map.entries()).slice(0, 12).map(([school, list]) => ({
    school,
    items: list.slice(0, 6)
  }));

  return { props: { sections } };
}

export default function GiftIdeas({ sections }) {
  return (
    <Layout title="College Gift Ideas by School | YourCollegeGift.com" description="Browse curated college gift ideas grouped by school and category.">
      <h1 className="text-4xl font-semibold tracking-tight">Gift Ideas by School</h1>
      <p className="text-black/70 mt-2">Explore quick picks by school — a great starting point for birthdays, care packages, and game-day surprises.</p>
      <div className="mt-8 space-y-12">
        {sections.map((sec) => (
          <section key={sec.school}>
            <h2 className="text-xl font-semibold mb-4">{sec.school}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sec.items.map((p, i) => <ProductCard key={p.Id || i} product={p} />)}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}