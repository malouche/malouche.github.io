import { useState } from 'react';

export default function Accordion({ items }) {
  return (
    <div className="divide-y divide-rule rounded-xl border border-rule bg-white">
      {items.map((it, i) => (
        <Item key={i} {...it} />
      ))}
    </div>
  );
}

function Item({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-paper"
      >
        <span className="font-serif text-base font-semibold text-ink">{title}</span>
        <span aria-hidden="true" className="ml-4 text-muted">
          {open ? '–' : '+'}
        </span>
      </button>
      {open && <div className="px-4 pb-4 text-sm leading-relaxed text-ink">{children}</div>}
    </div>
  );
}
