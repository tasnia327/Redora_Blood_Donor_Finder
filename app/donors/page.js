"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaTint, FaSearch } from "react-icons/fa";

import DonorSearchBar from "@/components/features/donor/DonorSearchBar";
import DonorList from "@/components/features/donor/DonorList";

import { UIContext } from "@/context/UIContext";

const API_BASE = "http://localhost:5000";

/* Orb helper identical to homepage */
function orbStyle(color, size, top, left) {
  return {
    position: "absolute",
    width: size,
    height: size,
    top,
    left,
    background: color,
    filter: "blur(120px)",
    opacity: 0.3,
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  };
}

export default function DonorsPage() {
  const { dark } = useContext(UIContext);

  const theme = {
    bg: dark
      ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
      : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
    text: dark ? "#ffffff" : "#111827",
    card: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.75)",
    cardHover: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)",
    border: dark
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.06)",
    borderAccent: dark
      ? "1px solid rgba(255,45,85,0.25)"
      : "1px solid rgba(255,45,85,0.15)",
    primary: "#ff2d55",
    primaryDim: dark ? "rgba(255,45,85,0.2)" : "rgba(255,45,85,0.1)",
    glass: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
  };

  const [filters, setFilters] = useState({
    bloodGroup: "",
    city: "",
    area: "",
  });

  const [donors, setDonors] = useState(null); // null = no search run yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (filters.bloodGroup) params.set("bloodGroup", filters.bloodGroup);
      if (filters.city) params.set("city", filters.city);
      if (filters.area) params.set("area", filters.area);

      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_BASE}/api/donor/search?${params.toString()}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Could not search donors right now.");
        setDonors([]);
        return;
      }

      setDonors(data.donors);
    } catch (err) {
      console.error("Donor search error:", err);
      setError("Could not reach the server. Please try again.");
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const displayedDonors = donors ?? [];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: dark
          ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
          : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
        color: theme.text,
        overflowX: "hidden",
        position: "relative",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        isolation: "isolate",
      }}
    >
      {/* Background Orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div style={orbStyle("#ff2d55", "300px", "-5%", "5%")} />
        <div style={orbStyle("#7c4dff", "250px", "40%", "75%")} />
        <div style={orbStyle("#00d4ff", "200px", "70%", "20%")} />
      </div>

      {/* Page Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 40px 80px",
        }}
      >
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(255,45,85,0.15)",
              color: "#ff2d55",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.02em",
              marginBottom: 24,
            }}
          >
            <FaTint />
            Blood Donor Search
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 16,
              color: theme.text,
            }}
          >
            Find Blood{" "}
            <span style={{ color: "#ff2d55" }}>Donors</span>{" "}
            Near You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontSize: 18,
              opacity: 0.75,
              maxWidth: 560,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            Search verified donors by blood group and location. Every second counts — find the match you need instantly.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.45 }}
        >
          <DonorSearchBar
            theme={theme}
            dark={dark}
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />
        </motion.div>

        {/* Results Count */}
        {hasSearched && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: 40,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 18px",
                borderRadius: 999,
                background: theme.card,
                backdropFilter: "blur(14px)",
                border: theme.border,
                fontWeight: 600,
                fontSize: 14,
                color: theme.text,
              }}
            >
              <FaSearch style={{ color: "#ff2d55", fontSize: 12 }} />
              {loading ? (
                "Searching…"
              ) : (
                <>
                  Showing{" "}
                  <span style={{ color: "#ff2d55", fontWeight: 800 }}>
                    {displayedDonors.length}
                  </span>{" "}
                  donor{displayedDonors.length !== 1 ? "s" : ""}
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: 40,
              padding: "12px 16px",
              borderRadius: 12,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#ef4444",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        {/* Donor List */}
        {!error && !loading && hasSearched && (
          <DonorList donors={displayedDonors} theme={theme} dark={dark} />
        )}

        {!hasSearched && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: theme.text,
              opacity: 0.7,
              fontSize: 15,
            }}
          >
            Use the search bar above to find donors by blood group, city, or area.
          </div>
        )}
      </div>
    </main>
  );
}