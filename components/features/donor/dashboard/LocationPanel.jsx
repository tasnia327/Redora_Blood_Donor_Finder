"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCity, FaEdit, FaCheck } from "react-icons/fa";

const CITIES = ["Chattogram", "Dhaka", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Cumilla"];

function selectStyle(dark, theme) {
  return {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "1px solid rgba(255,45,85,0.3)",
    background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
    color: "inherit",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    transition: "all 0.2s",
  };
}

export default function LocationPanel({ donor, onUpdate, theme, dark }) {
  const [editing, setEditing] = useState(false);
  const [city, setCity] = useState(donor.city);
  const [area, setArea] = useState(donor.area);

  const card = {
    background: theme.card,
    backdropFilter: "blur(16px)",
    border: theme.border,
    borderRadius: 20,
    padding: "28px",
  };

  const handleSave = () => {
    onUpdate({ city, area });
    setEditing(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 600 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          ...card,
          background: dark
            ? "linear-gradient(135deg, rgba(255,45,85,0.12), rgba(124,77,255,0.08))"
            : "linear-gradient(135deg, rgba(255,45,85,0.06), rgba(124,77,255,0.04))",
          border: theme.borderAccent,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(255,45,85,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1.5px solid rgba(255,45,85,0.25)",
          }}>
            <FaMapMarkerAlt style={{ fontSize: 22, color: "#ff2d55" }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: theme.text }}>Location Information</h2>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: theme.textSecondary }}>
              Your location determines which patients can find you
            </p>
          </div>
        </div>

        {/* Current Location Display */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
          <div style={{
            flex: 1, padding: "16px", borderRadius: 14,
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
            border: theme.border,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#ff2d55", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <FaCity style={{ fontSize: 10 }} /> City
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>{donor.city}</div>
          </div>
          <div style={{
            flex: 1, padding: "16px", borderRadius: 14,
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
            border: theme.border,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#ff2d55", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <FaMapMarkerAlt style={{ fontSize: 10 }} /> Area
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>{donor.area}</div>
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "11px 20px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #ff2d55, #ff7a59)",
            color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(255,45,85,0.3)", transition: "all 0.25s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,45,85,0.45)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,45,85,0.3)"; }}
        >
          <FaEdit /> Update Location
        </button>
      </motion.div>

      {/* Edit Form */}
      {editing && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={card}
        >
          <h3 style={{ margin: "0 0 18px", fontSize: 16, fontWeight: 700, color: theme.text }}>Update Location</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#ff2d55", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                <FaCity style={{ display: "inline", marginRight: 5, fontSize: 10 }} /> City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={selectStyle(dark, theme)}
                onFocus={(e) => { e.target.style.borderColor = "#ff2d55"; e.target.style.boxShadow = "0 0 0 3px rgba(255,45,85,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,45,85,0.3)"; e.target.style.boxShadow = "none"; }}
              >
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#ff2d55", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                <FaMapMarkerAlt style={{ display: "inline", marginRight: 5, fontSize: 10 }} /> Area
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter your area..."
                style={{
                  width: "100%", padding: "13px 16px", borderRadius: 12,
                  border: "1px solid rgba(255,45,85,0.3)",
                  background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
                  color: "inherit", fontSize: 14, outline: "none", fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#ff2d55"; e.target.style.boxShadow = "0 0 0 3px rgba(255,45,85,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,45,85,0.3)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={handleSave}
                style={{
                  flex: 1, padding: "11px 0", borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg, #ff2d55, #ff7a59)",
                  color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  fontFamily: "inherit",
                }}
              >
                <FaCheck /> Save Location
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{
                  padding: "11px 20px", borderRadius: 12,
                  border: theme.border, background: "transparent",
                  color: theme.textSecondary, fontWeight: 600, fontSize: 14,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
