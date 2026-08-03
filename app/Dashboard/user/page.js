// app/dashboard/user/page.js
"use client";

import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UIContext } from "@/context/UIContext";
import { AuthContext } from "@/context/AuthContext";
import {
  FaHome, FaSearch, FaExclamationTriangle, FaClipboardList,
  FaHeart, FaHistory, FaBell, FaUser, FaCog, FaSignOutAlt,
  FaTint, FaChevronLeft, FaChevronRight, FaBars, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaEdit, FaCheck, FaTimes, FaTrash,
  FaCheckDouble, FaCircle, FaLock, FaEye, FaEyeSlash,
  FaChevronDown, FaChevronUp, FaRedo, FaCalendarAlt,
  FaHospital, FaUserFriends, FaSlidersH, FaFilter,
} from "react-icons/fa";

const API_BASE = "http://localhost:5000";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const CITIES = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Cumilla", "Mymensingh"];

/* ─────────────────── Sidebar Config ─────────────────── */
const NAV_ITEMS = [
  { id: "dashboard",      label: "Dashboard",         icon: FaHome,                color: "#ff2d55" },
  { id: "find-donor",     label: "Find Donor",         icon: FaSearch,              color: "#ff2d55" },
  { id: "emergency",      label: "Emergency Request",  icon: FaExclamationTriangle, color: "#ef4444" },
  { id: "my-requests",    label: "My Requests",        icon: FaClipboardList,       color: "#f59e0b" },
  { id: "saved-donors",   label: "Saved Donors",       icon: FaHeart,               color: "#ff2d55" },
  { id: "search-history", label: "Search History",     icon: FaHistory,             color: "#10b981" },
  { id: "notifications",  label: "Notifications",      icon: FaBell,                color: "#8b5cf6" },
  { id: "profile",        label: "Profile",            icon: FaUser,                color: "#3b82f6" },
  { id: "settings",       label: "Settings",           icon: FaCog,                 color: "#6b7280" },
];

const PANEL_TITLES = {
  dashboard:       "Dashboard",
  "find-donor":    "Find Blood Donors",
  emergency:       "Emergency Blood Request",
  "my-requests":   "My Requests",
  "saved-donors":  "Saved Donors",
  "search-history":"Search History",
  notifications:   "Notifications",
  profile:         "My Profile",
  settings:        "Settings",
};

/* ─────────────────── Mock Data ─────────────────── */
const MOCK_DONORS = [
  { id: 1, name: "Nuzhat Tasnia", bloodGroup: "A+",  city: "Dhaka", area: "Mirpur",     available: true,  phone: "01812345678" },
  { id: 2, name: "Karim Hassan",  bloodGroup: "B+",  city: "Dhaka", area: "Dhanmondi",  available: true,  phone: "01923456789" },
  { id: 3, name: "Sadia Islam",   bloodGroup: "O+",  city: "Dhaka", area: "Gulshan",    available: false, phone: "01634567890" },
  { id: 4, name: "Tanvir Ahmed",  bloodGroup: "A-",  city: "Dhaka", area: "Uttara",     available: true,  phone: "01745678901" },
  { id: 5, name: "Mitu Begum",    bloodGroup: "AB+", city: "Dhaka", area: "Rayer Bazar",available: true,  phone: "01856789012" },
  { id: 6, name: "Rafiq Miah",    bloodGroup: "O-",  city: "Dhaka", area: "Mirpur",     available: false, phone: "01567890123" },
];

const MOCK_REQUESTS_INIT = [
  { id: 1, patientName: "Father",   bloodGroup: "A+",  units: 2, hospital: "DMCH",     city: "Dhaka", area: "Mirpur",     status: "Active",    date: "05 Aug 2026", emergencyContact: "01712345678" },
  { id: 2, patientName: "Brother",  bloodGroup: "B+",  units: 1, hospital: "Evercare", city: "Dhaka", area: "Baridhara",  status: "Pending",   date: "10 Aug 2026", emergencyContact: "01712345678" },
  { id: 3, patientName: "Aunt",     bloodGroup: "O+",  units: 3, hospital: "Square",   city: "Dhaka", area: "Panthapath", status: "Fulfilled", date: "01 Jul 2026", emergencyContact: "01712345678" },
  { id: 4, patientName: "Neighbor", bloodGroup: "AB-", units: 1, hospital: "Ibn Sina", city: "Dhaka", area: "Uttara",     status: "Cancelled", date: "20 Jun 2026", emergencyContact: "01712345678" },
];

const MOCK_SAVED_INIT = [
  { id: 1, name: "Nuzhat Tasnia", bloodGroup: "A+",  city: "Dhaka", area: "Mirpur",     available: true, phone: "01812345678" },
  { id: 5, name: "Mitu Begum",    bloodGroup: "AB+", city: "Dhaka", area: "Rayer Bazar",available: true, phone: "01856789012" },
  { id: 4, name: "Tanvir Ahmed",  bloodGroup: "A-",  city: "Dhaka", area: "Uttara",     available: true, phone: "01745678901" },
];

const MOCK_HISTORY = [
  { id: 1, bloodGroup: "A+", city: "Dhaka",      area: "Mirpur",    resultsFound: 4, date: "03 Aug 2026" },
  { id: 2, bloodGroup: "B+", city: "Dhaka",      area: "Dhanmondi", resultsFound: 2, date: "28 Jul 2026" },
  { id: 3, bloodGroup: "O+", city: "Chattogram", area: "",           resultsFound: 7, date: "15 Jul 2026" },
];

const MOCK_NOTIFS_INIT = [
  { id: 1, type: "donor",    read: false, message: "New A+ donor found near Mirpur, Dhaka!", time: "5 min ago" },
  { id: 2, type: "request",  read: false, message: "Your emergency request for Father has been accepted.", time: "2 hours ago" },
  { id: 3, type: "fulfilled",read: true,  message: "Blood request for Aunt — Fulfilled. Thank you!", time: "3 days ago" },
  { id: 4, type: "general",  read: true,  message: "Redora now supports emergency SMS alerts.", time: "1 week ago" },
];

/* ─────────────────── Helpers ─────────────────── */
const STATUS_CFG = {
  Active:    { color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)"  },
  Pending:   { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.25)"  },
  Fulfilled: { color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)"  },
  Cancelled: { color: "#6b7280", bg: "rgba(107,114,128,0.12)", border: "rgba(107,114,128,0.25)" },
};

const BLOOD_COLORS = {
  "A+":"#ef4444","A-":"#dc2626","B+":"#f97316","B-":"#ea580c",
  "AB+":"#8b5cf6","AB-":"#7c3aed","O+":"#ff2d55","O-":"#be123c",
};

function BloodBadge({ group }) {
  const c = BLOOD_COLORS[group] || "#ff2d55";
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 11px", borderRadius:999, background:`${c}20`, color:c, fontWeight:800, fontSize:13, border:`1.5px solid ${c}40` }}>
      <FaTint style={{ fontSize:9 }} />{group}
    </span>
  );
}

function InputField({ label, value, onChange, type="text", placeholder="", options, color="#ff2d55", theme, dark }) {
  const inputStyle = {
    padding:"11px 14px", borderRadius:12,
    border:`1px solid ${color}40`,
    background: dark ? `${color}08` : `${color}06`,
    color: theme.text, fontSize:14, outline:"none",
    fontFamily:"inherit", transition:"all 0.2s", width:"100%",
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:12, fontWeight:600, color, letterSpacing:"0.06em", textTransform:"uppercase" }}>{label}</label>
      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, cursor:"pointer" }}
          onFocus={(e) => { e.target.style.borderColor=color; e.target.style.boxShadow=`0 0 0 3px ${color}20`; }}
          onBlur={(e)  => { e.target.style.borderColor=`${color}40`; e.target.style.boxShadow="none"; }}
        >
          <option value="">Select…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor=color; e.target.style.boxShadow=`0 0 0 3px ${color}20`; }}
          onBlur={(e)  => { e.target.style.borderColor=`${color}40`; e.target.style.boxShadow="none"; }}
        />
      )}
    </div>
  );
}

/* ─────────────────── Orb ─────────────────── */
function Orb({ color, size, top, left, opacity=0.18 }) {
  return (
    <div style={{ position:"absolute", width:size, height:size, top, left, background:color, filter:"blur(100px)", opacity, borderRadius:"50%", zIndex:0, pointerEvents:"none" }} />
  );
}

/* ═══════════════════════ PANELS ═══════════════════════ */

/* ── Overview Panel ── */
function OverviewPanel({ user, theme, dark, onNavigate, requests, savedDonors }) {
  const totalSearches       = MOCK_HISTORY.length;
  const activeRequests      = requests.filter((r) => r.status === "Active").length;
  const successfulRequests  = requests.filter((r) => r.status === "Fulfilled").length;

  const STATS = [
    { label:"Total Searches",      value:String(totalSearches),      icon:FaSearch,             color:"#ff2d55", bg:"rgba(255,45,85,0.12)"   },
    { label:"Active Requests",     value:String(activeRequests),      icon:FaExclamationTriangle,color:"#ef4444", bg:"rgba(239,68,68,0.12)"   },
    { label:"Saved Donors",        value:String(savedDonors.length),  icon:FaHeart,              color:"#ff2d55", bg:"rgba(255,45,85,0.12)"   },
    { label:"Successful Requests", value:String(successfulRequests),  icon:FaCheck,              color:"#10b981", bg:"rgba(16,185,129,0.12)"  },
  ];

  const card = { background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:20, padding:"24px 28px", transition:"all 0.3s ease" };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
      {/* Welcome Banner */}
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        style={{ ...card, background: dark ? "linear-gradient(135deg,rgba(255,45,85,0.18),rgba(124,77,255,0.12))" : "linear-gradient(135deg,rgba(255,45,85,0.08),rgba(124,77,255,0.06))", border:theme.borderAccent, position:"relative", overflow:"hidden" }}
      >
        <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", background:"#ff2d55", filter:"blur(90px)", opacity:0.08, top:"-30%", right:"5%", pointerEvents:"none" }} />
        <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:"#ff2d55", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Welcome back</div>
            <h1 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, color:theme.text, margin:0, letterSpacing:"-0.02em" }}>
              Hello, {user.name.split(" ")[0]} 👋
            </h1>
            <p style={{ margin:"8px 0 0", fontSize:15, color:theme.textSecondary, lineHeight:1.6 }}>
              Find the blood you need quickly. Every second counts.
            </p>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button onClick={() => onNavigate("find-donor")}
              style={{ padding:"12px 22px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#ff2d55,#ff7a59)", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 6px 20px rgba(255,45,85,0.3)", transition:"all 0.25s", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(255,45,85,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(255,45,85,0.3)"; }}
            ><FaSearch /> Find Donor</button>
            <button onClick={() => onNavigate("emergency")}
              style={{ padding:"12px 22px", borderRadius:12, border:theme.borderAccent, background:theme.primaryDim, color:"#ff2d55", fontWeight:700, fontSize:14, cursor:"pointer", transition:"all 0.25s", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="#ff2d55"; e.currentTarget.style.color="#fff"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background=theme.primaryDim; e.currentTarget.style.color="#ff2d55"; e.currentTarget.style.transform="translateY(0)"; }}
            ><FaExclamationTriangle /> Emergency</button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:16 }}>
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:i*0.08 }}
              style={{ ...card, display:"flex", flexDirection:"column", gap:14 }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.background=theme.cardHover; e.currentTarget.style.border=theme.borderAccent; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.background=theme.card; e.currentTarget.style.border=theme.border; }}
            >
              <div style={{ width:48, height:48, borderRadius:14, background:stat.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon style={{ fontSize:22, color:stat.color }} />
              </div>
              <div>
                <div style={{ fontSize:28, fontWeight:900, color:stat.color, letterSpacing:"-0.03em", lineHeight:1 }}>{stat.value}</div>
                <div style={{ fontSize:13, color:theme.textSecondary, marginTop:4 }}>{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Requests */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.4 }} style={{ ...card }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:10 }}>
          <h3 style={{ margin:0, fontSize:16, fontWeight:800, color:theme.text }}>Recent Blood Requests</h3>
          <button onClick={() => onNavigate("my-requests")}
            style={{ padding:"7px 16px", borderRadius:10, border:theme.borderAccent, background:theme.primaryDim, color:"#ff2d55", fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}
          >View All</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {requests.slice(0,3).map((req) => {
            const cfg = STATUS_CFG[req.status] || STATUS_CFG.Pending;
            return (
              <div key={req.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderRadius:12, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)", flexWrap:"wrap", gap:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <BloodBadge group={req.bloodGroup} />
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:theme.text }}>{req.patientName}</div>
                    <div style={{ fontSize:12, color:theme.textSecondary }}>{req.hospital} · {req.city}</div>
                  </div>
                </div>
                <span style={{ padding:"4px 12px", borderRadius:999, background:cfg.bg, color:cfg.color, fontSize:12, fontWeight:700, border:`1px solid ${cfg.border}` }}>{req.status}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Find Donor Panel ── */
function FindDonorPanel({ theme, dark, savedDonors, onSaveDonor, onRemoveDonor }) {
  const [filters, setFilters] = useState({ bloodGroup:"", city:"", area:"" });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (filters.bloodGroup) params.set("bloodGroup", filters.bloodGroup);
      if (filters.city)       params.set("city", filters.city);
      if (filters.area)       params.set("area", filters.area);

      const res = await fetch(`${API_BASE}/api/donor/search?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Could not search donors right now.");
        setResults([]);
        return;
      }

      setResults(data.donors);
    } catch (err) {
      console.error("Donor search error:", err);
      setError("Could not reach the server. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const isSaved = (id) => savedDonors.some((d) => d.id === id);
  const card = { background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:20, padding:"24px 28px" };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ ...card, background: dark ? "linear-gradient(135deg,rgba(255,45,85,0.14),rgba(124,77,255,0.10))" : "linear-gradient(135deg,rgba(255,45,85,0.07),rgba(124,77,255,0.04))", border:theme.borderAccent }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:"rgba(255,45,85,0.12)", display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(255,45,85,0.25)" }}>
            <FaSearch style={{ color:"#ff2d55", fontSize:18 }} />
          </div>
          <div>
            <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:theme.text }}>Search Donors</h2>
            <p style={{ margin:0, fontSize:13, color:theme.textSecondary }}>Filter by blood group, city, and area</p>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16 }}>
          <InputField label="Blood Group" value={filters.bloodGroup} onChange={(v) => setFilters({...filters,bloodGroup:v})} options={BLOOD_GROUPS} theme={theme} dark={dark} />
          <InputField label="City"        value={filters.city}       onChange={(v) => setFilters({...filters,city:v})}       options={CITIES}      theme={theme} dark={dark} />
          <InputField label="Area"        value={filters.area}       onChange={(v) => setFilters({...filters,area:v})}       placeholder="e.g. Mirpur" theme={theme} dark={dark} />
        </div>
        <button onClick={handleSearch}
          style={{ marginTop:20, padding:"13px 28px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#ff2d55,#ff7a59)", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:"0 6px 20px rgba(255,45,85,0.3)", transition:"all 0.25s", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(255,45,85,0.45)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(255,45,85,0.3)"; }}
        >
          {loading ? "Searching…" : <><FaFilter style={{ fontSize:13 }} /> Search Donors</>}
        </button>
      </motion.div>

      {error && (
        <div style={{ padding:"12px 16px", borderRadius:12, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", color:"#ef4444", fontSize:13, fontWeight:600 }}>
          {error}
        </div>
      )}

      {results !== null && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4 }}>
          <div style={{ fontSize:14, fontWeight:700, color:theme.textSecondary, marginBottom:14 }}>
            {results.length === 0 ? "No donors found for your search." : `${results.length} donor${results.length>1?"s":""} found`}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {results.map((donor, i) => (
              <motion.div key={donor.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35, delay:i*0.06 }}
                style={{ ...card, padding:"20px 22px", borderLeft:`4px solid ${donor.available?"#10b981":"#ef4444"}` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=dark?"0 12px 28px rgba(0,0,0,0.3)":"0 12px 28px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:"rgba(255,45,85,0.10)", border:"2px solid rgba(255,45,85,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <FaUser style={{ fontSize:17, color:"#ff2d55" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:theme.text }}>{donor.name}</div>
                      <div style={{ fontSize:12, color:theme.textSecondary }}><FaMapMarkerAlt style={{ fontSize:10, marginRight:3 }} />{donor.area}, {donor.city}</div>
                    </div>
                  </div>
                  <BloodBadge group={donor.bloodGroup} />
                </div>
                <div style={{ marginBottom:14 }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:999, fontSize:12, fontWeight:700, background:donor.available?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.12)", color:donor.available?"#10b981":"#ef4444", border:donor.available?"1px solid rgba(16,185,129,0.25)":"1px solid rgba(239,68,68,0.25)" }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"currentColor", display:"inline-block", boxShadow:donor.available?"0 0 6px currentColor":"none" }} />
                    {donor.available?"Available":"Unavailable"}
                  </span>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <a href={`tel:${donor.phone}`} style={{ flex:1, padding:"9px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#10b981,#059669)", color:"#fff", fontWeight:600, fontSize:13, cursor:"pointer", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                    <FaPhone style={{ fontSize:11 }} /> Contact
                  </a>
                  <button onClick={() => isSaved(donor.id) ? onRemoveDonor(donor.id) : onSaveDonor(donor)}
                    style={{ padding:"9px 14px", borderRadius:10, border:isSaved(donor.id)?"1.5px solid rgba(255,45,85,0.4)":"1.5px solid rgba(107,114,128,0.3)", background:isSaved(donor.id)?"rgba(255,45,85,0.10)":"transparent", color:isSaved(donor.id)?"#ff2d55":theme.textSecondary, cursor:"pointer", fontSize:15, transition:"all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color="#ff2d55"; e.currentTarget.style.borderColor="rgba(255,45,85,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color=isSaved(donor.id)?"#ff2d55":theme.textSecondary; e.currentTarget.style.borderColor=isSaved(donor.id)?"rgba(255,45,85,0.4)":"rgba(107,114,128,0.3)"; }}
                  ><FaHeart /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ── Emergency Request Panel ── */
function EmergencyPanel({ theme, dark, onNavigate }) {
  const [form, setForm] = useState({ patientName:"", bloodGroup:"", units:"1", hospital:"", city:"", area:"", emergencyContact:"", requiredDate:"" });
  const [submitted, setSubmitted] = useState(false);
  const upd = (k, v) => setForm((p) => ({ ...p, [k]:v }));

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3500); };
  const card = { background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:20, padding:"28px" };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ ...card, background: dark ? "linear-gradient(135deg,rgba(239,68,68,0.16),rgba(245,158,11,0.08))" : "linear-gradient(135deg,rgba(239,68,68,0.08),rgba(245,158,11,0.04))", border:"1px solid rgba(239,68,68,0.3)" }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:50, height:50, borderRadius:14, background:"rgba(239,68,68,0.12)", display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(239,68,68,0.3)" }}>
            <FaExclamationTriangle style={{ color:"#ef4444", fontSize:22 }} />
          </div>
          <div>
            <h2 style={{ margin:0, fontSize:20, fontWeight:800, color:theme.text }}>🚨 Emergency Blood Request</h2>
            <p style={{ margin:"3px 0 0", fontSize:13, color:theme.textSecondary }}>Fill in the details — we'll find matching donors immediately.</p>
          </div>
        </div>
      </motion.div>

      {submitted ? (
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4 }}
          style={{ ...card, textAlign:"center", padding:"48px 28px" }}
        >
          <div style={{ fontSize:60, marginBottom:16 }}>✅</div>
          <h3 style={{ margin:"0 0 8px", fontSize:22, fontWeight:800, color:"#10b981" }}>Request Submitted!</h3>
          <p style={{ color:theme.textSecondary, margin:0 }}>We're finding matching donors. You'll be notified shortly.</p>
          <button onClick={() => onNavigate("my-requests")} style={{ marginTop:20, padding:"11px 24px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#10b981,#059669)", color:"#fff", fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>View My Requests</button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.1 }} style={{ ...card }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
              <InputField label="Patient Name"      value={form.patientName}      onChange={(v) => upd("patientName",v)}      placeholder="Full name"    color="#ef4444" theme={theme} dark={dark} />
              <InputField label="Blood Group"       value={form.bloodGroup}       onChange={(v) => upd("bloodGroup",v)}       options={BLOOD_GROUPS}     color="#ef4444" theme={theme} dark={dark} />
              <InputField label="Required Units"    value={form.units}            onChange={(v) => upd("units",v)}            type="number" placeholder="e.g. 2" color="#ef4444" theme={theme} dark={dark} />
              <InputField label="Hospital Name"     value={form.hospital}         onChange={(v) => upd("hospital",v)}         placeholder="e.g. DMCH"    color="#ef4444" theme={theme} dark={dark} />
              <InputField label="City"              value={form.city}             onChange={(v) => upd("city",v)}             options={CITIES}           color="#ef4444" theme={theme} dark={dark} />
              <InputField label="Area"              value={form.area}             onChange={(v) => upd("area",v)}             placeholder="e.g. Mirpur"  color="#ef4444" theme={theme} dark={dark} />
              <InputField label="Emergency Contact" value={form.emergencyContact} onChange={(v) => upd("emergencyContact",v)} type="tel" placeholder="01XXXXXXXXX" color="#ef4444" theme={theme} dark={dark} />
              <InputField label="Required Date"     value={form.requiredDate}     onChange={(v) => upd("requiredDate",v)}     type="date"                color="#ef4444" theme={theme} dark={dark} />
            </div>
            <button type="submit"
              style={{ marginTop:24, padding:"13px 30px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#ef4444,#dc2626)", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:"0 6px 20px rgba(239,68,68,0.35)", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit", transition:"all 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(239,68,68,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(239,68,68,0.35)"; }}
            ><FaExclamationTriangle style={{ fontSize:14 }} /> Submit Emergency Request</button>
          </form>
        </motion.div>
      )}
    </div>
  );
}

/* ── My Requests Panel ── */
function MyRequestsPanel({ requests, onDelete, theme, dark }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const card = { background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:20, padding:"24px 28px" };
  const startEdit = (req) => { setEditId(req.id); setEditForm({...req}); };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ ...card, background: dark ? "linear-gradient(135deg,rgba(245,158,11,0.14),rgba(255,45,85,0.08))" : "linear-gradient(135deg,rgba(245,158,11,0.07),rgba(255,45,85,0.04))", border:"1px solid rgba(245,158,11,0.25)", display:"flex", alignItems:"center", gap:14 }}
      >
        <div style={{ width:48, height:48, borderRadius:14, background:"rgba(245,158,11,0.12)", display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(245,158,11,0.25)" }}>
          <FaClipboardList style={{ color:"#f59e0b", fontSize:20 }} />
        </div>
        <div>
          <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:theme.text }}>My Blood Requests</h2>
          <p style={{ margin:"3px 0 0", fontSize:13, color:theme.textSecondary }}>Track the status of all your blood requests.</p>
        </div>
      </motion.div>

      {requests.length === 0 ? (
        <div style={{ ...card, textAlign:"center", padding:"48px" }}><div style={{ fontSize:48, marginBottom:12 }}>📋</div><p style={{ color:theme.textSecondary }}>No blood requests yet.</p></div>
      ) : (
        requests.map((req, i) => {
          const cfg = STATUS_CFG[req.status] || STATUS_CFG.Pending;
          const isEditing = editId === req.id;
          return (
            <motion.div key={req.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:i*0.07 }}
              style={{ ...card, borderLeft:`4px solid ${cfg.color}` }}
            >
              {isEditing ? (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14 }}>
                    <InputField label="Patient Name" value={editForm.patientName} onChange={(v) => setEditForm({...editForm,patientName:v})} color="#f59e0b" theme={theme} dark={dark} />
                    <InputField label="Blood Group"  value={editForm.bloodGroup}  onChange={(v) => setEditForm({...editForm,bloodGroup:v})}  options={BLOOD_GROUPS} color="#f59e0b" theme={theme} dark={dark} />
                    <InputField label="Units"        value={String(editForm.units)} onChange={(v) => setEditForm({...editForm,units:v})}     type="number" color="#f59e0b" theme={theme} dark={dark} />
                    <InputField label="Hospital"     value={editForm.hospital}    onChange={(v) => setEditForm({...editForm,hospital:v})}    color="#f59e0b" theme={theme} dark={dark} />
                    <InputField label="City"         value={editForm.city}        onChange={(v) => setEditForm({...editForm,city:v})}        options={CITIES} color="#f59e0b" theme={theme} dark={dark} />
                    <InputField label="Area"         value={editForm.area}        onChange={(v) => setEditForm({...editForm,area:v})}        color="#f59e0b" theme={theme} dark={dark} />
                  </div>
                  <div style={{ display:"flex", gap:10, marginTop:16 }}>
                    <button onClick={() => setEditId(null)} style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 20px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#ff2d55,#ff7a59)", color:"#fff", fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}><FaCheck /> Save</button>
                    <button onClick={() => setEditId(null)} style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:10, border:theme.border, background:"transparent", color:theme.textSecondary, fontWeight:600, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}><FaTimes /> Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <BloodBadge group={req.bloodGroup} />
                      <div>
                        <div style={{ fontWeight:800, fontSize:16, color:theme.text }}>{req.patientName}</div>
                        <div style={{ fontSize:12, color:theme.textSecondary, marginTop:2 }}><FaHospital style={{ fontSize:10, marginRight:4 }} />{req.hospital} · {req.city}</div>
                      </div>
                    </div>
                    <span style={{ padding:"5px 14px", borderRadius:999, background:cfg.bg, color:cfg.color, fontSize:12, fontWeight:700, border:`1px solid ${cfg.border}` }}>{req.status}</span>
                  </div>
                  <div style={{ display:"flex", gap:16, flexWrap:"wrap", fontSize:13, color:theme.textSecondary, marginBottom:14 }}>
                    <span><FaTint style={{ fontSize:10, marginRight:4, color:"#ff2d55" }} />{req.units} unit{req.units>1?"s":""}</span>
                    <span><FaMapMarkerAlt style={{ fontSize:10, marginRight:4 }} />{req.area}, {req.city}</span>
                    <span><FaCalendarAlt style={{ fontSize:10, marginRight:4 }} />{req.date}</span>
                    <span><FaPhone style={{ fontSize:10, marginRight:4 }} />{req.emergencyContact}</span>
                  </div>
                  {(req.status==="Pending"||req.status==="Active") && (
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => startEdit(req)} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:10, border:theme.borderAccent, background:theme.primaryDim, color:"#ff2d55", fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}><FaEdit /> Edit</button>
                      <button onClick={() => onDelete(req.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:10, border:"1.5px solid rgba(239,68,68,0.35)", background:"rgba(239,68,68,0.08)", color:"#ef4444", fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}><FaTrash /> Delete</button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
}

/* ── Saved Donors Panel ── */
function SavedDonorsPanel({ savedDonors, onRemove, theme, dark }) {
  const card = { background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:20, padding:"24px 28px" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ ...card, background: dark ? "linear-gradient(135deg,rgba(255,45,85,0.14),rgba(124,77,255,0.10))" : "linear-gradient(135deg,rgba(255,45,85,0.07),rgba(124,77,255,0.04))", border:theme.borderAccent, display:"flex", alignItems:"center", gap:14 }}
      >
        <div style={{ width:48, height:48, borderRadius:14, background:"rgba(255,45,85,0.12)", display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(255,45,85,0.25)" }}>
          <FaHeart style={{ color:"#ff2d55", fontSize:20 }} />
        </div>
        <div>
          <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:theme.text }}>Saved Donors</h2>
          <p style={{ margin:"3px 0 0", fontSize:13, color:theme.textSecondary }}>{savedDonors.length} donor{savedDonors.length!==1?"s":""} saved</p>
        </div>
      </motion.div>

      {savedDonors.length === 0 ? (
        <div style={{ ...card, textAlign:"center", padding:"48px" }}><div style={{ fontSize:48, marginBottom:12 }}>❤️</div><p style={{ color:theme.textSecondary }}>No saved donors yet.</p></div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
          {savedDonors.map((donor, i) => (
            <motion.div key={donor.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35, delay:i*0.07 }}
              style={{ ...card, padding:"20px 22px", borderLeft:`4px solid ${donor.available?"#10b981":"#ef4444"}` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=dark?"0 12px 28px rgba(0,0,0,0.3)":"0 12px 28px rgba(0,0,0,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:"rgba(255,45,85,0.10)", border:"2px solid rgba(255,45,85,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <FaUser style={{ fontSize:17, color:"#ff2d55" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:theme.text }}>{donor.name}</div>
                    <div style={{ fontSize:12, color:theme.textSecondary }}><FaMapMarkerAlt style={{ fontSize:10, marginRight:3 }} />{donor.area}, {donor.city}</div>
                  </div>
                </div>
                <BloodBadge group={donor.bloodGroup} />
              </div>
              <div style={{ marginBottom:14 }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:999, fontSize:12, fontWeight:700, background:donor.available?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.12)", color:donor.available?"#10b981":"#ef4444", border:donor.available?"1px solid rgba(16,185,129,0.25)":"1px solid rgba(239,68,68,0.25)" }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"currentColor", display:"inline-block" }} />
                  {donor.available?"Available":"Unavailable"}
                </span>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <a href={`tel:${donor.phone}`} style={{ flex:1, padding:"9px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#10b981,#059669)", color:"#fff", fontWeight:600, fontSize:13, textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  <FaPhone style={{ fontSize:11 }} /> Contact
                </a>
                <button onClick={() => onRemove(donor.id)} style={{ padding:"9px 14px", borderRadius:10, border:"1.5px solid rgba(239,68,68,0.35)", background:"rgba(239,68,68,0.08)", color:"#ef4444", cursor:"pointer", fontSize:15, transition:"all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background="#ef4444"; e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background="rgba(239,68,68,0.08)"; e.currentTarget.style.color="#ef4444"; }}
                ><FaTrash /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Search History Panel ── */
function SearchHistoryPanel({ theme, dark, onNavigate }) {
  const [history, setHistory] = useState(MOCK_HISTORY);
  const card = { background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:20, padding:"24px 28px" };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ ...card, background: dark ? "linear-gradient(135deg,rgba(16,185,129,0.14),rgba(255,45,85,0.08))" : "linear-gradient(135deg,rgba(16,185,129,0.07),rgba(255,45,85,0.04))", border:"1px solid rgba(16,185,129,0.25)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:48, height:48, borderRadius:14, background:"rgba(16,185,129,0.12)", display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(16,185,129,0.25)" }}>
            <FaHistory style={{ color:"#10b981", fontSize:20 }} />
          </div>
          <div>
            <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:theme.text }}>Search History</h2>
            <p style={{ margin:"3px 0 0", fontSize:13, color:theme.textSecondary }}>{history.length} previous searches</p>
          </div>
        </div>
        {history.length>0 && (
          <button onClick={() => setHistory([])} style={{ padding:"8px 16px", borderRadius:10, border:"1.5px solid rgba(239,68,68,0.3)", background:"rgba(239,68,68,0.08)", color:"#ef4444", fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>Clear All</button>
        )}
      </motion.div>

      {history.length===0 ? (
        <div style={{ ...card, textAlign:"center", padding:"48px" }}><div style={{ fontSize:48, marginBottom:12 }}>🔍</div><p style={{ color:theme.textSecondary }}>No search history yet.</p></div>
      ) : (
        history.map((h, i) => (
          <motion.div key={h.id} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.35, delay:i*0.06 }}
            style={{ ...card, padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, transition:"transform 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translateX(4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform="translateX(0)"; }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:"rgba(16,185,129,0.10)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <FaSearch style={{ fontSize:15, color:"#10b981" }} />
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                  <BloodBadge group={h.bloodGroup} />
                  <span style={{ fontSize:13, fontWeight:600, color:theme.text }}><FaMapMarkerAlt style={{ fontSize:10, marginRight:4, color:theme.textSecondary }} />{h.area?`${h.area}, `:""}{h.city}</span>
                </div>
                <div style={{ fontSize:12, color:theme.textSecondary, marginTop:3 }}>{h.resultsFound} donor{h.resultsFound!==1?"s":""} found · {h.date}</div>
              </div>
            </div>
            <button onClick={() => onNavigate("find-donor")}
              style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 16px", borderRadius:10, border:"1.5px solid rgba(16,185,129,0.35)", background:"rgba(16,185,129,0.08)", color:"#10b981", fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="#10b981"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="rgba(16,185,129,0.08)"; e.currentTarget.style.color="#10b981"; }}
            ><FaRedo style={{ fontSize:11 }} /> Repeat</button>
          </motion.div>
        ))
      )}
    </div>
  );
}

/* ── Notifications Panel ── */
const NOTIF_CFG = {
  donor:    { icon:FaSearch,        color:"#ff2d55", bg:"rgba(255,45,85,0.10)"  },
  request:  { icon:FaClipboardList, color:"#f59e0b", bg:"rgba(245,158,11,0.10)" },
  fulfilled:{ icon:FaCheck,         color:"#10b981", bg:"rgba(16,185,129,0.10)" },
  general:  { icon:FaBell,          color:"#8b5cf6", bg:"rgba(139,92,246,0.10)" },
};

function NotificationsPanel({ theme, dark }) {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS_INIT);
  const unreadCount = notifs.filter((n) => !n.read).length;
  const markRead = (id) => setNotifs(notifs.map((n) => n.id===id?{...n,read:true}:n));
  const markAll  = () => setNotifs(notifs.map((n) => ({...n,read:true})));
  const card = { background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:20 };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ ...card, padding:"22px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, background: dark ? "linear-gradient(135deg,rgba(255,45,85,0.12),rgba(124,77,255,0.08))" : "linear-gradient(135deg,rgba(255,45,85,0.06),rgba(124,77,255,0.04))", border:theme.borderAccent }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:48, height:48, borderRadius:14, background:"rgba(255,45,85,0.12)", display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(255,45,85,0.25)", position:"relative" }}>
            <FaBell style={{ fontSize:20, color:"#ff2d55" }} />
            {unreadCount>0 && <div style={{ position:"absolute", top:-6, right:-6, width:18, height:18, borderRadius:"50%", background:"#ef4444", color:"#fff", fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{unreadCount}</div>}
          </div>
          <div>
            <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:theme.text }}>Notifications</h2>
            <p style={{ margin:"3px 0 0", fontSize:13, color:theme.textSecondary }}>
              {unreadCount>0 ? <><strong style={{ color:"#ff2d55" }}>{unreadCount} unread</strong> notifications</> : "All caught up!"}
            </p>
          </div>
        </div>
        {unreadCount>0 && (
          <button onClick={markAll}
            style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:10, border:theme.borderAccent, background:theme.primaryDim, color:"#ff2d55", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="#ff2d55"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background=theme.primaryDim; e.currentTarget.style.color="#ff2d55"; }}
          ><FaCheckDouble style={{ fontSize:12 }} /> Mark all read</button>
        )}
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4, delay:0.1 }} style={{ ...card, overflow:"hidden" }}>
        {notifs.map((notif, i) => {
          const cfg = NOTIF_CFG[notif.type] || NOTIF_CFG.general;
          const Icon = cfg.icon;
          return (
            <motion.div key={notif.id} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.3, delay:i*0.06 }}
              onClick={() => markRead(notif.id)}
              style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"18px 24px", borderBottom: i<notifs.length-1 ? dark?"1px solid rgba(255,255,255,0.04)":"1px solid rgba(0,0,0,0.04)" : "none", cursor:"pointer", background: !notif.read ? dark?"rgba(255,45,85,0.04)":"rgba(255,45,85,0.03)" : "transparent", transition:"background 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background=dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background=!notif.read?dark?"rgba(255,45,85,0.04)":"rgba(255,45,85,0.03)":"transparent"; }}
            >
              <div style={{ width:40, height:40, borderRadius:12, background:cfg.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon style={{ fontSize:16, color:cfg.color }} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ margin:0, fontSize:14, color:theme.text, lineHeight:1.5, fontWeight:!notif.read?600:400 }}>{notif.message}</p>
                <div style={{ marginTop:5, fontSize:12, color:theme.textSecondary }}>{notif.time}</div>
              </div>
              {!notif.read && <FaCircle style={{ fontSize:8, color:"#ff2d55", flexShrink:0, marginTop:6 }} />}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Profile Panel ── */
function ProfilePanel({ user, onUpdate, theme, dark }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name:user.name, email:user.email, phone:user.phone, city:user.city, area:user.area });
  const card = { background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:20, padding:"28px" };
  const handleSave = () => { onUpdate(form); setEditing(false); };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ ...card, background: dark ? "linear-gradient(135deg,rgba(255,45,85,0.14),rgba(124,77,255,0.10))" : "linear-gradient(135deg,rgba(255,45,85,0.07),rgba(124,77,255,0.04))", border:theme.borderAccent, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}
      >
        <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(255,45,85,0.12)", border:"3px solid rgba(255,45,85,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <FaUser style={{ fontSize:36, color:"#ff2d55" }} />
        </div>
        <div style={{ flex:1 }}>
          <h2 style={{ margin:0, fontSize:22, fontWeight:800, color:theme.text, letterSpacing:"-0.02em" }}>{user.name}</h2>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 14px", borderRadius:999, background:theme.primaryDim, color:"#ff2d55", fontWeight:700, fontSize:13, border:theme.borderAccent }}>
              <FaUserFriends style={{ fontSize:11 }} /> Blood Seeker
            </span>
          </div>
          <div style={{ marginTop:6, fontSize:13, color:theme.textSecondary }}>Member since {user.registrationDate}</div>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)}
            style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 20px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#ff2d55,#ff7a59)", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 4px 16px rgba(255,45,85,0.3)", transition:"all 0.25s", fontFamily:"inherit" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(255,45,85,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(255,45,85,0.3)"; }}
          ><FaEdit /> Edit Profile</button>
        )}
      </motion.div>

      {editing ? (
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }} style={{ ...card }}>
          <h3 style={{ margin:"0 0 20px", fontSize:17, fontWeight:700, color:theme.text }}>Edit Profile</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
            <InputField label="Full Name" value={form.name}  onChange={(v) => setForm({...form,name:v})}  theme={theme} dark={dark} />
            <InputField label="Phone"    value={form.phone} onChange={(v) => setForm({...form,phone:v})} type="tel" theme={theme} dark={dark} />
            <InputField label="Email"    value={form.email} onChange={(v) => setForm({...form,email:v})} type="email" theme={theme} dark={dark} />
            <InputField label="City"     value={form.city}  onChange={(v) => setForm({...form,city:v})}  options={CITIES} theme={theme} dark={dark} />
            <InputField label="Area"     value={form.area}  onChange={(v) => setForm({...form,area:v})}  theme={theme} dark={dark} />
          </div>
          <div style={{ display:"flex", gap:12, marginTop:20 }}>
            <button onClick={handleSave} style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 24px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#ff2d55,#ff7a59)", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 4px 16px rgba(255,45,85,0.3)", fontFamily:"inherit" }}><FaCheck /> Save Changes</button>
            <button onClick={() => setEditing(false)} style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 20px", borderRadius:12, border:theme.border, background:"transparent", color:theme.textSecondary, fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}><FaTimes /> Cancel</button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }} style={{ ...card }}>
          <h3 style={{ margin:"0 0 4px", fontSize:17, fontWeight:700, color:theme.text }}>Personal Information</h3>
          {[
            { icon:FaUser,        label:"Full Name",    value:user.name },
            { icon:FaEnvelope,    label:"Email",        value:user.email },
            { icon:FaPhone,       label:"Phone",        value:user.phone },
            { icon:FaMapMarkerAlt,label:"Location",     value:`${user.city}, ${user.area}` },
            { icon:FaCalendarAlt, label:"Member Since", value:user.registrationDate },
          ].map(({ icon:Icon, label, value }) => (
            <div key={label} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 0", borderBottom: dark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"rgba(255,45,85,0.10)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon style={{ fontSize:15, color:"#ff2d55" }} />
              </div>
              <div>
                <div style={{ fontSize:11, fontWeight:600, color:theme.textSecondary, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:3 }}>{label}</div>
                <div style={{ fontSize:15, fontWeight:600, color:theme.text }}>{value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ── Settings Panel ── */
function SettingSection({ title, icon:Icon, color, bg, children, dark, theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:theme.card, backdropFilter:"blur(16px)", border:theme.border, borderRadius:18, overflow:"hidden", transition:"all 0.3s ease" }}>
      <button onClick={() => setOpen(!open)} style={{ width:"100%", padding:"20px 24px", display:"flex", alignItems:"center", gap:14, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", borderBottom: open ? dark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.06)" : "none" }}>
        <div style={{ width:42, height:42, borderRadius:12, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <Icon style={{ fontSize:18, color }} />
        </div>
        <span style={{ flex:1, textAlign:"left", fontWeight:700, fontSize:16, color:theme.text }}>{title}</span>
        {open ? <FaChevronUp style={{ color:theme.textSecondary, fontSize:14 }} /> : <FaChevronDown style={{ color:theme.textSecondary, fontSize:14 }} />}
      </button>
      {open && (
        <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} transition={{ duration:0.3 }} style={{ padding:"20px 24px" }}>
          {children}
        </motion.div>
      )}
    </div>
  );
}

function PasswordInput({ label, value, onChange, theme, dark }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:12, fontWeight:600, color:"#ff2d55", letterSpacing:"0.06em", textTransform:"uppercase" }}>{label}</label>
      <div style={{ position:"relative" }}>
        <input type={show?"text":"password"} value={value} onChange={onChange}
          style={{ width:"100%", padding:"12px 42px 12px 14px", borderRadius:12, border:"1px solid rgba(255,45,85,0.3)", background: dark ? "rgba(255,45,85,0.04)" : "rgba(255,45,85,0.03)", color:theme.text, fontSize:14, outline:"none", fontFamily:"inherit", transition:"all 0.2s", boxSizing:"border-box" }}
          onFocus={(e) => { e.target.style.borderColor="#ff2d55"; e.target.style.boxShadow="0 0 0 3px rgba(255,45,85,0.12)"; }}
          onBlur={(e)  => { e.target.style.borderColor="rgba(255,45,85,0.3)"; e.target.style.boxShadow="none"; }}
        />
        <button type="button" onClick={() => setShow(!show)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:theme.textSecondary, fontSize:15, padding:0 }}>
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

function TogglePref({ label, description, value, onChange, theme }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"14px 0", borderBottom:"1px solid rgba(128,128,128,0.1)" }}>
      <div>
        <div style={{ fontWeight:600, fontSize:14, color:theme.text }}>{label}</div>
        <div style={{ fontSize:12, color:theme.textSecondary, marginTop:2 }}>{description}</div>
      </div>
      <button onClick={() => onChange(!value)} style={{ width:50, height:28, borderRadius:999, border:"none", background: value?"linear-gradient(135deg,#ff2d55,#ff7a59)":"rgba(128,128,128,0.2)", cursor:"pointer", position:"relative", transition:"all 0.3s", flexShrink:0 }}>
        <div style={{ width:20, height:20, borderRadius:"50%", background:"#fff", position:"absolute", top:4, left:value?26:4, transition:"left 0.3s", boxShadow:"0 2px 6px rgba(0,0,0,0.15)" }} />
      </button>
    </div>
  );
}

function SettingsPanel({ theme, dark, onChangePassword }) {
  const [pw, setPw]     = useState({ current:"", newPw:"", confirm:"" });
  const [pwStatus, setPwStatus] = useState(null); // { type: "success"|"error", message }
  const [pwSaving, setPwSaving] = useState(false);
  const [prefs, setPrefs] = useState({ donorFoundAlerts:true, requestUpdates:true, fulfilledNotif:true, emailNotif:true });
  const [lang, setLang] = useState("en");
  const [saved, setSaved] = useState(null);
  const handleSave = (section) => { setSaved(section); setTimeout(() => setSaved(null), 2500); };

  const handlePasswordSave = async () => {
    setPwStatus(null);

    if (!pw.current || !pw.newPw || !pw.confirm) {
      setPwStatus({ type:"error", message:"Please fill in all three fields." });
      return;
    }
    if (pw.newPw.length < 6) {
      setPwStatus({ type:"error", message:"New password must be at least 6 characters." });
      return;
    }
    if (pw.newPw !== pw.confirm) {
      setPwStatus({ type:"error", message:"New password and confirmation don't match." });
      return;
    }

    setPwSaving(true);
    const result = await onChangePassword(pw.current, pw.newPw);
    setPwSaving(false);

    if (result.success) {
      setPwStatus({ type:"success", message: result.message });
      setPw({ current:"", newPw:"", confirm:"" });
    } else {
      setPwStatus({ type:"error", message: result.message });
    }
  };

  const SaveBtn = ({ section }) => (
    <button onClick={() => handleSave(section)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:11, border:"none", background: saved===section?"linear-gradient(135deg,#10b981,#059669)":"linear-gradient(135deg,#ff2d55,#ff7a59)", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", boxShadow: saved===section?"0 4px 14px rgba(16,185,129,0.35)":"0 4px 14px rgba(255,45,85,0.3)", transition:"all 0.3s" }}>
      <FaCheck /> {saved===section?"Saved!":"Save Changes"}
    </button>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:660 }}>
      <motion.h2 initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ margin:"0 0 4px", fontSize:22, fontWeight:800, color:theme.text, letterSpacing:"-0.02em" }}>Account Settings</motion.h2>

      <SettingSection title="Change Password" icon={FaLock} color="#ff2d55" bg="rgba(255,45,85,0.10)" dark={dark} theme={theme}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <PasswordInput label="Current Password"     value={pw.current} onChange={(e) => setPw({...pw,current:e.target.value})} theme={theme} dark={dark} />
          <PasswordInput label="New Password"         value={pw.newPw}   onChange={(e) => setPw({...pw,newPw:e.target.value})}   theme={theme} dark={dark} />
          <PasswordInput label="Confirm New Password" value={pw.confirm}  onChange={(e) => setPw({...pw,confirm:e.target.value})}  theme={theme} dark={dark} />
          {pwStatus && (
            <div style={{ fontSize:13, fontWeight:600, color: pwStatus.type==="success" ? "#10b981" : "#ef4444" }}>
              {pwStatus.message}
            </div>
          )}
          <button onClick={handlePasswordSave} disabled={pwSaving}
            style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:11, border:"none", width:"fit-content",
              background: pwStatus?.type==="success" ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#ff2d55,#ff7a59)",
              color:"#fff", fontWeight:700, fontSize:13, cursor: pwSaving?"default":"pointer", fontFamily:"inherit",
              boxShadow: pwStatus?.type==="success" ? "0 4px 14px rgba(16,185,129,0.35)" : "0 4px 14px rgba(255,45,85,0.3)",
              opacity: pwSaving?0.7:1, transition:"all 0.3s" }}>
            <FaCheck /> {pwSaving ? "Saving…" : pwStatus?.type==="success" ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </SettingSection>

      <SettingSection title="Notification Preferences" icon={FaBell} color="#ff2d55" bg="rgba(255,45,85,0.10)" dark={dark} theme={theme}>
        <div>
          <TogglePref label="Donor Found Alerts"    description="Notify when a matching donor is found nearby"      value={prefs.donorFoundAlerts} onChange={(v) => setPrefs({...prefs,donorFoundAlerts:v})} theme={theme} />
          <TogglePref label="Request Status Updates" description="Updates on your blood request status changes"      value={prefs.requestUpdates}   onChange={(v) => setPrefs({...prefs,requestUpdates:v})}   theme={theme} />
          <TogglePref label="Fulfillment Notifications" description="Alert when blood request is fulfilled"         value={prefs.fulfilledNotif}   onChange={(v) => setPrefs({...prefs,fulfilledNotif:v})}   theme={theme} />
          <TogglePref label="Email Notifications"    description="Send notifications to your email address"         value={prefs.emailNotif}       onChange={(v) => setPrefs({...prefs,emailNotif:v})}       theme={theme} />
          <div style={{ marginTop:16 }}><SaveBtn section="prefs" /></div>
        </div>
      </SettingSection>

      <SettingSection title="Language" icon={FaSlidersH} color="#ff2d55" bg="rgba(255,45,85,0.10)" dark={dark} theme={theme}>
        <div style={{ display:"flex", gap:12 }}>
          {[{ code:"en", label:"English" },{ code:"bn", label:"বাংলা" }].map((l) => (
            <button key={l.code} onClick={() => setLang(l.code)}
              style={{ padding:"10px 24px", borderRadius:12, border: lang===l.code?"2px solid #ff2d55":theme.border, background: lang===l.code?theme.primaryDim:"transparent", color: lang===l.code?"#ff2d55":theme.textSecondary, fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}
            >{l.label}</button>
          ))}
        </div>
      </SettingSection>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                         */
/* ═══════════════════════════════════════════════════════ */
export default function UserDashboard() {
  const { dark } = useContext(UIContext) || { dark: false };
  const theme = dark ? {
    background: "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)",
    text: "#ffffff", textSecondary: "#9ca3af",
    card: "rgba(255,255,255,0.04)", cardHover: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.06)", borderAccent: "1px solid rgba(255,45,85,0.25)",
    primary: "#ff2d55", primaryDim: "rgba(255,45,85,0.2)", primaryHover: "#ff1744",
  } : {
    background: "linear-gradient(135deg,#fff7f7,#fdf2ff,#eef4ff)",
    text: "#111827", textSecondary: "#6b7280",
    card: "rgba(255,255,255,0.75)", cardHover: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(0,0,0,0.06)", borderAccent: "1px solid rgba(255,45,85,0.15)",
    primary: "#ff2d55", primaryDim: "rgba(255,45,85,0.1)", primaryHover: "#ff1744",
  };
  const { logout } = useContext(AuthContext) || {};
  const router = useRouter();

  const [active, setActive]       = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [loadError, setLoadError] = useState("");
  const [requests, setRequests]   = useState(MOCK_REQUESTS_INIT);
  const [savedDonors, setSaved]   = useState(MOCK_SAVED_INIT);

  // Fetch the logged-in user's real profile from the backend on mount.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.status === 401) {
          // Token missing/invalid/expired — need to log in again.
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }

        if (!res.ok || !data.success) {
          console.error("user/me failed:", res.status, data);
          setLoadError(
            (data.message || `Server error (${res.status})`) +
              (data.debug ? ` — ${data.debug}` : "")
          );
          setLoading(false);
          return;
        }

        const u = data.user;
        setUser({
          ...u,
          registrationDate: u.created_at
            ? new Date(u.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "",
        });
      } catch (err) {
        console.error("Failed to load user profile:", err);
        setLoadError("Could not reach the server. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (logout) logout();
    router.push("/");
  };

  // Saves profile edits to the backend, then re-syncs with the confirmed
  // row from the DB (keeps registrationDate/created_at mapping correct).
  const handleUserUpdate = async (updates) => {
    setUser((prev) => ({ ...prev, ...updates })); // optimistic UI

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/user/me`, {
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

      const u = data.user;
      setUser((prev) => ({
        ...prev,
        ...u,
        registrationDate: u.created_at
          ? new Date(u.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : prev?.registrationDate,
      }));
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Could not reach the server. Please try again.");
    }
  };

  const handleDeleteRequest = (id) => setRequests((p) => p.filter((r) => r.id!==id));
  const handleSaveDonor     = (d)  => { if (!savedDonors.some((s) => s.id===d.id)) setSaved((p) => [...p,d]); };
  const handleRemoveDonor   = (id) => setSaved((p) => p.filter((d) => d.id!==id));

  // Returns { success, message } so SettingsPanel can show its own inline feedback.
  const handleChangePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/user/me/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || `Server error (${res.status})` };
      }

      return { success: true, message: data.message || "Password updated successfully" };
    } catch (err) {
      console.error("Change password error:", err);
      return { success: false, message: "Could not reach the server. Please try again." };
    }
  };

  const SIDEBAR_W  = collapsed ? 72 : 240;
  const notifCount = MOCK_NOTIFS_INIT.filter((n) => !n.read).length;

  const sidebarBg     = dark ? "rgba(11,15,26,0.92)" : "rgba(255,255,255,0.88)";
  const sidebarBorder = dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)";

  function renderPanel() {
    const common = { theme, dark };
    switch (active) {
      case "dashboard":      return <OverviewPanel      {...common} user={user}        onNavigate={setActive} requests={requests} savedDonors={savedDonors} />;
      case "find-donor":     return <FindDonorPanel     {...common} savedDonors={savedDonors} onSaveDonor={handleSaveDonor} onRemoveDonor={handleRemoveDonor} />;
      case "emergency":      return <EmergencyPanel     {...common} onNavigate={setActive} />;
      case "my-requests":    return <MyRequestsPanel    {...common} requests={requests} onDelete={handleDeleteRequest} />;
      case "saved-donors":   return <SavedDonorsPanel   {...common} savedDonors={savedDonors} onRemove={handleRemoveDonor} />;
      case "search-history": return <SearchHistoryPanel {...common} onNavigate={setActive} />;
      case "notifications":  return <NotificationsPanel {...common} />;
      case "profile":        return <ProfilePanel       {...common} user={user} onUpdate={handleUserUpdate} />;
      case "settings":       return <SettingsPanel      {...common} onChangePassword={handleChangePassword} />;
      default:               return <OverviewPanel      {...common} user={user} onNavigate={setActive} requests={requests} savedDonors={savedDonors} />;
    }
  }

  const NavItem = ({ item }) => {
    const isActive = active === item.id;
    const Icon = item.icon;
    const badge = item.id==="notifications" ? notifCount : item.id==="my-requests" ? requests.filter((r) => r.status==="Pending").length : 0;
    return (
      <button
        onClick={() => { setActive(item.id); setMobileOpen(false); }}
        title={collapsed ? item.label : undefined}
        style={{ display:"flex", alignItems:"center", gap:collapsed?0:12, justifyContent:collapsed?"center":"flex-start", padding:collapsed?"12px":"12px 14px", borderRadius:12, border:"none", width:"100%", cursor:"pointer", fontFamily:"inherit", fontSize:14, fontWeight:600, transition:"all 0.2s ease", background: isActive ? dark?"rgba(255,45,85,0.16)":"rgba(255,45,85,0.10)" : "transparent", color: isActive ? item.color : dark?"#9ca3af":"#6b7280", borderLeft: isActive?`3px solid ${item.color}`:"3px solid transparent", marginBottom:2 }}
        onMouseEnter={(e) => { if(!isActive){ e.currentTarget.style.background=dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"; e.currentTarget.style.color=dark?"#fff":"#111"; } }}
        onMouseLeave={(e) => { if(!isActive){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=dark?"#9ca3af":"#6b7280"; } }}
      >
        <Icon style={{ fontSize:18, flexShrink:0, color:isActive?item.color:"inherit" }} />
        {!collapsed && <span style={{ whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.label}</span>}
        {badge>0 && !collapsed && (
          <span style={{ marginLeft:"auto", width:18, height:18, borderRadius:"50%", background:"#ff2d55", color:"#fff", fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{badge}</span>
        )}
      </button>
    );
  };

  const SidebarContent = () => (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"16px 10px" }}>
      {/* Logo + Collapse */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:collapsed?"center":"space-between", marginBottom:28, paddingLeft:collapsed?0:4 }}>
        {!collapsed && <Link href="/" style={{ textDecoration:"none" }}><span style={{ fontWeight:900, fontSize:20, color:"#ff2d55", letterSpacing:"-0.02em" }}>REDORA</span></Link>}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ width:34, height:34, borderRadius:10, border: dark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.08)", background: dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)", color: dark?"#fff":"#111", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", flexShrink:0 }}
          onMouseEnter={(e) => { e.currentTarget.style.background=dark?"rgba(255,45,85,0.15)":"rgba(255,45,85,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background=dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"; }}
        >
          {collapsed ? <FaChevronRight style={{ fontSize:12 }} /> : <FaChevronLeft style={{ fontSize:12 }} />}
        </button>
      </div>

      {/* User Mini Card */}
      {!collapsed && (
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:14, marginBottom:16, background: dark?"rgba(255,45,85,0.08)":"rgba(255,45,85,0.05)", border:"1px solid rgba(255,45,85,0.15)" }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,45,85,0.15)", border:"2px solid rgba(255,45,85,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <FaUser style={{ fontSize:16, color:"#ff2d55" }} />
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontWeight:700, fontSize:13, color: dark?"#fff":"#111", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name}</div>
            <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
              <FaTint style={{ fontSize:10, color:"#ff2d55" }} />
              <span style={{ fontSize:11, color:"#ff2d55", fontWeight:700 }}>Blood Seeker</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex:1 }}>{NAV_ITEMS.map((item) => <NavItem key={item.id} item={item} />)}</nav>

      {/* Divider */}
      <div style={{ height:1, margin:"12px 4px", background: dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)" }} />

      {/* Logout */}
      <button onClick={handleLogout}
        style={{ display:"flex", alignItems:"center", gap:collapsed?0:12, justifyContent:collapsed?"center":"flex-start", padding:collapsed?"12px":"12px 14px", borderRadius:12, border:"1px solid rgba(255,45,85,0.25)", background: dark?"rgba(255,45,85,0.07)":"rgba(255,45,85,0.05)", color:"#ff2d55", fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:"inherit", transition:"all 0.25s", width:"100%" }}
        onMouseEnter={(e) => { e.currentTarget.style.background="#ff2d55"; e.currentTarget.style.color="#fff"; e.currentTarget.style.border="1px solid #ff2d55"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background=dark?"rgba(255,45,85,0.07)":"rgba(255,45,85,0.05)"; e.currentTarget.style.color="#ff2d55"; e.currentTarget.style.border="1px solid rgba(255,45,85,0.25)"; }}
      >
        <FaSignOutAlt style={{ fontSize:16, flexShrink:0 }} />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );

  if (loading) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:theme.background, color:theme.text }}>
        Loading your dashboard…
      </div>
    );
  }

  if (loadError || !user) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", gap:12, alignItems:"center", justifyContent:"center", background:theme.background, color:theme.text }}>
        <div>{loadError || "Could not load your profile."}</div>
        <button onClick={() => router.push("/auth/login")}
          style={{ padding:"10px 20px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#ff2d55,#ff7a59)", color:"#fff", cursor:"pointer", fontWeight:700, fontFamily:"inherit" }}
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:theme.background, color:theme.text, fontFamily:"'Inter',system-ui,-apple-system,sans-serif", display:"flex", position:"relative", isolation:"isolate", overflow:"hidden" }}>
      {/* Background orbs */}
      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        <Orb color="#ff2d55" size="350px" top="-5%"  left="15%" />
        <Orb color="#7c4dff" size="280px" top="55%"  left="70%" />
        <Orb color="#00d4ff" size="200px" top="80%"  left="5%"  />
      </div>

      {/* SIDEBAR */}
      <aside style={{ width:SIDEBAR_W, minWidth:SIDEBAR_W, position:"sticky", top:0, height:"100vh", background:sidebarBg, backdropFilter:"blur(24px)", borderRight:sidebarBorder, boxShadow: dark?"4px 0 24px rgba(0,0,0,0.3)":"4px 0 20px rgba(0,0,0,0.06)", zIndex:100, transition:"width 0.3s cubic-bezier(0.25,0.8,0.25,1),min-width 0.3s cubic-bezier(0.25,0.8,0.25,1)", overflowX:"hidden", overflowY:"auto", display:"flex", flexDirection:"column" }}
        className="user-dashboard-sidebar"
      >
        <SidebarContent />
      </aside>

      {/* MAIN AREA */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, position:"relative", zIndex:1 }}>
        {/* Header */}
        <header style={{ position:"sticky", top:0, zIndex:50, padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", background: dark?"rgba(11,15,26,0.75)":"rgba(255,255,255,0.7)", backdropFilter:"blur(18px)", borderBottom: dark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(0,0,0,0.06)", boxShadow: dark?"0 4px 20px rgba(0,0,0,0.2)":"0 4px 16px rgba(0,0,0,0.05)" }}>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display:"none", width:38, height:38, borderRadius:10, border: dark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.08)", background:"transparent", color: dark?"#fff":"#111", cursor:"pointer", alignItems:"center", justifyContent:"center" }} className="user-mobile-menu-btn">
            <FaBars style={{ fontSize:16 }} />
          </button>

          <div>
            <h1 style={{ margin:0, fontSize:20, fontWeight:800, color:theme.text, letterSpacing:"-0.02em" }}>{PANEL_TITLES[active]}</h1>
            <p style={{ margin:0, fontSize:12, color:theme.textSecondary }}>Redora User Portal</p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {/* Notification bell */}
            <button onClick={() => setActive("notifications")} style={{ position:"relative", width:38, height:38, borderRadius:"50%", border: dark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.08)", background:"transparent", color: dark?"#9ca3af":"#6b7280", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,45,85,0.10)"; e.currentTarget.style.color="#ff2d55"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=dark?"#9ca3af":"#6b7280"; }}
            >
              <FaBell style={{ fontSize:16 }} />
              {notifCount>0 && <span style={{ position:"absolute", top:1, right:1, width:14, height:14, borderRadius:"50%", background:"#ff2d55", color:"#fff", fontSize:9, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{notifCount}</span>}
            </button>
            {/* Avatar */}
            <div onClick={() => setActive("profile")} style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,45,85,0.12)", border:"2px solid rgba(255,45,85,0.25)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor="#ff2d55"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,45,85,0.25)"; }}
            >
              <FaUser style={{ fontSize:15, color:"#ff2d55" }} />
            </div>
          </div>
        </header>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setMobileOpen(false)} style={{ position:"fixed", inset:0, zIndex:199, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)" }} />
              <motion.div initial={{ x:-280 }} animate={{ x:0 }} exit={{ x:-280 }} transition={{ type:"spring", stiffness:350, damping:35 }} style={{ position:"fixed", top:0, left:0, bottom:0, width:260, zIndex:200, background:sidebarBg, backdropFilter:"blur(24px)", borderRight:sidebarBorder, overflowY:"auto" }}>
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Panel Content */}
        <main style={{ flex:1, padding:"32px", overflowY:"auto" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.3, ease:"easeOut" }} style={{ maxWidth:1100, margin:"0 auto" }}>
              {renderPanel()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <style>{`
        @media (max-width:768px){.user-dashboard-sidebar{display:none!important;}.user-mobile-menu-btn{display:flex!important;}}
        .user-dashboard-sidebar::-webkit-scrollbar{width:4px;}
        .user-dashboard-sidebar::-webkit-scrollbar-track{background:transparent;}
        .user-dashboard-sidebar::-webkit-scrollbar-thumb{background:rgba(255,45,85,0.3);border-radius:2px;}
        *{box-sizing:border-box;}
      `}</style>
    </div>
  );
}