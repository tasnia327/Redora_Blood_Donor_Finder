"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaExclamationTriangle, FaTint, FaHospital,
  FaMapMarkerAlt, FaClock, FaCheck, FaInfoCircle,
} from "react-icons/fa";

const REQUESTS = [
  {
    id: 1, patient: "Rania Khatun", bloodGroup: "A+",
    hospital: "Chattogram Medical College", distance: "1.2 km",
    urgency: "Critical", time: "5 min ago", city: "Chattogram",
  },
  {
    id: 2, patient: "Karim Uddin", bloodGroup: "A+",
    hospital: "General Hospital Agrabad", distance: "3.5 km",
    urgency: "Moderate", time: "22 min ago", city: "Chattogram",
  },
  {
    id: 3, patient: "Fatima Begum", bloodGroup: "A+",
    hospital: "CMCH Emergency", distance: "4.8 km",
    urgency: "Critical", time: "1 hr ago", city: "Chattogram",
  },
  {
    id: 4, patient: "Rafiq Hasan", bloodGroup: "A+",
    hospital: "Islami Bank Hospital", distance: "7.2 km",
    urgency: "Low", time: "3 hrs ago", city: "Chattogram",
  },
];

const urgencyConfig = {
  Critical: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" },
  Moderate: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" },
  Low: { color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
};

export default function EmergencyPanel({ theme, dark }) {
  const [accepted, setAccepted] = useState(new Set());

  const card = {
    background: theme.card,
    backdropFilter: "blur(16px)",
    border: theme.border,
    borderRadius: 20,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          ...card, padding: "24px 28px",
          background: dark
            ? "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(255,45,85,0.08))"
            : "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(255,45,85,0.04))",
          border: "1px solid rgba(239,68,68,0.25)",
          display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
        }}
      >
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: "rgba(239,68,68,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          border: "1.5px solid rgba(239,68,68,0.3)",
        }}>
          <FaExclamationTriangle style={{ fontSize: 22, color: "#ef4444" }} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em" }}>
            Emergency Blood Requests
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: theme.textSecondary }}>
            <strong style={{ color: "#ef4444" }}>{REQUESTS.filter(r => r.urgency === "Critical").length} critical</strong> requests need your A+ blood nearby
          </p>
        </div>
      </motion.div>

      {/* Request Cards */}
      {REQUESTS.map((req, i) => {
        const urg = urgencyConfig[req.urgency] || urgencyConfig.Low;
        const isAccepted = accepted.has(req.id);
        return (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            style={{
              ...card, padding: "24px",
              border: req.urgency === "Critical" ? "1px solid rgba(239,68,68,0.2)" : theme.border,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = theme.cardHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = theme.card; }}
          >
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Blood type badge */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(255,45,85,0.12)",
                  border: "1.5px solid rgba(255,45,85,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 900, color: "#ff2d55",
                  flexShrink: 0,
                }}>
                  {req.bloodGroup}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: theme.text }}>{req.patient}</div>
                  <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>Patient</div>
                </div>
              </div>
              {/* Urgency badge */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 14px", borderRadius: 999,
                background: urg.bg, color: urg.color,
                fontWeight: 700, fontSize: 12,
                border: `1px solid ${urg.border}`,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: urg.color, display: "inline-block" }} />
                {req.urgency}
              </span>
            </div>

            {/* Info row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: theme.textSecondary }}>
                <FaHospital style={{ color: "#ff2d55", fontSize: 13, flexShrink: 0 }} />
                {req.hospital}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: theme.textSecondary }}>
                <FaMapMarkerAlt style={{ color: "#ff2d55", fontSize: 13, flexShrink: 0 }} />
                {req.distance} away
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: theme.textSecondary }}>
                <FaClock style={{ color: "#ff2d55", fontSize: 12, flexShrink: 0 }} />
                {req.time}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setAccepted(new Set([...accepted, req.id]))}
                disabled={isAccepted}
                style={{
                  flex: 1, padding: "10px 16px", borderRadius: 11, border: "none",
                  background: isAccepted
                    ? "rgba(16,185,129,0.15)"
                    : "linear-gradient(135deg, #ff2d55, #ff7a59)",
                  color: isAccepted ? "#10b981" : "#fff",
                  fontWeight: 700, fontSize: 13, cursor: isAccepted ? "default" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: isAccepted ? "none" : "0 4px 16px rgba(255,45,85,0.25)",
                  transition: "all 0.25s", fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { if (!isAccepted) { e.currentTarget.style.transform = "scale(1.02)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <FaCheck />
                {isAccepted ? "Accepted ✓" : "Accept Request"}
              </button>
              <button
                style={{
                  padding: "10px 16px", borderRadius: 11,
                  border: theme.border, background: "transparent",
                  color: theme.textSecondary, fontWeight: 600, fontSize: 13,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  transition: "all 0.25s", fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <FaInfoCircle /> Details
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
