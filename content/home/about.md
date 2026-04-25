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
  - number: "80+"
    label: "Peer-reviewed publications"
  - number: "6"
    label: "Research domains"
  - number: "12"
    label: "Interactive dashboards & apps"

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
---
