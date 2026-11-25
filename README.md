# Seedhi (सीढ़ी) — a tutor for every learner

**Live site:** https://divitgangrade-lab.github.io/Homingo-Hackathon-Divit/

Seedhi is a working demo built for **Homingo Hackathon · Edition 01 · Track C3, “A tutor for every learner.”**

> The best way to learn has always been a great personal tutor, and almost nobody has one. An AI tutor can find
> exactly where a learner is stuck, explain it in their language and at their level, and keep going until they
> understand. We want learning apps that prove people actually learned, not apps that only keep them busy.

The name means *ladder*. The idea is simple: find the broken rung, rebuild it, then make the learner prove it.

---

## What actually works on the page

Everything runs client-side. No backend, no API keys, no analytics, no network calls after the fonts load.

### 1. A branching diagnostic, not a scripted chat

Three probes on dividing by a fraction. Each answer changes the next move:

- a wrong answer is **named as a misconception** (“halving the number instead of counting halves”) and the rung is
  rebuilt;
- the rebuild appears at **two reading levels** (Class 5 concrete, Class 9 precise);
- the whole dialogue switches between **English and Hindi**;
- a progress ladder shows which rung you are on and which ones are done.

The state machine lives in [`site/src/content.ts`](site/src/content.ts) and
[`site/src/components/TutorDemo.tsx`](site/src/components/TutorDemo.tsx).

### 2. Natural-language search over a dated document shelf

Ten documents, twenty sections, from a fictional school handbook. Type or tap a question such as
**“which policies changed since March?”** and the page:

- parses the **date intent** (`since March` → a hard filter on the effective date);
- ranks sections with a **BM25-style scorer** (term frequency, inverse document frequency, heading and phrase
  bonuses);
- answers with an authored summary plus the **source section and date**;
- shows a **retrieval trace** so the result can be checked rather than trusted;
- accepts Hindi queries through a small bilingual keyword index (`फीस वापसी` finds the fee-refund policy).

Engine: [`site/src/lib/retrieval.ts`](site/src/lib/retrieval.ts). Corpus: `SHELF` in
[`site/src/content.ts`](site/src/content.ts).

### 3. A mastery receipt

After the third probe, the learner writes one sentence explaining why `3 ÷ ½ = 6`. A rubric looks for the three
ideas that make the explanation work — the unit (halves), the operation (counting how many fit), and the quantity
(six) — then issues a receipt with:

- a verdict (`Proven` / `Almost` / `Not yet`) and a stable receipt code;
- the ideas that were present and the ones still missing;
- an honest split between **what the sentence proves** and **what it does not**;
- a model answer, revealed only after submitting.

Rubric: [`site/src/lib/mastery.ts`](site/src/lib/mastery.ts).

### 4. A help centre with source lines

Four real questions, answered from the same shelf, each with the document, section and update date underneath and a
button that opens that document in the search demo.

---

## The research: Edition 01 has no past winners

We looked for past Homingo Hackathon winners before writing any copy. **There are none yet.** Edition 01 is the
first edition: the series page lists it as “happening now” and says past editions “will appear here once the first
one wraps up.” Rather than invent a winner list, the site says so and builds against the published bar.

What the series does publish:

| Fact | Detail |
| --- | --- |
| Event | Homingo Hackathon — Edition 01, a national-scale AI Engineering hackathon for students and early-career developers in India |
| Track | LLM apps · C3 “A tutor for every learner” |
| Kick-off | 21 November 2026 |
| Submissions close | 6 December 2026, 11:59 pm IST |
| Format | Online, open to all of India; solo or teams of 2–4 |
| Prizes | ₹5,000 top prize + winner recommendation certificate from SurgeLabs; recommendation certificates for 2nd and 3rd |
| Tracks | Agents, Automation, LLM apps |
| Judging bar | “We judge the thing you ship: a public repo and a demo that works.” |

Sources:

- [Problem statements](https://hackathon.homingo.co.in/hackathons/edition-01/problem-statements)
- [Tracks](https://hackathon.homingo.co.in/tracks)
- [Prizes & sponsors](https://hackathon.homingo.co.in/prizes)
- [How it works](https://hackathon.homingo.co.in/how-it-works)
- [All editions](https://hackathon.homingo.co.in/hackathons)
- [About Homingo Hack Days](https://hackathon.homingo.co.in/about)

---

## Stack

- **React 19 + TypeScript + Vite** — static output, no server.
- **React Bits** components, fetched from the live registry (`https://reactbits.dev/r/<Name>-TS-CSS.json`), not
  retyped:
  - `BlurText` — hero headline reveal. Patched with one `as` prop so the headline stays a real `<h1>`
    ([diff](site/src/components/rb/BlurText.tsx)).
  - `CountUp` — the three hero counters.
  - `SpotlightCard` — the three rung cards.
  - `TextType` — the rotating example queries in the shelf.
  - `Magnet` — the primary hero button.
- **motion** (required by `BlurText` / `CountUp`) and **gsap** (required by `TextType`), pinned to the versions the
  registry specifies.
- Fonts: Fraunces (display), Karla (body), IBM Plex Mono (labels), Tiro Devanagari Hindi (Devanagari).

No Tailwind: the React Bits CSS variants ship their own styles.

---

## Run it

```bash
cd site
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run ship       # build, then copy dist/ to the repo root for GitHub Pages
npm run lint       # oxlint
```

The site source is in `site/`. The repo root holds the **built** page (`index.html`, `assets/`, `favicon.svg`) because
GitHub Pages serves the root of `main`. `.nojekyll` stops Jekyll from processing it. To change the site, edit `site/`
and run `npm run ship`; do not hand-edit the root build.

### Repo layout

```
.
├── index.html          # built page served by GitHub Pages
├── assets/             # built JS + CSS
├── .nojekyll
├── README.md
└── site/               # source
    ├── index.html
    ├── src/
    │   ├── App.tsx
    │   ├── content.ts          # copy, tutor branch, corpus, help items, brief facts
    │   ├── styles.css          # design tokens + all layout
    │   ├── lib/retrieval.ts    # BM25-style search + date intent
    │   ├── lib/mastery.ts      # explanation rubric + receipt
    │   └── components/         # page sections + rb/ (React Bits)
    └── scripts/publish.mjs
```

---

## Known limits

- The diagnostic is a **hand-written branch of three probes**, not an open-ended LLM tutor. It demonstrates the loop,
  not the full model.
- Search is **extractive**: it returns authored summaries and source passages. It cannot hallucinate a policy, but it
  also cannot answer beyond its twenty sections.
- The mastery rubric is **heuristic** — it looks for three concepts, not meaning. A receipt is evidence of an
  explanation, not proof of understanding, and the UI says so.
- Hindi answers are **authored summaries** over English source text; the source excerpt is shown in English.
- Nothing persists between reloads: no accounts, no storage, no history.
- The editorial copy around the demos stays in English; the tutor, search answers and receipts switch language.

---

## Credits

- Built for Homingo Hackathon, Edition 01, track C3. Not affiliated with Homingo or SurgeLabs.
- React Bits by David Haz (MIT + Commons Clause) — components fetched from the registry.
- MIT License, 2026.
