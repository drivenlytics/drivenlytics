# Drivenlytics SEO Checklist
> Everything Yoast/RankMath handles on WP — ported for our Next.js/Vite build.

---

## 1. Meta Tags (index.html)
- [x] `<title>` — Drivenlytics | Data-Driven Performance Marketing Agency
- [x] `<meta name="description">` — 156 chars, confirmed
- [x] `<meta name="robots" content="index, follow">`
- [x] `<link rel="canonical" href="https://drivenlytics.com">`

---

## 2. Open Graph — Facebook & LinkedIn (index.html)
- [x] `og:title` — Drivenlytics | Data-Driven Performance Marketing Agency
- [x] `og:description` — same as meta description
- [x] `og:url` — https://drivenlytics.com
- [x] `og:type` — website
- [x] `og:image` — https://drivenlytics.com/og-image.png (1200x630px, created in Canva)
- [x] `og:site_name` — Drivenlytics

---

## 3. Twitter Card (index.html)
- [x] `twitter:card` — summary_large_image
- [x] `twitter:title` — Drivenlytics | Data-Driven Performance Marketing Agency
- [x] `twitter:description` — same as og:description
- [x] `twitter:image` — https://drivenlytics.com/og-image.png

---

## 4. Schema / Structured Data — JSON-LD (index.html)
- [ ] **Organization** — name, url, logo, sameAs (LinkedIn, etc.)
- [ ] **WebSite** — name, url, potentialAction (sitelinks searchbox)
- [ ] **Service** — for each service tier (Launch Ready, Brand Kit, Retainer, Custom)
- [ ] **AggregateRating** — pull star count from testimonials (shows stars in Google)
- [ ] **Person** — Lawrence as founder (links personal brand to agency)

---

## 5. Heading Hierarchy (Sections.tsx)

### h1
- [x] Visible: `DRIVENLYTICS`
- [x] sr-only: `DRIVENLYTICS - CRO High-Performance Marketing Solutions`

### h2s — edit sr-only text below, I'll implement
| Visible (on site) | sr-only (for Google) — edit this |
|---|---|
| Creative Strategic Breakthroughs | CRO High-Performance Marketing Services |
| Analytical Alchemy | Data-Driven Marketing Process & Strategy |
| Market Validation | Client Results & Testimonials |
| Across Markets | [your seo text here] |
| Ready to Conquer Your Market? | Work With a Performance Marketing Expert |

### h3s — edit sr-only text below, I'll implement
| Visible (on site) | sr-only (for Google) — edit this |
|---|---|
| Launch Kit | Landing Page & Email Marketing Kit |
| Brand Foundation Kit | Brand Building: Strategy & Identity |
| Content Retainer | Full-Funnel SEO Content Marketing Service |
| Custom / Full-Stack | Full-Stack Marketing & Web Development |
| Research & Strategy | Market Research & Competitive Analysis |
| Creatives & Persuasion | Brand Design & Conversion Copywriting |
| Execution | Marketing Implementation & Deployment |

---

## 6. Image SEO (Sections.tsx + assets)
- [ ] Logo `alt` tag — [Drivenlytics logo]
- [ ] All images have descriptive `alt` attributes
- [x] OG image created (1200x630px) and hosted at /og-image.png

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
- [x] Primary keyword — `Drivenlytics Lawrence` (ranks for brand + personal name searches)
- [ ] Secondary keywords — to be defined per content page
- [ ] Primary keyword in: h1, meta description, first paragraph
- [ ] Secondary keywords in: h2s, body copy

---

## 10. Content (future — not blocking launch)
- [ ] Each service gets its own page with unique meta/schema
- [ ] Blog / SEO content strategy
- [ ] Internal linking between pages

---

## Assets
- [x] OG image (1200x630px) — created and in /public/og-image.png
- [ ] Confirm domain is live at drivenlytics.com
- [ ] Confirm GSC verified
