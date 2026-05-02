import SectionMeta from "./SectionMeta";
import styles from "./FeatureExplainer.module.css";

export default function FeatureExplainer() {
  return (
    <section className={styles.section}>
      <SectionMeta number="01" label="What it is" />
      <div className={styles.grid}>
        <div>
          <h2 className={styles.lead}>
            A <em className={styles.italic}>local-first</em> map of where Sri
            Lanka actually is right now — not where it was last summer.
          </h2>
        </div>
        <div className={styles.right}>
          <p className={styles.copy}>
            Tourist guides go stale in eight months. Google reviews bury the
            two-year-old kottu shop your driver swears by. Vibe Lanka is the
            opposite: an app that knows the bay flat-emptied at noon, that
            Smoke &amp; Bitters is at 88% tonight, that the Hiriketiya yoga
            shala starts at seven on Tuesdays.
          </p>
          <p className={styles.copy}>
            We track three things: where the must-visits are by area, where
            the crowd actually is right now, and which venues paid to be
            seen. We mark the third one clearly — it&apos;s the only way the
            first two stay honest.
          </p>
        </div>
      </div>
    </section>
  );
}
