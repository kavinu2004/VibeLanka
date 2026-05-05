import LiveClock from "./LiveClock";
import styles from "./Footer.module.css";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "South Coast", href: "#strip" },
      { label: "Trending", href: "#trending" },
      { label: "The plan", href: "#" },
    ],
  },
  {
    title: "For venues",
    links: [
      { label: "Partner program", href: "#partner" },
      { label: "Become featured", href: "mailto:partners@vibelanka.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Manifesto", href: "#" },
      { label: "Contact", href: "mailto:team@vibelanka.com" },
      { label: "Press", href: "mailto:press@vibelanka.com" },
    ],
  },
];

function FooterCol({ title, links }) {
  return (
    <div className={styles.col}>
      <span className={styles.colTitle}>{title.toUpperCase()}</span>
      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className={styles.anchor}>{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoText}>
            Vibe<em className={styles.logoItalic}>Lanka</em>
          </span>
          <span className={styles.coords}>06°55′N 80°48′E</span>
        </div>
        <div className={styles.cols}>
          {COLS.map((c) => (
            <FooterCol key={c.title} title={c.title} links={c.links} />
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.credits}>
          <span className={styles.credit}>© Vibe Lanka 2026 · Made on the bay</span>
          <span className={styles.credit}>Yaka illustration by Methni</span>
        </div>
        <span className={styles.live}>
          <span className={`${styles.liveDot} vl-pulse-dot`} />
          LIVE · <LiveClock />
        </span>
      </div>
    </footer>
  );
}
