"use client";

import { useState } from "react";
import styles from "./CTA.module.css";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <section className={styles.section} id="cta">
      <h2 className={styles.title}>
        Get on<br />
        <em className={styles.italic}>the bay.</em>
      </h2>
      <p className={styles.copy}>
        Free. iOS and Android. Built in Colombo, fed by the south coast,
        going wider every month.
      </p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="hello@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting" || status === "success"}
          aria-label="Email address"
          className={styles.input}
        />
        <button
          type="submit"
          disabled={status === "submitting" || status === "success" || !email}
          className={styles.submit}
        >
          {status === "submitting" ? "Sending…" : "Notify me"}
        </button>
      </form>

      <p
        role="status"
        aria-live="polite"
        className={`${styles.message} ${status === "error" ? styles.messageError : ""}`}
      >
        {message}
      </p>

      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span>OR</span>
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.buttons}>
        <a href="#" className={styles.button}>
          <span className={styles.buttonKicker}>DOWNLOAD ON</span>
          <span className={styles.buttonName}>App Store</span>
        </a>
        <a href="#" className={styles.button}>
          <span className={styles.buttonKicker}>GET IT ON</span>
          <span className={styles.buttonName}>Google Play</span>
        </a>
      </div>

      <p className={styles.tinyPrint}>
        Currently rolling out across the south coast. Ella, Colombo, Kandy,
        Arugam Bay live. North coast in beta. Reach the team at{" "}
        <a href="mailto:team@vibelanka.com" className={styles.inlineLink}>
          team@vibelanka.com
        </a>
        .
      </p>
    </section>
  );
}
