# CRO Framework

## The System

### 1. Diagnose
Before testing anything, identify *where* conversion is leaking:
- Funnel drop-off (where do users leave?)
- Heatmaps / session recordings
- Analytics (device, traffic source, page speed)

This tells you *what* to test.

---

### 2. Hypothesize
Structured format: **"We believe [change] will improve [metric] for [audience] because [data/insight]."**

Example: *"We believe moving the CTA above the fold will improve checkout initiation for mobile users because 70% of drop-off happens before scroll."*

---

### 3. Prioritize Tests (ICE Score)
Rate each hypothesis 1–10:
- **Impact** — how much could it move the needle?
- **Confidence** — how strong is the evidence?
- **Ease** — how fast to implement?

Run highest ICE score first.

---

### 4. Sample Size & Statistical Significance

| Input | Example |
|---|---|
| Current conversion rate | 2% |
| Minimum detectable effect (MDE) | 20% relative lift → 2.4% |
| Confidence level | 95% |
| Statistical power | 80% |

**Output:** ~21,000 visitors per variant (42,000 total).

At 500 daily visitors → **84 days** to reach significance.  
At 5,000 daily visitors → **8 days**.

Low-traffic sites cannot A/B test reliably — flag these early.

---

### 5. Run & Measure
- Split traffic 50/50
- Do not peek early (inflates false positives)
- Let it run to full sample size
- One variable at a time

---

### 6. Outcome & Document

| Result | Action |
|---|---|
| Win | Implement. Document what worked and why. |
| Loss | Document the insight. Negative data is still data. |
| Inconclusive | Increase traffic or raise MDE threshold. |

---

## Test Log Template

| # | Hypothesis | Page / Element | MDE | Sample Needed | Days | Result | Lift | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | |

---

## CRO Calculator Inputs (for AI tool)

- Current conversion rate
- Daily traffic volume
- Desired % improvement (MDE)

**Outputs:**
- Sample size per variant
- Days to run test
- Traffic viability flag (too low to test reliably?)
- Pre-filled hypothesis template
