import SpotlightCard from './rb/SpotlightCard';
import TutorDemo from './TutorDemo';
import type { Lang } from '../content';

const STEPS = [
  {
    no: '01',
    title: 'Diagnose',
    body: 'Three probes, each one aimed lower. The wrong answer is the useful one: it names the rung that is missing.',
  },
  {
    no: '02',
    title: 'Rebuild',
    body: 'The same idea at two levels — Class 5 concrete, Class 9 precise — in English or Hindi, without moving on.',
  },
  {
    no: '03',
    title: 'Prove',
    body: 'No quiz. The learner explains it back; a rubric checks the three ideas that make the explanation work.',
  },
];

export default function Ladder({ lang }: { lang: Lang }) {
  return (
    <section className="section" id="ladder">
      <div className="wrap">
        <div className="section__head">
          <span className="sec-no">§02</span>
          <div>
            <h2>Find the broken rung. Rebuild it. Then make them prove it.</h2>
            <p className="section__lede">
              The diagnostic below is not a scripted chat. Each answer changes the next move: a misconception is named,
              the rung is rebuilt at your level, and the proof step asks for the idea in your own words.
            </p>
          </div>
        </div>

        <div className="rungs">
          {STEPS.map(step => (
            <SpotlightCard
              key={step.no}
              className="rung-card"
              theme="light"
              spotlightColor="rgba(244, 201, 72, 0.7)"
              intensity={0.55}
              spotlightSize={230}
              softness={0.8}
              style={{
                borderRadius: 2,
                padding: '1.15rem 1.2rem',
                background: 'var(--paper-2)',
                boxShadow: '4px 4px 0 rgba(27, 26, 22, 0.12)',
              }}
            >
              <span className="rung-card__no">{step.no}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </SpotlightCard>
          ))}
        </div>

        <TutorDemo lang={lang} />
      </div>
    </section>
  );
}
