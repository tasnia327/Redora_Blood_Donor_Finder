"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UIContext } from "@/context/UIContext";
import { AuthContext } from "@/context/AuthContext";

import {
  FaChartPie,
  FaUsers,
  FaHeart,
  FaTint,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaUserShield,
  FaShieldAlt,
} from "react-icons/fa";

import OverviewPanel from "./dashboard/OverviewPanel";
import UserManagementPanel from "./dashboard/UserManagementPanel";
import DonorManagementPanel from "./dashboard/DonorManagementPanel";
import BloodRequestManagementPanel from "./dashboard/BloodRequestManagementPanel";
import StatisticsPanel from "./dashboard/StatisticsPanel";
import NotificationsPanel from "./dashboard/NotificationsPanel";
import SettingsPanel from "./dashboard/SettingsPanel";

/* ─────────────────── Mock Initial Data ─────────────────── */
const INITIAL_USERS = [
  { id: "usr-101", name: "Tanvir Ahmed", email: "tanvir@example.com", phone: "01711223344", role: "Donor", status: "Active", joined: "12 May 2025", bloodGroup: "O+", city: "Dhaka" },
  { id: "usr-102", name: "Nuzhat Tasnia", email: "nuzhat@example.com", phone: "01812345678", role: "Donor", status: "Active", joined: "01 Jan 2025", bloodGroup: "A+", city: "Chattogram" },
  { id: "usr-103", name: "Rahim Chowdhury", email: "rahim@example.com", phone: "01999887766", role: "User", status: "Active", joined: "14 Feb 2026", bloodGroup: "B+", city: "Sylhet" },
  { id: "usr-104", name: "Spammer 99", email: "spammer99@temp.com", phone: "01500000000", role: "User", status: "Blocked", joined: "02 Aug 2026", bloodGroup: "AB-", city: "Dhaka" },
  { id: "usr-105", name: "Dr. Farhana Yasmin", email: "farhana@hospital.bd", phone: "01733445566", role: "User", status: "Active", joined: "20 Mar 2026", bloodGroup: "O-", city: "Dhaka" },
  { id: "usr-106", name: "Kazi Sadman", email: "sadman@example.com", phone: "01844556677", role: "Donor", status: "Active", joined: "10 Apr 2026", bloodGroup: "A-", city: "Rajshahi" },
  { id: "usr-107", name: "Bot Suspicious", email: "bot_test@mail.ru", phone: "01311002299", role: "Donor", status: "Blocked", joined: "01 Aug 2026", bloodGroup: "B-", city: "Chattogram" },
];

const INITIAL_DONORS = [
  { id: "dnr-201", name: "Nuzhat Tasnia", bloodGroup: "A+", city: "Chattogram", area: "Agrabad", phone: "01812345678", email: "nuzhat@example.com", available: true, verified: true, isFake: false, lastDonated: "18 Jun 2026", totalDonations: 4 },
  { id: "dnr-202", name: "Tanvir Ahmed", bloodGroup: "O+", city: "Dhaka", area: "Dhanmondi", phone: "01711223344", email: "tanvir@example.com", available: true, verified: true, isFake: false, lastDonated: "10 Mar 2026", totalDonations: 8 },
  { id: "dnr-203", name: "Kazi Sadman", bloodGroup: "A-", city: "Rajshahi", area: "Kazla", phone: "01844556677", email: "sadman@example.com", available: false, verified: true, isFake: false, lastDonated: "01 Dec 2025", totalDonations: 2 },
  { id: "dnr-204", name: "Mahmud Hasan", bloodGroup: "B+", city: "Sylhet", area: "Zindabazar", phone: "01677889900", email: "mahmud@example.com", available: true, verified: false, isFake: false, lastDonated: "Never", totalDonations: 0 },
  { id: "dnr-205", name: "Fake Donor Account", bloodGroup: "AB+", city: "Dhaka", area: "Gulshan", phone: "01900001122", email: "fake123@scam.org", available: true, verified: false, isFake: true, lastDonated: "Never", totalDonations: 0 },
  { id: "dnr-206", name: "Sharmin Akter", bloodGroup: "O-", city: "Chattogram", area: "Halishahar", phone: "01755667788", email: "sharmin@example.com", available: true, verified: true, isFake: false, lastDonated: "05 May 2026", totalDonations: 5 },
];

const INITIAL_REQUESTS = [
  { id: "req-301", patientName: "Ayesha Begum", bloodGroup: "O+", units: 2, hospital: "Evercare Hospital", city: "Dhaka", urgency: "Emergency", status: "Approved", contactPhone: "01711223344", date: "03 Aug 2026", isFake: false },
  { id: "req-302", patientName: "Kamal Hossain", bloodGroup: "A-", units: 1, hospital: "Chittagong Medical College", city: "Chattogram", urgency: "Emergency", status: "Pending", contactPhone: "01812345678", date: "02 Aug 2026", isFake: false },
  { id: "req-303", patientName: "Rafiqul Islam", bloodGroup: "B+", units: 3, hospital: "Square Hospital", city: "Dhaka", urgency: "Normal", status: "Completed", contactPhone: "01999887766", date: "28 Jul 2026", isFake: false },
  { id: "req-304", patientName: "Spam Request Bot", bloodGroup: "AB-", units: 10, hospital: "Unknown Hospital", city: "Dhaka", urgency: "Emergency", status: "Pending", contactPhone: "01500000000", date: "01 Aug 2026", isFake: true },
  { id: "req-305", patientName: "Jahanara Khatun", bloodGroup: "O-", units: 1, hospital: "Sylhet MAG Osmani", city: "Sylhet", urgency: "Emergency", status: "Approved", contactPhone: "01733445566", date: "03 Aug 2026", isFake: false },
];

const INITIAL_NOTIFICATIONS = [
  { id: "nt-1", type: "emergency", title: "Emergency Request!", message: "2 Units of O+ Blood needed urgently at Evercare Hospital Dhaka.", timestamp: "10 mins ago", read: false },
  { id: "nt-2", type: "donor_reg", title: "New Donor Registered", message: "Sharmin Akter registered as O- donor in Chattogram.", timestamp: "1 hour ago", read: false },
  { id: "nt-3", type: "new_request", title: "New Blood Request", message: "Kamal Hossain submitted a request for A- blood.", timestamp: "3 hours ago", read: true },
  { id: "nt-4", type: "system", title: "Security Alert", message: "Suspicious donor account 'Fake Donor Account' flagged by system.", timestamp: "Yesterday", read: false },
];

/* ─────────────────── Sidebar Config ─────────────────── */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: FaChartPie, color: "#ff2d55" },
  { id: "users", label: "Users", icon: FaUsers, color: "#3b82f6" },
  { id: "donors", label: "Donors", icon: FaHeart, color: "#10b981" },
  { id: "requests", label: "Blood Requests", icon: FaTint, color: "#f59e0b" },
  { id: "statistics", label: "Statistics", icon: FaChartLine, color: "#8b5cf6" },
  { id: "notifications", label: "Notifications", icon: FaBell, color: "#ec4899" },
  { id: "settings", label: "Settings", icon: FaCog, color: "#6b7280" },
];

const PANEL_TITLES = {
  dashboard: "Admin Dashboard Overview",
  users: "User Account Management",
  donors: "Donor Directory & Verification",
  requests: "Blood Request Lifecycle",
  statistics: "System Analytics & Performance",
  notifications: "Notifications & System Alerts",
  settings: "Admin Settings",
};

/* ─────────────────── Orb ─────────────────── */
function Orb({ color, size, top, left }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        background: color,
        filter: "blur(120px)",
        opacity: 0.16,
        borderRadius: "50%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  MAIN ADMIN DASHBOARD COMPONENT                          */
/* ═══════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const { dark } = useContext(UIContext) || { dark: true };

const theme = {
  bg: dark
    ? "radial-gradient(circle at top,#1b1b2f,#080b14 70%)"
    : "linear-gradient(135deg,#fff7f7,#fdf2ff,#eef4ff)",
  text: dark ? "#ffffff" : "#111827",
  textSecondary: dark ? "rgba(255,255,255,.65)" : "rgba(17,24,39,.65)",
  card: dark ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.75)",
  cardHover: dark ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.9)",
  border: "1px solid " + (dark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.06)"),
  borderAccent: "1px solid " + (dark ? "rgba(255,45,85,.35)" : "rgba(255,45,85,.25)"),
  primary: "#ff2d55",
  gradient: "linear-gradient(135deg,#ff2d55,#ff7a59)",
};
  const { logout } = useContext(AuthContext) || {};
  const router = useRouter();

  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Core Data States
  const [users, setUsers] = useState(INITIAL_USERS);
  const [donors, setDonors] = useState(INITIAL_DONORS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [adminUser, setAdminUser] = useState({
    name: "Redora Master Admin",
    email: "admin@redora.org",
    phone: "01800000000",
    role: "System Admin",
  });

  const handleLogout = () => {
    if (logout) logout();
    router.push("/");
  };

  // User Handlers
  const handleUpdateUser = (id, updates) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggleBlockUser = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u
      )
    );
  };

  const handleAddUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  // Donor Handlers
  const handleVerifyDonor = (id) => {
    setDonors((prev) => prev.map((d) => (d.id === id ? { ...d, verified: true } : d)));
  };

  const handleRemoveDonor = (id) => {
    setDonors((prev) => prev.filter((d) => d.id !== id));
  };

  const handleToggleDonorAvailability = (id) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d))
    );
  };

  // Request Handlers
  const handleApproveRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
  };

  const handleCompleteRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Completed" } : r))
    );
  };

  const handleDeleteRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // Notification Handlers
  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Admin Profile Handler
  const handleSaveProfile = (updates) => {
    setAdminUser((prev) => ({ ...prev, ...updates }));
  };

  // Computed Quick Metrics
  const stats = {
    totalUsers: users.length,
    totalDonors: donors.length,
    activeDonors: donors.filter((d) => d.available).length,
    unverifiedDonors: donors.filter((d) => !d.verified).length,
    totalRequests: requests.length,
    activeRequests: requests.filter((r) => r.status === "Pending" || r.status === "Approved").length,
    emergencyRequests: requests.filter((r) => r.urgency === "Emergency" && r.status !== "Completed").length,
    totalDonations: requests.filter((r) => r.status === "Completed").length + 24,
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  /* ── Sidebar Dimensions ── */
  const SIDEBAR_W = collapsed ? 72 : 240;

  /* ── Theme Tokens ── */
  const bg = dark
    ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
    : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)";

  const sidebarBg = dark ? "rgba(11,15,26,0.92)" : "rgba(255,255,255,0.88)";
  const sidebarBorder = dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)";

  /* ── Nav Item Button ── */
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
        {!collapsed && (
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {item.label}
          </span>
        )}
        {item.id === "notifications" && unreadNotifsCount > 0 && !collapsed && (
          <span
            style={{
              marginLeft: "auto",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#ff2d55",
              color: "#fff",
              fontSize: 10,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {unreadNotifsCount}
          </span>
        )}
      </button>
    );
  };

  /* ── Sidebar Content Component ── */
  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "16px 10px" }}>
      {/* Logo & Collapse Toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          marginBottom: 24,
          paddingLeft: collapsed ? 0 : 4,
        }}
      >
        {!collapsed && (
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontWeight: 900, fontSize: 20, color: "#ff2d55", letterSpacing: "-0.02em" }}>
              REDORA <span style={{ fontSize: 11, color: dark ? "#9ca3af" : "#6b7280", fontWeight: 700 }}>ADMIN</span>
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
            background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            color: dark ? "#fff" : "#111",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = dark ? "rgba(255,45,85,0.15)" : "rgba(255,45,85,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
          }}
        >
          {collapsed ? <FaChevronRight style={{ fontSize: 12 }} /> : <FaChevronLeft style={{ fontSize: 12 }} />}
        </button>
      </div>

      {/* Admin Avatar Mini Card */}
      {!collapsed && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 14px",
            borderRadius: 14,
            marginBottom: 16,
            background: dark ? "rgba(255,45,85,0.08)" : "rgba(255,45,85,0.05)",
            border: "1px solid rgba(255,45,85,0.15)",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(255,45,85,0.15)",
              border: "2px solid rgba(255,45,85,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FaUserShield style={{ fontSize: 16, color: "#ff2d55" }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 13,
                color: dark ? "#fff" : "#111",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {adminUser.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <span style={{ fontSize: 11, color: "#ff2d55", fontWeight: 700 }}>System Admin</span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10b981",
                  display: "inline-block",
                  marginLeft: 4,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Nav Items List */}
      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Divider */}
      <div
        style={{
          height: 1,
          margin: "12px 4px",
          background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        }}
      />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 12,
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? "12px" : "12px 14px",
          borderRadius: 12,
          border: "1px solid rgba(255,45,85,0.25)",
          background: dark ? "rgba(255,45,85,0.07)" : "rgba(255,45,85,0.05)",
          color: "#ff2d55",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.25s",
          width: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#ff2d55";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.border = "1px solid #ff2d55";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = dark ? "rgba(255,45,85,0.07)" : "rgba(255,45,85,0.05)";
          e.currentTarget.style.color = "#ff2d55";
          e.currentTarget.style.border = "1px solid rgba(255,45,85,0.25)";
        }}
      >
        <FaSignOutAlt style={{ fontSize: 16, flexShrink: 0 }} />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: dark ? "#fff" : "#111827",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        display: "flex",
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
      }}
    >
      {/* Background Orbs matching Donor Dashboard */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <Orb color="#ff2d55" size="380px" top="-5%" left="15%" />
        <Orb color="#7c4dff" size="300px" top="50%" left="65%" />
        <Orb color="#3b82f6" size="240px" top="80%" left="5%" />
      </div>

      {/* ── SIDEBAR (Desktop) ── */}
      <aside
        style={{
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
      >
        <SidebarContent />
      </aside>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative", zIndex: 1 }}>
        {/* Top Header Bar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: dark ? "rgba(11,15,26,0.75)" : "rgba(255,255,255,0.7)",
            backdropFilter: "blur(18px)",
            borderBottom: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)",
            boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.05)",
          }}
        >
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              width: 38,
              height: 38,
              borderRadius: 10,
              border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              background: "transparent",
              color: dark ? "#fff" : "#111",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaBars style={{ fontSize: 16 }} />
          </button>

          {/* Page Title */}
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 800,
                color: dark ? "#fff" : "#111",
                letterSpacing: "-0.02em",
              }}
            >
              {PANEL_TITLES[active]}
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: dark ? "#6b7280" : "#9ca3af" }}>
              Redora Master Admin Portal
            </p>
          </div>

          {/* Right side controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* System Status Pill */}
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(255,45,85,0.12)",
                border: "1px solid rgba(255,45,85,0.25)",
                color: "#ff2d55",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FaShieldAlt /> Live System Active
            </div>

            {/* Notifications Icon Shortcut */}
            <button
              onClick={() => setActive("notifications")}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                color: dark ? "#fff" : "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
              }}
              title="Notifications"
            >
              <FaBell style={{ fontSize: 16 }} />
              {unreadNotifsCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ff2d55",
                  }}
                />
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Main Panel Body */}
        <main style={{ padding: "32px", flex: 1, maxWidth: 1400, width: "100%", margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {active === "dashboard" && (
                <OverviewPanel
                  stats={stats}
                  recentRequests={requests}
                  recentDonors={donors}
                  theme={theme}
                  dark={dark}
                  onNavigate={setActive}
                  onApproveRequest={handleApproveRequest}
                  onVerifyDonor={handleVerifyDonor}
                />
              )}

              {active === "users" && (
                <UserManagementPanel
                  users={users}
                  theme={theme}
                  dark={dark}
                  onUpdateUser={handleUpdateUser}
                  onDeleteUser={handleDeleteUser}
                  onToggleBlockUser={handleToggleBlockUser}
                  onAddUser={handleAddUser}
                />
              )}

              {active === "donors" && (
                <DonorManagementPanel
                  donors={donors}
                  theme={theme}
                  dark={dark}
                  onVerifyDonor={handleVerifyDonor}
                  onRemoveDonor={handleRemoveDonor}
                  onToggleAvailability={handleToggleDonorAvailability}
                />
              )}

              {active === "requests" && (
                <BloodRequestManagementPanel
                  requests={requests}
                  theme={theme}
                  dark={dark}
                  onApproveRequest={handleApproveRequest}
                  onCompleteRequest={handleCompleteRequest}
                  onDeleteRequest={handleDeleteRequest}
                />
              )}

              {active === "statistics" && (
                <StatisticsPanel stats={stats} theme={theme} dark={dark} />
              )}

              {active === "notifications" && (
                <NotificationsPanel
                  notifications={notifications}
                  theme={theme}
                  dark={dark}
                  onMarkRead={handleMarkRead}
                  onMarkAllRead={handleMarkAllRead}
                  onClearNotifications={handleClearNotifications}
                />
              )}

              {active === "settings" && (
                <SettingsPanel
                  adminUser={adminUser}
                  onLogout={handleLogout}
                  onSaveProfile={handleSaveProfile}
                  theme={theme}
                  dark={dark}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
