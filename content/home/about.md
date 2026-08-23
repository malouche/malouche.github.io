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
  - number: "15"
    label: "Interactive dashboards & apps"

# Highlighted publication CTA. Leave `url` unset so the partial resolves the
# most recently published item under content/publication/ automatically,
# skipping entries with `link_disabled: true` (accepted-but-not-yet-in-
# production papers, which have no article page worth sending a visitor to).
# Set `url` / `title` / `sublabel` here only to pin a specific paper.
latest_paper_button:
  label: "Featured paper"

# Direct shortcuts to the teaching apps and dashboards — rendered as a button
# under the stats grid in the hero. Each `url` is the deployed Netlify app
# itself, so the button takes the visitor straight to the working tool.
app_buttons_title: "Try the teaching apps & dashboards"
app_buttons:
  - label: "CellCalc"
    sublabel: "Bench calculators, worked step by step"
    url: "https://cellcalc.netlify.app/"
  - label: "STAT 481 Revision"
    sublabel: "Multivariate analysis — offline revision"
    url: "https://stat481-revision.netlify.app/"
  - label: "STAT 312 Revision"
    sublabel: "Stochastic processes — offline revision"
    url: "https://stat312-revision.netlify.app/"
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
  - label: "Municipales 2026"
    sublabel: "French municipal elections"
    url: "https://municipales-france-2026.netlify.app/"
---
