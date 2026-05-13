# Design notes & judgment calls

This document records non-obvious choices made while building the dashboard,
so future maintainers (and the paper's authors) can revisit them.

## Color palette

Adopted **Okabe–Ito** for color-blind safety:

| Role           | Hex      | Used for                                |
| -------------- | -------- | --------------------------------------- |
| `nash`         | #d55e00  | NASH cases (vermillion)                 |
| `control`      | #0072b2  | Controls (blue)                         |
| `accent`       | #009e73  | Low-risk / favorable (bluish-green)     |
| `warn`         | #e69f00  | Indeterminate / caveat (orange-yellow)  |
| `danger`       | #cc79a7  | Anemia / hypothesis-generating          |
| `ink` / `muted`| #1f2933 / #5b6470 | Primary / secondary text       |

Contrast was verified against the paper background (#fafaf7) for AA at body
sizes. Forest plot also encodes significance via filled vs open dots so the
chart works without color.

## Strength-of-evidence stars

Stars are **interpretive judgments**, not a derived metric. For each card I
weighed four axes (CI precision, multivariable adjustment, freedom from
mathematical coupling, sample size). The mapping I used:

- **★★★★★** — Large effect, tight CI, clean of coupling, large n, biologically
  plausible, replicates prior literature. **No card meets this bar in this paper**
  given the cross-sectional design and ICD-based ascertainment.
- **★★★★☆** — Significant after adjustment, biologically plausible, no
  coupling concerns. Used for: thrombocytopenia OR (very large effect but
  partly mediated by fibrosis stratum), any-CBC composite, FIB-4 ↔ anemia
  (anemia is not in FIB-4), female sex ↔ anemia.
- **★★☆☆☆** — Statistically significant but compromised by mathematical
  coupling or by likely residual confounding. Used for: FIB-4 ↔ abnormal
  platelets (coupling), dyslipidaemia ↔ anemia/neutropenia (almost certainly
  unmeasured statin confounding).

Stars deliberately do **not** scale linearly with the OR magnitude — a huge OR
that stems from coupling does not earn more stars than a smaller, cleaner one.

## Forest plot — log axis range and term selection

- The x-axis spans `[0.1, 16]` on log10 to accommodate the large female-sex
  effect for abnormal platelets (aOR 5.28) and the FIB-4 effect for abnormal
  platelets (aOR 3.60), while still leaving room near 1.
- The per-year **age** term was omitted from the forest plot. Its OR (~1) is
  always near the reference line and visually compresses everything else; it
  is fully reported in Table 6.

## Histogram bin widths

Bin widths were chosen pragmatically:

- Hgb: 0.5 g/dL bins
- ANC: 0.5 ×10⁹/L bins
- Platelets: 25 ×10⁹/L bins
- FIB-4: 0.25 unit bins, x-axis trimmed at 8 (long right tail otherwise compresses
  the bulk of the distribution to invisibility; see paper for full range max ≈ 9.86)

Bin counts were computed in R from the underlying `data.csv` (script in
`/tmp/extract_histograms.R` of the analysis project) so the histograms exactly
match the data behind the published Figure 2.

## Composite outcome warning

The "Any CBC abnormality" composite is included because it is reported in the
paper, but the strength card flags that the composite-level effect is largely a
restatement of the platelet-level effect. We surface this caveat instead of
reporting only the larger composite OR.

## What is NOT in the dashboard

- **Supplementary tables S1–S7** — left out to keep the main page focused. They
  would be a sensible follow-up if the paper authors want a long-form companion.
- **APRI sensitivity analysis** — referenced in the FIB-4-coupling caveat but
  not reproduced as a chart; the paper's text suffices.
- **Continuous CBC by FIB-4 scatter** — manuscript Figure 4 panels are summarized
  as the stratified bar chart, which preserves the dramatic gradient without
  needing per-patient data.

## Reproducing the data

If `data.csv` ever changes, regenerate `src/data.js` numeric fields by re-running
the analysis chunks of `manuscript_frontiers_medicine_V0.Rmd` and the helper
scripts used during development:

- `/tmp/extract_paper_numbers.R` (Tables, ORs, FIB-4 strata)
- `/tmp/extract_histograms.R` (Figure 2 bin counts)

Bin counts have been frozen in `src/data.js` to keep the dashboard a static,
zero-dependency artifact.
