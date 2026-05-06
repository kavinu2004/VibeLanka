import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.kicker}>—— OUR THESIS · LOCALS WROTE THIS</span>
        <p className={styles.body}>
          Tourist guides go stale in eight months. Google reviews bury the
          kottu shop your driver swears by.{" "}
          <em className={styles.italic}>Vibe Lanka is the opposite</em>
          {" "}— built by people who actually live here, updated as the
          country moves.
        </p>
        <p className={styles.body}>
          Three things: where the must-visits are by area, what&apos;s drawing
          attention now, and which venues paid to be seen. We mark the
          third one clearly. It&apos;s the only way the first two stay honest.
        </p>
        <p className={styles.sig}>— V.L. · Hiriketiya, 2026</p>
      </div>
    </section>
  );
}
