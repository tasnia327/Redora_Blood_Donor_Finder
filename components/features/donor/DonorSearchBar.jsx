"use client";

import { FaSearch, FaTint, FaMapMarkerAlt, FaCity } from "react-icons/fa";

export default function DonorSearchBar({ theme, dark, filters, setFilters, onSearch }) {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const cities = [
    "Chattogram",
    "Dhaka",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Cumilla",
  ];

  const selectStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: theme?.border || "1px solid rgba(255,255,255,0.1)",
    background: dark
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.8)",
    color: theme?.text || "#fff",
    fontSize: 15,
    outline: "none",
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontFamily: "'Inter', system-ui, sans-serif",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: dark
      ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23fff' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")"
      : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    backdropFilter: "blur(12px)",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: theme?.border || "1px solid rgba(255,255,255,0.1)",
    background: dark
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.8)",
    color: theme?.text || "#fff",
    fontSize: 15,
    outline: "none",
    transition: "all 0.25s ease",
    fontFamily: "'Inter', system-ui, sans-serif",
    backdropFilter: "blur(12px)",
  };

  const focusStyle = (e) => {
    e.target.style.borderColor = "rgba(255,45,85,0.5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(255,45,85,0.12)";
    e.target.style.background = dark
      ? "rgba(255,255,255,0.1)"
      : "rgba(255,255,255,0.95)";
  };

  const blurStyle = (e) => {
    e.target.style.borderColor = "";
    e.target.style.boxShadow = "";
    e.target.style.background = dark
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.8)";
  };

  return (
    <div
      style={{
        background: dark
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.6)",
        border: theme?.border || "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: 24,
        padding: "28px 32px",
        maxWidth: 1100,
        margin: "0 auto",
        boxShadow: dark
          ? "0 16px 48px rgba(0,0,0,0.35)"
          : "0 16px 48px rgba(0,0,0,0.08)",
      }}
    >
      {/* Field Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {/* Blood Group */}
        <div style={{ position: "relative" }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#ff2d55",
              marginBottom: 8,
            }}
          >
            <FaTint style={{ display: "inline", marginRight: 6, fontSize: 11 }} />
            Blood Group
          </label>
          <select
            value={filters.bloodGroup}
            onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
            style={selectStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div style={{ position: "relative" }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#ff2d55",
              marginBottom: 8,
            }}
          >
            <FaCity style={{ display: "inline", marginRight: 6, fontSize: 11 }} />
            City
          </label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            style={selectStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Area */}
        <div style={{ position: "relative" }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#ff2d55",
              marginBottom: 8,
            }}
          >
            <FaMapMarkerAlt style={{ display: "inline", marginRight: 6, fontSize: 11 }} />
            Area
          </label>
          <input
            type="text"
            placeholder="Enter area..."
            value={filters.area}
            onChange={(e) => setFilters({ ...filters, area: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        {/* Search Button */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ visibility: "hidden", fontSize: 12, marginBottom: 8 }}>
            &nbsp;
          </label>
          <button
            onClick={onSearch}
            style={{
              border: "none",
              borderRadius: 14,
              background: "linear-gradient(135deg, #ff2d55, #ff7a59)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "all 0.3s ease",
              padding: "14px 20px",
              boxShadow: "0 6px 24px rgba(255,45,85,0.3)",
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: "0.02em",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 10px 32px rgba(255,45,85,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,45,85,0.3)";
            }}
          >
            <FaSearch />
            Search Donors
          </button>
        </div>
      </div>
    </div>
  );
}