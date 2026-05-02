"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { easingArr } from "@/lib/tokens";
import styles from "./PlaceCard.module.css";

export default function PlaceCard({ place, index }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easingArr }}
      className={styles.card}
      style={{ transform: hover ? "translateY(-6px)" : "translateY(0)" }}
    >
      <div className={styles.imgWrap}>
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className={styles.img}
        />
        <div className={styles.imgOverlay} />
        <div className={styles.pctBadge}>
          <span className={styles.pctNum}>{place.pct}</span>
          <span className={styles.pctSign}>%</span>
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.sub}>{place.sub.toUpperCase()}</span>
        <h3 className={styles.name}>{place.name}</h3>
        <div className={styles.tags}>
          {place.tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
          <span className={styles.tagDot} />
          <span className={styles.vibe}>vibrant tonight</span>
        </div>
      </div>
    </motion.div>
  );
}
