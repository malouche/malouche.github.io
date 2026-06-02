---
date: "2026-06-02T00:00:00Z"
external_link: "https://municipales-france-2026.netlify.app/"
image:
  caption: "Interactive choropleth of the 96 metropolitan departments: switch between the first and second round, compare political blocs and parties, and click a department to read its detailed results."
  focal_point: Smart
  preview_only: false
summary: "An interactive dashboard of the 2026 French municipal elections (rounds of 15 and 22 March 2026). Official Ministry of the Interior results, aggregated from the polling-station level to the 96 metropolitan departments, are mapped with Leaflet and explored by political bloc and party. Built in R (tidyverse, sf) with a static HTML/JS front end deployed on Netlify."
tags:
- elections
- France
- municipal-elections
- choropleth
- leaflet
- mapping
- political-data
- data-gouv
- tidyverse
- sf
- R
- web-app
- current
title: "Municipales 2026 — French Municipal Elections Dashboard"
---

An interactive dashboard that visualises the official results of the **2026 French municipal elections** (first round on 15 March and second round on 22 March 2026) across the 96 departments of metropolitan France. It belongs to the same family of browser-based teaching and outreach tools as the Stat\* apps, but turns the focus to applied electoral statistics and geographic data.

## What the dashboard shows

The data come from the **Ministry of the Interior**, published on [data.gouv.fr](https://www.data.gouv.fr) at the polling-station level and aggregated up to the department. For each round the app lets the visitor:

- read a **choropleth map** of France, coloured by the leading political bloc or by a selected party's vote share;
- switch between **political blocs** (left, centre, right, far-right) and individual **parties**, with national summaries updating in step;
- inspect national indicators — registered voters (*inscrits*), turnout (*participation*), valid votes (*exprimés*), and each party's share of the valid vote;
- click any **department** to open its detailed breakdown, including vote counts, vote share, the number of territories led, and the median rank of each bloc.

A small glossary panel defines the core electoral quantities — *inscrits*, *votants*, *exprimés*, participation, and share of the valid vote — so the dashboard doubles as a teaching aid on how electoral indicators are constructed.

## Technical notes

The data pipeline is written in **R** with **tidyverse** and **sf** for cleaning, aggregation, and the geometry of the departmental boundaries. The front end is a static **HTML / CSS / JavaScript** application using **Leaflet.js** for the interactive cartography; it is deployed continuously on **Netlify** and runs entirely client-side once the data layer has loaded.