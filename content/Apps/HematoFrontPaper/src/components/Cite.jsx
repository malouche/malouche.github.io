import { useState } from 'react';
import Section from './ui/Section.jsx';
import { paper, bibtex } from '../data.js';

export default function Cite() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="cite" eyebrow="Section 7" title="Cite this paper">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-rule bg-paper px-4 py-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                BibTeX
              </span>
              <button
                type="button"
                onClick={copy}
                aria-live="polite"
                className="rounded-md border border-rule bg-white px-2.5 py-1 text-xs font-medium text-ink hover:border-ink"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
            <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-ink">
              <code>{bibtex}</code>
            </pre>
          </div>
        </div>

        <aside className="card p-5 text-sm">
          <h3 className="font-serif text-base font-semibold text-ink">Resources</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={paper.url} target="_blank" rel="noopener noreferrer">
                doi.org/{paper.doi} ↗
              </a>
            </li>
            <li>
              <a
                href="https://www.frontiersin.org/journals/medicine"
                target="_blank"
                rel="noopener noreferrer"
              >
                Frontiers in Medicine ↗
              </a>
            </li>
            <li>
              <a
                href="https://orcid.org/0000-0002-0494-7141"
                target="_blank"
                rel="noopener noreferrer"
              >
                D. Malouche · ORCID 0000-0002-0494-7141 ↗
              </a>
            </li>
            <li>
              <a href="https://dhafermalouche.net" target="_blank" rel="noopener noreferrer">
                ← Back to dhafermalouche.net
              </a>
            </li>
          </ul>
          <p className="mt-4 border-t border-rule pt-3 text-xs text-muted">
            The underlying article is published open-access under {paper.license}; figures
            and quantitative results may be reproduced with citation.
          </p>
        </aside>
      </div>
    </Section>
  );
}
