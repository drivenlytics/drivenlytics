# SOP: Tracking Setup for Headless WordPress + Next.js

**Architecture this applies to:**
- Frontend: Next.js on Vercel (homepage + custom pages)
- Backend: WordPress serving content pages (blogs, guides, articles)
- Routing: Cloudflare routes all traffic through one root domain
- Example: `hangtherapy.com` → Vercel, `hangtherapy.com/guides/*` → WordPress

---

## The Core Problem This SOP Solves

In a headless WP setup, Vercel and WordPress are two separate systems. Without proper tracking setup:
- The homepage (Vercel) is completely invisible to GA4
- Users moving between Vercel and WordPress pages are treated as separate visitors
- Organic traffic attribution breaks — GA4 reports "Direct" instead of the real source
- Session continuity is lost at every domain hand-off

---

## Prerequisites

Before starting, have these ready:

| Item | Where to find it |
|---|---|
| GTM Web Container ID | GTM dashboard → top right (format: `GTM-XXXXXXX`) |
| GA4 Measurement ID | GA4 → Admin → Data Streams → your stream (format: `G-XXXXXXXXXX`) |
| Stape server container URL | Stape dashboard (format: `https://ss.yourdomain.com`) |
| Access to Next.js codebase | `layout.js` or `_app.js` in your Vercel project |
| GTM Web container edit access | GTM dashboard |

---

## Part 1 — Next.js Code Setup (Vercel Side)

### Step 1 — Inject GTM into the layout file

Open your root layout file. In Next.js App Router this is `src/app/layout.js`. In Pages Router it is `pages/_app.js`.

**Add the import at the top:**
```js
import Script from "next/script";
```

**Add the noscript fallback as the first child of `<body>`:**
```jsx
<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0"
    width="0"
    style={{ display: "none", visibility: "hidden" }}
  />
</noscript>
```

**Add the GTM loader script before the closing `</body>` tag:**
```jsx
<Script
  id="gtm"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');`,
  }}
/>
```

Replace `GTM-XXXXXXX` with your actual Web container ID in both places.

**Why `afterInteractive`:** Loads GTM as soon as the page is interactive without blocking render. Do not use `beforeInteractive` — it will slow page load with no tracking benefit.

### Step 2 — Deploy to Vercel

Push your changes. If the repo is connected to Vercel auto-deploy, a git push to main is enough.

### Step 3 — Verify the injection

1. Visit your homepage in a browser
2. Right-click → View Page Source
3. Search for your GTM container ID
4. It should appear 2–3 times (loader script + noscript iframe)

If it does not appear, the deploy did not complete or the edit was made in the wrong file.

---

## Part 2 — GTM Web Container Setup

All steps below are performed inside your **Web GTM container** (`GTM-XXXXXXX`). Do not make these changes in the Stape server container.

### Step 4 — Configure the Google Tag (GA4)

Open Tags → your **Google Tag - GA4** tag → edit.

Under Configuration Settings, confirm or add these three parameters:

| Configuration Parameter | Value | Notes |
|---|---|---|
| `server_container_url` | `https://ss.yourdomain.com` | Your Stape URL — routes data server-side |
| `event_id` | `{{stape_uid - fb_deduplication}}` | Stape deduplication variable |
| `cookie_domain` | `auto` | Keeps session alive across Vercel ↔ WordPress hand-offs |

**`cookie_domain: auto` is critical.** Without it, the GA4 cookie is scoped too narrowly and WordPress cannot read the session that Vercel started. Users appear as new visitors every time they cross the domain boundary.

### Step 5 — Add History Change trigger

GTM fires pageview tags on hard page loads by default. Next.js is a Single Page Application — URL changes happen without full page reloads. The History Change trigger catches these.

1. Go to Triggers → New
2. Trigger Type: **History Change**
3. Name it: `History Change`
4. Save

### Step 6 — Attach History Change trigger to the Google Tag

1. Open your **Google Tag - GA4** tag
2. Under Firing Triggers, click the + button
3. Add the **History Change** trigger you just created
4. The tag should now show two firing triggers: `Initialization - All Pages` and `History Change`
5. Save

### Step 7 — Publish the Web container

Click **Submit** in the top right of GTM → add a version name (e.g., "Headless tracking fix") → Publish.

---

## Part 3 — WordPress Side (No Code Changes Required)

If GTM was already installed in WordPress before the headless migration, no changes are needed. The `cookie_domain: auto` setting in the Web container handles cross-system session continuity automatically.

**Verify WordPress GTM is still active:**
1. Visit any WordPress content page (e.g., `yourdomain.com/your-guide/`)
2. Right-click → View Page Source → search for `GTM-XXXXXXX`
3. Confirm it appears

If GTM is missing from WordPress pages, reinstall via the **GTM4WP plugin** (Google Tag Manager for WordPress) and enter your Web container ID.

---

## Verification Checklist

Run these checks after completing all steps:

```
[ ] GTM container ID appears in page source of homepage (Vercel)
[ ] GTM container ID appears in page source of a WordPress content page
[ ] GA4 Realtime report shows active users when you visit the homepage
[ ] GA4 Realtime report shows the SAME session continuing when navigating to a WP page
[ ] Traffic source shows correctly (e.g., Organic) — not "Direct" — for test visits from Google
[ ] cookie_domain: auto is saved in the Google Tag config
[ ] History Change trigger is attached to the Google Tag
[ ] GTM Web container is published (not just saved)
```

---

## How to Verify Session Continuity

1. Open an incognito window
2. Go to Google, search your brand name, click through to your homepage
3. Open GA4 → Realtime report
4. Click a link to a WordPress content page
5. Confirm the same user session continues in Realtime — the user count should stay at 1, not jump to 2

---

## Architecture Summary

```
User lands on hangtherapy.com (Vercel)
    ↓
GTM Web Container loads (GTM-XXXXXXX)
    ↓
Google Tag fires → cookie written to .hangtherapy.com (domain-wide)
    ↓
Data sent to Stape (ss.hangtherapy.com) → forwarded to GA4
    ↓
User clicks link to /spinal-decompression/ (WordPress)
    ↓
Hard refresh — browser crosses from Vercel to WordPress
    ↓
GTM Web Container loads again on WP page
    ↓
Google Tag reads existing cookie (same session, same user)
    ↓
GA4 sees one continuous session — attribution preserved
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| GTM not injected into `layout.js` | Homepage completely untracked | Add Script component to root layout |
| `cookie_domain` missing or set to a specific domain | Session breaks at Vercel → WP hand-off | Set to `auto` in Google Tag config |
| Changes saved in GTM but not published | Nothing takes effect in production | Always hit Submit/Publish after saving |
| History Change trigger missing | SPA navigation events not captured | Add trigger and attach to Google Tag |
| GTM injected in wrong layout file | Only some pages tracked | Verify the file is the root layout used by all pages |
| Changes made in Stape container instead of Web container | Browser-side config has no effect | Cookie and trigger settings always go in the Web container |

---

## When to Revisit This SOP

- Adding new pages to the Vercel (Next.js) side
- Migrating additional content from WordPress to Next.js
- Adding a new domain or subdomain to the funnel
- Switching from Stape to a different server-side GTM provider
- GA4 property migration or new measurement ID
