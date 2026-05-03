import styles from "./PhilosophyBar.module.css";

const ITEMS = [
  "NO PLACEHOLDER LISTINGS",
  "PHONES, NOT REVIEWS",
  "LOCALS WROTE THIS",
  "FEATURED IS PAID, MARKED",
  "TRENDING IS NOT",
  "MIDNIGHT VOTE RESET",
  "ROUTING BY TUK-TUK",
];

export default function PhilosophyBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.list}>
        {ITEMS.map((item) => (
          <span key={item} className={styles.item}>
            <span className={styles.dot} aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
