"use client";

import { useContext } from "react";
import { UIContext } from "../context/UIContext";

export default function Footer() {
  const ctx = useContext(UIContext);
  const dark = ctx?.dark ?? true;

  // CLEAN AND CORRECT STRUCTURE
  const t = {
    footer: {
      brand: "Your modern blood donation platform.",

      platformTitle: "Platform",
      supportTitle: "Support",
      legalTitle: "Legal",

      platformLinks: ["How it works", "Find donors", "Become donor"],
      supportLinks: ["Help Center", "Contact", "FAQ"],
      legalLinks: ["Privacy Policy", "Terms", "Cookies"],

      tagline: "Saving lives one click at a time",
    },
  };

  const footerColumn = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 140,
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
    display: "block",
    marginBottom: "8px",
  };

  return (
    <footer
      style={{
        marginTop: 0,
        width: "100%",
        background: dark
          ? "rgba(5, 6, 10, 0.9)"
          : "rgba(255,255,255,0.9)",
        borderTop: dark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.08)",
        padding: "70px 60px 30px",
        position: "relative",
        zIndex: 2,
        color: dark ? "white" : "black",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* TOP SECTION */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 50,
            flexWrap: "wrap",
            paddingBottom: 40,
          }}
        >
          
          {/* BRAND */}
          <div style={{ maxWidth: 320 }}>
            <h2
              style={{
                color: "#ff2d55",
                fontSize: 28,
                fontWeight: 900,
                marginBottom: 10,
              }}
            >
              REDORA
            </h2>

            <p style={{ opacity: 0.75, lineHeight: 1.6 }}>
              {t.footer.brand}
            </p>
          </div>

          {/* LINKS */}
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            
            <div style={footerColumn}>
              <h4 style={footerTitle}>{t.footer.platformTitle}</h4>
              {t.footer.platformLinks.map((l) => (
                <a key={l} style={footerLink}>
                  {l}
                </a>
              ))}
            </div>

            <div style={footerColumn}>
              <h4 style={footerTitle}>{t.footer.supportTitle}</h4>
              {t.footer.supportLinks.map((l) => (
                <a key={l} style={footerLink}>
                  {l}
                </a>
              ))}
            </div>

            <div style={footerColumn}>
              <h4 style={footerTitle}>{t.footer.legalTitle}</h4>
              {t.footer.legalLinks.map((l) => (
                <a key={l} style={footerLink}>
                  {l}
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            marginTop: 25,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            fontSize: 14,
            opacity: 0.7,
          }}
        >
          <span>
            © {new Date().getFullYear()} REDORA. All rights reserved.
          </span>

          <span>{t.footer.tagline}</span>
        </div>

      </div>
    </footer>
  );
}