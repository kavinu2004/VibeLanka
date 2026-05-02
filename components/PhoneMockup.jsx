import { Fragment } from "react";
import { tokens } from "@/lib/tokens";
import styles from "./PhoneMockup.module.css";

const MAP_LIST = [
  { name: "Smoke & Bitters", meta: "Hiriketiya · Bar", count: 142 },
  { name: "Weligama Bay", meta: "Weligama · Beach", count: 187 },
  { name: "Ceylon Sliders", meta: "Ahangama · Café", count: 89 },
];

const PLAN_STOPS = [
  { num: "01", time: "08:00", name: "Shady Lane", sub: "Mirissa · Café", stay: "1h" },
  { num: "02", time: "09:30", name: "Weligama Bay", sub: "Weligama · Surf", stay: "2h" },
  { num: "03", time: "12:30", name: "Ceylon Sliders", sub: "Ahangama · Café", stay: "1h" },
];

function PhoneMapPreview() {
  return (
    <div className={styles.inner}>
      <div className={styles.header}>
        <div className={styles.kicker}>
          <span>NEAR YOU · LIVE</span>
        </div>
        <div className={styles.areaChips}>
          <span className={`${styles.areaChip} ${styles.areaChipActive}`}>
            South Coast
          </span>
          <span className={styles.areaChip}>Ella</span>
          <span className={styles.areaChip}>Colombo</span>
        </div>
      </div>
      <div className={styles.areaTitle}>
        <span className={styles.areaRegion}>MIRISSA → HIRIKETIYA</span>
        <h3 className={styles.areaName}>South Coast</h3>
      </div>
      <div className={styles.map}>
        <svg viewBox="0 0 100 30" className={styles.mapSvg} aria-hidden="true">
          <rect x="0" y="0" width="100" height="30" fill={tokens.muted} opacity="0.1" />
          <path
            d="M 0,18 C 6,16 12,19 18,17 C 26,15 32,19 40,17 C 48,15 56,19 62,17 C 70,15 78,18 86,16 C 92,15 96,18 100,17"
            stroke={tokens.ember}
            strokeWidth="0.6"
            fill="none"
          />
          {[6, 18, 30, 44, 60, 74, 90].map((x, i) => (
            <g key={i} transform={`translate(${x}, 17)`}>
              <circle cx="0" cy="0" r="1.4" fill={tokens.ember} opacity="0.2" />
              <circle cx="0" cy="0" r="0.6" fill={tokens.ember} />
            </g>
          ))}
          <text x="6" y="6" fontSize="2.5" textAnchor="middle" fill={tokens.ink} fontFamily="serif" fontStyle="italic">Mirissa</text>
          <text x="44" y="6" fontSize="2.5" textAnchor="middle" fill={tokens.ink} fontFamily="serif" fontStyle="italic">Ahangama</text>
          <text x="90" y="6" fontSize="2.5" textAnchor="middle" fill={tokens.ink} fontFamily="serif" fontStyle="italic">Hiriketiya</text>
        </svg>
      </div>
      <div className={styles.list}>
        {MAP_LIST.map((item) => (
          <div key={item.name} className={styles.listItem}>
            <div className={styles.listImg} />
            <div className={styles.listText}>
              <span className={styles.listMeta}>{item.meta.toUpperCase()}</span>
              <span className={styles.listName}>{item.name}</span>
            </div>
            <span className={styles.listCount}>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhonePlanPreview() {
  return (
    <div className={styles.inner}>
      <div className={styles.header}>
        <div className={styles.kicker}>
          <span>YOUR PLAN · DAY 01</span>
        </div>
        <h3 className={styles.areaName} style={{ marginTop: 8 }}>The plan.</h3>
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>STARTS</span>
          <span className={styles.summaryValue}>08:00</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>ENDS</span>
          <span className={styles.summaryValue}>13:30</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>STOPS</span>
          <span className={styles.summaryValue}>3</span>
        </div>
      </div>
      <div className={styles.stops}>
        {PLAN_STOPS.map((stop, i) => (
          <Fragment key={stop.num}>
            {i > 0 && (
              <div className={styles.travel}>
                <span className={styles.travelDot} />
                <span className={styles.travelDot} />
                <span className={styles.travelLabel}>Tuk-tuk · 12m</span>
              </div>
            )}
            <div className={styles.stop}>
              <div className={styles.stopNum}>{stop.num}</div>
              <div className={styles.stopText}>
                <span className={styles.stopName}>{stop.name}</span>
                <span className={styles.stopSub}>{stop.sub}</span>
              </div>
              <div className={styles.stopTimeCol}>
                <span className={styles.stopTime}>{stop.time}</span>
                <span className={styles.stopStay}>{stop.stay}</span>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default function PhoneMockup({ variant }) {
  return (
    <div className={styles.phone}>
      <div className={styles.notch} />
      <div className={styles.screen}>
        {variant === "map" ? <PhoneMapPreview /> : <PhonePlanPreview />}
      </div>
    </div>
  );
}
