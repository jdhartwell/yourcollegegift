// pages/api/fanatics-sync.js
import fs from "fs";
import path from "path";

const ACCOUNT_SID = process.env.IMPACT_ACCOUNT_SID;
const ACCESS_TOKEN = process.env.IMPACT_ACCESS_TOKEN;
const BRAND_NAME = "Fanatics";
const API_BASE = "https://api.impact.com";
const PAGE_SIZE = 100;

async function getJson(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

async function getCatalogId() {
  let page = 1;
  while (true) {
    const data = await getJson(`${API_BASE}/Mediapartners/${ACCOUNT_SID}/Catalogs?Page=${page}&PageSize=100`);
    const match = data.Catalogs?.find((c) => c.AdvertiserName === BRAND_NAME);
    if (match) return match.Id;
    if (!data.HasMoreRecords) break;
    page++;
  }
  throw new Error(`Catalog for ${BRAND_NAME} not found`);
}

async function fetchAllProducts(catalogId) {
  let all = [];
  let page = 1;
  while (true) {
    const data = await getJson(`${API_BASE}/Mediapartners/${ACCOUNT_SID}/Catalogs/${catalogId}/Items?Page=${page}&PageSize=${PAGE_SIZE}`);
    all = all.concat(data.Items || []);
    if (!data.HasMoreRecords) break;
    page++;
    // small delay to be friendly to the API
    await new Promise((r) => setTimeout(r, 200));
  }
  return all;
}

export default async function handler(req, res) {
  try {
    if (!ACCOUNT_SID || !ACCESS_TOKEN) throw new Error("Missing IMPACT_ACCOUNT_SID or IMPACT_ACCESS_TOKEN env vars");
    const catalogId = await getCatalogId();
    const products = await fetchAllProducts(catalogId);

    // Persist to /public for static usage and SEO
    const outPath = path.join(process.cwd(), "public", "fanatics_products.json");
    fs.writeFileSync(outPath, JSON.stringify(products, null, 2), "utf-8");

    res.status(200).json({ ok: true, count: products.length, file: "/fanatics_products.json" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
}