# Findings & Discoveries

## Technical Findings

### Next.js 16 + TypeScript Configuration
- **Issue:** JSX errors in IDE despite correct setup
- **Root Cause:** tsconfig.json missing `"jsx": "preserve"` and `"incremental": true`
- **Solution:** Added both flags + `"moduleResolution": "node"`
- **Learning:** Next.js 16 requires explicit TypeScript plugin configuration in plugins array

### GTM in Next.js SPA (Client-Side Navigation)
- **Problem:** Standard GTM doesn't fire on client-side route changes (Next.js doesn't reload pages)
- **Root Cause:** GTM pageview tag is page-load-only; SPA navigation skips page reload
- **Solution:** Custom `useGTM()` hook monitors `usePathname()` + `useSearchParams()` and fires dataLayer page_view events
- **Implementation:**
  - Hook fires `page_view` on pathname/search changes
  - Includes `page_path`, `page_title`, `timestamp`
  - Custom events via `trackEvent()` function
  - Section tracking via `useSectionTracking()` + IntersectionObserver

### Vercel Deployment Expectations
- One-click GitHub + Vercel integration (auto-deploy on push)
- Environment variables: `NEXT_PUBLIC_GTM_ID` for GTM container ID
- No manual build steps; Vercel handles Next.js build pipeline

---

## Content & Positioning Findings

### Services & Pricing (4 Tiers, Not 3)
- **Tier 1a:** Launch Ready ($1K one-time) — Landingi landing page + email sequence
- **Tier 1b:** Content Retainer ($1K/month) — AI-assisted, Lawrence-edited content
- **Tier 2:** Brand Foundation Kit ($3–5K one-time) — strategic positioning package
- **Tier 3:** Custom/Retainer ($5K+/month) — full builds, funnels, infrastructure

### Social Proof (9 Real Testimonials)
- Sourced from purplecopy.com client testimonials
- Names, descriptions, and business context provided
- All verified real clients (not generated)

### Framework Compliance
- Site build follows Drivenlytics Build Framework (6 levels)
- Source of truth: SITE_FRAMEWORK.md
- Level 1 establishes prerequisites for all subsequent work
- Level 4 design requires AI Studio first (not code-first)

---

## Design & UX Findings

### Component Structure
- All sections have `id` and `data-section` attributes for GTM tracking
- Sections: Hero, Services, Process (3 phases), Testimonials (proof), Contact (CTA)
- No blog MVP (defer to post-launch unless content exists)

### Navigation & Anchor Links
- Nav uses anchor links to sections (not Next.js routing)
- All nav links have potential for data-gtm attributes (deferred until design locked)
- Sticky nav appropriate for marketing site

### Process Section (How It Works)
- 3-phase framework (derived from methodology, not arbitrary)
- Placeholder descriptions (can modify post-design)
- Each phase has numbered steps + brief description

---

## Process & Methodology Findings

### Drivenlytics Build Framework
- 6-level methodology governs all builds
- Level 1 is hard prerequisite (setup before any code)
- Designed to prevent cascading failures from skipped setup
- Applied to both agency infrastructure and client projects

### Skill Creation with TDD
- `site-build` skill created using RED-GREEN-REFACTOR
- RED phase: tested baseline (agent skips Level 1 without skill)
- GREEN phase: with skill, agent enforces framework properly
- Prevents rationalization of prerequisite skipping

---

## Next Steps & Deferred Work

### Immediate (Before Design Pass)
- Commit Level 1 setup to git
- Create GitHub repo (if separate)
- Document deployment expectations

### Design Phase (Level 4)
- Open web_build in AI Studio
- Design to 80% satisfaction
- Focus on: visual hierarchy, CTA prominence, brand consistency
- Defer GTM data attributes until design locked

### Deployment Phase (Level 5)
- Configure GTM container ID (environment variable)
- Test page_view events in GTM preview
- Set up GA4 property and connection
- Test conversion tracking
- Deploy to Vercel with custom domain

### Post-Launch
- Monitor GA4 for traffic patterns
- A/B test CTA positioning
- Measure conversion rate by source
- Add blog content if SEO opportunity identified
