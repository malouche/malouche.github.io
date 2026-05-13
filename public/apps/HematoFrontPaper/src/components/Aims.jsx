import Section from './ui/Section.jsx';

const AIMS = [
  {
    n: 1,
    title: 'Prevalence comparison',
    rationale:
      'Are CBC abnormalities (anemia, neutropenia, abnormal platelets) more frequent in NASH patients than in age- and sex-matched non-NASH controls drawn from the same primary-care population?',
    outcome: 'Crude odds ratios (NASH vs. control) for each predefined CBC outcome.',
    tag: 'Case–control',
  },
  {
    n: 2,
    title: 'Clinical phenotype within NASH',
    rationale:
      'Within the NASH cohort, which demographic and metabolic characteristics — age, sex, diabetes, hypertension, dyslipidaemia — are independently associated with each CBC abnormality?',
    outcome: 'Multivariable logistic regression (Model 1, n = 765).',
    tag: 'Within-NASH',
  },
  {
    n: 3,
    title: 'Link to non-invasive fibrosis',
    rationale:
      'How do CBC abnormalities scale with FIB-4 categories, and does FIB-4 itself contribute independently after adjustment for age, sex and metabolic comorbidities?',
    outcome: 'Stratified prevalences + Model 2 with FIB-4 added (n = 340).',
    tag: 'Fibrosis link',
  },
];

export default function Aims() {
  return (
    <Section
      id="aims"
      eyebrow="Section 2"
      title="Three research questions"
    >
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {AIMS.map((a) => (
          <li key={a.n} className="card flex flex-col p-5">
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm font-semibold text-muted">
                Aim {a.n}
              </span>
              <span className="pill">{a.tag}</span>
            </div>
            <h3 className="mt-2 font-serif text-lg font-semibold text-ink">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink">{a.rationale}</p>
            <p className="mt-auto pt-4 text-xs text-muted">
              <span className="font-semibold text-ink">Outcome → </span>
              {a.outcome}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
