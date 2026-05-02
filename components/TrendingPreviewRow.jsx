"use client";

import { motion } from "framer-motion";
import { tokens, easingArr } from "@/lib/tokens";
import styles from "./TrendingPreviewRow.module.css";

export default function TrendingPreviewRow({ item, index }) {
  const heatColor =
    item.pct > 80 ? tokens.ember :
    item.pct > 40 ? tokens.emberWarm :
    tokens.muted;
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={styles.row}
    >
      <div className={styles.text}>
        <span className={styles.name}>{item.name}</span>
        <span className={styles.area}>{item.area}</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.bar}
          style={{ background: heatColor }}
          initial={{ width: 0 }}
          whileInView={{ width: `${item.pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.08, ease: easingArr }}
        />
      </div>
      <span className={styles.count}>{item.count}</span>
    </motion.li>
  );
}
