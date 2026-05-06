import SectionMeta from "./SectionMeta";
import FindBlock from "./FindBlock";
import TrendingPreviewRow from "./TrendingPreviewRow";
import LiveClock from "./LiveClock";
import { TRENDING_TONIGHT } from "@/lib/data/trending";
import { tokens } from "@/lib/tokens";
import styles from "./ThreeWaysToFind.module.css";

export default function ThreeWaysToFind() {
  return (
    <section className={styles.section} id="trending">
      <SectionMeta number="02" label="Three ways to find" />
      <div className={styles.grid}>
        <FindBlock
          tag="MAP"
          tagColor={tokens.ink}
          title="Map"
          subtitle="The must-visits, by area."
          description="Editorial picks, geo-anchored. Tap a coast, see what's there."
          metric="Editorial · 5 areas"
        />
        <FindBlock
          tag="TRENDING"
          tagColor={tokens.ember}
          title="Trending"
          subtitle="Where everyone is, right now."
          description="Live signal from venues, partners, and the calendar. What's drawing attention now."
          metric="Live · updates every 2 min"
        />
        <FindBlock
          tag="FEATURED"
          tagColor={tokens.mutedDeep}
          title="Featured"
          subtitle="One slot per category, per area."
          description="Partner-supported placement. Curated, not auctioned."
          metric="Curated · paid placement"
        />
      </div>

      <div className={styles.preview}>
        <div className={styles.previewHead}>
          <span className={styles.previewKicker}>
            <span className={`${styles.previewDot} vl-pulse-dot`} />
            TRENDING NOW · LIVE
          </span>
          <span className={styles.previewMeta}>
            Updated 2m ago · <LiveClock />
          </span>
        </div>
        <p className={styles.previewNote}>TRENDING IS NOT PAID</p>
        <ul className={styles.list}>
          {TRENDING_TONIGHT.map((t, i) => (
            <TrendingPreviewRow key={t.name} item={t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
