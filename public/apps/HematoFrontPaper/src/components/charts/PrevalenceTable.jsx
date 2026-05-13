import { useMemo, useState } from 'react';

const COLS = [
  { key: 'outcome', label: 'Outcome', sortable: true },
  { key: 'controlPct', label: 'Control %', sortable: true, align: 'right' },
  { key: 'nashPct', label: 'NASH %', sortable: true, align: 'right' },
  { key: 'or', label: 'OR (95% CI)', sortable: true, align: 'right' },
];

const fmtCI = (lo, hi) => `${lo.toFixed(1)}–${hi.toFixed(1)}`;
const fmtORci = (lo, hi) => `${lo.toFixed(2)}–${hi.toFixed(2)}`;

export default function PrevalenceTable({ data }) {
  const [sortKey, setSortKey] = useState('or');
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...data];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string' && typeof bv === 'string') {
        return asc ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return asc ? av - bv : bv - av;
    });
    return copy;
  }, [data, sortKey, asc]);

  const toggle = (k) => {
    if (sortKey === k) setAsc((v) => !v);
    else {
      setSortKey(k);
      setAsc(false);
    }
  };

  return (
    <div className="card mt-6 overflow-hidden">
      <table className="w-full text-sm">
        <caption className="sr-only">
          Table 3. Prevalence of CBC abnormalities, NASH cases vs controls.
        </caption>
        <thead className="bg-paper text-left text-xs uppercase tracking-wider text-muted">
          <tr>
            {COLS.map((c) => {
              const isActive = sortKey === c.key;
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={`px-3 py-2 ${c.align === 'right' ? 'text-right' : ''}`}
                >
                  {c.sortable ? (
                    <button
                      onClick={() => toggle(c.key)}
                      className="inline-flex items-center gap-1 hover:text-ink"
                      aria-sort={isActive ? (asc ? 'ascending' : 'descending') : 'none'}
                    >
                      {c.label}
                      <span aria-hidden="true" className="text-[10px]">
                        {isActive ? (asc ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="num divide-y divide-rule">
          {sorted.map((r) => (
            <tr key={r.outcome} className="hover:bg-paper">
              <th scope="row" className="px-3 py-2 text-left font-medium text-ink">
                {r.outcome}
              </th>
              <td className="px-3 py-2 text-right">
                {r.controlPct.toFixed(1)}%{' '}
                <span className="text-xs text-muted">({fmtCI(...r.controlCI)})</span>
              </td>
              <td className="px-3 py-2 text-right">
                {r.nashPct.toFixed(1)}%{' '}
                <span className="text-xs text-muted">({fmtCI(...r.nashCI)})</span>
              </td>
              <td className="px-3 py-2 text-right">
                <span className="font-semibold text-ink">{r.or.toFixed(2)}</span>{' '}
                <span className="text-xs text-muted">({fmtORci(...r.orCI)})</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
