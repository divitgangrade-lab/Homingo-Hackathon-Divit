import type { Bi } from '../content';

export type ConceptId = 'halves' | 'count' | 'six' | 'reciprocal';
export type MasteryVerdict = 'proven' | 'almost' | 'not-yet';

type Concept = { id: ConceptId; label: Bi; test: RegExp };

export const CONCEPTS: Concept[] = [
  { id: 'halves', label: { en: 'Names halves as the unit', hi: 'आधे को इकाई बताया' }, test: /half|halves|आध|अर्ध/i },
  {
    id: 'count',
    label: { en: 'Counts how many fit', hi: 'गिना कि कितने आते हैं' },
    test: /fit|fits|group|piece|count|how many|कितन|टुकड़|समूह|गिन/i,
  },
  {
    id: 'six',
    label: { en: 'Reaches six (or 3 × 2)', hi: 'छह (या 3 × 2) तक पहुँचा' },
    test: /\b6\b|\bsix\b|two per|two halves|3\s*[×x*]\s*2|दो आध|छह|छे\b|तीन\s*गुणा/i,
  },
  {
    id: 'reciprocal',
    label: { en: 'Names the reciprocal', hi: 'उलटा (reciprocal) बताया' },
    test: /multiply|multiplied|times|flip|reciprocal|गुणा|उलट/i,
  },
];

export type MasteryResult = {
  verdict: MasteryVerdict;
  matched: ConceptId[];
  missing: ConceptId[];
  code: string;
  note: Bi;
  proves: Bi;
  notProves: Bi;
};

const hash = (text: string) => {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 33) + text.charCodeAt(i)) >>> 0;
  return h.toString(36).toUpperCase().padStart(5, '0').slice(-5);
};

const CORE: ConceptId[] = ['halves', 'count', 'six'];

export function evaluateExplanation(text: string): MasteryResult {
  const matched = CONCEPTS.filter(c => c.test.test(text)).map(c => c.id);
  const coreHit = CORE.filter(id => matched.includes(id)).length;
  const verdict: MasteryVerdict = coreHit === 3 ? 'proven' : coreHit === 2 ? 'almost' : 'not-yet';
  const missing = CORE.filter(id => !matched.includes(id));
  const namedRule = matched.includes('reciprocal');

  const note: Bi =
    verdict === 'proven'
      ? namedRule
        ? {
            en: 'You gave the counting reason and named the reciprocal. That is the whole idea, not just the rule.',
            hi: 'तुमने गिनती की वजह दी और उलटा भी बताया। यही पूरी बात है, सिर्फ़ नियम नहीं।',
          }
        : {
            en: 'You rebuilt the reason from the picture. That is what we wanted, not the rule recited back.',
            hi: 'तुमने तस्वीर से वजह फिर बनाई। हमें यही चाहिए था, रटा हुआ नियम नहीं।',
          }
      : verdict === 'almost'
        ? {
            en: 'One idea is still missing. Add the count — how many halves fit — and the explanation closes.',
            hi: 'एक विचार अभी बाकी है। गिनती जोड़ो — कितने आधे आते हैं — और व्याख्या पूरी हो जाएगी।',
          }
        : {
            en: 'Not yet. Start from the picture: one whole holds two halves, so three wholes hold six.',
            hi: 'अभी नहीं। तस्वीर से शुरू करो: एक पूरे में दो आधे, इसलिए तीन में छह।',
          };

  return {
    verdict,
    matched,
    missing,
    code: `SDH-${hash(text.trim().toLowerCase())}`,
    note,
    proves: {
      en: 'You explained the idea in your own words, without the rule being given to you.',
      hi: 'तुमने विचार अपने शब्दों में समझाया, बिना नियम दिए हुए।',
    },
    notProves: {
      en: 'One sentence is one piece of evidence. It does not show you can use the idea on a new problem — that is the next probe.',
      hi: 'एक वाक्य एक सबूत है। यह नहीं दिखाता कि नई समस्या पर विचार लगा सकते हो — वह अगला सवाल है।',
    },
  };
}
