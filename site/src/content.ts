export type Lang = 'en' | 'hi';
export type Level = '10' | '16';
export type Bi = { en: string; hi: string };

/* ------------------------------------------------------------------ */
/* UI strings                                                          */
/* ------------------------------------------------------------------ */

export const strings = {
  en: {
    langLabel: 'Language',
    levelLabel: 'Level',
    level10: 'Class 5',
    level16: 'Class 9',
    reset: 'Start over',
    next: 'Next probe',
    prove: 'Prove it',
    yourAnswer: 'Your answer',
    right: 'Right',
    partial: 'Partly there',
    stuck: 'Stuck point found',
    stuckAt: 'Stuck point',
    rebuild: 'Rebuild this rung',
    gotIt: 'I see it — go on',
    pick: 'Pick the answer that sounds most like you.',
    explainAt: 'The same idea, at your level',
    submitProof: 'Mark my explanation',
    proofPrompt: 'One sentence: why is 3 ÷ ½ = 6?',
    proofPlaceholder: 'Say it in your own words…',
    modelAnswer: 'A model answer',
    receipt: 'Mastery receipt',
    proven: 'Proven',
    almost: 'Almost',
    notYet: 'Not yet',
    provenLabel: 'Proven',
    missingLabel: 'Still missing',
    provesTitle: 'What this proves',
    notProvesTitle: 'What it does not prove',
    code: 'Receipt',
    date: 'Date',
    searchLabel: 'Ask the shelf',
    searchPlaceholder: 'e.g. which policies changed since March?',
    searchButton: 'Search',
    sources: 'Sources',
    answer: 'Answer',
    why: 'Why this result',
    sectionsSearched: 'sections searched',
    dateFilter: 'date filter',
    noFilter: 'none',
    noHits: 'Nothing on the shelf matches that yet. Try “attendance”, “AI use” or “fee refund”.',
    changedTitle: 'Changed since',
    openInShelf: 'Open in the shelf',
    helpSource: 'Source',
    copy: 'Copy',
    copied: 'Copied',
    demoNote: 'The tutor, the search answers and the receipts switch language. The essay around them stays in English.',
  },
  hi: {
    langLabel: 'भाषा',
    levelLabel: 'स्तर',
    level10: 'कक्षा 5',
    level16: 'कक्षा 9',
    reset: 'फिर से शुरू',
    next: 'अगला सवाल',
    prove: 'सबूत दो',
    yourAnswer: 'तुम्हारा जवाब',
    right: 'सही',
    partial: 'आधा सही',
    stuck: 'यहीं अटके',
    stuckAt: 'अटकने की जगह',
    rebuild: 'इस सीढ़ी को फिर बनाओ',
    gotIt: 'समझ आया — आगे बढ़ो',
    pick: 'जो जवाब तुम्हें सबसे सही लगे, उसे चुनो।',
    explainAt: 'वही बात, तुम्हारे स्तर पर',
    submitProof: 'मेरी व्याख्या जाँचो',
    proofPrompt: 'एक वाक्य में: 3 ÷ ½ = 6 क्यों है?',
    proofPlaceholder: 'अपने शब्दों में कहो…',
    modelAnswer: 'एक मॉडल जवाब',
    receipt: 'मास्टरी रसीद',
    proven: 'साबित',
    almost: 'लगभग',
    notYet: 'अभी नहीं',
    provenLabel: 'साबित हुआ',
    missingLabel: 'अभी बाकी',
    provesTitle: 'यह क्या साबित करता है',
    notProvesTitle: 'यह क्या साबित नहीं करता',
    code: 'रसीद',
    date: 'तारीख़',
    searchLabel: 'दस्तावेज़ों से पूछो',
    searchPlaceholder: 'जैसे: मार्च के बाद कौन-सी नीतियाँ बदलीं?',
    searchButton: 'खोजो',
    sources: 'स्रोत',
    answer: 'जवाब',
    why: 'यह नतीजा क्यों',
    sectionsSearched: 'सेक्शन खोजे',
    dateFilter: 'तारीख़ फ़िल्टर',
    noFilter: 'कोई नहीं',
    noHits: 'शेल्फ पर अभी इसका जवाब नहीं मिला। “उपस्थिति”, “एआई” या “फीस वापसी” आज़माओ।',
    changedTitle: 'इसके बाद बदला',
    openInShelf: 'शेल्फ में खोलो',
    helpSource: 'स्रोत',
    copy: 'कॉपी',
    copied: 'कॉपी हुआ',
    demoNote: 'ट्यूटर, खोज के जवाब और रसीदें भाषा बदलती हैं। इनके आसपास का लेख अंग्रेज़ी में रहता है।',
  },
} as const;

export const tr = (lang: Lang) => strings[lang];

/* ------------------------------------------------------------------ */
/* The live diagnostic                                                 */
/* ------------------------------------------------------------------ */

export type Verdict = 'right' | 'partial' | 'stuck';

export type TutorOption = {
  id: string;
  label: Bi;
  verdict: Verdict;
  reply: Bi;
  stuckPoint?: Bi;
  next: string;
};

export type TutorStep = {
  id: string;
  rung: number;
  rungLabel: Bi;
  prompt: Bi;
  options: TutorOption[];
  rebuild: Record<Level, Bi>;
};

export const RUNG_LABELS: Bi[] = [
  { en: 'What division means', hi: 'भाग का मतलब' },
  { en: 'How many halves fit', hi: 'कितने आधे आते हैं' },
  { en: 'Why the rule works', hi: 'नियम क्यों चलता है' },
  { en: 'Prove you got it', hi: 'साबित करो' },
];

export const TUTOR_STEPS: TutorStep[] = [
  {
    id: 'probe1',
    rung: 1,
    rungLabel: RUNG_LABELS[0],
    prompt: {
      en: 'Before fractions — what does 12 ÷ 3 actually ask?',
      hi: 'भिन्न से पहले — 12 ÷ 3 असल में क्या पूछता है?',
    },
    options: [
      {
        id: 'groups',
        label: { en: 'How many groups of 3 fit into 12?', hi: '12 में 3 कितनी बार आता है?' },
        verdict: 'right',
        reply: {
          en: 'Yes. Division counts groups. Keep that meaning — it is the whole trick with fractions.',
          hi: 'हाँ। भाग समूह गिनता है। यही बात भिन्नों में काम आएगी।',
        },
        next: 'probe2',
      },
      {
        id: 'share',
        label: { en: 'Split 12 into 3 equal shares.', hi: '12 को 3 बराबर हिस्सों में बाँटना।' },
        verdict: 'right',
        reply: {
          en: 'That works too. Sharing into 3 equal parts and counting groups of 3 give the same answer. Hold both pictures.',
          hi: 'यह भी सही है। 3 बराबर हिस्से और 3 के समूह — दोनों का जवाब एक ही है। दोनों तस्वीरें याद रखो।',
        },
        next: 'probe2',
      },
      {
        id: 'minus',
        label: { en: 'Take 3 away from 12.', hi: '12 में से 3 घटाना।' },
        verdict: 'stuck',
        stuckPoint: { en: 'Reading division as subtraction', hi: 'भाग को घटाव समझना' },
        reply: {
          en: 'That is subtraction. Division asks a different question: how many times does 3 go into 12?',
          hi: 'यह घटाव है। भाग अलग सवाल पूछता है: 12 में 3 कितनी बार जाता है?',
        },
        next: 'probe2',
      },
      {
        id: 'multiply',
        label: { en: 'Multiply 12 by 3.', hi: '12 को 3 से गुणा करना।' },
        verdict: 'stuck',
        stuckPoint: { en: 'Swapping division for multiplication', hi: 'भाग की जगह गुणा करना' },
        reply: {
          en: 'That is the opposite operation. Division undoes multiplication — it asks how many times, not how much.',
          hi: 'यह उलटी क्रिया है। भाग गुणा को उलटता है — पूछता है कितनी बार, कितना ज़्यादा नहीं।',
        },
        next: 'probe2',
      },
    ],
    rebuild: {
      '10': {
        en: 'Picture 12 rotis. Give 3 to each child. How many children get rotis? Four. Division is that question: equal shares, or equal groups.',
        hi: '12 रोटियाँ सोचो। हर बच्चे को 3 दो। कितने बच्चों को मिलेंगी? चार। भाग यही पूछता है: बराबर हिस्से या बराबर समूह।',
      },
      '16': {
        en: 'Division has two readings: partitive (split 12 into 3 equal parts) and quotitive (how many 3s fit in 12). Both give 4. The quotitive reading is the one that survives fractions.',
        hi: 'भाग की दो पढ़ाइयाँ हैं: 12 को 3 बराबर हिस्सों में बाँटना, और 12 में 3 कितनी बार आता है। दोनों का जवाब 4 है। भिन्नों में दूसरी पढ़ाई काम आती है।',
      },
    },
  },
  {
    id: 'probe2',
    rung: 2,
    rungLabel: RUNG_LABELS[1],
    prompt: {
      en: 'Now 3 ÷ ½. How many halves fit inside 3 wholes?',
      hi: 'अब 3 ÷ ½। तीन पूरों में कितने आधे आते हैं?',
    },
    options: [
      {
        id: 'six',
        label: { en: '6', hi: '6' },
        verdict: 'right',
        reply: {
          en: 'Exactly. Two halves in every whole, so three wholes hold six halves. You just did 3 × 2 without being told to.',
          hi: 'बिल्कुल। हर पूरे में दो आधे, इसलिए तीन पूरों में छह आधे। तुमने बिना बताए 3 × 2 कर लिया।',
        },
        next: 'probe3',
      },
      {
        id: 'onehalf',
        label: { en: '1.5', hi: '1.5' },
        verdict: 'stuck',
        stuckPoint: { en: 'Halving the number instead of counting halves', hi: 'आधों को गिनने की जगह 3 का आधा निकालना' },
        reply: {
          en: 'That is half of 3 — the question is not “what is half of 3?” It is “how many halves are hiding in 3?”',
          hi: 'यह 3 का आधा है — सवाल यह नहीं है। सवाल यह है: 3 में कितने आधे छिपे हैं?',
        },
        next: 'probe3',
      },
      {
        id: 'three',
        label: { en: '3', hi: '3' },
        verdict: 'stuck',
        stuckPoint: { en: 'Counting wholes, not pieces', hi: 'टुकड़े नहीं, पूरे गिनना' },
        reply: {
          en: 'Three halves make one and a half wholes — so three wholes must hold more than three halves.',
          hi: 'तीन आधे डेढ़ पूरे बनते हैं — तो तीन पूरों में तीन से ज़्यादा आधे होंगे।',
        },
        next: 'probe3',
      },
      {
        id: 'two',
        label: { en: '2', hi: '2' },
        verdict: 'partial',
        stuckPoint: { en: 'Counting halves in one whole, then stopping', hi: 'एक पूरे में गिनकर रुक जाना' },
        reply: {
          en: 'Two halves fit in one whole — good. But we have three wholes. Keep counting.',
          hi: 'एक पूरे में दो आधे आते हैं — सही। पर हमारे पास तीन पूरे हैं। गिनते रहो।',
        },
        next: 'probe3',
      },
    ],
    rebuild: {
      '10': {
        en: 'Cut one roti into two halves. One roti holds two halves. Three rotis hold 2 + 2 + 2 = 6 halves. You are not shrinking 3 — you are counting pieces.',
        hi: 'एक रोटी को दो आधों में काटो। एक में दो आधे। तीन में 2 + 2 + 2 = 6 आधे। तुम 3 को छोटा नहीं कर रहे — टुकड़े गिन रहे हो।',
      },
      '16': {
        en: '3 ÷ ½ asks how many times ½ fits into 3. Each whole holds two halves, so the count is 3 × 2 = 6. Dividing by a number smaller than 1 gives a bigger answer because you are counting smaller pieces.',
        hi: '3 ÷ ½ पूछता है कि 3 में ½ कितनी बार समाता है। हर पूरे में दो आधे, इसलिए गिनती 3 × 2 = 6 है। 1 से छोटी संख्या से भाग देने पर जवाब बड़ा आता है, क्योंकि टुकड़े छोटे हैं।',
      },
    },
  },
  {
    id: 'probe3',
    rung: 3,
    rungLabel: RUNG_LABELS[2],
    prompt: {
      en: 'Last probe. Why is 3 ÷ ½ the same as 3 × 2?',
      hi: 'आखिरी सवाल। 3 ÷ ½, 3 × 2 के बराबर क्यों है?',
    },
    options: [
      {
        id: 'perwhole',
        label: {
          en: 'Every whole holds two halves, so three wholes hold 3 × 2.',
          hi: 'हर पूरे में दो आधे, इसलिए तीन पूरों में 3 × 2।',
        },
        verdict: 'right',
        reply: {
          en: 'That is the reason, not the rule. You could rebuild it tomorrow without remembering the flip.',
          hi: 'यह वजह है, नियम नहीं। कल नियम भूल जाओ तो भी इसे फिर बना सकते हो।',
        },
        next: 'prove',
      },
      {
        id: 'flip',
        label: { en: 'Because you flip the second fraction.', hi: 'क्योंकि दूसरा भिन्न उलट देना होता है।' },
        verdict: 'partial',
        stuckPoint: { en: 'The rule without the reason', hi: 'वजह के बिना नियम' },
        reply: {
          en: 'That is the rule. A rule you cannot rebuild is a rule you will forget. Here is the reason underneath it.',
          hi: 'यह नियम है। जिस नियम को फिर नहीं बना सकते, वह भूल जाता है। इसके नीचे की वजह देखो।',
        },
        next: 'prove',
      },
      {
        id: 'bigger',
        label: {
          en: 'Because dividing by a fraction always makes the answer bigger.',
          hi: 'क्योंकि भिन्न से भाग देने पर जवाब हमेशा बड़ा आता है।',
        },
        verdict: 'partial',
        stuckPoint: { en: 'A pattern, not a reason', hi: 'पैटर्न, वजह नहीं' },
        reply: {
          en: 'The pattern is real, but patterns break. Why does the answer grow? Because you are counting smaller pieces.',
          hi: 'पैटर्न सच है, पर पैटर्न टूटते हैं। जवाब बड़ा क्यों होता है? क्योंकि टुकड़े छोटे होते हैं।',
        },
        next: 'prove',
      },
      {
        id: 'reciprocal',
        label: {
          en: 'Because ½ × 2 = 1, so 2 is the number that undoes ½.',
          hi: 'क्योंकि ½ × 2 = 1, यानी 2 वह संख्या है जो ½ को उलटती है।',
        },
        verdict: 'right',
        reply: {
          en: 'That is the deep answer. Dividing by ½ is multiplying by the number that turns ½ into 1 — its reciprocal.',
          hi: 'यह गहरा जवाब है। ½ से भाग देना, उस संख्या से गुणा करना है जो ½ को 1 बनाती है — उसका उलटा।',
        },
        next: 'prove',
      },
    ],
    rebuild: {
      '10': {
        en: 'Do not memorise “flip it”. Count. One whole holds two halves. Three wholes hold six. The flip is just a shortcut for that counting.',
        hi: '“उलट दो” रटो मत। गिनो। एक पूरे में दो आधे। तीन में छह। उलटना उसी गिनती का छोटा रास्ता है।',
      },
      '16': {
        en: 'Dividing by a fraction is multiplying by its reciprocal, because a reciprocal is defined by a × (1/a) = 1. For ½ the reciprocal is 2, so 3 ÷ ½ = 3 × 2.',
        hi: 'भिन्न से भाग देना उसके उलटे से गुणा करना है, क्योंकि उलटा a × (1/a) = 1 से बनता है। ½ का उलटा 2 है, इसलिए 3 ÷ ½ = 3 × 2।',
      },
    },
  },
];

export const PROOF = {
  prompt: {
    en: 'One sentence: why is 3 ÷ ½ = 6?',
    hi: 'एक वाक्य में: 3 ÷ ½ = 6 क्यों है?',
  },
  placeholder: {
    en: 'Say it in your own words. The tutor is checking the idea, not the wording.',
    hi: 'अपने शब्दों में कहो। ट्यूटर शब्द नहीं, सोच जाँच रहा है।',
  },
  model: {
    en: 'Each whole holds two halves, so three wholes hold 3 × 2 = 6 halves.',
    hi: 'हर पूरे में दो आधे आते हैं, इसलिए तीन पूरों में 3 × 2 = 6 आधे आते हैं।',
  },
};

/* ------------------------------------------------------------------ */
/* The document shelf                                                  */
/* ------------------------------------------------------------------ */

export type ShelfSection = {
  id: string;
  heading: Bi;
  summary: Bi;
  text: string;
  keywordsHi: string[];
};

export type ShelfDoc = {
  id: string;
  title: string;
  titleHi: string;
  kind: 'policy' | 'handbook';
  updated: string;
  change?: Bi;
  sections: ShelfSection[];
};

export const SHELF: ShelfDoc[] = [
  {
    id: 'attendance',
    title: 'Attendance & absence',
    titleHi: 'उपस्थिति और अनुपस्थिति',
    kind: 'policy',
    updated: '2026-04-02',
    change: {
      en: 'Minimum attendance raised from 70% to 75%; medical leave now needs a certificate within three days.',
      hi: 'न्यूनतम उपस्थिति 70% से बढ़ाकर 75%; मेडिकल छुट्टी के लिए तीन दिन में प्रमाणपत्र ज़रूरी।',
    },
    sections: [
      {
        id: 'attendance-minimum',
        heading: { en: 'Minimum attendance', hi: 'न्यूनतम उपस्थिति' },
        summary: {
          en: 'A student needs 75% attendance in each subject, not across the whole timetable, to sit the term-end examination.',
          hi: 'टर्म-एंड परीक्षा देने के लिए हर विषय में 75% उपस्थिति चाहिए — पूरे टाइमटेबल में नहीं।',
        },
        text: 'Every student must attend at least 75% of classes in a term to sit the term-end examination. Attendance is counted per subject, not across the timetable, so a student can clear the overall average and still be short in one subject.',
        keywordsHi: ['उपस्थिति', 'कक्षा', 'परीक्षा', 'छूट', '75'],
      },
      {
        id: 'attendance-medical',
        heading: { en: 'Medical leave', hi: 'मेडिकल छुट्टी' },
        summary: {
          en: 'Absence covered by a medical certificate does not count against the 75% requirement if the certificate reaches the class teacher within three days.',
          hi: 'मेडिकल प्रमाणपत्र वाली अनुपस्थिति 75% में नहीं गिनी जाती, बशर्ते प्रमाणपत्र तीन दिन में कक्षा शिक्षक को मिले।',
        },
        text: 'Absence with a medical certificate does not count against the 75% requirement, provided the certificate reaches the class teacher within three days of the student returning to school. Certificates submitted later are recorded but do not adjust the attendance figure for that term.',
        keywordsHi: ['मेडिकल', 'प्रमाणपत्र', 'बीमारी', 'उपस्थिति'],
      },
    ],
  },
  {
    id: 'assessment',
    title: 'Assessment & report cards',
    titleHi: 'मूल्यांकन और रिपोर्ट कार्ड',
    kind: 'policy',
    updated: '2026-05-14',
    change: {
      en: 'Two unit tests replaced by one project and one test; report cards now show a mastery band alongside marks.',
      hi: 'दो यूनिट टेस्ट की जगह एक प्रोजेक्ट और एक टेस्ट; रिपोर्ट कार्ड में अंकों के साथ मास्टरी बैंड।',
    },
    sections: [
      {
        id: 'assessment-term',
        heading: { en: 'How a term is assessed', hi: 'टर्म का मूल्यांकन' },
        summary: {
          en: 'Each term is 40% project and 60% written test, with the project rubric shared at the start of the term.',
          hi: 'हर टर्म में 40% प्रोजेक्ट और 60% लिखित परीक्षा; प्रोजेक्ट का रूब्रिक टर्म की शुरुआत में दिया जाता है।',
        },
        text: 'Each term has one project worth 40% and one written test worth 60%. Projects are marked on a rubric published at the start of the term, so students know the criteria before they begin.',
        keywordsHi: ['मूल्यांकन', 'प्रोजेक्ट', 'परीक्षा', 'अंक', 'रूब्रिक'],
      },
      {
        id: 'assessment-report',
        heading: { en: 'Reading a report card', hi: 'रिपोर्ट कार्ड पढ़ना' },
        summary: {
          en: 'Report cards show marks and a mastery band — Emerging, Developing or Secure — where Secure means the student can explain the idea unaided.',
          hi: 'रिपोर्ट कार्ड में अंक और मास्टरी बैंड होता है — Emerging, Developing, Secure; Secure का मतलब है बिना मदद समझा सकना।',
        },
        text: 'Report cards show marks and a mastery band: Emerging, Developing or Secure. A Secure band means the student can explain the idea without help and apply it to a question they have not seen before.',
        keywordsHi: ['रिपोर्ट', 'मास्टरी', 'बैंड', 'अंक', 'समझ'],
      },
    ],
  },
  {
    id: 'ai-use',
    title: 'AI tools in coursework',
    titleHi: 'पाठ्यक्रम में एआई उपकरण',
    kind: 'policy',
    updated: '2026-03-28',
    change: {
      en: 'AI tools are now allowed for drafting with a one-line disclosure; banned in final assessments.',
      hi: 'ड्राफ्टिंग के लिए एआई की अनुमति, एक पंक्ति का खुलासा ज़रूरी; अंतिम परीक्षाओं में प्रतिबंध।',
    },
    sections: [
      {
        id: 'ai-allowed',
        heading: { en: 'Where AI is allowed', hi: 'एआई कहाँ allowed है' },
        summary: {
          en: 'AI may be used for brainstorming, drafting and grammar checks, but every submission needs a one-line disclosure of the tool and the help it gave.',
          hi: 'एआई से विचार, ड्राफ्ट और व्याकरण सुधार सकते हैं, पर हर काम में टूल और उसकी मदद का एक पंक्ति खुलासा ज़रूरी।',
        },
        text: 'Students may use AI tools for brainstorming, drafting and checking grammar. Every submission must include a one-line disclosure naming the tool and what it helped with. Undisclosed use is treated as a breach of the disclosure rule, even when the work itself is original.',
        keywordsHi: ['एआई', 'ai', 'अनुमति', 'खुलासा', 'ड्राफ्ट', 'होमवर्क'],
      },
      {
        id: 'ai-banned',
        heading: { en: 'Where AI is not allowed', hi: 'एआई कहाँ मना है' },
        summary: {
          en: 'AI is not allowed in final assessments or in any work marked as unaided; using it there counts as academic dishonesty.',
          hi: 'अंतिम परीक्षा या “बिना मदद” वाले काम में एआई मना है; वहाँ इसका उपयोग बेईमानी माना जाएगा।',
        },
        text: 'AI tools are not allowed in final assessments or in any work marked as unaided. Using them there is treated as academic dishonesty and goes to the academic integrity committee, not to the class teacher.',
        keywordsHi: ['एआई', 'परीक्षा', 'मना', 'बेईमानी', 'अनुशासन'],
      },
    ],
  },
  {
    id: 'reevaluation',
    title: 'Exam re-evaluation',
    titleHi: 'परीक्षा पुनर्मूल्यांकन',
    kind: 'policy',
    updated: '2025-11-09',
    sections: [
      {
        id: 'reevaluation-request',
        heading: { en: 'Requesting a recheck', hi: 'दोबारा जाँच का अनुरोध' },
        summary: {
          en: 'File within 10 working days of the result with ₹200 per paper; only totalling and marking errors are rechecked.',
          hi: 'नतीजे के 10 कार्य-दिवसों में ₹200 प्रति पेपर जमा करें; सिर्फ़ जोड़ और अंकन की गलती देखी जाती है।',
        },
        text: 'A re-evaluation request must be filed within 10 working days of the result, with a fee of ₹200 per paper. Only totalling and marking errors are rechecked. The answer script is not re-taught or re-graded for style.',
        keywordsHi: ['पुनर्मूल्यांकन', 'दोबारा', 'जाँच', 'पेपर', 'अंक', 'फीस'],
      },
      {
        id: 'reevaluation-outcome',
        heading: { en: 'Outcomes and refunds', hi: 'नतीजे और वापसी' },
        summary: {
          en: 'If the total changes, the fee is refunded and a revised mark sheet is issued within 15 days.',
          hi: 'कुल अंक बदलने पर फीस वापस मिलती है और 15 दिन में नई मार्कशीट जारी होती है।',
        },
        text: 'If the total changes, the fee is refunded and the revised mark is issued within 15 days. If the total does not change, the original mark stands and the fee is not refunded.',
        keywordsHi: ['पुनर्मूल्यांकन', 'वापसी', 'मार्कशीट', 'नतीजा'],
      },
    ],
  },
  {
    id: 'fees',
    title: 'Fee refunds on withdrawal',
    titleHi: 'नाम कटने पर फीस वापसी',
    kind: 'policy',
    updated: '2026-01-20',
    sections: [
      {
        id: 'fees-slabs',
        heading: { en: 'Refund slabs', hi: 'वापसी के हिस्से' },
        summary: {
          en: 'Full refund before the term starts, 75% within the first 15 days, and no tuition refund after that.',
          hi: 'टर्म शुरू होने से पहले पूरी वापसी, पहले 15 दिनों में 75%, उसके बाद ट्यूशन की वापसी नहीं।',
        },
        text: 'Withdrawal before the term starts gets a 100% refund. Withdrawal within the first 15 days gets 75%. After 15 days there is no refund of tuition, but transport and activity fees are pro-rated for the unused months.',
        keywordsHi: ['फीस', 'वापसी', 'रिफंड', 'टर्म', 'स्थानांतरण'],
      },
      {
        id: 'fees-apply',
        heading: { en: 'How to apply', hi: 'आवेदन कैसे करें' },
        summary: {
          en: 'Submit the withdrawal form and original receipt at the office; refunds reach the original payment method within 21 working days.',
          hi: 'दफ़्तर में नाम कटने का फ़ॉर्म और मूल रसीद दें; 21 कार्य-दिवसों में उसी भुगतान तरीके से पैसा मिलेगा।',
        },
        text: 'Submit the withdrawal form at the office with the original fee receipt. Refunds are processed to the original payment method within 21 working days. Bank details cannot be changed at the refund stage.',
        keywordsHi: ['फीस', 'वापसी', 'फ़ॉर्म', 'रसीद', 'भुगतान', 'बैंक'],
      },
    ],
  },
  {
    id: 'language',
    title: 'Language support',
    titleHi: 'भाषा सहायता',
    kind: 'policy',
    updated: '2026-06-01',
    change: {
      en: 'Hindi-medium support extended to Grades 6–8; a bilingual glossary is now issued for every subject.',
      hi: 'हिंदी माध्यम सहायता कक्षा 6–8 तक बढ़ी; अब हर विषय के लिए द्विभाषी शब्दावली दी जाती है।',
    },
    sections: [
      {
        id: 'language-medium',
        heading: { en: 'Medium of instruction', hi: 'पढ़ाई का माध्यम' },
        summary: {
          en: 'English is the medium of instruction, with Hindi-medium sections for Grades 6–8 in Mathematics, Science and Social Science.',
          hi: 'पढ़ाई अंग्रेज़ी में है; कक्षा 6–8 के गणित, विज्ञान और सामाजिक विज्ञान में हिंदी माध्यम के वर्ग हैं।',
        },
        text: 'English is the medium of instruction. Hindi-medium sections run for Grades 6–8 in Mathematics, Science and Social Science. A student may move between sections at the start of a term with the coordinator’s approval.',
        keywordsHi: ['भाषा', 'हिंदी', 'अंग्रेज़ी', 'माध्यम', 'कक्षा'],
      },
      {
        id: 'language-glossary',
        heading: { en: 'Bilingual materials', hi: 'द्विभाषी सामग्री' },
        summary: {
          en: 'Every subject issues a bilingual glossary each term, and answers may be written in English or Hindi unless it is a language paper.',
          hi: 'हर विषय हर टर्म द्विभाषी शब्दावली देता है; भाषा के पेपर को छोड़कर जवाब अंग्रेज़ी या हिंदी में लिखे जा सकते हैं।',
        },
        text: 'Every subject issues a bilingual glossary of key terms at the start of each term. Answers may be written in English or Hindi unless the paper is a language paper. Marks are not reduced for language choice in other subjects.',
        keywordsHi: ['शब्दावली', 'हिंदी', 'अंग्रेज़ी', 'जवाब', 'भाषा'],
      },
    ],
  },
  {
    id: 'scholarship',
    title: 'Scholarships & fee waivers',
    titleHi: 'छात्रवृत्ति और फीस छूट',
    kind: 'policy',
    updated: '2025-08-18',
    sections: [
      {
        id: 'scholarship-merit',
        heading: { en: 'Merit scholarship', hi: 'मेरिट छात्रवृत्ति' },
        summary: {
          en: 'A 50% tuition waiver goes to the top 5% of each grade and is renewed each term on mastery band and attendance.',
          hi: 'हर कक्षा के शीर्ष 5% को 50% ट्यूशन छूट; हर टर्म मास्टरी बैंड और उपस्थिति पर नवीनीकरण।',
        },
        text: 'A 50% tuition waiver is offered to the top 5% of each grade. It is renewed each term on the basis of the mastery band and attendance, not on a single test score.',
        keywordsHi: ['छात्रवृत्ति', 'मेरिट', 'छूट', 'फीस', 'मास्टरी'],
      },
      {
        id: 'scholarship-need',
        heading: { en: 'Need-based waiver', hi: 'ज़रूरत आधारित छूट' },
        summary: {
          en: 'Families may apply with income proof; a committee decides and does not share the decision with other families.',
          hi: 'परिवार आय प्रमाण के साथ आवेदन कर सकते हैं; समिति फ़ैसला करती है और दूसरे परिवारों को नहीं बताया जाता।',
        },
        text: 'Families may apply for a need-based waiver with income proof. A committee reviews applications and the decision is not published or shared with other families. Reapplication is allowed each academic year.',
        keywordsHi: ['छूट', 'ज़रूरत', 'आय', 'आवेदन', 'गोपनीय'],
      },
    ],
  },
  {
    id: 'devices',
    title: 'Phones & devices',
    titleHi: 'फोन और उपकरण',
    kind: 'policy',
    updated: '2026-02-11',
    sections: [
      {
        id: 'devices-hours',
        heading: { en: 'During school hours', hi: 'स्कूल के समय' },
        summary: {
          en: 'Phones must be off and in bags from the first bell to the last; smartwatches follow the same rule.',
          hi: 'पहली घंटी से आखिरी तक फोन बंद और बस्ते में; स्मार्टवॉच पर भी वही नियम।',
        },
        text: 'Phones must be switched off and kept in bags from the first bell to the last. Smartwatches follow the same rule. A phone seen during class is kept at the office and returned to a parent.',
        keywordsHi: ['फोन', 'डिवाइस', 'स्मार्टवॉच', 'कक्षा', 'नियम'],
      },
      {
        id: 'devices-exceptions',
        heading: { en: 'Exceptions', hi: 'अपवाद' },
        summary: {
          en: 'A teacher may allow a device for a lesson, and medical devices are always allowed with a nurse’s note.',
          hi: 'शिक्षक पाठ के लिए उपकरण की अनुमति दे सकते हैं; नर्स की पर्ची के साथ मेडिकल उपकरण हमेशा allowed।',
        },
        text: 'A teacher may allow a device for a lesson. Medical devices are always allowed with a note from the school nurse. Students who need a phone for transport should leave it at the office and collect it at the last bell.',
        keywordsHi: ['फोन', 'अपवाद', 'मेडिकल', 'अनुमति', 'नर्स'],
      },
    ],
  },
  {
    id: 'library',
    title: 'Library & reading room',
    titleHi: 'पुस्तकालय और वाचन कक्ष',
    kind: 'handbook',
    updated: '2025-12-05',
    sections: [
      {
        id: 'library-borrowing',
        heading: { en: 'Borrowing', hi: 'किताबें लेना' },
        summary: {
          en: 'Two books for 14 days; a late return blocks new borrowing until the book comes back.',
          hi: 'दो किताबें, 14 दिन; देर से लौटाने पर किताब वापस होने तक नई किताब नहीं मिलेगी।',
        },
        text: 'Students may borrow two books for 14 days. A late return blocks new borrowing until the book is returned. Reference books and the current year’s textbooks cannot be borrowed.',
        keywordsHi: ['पुस्तकालय', 'किताब', 'उधार', '14', 'देरी'],
      },
      {
        id: 'library-room',
        heading: { en: 'Reading room', hi: 'वाचन कक्ष' },
        summary: {
          en: 'Open 8 am to 5 pm on school days; food and phone calls are not allowed inside.',
          hi: 'स्कूल के दिन 8 से 5 बजे तक खुला; अंदर खाना और फोन पर बात मना है।',
        },
        text: 'The reading room is open 8 am to 5 pm on school days. Food and phone calls are not allowed inside. Group study is allowed at the back tables when a teacher has booked the room.',
        keywordsHi: ['पुस्तकालय', 'वाचन', 'समय', 'खाना', 'फोन'],
      },
    ],
  },
  {
    id: 'trips',
    title: 'Field trips & consent',
    titleHi: 'शैक्षणिक यात्रा और अनुमति',
    kind: 'handbook',
    updated: '2026-04-22',
    change: {
      en: 'Consent now needs a parent signature and an emergency contact at least 48 hours before departure.',
      hi: 'यात्रा से 48 घंटे पहले माता-पिता के हस्ताक्षर और आपात संपर्क ज़रूरी।',
    },
    sections: [
      {
        id: 'trips-consent',
        heading: { en: 'Consent', hi: 'अनुमति' },
        summary: {
          en: 'No student joins a trip without a signed consent form and an emergency contact submitted 48 hours before departure.',
          hi: 'हस्ताक्षरित फ़ॉर्म और आपात संपर्क 48 घंटे पहले जमा किए बिना कोई छात्र यात्रा पर नहीं जा सकता।',
        },
        text: 'No student may join a field trip without a signed consent form and an emergency contact, submitted at least 48 hours before departure. Verbal permission or a message to the class teacher is not enough.',
        keywordsHi: ['यात्रा', 'अनुमति', 'फ़ॉर्म', 'आपात', 'संपर्क', '48'],
      },
      {
        id: 'trips-cost',
        heading: { en: 'Costs and safety', hi: 'खर्च और सुरक्षा' },
        summary: {
          en: 'Trip costs are listed on the consent form, and every group travels with at least one staff member trained in first aid.',
          hi: 'खर्च फ़ॉर्म पर लिखा होता है; हर समूह के साथ प्राथमिक चिकित्सा प्रशिक्षित स्टाफ़ रहता है।',
        },
        text: 'Trip costs are listed on the consent form. At least one staff member trained in first aid travels with every group. Students with medical needs should hand a care plan to the trip lead a week before departure.',
        keywordsHi: ['यात्रा', 'खर्च', 'सुरक्षा', 'प्राथमिक', 'चिकित्सा'],
      },
    ],
  },
];

export const SHELF_META = {
  owner: 'Nalanda Public School',
  title: 'Academic Handbook 2026',
  titleHi: 'शैक्षणिक हैंडबुक 2026',
};

/* ------------------------------------------------------------------ */
/* Help centre                                                         */
/* ------------------------------------------------------------------ */

export type HelpItem = {
  q: Bi;
  a: Bi;
  docId: string;
  sectionId: string;
};

export const HELP: HelpItem[] = [
  {
    q: { en: 'How much attendance do I need to sit the exam?', hi: 'परीक्षा देने के लिए कितनी उपस्थिति चाहिए?' },
    a: {
      en: '75% in each subject — it is counted per subject, not as a school-wide average. Medical leave with a certificate submitted within three days does not count against you.',
      hi: 'हर विषय में 75% — गिनती विषय के हिसाब से होती है, पूरे स्कूल के औसत से नहीं। तीन दिन में प्रमाणपत्र देने पर मेडिकल छुट्टी नहीं गिनी जाती।',
    },
    docId: 'attendance',
    sectionId: 'attendance-minimum',
  },
  {
    q: { en: 'Can I use AI for my project?', hi: 'क्या मैं प्रोजेक्ट में एआई ले सकता हूँ?' },
    a: {
      en: 'Yes, for brainstorming, drafting and grammar — with a one-line disclosure naming the tool and what it helped with. Not in final assessments or any work marked unaided.',
      hi: 'हाँ — विचार, ड्राफ्ट और व्याकरण के लिए, पर टूल और उसकी मदद का एक पंक्ति खुलासा ज़रूरी। अंतिम परीक्षा या “बिना मदद” वाले काम में नहीं।',
    },
    docId: 'ai-use',
    sectionId: 'ai-allowed',
  },
  {
    q: { en: 'How do I get my exam paper rechecked?', hi: 'परीक्षा पेपर दोबारा कैसे जाँचा जाएगा?' },
    a: {
      en: 'File within 10 working days of the result with ₹200 per paper. Only totalling and marking errors are rechecked; if the total changes, the fee is refunded.',
      hi: 'नतीजे के 10 कार्य-दिवसों में ₹200 प्रति पेपर जमा करें। सिर्फ़ जोड़ और अंकन की गलती देखी जाती है; कुल बदलने पर फीस वापस।',
    },
    docId: 'reevaluation',
    sectionId: 'reevaluation-request',
  },
  {
    q: { en: 'What happens to our fees if we move cities mid-term?', hi: 'बीच टर्म में शहर बदलने पर फीस का क्या होगा?' },
    a: {
      en: 'Before the term: full refund. Within 15 days: 75%. After 15 days: no tuition refund, but transport and activity fees are pro-rated. Submit the withdrawal form with the original receipt.',
      hi: 'टर्म से पहले: पूरी वापसी। 15 दिन में: 75%। 15 दिन बाद: ट्यूशन की वापसी नहीं, पर ट्रांसपोर्ट और गतिविधि फीस महीने के हिसाब से। मूल रसीद के साथ फ़ॉर्म दें।',
    },
    docId: 'fees',
    sectionId: 'fees-slabs',
  },
];

/* ------------------------------------------------------------------ */
/* Build notes, brief facts, sources                                   */
/* ------------------------------------------------------------------ */

export const BUILD_FACTS: { k: string; v: string }[] = [
  { k: 'Stack', v: 'React 19, TypeScript, Vite. Five React Bits components, fetched from the registry — not retyped.' },
  { k: 'Tutor', v: 'A branching diagnostic: three probes, a stuck-point label, and a rebuild explanation at two reading levels.' },
  { k: 'Search', v: 'BM25-style ranking over 10 documents and 20 sections, with month filters and a bilingual keyword index.' },
  { k: 'Proof', v: 'A rubric checks your explanation for the three ideas that make the answer work, then issues a receipt.' },
  { k: 'Privacy', v: 'No backend, no API keys, no analytics. Everything runs in the tab and nothing is uploaded.' },
  { k: 'Languages', v: 'The tutor, answers and receipts switch between English and Hindi. Source documents stay in English.' },
];

export const LIMITS: Bi[] = [
  {
    en: 'The diagnostic is a hand-written branch of three probes, not an open-ended LLM tutor. It shows the loop, not the full model.',
    hi: 'डायग्नोस्टिक तीन सवालों की लिखी हुई शाखा है, खुला एलएलएम ट्यूटर नहीं। यह तरीका दिखाता है, पूरा मॉडल नहीं।',
  },
  {
    en: 'Search returns extractive answers and authored summaries. It does not generate prose, so it cannot hallucinate a policy — or explain one that is not on the shelf.',
    hi: 'खोज जवाब मौजूदा पाठ और लिखे सारांश से देती है। यह नया पाठ नहीं बनाती, इसलिए नीति गढ़ नहीं सकती — और शेल्फ पर न हो तो समझा भी नहीं सकती।',
  },
  {
    en: 'The mastery rubric is heuristic: it looks for three concepts, not meaning. It is evidence of an explanation, not proof of understanding.',
    hi: 'मास्टरी रूब्रिक अनुमानित है: यह तीन विचार खोजती है, अर्थ नहीं। यह व्याख्या का सबूत है, समझ का पक्का प्रमाण नहीं।',
  },
  {
    en: 'Hindi answers are authored summaries over English source text. A production build would need a real bilingual retrieval model.',
    hi: 'हिंदी जवाब अंग्रेज़ी स्रोत के लिखे सारांश हैं। असली उत्पाद के लिए द्विभाषी रिट्रीवल मॉडल चाहिए।',
  },
];

export const BRIEF_FACTS: { k: string; v: string }[] = [
  { k: 'Hackathon', v: 'Homingo Hackathon — Edition 01, a national-scale AI Engineering hackathon for students and early-career developers in India.' },
  { k: 'Track', v: 'LLM apps · C3 “A tutor for every learner” — the brief this site answers.' },
  { k: 'Kick-off', v: '21 November 2026. Build phase runs to submissions closing 6 December 2026, 11:59 pm IST.' },
  { k: 'Format', v: 'Online, open to all of India. Solo or teams of 2–4.' },
  { k: 'Prizes', v: '₹5,000 top prize plus a winner recommendation certificate from SurgeLabs; recommendation certificates for 2nd and 3rd.' },
  { k: 'Tracks', v: 'Agents, Automation and LLM apps. Every track is judged on shipped work: a public repo and a demo that works.' },
];

export const BRIEF_SOURCES: { label: string; href: string }[] = [
  { label: 'Problem statements', href: 'https://hackathon.homingo.co.in/hackathons/edition-01/problem-statements' },
  { label: 'Tracks', href: 'https://hackathon.homingo.co.in/tracks' },
  { label: 'Prizes & sponsors', href: 'https://hackathon.homingo.co.in/prizes' },
  { label: 'How it works', href: 'https://hackathon.homingo.co.in/how-it-works' },
  { label: 'All editions', href: 'https://hackathon.homingo.co.in/hackathons' },
];

export const SAMPLE_RECEIPT = {
  code: 'SDH-7K2QF',
  verdict: 'proven' as const,
  text: 'Each whole holds two halves, so three wholes hold six halves.',
  matched: ['halves', 'count', 'six'],
  date: '25 Nov 2026',
};
