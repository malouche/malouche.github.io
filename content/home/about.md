---
# Wowchemy stock `about` widget — rendered by
# layouts/partials/widgets/about.html (the redesigned hero).

widget: about
headless: true
weight: 5
active: true

eyebrow: "Professor of Statistics · Qatar University"
heading: "Dhafer Malouche"
lede: "I work at the intersection of **statistical methodology** and **applied data science** — building graphical and Bayesian models, analyzing biomedical and public-health data, and developing interactive tools that make statistical reasoning reproducible and teachable."

location: "Doha, Qatar"

# Tag chips shown under the lede — research topics, not countries.
topics:
  - "Bayesian networks & graphical models"
  - "Biomedical & public-health statistics"
  - "Chronic-pain & oncology modeling"
  - "Survey methodology & data quality"
  - "Reproducible data science (R · Python)"
  - "Interactive dashboards & Shiny apps"

cta_primary:
  label: "View research"
  url: "#publications"
cta_secondary:
  label: "Google Scholar ↗"
  url: "https://scholar.google.com/citations?user=rLJsvjUAAAAJ&hl=en"
cta_tertiary:
  label: "ORCID ↗"
  url: "https://orcid.org/0000-0002-0494-7141"

# TODO: adjust these numbers to match your real counts.
stats:
  - number: "25+"
    label: "Years in academia"
  - number: "60+"
    label: "Peer-reviewed publications"
  - number: "13"
    label: "Interactive dashboards & apps"

# Highlighted publication CTA. When `url` is set the partial uses it
# directly (and skips the auto-resolution of the most recent publication
# under content/publication/). Currently pinned to the KILAW 2026 paper
# co-authored with Chaker Mzoughi, which has just received very positive
# reviews from the proceedings committee.
latest_paper_button:
  label: "Featured paper"
  # Direct link to the pinned publication page.
  url: "/publication/kilaw2026/"
  # Hover/title text used by the partial when the link is explicit.
  title: "Legislating the Future: Statistical Foresight as a Foundation for Anticipatory Law (KILAW 2026, with Chaker Mzoughi)"
  # Shown as the secondary line of the button.
  sublabel: "Forthcoming · KILAW 2026"

# Direct shortcuts to the Stat* teaching apps — rendered as a button row
# under the stats grid in the hero. Each `url` is the deployed Netlify app
# itself, so the button takes the visitor straight to the working tool.
app_buttons_title: "Try the Stat* teaching apps"
app_buttons:
  - label: "StatTables"
    sublabel: "Distribution tables"
    url: "https://melodious-seahorse-9e2173.netlify.app/"
  - label: "StatTests"
    sublabel: "Hypothesis tests"
    url: "https://stat-tests-malouche.netlify.app/"
  - label: "StatRegress"
    sublabel: "Linear regression"
    url: "https://statregress.netlify.app/"
  - label: "StatCI"
    sublabel: "Confidence intervals"
    url: "https://stat-ci.netlify.app/"
  - label: "StatPower"
    sublabel: "Power & sample size"
    url: "https://statpower-malouche.netlify.app/"
  - label: "StatCorr"
    sublabel: "Correlation workbench"
    url: "https://stat-corr-755.netlify.app/"
  - label: "StatPCA"
    sublabel: "Principal component analysis"
    url: "https://stat-pca.netlify.app/"
  - label: "StatANOVA"
    sublabel: "One-way ANOVA & Tukey HSD"
    url: "https://stat-anova.netlify.app/"
  - label: "NASH-CBC"
    sublabel: "NASH × CBC companion dashboard"
    url: "https://nash-cbc-dashboard.netlify.app/"
---
