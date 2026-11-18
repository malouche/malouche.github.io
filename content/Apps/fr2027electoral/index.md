---
date: "2026-11-16T00:00:00Z"
external_link: "https://fr2027-electoral-climate.netlify.app/"
summary: "A research dashboard that follows the 2027 French presidential election through published polls, online attention and episodes of social tension. A Bayesian state-space model turns scattered first-round polls into a daily estimate with credible intervals, and simulations carried to election day give each candidate's chance of reaching the run-off. It is an academic example of how statistics can summarise noisy public data, not a forecast to bet on. Everything is built from public sources (Wikipedia poll lists under CC BY-SA 4.0, Wikimedia page views under CC0, GDELT and ACLED events), and the dashboard lists each source with its licence."
tags:
- research-dashboards
- elections
- polls
- bayesian
- state-space-models
- public-data
- reproducible-research
- web-app
- current
title: "Electoral Climate 2027: Polls, Attention and Social Tension"
---

**Electoral Climate 2027** follows the 2027 French presidential election through public data. It combines published opinion polls, online attention and episodes of social tension in one dashboard that is rebuilt automatically as new polls and records appear. It is an academic project, and the dashboard states that it is research, not a forecast to bet on and not financial advice.

## What it shows

The poll average is the output of a Bayesian state-space model fitted to every published first-round poll. The model weights each poll by its sample size, corrects for each institute's usual lean and for the fact that institutes do not all offer the same list of candidates, and follows each candidate day by day. Carrying the estimate to election day many thousands of times gives each candidate a chance of reaching the run-off, with the uncertainty left visible instead of rounded away. Further sections show who is rising fastest, how online attention (Wikipedia page views) and social tension (protest and violence event counts) move around the polls, and what the model implies under a few scenarios. The dashboard is available in English and French, and it withholds poll results during the restricted period before each round, as French law requires.

## Why it is on this page

The dashboard is a worked example of statistics applied to public data: how scattered and imperfect polls become one estimate with an interval, why polls that offer different lists of candidates cannot be compared directly, and what a model can and cannot say about a future event. It accompanies a research project and is also meant for teaching.

## Data and licence

Everything is built from public sources accessed by code. Poll results come from the Wikipedia lists of polls (CC BY-SA 4.0), daily page views from the Wikimedia API (CC0 1.0), and protest and violence events from GDELT and from ACLED, which appears only as weekly national aggregates under ACLED's terms. The register of the Commission des sondages is used to match poll notices. Raw prediction-market prices are not republished. The dashboard's *Method and data* page lists every source with its licence and attribution; the hand-curated event calendar is released under CC BY 4.0, and the cropped candidate photographs keep their Wikimedia Commons licences, credited on the same page.
