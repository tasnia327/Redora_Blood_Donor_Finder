"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBell, FaExclamationTriangle, FaCalendarCheck,
  FaUserEdit, FaToggleOn, FaCheckDouble, FaCircle,
} from "react-icons/fa";

const INITIAL_NOTIFS = [
  {
    id: 1, type: "emergency", read: false,
    message: "New emergency blood request near you — A+ needed at CMCH",
    time: "5 minutes ago",
  },
  {
    id: 2, type: "eligible", read: false,
    message: "Great news! You are now eligible to donate blood again.",
    time: "2 days ago",
  },
  {
    id: 3, type: "profile", read: true,
    message: "Your profile was updated successfully.",
    time: "3 days ago",
  },
  {
    id: 4, type: "availability", read: true,
    message: "Your availability status changed to Available.",
    time: "5 days ago",
  },
  {
    id: 5, type: "emergency", read: true,
    message: "Emergency request resolved — thank you for your response.",
    time: "1 week ago",
  },
];

const typeConfig = {
  emergency: { icon: FaExclamationTriangle, color: "#ef4444", bg: "rgba(239,68,68,0.10)" },
  eligible: { icon: FaCalendarCheck, color: "#10b981", bg: "rgba(16,185,129,0.10)" },
  profile: { icon: FaUserEdit, color: "#3b82f6", bg: "rgba(59,130,246,0.10)" },
  availability: { icon: FaToggleOn, color: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
};

export default function NotificationsPanel({ theme, dark }) {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setNotifs(notifs.map((n) => n.id === id ? { ...n, read: true } : n));

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
          ...card, padding: "22px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          background: dark
            ? "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(124,77,255,0.08))"
            : "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(124,77,255,0.04))",
          border: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "rgba(59,130,246,0.12)", display: "flex",
            alignItems: "center", justifyContent: "center",
            border: "1.5px solid rgba(59,130,246,0.25)",
            position: "relative",
          }}>
            <FaBell style={{ fontSize: 20, color: "#3b82f6" }} />
            {unreadCount > 0 && (
              <div style={{
                position: "absolute", top: -6, right: -6,
                width: 18, height: 18, borderRadius: "50%",
                background: "#ef4444", color: "#fff",
                fontSize: 10, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {unreadCount}
              </div>
            )}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: theme.text }}>Notifications</h2>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: theme.textSecondary }}>
              {unreadCount > 0 ? <><strong style={{ color: "#3b82f6" }}>{unreadCount} unread</strong> notifications</> : "All caught up!"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 10,
              border: "1px solid rgba(59,130,246,0.3)",
              background: "rgba(59,130,246,0.08)", color: "#3b82f6",
              fontWeight: 600, fontSize: 13, cursor: "pointer",
              transition: "all 0.25s", fontFamily: "inherit",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#3b82f6"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.08)"; e.currentTarget.style.color = "#3b82f6"; }}
          >
            <FaCheckDouble style={{ fontSize: 12 }} /> Mark all read
          </button>
        )}
      </motion.div>

      {/* Notification List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ ...card, overflow: "hidden" }}
      >
        {notifs.map((notif, i) => {
          const cfg = typeConfig[notif.type] || typeConfig.profile;
          const Icon = cfg.icon;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => markRead(notif.id)}
              style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "18px 24px",
                borderBottom: i < notifs.length - 1
                  ? dark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)"
                  : "none",
                cursor: "pointer",
                background: !notif.read
                  ? dark ? "rgba(59,130,246,0.04)" : "rgba(59,130,246,0.03)"
                  : "transparent",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = !notif.read
                  ? dark ? "rgba(59,130,246,0.04)" : "rgba(59,130,246,0.03)"
                  : "transparent";
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: cfg.bg, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0, marginTop: 2,
              }}>
                <Icon style={{ fontSize: 16, color: cfg.color }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, color: theme.text, lineHeight: 1.5, fontWeight: !notif.read ? 600 : 400 }}>
                  {notif.message}
                </p>
                <div style={{ marginTop: 5, fontSize: 12, color: theme.textSecondary }}>
                  {notif.time}
                </div>
              </div>

              {!notif.read && (
                <FaCircle style={{ fontSize: 8, color: "#3b82f6", flexShrink: 0, marginTop: 6 }} />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
