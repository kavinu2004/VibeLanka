"use client";

import { motion } from "framer-motion";
import { SOUTH_COAST_STRIP } from "@/lib/data/coast";
import { tokens, easingArr } from "@/lib/tokens";
import styles from "./CoastStrip.module.css";

export default function CoastStrip() {
  return (
    <div className={styles.wrap} id="strip">
      <div className={styles.labels}>
        <span>WEST</span>
        <span className={styles.labelCenter}>
          SOUTH COAST · MIRISSA → HIRIKETIYA
        </span>
        <span>EAST</span>
      </div>

      <div className={styles.container}>
        <svg
          viewBox="0 0 100 14"
          preserveAspectRatio="none"
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 0,7 C 6,5 12,8 18,6 C 26,4 32,8 40,6 C 48,4 56,8 62,6 C 70,4 78,7 86,5 C 92,4 96,7 100,6"
            stroke={tokens.ember}
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
          />
          {SOUTH_COAST_STRIP.map((town) => (
            <g key={town.name} transform={`translate(${town.x}, 6)`}>
              <circle cx="0" cy="0" r="1.2" fill={tokens.ember} opacity="0.18" />
              <circle cx="0" cy="0" r="0.5" fill={tokens.ember} />
            </g>
          ))}
        </svg>

        <div className={styles.towns}>
          {SOUTH_COAST_STRIP.map((town, i) => (
            <motion.div
              key={town.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: easingArr }}
              className={styles.town}
              style={{ left: `${town.x}%` }}
            >
              <span className={styles.townName}>{town.name}</span>
              <span className={styles.townCount}>
                {town.peopleNow.toLocaleString()}
              </span>
              <span className={styles.townLabel}>{town.peakTime}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
