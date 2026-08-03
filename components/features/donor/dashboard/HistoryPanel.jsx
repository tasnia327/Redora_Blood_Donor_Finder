"use client";

import { motion } from "framer-motion";
import { FaTint, FaHospital, FaCalendarAlt, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const HISTORY = [
  { id: 1, date: "18 Jun 2026", hospital: "Chattogram Medical College Hospital", bloodGroup: "A+", status: "Completed" },
  { id: 2, date: "02 Mar 2026", hospital: "CMCH", bloodGroup: "A+", status: "Completed" },
  { id: 3, date: "10 Nov 2025", hospital: "General Hospital, Agrabad", bloodGroup: "A+", status: "Completed" },
  { id: 4, date: "05 Jul 2025", hospital: "Holy Family Red Crescent", bloodGroup: "A+", status: "Completed" },
  { id: 5, date: "22 Feb 2025", hospital: "Chittagong Metropolitan Hospital", bloodGroup: "A+", status: "Completed" },
];

export default function HistoryPanel({ theme, dark }) {
  const card = {
    background: theme.card,
    backdropFilter: "blur(16px)",
    border: theme.border,
    borderRadius: 20,
    overflow: "hidden",
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
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          background: dark
            ? "linear-gradient(135deg, rgba(255,45,85,0.12), rgba(124,77,255,0.08))"
            : "linear-gradient(135deg, rgba(255,45,85,0.06), rgba(124,77,255,0.04))",
          border: theme.borderAccent,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em" }}>
            Donation History
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: theme.textSecondary }}>
            You have donated <strong style={{ color: "#ff2d55" }}>{HISTORY.length} times</strong> — thank you!
          </p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
          borderRadius: 999, background: "rgba(255,45,85,0.12)",
          color: "#ff2d55", fontWeight: 700, fontSize: 14,
        }}>
          <FaTint style={{ fontSize: 12 }} /> {HISTORY.length} Donations
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={card}
      >
        {/* Table Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 90px 110px",
          gap: 16,
          padding: "14px 24px",
          borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
          textTransform: "uppercase", color: theme.textSecondary,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><FaCalendarAlt style={{ fontSize: 11, color: "#ff2d55" }} /> Date</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><FaHospital style={{ fontSize: 11, color: "#ff2d55" }} /> Hospital</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><FaTint style={{ fontSize: 11, color: "#ff2d55" }} /> Blood</div>
          <div>Status</div>
        </div>

        {HISTORY.map((row, i) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 90px 110px",
              gap: 16,
              padding: "18px 24px",
              alignItems: "center",
              borderBottom: i < HISTORY.length - 1
                ? dark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)"
                : "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ fontSize: 14, color: theme.text, fontWeight: 600 }}>{row.date}</div>
            <div style={{ fontSize: 14, color: theme.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {row.hospital}
            </div>
            <div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 999,
                background: "rgba(255,45,85,0.10)", color: "#ff2d55",
                fontWeight: 800, fontSize: 13,
                border: "1px solid rgba(255,45,85,0.2)",
              }}>
                <FaTint style={{ fontSize: 10 }} /> {row.bloodGroup}
              </span>
            </div>
            <div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                background: row.status === "Completed" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
                color: row.status === "Completed" ? "#10b981" : "#f59e0b",
                border: row.status === "Completed" ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(245,158,11,0.25)",
              }}>
                {row.status === "Completed"
                  ? <FaCheckCircle style={{ fontSize: 11 }} />
                  : <FaHourglassHalf style={{ fontSize: 11 }} />
                }
                {row.status}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
