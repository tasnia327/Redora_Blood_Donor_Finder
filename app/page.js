"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { UIContext } from "./context/UIContext";



export default function Home() {
  const {
  dark,
  setDark,
  lang,
  setLang,
  fontSize,
  setFontSize,
  open,
  setOpen,
  t,
} = useContext(UIContext);

  const theme = {
    bg: dark
      ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
      : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
    text: dark ? "#ffffff" : "#111827",
    card: dark
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.75)",
    border: dark
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.06)",
    primary: "#ff2d55",
  };

  return (
    <div style={{
  fontSize,
  background: theme.bg,
  color: theme.text,
  minHeight: "100vh",
  overflowX: "hidden",
  position: "relative",
  fontFamily: "system-ui",
  isolation: "isolate",
  zIndex: 1,
  paddingBottom: 80
}}>
      {/* ORBS WRAPPER */}
<div
  style={{
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    zIndex: 0,
    pointerEvents: "none",
  }}
>
  <div style={orbStyle("#ff2d55", "120px", "10%", "15%")} />
  <div style={orbStyle("#7c4dff", "180px", "60%", "70%")} />
  <div style={orbStyle("#00d4ff", "140px", "40%", "40%")} />
</div>

      {/* HERO */}
      <section
        style={{
          textAlign: "center",
          padding: "120px 20px 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={badgeStyle}>{t.badge}</div>

        <h1
          style={{
            fontSize: "clamp(34px, 5vw, 60px)",
            fontWeight: 900,
            lineHeight: 1.1,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            opacity: 0.8,
            maxWidth: 650,
            margin: "24px auto",
            lineHeight: 1.7,
            fontSize: 18,
          }}
        >
          {t.subtitle}
        </p>
        

        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 35,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 16,
              overflow: "hidden",
              background: dark
                ? "rgba(255,255,255,0.06)"
                : "#ffffff",
              backdropFilter: "blur(14px)",
              border: theme.border,
            }}
          >
            <input
              placeholder={t.search}
              style={{
                width: 380,
                padding: "16px 18px",
                border: "none",
                outline: "none",
                fontSize: 16,
                background: "transparent",
                color: theme.text,
              }}
            />

            <button style={searchBtn}>
              {t.searchBtn}
            </button>
          </div>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <button style={primaryBtn}>
            {t.cta1}
          </button>

          <Link
            href="/register"
            style={{ textDecoration: "none" }}
          >
            <button style={primaryBtn}>
              {t.cta2}
            </button>
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          marginTop: 140,
          padding: "0 60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 25,
          position: "relative",
          zIndex: 2,
        }}
      >
        {t.stats.map((item, i) => (
          <div
            key={i}
            style={{
              padding: 30,
              borderRadius: 24,
              background: theme.card,
              backdropFilter: "blur(16px)",
              border: theme.border,
            }}
          >
            <h2
              style={{
                fontSize: 40,
                color: theme.primary,
                marginBottom: 10,
              }}
            >
              {item[0]}
            </h2>

            <p style={{ opacity: 0.75 }}>
              {item[1]}
            </p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section
        style={{
          marginTop: 80,
          padding: "0 60px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 15,
            }}
          >
            {t.featuresTitle}
          </h2>

          <p style={{ opacity: 0.75 }}>
            {t.featuresSubtitle}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: 25,
          }}
        >
          {t.features.map((item, i) => (
            <div
              key={i}
              style={{
                padding: 30,
                borderRadius: 26,
                background: theme.card,
                backdropFilter: "blur(14px)",
                border: theme.border,
              }}
            >
              <div style={{ fontSize: 40 }}>
                {item.icon}
              </div>

              <h3
                style={{
                  marginTop: 20,
                  marginBottom: 12,
                  fontSize: 24,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  opacity: 0.75,
                  lineHeight: 1.7,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* STYLES */

const primaryBtn = {
  padding: "14px 26px",
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(135deg,#ff2d55,#ff7a59)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 16,
};

const searchBtn = {
  padding: "16px 22px",
  border: "none",
  background: "#ff2d55",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 15,
};

const badgeStyle = {
  display: "inline-block",
  padding: "10px 18px",
  borderRadius: 999,
  background: "rgba(255,45,85,0.15)",
  color: "#ff2d55",
  marginBottom: 28,
  fontWeight: 600,
};

function orbStyle(color, size, top, left) {
  return {
    position: "absolute",
    width: size,
    height: size,
    top,
    left,
    background: color,
    filter: "blur(120px)",
    opacity: 0.35,
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  };
}
