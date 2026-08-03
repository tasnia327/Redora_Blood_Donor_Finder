"use client";

import { useContext, useEffect, useRef } from "react";
import { UIContext } from "@/context/UIContext";

export default function FloatingSettings() {
  const { dark, setDark, lang, setLang, fontSize, setFontSize, open, setOpen, t } =
    useContext(UIContext);

  const panelRef = useRef(null);
  const btnRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  const s = t?.settings ?? {
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    language: "Language",
    fontSize: "Font Size",
  };

  const panelBg = dark ? "rgba(15,15,30,0.95)" : "rgba(255,255,255,0.97)";
  const panelBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const textColor = dark ? "#fff" : "#111";
  const mutedColor = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";

  const chipBase = {
    flex: 1,
    padding: "8px 0",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.18s",
  };

  const activeChip = {
    ...chipBase,
    background: "linear-gradient(135deg, #ff2d55, #ff7a59)",
    color: "#fff",
  };

  const inactiveChip = {
    ...chipBase,
    background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
    color: mutedColor,
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        ref={btnRef}
        onClick={() => setOpen((prev) => !prev)}
        title="Settings"
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 9999,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #ff2d55, #ff7a59)",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 24px rgba(255,45,85,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = open ? "rotate(45deg) scale(1.08)" : "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,45,85,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = open ? "rotate(45deg)" : "rotate(0deg)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,45,85,0.4)";
        }}
      >
        ⚙️
      </button>

      {/* SETTINGS PANEL */}
      {open && (
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            bottom: 96,
            right: 32,
            zIndex: 9998,
            width: 240,
            background: panelBg,
            border: `1px solid ${panelBorder}`,
            borderRadius: 18,
            padding: "20px",
            backdropFilter: "blur(24px)",
            boxShadow: dark
              ? "0 16px 48px rgba(0,0,0,0.6)"
              : "0 8px 32px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            animation: "fadeSlideUp 0.2s ease",
          }}
        >
          {/* THEME */}
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: mutedColor, letterSpacing: "1px", textTransform: "uppercase" }}>
              {s.theme}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setDark(true)}
                style={dark ? activeChip : inactiveChip}
              >
                🌙 {s.dark}
              </button>
              <button
                onClick={() => setDark(false)}
                style={!dark ? activeChip : inactiveChip}
              >
                ☀️ {s.light}
              </button>
            </div>
          </div>

          {/* LANGUAGE */}
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: mutedColor, letterSpacing: "1px", textTransform: "uppercase" }}>
              {s.language}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setLang("en")}
                style={lang === "en" ? activeChip : inactiveChip}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLang("bn")}
                style={lang === "bn" ? activeChip : inactiveChip}
              >
                🇧🇩 বাং
              </button>
            </div>
          </div>

          {/* FONT SIZE */}
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: mutedColor, letterSpacing: "1px", textTransform: "uppercase" }}>
              {s.fontSize}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={() => setFontSize((f) => Math.max(12, f - 2))}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "none",
                  background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                  color: textColor,
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                −
              </button>
              <span style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 700, color: textColor }}>
                {fontSize}px
              </span>
              <button
                onClick={() => setFontSize((f) => Math.min(24, f + 2))}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "none",
                  background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                  color: textColor,
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}