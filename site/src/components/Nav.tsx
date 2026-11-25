import type { Lang } from '../content';

type Props = { lang: Lang; setLang: (lang: Lang) => void };

const LINKS: { href: string; en: string; hi: string }[] = [
  { href: '#ladder', en: 'The ladder', hi: 'सीढ़ी' },
  { href: '#shelf', en: 'The shelf', hi: 'दस्तावेज़' },
  { href: '#proof', en: 'Proof', hi: 'सबूत' },
  { href: '#help', en: 'Help centre', hi: 'मदद' },
  { href: '#build', en: 'Build', hi: 'बिल्ड' },
  { href: '#brief', en: 'Brief', hi: 'ब्रीफ़' },
];

export default function Nav({ lang, setLang }: Props) {
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <a className="brand" href="#top" aria-label="Seedhi, back to top">
          <span className="brand__hi" lang="hi">
            सीढ़ी
          </span>
          <span className="brand__en">Seedhi</span>
        </a>

        <nav className="nav" aria-label="Sections">
          {LINKS.map(link => (
            <a key={link.href} href={link.href}>
              {link[lang]}
            </a>
          ))}
        </nav>

        <div className="topbar__actions">
          <div className="seg" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
              EN
            </button>
            <button type="button" aria-pressed={lang === 'hi'} onClick={() => setLang('hi')} lang="hi">
              हिं
            </button>
          </div>
          <a
            className="ghost-link"
            href="https://github.com/divitgangrade-lab/Homingo-Hackathon-Divit"
            target="_blank"
            rel="noreferrer"
          >
            Repo ↗
          </a>
        </div>
      </div>
    </header>
  );
}
