"use client";

import { useContext } from "react";
import { UIContext } from "../context/UIContext";
import AuthSlider from "../components/AuthSlider";

export default function LoginPage() {
  const { dark } = useContext(UIContext) || {};

  return (
    <div
      style={{
        background: dark
          ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
          : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
        minHeight: "calc(100vh - 140px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px clamp(20px, 5vw, 60px)",
      }}
    >
      {/* GLOW CIRCLES */}
      <div
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #ff2d55 0%, rgba(11,11,43,0) 100%)",
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #ff2d55 0%, rgba(11,11,43,0) 100%)",
          position: "absolute",
          bottom: 40,
          right: 20,
          filter: "blur(15px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* SLIDER CARD CONTAINER */}
      <div style={{ zIndex: 2, display: "flex", justifyContent: "center", width: "100%", maxWidth: "1000px" }}>
        <AuthSlider initialMode="login" />
      </div>
    </div>
  );
}