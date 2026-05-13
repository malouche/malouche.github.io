import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ErrorBar,
} from 'recharts';

const COLORS = { control: '#0072b2', nash: '#d55e00' };

/**
 * Grouped bar chart of NASH vs Controls with 95% CI error bars (Figure 1).
 *
 * Props:
 *   data: array of { outcome, controlPct, controlCI:[lo,hi], nashPct, nashCI:[lo,hi] }
 */
export default function PrevalenceBar({ data }) {
  const chartData = data
    .filter((r) => r.outcome !== 'Thrombocytosis') // matches Figure 1 (4 panels)
    .map((r) => ({
      outcome: shortLabel(r.outcome),
      Control: r.controlPct,
      ControlErr: [r.controlPct - r.controlCI[0], r.controlCI[1] - r.controlPct],
      NASH: r.nashPct,
      NashErr: [r.nashPct - r.nashCI[0], r.nashCI[1] - r.nashPct],
    }));

  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
          <CartesianGrid stroke="#e5e3dc" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="outcome" tick={{ fill: '#1f2933', fontSize: 12 }} interval={0} />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: '#5b6470', fontSize: 11 }}
            domain={[0, (max) => Math.ceil((max + 5) / 5) * 5]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: '#e5e3dc',
              fontSize: 12,
              fontFamily: 'Inter',
            }}
            formatter={(value) => `${value}%`}
          />
          <Legend
            verticalAlign="top"
            height={28}
            iconType="square"
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="Control" fill={COLORS.control} radius={[3, 3, 0, 0]}>
            <ErrorBar dataKey="ControlErr" width={6} stroke={COLORS.control} strokeWidth={1.2} />
          </Bar>
          <Bar dataKey="NASH" fill={COLORS.nash} radius={[3, 3, 0, 0]}>
            <ErrorBar dataKey="NashErr" width={6} stroke={COLORS.nash} strokeWidth={1.2} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function shortLabel(s) {
  return s
    .replace('Abnormal platelets', 'Abn. platelets')
    .replace('Any CBC abnormality', 'Any CBC')
    .replace('Thrombocytopenia', 'Thrombocyt.');
}
