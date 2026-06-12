"use client";

import { useContext } from "react";
import { UIContext } from "../context/UIContext";
import { FaFacebook, FaInstagram, FaHeart } from "react-icons/fa";

export default function Footer() {
  const ctx = useContext(UIContext);
  const dark = ctx?.dark ?? true;
  const t = ctx?.t?.footer;

  const footerColumn = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 110,
  };

  const footerTitle = {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 6,
  };

  const footerLink = {
    fontSize: 14,
    opacity: 0.75,
    cursor: "pointer",
    textDecoration: "none",
    marginBottom: "8px",
  };

  return (
    <footer
      style={{
        width: "100%",
        background: dark ? "#0b0f1a" : "#f5f7fa",
        borderTop: dark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.08)",
        padding: "40px 30px 20px",
        color: dark ? "#fff" : "#111",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        
        {/* TOP SECTION (3 COLUMNS FIXED) */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "nowrap",
    overflowX: "auto",
    alignItems: "flex-start",
  }}
>

  {/* LEFT - BRAND */}
  <div style={{ flex: 1, minWidth: 220 }}>
    <h2 style={{ color: "#ff2d55", fontSize: 26, fontWeight: 900 }}>
      REDORA
    </h2>

    <p style={{ opacity: 0.75, lineHeight: 1.5, fontSize: 14 }}>
      {t.brand}
    </p>

    <p style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
      <FaHeart style={{ color: "#ff2d55", display: "inline" }} /> Saving lives one click at a time
    </p>
  </div>

  {/* MIDDLE - LINKS */}
  <div style={{ flex: 2, display: "flex", gap: 30, flexWrap: "nowrap" }}>

    <div style={footerColumn}>
      <h4 style={footerTitle}>{t.platform}</h4>
      {t.platformLinks.map((l) => (
        <a key={l} style={footerLink}>{l}</a>
      ))}
    </div>

    <div style={footerColumn}>
      <h4 style={footerTitle}>{t.support}</h4>
      {t.supportLinks.map((l) => (
        <a key={l} style={footerLink}>{l}</a>
      ))}
    </div>

    <div style={footerColumn}>
      <h4 style={footerTitle}>{t.legal}</h4>
      {t.legalLinks.map((l) => (
        <a key={l} style={footerLink}>{l}</a>
      ))}
    </div>

  </div>

  {/* RIGHT - SUBSCRIBE */}
  <div style={{ flex: 1, minWidth: 220 }}>

    <h4 style={footerTitle}>Subscribe</h4>

    <input
      type="email"
      placeholder="Enter email"
      style={{
        width: "100%",
        padding: "9px",
        borderRadius: 8,
        border: "1px solid #ccc",
        marginBottom: 8,
        fontSize: 13,
      }}
    />

    <button
      style={{
        width: "100%",
        padding: "9px",
        background: "#ff2d55",
        color: "white",
        border: "none",
        borderRadius: 8,
        fontSize: 13,
        cursor: "pointer",
      }}
    >
      Subscribe
    </button>

    <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
      <FaFacebook />
      <FaInstagram />
    </div>

  </div>

</div>

      </div>
    </footer>
  );
}