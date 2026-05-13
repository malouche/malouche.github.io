import { useState, useRef } from 'react';

export default function Tabs({ tabs, initial = 0 }) {
  const [active, setActive] = useState(initial);
  const refs = useRef([]);

  const onKeyDown = (e) => {
    const last = tabs.length - 1;
    let next = active;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1 border-b border-rule"
      >
        {tabs.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${t.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={[
                '-mb-px rounded-t-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-b-2 border-nash bg-paper text-ink'
                  : 'border-b-2 border-transparent text-muted hover:text-ink',
              ].join(' ')}
            >
              <span className="font-serif text-base">{t.label}</span>
              {t.sublabel && (
                <span className="ml-2 hidden text-xs text-muted sm:inline">{t.sublabel}</span>
              )}
            </button>
          );
        })}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={i !== active}
          className="pt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
