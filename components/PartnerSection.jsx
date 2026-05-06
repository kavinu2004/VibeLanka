import SectionMeta from "./SectionMeta";
import styles from "./PartnerSection.module.css";

const ITEMS = [
  { num: "01", label: "Top of Featured in your area" },
  { num: "02", label: "A SPONSORED tag — clearly disclosed" },
  { num: "03", label: "One slot per category per area per month" },
  { num: "04", label: "Live count, vibe vote, everything in the app" },
];

export default function PartnerSection() {
  return (
    <section className={styles.section} id="partner">
      <SectionMeta number="04" label="For venues" mode="inverted" />
      <div className={styles.grid}>
        <div>
          <h2 className={styles.title}>
            Run a place<br />people{" "}
            <em className={styles.titleEmber}>should</em> know about?
          </h2>
          <p className={styles.copy}>
            Featured slots are paid. Clearly disclosed. Vetted before the
            venue makes the page. One slot per category per area per month —
            so the page never bloats and partners never compete inside it.
          </p>
          <p className={styles.principles}>
            FEATURED IS PAID, MARKED · NO PLACEHOLDER LISTINGS
          </p>
        </div>
        <div className={styles.card}>
          <span className={styles.kicker}>BECOME A PARTNER</span>
          <ul className={styles.list}>
            {ITEMS.map((it) => (
              <li key={it.num} className={styles.item}>
                <span className={styles.num}>{it.num}</span>
                <span className={styles.label}>{it.label}</span>
              </li>
            ))}
          </ul>
          <a href="mailto:partners@vibelanka.com" className={styles.email}>
            partners@vibelanka.com ↗
          </a>
        </div>
      </div>
    </section>
  );
}
