
# YourCollegeGift.com — Next.js + Tailwind + impact.com

Apple-inspired affiliate SEO starter that:
- Pulls the **Fanatics** catalog via **impact.com Publisher API**
- Saves the dataset to `/public/fanatics_products.json`
- Generates **SEO-friendly static pages** for products
- Presents a clean, modern, high-contrast UI

## Quickstart

```bash
# 1) Extract & install
npm i

# 2) Configure env
cp .env.local.example .env.local
# Add your Impact.com creds
# IMPACT_ACCOUNT_SID=...
# IMPACT_ACCESS_TOKEN=...

# 3) Run the dev server
npm run dev

# 4) In another terminal, sync products
curl http://localhost:3000/api/fanatics-sync

# 5) Visit the site
open http://localhost:3000
```

## Notes
- **CTA buttons** use `rel="nofollow sponsored noopener"` and open Fanatics product links in a new tab.
- Product pages are generated statically from `public/fanatics_products.json` with pretty slugs.
- You can adjust the home page copy/sections in `pages/index.js` and `pages/gift-ideas.js`.

## Production Build

```bash
# After syncing (to ensure JSON exists)
npm run build
npm run start
```

## Customization
- Colors are defined in `tailwind.config.js` under `theme.extend.colors.brand`.
- Layout and Apple-like UI lives in `components/Layout.js` and `styles/globals.css`.
- To change the brand name across the site, search for `YourCollegeGift.com` in the repo.
