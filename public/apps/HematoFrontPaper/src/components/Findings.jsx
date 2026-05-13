import { useState } from 'react';
import Section from './ui/Section.jsx';
import Tabs from './ui/Tabs.jsx';
import PrevalenceBar from './charts/PrevalenceBar.jsx';
import PrevalenceTable from './charts/PrevalenceTable.jsx';
import Donut from './charts/Donut.jsx';
import Histogram from './charts/Histogram.jsx';
import Fib4StratifiedBar from './charts/Fib4StratifiedBar.jsx';
import ForestPlot from './charts/ForestPlot.jsx';
import {
  prevalenceTable,
  nashCohortPrevalence,
  distributions,
  cbcByFib4Category,
  model2,
} from '../data.js';

/* ───────── Tab A ───────── */
function TabA() {
  return (
    <div className="space-y-6">
      <p className="max-w-prose text-sm leading-relaxed text-ink">
        NASH cases had higher prevalences of all four CBC outcomes; the difference is
        dominated by platelet abnormalities, where thrombocytopenia alone yielded a crude
        odds ratio of <strong className="num">7.13</strong> (95% CI 4.36–12.42). Anemia
        and neutropenia were more common in NASH but did not reach statistical
        significance.
      </p>
      <figure className="card p-3 sm:p-4">
        <PrevalenceBar data={prevalenceTable.rows} />
        <figcaption className="mt-3 text-xs text-muted">
          {prevalenceTable.caption} Bars = point estimate; whiskers = 95% Wald CI. Thrombocytosis
          (3.1% NASH vs 3.2% controls) is omitted from the chart and shown in the table below.
        </figcaption>
      </figure>
      <PrevalenceTable data={prevalenceTable.rows} />
    </div>
  );
}

/* ───────── Tab B ───────── */
function TabB() {
  const cohortDonut = nashCohortPrevalence.rows.filter((r) =>
    ['Anemia', 'Neutropenia', 'Thrombocytopenia', 'Thrombocytosis'].includes(r.outcome)
  );

  const PARAM_OPTIONS = [
    { id: 'hgbMale', label: 'Hemoglobin — males (NASH)', dist: distributions.hgbMale, color: '#0072b2' },
    { id: 'hgbFemale', label: 'Hemoglobin — females (NASH)', dist: distributions.hgbFemale, color: '#cc79a7' },
    { id: 'anc', label: 'ANC (NASH)', dist: distributions.anc, color: '#009e73' },
    { id: 'platelets', label: 'Platelets (NASH)', dist: distributions.platelets, color: '#d55e00' },
    { id: 'fib4', label: 'FIB-4 (NASH)', dist: distributions.fib4, color: '#e69f00' },
  ];
  const [paramId, setParamId] = useState('hgbFemale');
  const param = PARAM_OPTIONS.find((p) => p.id === paramId);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <figure className="card p-3 sm:p-4">
        <h4 className="mb-1 font-serif text-base font-semibold text-ink">
          Within-NASH abnormality breakdown
        </h4>
        <p className="text-xs text-muted">
          Among 765 NASH patients with available CBC data; categories are not mutually
          exclusive.
        </p>
        <Donut data={cohortDonut} />
      </figure>

      <figure className="card p-3 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-serif text-base font-semibold text-ink">
            Distribution viewer
          </h4>
          <label className="flex items-center gap-2 text-xs text-muted">
            Parameter:
            <select
              value={paramId}
              onChange={(e) => setParamId(e.target.value)}
              className="rounded-md border border-rule bg-white px-2 py-1 text-xs text-ink focus:outline-none"
            >
              {PARAM_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <Histogram dist={param.dist} color={param.color} />
        <figcaption className="mt-2 text-xs text-muted">
          {param.dist.label}; n = {param.dist.n}. Dashed line = clinical threshold
          ({param.dist.thresholdLabel}).
        </figcaption>
      </figure>
    </div>
  );
}

/* ───────── Tab C ───────── */
function TabC() {
  // Build forest rows from Model 2; drop the per-year age term for visual clarity
  // (its OR (~1) compresses the rest of the axis).
  const forestRows = model2.outcomes.flatMap((o) =>
    o.terms
      .filter((t) => t.term !== 'Age (per year)')
      .map((t) => ({
        outcome: o.outcome,
        term: t.term,
        or: t.or,
        ci: t.ci,
        significant: !(t.ci[0] <= 1 && t.ci[1] >= 1),
      }))
  );

  return (
    <div className="space-y-6">
      <figure className="card p-3 sm:p-4">
        <Fib4StratifiedBar rows={cbcByFib4Category.rows} />
        <figcaption className="mt-3 text-xs text-muted">
          {cbcByFib4Category.caption} The gradient is steepest for abnormal platelets
          (4.9% → 11.5% → 69.0%), in line with the platelet count entering the FIB-4
          denominator. Anemia rises from 14.3% to 44.8%; neutropenia from 3.1% to 10.3%.
        </figcaption>
      </figure>

      <ForestPlot rows={forestRows} xMin={0.1} xMax={16} />
    </div>
  );
}

export default function Findings() {
  return (
    <Section id="findings" eyebrow="Section 4" title="Findings">
      <Tabs
        tabs={[
          { id: 'aim1', label: 'Aim 1', sublabel: 'NASH vs. controls', content: <TabA /> },
          { id: 'aim2', label: 'Aim 2', sublabel: 'Within-NASH', content: <TabB /> },
          { id: 'aim3', label: 'Aim 3', sublabel: 'Fibrosis link', content: <TabC /> },
        ]}
      />
    </Section>
  );
}
