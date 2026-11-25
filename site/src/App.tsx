import { useCallback, useState } from 'react';
import type { Lang } from './content';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Gap from './components/Gap';
import Ladder from './components/Ladder';
import Shelf from './components/Shelf';
import Proof from './components/Proof';
import HelpCentre from './components/HelpCentre';
import Build from './components/Build';
import Brief from './components/Brief';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [seed, setSeed] = useState({ q: '', n: 0 });

  const openInShelf = useCallback((query: string) => {
    setSeed(current => ({ q: query, n: current.n + 1 }));
    const target = document.getElementById('shelf');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, []);

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav lang={lang} setLang={setLang} />

      <main id="main">
        <Hero lang={lang} />
        <Gap />
        <Ladder lang={lang} />
        <Shelf key={seed.n} lang={lang} initialQuery={seed.q} />
        <Proof lang={lang} />
        <HelpCentre lang={lang} onOpen={openInShelf} />
        <Build lang={lang} />
        <Brief />
      </main>

      <Footer />
    </div>
  );
}
