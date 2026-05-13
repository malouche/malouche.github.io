/**
 * SVG study-flow diagram. Pure-SVG so it scales and prints crisply.
 * Renders an inline title for screen readers.
 */
export default function StudyFlow() {
  return (
    <figure className="card p-4">
      <figcaption className="mb-3 text-xs text-muted">
        Study design and analytic samples (Aims 1–3).
      </figcaption>
      <svg
        viewBox="0 0 720 290"
        role="img"
        aria-labelledby="flow-title flow-desc"
        className="h-auto w-full"
      >
        <title id="flow-title">Study flow diagram</title>
        <desc id="flow-desc">
          From PHCC EHR, 894 NASH cases identified by ICD-10 codes were 1:1 matched on age
          and sex to 894 controls; CBC analysis used 765 NASH and 682 controls; FIB-4
          subset comprised 340 NASH patients.
        </desc>

        {/* Source */}
        <FlowBox x={20} y={120} w={140} h={50} title="PHCC EHR" sub="Adult cohort, Qatar" />

        {/* Cases */}
        <FlowBox
          x={210}
          y={40}
          w={200}
          h={70}
          title="894 NASH cases"
          sub="ICD-10 K75.81 / K76.0 / K76.89"
          accent="nash"
        />
        {/* Controls */}
        <FlowBox
          x={210}
          y={180}
          w={200}
          h={70}
          title="894 matched controls"
          sub="1:1 on age (5-yr) + sex"
          accent="control"
        />

        {/* Analytic samples */}
        <FlowBox
          x={460}
          y={20}
          w={240}
          h={60}
          title="CBC analysis (NASH)"
          sub="n = 765 with hemoglobin / WBC / platelets"
        />
        <FlowBox
          x={460}
          y={100}
          w={240}
          h={60}
          title="CBC analysis (controls)"
          sub="n = 682"
        />
        <FlowBox
          x={460}
          y={180}
          w={240}
          h={70}
          title="FIB-4 subset (NASH)"
          sub="n = 340 with AST + ALT + platelets"
          accent="warn"
        />

        {/* Connectors */}
        <Arrow x1={160} y1={145} x2={210} y2={75} />
        <Arrow x1={160} y1={145} x2={210} y2={215} />
        <Arrow x1={410} y1={75} x2={460} y2={50} />
        <Arrow x1={410} y1={215} x2={460} y2={130} />
        <Arrow x1={410} y1={75} x2={460} y2={215} />
      </svg>
    </figure>
  );
}

function FlowBox({ x, y, w, h, title, sub, accent }) {
  const stroke =
    accent === 'nash'
      ? '#d55e00'
      : accent === 'control'
        ? '#0072b2'
        : accent === 'warn'
          ? '#e69f00'
          : '#5b6470';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        ry={8}
        fill="#ffffff"
        stroke={stroke}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + 22}
        textAnchor="middle"
        fontFamily="'Source Serif 4', Georgia, serif"
        fontSize="14"
        fontWeight="600"
        fill="#1f2933"
      >
        {title}
      </text>
      <text
        x={x + w / 2}
        y={y + 40}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fill="#5b6470"
      >
        {sub}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }) {
  return (
    <g>
      <defs>
        <marker
          id="arr"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#5b6470" />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#5b6470"
        strokeWidth={1.2}
        markerEnd="url(#arr)"
      />
    </g>
  );
}
