// pages/products/[slug].js
import fs from "fs";
import path from "path";
import Image from "next/image";
import Layout from "@/components/Layout";

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

function toSlug(product) {
  const id = product.Id || product.SKU || product.ExternalId || "item";
  const name = product.Name || "product";
  return `${slugify(name)}-${id}`;
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "public", "fanatics_products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const paths = products.slice(0, 5000).map((p) => ({ params: { slug: toSlug(p) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "public", "fanatics_products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const product = products.find((p) => toSlug(p) === params.slug);
  return { props: { product } };
}

export default function ProductPage({ product }) {
  const name = product?.Name || "College Gear";
  const price = product?.Price ? `$${Number(product.Price).toFixed(2)}` : "";
  const image = product?.ImageURL || "/placeholder.png";
  const url = product?.ClickURL || "#";
  const description = product?.Description || "Officially licensed collegiate gear.";

  return (
    <Layout title={`${name} | YourCollegeGift.com`} description={description}>
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        <div className="card overflow-hidden">
          <div className="relative aspect-square">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        </div>
        <div>
          <div className="badge">Official Fanatics</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{name}</h1>
          {price && <p className="mt-2 text-xl">{price}</p>}
          <p className="mt-4 text-black/70 max-w-prose">{description}</p>

          <div className="mt-6 flex gap-3">
            <a className="btn-primary" href={url} target="_blank" rel="nofollow sponsored noopener">
              Buy on Fanatics
            </a>
            <a className="btn" href="/gift-ideas">More Gift Ideas</a>
          </div>

          <ul className="mt-8 text-sm text-black/70 space-y-2">
            {product.Category && <li><strong>Category:</strong> {product.Category}</li>}
            {product.Brand && <li><strong>Brand:</strong> {product.Brand}</li>}
          </ul>
        </div>
      </div>
    </Layout>
  );
}