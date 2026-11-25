import { useMemo, useState } from 'react';
import TextType from './rb/TextType';
import { SHELF, SHELF_META, tr } from '../content';
import type { Lang } from '../content';
import { SHELF_COUNT, formatDate, search } from '../lib/retrieval';

type Props = { lang: Lang; initialQuery: string };

const EXAMPLES: { en: string; hi: string }[] = [
  { en: 'which policies changed since March?', hi: 'मार्च के बाद कौन-सी नीतियाँ बदलीं?' },
  { en: 'can I recheck my exam paper?', hi: 'परीक्षा पेपर दोबारा कैसे जाँचा जाएगा?' },
  { en: 'what happens to fees if we move cities?', hi: 'शहर बदलने पर फीस का क्या होगा?' },
];

const TYPED = [
  'which policies changed since March?',
  'can I recheck my exam paper?',
  'फीस वापसी कब मिलेगी?',
  'can I use AI for my project?',
];

export default function Shelf({ lang, initialQuery }: Props) {
  const t = tr(lang);
  const [input, setInput] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery.trim());

  const result = useMemo(() => (submitted.trim() ? search(submitted) : null), [submitted]);

  const run = (query: string) => {
    setInput(query);
    setSubmitted(query.trim());
  };

  return (
    <section className="section" id="shelf">
      <div className="wrap">
        <div className="section__head">
          <span className="sec-no">§03</span>
          <div>
            <h2>Ask the shelf. Get the answer and the source.</h2>
            <p className="section__lede">
              Natural-language search over {SHELF_META.owner}’s {SHELF_META.title.toLowerCase()} — {SHELF_COUNT.docs}{' '}
              documents, {SHELF_COUNT.sections} sections, every one dated. Ask in English or Hindi. The answer is
              extracted, never invented, and every claim carries the section it came from.
            </p>
          </div>
        </div>

        <div className="shelf__grid">
          <div>
            <form
              className="searchbar"
              onSubmit={event => {
                event.preventDefault();
                run(input);
              }}
              role="search"
            >
              <label className="sr-only" htmlFor="shelf-query">
                {t.searchLabel}
              </label>
              <input
                id="shelf-query"
                type="search"
                value={input}
                onChange={event => setInput(event.target.value)}
                placeholder={t.searchPlaceholder}
              />
              <button type="submit" className="btn">
                {t.searchButton}
              </button>
            </form>

            <div className="typer-row" aria-hidden="true">
              <span>try →</span>
              <TextType
                text={TYPED}
                typingSpeed={42}
                deletingSpeed={18}
                pauseDuration={2200}
                loop
                cursorStyle="bar"
                cursorColor="var(--red)"
                className="typer"
              />
            </div>

            <div className="example-chips">
              {EXAMPLES.map(example => (
                <button type="button" className="example-chip" key={example.en} onClick={() => run(example[lang])}>
                  {example[lang]}
                </button>
              ))}
            </div>

            {!result && (
              <p className="muted" style={{ maxWidth: '52ch' }}>
                Nothing is sent anywhere. The index is built in this tab from the ten documents below, and the answer
                below is assembled from the sections that actually matched.
              </p>
            )}

            {result && result.mode === 'changed' && (
              <div className="result">
                <div className="result__answer">
                  <span className="result__label">
                    {lang === 'en' ? `Changed since ${result.since.en}` : `${result.since.hi} के बाद बदला`}
                  </span>
                  {result.items.length ? (
                    <>
                      <p className="result__count">
                        {result.items.length} {lang === 'en' ? 'policies changed' : 'नीतियाँ बदलीं'}
                      </p>
                      <ul className="changed-list">
                        {result.items.map(item => (
                          <li key={item.docId}>
                            <span className="changed-list__title">
                              {lang === 'hi' ? item.titleHi : item.title}
                            </span>
                            <span className="date-badge">{formatDate(item.updated, lang)}</span>
                            <p className={`changed-list__note ${lang === 'hi' ? 'hi' : ''}`}>{item.change[lang]}</p>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="result__text">{t.noHits}</p>
                  )}
                </div>

                <details className="disclose">
                  <summary>{t.why}</summary>
                  <div className="trace">
                    mode: <code>date-filtered change log</code> · {result.trace.sections} {t.sectionsSearched} ·{' '}
                    {t.dateFilter}: <code>{result.trace.since}</code>
                    <br />
                    terms: <code>{result.trace.terms.join(', ') || '—'}</code>
                  </div>
                </details>
              </div>
            )}

            {result && result.mode === 'lookup' && (
              <div className="result">
                {result.hit ? (
                  <>
                    <div className="result__answer">
                      <span className="result__label">{t.answer}</span>
                      <p className={`result__text ${lang === 'hi' ? 'hi' : ''}`}>
                        {result.hit.sec.summary[lang]}
                      </p>
                    </div>

                    <blockquote className="evidence" lang="en">
                      {result.hit.sec.text}
                    </blockquote>

                    <div className="mono muted" style={{ marginBottom: '0.45rem' }}>
                      {t.sources}
                    </div>
                    <ul className="sources">
                      {result.sources.map(source => (
                        <li key={`${source.doc.id}-${source.sec.id}`}>
                          <span>
                            <span className="sources__title">{lang === 'hi' ? source.doc.titleHi : source.doc.title}</span>
                            <span className="sources__sec">{source.sec.heading[lang]}</span>
                          </span>
                          <span className="sources__where">{formatDate(source.doc.updated, lang)}</span>
                        </li>
                      ))}
                    </ul>

                    <details className="disclose">
                      <summary>{t.why}</summary>
                      <div className="trace">
                        mode: <code>BM25-style lookup</code> · {result.trace.sections} {t.sectionsSearched} ·{' '}
                        {t.dateFilter}: <code>{result.trace.since ?? t.noFilter}</code>
                        <br />
                        terms: <code>{result.trace.terms.join(', ') || '—'}</code>
                      </div>
                    </details>
                  </>
                ) : (
                  <div className="result__answer">
                    <span className="result__label">{t.answer}</span>
                    <p className="result__text">{t.noHits}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="shelf-index" aria-label="Documents on the shelf">
            <div className="shelf-index__head">
              <h3>{lang === 'hi' ? SHELF_META.titleHi : SHELF_META.title}</h3>
              <span className="mono muted">2026</span>
            </div>
            <ul className="doc-list">
              {SHELF.map(doc => (
                <li key={doc.id}>
                  <button type="button" onClick={() => run(doc.title)} title={`Search: ${doc.title}`}>
                    <span>
                      {doc.change && <span className="doc-list__flag" aria-label="changed recently" />}
                      {lang === 'hi' ? doc.titleHi : doc.title}
                    </span>
                    <span className="doc-list__date">{formatDate(doc.updated, lang)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="shelf-index__foot">
              {lang === 'en'
                ? `${SHELF_COUNT.docs} documents · ${SHELF_COUNT.sections} sections · red dot = changed`
                : `${SHELF_COUNT.docs} दस्तावेज़ · ${SHELF_COUNT.sections} सेक्शन · लाल बिंदु = बदला`}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
