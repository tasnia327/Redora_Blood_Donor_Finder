"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser, FaTint, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaCalendarAlt, FaEdit, FaCheck, FaTimes,
} from "react-icons/fa";

function InfoRow({ icon: Icon, label, value, dark, theme }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 14,
      padding: "14px 0",
      borderBottom: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: "rgba(255,45,85,0.10)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon style={{ fontSize: 15, color: "#ff2d55" }} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: theme.textSecondary, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>{value}</div>
      </div>
    </div>
  );
}

function EditField({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#ff2d55", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "12px 14px", borderRadius: 12,
          border: "1px solid rgba(255,45,85,0.3)",
          background: "rgba(255,45,85,0.04)",
          color: "inherit", fontSize: 14, outline: "none",
          fontFamily: "inherit", transition: "all 0.2s",
          width: "100%",
        }}
        onFocus={(e) => { e.target.style.borderColor = "#ff2d55"; e.target.style.boxShadow = "0 0 0 3px rgba(255,45,85,0.12)"; }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,45,85,0.3)"; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );
}

export default function ProfilePanel({ donor, onUpdate, theme, dark }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: donor.name,
    phone: donor.phone,
    email: donor.email,
    city: donor.city,
    area: donor.area,
  });

  const card = {
    background: theme.card,
    backdropFilter: "blur(16px)",
    border: theme.border,
    borderRadius: 20,
    padding: "28px",
  };

  const handleSave = () => {
    onUpdate(form);
    setEditing(false);
  };

  const bloodColors = { "A+": "#ef4444", "A-": "#dc2626", "B+": "#f97316", "B-": "#ea580c", "AB+": "#8b5cf6", "AB-": "#7c3aed", "O+": "#ff2d55", "O-": "#be123c" };
  const bColor = bloodColors[donor.bloodGroup] || "#ff2d55";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          ...card,
          background: dark
            ? "linear-gradient(135deg, rgba(255,45,85,0.14), rgba(124,77,255,0.10))"
            : "linear-gradient(135deg, rgba(255,45,85,0.07), rgba(124,77,255,0.04))",
          border: theme.borderAccent,
          display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
        }}
      >
        {/* Avatar */}
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(255,45,85,0.12)",
          border: "3px solid rgba(255,45,85,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <FaUser style={{ fontSize: 36, color: "#ff2d55" }} />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em" }}>
            {donor.name}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 14px", borderRadius: 999,
              background: `${bColor}20`, color: bColor,
              fontWeight: 800, fontSize: 14,
              border: `1.5px solid ${bColor}40`,
            }}>
              <FaTint style={{ fontSize: 11 }} /> {donor.bloodGroup}
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 14px", borderRadius: 999,
              background: donor.available ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
              color: donor.available ? "#10b981" : "#ef4444",
              fontWeight: 700, fontSize: 13,
              border: donor.available ? "1.5px solid rgba(16,185,129,0.3)" : "1.5px solid rgba(239,68,68,0.3)",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
              {donor.available ? "Available" : "Unavailable"}
            </span>
          </div>
          <div style={{ marginTop: 6, fontSize: 13, color: theme.textSecondary }}>
            Member since {donor.registrationDate}
          </div>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
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
            <FaEdit /> Edit Profile
          </button>
        )}
      </motion.div>

      {editing ? (
        /* Edit Form */
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ ...card }}
        >
          <h3 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 700, color: theme.text }}>
            Edit Profile
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <EditField label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <EditField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} type="tel" />
            <EditField label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
            <EditField label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <EditField label="Area" value={form.area} onChange={(v) => setForm({ ...form, area: v })} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button
              onClick={handleSave}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "11px 24px", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #ff2d55, #ff7a59)",
                color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255,45,85,0.3)", fontFamily: "inherit",
              }}
            >
              <FaCheck /> Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "11px 20px", borderRadius: 12,
                border: theme.border, background: "transparent",
                color: theme.textSecondary, fontWeight: 600, fontSize: 14, cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        /* Info Display */
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ ...card }}
        >
          <h3 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: theme.text }}>
            Personal Information
          </h3>
          <InfoRow icon={FaUser} label="Full Name" value={donor.name} dark={dark} theme={theme} />
          <InfoRow icon={FaTint} label="Blood Group" value={donor.bloodGroup} dark={dark} theme={theme} />
          <InfoRow icon={FaPhone} label="Phone Number" value={donor.phone} dark={dark} theme={theme} />
          <InfoRow icon={FaEnvelope} label="Email" value={donor.email} dark={dark} theme={theme} />
          <InfoRow icon={FaMapMarkerAlt} label="Location" value={`${donor.city}, ${donor.area}`} dark={dark} theme={theme} />
          <InfoRow icon={FaCalendarAlt} label="Last Donation" value={donor.lastDonation} dark={dark} theme={theme} />
          <div style={{ paddingTop: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: theme.textSecondary, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 3 }}>
              Registration Date
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>{donor.registrationDate}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
