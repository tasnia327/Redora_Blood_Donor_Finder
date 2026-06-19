"use client";

import { FaSearch } from "react-icons/fa";

export default function DonorSearchBar({ theme, placeholder = "Search donors...", buttonText = "Search" }) {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 600,
        margin: "30px auto",
        borderRadius: 18,
        overflow: "hidden",
        background: theme?.card || "#fff",
        backdropFilter: "blur(14px)",
        border: theme?.border,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        position: "relative",
      }}
    >
      {/* decorative glow */}
      <div
        style={{
          position: "absolute",
          inset: -2,
          background: "linear-gradient(135deg,#ff2d55,#7c4dff,#00d4ff)",
          opacity: 0.15,
          filter: "blur(18px)",
          zIndex: 0,
        }}
      />

      {/* input */}
      <input
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: "18px 20px",
          border: "none",
          outline: "none",
          fontSize: 16,
          background: "transparent",
          color: theme?.text || "#111",
          zIndex: 1,
        }}
      />

      {/* button */}
      <button
        style={{
          padding: "18px 26px",
          border: "none",
          background: "linear-gradient(135deg,#ff2d55,#ff7a59)",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          zIndex: 1,
          transition: "0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FaSearch style={{ marginRight: 8 }} />
        {buttonText}
      </button>
    </div>
  );
}