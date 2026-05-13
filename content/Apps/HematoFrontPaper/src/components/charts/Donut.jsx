import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const PALETTE = ['#d55e00', '#e69f00', '#cc79a7', '#0072b2'];

/**
 * Donut/ring chart for within-NASH abnormality proportions.
 * Props: data: array of { outcome, pct, n }
 */
export default function Donut({ data }) {
  const palette = data.map((_, i) => PALETTE[i % PALETTE.length]);
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="pct"
            nameKey="outcome"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            isAnimationActive={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={palette[i]} stroke="#fff" strokeWidth={1} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: '#e5e3dc',
              fontSize: 12,
            }}
            formatter={(value, _name, props) => [
              `${value}% (n=${props.payload.n})`,
              props.payload.outcome,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={32}
            wrapperStyle={{ fontSize: 12 }}
            iconType="square"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
