# Vite → Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite SPA in `web_build/` with a Next.js App Router project that is visually identical, with improved SEO (server-rendered metadata), native font loading, and no prerender plugin.

**Architecture:** Single-page marketing site migrated to Next.js App Router. All React components carry over unchanged except for `"use client"` directives added to interactive components. `app/layout.tsx` owns metadata, GTM, JSON-LD, and fonts. `app/page.tsx` is a Server Component that renders the existing client components.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4 (PostCSS), `next/font/google`, `next/script`, TypeScript, EmailJS, Framer Motion (motion), Lucide React, react-calendly

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Delete | `web_build/vite.config.ts` | Vite config — replaced by Next.js |
| Delete | `web_build/src/main.tsx` | Vite entry point — replaced by App Router |
| Delete | `web_build/index.html` | Vite HTML shell — replaced by layout.tsx |
| Create | `web_build/next.config.ts` | Next.js config |
| Create | `web_build/postcss.config.mjs` | Tailwind v4 PostCSS config |
| Modify | `web_build/tsconfig.json` | Update for Next.js paths |
| Modify | `web_build/package.json` | Swap Vite deps for Next.js |
| Modify | `web_build/src/index.css` | Remove Google Fonts @import (handled by next/font) |
| Create | `web_build/app/layout.tsx` | Root layout: fonts, metadata, GTM, JSON-LD, global CSS |
| Create | `web_build/app/page.tsx` | Home page Server Component |
| Create | `web_build/app/founder/page.tsx` | Placeholder for /founder route |
| Keep | `web_build/src/components/Sections.tsx` | Add `"use client"` at top |
| Keep | `web_build/src/components/ContactModal.tsx` | Add `"use client"` at top |
| Keep | `web_build/public/` | Assets unchanged (logo.svg, og-image.png, robots.txt, sitemap.xml) |

---

## Task 1: Create migration branch

**Files:** none (git operation)

- [ ] **Step 1: Create and switch to the migration branch**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git checkout -b nextjs-migration
```

Expected: `Switched to a new branch 'nextjs-migration'`

- [ ] **Step 2: Confirm branch**

```bash
git branch --show-current
```

Expected: `nextjs-migration`

---

## Task 2: Swap dependencies in package.json

**Files:**
- Modify: `web_build/package.json`

- [ ] **Step 1: Replace package.json content**

Replace the entire `web_build/package.json` with:

```json
{
  "name": "drivenlytics-v1",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "lucide-react": "^0.546.0",
    "marked": "^18.0.0",
    "motion": "^12.23.24",
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-calendly": "^4.4.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.14",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.8.2"
  }
}
```

- [ ] **Step 2: Install**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build
rm -rf node_modules package-lock.json
npm install
```

Expected: Clean install, no peer dependency errors.

- [ ] **Step 3: Commit**

```bash
git add web_build/package.json web_build/package-lock.json
git commit -m "chore: swap vite deps for next.js"
```

---

## Task 3: Add Next.js and PostCSS config files

**Files:**
- Create: `web_build/next.config.ts`
- Create: `web_build/postcss.config.mjs`

- [ ] **Step 1: Create next.config.ts**

Create `web_build/next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 2: Create postcss.config.mjs**

Create `web_build/postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 3: Delete vite.config.ts**

```bash
rm /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build/vite.config.ts
```

- [ ] **Step 4: Commit**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add web_build/next.config.ts web_build/postcss.config.mjs
git rm web_build/vite.config.ts
git commit -m "chore: add next.js and postcss config, remove vite config"
```

---

## Task 4: Update tsconfig.json for Next.js

**Files:**
- Modify: `web_build/tsconfig.json`

- [ ] **Step 1: Replace tsconfig.json**

Replace the entire `web_build/tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add web_build/tsconfig.json
git commit -m "chore: update tsconfig for next.js"
```

---

## Task 5: Update global CSS — remove Google Fonts import

**Files:**
- Modify: `web_build/src/index.css`

- [ ] **Step 1: Remove the @import line**

Open `web_build/src/index.css` and delete line 1:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
```

The file should now start with `@import "tailwindcss";`. Everything else stays identical.

- [ ] **Step 2: Commit**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add web_build/src/index.css
git commit -m "chore: remove google fonts css import (handled by next/font)"
```

---

## Task 6: Add "use client" to interactive components

**Files:**
- Modify: `web_build/src/components/Sections.tsx`
- Modify: `web_build/src/components/ContactModal.tsx`

- [ ] **Step 1: Add "use client" to Sections.tsx**

Add `"use client";` as the very first line of `web_build/src/components/Sections.tsx` (before all imports):

```tsx
"use client";

import { motion } from "motion/react";
// ... rest of file unchanged
```

- [ ] **Step 2: Add "use client" to ContactModal.tsx**

Add `"use client";` as the very first line of `web_build/src/components/ContactModal.tsx`:

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
// ... rest of file unchanged
```

- [ ] **Step 3: Commit**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add web_build/src/components/Sections.tsx web_build/src/components/ContactModal.tsx
git commit -m "chore: add use client to interactive components"
```

---

## Task 7: Create app/layout.tsx

**Files:**
- Create: `web_build/app/layout.tsx`
- Delete: `web_build/index.html`
- Delete: `web_build/src/main.tsx`

- [ ] **Step 1: Create the app directory**

```bash
mkdir -p /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build/app
```

- [ ] **Step 2: Create app/layout.tsx**

Create `web_build/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "../src/index.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drivenlytics | Data-Driven CRO & Performance Marketing",
  description:
    "Data-Driven Marketing | CRO | Full-Stack | Brand Building 0-1 | Helping entrepreneurs strengthen their brand, build trust, and increase conversions | START.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://drivenlytics.com" },
  openGraph: {
    title: "CRO | Data-Driven Performance Marketing Solutions",
    description:
      "Data-Driven Marketing | CRO | Full-Stack | Brand Building 0-1 | Helping entrepreneurs strengthen their brand, build trust, and increase conversions | START.",
    url: "https://drivenlytics.com",
    type: "website",
    images: [{ url: "https://drivenlytics.com/og-image.png" }],
    siteName: "Drivenlytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRO | Data-Driven Performance Marketing Solutions",
    description:
      "Data-Driven Marketing | CRO | Full-Stack | Brand Building 0-1 | Helping entrepreneurs strengthen their brand, build trust, and increase conversions | START.",
    images: ["https://drivenlytics.com/og-image.png"],
  },
  icons: { icon: "/logo.svg" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Drivenlytics",
    url: "https://drivenlytics.com",
    logo: "https://drivenlytics.com/logo.svg",
    sameAs: ["https://www.linkedin.com/in/drivenlytics/"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lawrence",
    url: "https://drivenlytics.com",
    jobTitle: "Founder & Performance Marketing Strategist",
    worksFor: { "@type": "Organization", name: "Drivenlytics" },
    sameAs: ["https://www.linkedin.com/in/drivenlytics/"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Launch Ready",
    provider: { "@type": "Organization", name: "Drivenlytics" },
    description:
      "Custom landing page, sales copy, lead form, and 5-email drip sequence. Delivered in 7 business days.",
    offers: { "@type": "Offer", price: "1000", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand Foundation Kit",
    provider: { "@type": "Organization", name: "Drivenlytics" },
    description:
      "Full strategic positioning package: ICP, value proposition, competitive analysis, brand voice, visual identity, and core messaging.",
    offers: { "@type": "Offer", price: "3000", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Content Retainer",
    provider: { "@type": "Organization", name: "Drivenlytics" },
    description:
      "4 SEO blog posts per month with images, on-page SEO, and schema markup. Built for pillar-cluster content systems.",
    offers: { "@type": "Offer", price: "1000", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom / Full-Stack Marketing",
    provider: { "@type": "Organization", name: "Drivenlytics" },
    description:
      "Full-site builds, funnels, brand design, email infrastructure, ads, SEO programs, and AI/automation workflows.",
    offers: { "@type": "Offer", price: "5000", priceCurrency: "USD" },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P66DTGMW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P66DTGMW');`,
          }}
        />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Delete Vite entry files**

```bash
rm /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build/src/main.tsx
rm /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build/index.html
```

- [ ] **Step 4: Commit**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add web_build/app/layout.tsx
git rm web_build/src/main.tsx web_build/index.html
git commit -m "feat: add app/layout.tsx with metadata, fonts, GTM, and JSON-LD"
```

---

## Task 8: Create app/page.tsx (home)

**Files:**
- Create: `web_build/app/page.tsx`

- [ ] **Step 1: Create app/page.tsx**

Create `web_build/app/page.tsx`:

```tsx
import { Navbar, Hero, Services, Process, Testimonials, Contact, Footer } from "../src/components/Sections";
import { ContactModalWrapper } from "../src/components/ContactModalWrapper";

export default function HomePage() {
  return <ContactModalWrapper />;
}
```

Wait — `ContactModal` and the open/close state currently live together in `App.tsx`. We need a thin client wrapper to hold that state. See Task 9 for `ContactModalWrapper`. The home page itself just renders the wrapper.

- [ ] **Step 2: Commit will happen after Task 9**

---

## Task 9: Create ContactModalWrapper client component

**Files:**
- Create: `web_build/src/components/ContactModalWrapper.tsx`

The current `App.tsx` uses `useState` to control the modal — this needs to live in a `"use client"` component. We'll extract it into a wrapper so `app/page.tsx` stays a Server Component.

- [ ] **Step 1: Create ContactModalWrapper.tsx**

Create `web_build/src/components/ContactModalWrapper.tsx`:

```tsx
"use client";

import { useState } from "react";
import {
  Navbar,
  Hero,
  Services,
  Process,
  Testimonials,
  Contact,
  Footer,
} from "./Sections";
import { ContactModal } from "./ContactModal";

export function ContactModalWrapper() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-purple selection:text-white">
      <Navbar onStart={() => setModalOpen(true)} />
      <main>
        <Hero onStart={() => setModalOpen(true)} />
        <Process />
        <Services />
        <Testimonials />
        <Contact onStart={() => setModalOpen(true)} />
      </main>
      <Footer />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
```

- [ ] **Step 2: Update app/page.tsx to use the wrapper**

Replace `web_build/app/page.tsx` with:

```tsx
import { ContactModalWrapper } from "../src/components/ContactModalWrapper";

export default function HomePage() {
  return <ContactModalWrapper />;
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add web_build/src/components/ContactModalWrapper.tsx web_build/app/page.tsx
git commit -m "feat: add home page and ContactModalWrapper client component"
```

---

## Task 10: Create /founder placeholder page

**Files:**
- Create: `web_build/app/founder/page.tsx`

- [ ] **Step 1: Create the founder directory and page**

```bash
mkdir -p /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build/app/founder
```

Create `web_build/app/founder/page.tsx`:

```tsx
import Link from "next/link";

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-gray-500 text-lg font-medium mb-6">Coming soon.</p>
        <Link
          href="/"
          className="text-brand-purple font-black uppercase tracking-widest text-sm hover:text-white transition-colors"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add web_build/app/founder/page.tsx
git commit -m "feat: add /founder placeholder page"
```

---

## Task 11: Delete App.tsx (replaced by ContactModalWrapper + app/page.tsx)

**Files:**
- Delete: `web_build/src/App.tsx`

- [ ] **Step 1: Verify App.tsx is no longer imported anywhere**

```bash
grep -r "from.*App" /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build/src /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build/app 2>/dev/null
```

Expected: no results (App.tsx should not be imported by anything).

- [ ] **Step 2: Delete App.tsx**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git rm web_build/src/App.tsx
git commit -m "chore: remove App.tsx (replaced by app/page.tsx + ContactModalWrapper)"
```

---

## Task 12: Local build check

**Files:** none

- [ ] **Step 1: Run the Next.js build**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics/web_build
npm run build
```

Expected: Build completes with no errors. Warnings about image optimization are acceptable (will address in Phase 4). Any TypeScript errors must be fixed before continuing.

- [ ] **Step 2: Run dev server and do a quick visual check**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Verify:
- All sections render (Navbar, Hero, Process, Services, Testimonials, Contact, Footer)
- Start button opens the ContactModal
- Fonts, colors, gradients all match the Vite version
- `/founder` route loads without a 404

- [ ] **Step 3: Stop dev server (Ctrl+C)**

- [ ] **Step 4: Commit if any fixes were made during build**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add -A
git commit -m "fix: resolve build errors from next.js migration"
```

(Skip this step if build was clean with no fixes needed.)

---

## Task 13: Update .gitignore for Next.js

**Files:**
- Modify: `web_build/.gitignore`

- [ ] **Step 1: Check and update .gitignore**

Open `web_build/.gitignore`. Ensure it contains Next.js-specific entries. Replace or update the file with:

```
# dependencies
node_modules/

# next.js
.next/
out/

# build output
dist/

# env files
.env
.env.local
.env.*.local

# misc
.DS_Store
*.pem
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git add web_build/.gitignore
git commit -m "chore: update .gitignore for next.js"
```

---

## Task 14: Push branch and verify Vercel preview

**Files:** none

- [ ] **Step 1: Push the branch**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git push -u origin nextjs-migration
```

- [ ] **Step 2: Get the Vercel preview URL**

Vercel will automatically detect the push and build a preview. Check the Vercel dashboard or the GitHub PR checks for the preview URL (format: `drivenlytics-git-nextjs-migration-xxx.vercel.app`).

- [ ] **Step 3: Validate preview against checklist**

Open the preview URL and verify every item:

- [ ] All sections render correctly (Navbar, Hero, Process, Services, Testimonials, Contact, Footer)
- [ ] ContactModal opens and form submits
- [ ] GTM fires (verify in GTM preview mode with container ID `GTM-P66DTGMW`)
- [ ] View page source — `<title>`, `<meta name="description">`, OG tags, and JSON-LD are in the raw HTML (not injected by JS)
- [ ] `/founder` route loads without 404
- [ ] Fonts render correctly (Outfit for headings, Inter for body)
- [ ] `https://[preview-url]/robots.txt` returns correct content
- [ ] `https://[preview-url]/sitemap.xml` returns correct content
- [ ] No visual difference from current live site

---

## Task 15: Merge to main

Only proceed when all preview checklist items pass.

- [ ] **Step 1: Switch to main and merge**

```bash
cd /Users/lawrence/Dev/AntiGravity_IDE/Drivenlytics
git checkout main
git merge nextjs-migration
git push origin main
```

- [ ] **Step 2: Verify live site**

Wait ~60 seconds for Vercel to deploy. Open `https://drivenlytics.com` and confirm everything is live and correct.

- [ ] **Step 3: Celebrate** — prerender plugin is gone, metadata is server-rendered, fonts load without a render-blocking CSS import.
