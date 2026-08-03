// components/features/donor/DonorDashboard.jsx
"use client";

import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UIContext } from "@/context/UIContext";
import { AuthContext } from "@/context/AuthContext";

import {
  FaHome, FaUser, FaToggleOn, FaHistory,
  FaExclamationTriangle, FaBell, FaMapMarkerAlt,
  FaCog, FaSignOutAlt, FaTint, FaChevronLeft,
  FaChevronRight, FaBars,
} from "react-icons/fa";

import OverviewPanel from "./dashboard/OverviewPanel";
import ProfilePanel from "./dashboard/ProfilePanel";
import AvailabilityPanel from "./dashboard/AvailabilityPanel";
import HistoryPanel from "./dashboard/HistoryPanel";
import EmergencyPanel from "./dashboard/EmergencyPanel";
import NotificationsPanel from "./dashboard/NotificationsPanel";
import LocationPanel from "./dashboard/LocationPanel";
import SettingsPanel from "./dashboard/SettingsPanel";

/* ─────────────────── Sidebar Config ─────────────────── */
const NAV_ITEMS = [
  { id: "dashboard",     label: "Dashboard",           icon: FaHome,               color: "#ff2d55" },
  { id: "profile",       label: "My Profile",          icon: FaUser,               color: "#3b82f6" },
  { id: "availability",  label: "Availability",        icon: FaToggleOn,           color: "#10b981" },
  { id: "history",       label: "Donation History",    icon: FaHistory,            color: "#f59e0b" },
  { id: "emergency",     label: "Emergency Requests",  icon: FaExclamationTriangle, color: "#ef4444" },
  { id: "notifications", label: "Notifications",       icon: FaBell,               color: "#8b5cf6" },
  { id: "location",      label: "Location",            icon: FaMapMarkerAlt,       color: "#06b6d4" },
  { id: "settings",      label: "Settings",            icon: FaCog,                color: "#6b7280" },
];

const PANEL_TITLES = {
  dashboard:     "Dashboard",
  profile:       "My Profile",
  availability:  "Availability",
  history:       "Donation History",
  emergency:     "Emergency Requests",
  notifications: "Notifications",
  location:      "Location",
  settings:      "Settings",
};

/* ─────────────────── Orb ─────────────────── */
function Orb({ color, size, top, left }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size,
      top, left, background: color,
      filter: "blur(100px)", opacity: 0.2,
      borderRadius: "50%", zIndex: 0, pointerEvents: "none",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                         */
/* ═══════════════════════════════════════════════════════ */
export default function DonorDashboard() {
  const { dark } = useContext(UIContext) || { dark: true };
  const { logout } = useContext(AuthContext) || {};
  const router = useRouter();

  const theme = {
    text: dark ? "#ffffff" : "#111827",
    textSecondary: dark ? "rgba(255,255,255,.65)" : "rgba(17,24,39,.65)",
    card: dark ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.75)",
    cardHover: dark ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.9)",
    border: "1px solid " + (dark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.06)"),
    borderAccent: "1px solid " + (dark ? "rgba(255,45,85,.35)" : "rgba(255,45,85,.25)"),
    primary: "#ff2d55",
    gradient: "linear-gradient(135deg,#ff2d55,#ff7a59)",
  };

  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Fetch the logged-in donor's real data from the backend ── */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchDonor = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donor/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.status === 401) {
          // Token missing/invalid/expired — actually need to log in again.
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }

        if (!res.ok || !data.success) {
          console.error("donor/me failed:", res.status, data);
          setLoadError(
            (data.message || `Server error (${res.status})`) +
              (data.debug ? ` — ${data.debug}` : "")
          );
          setLoading(false);
          return;
        }

        const d = data.donor;
        setDonor({
          ...d,
          name: d.fullName,
          registrationDate: d.created_at
            ? new Date(d.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "",
          // No donation-history table yet — panels expect this field,
          // so default it until that feature exists.
          lastDonation: d.lastDonation || "No donations yet",
        });
      } catch (err) {
        console.error("Failed to load donor profile:", err);
        setLoadError("Could not reach the server. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (logout) logout();
    router.push("/");
  };

  const handleDonorUpdate = async (updates) => {
    // Optimistic local update so the UI feels instant.
    setDonor((prev) => ({ ...prev, ...updates }));

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/donor/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error("Profile update failed:", data);
        alert(data.message || "Could not save changes. Please try again.");
        return;
      }

      // Re-sync with the confirmed row from the DB (keeps name/registrationDate mapping correct).
      const d = data.donor;
      setDonor((prev) => ({
        ...prev,
        ...d,
        name: d.fullName,
        available: !!d.available,
      }));
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Could not reach the server. Please try again.");
    }
  };

  const handleToggleAvailability = () => {
    handleDonorUpdate({ available: !donor.available });
  };

  // Returns { success, message } so SettingsPanel can show the right feedback
  // without needing to know about tokens/fetch at all.
  const handleChangePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/donor/me/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Could not change password." };
      }

      return { success: true, message: data.message || "Password updated." };
    } catch (err) {
      console.error("Change password error:", err);
      return { success: false, message: "Could not reach the server. Please try again." };
    }
  };

  /* ── Loading / error states (before donor data has arrived) ── */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: dark
            ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
            : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
          color: theme.text,
        }}
      >
        Loading your dashboard…
      </div>
    );
  }

  if (loadError || !donor) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
          background: dark
            ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
            : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
          color: theme.text,
        }}
      >
        <div>{loadError || "Could not load your profile."}</div>
        <button
          onClick={() => router.push("/auth/login")}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: theme.gradient,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Back to login
        </button>
      </div>
    );
  }

  /* ── Sidebar dimensions ── */
  const SIDEBAR_W = collapsed ? 72 : 240;

  /* ── Theme-derived tokens ── */
  const bg = dark
    ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
    : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)";

  const sidebarBg = dark ? "rgba(11,15,26,0.92)" : "rgba(255,255,255,0.88)";
  const sidebarBorder = dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)";

  /* ── Active panel ── */
  function renderPanel() {
    const common = { theme, dark };
    switch (active) {
      case "dashboard":     return <OverviewPanel      {...common} donor={donor} onNavigate={setActive} />;
      case "profile":       return <ProfilePanel       {...common} donor={donor} onUpdate={handleDonorUpdate} />;
      case "availability":  return <AvailabilityPanel  {...common} donor={donor} onToggle={handleToggleAvailability} />;
      case "history":       return <HistoryPanel       {...common} />;
      case "emergency":     return <EmergencyPanel     {...common} />;
      case "notifications": return <NotificationsPanel {...common} />;
      case "location":      return <LocationPanel      {...common} donor={donor} onUpdate={handleDonorUpdate} />;
      case "settings":      return <SettingsPanel      {...common} donor={donor} onUpdate={handleDonorUpdate} onChangePassword={handleChangePassword} />;
      default:              return <OverviewPanel      {...common} donor={donor} onNavigate={setActive} />;
    }
  }

  /* ── Nav item component ── */
  const NavItem = ({ item }) => {
    const isActive = active === item.id;
    const Icon = item.icon;
    return (
      <button
        onClick={() => { setActive(item.id); setMobileOpen(false); }}
        title={collapsed ? item.label : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 12,
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? "12px" : "12px 14px",
          borderRadius: 12,
          border: "none",
          width: "100%",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 14,
          fontWeight: 600,
          transition: "all 0.2s ease",
          background: isActive
            ? dark ? "rgba(255,45,85,0.16)" : "rgba(255,45,85,0.10)"
            : "transparent",
          color: isActive ? item.color : dark ? "#9ca3af" : "#6b7280",
          borderLeft: isActive ? `3px solid ${item.color}` : "3px solid transparent",
          marginBottom: 2,
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
            e.currentTarget.style.color = dark ? "#fff" : "#111";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = dark ? "#9ca3af" : "#6b7280";
          }
        }}
      >
        <Icon style={{ fontSize: 18, flexShrink: 0, color: isActive ? item.color : "inherit" }} />
        {!collapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
        {/* Unread badge for notifications */}
        {item.id === "notifications" && !collapsed && (
          <span style={{
            marginLeft: "auto",
            width: 18, height: 18, borderRadius: "50%",
            background: "#3b82f6", color: "#fff",
            fontSize: 10, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>2</span>
        )}
        {item.id === "emergency" && !collapsed && (
          <span style={{
            marginLeft: "auto",
            width: 18, height: 18, borderRadius: "50%",
            background: "#ef4444", color: "#fff",
            fontSize: 10, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>4</span>
        )}
      </button>
    );
  };

  /* ── Sidebar inner ── */
  const SidebarContent = () => (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100%", padding: "16px 10px",
    }}>
      {/* Logo + Collapse */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        marginBottom: 28, paddingLeft: collapsed ? 0 : 4,
      }}>
        {!collapsed && (
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontWeight: 900, fontSize: 20, color: "#ff2d55", letterSpacing: "-0.02em" }}>
              REDORA
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: 34, height: 34, borderRadius: 10,
            border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
            background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            color: dark ? "#fff" : "#111",
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(255,45,85,0.15)" : "rgba(255,45,85,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"; }}
        >
          {collapsed ? <FaChevronRight style={{ fontSize: 12 }} /> : <FaChevronLeft style={{ fontSize: 12 }} />}
        </button>
      </div>

      {/* Donor Avatar Mini Card */}
      {!collapsed && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 14px", borderRadius: 14, marginBottom: 16,
          background: dark ? "rgba(255,45,85,0.08)" : "rgba(255,45,85,0.05)",
          border: "1px solid rgba(255,45,85,0.15)",
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "rgba(255,45,85,0.15)",
            border: "2px solid rgba(255,45,85,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <FaUser style={{ fontSize: 16, color: "#ff2d55" }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: dark ? "#fff" : "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {donor.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <FaTint style={{ fontSize: 10, color: "#ff2d55" }} />
              <span style={{ fontSize: 11, color: "#ff2d55", fontWeight: 700 }}>{donor.bloodGroup}</span>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: donor.available ? "#10b981" : "#ef4444",
                display: "inline-block", marginLeft: 4,
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => <NavItem key={item.id} item={item} />)}
      </nav>

      {/* Divider */}
      <div style={{
        height: 1, margin: "12px 4px",
        background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      }} />

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: "flex", alignItems: "center",
          gap: collapsed ? 0 : 12,
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? "12px" : "12px 14px",
          borderRadius: 12, border: "1px solid rgba(255,45,85,0.25)",
          background: dark ? "rgba(255,45,85,0.07)" : "rgba(255,45,85,0.05)",
          color: "#ff2d55", fontWeight: 600, fontSize: 14,
          cursor: "pointer", fontFamily: "inherit",
          transition: "all 0.25s", width: "100%",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#ff2d55"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.border = "1px solid #ff2d55"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = dark ? "rgba(255,45,85,0.07)" : "rgba(255,45,85,0.05)"; e.currentTarget.style.color = "#ff2d55"; e.currentTarget.style.border = "1px solid rgba(255,45,85,0.25)"; }}
      >
        <FaSignOutAlt style={{ fontSize: 16, flexShrink: 0 }} />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: bg,
      color: dark ? "#fff" : "#111827",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      display: "flex",
      position: "relative",
      isolation: "isolate",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <Orb color="#ff2d55" size="350px" top="-5%" left="15%" />
        <Orb color="#7c4dff" size="280px" top="55%" left="70%" />
        <Orb color="#00d4ff" size="200px" top="80%" left="5%" />
      </div>

      {/* ── SIDEBAR (desktop) ── */}
      <aside style={{
        width: SIDEBAR_W,
        minWidth: SIDEBAR_W,
        position: "sticky",
        top: 0,
        height: "100vh",
        background: sidebarBg,
        backdropFilter: "blur(24px)",
        borderRight: sidebarBorder,
        boxShadow: dark ? "4px 0 24px rgba(0,0,0,0.3)" : "4px 0 20px rgba(0,0,0,0.06)",
        zIndex: 100,
        transition: "width 0.3s cubic-bezier(0.25,0.8,0.25,1), min-width 0.3s cubic-bezier(0.25,0.8,0.25,1)",
        overflowX: "hidden",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      className="dashboard-sidebar"
      >
        <SidebarContent />
      </aside>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative", zIndex: 1 }}>

        {/* Top header bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          padding: "0 32px",
          height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: dark ? "rgba(11,15,26,0.75)" : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(18px)",
          borderBottom: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)",
          boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.05)",
        }}>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              width: 38, height: 38, borderRadius: 10,
              border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              background: "transparent", color: dark ? "#fff" : "#111",
              cursor: "pointer", alignItems: "center", justifyContent: "center",
            }}
            className="mobile-menu-btn"
          >
            <FaBars style={{ fontSize: 16 }} />
          </button>

          {/* Page title */}
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: dark ? "#fff" : "#111", letterSpacing: "-0.02em" }}>
              {PANEL_TITLES[active]}
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: dark ? "#6b7280" : "#9ca3af" }}>
              Redora Donor Portal
            </p>
          </div>

          {/* Right side — donor badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 14px", borderRadius: 999,
              background: donor.available ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
              border: donor.available ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(239,68,68,0.25)",
              fontSize: 12, fontWeight: 700,
              color: donor.available ? "#10b981" : "#ef4444",
              cursor: "pointer",
            }}
            onClick={() => setActive("availability")}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: donor.available ? "#10b981" : "#ef4444",
                display: "inline-block",
                boxShadow: donor.available ? "0 0 6px rgba(16,185,129,0.7)" : "none",
              }} />
              {donor.available ? "Available" : "Unavailable"}
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,45,85,0.12)",
              border: "2px solid rgba(255,45,85,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setActive("profile")}
            >
              <FaUser style={{ fontSize: 15, color: "#ff2d55" }} />
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  position: "fixed", inset: 0, zIndex: 199,
                  background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
                }}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                style={{
                  position: "fixed", top: 0, left: 0, bottom: 0,
                  width: 260, zIndex: 200,
                  background: sidebarBg,
                  backdropFilter: "blur(24px)",
                  borderRight: sidebarBorder,
                  overflowY: "auto",
                }}
              >
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Panel Content */}
        <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ maxWidth: 1100, margin: "0 auto" }}
            >
              {renderPanel()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-sidebar { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .dashboard-sidebar::-webkit-scrollbar { width: 4px; }
        .dashboard-sidebar::-webkit-scrollbar-track { background: transparent; }
        .dashboard-sidebar::-webkit-scrollbar-thumb { background: rgba(255,45,85,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}