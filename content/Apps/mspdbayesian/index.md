---
date: "2026-06-23T00:00:00Z"
external_link: "https://ms-pd-bayesian-dashboard.netlify.app/"
image:
  caption: "Header of the dashboard, with the study at a glance for Al-Sharman et al. (2026, *Journal of Multidisciplinary Healthcare*)."
  focal_point: Smart
  preview_only: false
summary: "An interactive companion to Al-Sharman et al. (2026), Journal of Multidisciplinary Healthcare, a comparative Bayesian network analysis of directional symptom dependencies in multiple sclerosis (n = 104) and Parkinson's disease (n = 54). It shows the learned networks, the reported edge strengths and the bootstrap edge stability, and it serves as an example of how to read a Bayesian network without mistaking arrows for causes. It uses only the results printed in the open-access article (CC BY-NC 3.0) and no participant-level data."
tags:
- research-dashboards
- bayesian-networks
- multiple-sclerosis
- parkinsons-disease
- companion-dashboard
- biostatistics
- reproducible-research
- web-app
- current
title: "Directional Symptom Dependencies in MS and Parkinson's Disease: Interactive Summary (Al-Sharman et al., 2026)"
---

An interactive summary of **Al-Sharman, Khalil, Malouche, Kanaan, Kim, Saad and Abdelrazeq (2026)**, *Journal of Multidisciplinary Healthcare* 19, 1-19, [doi:10.2147/JMDH.S607760](https://doi.org/10.2147/JMDH.S607760). The article is a comparative Bayesian network analysis of symptom dependencies in multiple sclerosis (n = 104) and Parkinson's disease (n = 54).

## What the dashboard shows

Two directed networks, one for each disease, in which anxiety sits at the centre of both while the pathways leading out of it differ. Edge thickness follows the absolute strength of the relationship and colour its sign. Hovering over a node or an edge gives the reported coefficient and p-value, and a sortable table lists every edge shown. A short section sets what the two diseases share against what is specific to each, and a final panel reports how often each edge recurred across 500 bootstrap resamples: 21 of 27 edges in multiple sclerosis and 14 of 15 in Parkinson's disease.

## Reading the arrows

The study is cross-sectional. The arrows are directional dependencies learned from data by hill-climbing structure learning with Gaussian BIC scoring, so they are hypotheses to test and not established cause and effect. The dashboard repeats this warning at the top, which makes it a useful example of how to read a Bayesian network without mistaking arrows for causes.

## Data and licence

The dashboard contains no participant-level data. It reproduces only results printed in the article, which is open access under a CC BY-NC 3.0 licence (Dove Medical Press).
