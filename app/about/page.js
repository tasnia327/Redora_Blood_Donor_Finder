"use client";

import { motion } from "framer-motion";
import { useContext } from "react";
import { UIContext } from "@/context/UIContext";

export default function AboutPage() {
  const { dark, fontSize } = useContext(UIContext);

  const theme = {
    bg: dark
      ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
      : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
    text: dark ? "#ffffff" : "#111827",
    muted: dark ? "rgba(255,255,255,0.7)" : "rgba(17,24,39,0.75)",
    accent: "#ff2d55",
  };

  return (
    <main style={{ ...styles.page, background: theme.bg, color: theme.text }}>

      {/* HERO */}
      <section style={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...styles.title, fontSize: fontSize + 22 }}
        >
          A faster way to find blood when it matters most
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ ...styles.subtitle, color: theme.muted, fontSize: fontSize + 2 }}
        >
          We connect donors and patients in real time — reducing delays and making emergency response simpler.
        </motion.p>
      </section>

      {/* IMAGE */}
      <section style={styles.imageWrap}>
        <img src="/images/about.png" alt="about" style={styles.image} />
      </section>

      {/* KEY POINTS */}
      <section style={styles.grid}>
        {[
          ["Real-time", "Instant donor matching without manual delays"],
          ["Direct connection", "No middle steps between donor and patient"],
          ["Reliable network", "Built for emergency situations"],
        ].map(([title, text], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={styles.card}
          >
            <h3 style={{ color: theme.accent, marginBottom: 8 }}>{title}</h3>
            <p style={{ opacity: 0.75, fontSize: 15, lineHeight: 1.6 }}>{text}</p>
          </motion.div>
        ))}
      </section>

      {/* FOOTER LINE */}
      <section style={styles.footer}>
        <p style={{ color: theme.muted }}>
          Built for speed. Designed for lives.
        </p>
      </section>
    </main>
  );
}

/* styles */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "120px 20px",
    fontFamily: "Inter, sans-serif",
  },

  hero: {
    maxWidth: 800,
    margin: "0 auto",
    textAlign: "center",
  },

  title: {
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.2,
  },

  subtitle: {
    marginTop: 16,
    lineHeight: 1.7,
  },

  imageWrap: {
    maxWidth: 900,
    margin: "80px auto",
    borderRadius: 18,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    display: "block",
    borderRadius: 18,

     filter: "blur(0.6px) contrast(1.05) saturate(1.05)",
  },

  grid: {
    maxWidth: 900,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },

  card: {
    padding: "22px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  footer: {
    textAlign: "center",
    marginTop: 80,
  },
};