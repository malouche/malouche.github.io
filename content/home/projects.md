---
# An instance of the Portfolio widget.
# Documentation: https://wowchemy.com/docs/page-builder/
widget: portfolio

# This file represents a page section.
headless: true
active: true
# Order that this section appears on the page.
weight: 65

title: Dashboards
subtitle: ''

content:
  # Page type to display. E.g. project.
  page_type: project

  # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
  filter_default: 0

  # Filter toolbar (optional).
  # Add or remove as many filters (`filter_button` instances) as you like.
  # To show all items, set `tag` to "*".
  # To filter by a specific tag, set `tag` to an existing tag name.
  # To remove the toolbar, delete the entire `filter_button` block.
  filter_button:
  - name: All
    tag: '*'
  - name: Municipal Elections 2018
    tag: elections
  - name: Crédits Votés
    tag: credits
  - name: COVID-19 deaths
    tag: covid
  - name: COVID-19 US vs EU
    tag: covuseu
  - name: COVID-19 in Tunisia (4/4/2020)
    tag: tuniscovid
  - name: Number of beds vs COVID-19 cases (May 2020)
    tag: bedscovid
  - name: COVID-19 Africa 2020 vs 2021
    tag: africa2021
  - name: COVID-19 Europe 2020 vs 2021
    tag: europe2021
    
design:
  # Choose how many columns the section has. Valid values: '1' or '2'.
  columns: '2'

  # Toggle between the various page layout types.
  #   1 = List
  #   2 = Compact
  #   3 = Card
  #   5 = Showcase
  view: 3

  # For Showcase view, flip alternate rows?
  flip_alt_rows: false
---
