"use client";

import { useContext, useState } from "react";
import { UIContext } from "@/context/UIContext";

const NAVBAR_HEIGHT = 70;

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "🩸" },
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "history", label: "Donation History", icon: "📋" },
  { id: "emergency", label: "Emergency Requests", icon: "🚨" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const stats = [
  { label: "Total Donations", value: "12", icon: "🩸", color: "#ff2d55" },
  { label: "Lives Helped", value: "8", icon: "❤️", color: "#22c55e" },
  { label: "Next Donation", value: "28 Days", icon: "📅", color: "#f59e0b" },
  { label: "Requests", value: "5", icon: "🚨", color: "#3b82f6" },
];

export default function DonorDashboard() {
  const { dark = true } = useContext(UIContext) || {};
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={styles.page(dark)}>

      {/* SIDEBAR + CONTENT ROW */}
      <div style={styles.body}>

        {/* SIDEBAR (NO MORE FIXED) */}
        <aside style={styles.sidebar(dark, collapsed)}>

          {/* HEADER */}
          <div style={styles.top}>
            

            <button
  onClick={() => setCollapsed(!collapsed)}
  style={styles.toggleBtn(dark)}
>
  <span style={{ fontSize: 20, fontWeight: 800 }}>
    ⋯
  </span>
</button>
          </div>

          {/* ITEMS */}
          <div style={{ marginTop: 20, flex: 1 }}>
            {sidebarItems.map((item) => (
  <button
    key={item.id}
    onClick={() => setActive(item.id)}
    style={{
      ...styles.item(dark, collapsed),
      background:
        active === item.id
          ? dark
            ? "rgba(255,45,85,0.15)"
            : "rgba(255,45,85,0.10)"
          : "transparent",
      color: active === item.id
        ? "#ff2d55"
        : dark ? "#fff" : "#111",
    }}
  >
    <span style={{ fontSize: 20 }}>{item.icon}</span>
    {!collapsed && <span>{item.label}</span>}
  </button>
))}
          </div>

          {/* LOGOUT */}
          <button style={styles.logout(dark, collapsed)}>
            🚪 {!collapsed && "Logout"}
          </button>

        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.main}>

          <h2 style={styles.title(dark)}>Dashboard</h2>

          <section style={styles.card(dark)}>
            <h1>Welcome Back 👋</h1>
            <p>Your donations are saving lives.</p>
          </section>

          <section style={styles.grid}>
            {stats.map((s, i) => (
              <div key={i} style={styles.stat(dark)}>
                <div style={{ color: s.color, fontSize: 26 }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </section>

          <section style={styles.grid2}>
            <div style={styles.card(dark)}>Donation History</div>
            <div style={styles.card(dark)}>Emergency Requests</div>
          </section>

        </main>
      </div>
    </div>
  );
}

/* ───────── STYLES ───────── */
const styles = {

  page: (dark) => ({
    minHeight: "100vh",
    background: dark ? "#0b0f1a" : "#f6f7fb",
    color: dark ? "#fff" : "#111",
  }),

  /* NEW STRUCTURE FIX */
  body: {
    display: "flex",
    minHeight: "100vh",
  },

  /* SIDEBAR FIXED REMOVED */
  sidebar: (dark, collapsed) => ({
    width: collapsed ? 80 : 240,
    minHeight: "100vh",

    position: "sticky",
    top: NAVBAR_HEIGHT,

    padding: 14,

    background: dark ? "#0f111a" : "#fff",
    borderRight: dark
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.08)",

    display: "flex",
    flexDirection: "column",
  }),

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: (dark) => ({
    fontWeight: 900,
    color: "#ff2d55",
  }),

  toggleBtn: (dark) => ({
    border: "none",
    background: dark
      ? "rgba(255,255,255,0.08)"
      : "rgba(0,0,0,0.05)",
    color: dark ? "#fff" : "#111",
    borderRadius: 8,
    cursor: "pointer",
  }),

  item: (dark, collapsed) => ({
    display: "flex",
    gap: collapsed ? 0 : 10,
    justifyContent: collapsed ? "center" : "flex-start",
    padding: 12,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  }),

  logout: (dark, collapsed) => ({
    marginTop: "auto",
    padding: 12,
    borderRadius: 10,
    border: "1px solid rgba(255,45,85,0.3)",
    background: dark
      ? "rgba(255,45,85,0.08)"
      : "rgba(255,45,85,0.06)",
    color: "#ff2d55",
  }),

  /* MAIN FIX */
  main: {
    flex: 1,
    padding: 20,
  },

  title: (dark) => ({
    color: dark ? "#fff" : "#111",
    marginBottom: 20,
  }),

  card: (dark) => ({
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    background: dark ? "#111827" : "#fff",
    border: dark
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.06)",
  }),

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 16,
  },

  stat: (dark) => ({
    padding: 16,
    borderRadius: 14,
    background: dark ? "#111827" : "#fff",
    border: dark
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.06)",
  }),
};