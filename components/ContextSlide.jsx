import Image from "next/image";
import styles from "./ContextSlide.module.css";

export default function ContextSlide() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <h2 className={styles.heading}>What you&apos;re signing up for</h2>
        <p className={styles.copy}>
          Vibe Lanka shows you what&apos;s happening around Sri Lanka, from
          events and nightlife to food spots, beaches, and hidden gems.
          Plan your day or night with easy itineraries built around the
          real vibe. Soon: community voting that helps you and your group
          land on one spot, not split up.
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
