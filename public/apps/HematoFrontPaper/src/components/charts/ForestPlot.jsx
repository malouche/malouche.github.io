import { useMemo } from 'react';

const OUTCOME_COLOR = {
  Anemia: '#cc79a7',
  Neutropenia: '#0072b2',
  'Abnormal platelets': '#d55e00',
};

/**
 * Forest plot of Model 2 adjusted ORs on a log-10 axis [0.1, 16].
 * Significant rows (CI excludes 1) are shown with filled dots; non-significant with open dots.
 *
 * Props:
 *   rows: array of { outcome, term, or, ci:[lo,hi], significant }
 *   xMin, xMax: log-axis bounds
 *   height: chart pixel height (responsive width via 100%)
 */
export default function ForestPlot({ rows, xMin = 0.1, xMax = 16 }) {
  const N = rows.length;
  const padTop = 28;
  const padBottom = 36;
  const rowH = 26;
  const labelColW = 240; // left column for term labels
  const ciColW = 110; // right column for OR (CI) text
  const plotLeft = labelColW;
  const plotRightInset = ciColW;
  const height = padTop + padBottom + N * rowH;

  // Use viewBox so the SVG scales; pick an internal width.
  const VW = 760;
  const plotRight = VW - plotRightInset;
  const plotW = plotRight - plotLeft;

  // log10 scale
  const lx = (x) => Math.log10(x);
  const x2px = (x) =>
    plotLeft + ((lx(x) - lx(xMin)) / (lx(xMax) - lx(xMin))) * plotW;

  // Tick positions (log)
  const ticks = useMemo(() => [0.1, 0.25, 0.5, 1, 2, 4, 8, 16].filter((t) => t >= xMin && t <= xMax), [xMin, xMax]);

  return (
    <figure className="card overflow-x-auto p-3 sm:p-4">
      <svg
        viewBox={`0 0 ${VW} ${height}`}
        role="img"
        aria-label="Forest plot of Model 2 adjusted odds ratios"
        className="h-auto w-full"
      >
        {/* Header */}
        <text x={8} y={18} fontSize="11" fill="#5b6470" fontFamily="Inter">
          Outcome · Predictor
        </text>
        <text x={plotRight + 8} y={18} fontSize="11" fill="#5b6470" fontFamily="Inter">
          aOR (95% CI)
        </text>
        <text
          x={(plotLeft + plotRight) / 2}
          y={18}
          fontSize="11"
          fill="#5b6470"
          fontFamily="Inter"
          textAnchor="middle"
        >
          Adjusted OR (log scale)
        </text>

        {/* Reference line at OR = 1 */}
        <line
          x1={x2px(1)}
          x2={x2px(1)}
          y1={padTop}
          y2={padTop + N * rowH}
          stroke="#1f2933"
          strokeDasharray="3 3"
          strokeWidth={1}
        />

        {/* X axis ticks */}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={x2px(t)}
              x2={x2px(t)}
              y1={padTop + N * rowH}
              y2={padTop + N * rowH + 4}
              stroke="#5b6470"
              strokeWidth={1}
            />
            <text
              x={x2px(t)}
              y={padTop + N * rowH + 16}
              fontSize="10"
              fill="#5b6470"
              fontFamily="Inter"
              textAnchor="middle"
              fontVariantNumeric="tabular-nums"
            >
              {t}
            </text>
          </g>
        ))}
        <line
          x1={plotLeft}
          x2={plotRight}
          y1={padTop + N * rowH}
          y2={padTop + N * rowH}
          stroke="#5b6470"
          strokeWidth={1}
        />

        {/* Rows */}
        {rows.map((r, i) => {
          const y = padTop + i * rowH + rowH / 2;
          const cx = x2px(Math.min(Math.max(r.or, xMin), xMax));
          const cxLo = x2px(Math.max(r.ci[0], xMin));
          const cxHi = x2px(Math.min(r.ci[1], xMax));
          const color = OUTCOME_COLOR[r.outcome] || '#1f2933';
          const sig = r.significant ?? !(r.ci[0] <= 1 && r.ci[1] >= 1);

          return (
            <g key={`${r.outcome}-${r.term}`}>
              {/* row guideline (subtle) */}
              {i % 2 === 0 && (
                <rect
                  x={0}
                  y={y - rowH / 2}
                  width={VW}
                  height={rowH}
                  fill="#fafaf7"
                />
              )}

              {/* label */}
              <text
                x={8}
                y={y + 4}
                fontSize="11.5"
                fill="#1f2933"
                fontFamily="Inter"
              >
                <tspan fontWeight="600" fill={color}>
                  {r.outcome}
                </tspan>
                <tspan dx="6" fill="#5b6470">
                  ·
                </tspan>
                <tspan dx="6">{r.term}</tspan>
              </text>

              {/* CI line */}
              <line
                x1={cxLo}
                x2={cxHi}
                y1={y}
                y2={y}
                stroke={color}
                strokeWidth={1.5}
              />
              {/* CI caps */}
              <line x1={cxLo} x2={cxLo} y1={y - 4} y2={y + 4} stroke={color} strokeWidth={1.2} />
              <line x1={cxHi} x2={cxHi} y1={y - 4} y2={y + 4} stroke={color} strokeWidth={1.2} />
              {/* point */}
              <circle
                cx={cx}
                cy={y}
                r={4.5}
                fill={sig ? color : '#ffffff'}
                stroke={color}
                strokeWidth={1.5}
              />

              {/* OR text */}
              <text
                x={plotRight + 8}
                y={y + 4}
                fontSize="11"
                fill="#1f2933"
                fontFamily="Inter"
                fontVariantNumeric="tabular-nums"
              >
                {r.or.toFixed(2)} ({r.ci[0].toFixed(2)}–{r.ci[1].toFixed(2)})
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-xs text-muted">
        Filled dots = 95% CI excludes 1 (significant at <span className="num">α = 0.05</span>);
        open dots = non-significant. Color encodes outcome.
      </figcaption>
    </figure>
  );
}
