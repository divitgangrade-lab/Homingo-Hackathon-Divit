import { CONCEPTS } from '../lib/mastery';
import { SAMPLE_RECEIPT, tr } from '../content';
import type { Lang } from '../content';

const MODEL = [
  {
    en: 'An explanation, not a score.',
    hi: 'व्याख्या, सिर्फ़ अंक नहीं।',
  },
  {
    en: 'Named ideas, not a percentage.',
    hi: 'नामित विचार, प्रतिशत नहीं।',
  },
  {
    en: 'A next step, not a badge.',
    hi: 'अगला कदम, बैज नहीं।',
  },
  {
    en: 'A record the learner can keep and show.',
    hi: 'ऐसा रिकॉर्ड जो सीखने वाला रख सके और दिखा सके।',
  },
];

export default function Proof({ lang }: { lang: Lang }) {
  const t = tr(lang);

  return (
    <section className="section" id="proof">
      <div className="wrap">
        <div className="section__head">
          <span className="sec-no">§04</span>
          <div>
            <h2>A receipt for learning.</h2>
            <p className="section__lede">
              Time spent is not evidence. A mastery receipt is: one sentence from the learner, checked against the
              ideas that make the answer work, with the gaps named and the next rung suggested.
            </p>
          </div>
        </div>

        <div className="proof-grid">
          <div>
            <p>
              After the third probe, Seedhi does not ask “did you understand?” — everyone says yes. It asks the learner
              to explain the idea in one sentence, then looks for the three things that make the explanation work: the
              unit (halves), the operation (counting how many fit), and the quantity (six).
            </p>
            <p>
              What comes back is a receipt, not a grade. It says what the explanation proved, what it did not, and what
              to try next. If the learner only recites “you flip the second fraction”, the receipt says so: the rule is
              there, the reason is not.
            </p>

            <ol className="evidence-model">
              {MODEL.map(item => (
                <li key={item.en}>
                  <span lang={lang === 'hi' ? 'hi' : undefined}>{item[lang]}</span>
                </li>
              ))}
            </ol>

            <p className="muted" style={{ marginTop: '1.1rem', fontSize: '0.92rem' }}>
              One sentence is one piece of evidence, not proof of mastery. The receipt is honest about that — which is
              the point. A tutor that overclaims is just another app that keeps you busy.
            </p>
          </div>

          <div className="sample-receipt" aria-label="Sample mastery receipt">
            <div className="sample-receipt__head">
              <div>
                <div className="receipt__title">{t.receipt}</div>
                <div className="sample-receipt__code">
                  {t.code} {SAMPLE_RECEIPT.code}
                </div>
              </div>
              <span className="stamp stamp--proven">{t.proven}</span>
            </div>

            <p className="sample-receipt__quote">“{SAMPLE_RECEIPT.text}”</p>

            <div className="chips">
              {CONCEPTS.filter(c => SAMPLE_RECEIPT.matched.includes(c.id)).map(concept => (
                <span className="chip chip--yes" key={concept.id}>
                  <span className="chip__mark" aria-hidden="true">
                    ✓
                  </span>
                  {concept.label[lang]}
                </span>
              ))}
            </div>

            <div className="sample-receipt__meta">
              <span>3 of 3 core ideas</span>
              <span>3 × 2 = 6</span>
              <span>{SAMPLE_RECEIPT.date}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
