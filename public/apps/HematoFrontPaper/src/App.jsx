import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Aims from './components/Aims.jsx';
import Methods from './components/Methods.jsx';
import Findings from './components/Findings.jsx';
import Strength from './components/Strength.jsx';
import Limitations from './components/Limitations.jsx';
import Cite from './components/Cite.jsx';
import { paper } from './data.js';

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-1.5 focus:text-sm"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Aims />
        <Methods />
        <Findings />
        <Strength />
        <Limitations />
        <Cite />
      </main>
      <footer className="border-t border-rule bg-white">
        <div className="container-prose flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Companion dashboard for{' '}
            <a href={paper.url} target="_blank" rel="noopener noreferrer">
              Al-Khinji et al., Frontiers in Medicine ({paper.year})
            </a>
            .
          </p>
          <p>
            Code MIT · Underlying paper {paper.license} · Built with React + Recharts +
            Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
}
