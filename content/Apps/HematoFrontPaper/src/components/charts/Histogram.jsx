import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

/**
 * Generic histogram with one or two clinical-threshold reference lines.
 * Props: dist = { bins:[{mid,count}], threshold, upperThreshold?, label, unit }
 */
export default function Histogram({ dist, color = '#d55e00' }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <BarChart data={dist.bins} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
          <CartesianGrid stroke="#e5e3dc" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="mid"
            type="number"
            domain={['dataMin', 'dataMax']}
            tick={{ fill: '#5b6470', fontSize: 11 }}
            label={{
              value: dist.unit ? `${dist.unit}` : '',
              position: 'insideBottom',
              offset: -2,
              fill: '#5b6470',
              fontSize: 11,
            }}
          />
          <YAxis tick={{ fill: '#5b6470', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, borderColor: '#e5e3dc', fontSize: 12 }}
            labelFormatter={(v) => `≈ ${v} ${dist.unit}`}
            formatter={(v) => [v, 'count']}
          />
          <Bar dataKey="count" fill={color} radius={[2, 2, 0, 0]} />
          {dist.threshold != null && (
            <ReferenceLine
              x={dist.threshold}
              stroke="#1f2933"
              strokeDasharray="4 3"
              label={{
                value: String(dist.threshold),
                position: 'top',
                fill: '#1f2933',
                fontSize: 10,
              }}
            />
          )}
          {dist.upperThreshold != null && (
            <ReferenceLine
              x={dist.upperThreshold}
              stroke="#1f2933"
              strokeDasharray="4 3"
              label={{
                value: String(dist.upperThreshold),
                position: 'top',
                fill: '#1f2933',
                fontSize: 10,
              }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
