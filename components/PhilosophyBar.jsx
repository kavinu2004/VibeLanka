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
      <div className={`${styles.ticker} vl-ticker`}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
