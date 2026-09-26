---
abstract: |
  **Background:** Autoimmune disorders have been linked to increased cardiovascular disease (CVD) risk, but it is unclear whether the association is uniform across conditions or is concentrated in specific diseases, and whether inflammatory markers add value in a Middle Eastern primary-care setting. We examined disease-specific associations between autoimmune disorders and recorded CVD, rather than building a prognostic prediction tool.

  **Methods:** We conducted a matched cross-sectional analysis of 28,374 adults (9,517 with a documented autoimmune disorder — rheumatoid arthritis [RA], systemic lupus erythematosus [SLE], or Hashimoto thyroiditis — and 18,857 age- and sex-matched controls). Because individual matched sets and per-control index dates were not recoverable, associations were estimated with unconditional logistic regression adjusting for the matching variables, using multiple imputation (m = 20) for missing covariates. We fitted nested models (A: traditional risk factors; B: + autoimmune status; C: + C-reactive protein [CRP] and erythrocyte sedimentation rate [ESR]), then a disease-specific model. We assessed discrimination (AUC), out-of-sample calibration, and clinical utility (decision-curve net benefit and categorical reclassification), tested age and sex interactions, and compared logistic regression with tuned random forest and XGBoost. Findings are interpreted as cross-sectional associations, not incident-event predictions.

  **Results:** A recorded cardiovascular diagnosis was present in 2,991 of 28,374 patients (10.5%). Any autoimmune disorder was associated with CVD across all specifications (Model A OR 1.41, 95% CI 1.29–1.55; Model C OR 1.40, 1.28–1.54). The disease-specific model fitted better than the binary model (likelihood-ratio p = 4×10⁻⁴⁰; ΔAIC = 182) and showed marked heterogeneity: SLE was strongly associated with CVD (OR 3.40, 95% CI 2.94–3.94), whereas the adjusted estimate for RA was near the null (OR 1.05, 95% CI 0.94–1.16) and Hashimoto thyroiditis was at most marginally associated (OR 1.19, 95% CI 0.98–1.45). The autoimmune–CVD association was stronger at younger ages (age × autoimmune OR 0.97 per year, p = 4×10⁻¹⁹); disease × sex interactions were not significant. Discrimination was similar across models (AUC 0.823 for Model A to 0.833 for the disease-specific model), and the model was well calibrated out-of-sample (bootstrap-corrected calibration slope 0.997, intercept −0.005, Brier score 0.076). Adding CRP and ESR did not improve net benefit or calibration, and tuned machine-learning models offered no advantage over logistic regression (test-set AUC 0.832 for logistic regression). The clinical value of disease-specific modelling lay in reclassification rather than average discrimination: it correctly moved SLE patients into higher risk categories (event-based net reclassification +0.52) while de-escalating the near-null RA and Hashimoto groups.

  **Conclusions:** In this matched cross-sectional cohort, the association between autoimmune disorders and cardiovascular disease was heterogeneous and driven almost entirely by SLE. The near-null RA estimate should not be read as absence of risk, because the cross-sectional design, over-adjustment for mediators, confounding by indication, and survivor bias plausibly bias it downward; a clinically important RA association cannot be excluded. Point-in-time inflammatory markers added little, and well-calibrated logistic regression performed as well as machine-learning models. Because predictors and the outcome are not temporally anchored, these findings describe disease-specific associations and should not be interpreted as prognostic or causal effects.
authors:
- Aisha Al-Khinji
- admin
- Abdullatif Al-Hor
- Ghalya Al Tamimi
- Noora Al-Korbi
- Hissa Al-Kuwari
- Deema Al Rewaily
- Mohammed Al-Matwi
- Ahmad Haj Bakri
- Mohamed Ghaith Al-Kuwari
date: "2026-09-21T00:00:00Z"
publication: "*American Heart Journal Plus: Cardiology Research and Practice*, 71, 100907"
publication_short: "Am. Heart J. Plus"
publication_types:
- "2"
title: "Autoimmune disorders and cardiovascular disease: a matched cross-sectional analysis of disease-specific associations in Qatari primary care"
tags:
- Cardiovascular risk
- Autoimmune disease
- Systemic lupus erythematosus
- Logistic regression
- Calibration
- Reclassification
- Primary care
- Qatar
- Biostatistics
doi: "10.1016/j.ahjo.2026.100907"
# Accepted 21-Sep-2026 (AHJO-D-26-00032R2); published in vol. 71, article 100907 (Nov 2026).
# Corresponding author: Aisha Al-Khinji.
---
