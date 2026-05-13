import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = {
  Anemia: '#cc79a7',
  Neutropenia: '#0072b2',
  'Abnormal platelets': '#d55e00',
  'Any CBC': '#1f2933',
};

/**
 * Grouped bar chart of CBC abnormality % across FIB-4 strata (Figure 4).
 * Props: rows = array of { category, n, anemia, neutropenia, abnormalPlatelets, anyCBC }
 */
export default function Fib4StratifiedBar({ rows }) {
  const data = rows.map((r) => ({
    category: `${r.category}\n(n=${r.n})`,
    Anemia: r.anemia,
    Neutropenia: r.neutropenia,
    'Abnormal platelets': r.abnormalPlatelets,
    'Any CBC': r.anyCBC,
  }));
  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 8 }}>
          <CartesianGrid stroke="#e5e3dc" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fill: '#1f2933', fontSize: 11 }}
            interval={0}
            tickFormatter={(v) => v.replace('\n', ' ')}
          />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: '#5b6470', fontSize: 11 }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, borderColor: '#e5e3dc', fontSize: 12 }}
            formatter={(v) => `${v}%`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="square" verticalAlign="top" />
          {Object.keys(COLORS).map((k) => (
            <Bar key={k} dataKey={k} fill={COLORS[k]} radius={[3, 3, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
