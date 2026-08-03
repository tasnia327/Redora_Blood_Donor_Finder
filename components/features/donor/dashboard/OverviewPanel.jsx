"use client";

import { motion } from "framer-motion";
import {
  FaHeart, FaTint, FaCalendarAlt, FaExclamationTriangle,
  FaToggleOn, FaHistory,
} from "react-icons/fa";

const STATS = [
  { label: "Total Donations", value: "12", icon: FaHeart, color: "#ff2d55", bg: "rgba(255,45,85,0.12)" },
  { label: "Lives Helped", value: "8", icon: FaTint, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { label: "Next Eligible", value: "28 Days", icon: FaCalendarAlt, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { label: "Emergency Requests", value: "5", icon: FaExclamationTriangle, color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
];

export default function OverviewPanel({ donor, theme, dark, onNavigate }) {
  const card = {
    background: theme.card,
    backdropFilter: "blur(16px)",
    border: theme.border,
    borderRadius: 20,
    padding: "24px 28px",
    transition: "all 0.3s ease",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          ...card,
          background: dark
            ? "linear-gradient(135deg, rgba(255,45,85,0.18), rgba(124,77,255,0.12))"
            : "linear-gradient(135deg, rgba(255,45,85,0.08), rgba(124,77,255,0.06))",
          border: theme.borderAccent,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div style={{
          position: "absolute", width: 200, height: 200, borderRadius: "50%",
          background: "#ff2d55", filter: "blur(90px)", opacity: 0.08,
          top: "-30%", right: "5%", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ff2d55", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
              Welcome back
            </div>
            <h1 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: theme.text, margin: 0, letterSpacing: "-0.02em" }}>
              Hello, {donor.name.split(" ")[0]} 👋
            </h1>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: theme.textSecondary, lineHeight: 1.6 }}>
              Your donations are saving lives. You're a real hero.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => onNavigate("availability")}
              style={{
                padding: "12px 22px", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #ff2d55, #ff7a59)",
                color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
                boxShadow: "0 6px 20px rgba(255,45,85,0.3)",
                transition: "all 0.25s ease", display: "flex", alignItems: "center", gap: 8,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(255,45,85,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,45,85,0.3)"; }}
            >
              <FaToggleOn /> Update Availability
            </button>
            <button
              onClick={() => onNavigate("history")}
              style={{
                padding: "12px 22px", borderRadius: 12,
                border: theme.borderAccent,
                background: dark ? "rgba(255,45,85,0.08)" : "rgba(255,45,85,0.06)",
                color: "#ff2d55", fontWeight: 700, fontSize: 14, cursor: "pointer",
                transition: "all 0.25s ease", display: "flex", alignItems: "center", gap: 8,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#ff2d55"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = dark ? "rgba(255,45,85,0.08)" : "rgba(255,45,85,0.06)"; e.currentTarget.style.color = "#ff2d55"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <FaHistory /> Donation History
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: 16,
      }}>
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                ...card,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.background = theme.cardHover;
                e.currentTarget.style.border = theme.borderAccent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = theme.card;
                e.currentTarget.style.border = theme.border;
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: stat.bg, display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                <Icon style={{ fontSize: 22, color: stat.color }} />
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: stat.color, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: theme.textSecondary, marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Availability Status quick view */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          ...card,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: donor.available ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: 14, height: 14, borderRadius: "50%",
              background: donor.available ? "#10b981" : "#ef4444",
              boxShadow: donor.available ? "0 0 10px rgba(16,185,129,0.6)" : "0 0 10px rgba(239,68,68,0.6)",
            }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: theme.text }}>Current Availability</div>
            <div style={{ fontSize: 13, color: donor.available ? "#10b981" : "#ef4444", fontWeight: 600 }}>
              {donor.available ? "✓ You are available for donation" : "✗ You are currently unavailable"}
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigate("availability")}
          style={{
            padding: "9px 18px", borderRadius: 10,
            border: donor.available ? "1.5px solid rgba(16,185,129,0.4)" : "1.5px solid rgba(239,68,68,0.4)",
            background: donor.available ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
            color: donor.available ? "#10b981" : "#ef4444",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
            transition: "all 0.25s", fontFamily: "inherit",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          Change Status
        </button>
      </motion.div>
    </div>
  );
}
