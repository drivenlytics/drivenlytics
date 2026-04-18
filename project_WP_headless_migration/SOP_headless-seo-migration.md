# Case Study: SEO Audit — Headless WordPress Migration
**Site:** hangtherapy.com  
**Date:** April 2026  
**Setup:** WordPress backend (wp.hangtherapy.com) + Next.js frontend (Vercel) routed via Cloudflare

---

## The Setup

A headless WordPress architecture where:
- `hangtherapy.com` (homepage) → Cloudflare → Vercel (Next.js)
- `wp.hangtherapy.com` → WordPress admin/backend
- `hangtherapy.com/blog-slugs/` → WordPress content, still served via Cloudflare routing

The site was migrated from a traditional WordPress/Elementor build to this headless setup. The concern was whether SEO equity was preserved and whether any redirects or cleanup was needed.

---

## Concerns Going In

1. Ghost site risk — is `wp.hangtherapy.com` publicly crawlable by Google?
2. SEO juice — was any ranking authority lost in the migration?
3. 301 redirects — are any needed?
4. Competing sitemaps — who owns the sitemap now, WordPress or Next.js?

---

## Diagnostic Steps (Run These on Any Headless WP Migration)

### Step 1 — Audit the sitemaps

Visit these URLs in the browser:

| URL | What to look for |
|---|---|
| `yourdomain.com/sitemap.xml` | Is this Next.js or WordPress output? |
| `yourdomain.com/wp-sitemap.xml` | Does WordPress sitemap work on main domain? |
| `yourdomain.com/sitemap_index.xml` | Is RankMath/Yoast generating this? |
| `subdomain.yourdomain.com/sitemap.xml` | Is WP backend sitemap accessible? |

**What we found:** Next.js was generating `/sitemap.xml` and WordPress (RankMath) was generating `/sitemap_index.xml`. Both existed but `robots.txt` only pointed Google to the Next.js one — meaning all blog content sitemaps were invisible to Google.

---

### Step 2 — Check the WP subdomain for ghost site risk

1. Visit `wp.yourdomain.com` — does it load a full site?
2. Visit `wp.yourdomain.com/robots.txt` — is it open or blocked?
3. Google search: `site:wp.yourdomain.com` — are any pages indexed?

**What we found:** `wp.hangtherapy.com` redirected correctly to `hangtherapy.com` via Cloudflare. Google had not indexed it. No ghost site. The `robots.txt` on the WP subdomain revealed the real sitemap URL (`sitemap_index.xml`) — a useful data point.

**If the subdomain IS publicly indexed:** Add `Disallow: /` to `wp.yourdomain.com/robots.txt` or block it with Cloudflare Access (requires auth to visit).

---

### Step 3 — Verify blog/article URLs still resolve

Visit each URL listed in your sitemap and confirm:
- Does the page load?
- Does the URL stay the same or redirect?

**What we found:** All WordPress content pages (`/spinal-decompression/`, `/shoulder-impingement-guide/` etc.) loaded correctly at their original URLs via Cloudflare routing. No broken pages, no 301s needed.

---

### Step 4 — Check canonical tags on the homepage

View page source on `yourdomain.com` → search for `canonical`.

Confirm it reads: `<link rel="canonical" href="https://yourdomain.com"/>`

If it points to the WP subdomain or a staging URL, fix it immediately.

---

### Step 5 — Drill into the sitemap content

Visit each sitemap listed in `sitemap_index.xml`:
- `post-sitemap.xml` — lists blog posts
- `page-sitemap.xml` — lists pages

Confirm all your content pages appear and that their URLs load.

**What we found:**
- `post-sitemap.xml` had 1 URL (blog post)
- `page-sitemap.xml` had 5 URLs (content pages + homepage)
- Two URLs from the old Next.js sitemap (`/spine-age-quiz-assessment/`, `/our-privacy-policy/`) were correctly no-indexed in RankMath — an iframe page and a legal page. Both were correct decisions, not errors.

---

## Root Cause

**Two problems confirmed:**

### Problem 1 — robots.txt pointed to the wrong sitemap
Next.js generated `/sitemap.xml` and the `robots.js` file directed Google there. But `/sitemap.xml` only knew about the homepage — it had no knowledge of WordPress blog content. The real sitemap (`/sitemap_index.xml`) with all blog posts and pages existed but was never submitted to Google and was not referenced in `robots.txt`.

**Result:** Google's sitemap crawler was finding a partial map of the site, missing all blog content.

### Problem 2 — Next.js sitemap was claiming WordPress URLs
The Next.js `sitemap.js` file had hardcoded WordPress content URLs (`/spinal-decompression/`, `/shoulder-impingement-guide/` etc.). Next.js doesn't render these pages — WordPress does. This told Google "I own these pages" but with incorrect `lastModified` dates (always regenerated as "right now") and without proper content ownership.

---

## Resolution

### Fix 1 — Update `robots.js` to reference both sitemaps

```js
// Before
sitemap: "https://hangtherapy.com/sitemap.xml",

// After
sitemap: [
  "https://hangtherapy.com/sitemap_index.xml",  // RankMath (all WP content)
  "https://hangtherapy.com/sitemap.xml",          // Next.js (homepage only)
],
```

### Fix 2 — Strip WordPress URLs from Next.js sitemap

```js
// Before — Next.js claiming WordPress pages
const routes = [
  "",
  "/spinal-decompression/",
  "/shoulder-impingement-guide/",
  // ...more WP URLs
]

// After — Next.js only owns what it renders
return [
  {
    url: "https://hangtherapy.com",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
];
```

### Fix 3 — Submit both sitemaps in Google Search Console

Go to Search Console → Sitemaps → add:
- `sitemap_index.xml`
- `sitemap.xml`

This tells Google directly rather than waiting for it to crawl `robots.txt`.

---

## Final Verdict

| Question | Answer |
|---|---|
| Ghost site risk? | None — WP subdomain redirected correctly |
| SEO juice lost? | No — all URLs preserved, no slug changes |
| 301 redirects needed? | None |
| Sitemaps working? | Fixed — both now referenced in robots.txt |
| Missing pages? | Two intentionally no-indexed (quiz iframe + legal page) |

---

## Reusable Checklist for Future Headless WP Migrations

```
[ ] Check sitemap.xml — is it Next.js or WordPress output?
[ ] Check sitemap_index.xml — is RankMath/Yoast generating it?
[ ] Check robots.txt — does it reference the RankMath sitemap_index?
[ ] Check wp subdomain — does it redirect or expose a ghost site?
[ ] Google: site:wp.yourdomain.com — any pages indexed?
[ ] Visit all blog/article URLs — do they load? Do URLs stay clean?
[ ] Confirm Next.js sitemap only lists pages Next.js actually renders
[ ] Confirm WP sitemap covers all blog/article/page content
[ ] Check canonical tag on homepage — does it point to the right domain?
[ ] Submit both sitemaps in Google Search Console
[ ] No-index WP homepage in RankMath if Next.js now owns it (optional cleanup)
[ ] No-index iframe pages and legal pages in RankMath (correct practice)
```

---

## Key Principle

In a headless WordPress setup, **two systems both want to own the sitemap**. The rule is:

- **Next.js sitemap** = only pages Next.js actually renders (usually just the homepage)
- **WordPress sitemap (RankMath/Yoast)** = all content pages, blog posts, articles
- **robots.txt** = must reference BOTH so Google finds everything

If the Next.js sitemap claims WordPress URLs, you get stale dates, false ownership, and potential Google confusion. If robots.txt only references the Next.js sitemap, your entire blog content catalogue is invisible to Google's sitemap crawler.
