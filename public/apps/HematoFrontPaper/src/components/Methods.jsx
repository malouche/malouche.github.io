import Section from './ui/Section.jsx';
import Accordion from './ui/Accordion.jsx';
import Math from './ui/Math.jsx';
import StudyFlow from './StudyFlow.jsx';
import { fibrosisCutoffs } from '../data.js';

const OUTCOME_DEFS = [
  {
    title: 'Anemia',
    body: (
      <>
        Hemoglobin <span className="num">&lt; 13 g/dL</span> in males,{' '}
        <span className="num">&lt; 12 g/dL</span> in females (WHO).
      </>
    ),
  },
  {
    title: 'Neutropenia',
    body: (
      <>
        Absolute neutrophil count (ANC){' '}
        <span className="num">&lt; 1.5 × 10⁹/L</span>. ANC = WBC × neutrophil %.
      </>
    ),
  },
  {
    title: 'Thrombocytopenia',
    body: (
      <>
        Platelet count <span className="num">&lt; 150 × 10⁹/L</span>.
      </>
    ),
  },
  {
    title: 'Thrombocytosis',
    body: (
      <>
        Platelet count <span className="num">&gt; 400 × 10⁹/L</span>.
      </>
    ),
  },
  {
    title: 'Abnormal platelets',
    body: <>Thrombocytopenia <em>or</em> thrombocytosis.</>,
  },
  {
    title: 'Any CBC abnormality',
    body: <>Anemia <em>or</em> neutropenia <em>or</em> abnormal platelets.</>,
  },
];

export default function Methods() {
  return (
    <Section id="methods" eyebrow="Section 3" title="Study design and definitions">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <StudyFlow />
          <p className="mt-3 text-xs leading-relaxed text-muted">
            CBC analyses use a complete-case approach for each outcome (n = 765 NASH /
            n = 682 controls); FIB-4-based analyses are restricted to NASH patients with
            available AST, ALT and platelet data (n = 340).
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-ink">Outcome definitions</h3>
          <p className="mt-1 text-sm text-muted">
            Each abnormality is binary, evaluated on the most recent CBC (or the index CBC
            when no follow-up exists).
          </p>
          <div className="mt-3">
            <Accordion items={OUTCOME_DEFS.map((d) => ({ title: d.title, children: d.body }))} />
          </div>
        </div>
      </div>

      {/* Fibrosis scores */}
      <div className="mt-10">
        <h3 className="font-serif text-lg font-semibold text-ink">
          Non-invasive fibrosis scores
        </h3>
        <p className="mt-1 text-sm text-muted">
          FIB-4 and APRI are derived from age, AST, ALT and platelet count.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScoreCard
            title="FIB-4"
            tex={
              '\\text{FIB-4} = \\dfrac{\\text{Age (yr)} \\times \\text{AST (U/L)}}{\\text{Platelets (10}^9\\text{/L)} \\times \\sqrt{\\text{ALT (U/L)}}}'
            }
            cutoffs={fibrosisCutoffs.fib4}
          />
          <ScoreCard
            title="APRI"
            tex={
              '\\text{APRI} = \\dfrac{(\\text{AST}/\\text{ULN}_{\\text{AST}}) \\times 100}{\\text{Platelets (10}^9\\text{/L)}}'
            }
            cutoffs={fibrosisCutoffs.apri}
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Note that <em>platelet count appears in the denominator of both scores</em>: a
          patient with a low platelet count will mechanically score higher on FIB-4 and
          APRI even in the absence of independent biological information. We highlight this
          mathematical coupling on the relevant strength cards.
        </p>
      </div>
    </Section>
  );
}

function ScoreCard({ title, tex, cutoffs }) {
  return (
    <div className="card p-5">
      <p className="font-serif text-base font-semibold text-ink">{title}</p>
      <div className="mt-3 overflow-x-auto">
        <Math tex={tex} display />
      </div>
      <ul className="mt-4 space-y-1.5 text-sm">
        {cutoffs.map((c) => (
          <li key={c.range} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: c.color }}
            />
            <span className="num font-mono text-xs text-muted">{c.range}</span>
            <span className="text-ink">— {c.interpretation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
