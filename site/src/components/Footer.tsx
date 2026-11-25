export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <div className="footer__brand">
              <span className="footer__hi" lang="hi">
                सीढ़ी
              </span>
              <span className="footer__en">Seedhi</span>
            </div>
            <p className="footer__tag">Find the broken rung. Rebuild it. Then prove it.</p>
          </div>

          <div className="footer__links">
            <a href="#ladder">Diagnostic</a>
            <a href="#shelf">Shelf</a>
            <a href="#proof">Receipt</a>
            <a href="#brief">Brief</a>
            <a
              href="https://github.com/divitgangrade-lab/Homingo-Hackathon-Divit"
              target="_blank"
              rel="noreferrer"
            >
              Source ↗
            </a>
            <a href="https://reactbits.dev" target="_blank" rel="noreferrer">
              React Bits ↗
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>Built for Homingo Hackathon · Edition 01 · Track C3 “A tutor for every learner”.</span>
          <span>MIT License · 2026 · Not affiliated with Homingo or SurgeLabs.</span>
        </div>
      </div>
    </footer>
  );
}
