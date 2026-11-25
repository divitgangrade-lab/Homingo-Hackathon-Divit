import { BRIEF_FACTS, BRIEF_SOURCES } from '../content';

export default function Brief() {
  return (
    <section className="section" id="brief">
      <div className="wrap">
        <div className="section__head">
          <span className="sec-no">§07</span>
          <div>
            <h2>The first edition. No winners to copy.</h2>
            <p className="section__lede">
              We went looking for past winners before we wrote a line. There are none — Edition 01 is the first Homingo
              Hackathon. What exists is a brief, a track and a published bar. Here it is, with sources.
            </p>
          </div>
        </div>

        <div className="brief-grid">
          <div className="facts-table">
            {BRIEF_FACTS.map(fact => (
              <div className="facts-table__row" key={fact.k}>
                <span className="facts-table__k">{fact.k}</span>
                <span className="facts-table__v">{fact.v}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="callout">
              <span className="callout__label">Research note</span>
              <h3>Past winners: there are none yet.</h3>
              <p>
                The series page lists Edition 01 as “happening now” and says past editions will appear once the first one
                wraps up. So there is no winner list to study, and inventing one would be worse than admitting it.
              </p>
              <p>
                What the series does publish is the bar: “We judge the thing you ship: a public repo and a demo that
                works.” That is what this page is built against — a working diagnostic, a working shelf, a receipt, and
                the source to check all three.
              </p>
            </div>

            <div className="src-links">
              {BRIEF_SOURCES.map(source => (
                <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                  {source.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
