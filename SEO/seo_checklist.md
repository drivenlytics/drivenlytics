# Drivenlytics SEO Checklist
> Everything Yoast/RankMath handles on WP — ported for our Next.js/Vite build.
> Edit values in [ ] before implementing.

---

## 1. Meta Tags (index.html)
- [ ] `<title>` — [Drivenlytics | Performance Marketing Agency]
- [ ] `<meta name="description">` — [150–160 chars. Write this.]
- [ ] `<meta name="robots" content="index, follow">`
- [ ] `<link rel="canonical" href="https://drivenlytics.com">`

---

## 2. Open Graph — Facebook & LinkedIn (index.html)
- [ ] `og:title` — [same as title tag or variant]
- [ ] `og:description` — [same as meta description or shorter]
- [ ] `og:url` — https://drivenlytics.com
- [ ] `og:type` — website
- [ ] `og:image` — [1200x630px image URL — need to create this asset]
- [ ] `og:site_name` — Drivenlytics

---

## 3. Twitter Card (index.html)
- [ ] `twitter:card` — summary_large_image
- [ ] `twitter:title` — [same as og:title]
- [ ] `twitter:description` — [same as og:description]
- [ ] `twitter:image` — [same as og:image]

---

## 4. Schema / Structured Data — JSON-LD (index.html)
- [ ] **Organization** — name, url, logo, sameAs (LinkedIn, etc.)
- [ ] **WebSite** — name, url, potentialAction (sitelinks searchbox)
- [ ] **Service** — for each service tier (Launch Ready, Brand Kit, Retainer, Custom)
- [ ] **AggregateRating** — pull star count from testimonials (shows stars in Google)
- [ ] **Person** — Lawrence as founder (links personal brand to agency)

---

## 5. Heading Hierarchy (Sections.tsx)
- [ ] `<h1>` — one only, keyword-optimized [current: "DRIVENLYTICS" — needs work]
- [ ] `<h2>` — section headings keyword-optimized
- [ ] `<h3>` — service/subsection headings
- [ ] Audit: no skipped heading levels (h1 → h3 without h2)

---

## 6. Image SEO (Sections.tsx + assets)
- [ ] Logo `alt` tag — [Drivenlytics logo]
- [ ] All images have descriptive `alt` attributes
- [ ] OG image created (1200x630px) and hosted at /og-image.png

---

## 7. sitemap.xml (public/)
- [ ] Create `/public/sitemap.xml`
- [ ] List all URLs (just homepage for now)
- [ ] Submit to Google Search Console

---

## 8. robots.txt (public/)
- [ ] Create `/public/robots.txt`
- [ ] Allow all crawlers
- [ ] Point to sitemap: `Sitemap: https://drivenlytics.com/sitemap.xml`

---

## 9. Focus Keyword Strategy
- [ ] Define primary keyword — [e.g. "performance marketing agency"]
- [ ] Define secondary keywords — [e.g. "conversion copywriter", "marketing agency for coaches"]
- [ ] Primary keyword in: title, h1, meta description, first paragraph
- [ ] Secondary keywords in: h2s, body copy

---

## 10. Content (future — not blocking launch)
- [ ] Each service gets its own page with unique meta/schema
- [ ] Blog / SEO content strategy
- [ ] Internal linking between pages

---

## Assets Needed Before Full Implementation
- [ ] OG image (1200x630px) — brand banner for social sharing previews
- [ ] Confirm domain is live at drivenlytics.com
- [ ] Confirm GSC verified
