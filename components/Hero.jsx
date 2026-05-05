import LiveClock from "./LiveClock";
import CoastStrip from "./CoastStrip";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.kicker}>
        <span className={`${styles.kickerDot} vl-pulse-dot`} />
        <span>
          LIVE · 06°55′N 80°48′E · <LiveClock />
        </span>
      </div>

      <h1 className={styles.title}>
        <span className={styles.line}>The bay,</span>
        <span className={`${styles.line} ${styles.lineEmber}`}>
          <em className={styles.lineItalic}>tonight.</em>
        </span>
      </h1>

      <p className={styles.sub}>
        Vibe Lanka is how travelers find where to go in Sri Lanka — tonight,
        this weekend, this season. Not a listings page. A live, edited feed
        of the venues, parties, and pop-ups that locals are showing up for.
        Built for the trip you didn&apos;t know you could plan.
      </p>

      <div className={styles.actions}>
        <a href="#cta" className={styles.cta}>
          <span>Get the app</span>
          <span className={styles.ctaArrow}>↗</span>
        </a>
        <a href="#strip" className={styles.ghost}>
          See tonight&apos;s map
        </a>
      </div>

      <CoastStrip />
    </section>
  );
}
