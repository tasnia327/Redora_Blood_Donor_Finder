"use client";

import { motion } from "framer-motion";
import { FaUserCircle, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";

export default function DonorCard({ donor, theme, dark }) {
  const handleContact = () => {
    window.location.href = `tel:${donor.phone}`;
  };

  const card = dark
    ? "rgba(255,255,255,0.04)"
    : "rgba(255,255,255,0.75)";
  const cardHover = dark
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.95)";
  const border = dark
    ? "1px solid rgba(255,255,255,0.07)"
    : "1px solid rgba(0,0,0,0.06)";
  const borderAccent = dark
    ? "1px solid rgba(255,45,85,0.3)"
    : "1px solid rgba(255,45,85,0.2)";
  const text = dark ? "#ffffff" : "#111827";
  const textSec = dark ? "#cbd5e1" : "#6b7280";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        borderRadius: 24,
        background: card,
        backdropFilter: "blur(18px)",
        border,
        padding: "28px 24px",
        transition: "all 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.background = cardHover;
        e.currentTarget.style.border = borderAccent;
        e.currentTarget.style.boxShadow = dark
          ? "0 16px 48px rgba(0,0,0,0.4)"
          : "0 16px 48px rgba(255,45,85,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = card;
        e.currentTarget.style.border = border;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Subtle accent glow top-right */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "#ff2d55",
          filter: "blur(50px)",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />

      {/* Header: Avatar + Name + Blood Group */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,45,85,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "1.5px solid rgba(255,45,85,0.25)",
          }}
        >
          <FaUserCircle style={{ fontSize: 32, color: "#ff2d55" }} />
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: text,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {donor.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 4,
              fontWeight: 700,
              fontSize: 14,
              color: "#ff2d55",
            }}
          >
            <FaDroplet style={{ fontSize: 12 }} />
            {donor.bloodGroup}
          </div>
        </div>

        {/* Availability badge — pushed to right */}
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              background: donor.available
                ? "rgba(16,185,129,0.15)"
                : "rgba(239,68,68,0.15)",
              color: donor.available ? "#10b981" : "#ef4444",
              border: donor.available
                ? "1px solid rgba(16,185,129,0.3)"
                : "1px solid rgba(239,68,68,0.3)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: donor.available ? "#10b981" : "#ef4444",
                display: "inline-block",
              }}
            />
            {donor.available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: dark
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.06)",
          marginBottom: 18,
        }}
      />

      {/* Info rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: textSec }}>
          <FaMapMarkerAlt style={{ color: "#ff2d55", fontSize: 13, flexShrink: 0 }} />
          <span>{donor.city}, {donor.area}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: textSec }}>
          <FaPhoneAlt style={{ color: "#ff2d55", fontSize: 12, flexShrink: 0 }} />
          <span>{donor.phone}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #ff2d55, #ff7a59)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            transition: "all 0.25s ease",
            boxShadow: "0 4px 16px rgba(255,45,85,0.25)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 6px 22px rgba(255,45,85,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,45,85,0.25)";
          }}
        >
          View Profile
        </button>

        {donor.available && (
          <button
            onClick={handleContact}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 12,
              border: "1.5px solid rgba(255,45,85,0.4)",
              background: "rgba(255,45,85,0.08)",
              color: "#ff2d55",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.25s ease",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff2d55";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,45,85,0.08)";
              e.currentTarget.style.color = "#ff2d55";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Contact
          </button>
        )}
      </div>
    </motion.div>
  );
}