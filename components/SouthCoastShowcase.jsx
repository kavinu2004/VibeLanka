import SectionMeta from "./SectionMeta";
import Stat from "./Stat";
import PhoneMockup from "./PhoneMockup";
import PlaceCard from "./PlaceCard";
import { PLACE_CARDS } from "@/lib/data/places";
import styles from "./SouthCoastShowcase.module.css";

export default function SouthCoastShowcase() {
  return (
    <section className={styles.section}>
      <SectionMeta number="01" label="The strip" mode="dark-bg" />
      <div className={styles.grid}>
        <div>
          <h2 className={styles.title}>
            Mirissa<br />to<br />
            <em className={styles.italic}>Hiriketiya</em>
          </h2>
          <p className={styles.copy}>
            Seven towns across forty kilometres of coast. The same app
            shows you the surf at Weligama at seven a.m. and the bar at
            Hiriketiya at ten p.m. Tap a town. The map redraws.
          </p>
          <div className={styles.stats}>
            <Stat value="7" label="towns" />
            <Stat value="42 km" label="of coast" />
            <Stat value="1,124" label="now in Hiri" sub="updated 2m ago" />
          </div>
        </div>

        <div className={styles.phoneCol}>
          <PhoneMockup variant="map" />
        </div>
      </div>

      <div className={styles.cards}>
        {PLACE_CARDS.map((p, i) => (
          <PlaceCard key={p.name} place={p} index={i} />
        ))}
      </div>
    </section>
  );
}
