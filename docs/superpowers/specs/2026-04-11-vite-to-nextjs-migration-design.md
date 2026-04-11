# Vite → Next.js Migration Design
**Date:** 2026-04-11  
**Status:** Approved

---

## Goal

Migrate the Drivenlytics marketing site from Vite (SPA) to Next.js (App Router) with zero visual changes. The site must look and behave identically. SEO, GTM, and analytics must carry over fully.

---

## Scope

**In scope:**
- Full replacement of `web_build/` with a Next.js project on a `nextjs-migration` branch
- All current pages: home (all sections), `/founder` placeholder
- All SEO: metadata, Open Graph, Twitter Card, JSON-LD schema, sitemap, robots.txt
- GTM, Google Fonts, global CSS/Tailwind theme
- All current dependencies that remain relevant

**Out of scope:**
- `FounderStory.tsx` and `src/content/` markdown files (in-progress, added later)
- Phase 4 Server Component optimizations (follow-up task)
- Any visual or copy changes

---

## Architecture

```
web_build/
├── app/
│   ├── layout.tsx          ← metadata, GTM Script, JSON-LD, global CSS, fonts
│   ├── page.tsx            ← home page (Server Component, renders client sections)
│   └── founder/
│       └── page.tsx        ← placeholder ("Coming soon" or simple redirect to /)
├── components/
│   ├── Sections.tsx        ← "use client" — motion, useState, react-calendly
│   └── ContactModal.tsx    ← "use client" — emailjs, useState
├── public/
│   ├── logo.svg
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── content/                ← preserved, not wired up
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Dependency Changes

| Action | Package |
|--------|---------|
| Remove | `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-plugin-prerender`, `@prerenderer/renderer-puppeteer` |
| Add | `next`, `@tailwindcss/postcss` |
| Keep | `react`, `react-dom`, `lucide-react`, `motion`, `@emailjs/browser`, `react-calendly`, `marked`, `tailwindcss`, `typescript`, `@types/react`, `@types/react-dom`, `@types/node` |

---

## Key Technical Decisions

### Tailwind v4
- Replace `@tailwindcss/vite` plugin with `@tailwindcss/postcss`
- Add `postcss.config.mjs` with `@tailwindcss/postcss` plugin
- `@theme {}` CSS syntax in `index.css` is unchanged — Tailwind v4 supports it via PostCSS

### Google Fonts
- Remove CSS `@import` URL from `index.css`
- Use `next/font/google` in `layout.tsx` for zero render-blocking font requests
- Fonts: `Outfit` (weights 400–800), `Inter` (weights 400–800), `JetBrains_Mono` (weights 400–500)

### GTM
- Remove raw `<script>` tags from `index.html`
- Add via `next/script` with `strategy="afterInteractive"` in `layout.tsx`

### SEO Metadata
- All `<head>` tags from `index.html` move into `generateMetadata()` export in `layout.tsx`
- Canonical, OG, Twitter Card handled by Next.js Metadata API

### JSON-LD Schema
- Inline `<script type="application/ld+json">` Server Component in `layout.tsx`
- Three schemas: Organization, Person, Service (Launch Ready), Service (Brand Foundation Kit), Service (Custom Retainer)

### Routing
- Hash-based `#/founder` → App Router `/founder/page.tsx`
- `/founder` renders a placeholder for now (FounderStory not yet ready)
- All nav links updated from `#/founder` to `/founder`

### `"use client"` Strategy
- `Sections.tsx`: add `"use client"` (uses `motion`, `useState`, `react-calendly`)
- `ContactModal.tsx`: add `"use client"` (uses `useState`, `@emailjs/browser`)
- `app/page.tsx`: Server Component (imports client components — this is fine)
- `app/layout.tsx`: Server Component

### Prerendering
- `vite-plugin-prerender` removed entirely
- Next.js static generation (SSG) is automatic for pages with no dynamic data — no config needed

### Vercel Deployment
- Same repo, same Vercel project
- Branch push to `nextjs-migration` triggers automatic Vercel preview URL
- Merge to `main` when preview is confirmed stable

---

## Visual Fidelity Guarantee

- No CSS changes beyond removing the Google Fonts `@import` (font loading behaviour improves, appearance identical)
- All Tailwind custom theme tokens (`--color-brand-purple`, `--color-brand-pink`, etc.) carried over unchanged
- All component markup, classNames, and animations unchanged
- `public/` assets (logo, og-image, robots, sitemap) copied as-is

---

## Validation Checklist (pre-merge)

- [ ] `npm run build` passes locally with zero errors
- [ ] All sections render correctly on preview URL
- [ ] ContactModal opens, form submits via EmailJS
- [ ] GTM fires on page load (verify in GTM preview mode)
- [ ] Meta tags present in page source (not injected by JS)
- [ ] `/founder` route loads without 404
- [ ] Fonts load correctly (no FOUT, correct weights)
- [ ] `robots.txt` and `sitemap.xml` accessible at root
