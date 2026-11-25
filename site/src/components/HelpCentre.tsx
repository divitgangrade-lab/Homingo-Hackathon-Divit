import { HELP, tr } from '../content';
import type { Lang } from '../content';
import { findDoc, findSection, formatDate } from '../lib/retrieval';

type Props = { lang: Lang; onOpen: (query: string) => void };

export default function HelpCentre({ lang, onOpen }: Props) {
  const t = tr(lang);

  return (
    <section className="section" id="help">
      <div className="wrap">
        <div className="section__head">
          <span className="sec-no">§05</span>
          <div>
            <h2>Answers with sources, not vibes.</h2>
            <p className="section__lede">
              The help centre reads from the same shelf. Each answer is a short, human summary of a real section, and
              the source line under it tells you exactly where it came from.
            </p>
          </div>
        </div>

        <div className="help">
          {HELP.map(item => {
            const doc = findDoc(item.docId);
            const section = findSection(item.docId, item.sectionId);
            if (!doc || !section) return null;
            return (
              <details key={item.docId + item.sectionId}>
                <summary>
                  <span lang={lang === 'hi' ? 'hi' : undefined}>{item.q[lang]}</span>
                </summary>
                <div className="help__body">
                  <p className={lang === 'hi' ? 'hi' : undefined}>{item.a[lang]}</p>
                  <div className="help__source">
                    <span>
                      {t.helpSource}: <strong>{lang === 'hi' ? doc.titleHi : doc.title}</strong> ·{' '}
                      {section.heading[lang]} · {formatDate(doc.updated, lang)}
                    </span>
                    <button type="button" onClick={() => onOpen(lang === 'hi' ? doc.titleHi : doc.title)}>
                      {t.openInShelf} ↗
                    </button>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
