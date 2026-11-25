import { BUILD_FACTS, LIMITS } from '../content';
import type { Lang } from '../content';

export default function Build({ lang }: { lang: Lang }) {
  return (
    <section className="section section--ink" id="build">
      <div className="wrap">
        <div className="section__head">
          <span className="sec-no">§06</span>
          <div>
            <h2>What is actually running.</h2>
            <p className="section__lede">
              No backend, no API keys, no analytics. Everything on this page — the diagnostic, the index, the rubric —
              runs in the browser, on data committed to the repo. The source lives in <code>site/</code>; this page is
              its built output.
            </p>
          </div>
        </div>

        <div className="facts">
          {BUILD_FACTS.map(fact => (
            <div className="fact" key={fact.k}>
              <span className="fact__k">{fact.k}</span>
              <p className="fact__v">{fact.v}</p>
            </div>
          ))}
        </div>

        <div className="limits">
          <h3>Known limits</h3>
          <ul>
            {LIMITS.map(limit => (
              <li key={limit.en} lang={lang === 'hi' ? 'hi' : undefined}>
                {limit[lang]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
