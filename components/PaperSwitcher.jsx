"use client";

import { useEffect, useState } from "react";
import styles from "./PaperSwitcher.module.css";

const VARIANTS = [
  { id: "cool", label: "Cool",  swatch: "#F5F4F0" },
  { id: "warm", label: "Warm",  swatch: "#FBF6EB" },
  { id: "near", label: "Near",  swatch: "#FCFBF8" },
];

const STORAGE_KEY = "vl-paper-variant";

export default function PaperSwitcher() {
  const [variant, setVariant] = useState("cool");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VARIANTS.some((v) => v.id === stored)) {
      setVariant(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.paper = variant;
    localStorage.setItem(STORAGE_KEY, variant);
  }, [variant]);

  return (
    <div className={styles.switcher} role="region" aria-label="Paper variant switcher">
      <span className={styles.label}>Paper</span>
      <div className={styles.row}>
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setVariant(v.id)}
            className={`${styles.button} ${variant === v.id ? styles.buttonActive : ""}`}
            aria-pressed={variant === v.id}
          >
            <span className={styles.swatch} style={{ background: v.swatch }} />
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
