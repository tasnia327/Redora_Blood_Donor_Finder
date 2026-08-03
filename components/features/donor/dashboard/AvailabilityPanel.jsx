"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaToggleOn, FaToggleOff, FaInfoCircle } from "react-icons/fa";

export default function AvailabilityPanel({ donor, onToggle, theme, dark }) {
  const [confirming, setConfirming] = useState(false);
  const available = donor.available;

  const card = {
    background: theme.card,
    backdropFilter: "blur(16px)",
    border: theme.border,
    borderRadius: 20,
    padding: "32px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 680 }}>

      {/* Main Toggle Card */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          ...card,
          background: available
            ? dark ? "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))" : "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))"
            : dark ? "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))" : "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.03))",
          border: available ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(239,68,68,0.25)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pulse orb */}
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: available ? "#10b981" : "#ef4444",
          filter: "blur(120px)", opacity: 0.06,
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />

        {/* Status Icon */}
        <motion.div
          key={available ? "on" : "off"}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: 100, height: 100, borderRadius: "50%", margin: "0 auto 24px",
            background: available ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
            border: available ? "3px solid rgba(16,185,129,0.4)" : "3px solid rgba(239,68,68,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}
        >
          {available && (
            <div style={{
              position: "absolute", inset: -6, borderRadius: "50%",
              border: "2px solid rgba(16,185,129,0.2)",
              animation: "pingRing 2s ease infinite",
            }} />
          )}
          {available
            ? <FaToggleOn style={{ fontSize: 42, color: "#10b981" }} />
            : <FaToggleOff style={{ fontSize: 42, color: "#ef4444" }} />
          }
        </motion.div>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: available ? "#10b981" : "#ef4444", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          {available ? "You're Available" : "Currently Unavailable"}
        </h2>
        <p style={{ fontSize: 15, color: theme.textSecondary, margin: "0 0 28px", lineHeight: 1.6 }}>
          {available
            ? "Donors in your area can see your profile and contact you for donations."
            : "You are hidden from search results. Toggle to become visible to patients."}
        </p>

        {/* Big Toggle Button */}
        <button
          onClick={() => setConfirming(true)}
          style={{
            padding: "16px 40px", borderRadius: 16, border: "none",
            background: available
              ? "linear-gradient(135deg, #ef4444, #dc2626)"
              : "linear-gradient(135deg, #10b981, #059669)",
            color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
            boxShadow: available ? "0 8px 28px rgba(239,68,68,0.35)" : "0 8px 28px rgba(16,185,129,0.35)",
            transition: "all 0.3s ease", fontFamily: "inherit", letterSpacing: "0.01em",
            display: "inline-flex", alignItems: "center", gap: 10,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
        >
          {available ? <FaToggleOff /> : <FaToggleOn />}
          {available ? "Set as Unavailable" : "Set as Available"}
        </button>
      </motion.div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirming && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              ...card,
              border: available ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, color: theme.text }}>
              Confirm Status Change
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: theme.textSecondary, lineHeight: 1.6 }}>
              Are you sure you want to set your status to <strong style={{ color: available ? "#ef4444" : "#10b981" }}>
                {available ? "Unavailable" : "Available"}
              </strong>?
              {available && " You will no longer appear in donor searches."}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => { onToggle(); setConfirming(false); }}
                style={{
                  padding: "10px 22px", borderRadius: 11, border: "none",
                  background: available ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #10b981, #059669)",
                  color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Yes, Confirm
              </button>
              <button
                onClick={() => setConfirming(false)}
                style={{
                  padding: "10px 20px", borderRadius: 11,
                  border: theme.border, background: "transparent",
                  color: theme.textSecondary, fontWeight: 600, fontSize: 14,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          ...card, padding: "18px 22px",
          display: "flex", gap: 12, alignItems: "flex-start",
          background: dark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.05)",
          border: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        <FaInfoCircle style={{ fontSize: 18, color: "#3b82f6", flexShrink: 0, marginTop: 2 }} />
        <p style={{ margin: 0, fontSize: 13, color: theme.textSecondary, lineHeight: 1.6 }}>
          Your availability status determines whether patients can find and contact you.
          You can change your status at any time. It is recommended to keep yourself available
          as much as possible to help those in need.
        </p>
      </motion.div>

      <style>{`
        @keyframes pingRing {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
