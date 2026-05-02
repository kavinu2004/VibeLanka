"use client";

import { motion } from "framer-motion";
import { easingArr } from "@/lib/tokens";
import styles from "./FindBlock.module.css";

export default function FindBlock({
  tag,
  tagColor,
  title,
  subtitle,
  description,
  metric,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: easingArr }}
      className={styles.block}
    >
      <div className={styles.head}>
        <span className={styles.tag} style={{ background: tagColor }}>
          {tag}
        </span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.rule} />
      <p className={styles.description}>{description}</p>
      <span className={styles.metric}>{metric}</span>
    </motion.div>
  );
}
