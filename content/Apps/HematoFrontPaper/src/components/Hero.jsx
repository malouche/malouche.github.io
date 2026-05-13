import { paper, cohort } from '../data.js';

const KPIS = [
  {
    value: '1,788',
    label: 'Participants',
    sub: '894 NASH cases · 894 matched controls',
  },
  {
    value: '35.8%',
    label: 'NASH patients with ≥1 CBC abnormality',
    sub: 'vs. 28.4% of controls (OR 1.40, 95% CI 1.12–1.75)',
  },
  {
    value: 'OR 7.13',
    label: 'Thrombocytopenia, NASH vs. controls',
    sub: '95% CI 4.36–12.42 · the strongest single-outcome signal',
  },
];

export default function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-h"
      className="scroll-mt-20 border-b border-rule bg-gradient-to-b from-white to-paper"
    >
      <div className="container-prose py-12 sm:py-16">
        <p className="eyebrow">Frontiers in Medicine · {paper.year}</p>
        <h1
          id="overview-h"
          className="mt-2 font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]"
        >
          {paper.title}
        </h1>

        {/* Authors */}
        <p className="mt-4 text-sm text-ink">
          {paper.authors.map((a, i) => (
            <span key={a.name}>
              {a.name}
              <sup className="ml-0.5 text-[10px] text-muted">{a.affil.join(',')}</sup>
              {a.corresponding && (
                <span aria-label="Corresponding author" className="text-muted">
                  *
                </span>
              )}
              {i < paper.authors.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
        <ol className="mt-2 space-y-0.5 text-xs text-muted">
          {paper.affiliations.map((a) => (
            <li key={a.id}>
              <sup className="mr-1">{a.id}</sup>
              {a.text}
            </li>
          ))}
          <li>
            <span aria-hidden="true" className="mr-1">
              *
            </span>
            Corresponding author
          </li>
        </ol>

        {/* Citation chips */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          <span className="pill">{paper.citation}</span>
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pill !text-control hover:bg-white"
          >
            doi: {paper.doi} ↗
          </a>
          <span className="pill">License: {paper.license}</span>
        </div>

        {/* Plain-language summary */}
        <p className="mt-6 max-w-prose font-serif text-base leading-relaxed text-ink sm:text-lg">
          In a 1:1 frequency-matched case–control study of {cohort.total.toLocaleString()}{' '}
          adults from Qatar&rsquo;s Primary Health Care Corporation, patients with clinically
          diagnosed NASH had a markedly higher prevalence of platelet abnormalities than
          matched controls — driven almost entirely by thrombocytopenia, which scaled steeply
          with the FIB-4 fibrosis score. Anemia, in contrast, tracked female sex and was
          increased at high FIB-4 even though it does not enter the FIB-4 formula, suggesting
          a hematologic signature of advancing liver disease beyond the platelet count itself.
        </p>

        {/* KPIs */}
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {KPIS.map((k) => (
            <li key={k.label} className="card p-5">
              <p className="num font-serif text-3xl font-semibold leading-none text-nash">
                {k.value}
              </p>
              <p className="mt-2 font-serif text-sm font-semibold text-ink">{k.label}</p>
              <p className="num mt-1 text-xs text-muted">{k.sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
