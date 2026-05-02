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
        Vibe Lanka tracks where Sri Lanka is going right now: bars, cafés,
        community gatherings across the south coast strip and beyond. Live
        updates direct from the venue. Built by Sri Lanka. For the world.
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
