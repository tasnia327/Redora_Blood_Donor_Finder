"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLock, FaEnvelope, FaPhone, FaBell, FaSlidersH,
  FaChevronDown, FaChevronUp, FaCheck, FaEye, FaEyeSlash,
} from "react-icons/fa";

function SettingSection({ title, icon: Icon, color, bg, children, dark, theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: theme.card,
      backdropFilter: "blur(16px)",
      border: theme.border,
      borderRadius: 18,
      overflow: "hidden",
      transition: "all 0.3s ease",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "20px 24px",
          display: "flex", alignItems: "center", gap: 14,
          background: "transparent", border: "none",
          cursor: "pointer", fontFamily: "inherit",
          borderBottom: open
            ? dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)"
            : "none",
        }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: bg, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon style={{ fontSize: 18, color }} />
        </div>
        <span style={{ flex: 1, textAlign: "left", fontWeight: 700, fontSize: 16, color: theme.text }}>
          {title}
        </span>
        {open
          ? <FaChevronUp style={{ color: theme.textSecondary, fontSize: 14 }} />
          : <FaChevronDown style={{ color: theme.textSecondary, fontSize: 14 }} />
        }
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{ padding: "20px 24px" }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

function PasswordInput({ label, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#ff2d55", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          style={{
            width: "100%", padding: "12px 42px 12px 14px",
            borderRadius: 12, border: "1px solid rgba(255,45,85,0.3)",
            background: "rgba(255,45,85,0.04)", color: "inherit",
            fontSize: 14, outline: "none", fontFamily: "inherit", transition: "all 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.target.style.borderColor = "#ff2d55"; e.target.style.boxShadow = "0 0 0 3px rgba(255,45,85,0.12)"; }}
          onBlur={(e) => { e.target.style.borderColor = "rgba(255,45,85,0.3)"; e.target.style.boxShadow = "none"; }}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(128,128,128,0.7)", fontSize: 15, padding: 0,
          }}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

function TogglePref({ label, description, value, onChange, theme }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 16, padding: "14px 0",
      borderBottom: "1px solid rgba(128,128,128,0.1)",
    }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: theme.text }}>{label}</div>
        <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>{description}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 50, height: 28, borderRadius: 999, border: "none",
          background: value ? "linear-gradient(135deg, #ff2d55, #ff7a59)" : "rgba(128,128,128,0.2)",
          cursor: "pointer", position: "relative", transition: "all 0.3s ease", flexShrink: 0,
        }}
      >
        <div style={{
          width: 20, height: 20, borderRadius: "50%",
          background: "#fff",
          position: "absolute", top: 4,
          left: value ? 26 : 4,
          transition: "left 0.3s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }} />
      </button>
    </div>
  );
}

export default function SettingsPanel({ theme, dark, donor, onUpdate, onChangePassword }) {
  const [pw, setPw] = useState({ current: "", newPw: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [email, setEmail] = useState(donor?.email || "");
  const [phone, setPhone] = useState(donor?.phone || "");
  const [prefs, setPrefs] = useState({
    emergencyAlerts: true,
    eligibilityReminders: true,
    profileUpdates: false,
    emailNotifications: true,
  });
  const [saved, setSaved] = useState(null);

  const flashSaved = (section) => {
    setSaved(section);
    setTimeout(() => setSaved(null), 2500);
  };

  const handleSave = async (section) => {
    if (section === "prefs") {
      // No backend table for notification prefs yet — local-only for now.
      flashSaved("prefs");
      return;
    }

    if (section === "email") {
      if (!email) return;
      const result = await onUpdate({ email });
      flashSaved("email");
      return;
    }

    if (section === "phone") {
      if (!phone) return;
      const result = await onUpdate({ phone });
      flashSaved("phone");
      return;
    }

    if (section === "password") {
      setPwError("");

      if (!pw.current || !pw.newPw || !pw.confirm) {
        setPwError("All password fields are required.");
        return;
      }
      if (pw.newPw !== pw.confirm) {
        setPwError("New password and confirmation do not match.");
        return;
      }
      if (pw.newPw.length < 6) {
        setPwError("New password must be at least 6 characters.");
        return;
      }

      const result = await onChangePassword(pw.current, pw.newPw);

      if (!result.success) {
        setPwError(result.message);
        return;
      }

      setPw({ current: "", newPw: "", confirm: "" });
      flashSaved("password");
    }
  };

  const SaveBtn = ({ section }) => (
    <button
      onClick={() => handleSave(section)}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 22px", borderRadius: 11, border: "none",
        background: saved === section
          ? "linear-gradient(135deg, #10b981, #059669)"
          : "linear-gradient(135deg, #ff2d55, #ff7a59)",
        color: "#fff", fontWeight: 700, fontSize: 13,
        cursor: "pointer", transition: "all 0.3s ease", fontFamily: "inherit",
        boxShadow: saved === section ? "0 4px 14px rgba(16,185,129,0.35)" : "0 4px 14px rgba(255,45,85,0.3)",
      }}
    >
      <FaCheck /> {saved === section ? "Saved!" : "Save Changes"}
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 660 }}>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em" }}
      >
        Account Settings
      </motion.h2>

      {/* Change Password */}
      <SettingSection title="Change Password" icon={FaLock} color="#ff2d55" bg="rgba(255,45,85,0.10)" dark={dark} theme={theme}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <PasswordInput label="Current Password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
          <PasswordInput label="New Password" value={pw.newPw} onChange={(e) => setPw({ ...pw, newPw: e.target.value })} />
          <PasswordInput label="Confirm New Password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
          {pwError && (
            <div style={{ fontSize: 13, color: "#ef4444", fontWeight: 600 }}>{pwError}</div>
          )}
          <SaveBtn section="password" />
        </div>
      </SettingSection>

      {/* Update Email */}
      <SettingSection title="Update Email" icon={FaEnvelope} color="#3b82f6" bg="rgba(59,130,246,0.10)" dark={dark} theme={theme}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6", letterSpacing: "0.06em", textTransform: "uppercase" }}>New Email Address</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email..."
              style={{
                padding: "12px 14px", borderRadius: 12,
                border: "1px solid rgba(59,130,246,0.3)",
                background: "rgba(59,130,246,0.04)", color: "inherit",
                fontSize: 14, outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#3b82f6"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(59,130,246,0.3)"; e.target.style.boxShadow = "none"; }}
            />
          </div>
          <button
            onClick={() => handleSave("email")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 22px", borderRadius: 11, border: "none",
              background: saved === "email" ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              width: "fit-content",
            }}
          >
            <FaCheck /> {saved === "email" ? "Saved!" : "Update Email"}
          </button>
        </div>
      </SettingSection>

      {/* Change Phone */}
      <SettingSection title="Change Phone Number" icon={FaPhone} color="#10b981" bg="rgba(16,185,129,0.10)" dark={dark} theme={theme}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#10b981", letterSpacing: "0.06em", textTransform: "uppercase" }}>New Phone Number</label>
            <input
              type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              style={{
                padding: "12px 14px", borderRadius: 12,
                border: "1px solid rgba(16,185,129,0.3)",
                background: "rgba(16,185,129,0.04)", color: "inherit",
                fontSize: 14, outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#10b981"; e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.12)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(16,185,129,0.3)"; e.target.style.boxShadow = "none"; }}
            />
          </div>
          <button
            onClick={() => handleSave("phone")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 22px", borderRadius: 11, border: "none",
              background: saved === "phone" ? "linear-gradient(135deg,#ff2d55,#ff7a59)" : "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              width: "fit-content",
            }}
          >
            <FaCheck /> {saved === "phone" ? "Saved!" : "Update Phone"}
          </button>
        </div>
      </SettingSection>

      {/* Notification Preferences */}
      <SettingSection title="Notification Preferences" icon={FaBell} color="#f59e0b" bg="rgba(245,158,11,0.10)" dark={dark} theme={theme}>
        <div>
          <TogglePref
            label="Emergency Alerts" description="Get notified about nearby emergency blood requests"
            value={prefs.emergencyAlerts}
            onChange={(v) => setPrefs({ ...prefs, emergencyAlerts: v })}
            theme={theme}
          />
          <TogglePref
            label="Eligibility Reminders" description="Remind me when I'm eligible to donate again"
            value={prefs.eligibilityReminders}
            onChange={(v) => setPrefs({ ...prefs, eligibilityReminders: v })}
            theme={theme}
          />
          <TogglePref
            label="Profile Update Notifications" description="Notify when profile is changed"
            value={prefs.profileUpdates}
            onChange={(v) => setPrefs({ ...prefs, profileUpdates: v })}
            theme={theme}
          />
          <TogglePref
            label="Email Notifications" description="Send notifications to your email"
            value={prefs.emailNotifications}
            onChange={(v) => setPrefs({ ...prefs, emailNotifications: v })}
            theme={theme}
          />
          <div style={{ marginTop: 16 }}>
            <SaveBtn section="prefs" />
          </div>
        </div>
      </SettingSection>
    </div>
  );
}
