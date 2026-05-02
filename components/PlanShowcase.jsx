import SectionMeta from "./SectionMeta";
import PlanFeature from "./PlanFeature";
import PhoneMockup from "./PhoneMockup";
import styles from "./PlanShowcase.module.css";

export default function PlanShowcase() {
  return (
    <section className={styles.section}>
      <SectionMeta number="04" label="The plan" />
      <div className={styles.grid}>
        <div>
          <h2 className={styles.title}>
            Save it.<br />Route it.<br />
            <em className={styles.italic}>Leave on time.</em>
          </h2>
          <p className={styles.copy}>
            Save anywhere. Drop saved places into a route and the plan
            assembles itself: arrival times, how long to stay, when to leave,
            travel method between stops — walk for under two kilometres,
            tuk-tuk for the south coast hops, car when you&apos;re crossing the
            island.
          </p>
          <div className={styles.features}>
            <PlanFeature label="Auto-routing" detail="real Sri Lankan travel times" />
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
