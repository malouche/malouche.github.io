import Section from './ui/Section.jsx';

const CARDS = [
  {
    finding: 'Thrombocytopenia is markedly more common in NASH than in matched controls.',
    effect: 'OR 7.13 (95% CI 4.36–12.42), p < 0.001',
    stars: 4,
    rationale: [
      'Very large effect with a tight CI in n = 1,447 (765 NASH + 682 controls).',
      'Plausible mechanism via portal hypertension and splenic sequestration in advanced fibrosis.',
    ],
    caveat:
      'Partly mediated by advanced fibrosis: in the FIB-4 high-risk stratum (n = 29) abnormal-platelet prevalence reaches 69%, suggesting much of the case–control gap is concentrated in fibrotic NASH rather than uniform across the cohort.',
    color: 'nash',
  },
  {
    finding: 'NASH patients have a higher overall burden of any CBC abnormality.',
    effect: 'OR 1.40 (95% CI 1.12–1.75), p = 0.003',
    stars: 4,
    rationale: [
      'Modest but significant effect; CI narrow and well clear of 1.',
      'Driven primarily by platelets — anemia and neutropenia each fail to reach significance individually.',
    ],
    caveat:
      'Composite outcomes inflate apparent effects when one component (here platelets) carries the signal; clinicians should still triage by component.',
    color: 'nash',
  },
  {
    finding: 'Higher FIB-4 is independently associated with abnormal platelets.',
    effect: 'aOR 3.60 per 1-unit FIB-4 (95% CI 2.31–6.09), p < 0.001 — Model 2',
    stars: 2,
    rationale: [
      'Adjusted for age, sex, diabetes, hypertension and dyslipidaemia.',
    ],
    caveat:
      'Mathematical coupling: platelet count is in the FIB-4 denominator, so a low platelet count mechanically raises FIB-4 even without independent biological information. The APRI sensitivity analysis preserves the direction but does not fully disentangle the two; the magnitude is partly tautological.',
    color: 'warn',
  },
  {
    finding: 'Higher FIB-4 is independently associated with anemia.',
    effect: 'aOR 1.53 per 1-unit FIB-4 (95% CI 1.21–1.99), p < 0.001 — Model 2',
    stars: 4,
    rationale: [
      'Anemia (a hemoglobin-based outcome) does not enter the FIB-4 formula, so this association is free of the mathematical-coupling concern that affects platelets.',
      'Consistent with anemia of chronic disease accompanying advancing liver fibrosis.',
    ],
    caveat:
      'Restricted to n = 340 NASH patients with available enzymes — the FIB-4 subset is plausibly sicker or more closely monitored than the full NASH cohort.',
    color: 'accent',
  },
  {
    finding: 'Female sex is strongly associated with anemia in the NASH cohort.',
    effect: 'aOR 2.53 (Model 1) → 4.40 (Model 2), 95% CIs exclude 1',
    stars: 4,
    rationale: [
      'Effect persists and strengthens after adding FIB-4 — i.e., not explained by fibrosis severity.',
      'Direction consistent with menstrual blood loss / lower iron stores in pre-menopausal women.',
    ],
    caveat:
      'No data on menstrual status, iron, B12 or folate; estimate is unadjusted for these mechanistic variables.',
    color: 'control',
  },
  {
    finding:
      'Dyslipidaemia is inversely associated with anemia and neutropenia in adjusted models.',
    effect: 'Anemia aOR 0.40 (0.26–0.60); Neutropenia aOR 0.39 (0.19–0.79) — Model 1',
    stars: 2,
    rationale: ['Statistically significant, but biologically counter-intuitive.'],
    caveat:
      'Almost certainly residual confounding rather than a true protective effect: dyslipidaemic patients are older with higher mean FIB-4 yet less anemia/neutropenia. Likely drivers include statin use (no medication data captured) and selection bias toward patients engaged in preventive care. The paper itself flags this as hypothesis-generating only.',
    color: 'danger',
  },
];

export default function Strength() {
  return (
    <Section
      id="strength"
      eyebrow="Section 5"
      title="Strength of evidence"
    >
      <p className="mb-6 max-w-prose text-sm leading-relaxed text-muted">
        Each card scores a key finding on a 5-star scale based on (i) precision of the
        confidence interval, (ii) whether the association survived multivariable
        adjustment, (iii) freedom from mathematical coupling, and (iv) sample size for
        the relevant analysis. Stars are interpretive, not derived from a single index.
      </p>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <li key={i}>
            <Card {...c} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Stars({ filled, total = 5 }) {
  const items = Array.from({ length: total }, (_, i) => i < filled);
  return (
    <span
      role="img"
      aria-label={`Strength: ${filled} of ${total}`}
      className="font-mono text-sm tracking-tight"
    >
      {items.map((on, i) => (
        <span key={i} className={on ? 'text-warn' : 'text-rule'}>
          ★
        </span>
      ))}
    </span>
  );
}

function Card({ finding, effect, stars, rationale, caveat, color }) {
  const dotColor = {
    nash: 'bg-nash',
    control: 'bg-control',
    accent: 'bg-accent',
    warn: 'bg-warn',
    danger: 'bg-danger',
  }[color] || 'bg-muted';

  return (
    <article className="card h-full p-5">
      <header className="flex items-start justify-between gap-3">
        <span className={`mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
        <p className="font-serif text-base font-semibold leading-snug text-ink">{finding}</p>
        <Stars filled={stars} />
      </header>
      <p className="num mt-3 text-sm font-medium text-ink">{effect}</p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm leading-relaxed text-ink">
        {rationale.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
      <p className="mt-3 border-t border-rule pt-3 text-xs leading-relaxed text-muted">
        <span className="font-semibold text-ink">Caveat. </span>
        {caveat}
      </p>
    </article>
  );
}
