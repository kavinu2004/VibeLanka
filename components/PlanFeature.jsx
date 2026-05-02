import styles from "./PlanFeature.module.css";

export default function PlanFeature({ label, detail }) {
  return (
    <div className={styles.feature}>
      <span className={styles.label}>{label}</span>
      <span className={styles.detail}>{detail}</span>
    </div>
  );
}
