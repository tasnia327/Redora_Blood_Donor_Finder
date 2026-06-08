"use client";

import Link from "next/link";
import { useContext } from "react";
import { UIContext } from "../context/UIContext";

export default function RegisterPage() {
  const { dark, fontSize, lang } = useContext(UIContext);

  const inputStyle = {
    width: "100%",
    height: "52px",
    marginBottom: "24px",
    borderRadius: "12px",
    border: "none",
    paddingLeft: "16px",
    background: dark ? "#34344A" : "#ffffff",
    color: dark ? "white" : "#111",
    fontSize: fontSize + 4,
  };

  const buttonStyle = {
    width: "100%",
    height: "52px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg,#8E2239,#ff1a5f)",
    color: "white",
    fontSize: fontSize + 4,
    fontWeight: "700",
    cursor: "pointer",
  };

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
        gap: "80px",
        padding: "60px clamp(20px, 5vw, 60px)",
        flexWrap: "wrap",
      }}
    >
      {/* GLOW CIRCLES */}
      <div
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #ff1a5f 0%, rgba(11,11,43,0) 100%)",
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #ff1a5f 0%, rgba(11,11,43,0) 100%)",
          position: "absolute",
          bottom: 80,
          left: 20,
          filter: "blur(15px)",
          pointerEvents: "none",
        }}
      />

      {/* REGISTER CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          flex: "1 1 320px",
          padding: "50px clamp(24px, 5%, 50px)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(30px)",
          background: "rgba(20,20,50,0.25)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            color: "#ff2d55",
            fontSize: fontSize + 4,
            textAlign: "center",
          }}
        >
          {lang === "bn" ? "রেজিস্টার" : "Register"}
        </h2>

        <p
          style={{
            color: dark ? "white" : "#111",
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: "40px",
            fontSize: fontSize + 4,
          }}
        >
          {lang === "bn"
            ? "শুরু করতে কিছু তথ্য দিন!"
            : "Just some details to get you in!"}
        </p>

        <input
          placeholder={lang === "bn" ? "নাম" : "Username"}
          style={inputStyle}
        />

        <input
          placeholder={
            lang === "bn" ? "ইমেইল / ফোন" : "Email/Phone Number"
          }
          style={inputStyle}
        />

        <input
          placeholder={lang === "bn" ? "পাসওয়ার্ড" : "Password"}
          style={inputStyle}
        />

        <input
          placeholder={
            lang === "bn" ? "কনফার্ম পাসওয়ার্ড" : "Confirm Password"
          }
          style={inputStyle}
        />

        <button style={buttonStyle}>
          {lang === "bn" ? "রেজিস্টার" : "Register"}
        </button>

        <p
          style={{
            color: dark ? "white" : "#111",
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          {lang === "bn"
            ? "ইতিমধ্যে একাউন্ট আছে?"
            : "Already have an Account?"}{" "}
          <Link
            href="/login"
            style={{
              color: "#ff2d55",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            {lang === "bn" ? "লগইন" : "Login"}
          </Link>
        </p>
      </div>

      {/* RIGHT TEXT */}
      <div
        style={{
          zIndex: 2,
          flex: "1 1 260px",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div>

          <h1
            style={{
              color: dark ? "white" : "#111",
              fontSize: "clamp(34px, 5vw, 62px)",
              fontWeight: "800",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {lang === "bn" ? "আজই যোগ দিন!" : "Join us\ntoday!"}
          </h1>
        </div>

        <div
          style={{
            borderLeft: "4px solid #ff2d55",
            paddingLeft: "16px",
          }}
        >
          <p
            style={{
              color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              fontSize: "17px",
              fontStyle: "italic",
              margin: 0,
              fontWeight: "500",
              lineHeight: 1.5,
            }}
          >
            {lang === "bn" ? "শুরু করতে প্রস্তুত?" : "Ready to get started?\nBe a life-saver today."}
          </p>
        </div>
      </div>
    </div>
  );
}