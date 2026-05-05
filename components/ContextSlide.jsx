import Image from "next/image";
import styles from "./ContextSlide.module.css";

export default function ContextSlide() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <h2 className={styles.heading}>What you&apos;re signing up for</h2>
        <p className={styles.copy}>
          Vibe Lanka launches in waves. The site you&apos;re on now is the front
          door — built so we can share what we&apos;re working toward and gather
          the people who want in early.
        </p>
        <p className={styles.copy}>
          The app will roll out features as we grow: discovery first (venues,
          events, who&apos;s playing what tonight), then planning (build a trip
          from real-time picks), then the social layer.
        </p>
        <p className={styles.copy}>
          Joining the waitlist gets you in before public launch and
          founding-member access when the app drops. Built by people on the
          ground, not flown in.
        </p>
      </div>
      <div className={styles.illustration} aria-hidden="true">
        <Image
          src="/images/illustrations/yaka.png"
          alt="Sri Lankan Yaka mask illustration"
          fill
          sizes="(max-width: 768px) 0px, 50vw"
          className={styles.image}
          priority={false}
        />
      </div>
    </section>
  );
}
