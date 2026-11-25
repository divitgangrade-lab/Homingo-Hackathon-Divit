import { useState } from 'react';
import { CONCEPTS, evaluateExplanation } from '../lib/mastery';
import type { MasteryResult } from '../lib/mastery';
import { PROOF, RUNG_LABELS, TUTOR_STEPS, tr } from '../content';
import type { Lang, Level, TutorOption } from '../content';

const verdictKey = { right: 'right', partial: 'partial', stuck: 'stuck' } as const;

export default function TutorDemo({ lang }: { lang: Lang }) {
  const [level, setLevel] = useState<Level>('16');
  const [stepId, setStepId] = useState('probe1');
  const [picked, setPicked] = useState<TutorOption | null>(null);
  const [proof, setProof] = useState('');
  const [receipt, setReceipt] = useState<MasteryResult | null>(null);
  const [receiptDate, setReceiptDate] = useState('');

  const t = tr(lang);
  const isProve = stepId === 'prove';
  const step = TUTOR_STEPS.find(s => s.id === stepId);
  const probeNo = Math.max(0, TUTOR_STEPS.findIndex(s => s.id === stepId)) + 1;
  const currentRung = isProve ? 4 : (step?.rung ?? 1);
  const doneUpTo = receipt ? 4 : currentRung - 1;

  const reset = () => {
    setStepId('probe1');
    setPicked(null);
    setProof('');
    setReceipt(null);
    setReceiptDate('');
  };

  const advance = () => {
    if (!picked) return;
    setStepId(picked.next);
    setPicked(null);
  };

  const submitProof = () => {
    if (proof.trim().length < 12) return;
    setReceiptDate(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
    setReceipt(evaluateExplanation(proof));
  };

  const verdictLabel = (verdict: 'proven' | 'almost' | 'not-yet') =>
    verdict === 'proven' ? t.proven : verdict === 'almost' ? t.almost : t.notYet;

  return (
    <div className="worksheet" id="demo">
      <div className="worksheet__top">
        <div className="worksheet__title">
          <span className="tag">Live diagnostic</span>
          <h3>Fractions, rung by rung</h3>
        </div>
        <div className="controls">
          <div className="control">
            <span className="control__label">{t.levelLabel}</span>
            <div className="seg" role="group" aria-label={t.levelLabel}>
              <button type="button" aria-pressed={level === '10'} onClick={() => setLevel('10')}>
                {t.level10}
              </button>
              <button type="button" aria-pressed={level === '16'} onClick={() => setLevel('16')}>
                {t.level16}
              </button>
            </div>
          </div>
          <button type="button" className="reset-btn" onClick={reset}>
            {t.reset}
          </button>
        </div>
      </div>

      <div className="worksheet__body">
        <aside className="ladder-track" aria-label="Diagnostic progress">
          {RUNG_LABELS.map((label, i) => {
            const rung = i + 1;
            const state = rung <= doneUpTo ? 'done' : rung === currentRung ? 'current' : 'locked';
            return (
              <div className="track-item" data-state={state} key={label.en}>
                <span className="track-item__dot" aria-hidden="true" />
                <span>
                  <span className="track-item__no">Rung 0{rung}</span>
                  <span className="track-item__label" lang={lang === 'hi' ? 'hi' : undefined}>
                    {label[lang]}
                  </span>
                </span>
              </div>
            );
          })}
        </aside>

        <div className="demo">
          {!isProve && step && (
            <>
              <div className="demo__meta">
                <span className="demo__probe">
                  Probe {probeNo} of 3 · {step.rungLabel[lang]}
                </span>
              </div>
              <p className={`demo__prompt ${lang === 'hi' ? 'hi' : ''}`}>{step.prompt[lang]}</p>
              <p className="demo__hint">{t.pick}</p>

              <div className="options" role="group" aria-label={step.prompt[lang]}>
                {step.options.map((option, i) => (
                  <button
                    type="button"
                    key={option.id}
                    className="option"
                    data-picked={picked?.id === option.id}
                    data-verdict={option.verdict}
                    disabled={picked !== null}
                    onClick={() => setPicked(option)}
                  >
                    <span className="option__key" aria-hidden="true">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span lang={lang === 'hi' ? 'hi' : undefined}>{option.label[lang]}</span>
                  </button>
                ))}
              </div>

              {picked && (
                <div className="feedback">
                  <div className="feedback__head">
                    <span className={`badge badge--${verdictKey[picked.verdict]}`}>
                      {picked.verdict === 'right' ? t.right : picked.verdict === 'partial' ? t.partial : t.stuck}
                    </span>
                    <span className="mono muted">
                      {t.yourAnswer}: “{picked.label[lang]}”
                    </span>
                  </div>

                  <p className={`feedback__reply ${lang === 'hi' ? 'hi' : ''}`}>{picked.reply[lang]}</p>

                  {picked.stuckPoint && (
                    <div className="stuck-note">
                      <strong>{t.stuckAt}</strong>
                      <span lang={lang === 'hi' ? 'hi' : undefined}>{picked.stuckPoint[lang]}</span>
                    </div>
                  )}

                  <div className="rebuild">
                    <div className="rebuild__label">
                      {picked.verdict === 'right' ? (lang === 'en' ? 'Why it works' : 'यह क्यों चलता है') : t.rebuild}
                      <span> · {level === '10' ? t.level10 : t.level16}</span>
                    </div>
                    <p className={lang === 'hi' ? 'hi' : undefined}>{step.rebuild[level][lang]}</p>
                  </div>

                  <div className="feedback__actions">
                    <button type="button" className="btn" onClick={advance}>
                      {picked.next === 'prove' ? t.prove : t.next}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {isProve && !receipt && (
            <div className="proof">
              <div className="demo__meta">
                <span className="demo__probe">Rung 04 · {RUNG_LABELS[3][lang]}</span>
              </div>
              <p className={`demo__prompt ${lang === 'hi' ? 'hi' : ''}`}>{PROOF.prompt[lang]}</p>
              <label className="proof__label" htmlFor="proof-input">
                {t.yourAnswer}
              </label>
              <textarea
                id="proof-input"
                value={proof}
                maxLength={240}
                onChange={event => setProof(event.target.value)}
                placeholder={PROOF.placeholder[lang]}
                lang={lang === 'hi' ? 'hi' : undefined}
              />
              <div className="proof__foot">
                <span className="counter">{proof.length}/240</span>
                <button type="button" className="btn" disabled={proof.trim().length < 12} onClick={submitProof}>
                  {t.submitProof}
                </button>
              </div>
            </div>
          )}

          {receipt && (
            <div className="receipt">
              <div className="receipt__top">
                <div>
                  <div className="receipt__title">{t.receipt}</div>
                  <div className="receipt__code">
                    {t.code} {receipt.code} · {t.date} {receiptDate}
                  </div>
                </div>
                <span className={`stamp stamp--${receipt.verdict}`}>{verdictLabel(receipt.verdict)}</span>
              </div>

              <p className={`receipt__quote ${lang === 'hi' ? 'hi' : ''}`}>“{proof.trim()}”</p>

              <div className="chips">
                {CONCEPTS.filter(c => receipt.matched.includes(c.id)).map(concept => (
                  <span className="chip chip--yes" key={concept.id}>
                    <span className="chip__mark" aria-hidden="true">
                      ✓
                    </span>
                    {concept.label[lang]}
                  </span>
                ))}
                {CONCEPTS.filter(c => receipt.missing.includes(c.id)).map(concept => (
                  <span className="chip chip--no" key={concept.id}>
                    <span className="chip__mark" aria-hidden="true">
                      ×
                    </span>
                    {concept.label[lang]}
                  </span>
                ))}
              </div>

              <p className={`receipt__note ${lang === 'hi' ? 'hi' : ''}`}>{receipt.note[lang]}</p>

              <div className="receipt__grid">
                <div className="receipt__cell">
                  <h4>{t.provesTitle}</h4>
                  <p>{receipt.proves[lang]}</p>
                </div>
                <div className="receipt__cell">
                  <h4>{t.notProvesTitle}</h4>
                  <p>{receipt.notProves[lang]}</p>
                </div>
              </div>

              <details className="disclose">
                <summary>{t.modelAnswer}</summary>
                <div className="disclose__body">
                  <p className={lang === 'hi' ? 'hi' : undefined}>{PROOF.model[lang]}</p>
                </div>
              </details>

              <div className="feedback__actions" style={{ marginTop: '0.9rem' }}>
                <button type="button" className="btn btn--ghost btn--small" onClick={reset}>
                  {t.reset}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
