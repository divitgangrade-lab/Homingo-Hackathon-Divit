export default function Gap() {
  return (
    <section className="section" id="gap">
      <div className="wrap">
        <div className="section__head">
          <span className="sec-no">§01</span>
          <div>
            <h2>A tutor for every learner. Not an app that keeps them busy.</h2>
            <p className="section__lede">
              The best way to learn has always been a great personal tutor. Almost nobody has one. That is not a
              content problem — it is a diagnosis problem.
            </p>
          </div>
        </div>

        <div className="gap__grid">
          <div className="gap__copy">
            <p>
              A good tutor does something no textbook can: they find the exact place where your understanding stops.
              Not the chapter you are on — the rung underneath it that never got built. Then they explain that rung in
              your language, at your level, and they do not move on until you can say it back.
            </p>

            <blockquote className="pullquote">
              “An AI tutor can find exactly where a learner is stuck, explain it in their language and at their level,
              and keep going until they understand. We want learning apps that prove people actually learned, not apps
              that only keep them busy.”
              <cite>Homingo Hackathon · Edition 01 · Problem statement C3</cite>
            </blockquote>

            <p>
              Most learning software optimises the thing that is easy to measure: minutes, streaks, lessons finished.
              Those numbers go up whether or not anything landed. Seedhi optimises the harder thing — a learner
              explaining an idea they could not explain ten minutes ago — and shows its work.
            </p>

            <p>
              This page is the working demo. The diagnostic below is real: pick an answer and the tutor responds to
              that answer, names the misconception, and rebuilds the rung. Then it asks you to prove it.
            </p>

            <p className="marginalia" lang="hi">
              जो सवाल बच्चा पूछना चाहता है, वही सवाल ट्यूटर पूछे।
            </p>
          </div>

          <div>
            <p className="mono muted" style={{ marginBottom: '0.6rem' }}>
              What we refuse to build
            </p>
            <ul className="refuse">
              <li>Streaks and badges that measure showing up, not understanding.</li>
              <li>An answer box that ends the thinking.</li>
              <li>“Completed” used as a synonym for learned.</li>
              <li>A tutor that speaks only English to a learner who thinks in Hindi.</li>
            </ul>
            <p className="marginalia">Busy is not the same as learned.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
