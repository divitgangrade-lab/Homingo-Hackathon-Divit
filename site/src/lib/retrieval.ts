import { SHELF } from '../content';
import type { Bi, Lang, ShelfDoc, ShelfSection } from '../content';

/* ------------------------------------------------------------------ */
/* Dates                                                               */
/* ------------------------------------------------------------------ */

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTHS_HI = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];

export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(`${iso}T00:00:00Z`);
  const day = d.getUTCDate();
  const m = d.getUTCMonth();
  const year = d.getUTCFullYear();
  return lang === 'hi' ? `${day} ${MONTHS_HI[m]} ${year}` : `${day} ${MONTHS[m].slice(0, 3)} ${year}`;
}

/* ------------------------------------------------------------------ */
/* Text handling                                                       */
/* ------------------------------------------------------------------ */

const STOP = new Set(
  (
    'a an the is are was were be been being of to in on at for from and or with without into over under ' +
    'what which who whom whose how does do did done can could should would will shall may might must ' +
    'i my me we our you your it its this that these those there here about before between more most many ' +
    'much any all not no yes please tell show give need want has have had than then so if as by per ' +
    'since after from before between recent recently month months year years ' +
    'के का की में से को है हैं और क्या कौन कौनसी कौनसे किस किसी बाद पहले कब कहाँ क्यों कैसे मुझे मेरा हमारा कृपया बताओ सी'
  ).split(' '),
);

const GENERIC = new Set([
  'policy',
  'policies',
  'rule',
  'rules',
  'document',
  'documents',
  'doc',
  'docs',
  'handbook',
  'school',
  'changed',
  'change',
  'changes',
  'changing',
  'updated',
  'update',
  'revised',
  'amended',
  'new',
  'recent',
  'recently',
]);

const HI_LEXICON: Record<string, string[]> = {
  नीति: ['policy'],
  नीतियाँ: ['policy'],
  नीतियां: ['policy'],
  नियम: ['policy', 'rule'],
  बदलाव: ['changed'],
  बदला: ['changed'],
  बदली: ['changed'],
  बदलीं: ['changed'],
  बदले: ['changed'],
  नया: ['new'],
  नई: ['new'],
  उपस्थिति: ['attendance'],
  हाज़िरी: ['attendance'],
  हाजिरी: ['attendance'],
  छुट्टी: ['leave'],
  अनुपस्थिति: ['absence'],
  परीक्षा: ['exam', 'assessment'],
  परीक्षाएँ: ['exam'],
  मूल्यांकन: ['assessment'],
  अंक: ['marks'],
  नतीजा: ['result'],
  नतीजे: ['result'],
  रिपोर्ट: ['report'],
  प्रोजेक्ट: ['project'],
  फीस: ['fee'],
  शुल्क: ['fee'],
  वापसी: ['refund'],
  रिफंड: ['refund'],
  भुगतान: ['payment'],
  रसीद: ['receipt'],
  दाखिला: ['admission'],
  नाम: ['withdrawal'],
  स्थानांतरण: ['transfer'],
  भाषा: ['language'],
  हिंदी: ['hindi'],
  अंग्रेज़ी: ['english'],
  अंग्रेजी: ['english'],
  माध्यम: ['medium'],
  शब्दावली: ['glossary'],
  पुस्तकालय: ['library'],
  किताब: ['book'],
  किताबें: ['book'],
  उधार: ['borrow'],
  वाचन: ['reading'],
  छात्रवृत्ति: ['scholarship'],
  छूट: ['waiver'],
  ज़रूरत: ['need'],
  आय: ['income'],
  फोन: ['phone'],
  डिवाइस: ['device'],
  उपकरण: ['device'],
  यात्रा: ['trip'],
  अनुमति: ['consent'],
  आपात: ['emergency'],
  संपर्क: ['contact'],
  एआई: ['ai'],
  कृत्रिम: ['ai'],
  बुद्धिमत्ता: ['ai'],
  जाँच: ['recheck'],
  दोबारा: ['recheck'],
  पुनर्मूल्यांकन: ['reevaluation'],
  मार्च: ['march'],
  अप्रैल: ['april'],
  मई: ['may'],
  जून: ['june'],
  जनवरी: ['january'],
  फ़रवरी: ['february'],
  सितंबर: ['september'],
  अक्टूबर: ['october'],
  नवंबर: ['november'],
  दिसंबर: ['december'],
};

export function tokenize(text: string): string[] {
  // \p{M} keeps Devanagari vowel marks attached: बदलीं is one word, not बदल + ी + ं.
  return (text.toLowerCase().match(/[\p{L}\p{N}\p{M}]+/gu) ?? []).filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

export type FlatSection = { doc: ShelfDoc; sec: ShelfSection };

type Indexed = FlatSection & { tf: Map<string, number>; len: number };

const FLAT: FlatSection[] = SHELF.flatMap(doc => doc.sections.map(sec => ({ doc, sec })));

const INDEX: Indexed[] = FLAT.map(({ doc, sec }) => {
  const tokens = tokenize(
    [doc.title, sec.heading.en, sec.summary.en, sec.text, sec.keywordsHi.join(' ')].join(' '),
  );
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  return { doc, sec, tf, len: tokens.length };
});

const DF = new Map<string, number>();
for (const item of INDEX) {
  for (const t of item.tf.keys()) DF.set(t, (DF.get(t) ?? 0) + 1);
}

const AVG_LEN = INDEX.reduce((sum, item) => sum + item.len, 0) / Math.max(1, INDEX.length);

/* ------------------------------------------------------------------ */
/* Intent                                                              */
/* ------------------------------------------------------------------ */

type Since = { month: number; year: number; label: Bi };

const CURRENT_YEAR = 2026;
const CURRENT_MONTH = 11;

function monthYear(month: number, year: number): Date {
  return new Date(Date.UTC(year, month - 1, 1));
}

function parseSince(query: string): Since | null {
  const lower = query.toLowerCase();

  for (let i = 0; i < MONTHS.length; i++) {
    const m = MONTHS[i].toLowerCase();
    if (new RegExp(`\\b(?:since|after|from)\\s+(?:the\\s+)?${m}\\b`).test(lower)) {
      const year = i + 1 > CURRENT_MONTH ? CURRENT_YEAR - 1 : CURRENT_YEAR;
      return { month: i + 1, year, label: { en: `${MONTHS[i]} ${year}`, hi: `${MONTHS_HI[i]} ${year}` } };
    }
  }

  for (let i = 0; i < MONTHS_HI.length; i++) {
    if (query.includes(MONTHS_HI[i]) && /(बाद|से)/.test(query)) {
      return {
        month: i + 1,
        year: CURRENT_YEAR,
        label: { en: `${MONTHS[i]} ${CURRENT_YEAR}`, hi: `${MONTHS_HI[i]} ${CURRENT_YEAR}` },
      };
    }
  }

  const y = lower.match(/\b(?:since|after|from)\s+(20\d\d)\b/);
  if (y) {
    const year = Number(y[1]);
    return { month: 1, year, label: { en: `January ${year}`, hi: `जनवरी ${year}` } };
  }

  return null;
}

const CHANGED_INTENT = /\b(changed?|changes?|updated?|revised?|amended?|new)\b|बदल|नया|नई|अद्यतन/i;

// Words that describe the question, not the subject. Kept out of the subject filter.
const INTENT = new Set([...GENERIC, 'since', 'after', 'from', 'before', 'between', 'recent', 'recently']);

function expandTerms(query: string): string[] {
  const out = new Set<string>();
  for (const raw of tokenize(query)) {
    out.add(raw);
    for (const mapped of HI_LEXICON[raw] ?? []) out.add(mapped);
  }
  return [...out].filter(t => t.length > 1 && !STOP.has(t));
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

export type Trace = {
  sections: number;
  terms: string[];
  since: string | null;
  mode: 'changed' | 'lookup';
};

export type ChangedItem = { docId: string; title: string; titleHi: string; updated: string; change: Bi };

export type SearchResult =
  | { mode: 'changed'; since: Bi; items: ChangedItem[]; trace: Trace }
  | { mode: 'lookup'; hit: FlatSection | null; sources: FlatSection[]; trace: Trace };

function scoreSection(item: Indexed, terms: string[], phrase: string): number {
  let score = 0;
  for (const term of terms) {
    const tf = item.tf.get(term) ?? 0;
    if (!tf) continue;
    const df = DF.get(term) ?? 0;
    const idf = Math.log(1 + (INDEX.length - df + 0.5) / (df + 0.5));
    const k1 = 1.4;
    const b = 0.7;
    score += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * item.len) / AVG_LEN)));
  }
  if (phrase.length > 3) {
    const haystack = tokenize(`${item.doc.title} ${item.sec.heading.en} ${item.sec.text}`).join(' ');
    if (haystack.includes(phrase)) score += 2.5;
  }
  const heading = tokenize(item.sec.heading.en).join(' ');
  for (const term of terms) if (heading.includes(term)) score += 0.6;
  return score;
}

export function search(query: string): SearchResult {
  const q = query.trim();
  const since = parseSince(q);
  const changed = CHANGED_INTENT.test(q);
  const terms = expandTerms(q);
  const monthTokens = MONTHS.map(m => m.toLowerCase());
  const contentTerms = terms.filter(t => {
    if (INTENT.has(t) || monthTokens.includes(t)) return false;
    // A Hindi token is a subject only if it maps to something more than intent.
    const mapped = HI_LEXICON[t];
    if (mapped && mapped.every(m => INTENT.has(m) || monthTokens.includes(m))) return false;
    return true;
  });
  const phrase = tokenize(q).join(' ');
  const baseTrace = { sections: INDEX.length, since: since ? since.label.en : null };

  if (changed) {
    const fallback: Since = { month: 1, year: CURRENT_YEAR, label: { en: 'January 2026', hi: 'जनवरी 2026' } };
    const from = since ?? fallback;
    const threshold = monthYear(from.month, from.year);

    let items = SHELF.filter(doc => doc.change && new Date(`${doc.updated}T00:00:00Z`) >= threshold);

    if (contentTerms.length) {
      items = items.filter(doc => {
        const hay = tokenize(
          `${doc.title} ${doc.sections.map(s => `${s.heading.en} ${s.text}`).join(' ')} ${doc.sections
            .map(s => s.keywordsHi.join(' '))
            .join(' ')}`,
        ).join(' ');
        return contentTerms.some(t => hay.includes(t));
      });
    }

    items = items.sort((a, b) => (a.updated < b.updated ? 1 : -1));

    return {
      mode: 'changed',
      since: from.label,
      items: items.map(doc => ({
        docId: doc.id,
        title: doc.title,
        titleHi: doc.titleHi,
        updated: doc.updated,
        change: doc.change as Bi,
      })),
      trace: { ...baseTrace, mode: 'changed', terms: terms.slice(0, 8) },
    };
  }

  const ranked = INDEX.map(item => ({ item, score: scoreSection(item, terms, phrase) }))
    .filter(row => row.score > 0)
    .sort((a, b) => b.score - a.score);

  const allowed =
    since === null
      ? ranked
      : ranked.filter(
          row => new Date(`${row.item.doc.updated}T00:00:00Z`) >= monthYear(since.month, since.year),
        );

  const top = allowed[0] ?? null;
  const sources: FlatSection[] = [];
  if (top) {
    // Only cite sections close to the best match; a single incidental word is not a source.
    const cutoff = top.score * 0.35;
    for (const row of allowed) {
      if (row.score < cutoff) break;
      if (!sources.some(s => s.doc.id === row.item.doc.id)) {
        sources.push({ doc: row.item.doc, sec: row.item.sec });
      }
      if (sources.length === 3) break;
    }
  }

  return {
    mode: 'lookup',
    hit: top ? { doc: top.item.doc, sec: top.item.sec } : null,
    sources,
    trace: { ...baseTrace, mode: 'lookup', terms: terms.slice(0, 8) },
  };
}

/* ------------------------------------------------------------------ */
/* Lookups for the help centre                                         */
/* ------------------------------------------------------------------ */

export function findDoc(docId: string): ShelfDoc | undefined {
  return SHELF.find(doc => doc.id === docId);
}

export function findSection(docId: string, sectionId: string): ShelfSection | undefined {
  return findDoc(docId)?.sections.find(sec => sec.id === sectionId);
}

export const SHELF_COUNT = { docs: SHELF.length, sections: FLAT.length };
