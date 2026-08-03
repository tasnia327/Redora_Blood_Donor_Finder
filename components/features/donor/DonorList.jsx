"use client";

import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import DonorCard from "./DonorCard";

export default function DonorList({ donors, theme, dark }) {
  if (donors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          padding: "80px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,45,85,0.1)",
            border: "1.5px solid rgba(255,45,85,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <FaSearch style={{ fontSize: 28, color: "#ff2d55", opacity: 0.7 }} />
        </div>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: theme?.text || "#111827",
            margin: 0,
          }}
        >
          No donors found
        </h2>
        <p
          style={{
            fontSize: 15,
            opacity: 0.6,
            margin: 0,
            color: theme?.textSecondary || "#6b7280",
          }}
        >
          Try adjusting your search filters to find more donors.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 24,
        marginTop: 16,
      }}
    >
      {donors.map((donor, i) => (
        <motion.div
          key={donor.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
        >
          <DonorCard donor={donor} theme={theme} dark={dark} />
        </motion.div>
      ))}
    </div>
  );
}