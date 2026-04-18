# Headless WP → Next.js (Vercel) Migration
# SEO Troubleshooting & Verification Checklist

**Use this doc on every client site migration. Work through it top to bottom.**
**This was built from a real audit on HangTherapy.com (April 2026).**

---

## BEFORE YOU MIGRATE — Pre-Migration Snapshot

Do this BEFORE touching anything. You need a baseline to compare against.

```
[ ] Visit clientsite.com/sitemap.xml — screenshot or save every URL listed
[ ] Visit clientsite.com/sitemap_index.xml — same
[ ] Visit clientsite.com/robots.txt — screenshot it
[ ] Export top pages from Google Search Console → Performance (so you can compare rankings after)
```

This URL list becomes your master reference. Every URL that exists before migration must either still work or have a 301 redirect after migration.

---

## AFTER MIGRATION — Troubleshooting Diagnostic

Run these checks in order. Each one tells you something specific.

---

### STEP 1 — Audit the Sitemaps

Visit each of these in your browser and note what you see:

**1a. `clientsite.com/sitemap.xml`**
- Who generated this — Next.js or WordPress?
- What URLs are listed?
- If it only shows the homepage, Next.js is generating it (correct)
- If it shows blog/article URLs, Next.js is wrongly claiming WordPress pages (problem — fix below)

**1b. `clientsite.com/wp-sitemap.xml`**
- Does it load an XML file or return a 404?
- If 404: Cloudflare is intercepting this path and sending it to Vercel instead of WordPress. You'll need to adjust Cloudflare routing rules.

**1c. `clientsite.com/sitemap_index.xml`**
- Does it load? Does it list sub-sitemaps like `post-sitemap.xml` and `page-sitemap.xml`?
- This is the RankMath/Yoast sitemap — the real one with all your content
- If it loads: WordPress SEO plugin is working correctly
- If it doesn't load: check RankMath/Yoast settings (XML sitemaps may be disabled)

**1d. `wp.clientsite.com/sitemap.xml`**
- Does this load or 404?
- Not critical, but the robots.txt on this subdomain will tell you what sitemap URL WordPress thinks it's using

**What we found on HangTherapy:**
- `/sitemap.xml` was Next.js — it incorrectly listed all the WordPress blog URLs
- `/wp-sitemap.xml` returned 404 — Cloudflare was blocking it
- `/sitemap_index.xml` was working correctly — RankMath was generating it
- The `robots.txt` was only pointing Google to the Next.js sitemap, so Google never saw the RankMath sitemap with all the real content

---

### STEP 2 — Check the WP Subdomain for Ghost Site Risk

A ghost site is when Google indexes your WordPress backend as a separate site, creating duplicate content that dilutes your SEO.

**2a. Visit `wp.clientsite.com`**
- Does it load a full browsable website?
- Or does it redirect to `clientsite.com`?
- Redirecting = safe. Loading a site = problem.

**2b. Visit `wp.clientsite.com/robots.txt`**
- What does it say?
- Should say `Disallow: /` to block Google
- Also check — it will show you what sitemap URL WordPress is referencing (useful data point)

**2c. Google search: `site:wp.clientsite.com`**
- Paste this exact text into Google (no space between site: and the domain)
- If results appear: Google has indexed the backend — this is urgent, block it immediately
- If no results show (or only unrelated results): you're safe

**What we found on HangTherapy:**
- `wp.hangtherapy.com` redirected to `hangtherapy.com` — safe, no ghost site
- `robots.txt` on the subdomain revealed the real sitemap URL (`sitemap_index.xml`) — useful clue
- Google search returned no indexed WP subdomain pages — all clear

---

### STEP 3 — Verify All Blog and Article URLs Load

Take each URL from your pre-migration sitemap snapshot and visit them one by one.

```
[ ] Does the page load real content?
[ ] Does the URL stay the same in the browser bar?
[ ] If the URL changes — is it a 301 (permanent) or 302 (temporary)?
```

To check redirect type: install the free Chrome extension **"Redirect Path"** — it shows you the full redirect chain and status code as you browse.

**301 = correct. SEO equity passes through.**
**302 = problem. SEO equity does not pass. Must be changed to 301.**

**What we found on HangTherapy:**
- All WordPress content pages (`/spinal-decompression/`, `/shoulder-impingement-guide/` etc.) loaded correctly
- URLs stayed clean — no redirects, no changes
- No 301s were needed because no slugs had changed

---

### STEP 4 — Check Canonical Tags on Key Pages

A canonical tag tells Google "this is the authoritative version of this page." If it points to the wrong domain, Google ignores your preferred URL.

**How to check:**
1. Visit `clientsite.com` (homepage)
2. Right-click → View Page Source
3. Press Cmd+F and search for `canonical`
4. Find the line that looks like: `<link rel="canonical" href="https://..."/>`

```
[ ] Does it point to clientsite.com? (correct)
[ ] Does it point to wp.clientsite.com? (wrong — fix in RankMath or layout.js)
[ ] Does it point to a staging URL? (wrong — fix immediately)
```

Repeat this check on at least one blog post.

---

### STEP 5 — Drill Into the Sitemap Content

Once you've confirmed sitemaps are loading, check what's actually inside them.

**5a. Visit `clientsite.com/post-sitemap.xml`**
- Lists all blog posts
- Every post you expect to be indexed should appear here
- If a post is missing: check its RankMath setting — it may be set to No Index

**5b. Visit `clientsite.com/page-sitemap.xml`**
- Lists all pages (guides, articles, legal pages, homepage)
- Cross-reference with your pre-migration URL list
- Flag any URLs that are missing

**What we found on HangTherapy:**
- `post-sitemap.xml` had 1 URL (one blog post)
- `page-sitemap.xml` had 5 URLs — all main content pages present
- Two URLs from the old Next.js sitemap were missing — but correctly so: one was an iframe page (no indexable content), one was a privacy policy (legal pages don't need to rank)
- Homepage appeared in the WordPress page-sitemap even though Next.js now serves it — minor untidiness, fixed by No Indexing the WP homepage in RankMath

---

### STEP 6 — Check RankMath/Yoast Settings in WordPress Admin

Log into `wp.clientsite.com/wp-admin`:

```
[ ] RankMath → Sitemap Settings → General → confirm XML sitemaps are ON
[ ] Posts: set to Index
[ ] Pages: set to Index (unless intentionally excluded)
[ ] WordPress homepage: set to No Index (Next.js owns it now)
[ ] Iframe pages: set to No Index (no real content to index)
[ ] Legal pages (Privacy Policy, Terms): No Index is fine and standard practice
[ ] Clear sitemap cache after making changes (RankMath free auto-regenerates — wait 5 min and recheck in incognito)
```

---

## THE FIXES — What to Change in Code

### Fix 1 — robots.js (Next.js)

Point Google to both sitemaps:

```js
// robots.js
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://clientsite.com/sitemap_index.xml",  // WordPress/RankMath — all content
      "https://clientsite.com/sitemap.xml",          // Next.js — homepage only
    ],
  };
}
```

### Fix 2 — sitemap.js (Next.js)

Strip out all WordPress URLs. Next.js only owns what it renders:

```js
// sitemap.js
export default function sitemap() {
  return [
    {
      url: "https://clientsite.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

If Next.js renders additional pages (e.g. a custom quiz page, a landing page), add only those.

### Fix 3 — 301 Redirects (if URLs changed)

Add in RankMath → Redirections:
```
Old URL: /old-slug/
New URL: /new-slug/
Type: 301 Permanent
```

Or in `next.config.js` for Next.js-rendered pages:
```js
redirects: async () => [
  {
    source: '/old-slug',
    destination: '/new-slug',
    permanent: true,  // this is a 301
  },
],
```

---

## FINAL STEP — Google Search Console

Do this after all fixes are deployed to Vercel:

```
[ ] Go to search.google.com/search-console
[ ] Select the client property
[ ] Left sidebar → Sitemaps
[ ] Submit: clientsite.com/sitemap_index.xml
[ ] Submit: clientsite.com/sitemap.xml
[ ] Wait 24–48 hours, then check both for errors
[ ] Go to Coverage → look for 404s or redirect errors
[ ] URL Inspection → enter homepage URL → Request Indexing
```

**GSC error meanings:**
- 404 = page is gone, needs a 301 from old URL
- Redirect error = redirect is broken or looping — check with Redirect Path extension
- Crawled but not indexed = check canonical tag and no-index settings on that page

---

## Quick Reference — Do I Need a 301?

| Situation | Need 301? |
|---|---|
| Same domain, same URL slugs | No |
| Same domain, URL slug changed | Yes |
| Domain changed entirely | Yes |
| Page removed permanently | Yes (redirect to closest relevant page) |
| WP subdomain redirecting to main domain | No (Cloudflare handles it) |

---

## Common Mistakes Checklist

```
[ ] Next.js sitemap listing WordPress URLs → remove them, WP owns its own sitemap
[ ] robots.txt only pointing to Next.js sitemap → add sitemap_index.xml
[ ] WP subdomain publicly browsable → block with robots.txt or Cloudflare Access
[ ] Using 302 instead of 301 → always use 301 for permanent moves
[ ] Canonical pointing to staging or WP subdomain → fix in RankMath or layout.js
[ ] WordPress still claiming homepage in its sitemap → No Index WP homepage in RankMath
[ ] Changing URL slugs without adding 301s → keep slugs identical or add 301s immediately
```

---

*Built from the HangTherapy.com headless WP migration audit, April 2026.*
