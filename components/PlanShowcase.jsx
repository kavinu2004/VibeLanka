import SectionMeta from "./SectionMeta";
import PlanFeature from "./PlanFeature";
import PhoneMockup from "./PhoneMockup";
import styles from "./PlanShowcase.module.css";

export default function PlanShowcase() {
  return (
    <section className={styles.section}>
      <SectionMeta number="03" label="The plan" />
      <div className={styles.grid}>
        <div>
          <h2 className={styles.title}>
            Save it.<br />Route it.<br />
            <em className={styles.italic}>Leave on time.</em>
          </h2>
          <p className={styles.copy}>
            Save the places you want to hit. The app builds the route —
            order, timing, how to get between stops.
          </p>
          <div className={styles.features}>
            <PlanFeature label="Auto-routing" detail="real Sri Lankan travel times — walk, tuk-tuk, or car based on distance" />
            <PlanFeature label="Stay durations" detail="based on category — café 60m, bar 120m" />
            <PlanFeature label="Leave-by alerts" detail="so you make the next stop on time" />
          </div>
        </div>
        <div className={styles.phoneCol}>
          <PhoneMockup variant="plan" />
        </div>
      </div>
    </section>
  );
}
