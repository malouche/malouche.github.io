---
# An instance of the Portfolio widget.
# Documentation: https://wowchemy.com/docs/page-builder/
widget: portfolio

# This file represents a page section.
headless: true
active: true
# Order that this section appears on the page.
weight: 95

title: Tutorials

content:
  # Page type to display. E.g. project.
  page_type: tutorials

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
  - name: Pandas
    tag: pandas
  - name: NumPy
    tag: numpy
  - name: Desc. Statistics with Python
    tag: descriptive
  - name: Data viz. with R
    tag: datavizwithr
  - name: Big data with R
    tag: bigdatawithr
  - name: Sensory Analysis with R
    tag: sensorywithr
  - name: Probability distribution with Python
    tag:  probdistpython
  - name: Estimation and Confidence intervals with Python
    tag:  estimation
  - name: Hypothesis testing with Python
    tag:  hypothesis
  - name: Multiple Regression
    tag:  mregression
  - name: Getting started with R
    tag:  getR
  - name: Reports, Dashboards and Slides with R
    tag:  rapwithR
  - name: Mosaics plots using `ggmosaic?`
    tag:  mosaicplots
    
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
