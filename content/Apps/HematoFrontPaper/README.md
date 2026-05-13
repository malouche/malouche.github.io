# NASH × CBC — Interactive Companion Dashboard

Interactive single-page dashboard that explains the design, methods and findings of:

> **Al-Khinji A, Malouche D, Al-Thani N, Mustafa A, Abdulmajeed J, Al-Kuwari MG.**
> Hematological abnormalities in clinically diagnosed non-alcoholic steatohepatitis:
> prevalence, clinical correlates, and fibrosis risk in a case–control study from Qatar.
> *Frontiers in Medicine* **13**:1773499 (2026). doi: [10.3389/fmed.2026.1773499](https://doi.org/10.3389/fmed.2026.1773499)

The paper is published open access under **CC BY 4.0**; this dashboard reproduces the
paper's tables and figures with proper citation. The dashboard code is **MIT** (see
`LICENSE.md`).

## Stack

- React 18 + Vite 6 (single-page app, no backend)
- Tailwind CSS 3 (academic palette, color-blind-safe Okabe–Ito accents)
- Recharts (responsive charts) + custom SVG (forest plot, study flow)
- KaTeX (FIB-4 / APRI formulas)

All data is hard-coded in [`src/data.js`](src/data.js); every value can be traced to
the manuscript's Tables 1–6 and Figures 1–5.

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

## Build for production

```bash
npm run build        # outputs ./dist (~860 KB JS gzip ≈ 250 KB)
npm run preview      # serves ./dist on http://localhost:4173
```

## Embedding in a Jekyll site (`malouche.github.io`)

The Vite config sets `base: './'` so the build is path-agnostic.

### Option A — direct deploy (recommended)

Copy the contents of `dist/` into your Jekyll site at e.g.
`projects/nash-cbc-dashboard/`:

```bash
rsync -a --delete dist/ /path/to/malouche.github.io/projects/nash-cbc-dashboard/
```

Then link from a markdown page:

```markdown
[Open the interactive dashboard ↗](/projects/nash-cbc-dashboard/)
```

Place a Jekyll exclusion if needed:

```yaml
# _config.yml
exclude:
  - projects/nash-cbc-dashboard/.vite
```

### Option B — embed via iframe

```html
<iframe
  src="/projects/nash-cbc-dashboard/"
  title="NASH × CBC dashboard"
  loading="lazy"
  style="width:100%; height:90vh; border:0;"
></iframe>
```

### Option C — Vercel / Netlify

The `dist/` folder is a complete static site. Point any static host (Vercel, Netlify,
GitHub Pages, Cloudflare Pages) at it. No environment variables, no build-time secrets.

## Project layout

```
src/
  App.jsx                    # top-level shell + section composition
  main.jsx                   # React + KaTeX bootstrap
  index.css                  # Tailwind + base typography
  data.js                    # ALL paper data — single source of truth
  components/
    Nav.jsx                  # sticky top navigation
    Hero.jsx                 # Section 1 — title, authors, KPIs, summary
    Aims.jsx                 # Section 2 — three research-question cards
    Methods.jsx              # Section 3 — flow + outcome defs + KaTeX
    StudyFlow.jsx            # SVG flow diagram (PHCC → cases/controls → analyses)
    Findings.jsx             # Section 4 — tabbed Aim 1/2/3 panels
    Strength.jsx             # Section 5 — strength-of-evidence cards
    Limitations.jsx          # Section 6 — accordion of caveats
    Cite.jsx                 # Section 7 — BibTeX + links
    ui/
      Section.jsx            # consistent section wrapper
      Tabs.jsx               # ARIA-compliant tabs (←/→ keyboard nav)
      Accordion.jsx          # collapsible
      Math.jsx               # KaTeX wrapper
    charts/
      PrevalenceBar.jsx      # Figure 1 (NASH vs Controls)
      PrevalenceTable.jsx    # Table 3 (sortable)
      Donut.jsx              # within-NASH abnormality breakdown
      Histogram.jsx          # Figure 2 distribution viewer
      Fib4StratifiedBar.jsx  # Figure 4
      ForestPlot.jsx         # Figure 5 — pure SVG, log scale
```

## Accessibility

- Semantic HTML (`<main>`, `<section>`, `<nav>`, `<figure>`, `<table>`).
- Tab interface implements WAI-ARIA tab pattern with arrow-key navigation.
- Visible focus rings; skip-to-content link.
- All charts have descriptive `figcaption` and `aria-label`.
- Color palette follows Okabe–Ito; never relies on color alone (also uses position +
  fill/outline on the forest plot).

## Data provenance

`src/data.js` is the single source of truth. Numeric values come from two sources:

1. **The published paper** (Tables 1–6, Figures 1–5).
2. **The R analysis script** that produced the paper's tables (counts re-derived
   from `data.csv` to extract bin-level distributions for the histograms).

Where the paper does not report a value, the field is set to `null` with a `// TODO`
comment.

## Screenshot

> Add a screenshot here once captured: `docs/screenshot.png`.

## License

- Dashboard code: **MIT** (see `LICENSE.md`).
- Underlying paper: **CC BY 4.0** (Frontiers in Medicine).
