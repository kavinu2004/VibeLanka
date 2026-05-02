import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.kicker}>—— OUR THESIS</span>
        <p className={styles.body}>
          The internet went stale on the south coast. Travel blogs that
          haven&apos;t been updated since 2019. Reviews about a chef who left in
          2022. A &ldquo;best of&rdquo; listicle written in a Bali co-working space by
          someone who flew over for four nights.{" "}
          <em className={styles.italic}>
            Vibe Lanka is built by the people who actually live on the bay.
          </em>{" "}
          Updated in real time by the phones at the venue. If the place is
          empty, the app says so. If it&apos;s heaving, you&apos;ll know before you
          leave the house.
        </p>
        <p className={styles.sig}>— V.L. · Hiriketiya, 2026</p>
      </div>
    </section>
  );
}
