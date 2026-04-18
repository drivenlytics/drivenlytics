# SOP: Instagram US Audience Domination from Overseas (The "Digital Bridge" Protocol)

How to manage and scale a US-targeted brand (Hang Therapy) while physically located in Southeast Asia. Covers the technical reasoning, required infrastructure, and execution strategy.

---

## 1. The Core Philosophy: The "Digital Bouncer"

Instagram's algorithm acts like border security — it shows local content to local people. It verifies your location using three signals:

1. **The Passport (Birthplace):** Where the account was first created.
2. **The Current Residence (IP Address):** Where you are logging in from right now.
3. **The Behavior (Metadata):** Are you posting from a phone? Is there a SIM card? Are you a bot?

**The Goal:** Make Instagram believe you are a real person sitting in a living room in the United States.

---

## 2. Infrastructure: The Required Stack

### Anti-Detect Browser (The "Digital Mask")

- **Tool:** AdsPower Desktop Client — always use **Mobile Simulation (NMS)** mode.
- **Profile Setup:** Create a profile, select **Android** or **iOS** as the OS, and name it `HangTherapy_US`. This aligns the browser kernel with mobile-specific parameters (touch support, pixel ratio).
- **Why:** Standard browsers (Chrome/Safari) leak Vietnam-based hardware — GPU, screen resolution, system fonts, local Wi-Fi names. AdsPower's Native Mobile Simulation (NMS) replaces this with a sterile US-based mobile device signature, indistinguishable from a real US user on their phone.

### Residential Proxy (The "US Home Address")

- **Type:** Static Residential or ISP Proxy
- **Why VPNs fail:** VPNs (including Surfshark) use Datacenter IPs. Instagram recognizes these as servers, not homes, and suppresses reach accordingly.
- **What works:** Residential proxies use real home internet addresses (AT&T, Comcast). To the algorithm, you look like a person in a US suburb.
- **Do not use:** Rotating or Datacenter proxies — these are flagged immediately.
- **Verified providers:** Use AdsPower's vetted list at [adspower.com/best-proxy-server-services](https://www.adspower.com/best-proxy-server-services). Recommended: **IPRoyal**, **Proxy-Seller**, or **Swiftproxy** — select the "Static Residential" tier.
- **Cost:** ~$5–$12 USD/month. This is your only mandatory business expense.

#### Proxy Provider Comparison

| Provider | Cost/mo | Best For | Key Feature |
|---|---|---|---|
| **IPRoyal** *(Recommended)* | $5–$7 | Beginners | AdsPower partner — easiest setup; SOCKS5 support; vetted for social media |
| **Proxy-Seller** | $3–$5 | Best value | Choose specific US cities (NYC, LA) to anchor location; use code `ADSPOWER20` for 20% off |
| **Webshare** | ~$5 | Solo founders | Fast backbone connection — best for uploading HD Reels without upload lag |
| **Oxylabs** | $30+ | Enterprise | Highest-tier provider (99.9% success rate) — only needed if cheaper proxies get flagged |

**How to buy:**
1. Go to the provider's website (start with IPRoyal).
2. Select **"Static Residential Proxies"** or **"ISP Proxies"** — do not buy Rotating or Datacenter.
3. Select **United States** as the country.
4. Choose **SOCKS5** protocol if given the option (faster for video uploads).
5. After purchase, you'll receive an IP Address, Port, Username, and Password — enter these into your AdsPower profile.

### Desktop vs. Mobile

- **Desktop (AdsPower in Mobile Simulation mode):** Best for account setup, app handshakes, bulk uploading, and all daily management.
- **AdsPower Manual Post:** For high-impact Reels, upload manually through AdsPower (still in Mobile Simulation). This sends mobile metadata — touch inputs, pixel ratio, device motion — that signals a real human creator and unlocks higher organic reach.

---

## 3. The "Heart Transplant" Strategy

The `HangTherapyOfficial` handle was moved to a Canada-born account with 3,300 followers. This is a "Heart Transplant" — transplanting the brand identity into a high-trust, established vessel.

**Advantage:** The Canada account bypasses new-account suspicion and carries existing follower authority.

**Risk:** Logging into this account from Vietnam Wi-Fi "infects" the high-trust vessel with a low-trust location signal, suppressing reach.

**Fix:**
- Always access via AdsPower (Mobile Simulation) + US Static ISP Proxy
- Archive (do not delete) old unrelated content to clear the algorithm's topical memory
- Reset Suggested Content from inside your US proxy session

---

## 4. Execution: Step-by-Step Setup

### Step 0 — Buy the Proxy ("The US Home Office")

Go to [IPRoyal.com](https://iproyal.com) and purchase exactly:

- **Product:** Static Residential Proxies (also listed as ISP Proxies)
- **Location:** United States — pick Los Angeles or New York
- **Duration:** 30 days (~$2.70–$3.00/month)
- **Protocol:** SOCKS5 (IPRoyal supports this by default)
- **Promo code:** `ROYAL3` for 3% off

> **Do not** buy "Residential Proxies" (the pay-per-GB kind). You want the **Static** version so your IP address never changes. A changing IP looks like a bot.

After purchase, you'll receive: **Host, Port, Username, Password** — keep these ready for AdsPower setup.

---

### Step 1 — The "Digital Divorce"

Before anything else, remove the account from all physical devices in Vietnam:

1. On each phone/tablet: go to **Settings > Accounts Center > Remove Account**.
2. Do NOT log back in from any physical device. The first login after this must be through AdsPower.

This severs the Vietnam location history from the account entirely.

---

### Step 2 — AdsPower Profile Setup ("Teleporting" the Account)

1. Open AdsPower Desktop and create a new profile:
   - **Name:** `HangTherapy_US`
   - **OS:** Android (best for mobile simulation)
   - **Proxy:** SOCKS5 — paste the IPRoyal Host, Port, Username, and Password
2. Click **"Check Proxy"** — if it turns green, you are officially standing in America.
3. Under **"Advanced"**, leave the default Fingerprint settings. AdsPower handles device spoofing automatically.

---

### Step 3 — The "Silent 24 Hours" (Zero-to-One Protocol)

Even with a high-trust IP, Instagram's AI is sensitive to sudden logins. Follow this timing sequence to avoid triggering a verification loop:

| Time | Action |
|---|---|
| Hour 1 | Log in to `HangTherapyOfficial` inside AdsPower. Do nothing else. Close the window. |
| Hour 2–6 | Log back in. Archive the 10 travel photos. Change category to **Health & Wellness**. |
| Hour 6–12 | Go to **Settings > Content Preferences > Reset Suggested Content**. |
| Hour 12–24 | The "Training": Search and like 5–10 posts from US wellness leaders (Huberman, Starrett, Attia). Watch a few Reels to completion. This teaches the algorithm you are a real US human interested in wellness. |

> **No automated posting during these 24 hours.** Let the account "breathe" before StoryChief touches it.

---

### Step 4 — The "US Anchor" Handshake (StoryChief)

Only after completing the 24-hour training period:

1. Inside the same AdsPower profile (proxy still active), log in to StoryChief.
2. Go to **Integrations > Instagram** and click **"Reconnect."**
3. Complete the OAuth handshake. Meta records the admin as being in the US.
4. Post your first piece of US-targeted content.

---

### Step 5 — Category Optimization

1. Change the Instagram account category to **Health & Wellness**.
2. **Why:** "Alternative & Holistic" is a narrow topic bucket. "Health & Wellness" is broader and allows the algorithm to surface content to a larger pool of US office-worker and wellness-adjacent audiences.
3. **Avoid:** "Service" categories — these geofence content to a local city rather than a national audience.

---

### Setup Checklist

- [ ] Buy Static Residential ISP Proxy from IPRoyal (SOCKS5, US location)
- [ ] Remove account from all Vietnam devices
- [ ] Create AdsPower profile (Android mode, proxy verified green)
- [ ] Log in and archive off-topic content, reset suggested content
- [ ] Train the algorithm for 24 hours — no automated posting yet
- [ ] Reconnect StoryChief and launch first post

---

## 5. Content Strategy: The 80/20 Rule

| Mode | Tool | Volume | Purpose |
|---|---|---|---|
| Automated | StoryChief | 80% | Daily tips, image posts, consistency |
| Manual "Human" | AdsPower Manual | 20% | High-potential Reels, viral unlock |

**Why the 20% matters:** Posting a Reel manually through AdsPower (Mobile Simulation, proxy active) sends mobile metadata — touch inputs, device motion, battery state — that Instagram reads as proof of a real human creator. This raises the organic reach ceiling for the entire account, not just that single post.

**Cadence:** At minimum, one manual mobile post per week.

---

## 6. VPN vs. Residential Proxy — Quick Reference

| Factor | VPN (Surfshark) | Residential Proxy + AdsPower |
|---|---|---|
| Organic Reach | Low — likely suppressed | High — US-targeted |
| Account Safety | Risky — flagged as server traffic | High — appears as local user |
| Cost | Cheap | ~$10/month (proxy only) |
| Best Use Case | Privacy, streaming | Building a US social media presence |

---

## 7. Summary

To scale Hang Therapy's Instagram from Vietnam:

| Action | Status |
|---|---|
| Remove account from all Vietnam devices (Digital Divorce) | Required first |
| Set up AdsPower (Mobile Simulation) + US Static ISP Proxy | One-time setup |
| Reconnect StoryChief inside the AdsPower US profile | One-time handshake |
| Archive old off-topic content + Reset Suggested Content | One-time cleanup |
| Post at least one Reel manually per week via AdsPower Manual | Ongoing |

**Formula:** US IP + US Mobile Fingerprint + Human Signal = US Organic Reach

**Next Step:** Purchase a Static Residential proxy from IPRoyal (recommended for beginners), configure AdsPower with your credentials, and perform the StoryChief reconnection handshake.
