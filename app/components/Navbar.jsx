"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UIContext } from "../context/UIContext";

export default function Navbar() {
  const pathname = usePathname();
  const { dark = true } = useContext(UIContext) || {};

  
  const navStyle = {
    textDecoration: "none",
    transition: "0.3s",
    fontWeight: "600",
    color: dark ? "#f5f7fa" : "#111827",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 50px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(18px)",

        /* FIXED */
        background: dark
  ? "rgba(11,15,26,0.80)"
  : "rgba(250,250,250,0.85)",

        borderBottom: dark
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid rgba(0,0,0,0.08)",

        boxShadow: dark
          ? "0 4px 25px rgba(0,0,0,0.35)"
          : "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* LOGO */}
      <h2
        style={{
          fontWeight: 900,
          color: "#ff2d55",
          fontSize: 20,
          margin: 0,
        }}
      >
        REDORA
      </h2>

      {/* LINKS */}
      <div
        style={{
          display: "flex",
          gap: "35px",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        <Link
          href="/"
          style={{
            ...navStyle,
            color: pathname === "/"
              ? "#ff2d55"
              : dark
              ? "white"
              : "#111827",
          }}
        >
          Home
        </Link>

        <Link href="/donor" style={navStyle}>
          Donor
        </Link>

        <Link href="/about" style={navStyle}>
          About
        </Link>

        <Link
          href="/login"
          style={{
            ...navStyle,
            color:
              pathname === "/login" ||
              pathname === "/register"
                ? "#ff2d55"
                : dark
                ? "white"
                : "#111827",
          }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}