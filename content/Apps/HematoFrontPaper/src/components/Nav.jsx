const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'aims', label: 'Aims' },
  { id: 'methods', label: 'Methods' },
  { id: 'findings', label: 'Findings' },
  { id: 'strength', label: 'Strength' },
  { id: 'limits', label: 'Limits' },
  { id: 'cite', label: 'Cite' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="container-prose flex h-14 items-center justify-between gap-4">
        <a
          href="#overview"
          className="flex items-center gap-2 no-underline focus:outline-none"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-nash"
          />
          <span className="font-serif text-base font-semibold text-ink">
            NASH × CBC
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            Al-Khinji et al. 2026
          </span>
        </a>
        <nav aria-label="Section navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded px-2.5 py-1 text-sm text-muted no-underline hover:bg-white hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="https://doi.org/10.3389/fmed.2026.1773499"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-md border border-rule bg-white px-3 py-1.5 text-xs font-medium text-ink no-underline hover:border-ink sm:inline-block"
        >
          Open paper ↗
        </a>
      </div>
      {/* mobile: horizontal scroll of section links */}
      <nav aria-label="Section navigation (mobile)" className="md:hidden">
        <ul className="flex items-center gap-1 overflow-x-auto px-4 pb-2">
          {SECTIONS.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="rounded px-2.5 py-1 text-xs text-muted no-underline hover:bg-white hover:text-ink"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
