"use client";

import {
  useContext,
  useEffect,
  useRef,
} from "react";

import { UIContext } from "../context/UIContext";

export default function FloatingSettings() {
  const ctx = useContext(UIContext);

  const settingsRef = useRef(null);

  if (!ctx) return null;

  const {
    open,
    setOpen,
    t,
    dark,
    setDark,
    lang,
    setLang,
    fontSize,
    setFontSize,
  } = ctx;

  // CLOSE WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [open, setOpen]);

  return (
    <div
      ref={settingsRef}
      style={{
        position: "fixed",
        right: 30,
        bottom: 30,
        zIndex: 9999,
      }}
    >
      {open && (
        <div
          style={{
            width: 230,
            padding: 20,
            borderRadius: 20,
            marginBottom: 15,
            background: "rgba(15,15,20,0.95)",
            backdropFilter: "blur(20px)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{t.settings.theme}</span>

            <button
              onClick={() => setDark(!dark)}
              style={{
                border: "none",
                padding: "7px 12px",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              {dark
                ? t.settings.dark
                : t.settings.light}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{t.settings.language}</span>

            <select
              value={lang}
              onChange={(e) =>
                setLang(e.target.value)
              }
            >
              <option value="en">
                English
              </option>

              <option value="bn">
                বাংলা
              </option>
            </select>
          </div>

          <div>
            <span>
              {t.settings.fontSize}
            </span>

            <input
              type="range"
              min="14"
              max="24"
              value={fontSize}
              onChange={(e) =>
                setFontSize(
                  Number(e.target.value)
                )
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 65,
          height: 65,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: 26,
          color: "white",
          background:
            "linear-gradient(135deg,#ff2d55,#ff7a59)",
          boxShadow:
            "0 10px 30px rgba(255,45,85,0.4)",
        }}
      >
        ⚙
      </button>
    </div>
  );
}