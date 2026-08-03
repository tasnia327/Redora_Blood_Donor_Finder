"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UIContext } from "@/context/UIContext";

export default function Navbar() {
  const pathname = usePathname();
  const { dark = true } = useContext(UIContext) || {};

  // Hide public Navbar on all dashboard/donor routes (they have their own sidebar)
  if (
    pathname?.startsWith("/Dashboard") ||
    pathname?.startsWith("/dashboard") 
  ) {
    return null;
  }

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
        <Link href="/" style={{ textDecoration: "none", color: "#ff2d55" }}>
          REDORA
        </Link>
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
            color:
              pathname === "/"
                ? "#ff2d55"
                : dark
                ? "white"
                : "#111827",
          }}
        >
          Home
        </Link>

        <Link
          href="/about"
          style={{
            ...navStyle,
            color:
              pathname === "/about"
                ? "#ff2d55"
                : dark
                ? "white"
                : "#111827",
          }}
        >
          About
        </Link>

        <Link
          href="/auth/login"
          style={{
            ...navStyle,
            color:
              pathname === "/auth/login" || pathname === "/login" || pathname === "/register"
                ? "#ff2d55"
                : dark
                ? "white"
                : "#111827",
          }}
        >
          Login
        </Link>

        {/* RED CIRCULAR SEARCH BUTTON */}
        <Link
          href="/donors"
          title="Search Donors"
          aria-label="Search Donors"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "#ff2d55",
            color: "#ffffff",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(255, 45, 85, 0.4)",
            transition: "all 0.25s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e02448";
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(255, 45, 85, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ff2d55";
            e.currentTarget.style.transform = "scale(1.0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 45, 85, 0.4)";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}