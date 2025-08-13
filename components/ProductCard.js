// components/ProductCard.js
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const price = product.Price ? `$${Number(product.Price).toFixed(2)}` : "";
  const url = product.ClickURL || "#";
  const image = product.ImageURL || "/placeholder.png";
  const name = product.Name || "College Gear";
  const id = product.Id || product.SKU || name;
  const slug = `${slugify(name)}-${id}`;

  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-square">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium line-clamp-2">{name}</h3>
        {price && <p className="mt-1 text-black/70">{price}</p>}
        <div className="mt-4 flex items-center gap-2">
          <a className="btn-primary" href={url} target="_blank" rel="nofollow sponsored noopener">
            View on Fanatics
          </a>
          <Link className="btn" href={`/products/${slug}`}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}