import BlurText from './rb/BlurText';
import CountUp from './rb/CountUp';
import Magnet from './rb/Magnet';
import type { Lang } from '../content';

export default function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="eyebrow">
            <span>Homingo Hackathon</span>
            <span className="eyebrow__sep" aria-hidden="true" />
            <span>Edition 01 · Track C3</span>
          </div>

          <BlurText
            as="h1"
            text="Almost nobody has a tutor."
            animateBy="words"
            direction="top"
            delay={110}
            stepDuration={0.5}
            className="hero-title"
          />

          <p className="hero__hi" lang="hi">
            सबसे अच्छा तरीका हमेशा एक अच्छा निजी शिक्षक रहा है — और लगभग किसी के पास वह नहीं है।
          </p>

          <p className="hero__lede">
            Seedhi is a tutor that finds the exact rung where a learner is stuck, rebuilds it in their language and at
            their level, then asks them to <span className="mark">prove the idea in their own words</span>. No streaks.
            No busywork. Evidence.
          </p>

          <div className="hero__cta">
            <Magnet padding={45} magnetStrength={1.5} maxOffset={7} tilt={0}>
              <a className="btn" href="#demo">
                {lang === 'en' ? 'Sit the diagnostic' : 'डायग्नोस्टिक दें'}
              </a>
            </Magnet>
            <a className="btn btn--ghost" href="#brief">
              {lang === 'en' ? 'Read the brief' : 'ब्रीफ़ पढ़ें'}
            </a>
          </div>

          <div className="hero__meta">
            <div className="meta-item">
              <span className="meta-item__value">
                <CountUp to={4} duration={1.3} />
              </span>
              <span className="meta-item__label">Rungs in the ladder</span>
            </div>
            <div className="meta-item">
              <span className="meta-item__value">
                <CountUp to={2} duration={1.3} />
              </span>
              <span className="meta-item__label">Languages, end to end</span>
            </div>
            <div className="meta-item">
              <span className="meta-item__value">
                <CountUp to={20} duration={1.6} />
              </span>
              <span className="meta-item__label">Sections on the shelf</span>
            </div>
          </div>
        </div>

        <div className="hero__art">
          <figure className="taped">
            <span className="tape tape--left" aria-hidden="true" />
            <span className="tape tape--right" aria-hidden="true" />
            <svg
              className="ladder-svg"
              viewBox="0 0 520 440"
              role="img"
              aria-label="A ladder with four rungs. The rung labelled 'why the rule works' is broken and marked as the stuck point."
            >
              <g fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round">
                <path d="M120 36v368M280 36v368" />
                <path d="M120 76h160M120 152h160M120 328h160" />
                <path d="M120 240h50M230 240h50" stroke="var(--red)" />
              </g>
              <path
                className="svg-dash"
                d="M170 236c16-26 60-26 76 0"
                stroke="var(--red)"
                strokeWidth="2"
                strokeDasharray="5 7"
                fill="none"
              />
              <text x="302" y="80" className="svg-label">
                04 · prove it
              </text>
              <text x="302" y="156" className="svg-label">
                03 · why the rule works
              </text>
              <text x="302" y="244" className="svg-label svg-label--red">
                the stuck point
              </text>
              <text x="302" y="264" className="svg-sub">
                rebuild here — don’t skip it
              </text>
              <text x="302" y="332" className="svg-label">
                02 · how many fit
              </text>
              <text x="302" y="408" className="svg-label">
                01 · what division means
              </text>
              <circle cx="120" cy="404" r="3.5" fill="var(--ink)" />
              <circle cx="280" cy="404" r="3.5" fill="var(--ink)" />
            </svg>
            <figcaption className="art-caption">
              Fig. 1 — The ladder, with the rung the learner is actually stuck on.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
