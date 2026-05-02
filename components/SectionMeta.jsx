import styles from "./SectionMeta.module.css";

export default function SectionMeta({ number, label, mode = "default" }) {
  const modeClass =
    mode === "dark-bg" ? styles.metaDarkBg :
    mode === "inverted" ? styles.metaInverted :
    "";
  return (
    <div className={`${styles.meta} ${modeClass}`}>
      <span className={styles.num}>{number}</span>
      <span className={styles.line} />
      <span className={styles.label}>{label.toUpperCase()}</span>
    </div>
  );
}
