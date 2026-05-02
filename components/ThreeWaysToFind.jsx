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
      <SectionMeta number="03" label="Three ways to find" />
      <div className={styles.grid}>
        <FindBlock
          tag="MAP"
          tagColor={tokens.ink}
          title="Map"
          subtitle="The must-visits, by area."
          description="Open the app, tap your area chip — South Coast, Ella, Colombo, Kandy, Arugam Bay. The map redraws around you. Pins are editorial picks. Time-of-day filter shows what's open right now."
          metric="Editorial · 5 areas"
        />
        <FindBlock
          tag="TRENDING"
          tagColor={tokens.ember}
          title="Trending"
          subtitle="Where everyone is, right now."
          description="Live crowd density. Phones at the location, fed every two minutes. Heat bars show relative count. Not paid. Not influenced by reviews. Just: where is the room actually full tonight."
          metric="Live · updates every 2 min"
        />
        <FindBlock
          tag="FEATURED"
          tagColor={tokens.mutedDeep}
          title="Featured"
          subtitle="One slot per category, per area."
          description="Paid placement, clearly marked SPONSORED. We vet every venue before they take a slot — bad food doesn't get on this page. One per category per area, so the page never bloats."
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
        <ul className={styles.list}>
          {TRENDING_TONIGHT.map((t, i) => (
            <TrendingPreviewRow key={t.name} item={t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
