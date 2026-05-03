"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Nav.module.css";

const COASTS = [
  { name: "South Coast", meta: "Nov — Apr" },
  { name: "East Coast", meta: "May — Sep" },
  { name: "West Coast", meta: "Year-round" },
  { name: "North Coast", meta: "Mar — Oct" },
];

export default function Nav() {
  const [coastsOpen, setCoastsOpen] = useState(false);
  const triggerRef = useRef(null);

  function onCoastsKeyDown(e) {
    if (e.key === "Escape" && coastsOpen) {
      setCoastsOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.logo} aria-label="Vibe Lanka">
          <em className={styles.logoLatin}>Vibe</em>
          <span className={styles.logoSinhala} lang="si">ලංකා</span>
        </span>
        <ul className={styles.links}>
          <li
            className={styles.linkWrap}
            onMouseEnter={() => setCoastsOpen(true)}
            onMouseLeave={() => setCoastsOpen(false)}
            onFocus={() => setCoastsOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setCoastsOpen(false);
              }
            }}
            onKeyDown={onCoastsKeyDown}
          >
            <a
              ref={triggerRef}
              href="#strip"
              className={styles.link}
              aria-haspopup="true"
              aria-expanded={coastsOpen}
            >
              The Coasts
              <span className={styles.caret} aria-hidden="true">↓</span>
            </a>
            <AnimatePresence>
              {coastsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                  className={styles.dropdown}
                  role="menu"
                >
                  <span className={styles.dropdownKicker}>BY MONSOON SEASON</span>
                  {COASTS.map((c) => (
                    <a
                      key={c.name}
                      href="#strip"
                      className={styles.dropdownItem}
                      role="menuitem"
                    >
                      <span className={styles.dropdownName}>{c.name}</span>
                      <span className={styles.dropdownMeta}>{c.meta}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li className={styles.linkWrap}>
            <a href="#trending" className={styles.link}>Trending</a>
          </li>
          <li className={styles.linkWrap}>
            <a href="#partner" className={styles.link}>Venues</a>
          </li>
        </ul>
        <a href="#cta" className={styles.cta}>
          <span>Get the app</span>
          <span className={styles.ctaArrow} aria-hidden="true">↗</span>
        </a>
      </div>
    </nav>
  );
}
