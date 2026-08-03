"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UIContext } from "../../../context/UIContext";
import { AuthContext } from "../../../context/AuthContext";
import {
  FaApple,
  FaGoogle,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

export default function AuthSlider({ initialMode = "login" }) {
  const { dark, fontSize, lang } = useContext(UIContext);
  const router = useRouter();

  // Slider State (true = Sign Up / Register, false = Sign In / Login)
  const [isSignUp, setIsSignUp] = useState(initialMode === "register");

  // Sync state if initialMode prop changes (e.g. when direct navigating)
  useEffect(() => {
    setIsSignUp(initialMode === "register");
  }, [initialMode]);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/auth/register") {
        setIsSignUp(true);
      } else if (path === "/auth/login") {
        setIsSignUp(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handler to toggle view and sync URL without full page reload
  const toggleMode = (signUp) => {
    setIsSignUp(signUp);
    const newPath = signUp ? "/auth/register" : "/auth/login";
    window.history.pushState(null, "", newPath);
  };

  // --- LOGIN STATE & LOGIC ---
  const [loginRole, setLoginRole] = useState("user");
  const [loginContact, setLoginContact] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

 const handleLoginSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: loginContact,
        password: loginPassword,
        role: loginRole,
      }),
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    // ❗ IMPORTANT: handle error properly
    if (!data.success) {
      alert(data.message || "Login failed");
      return;
    }

    // success
    localStorage.setItem("token", data.token);
    alert("Login successful");

    if (loginRole === "user") {
      router.push("/dashboard/user");
    } else if (loginRole === "donor") {
      router.push("/dashboard/donor");
    } else {
      router.push("/dashboard/admin");
    }

  }  catch (err) {
  console.error("LOGIN FETCH ERROR:", err);
  alert("Server error: " + err.message);
}
};

  // --- REGISTER STATE & LOGIC ---
  const [regUsername, setRegUsername] = useState("");
  const [regContact, setRegContact] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError("");

    if (!regUsername || !regContact || !regPassword || !regConfirmPassword) {
      setRegError(lang === "bn" ? "সব ঘর পূরণ করুন" : "All fields are required");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError(
        lang === "bn"
          ? "পাসওয়ার্ড মিলছে না"
          : "Passwords do not match"
      );
      return;
    }

    if (regPassword.length < 6) {
      setRegError(
        lang === "bn"
          ? "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
          : "Password must be at least 6 characters"
      );
      return;
    }

    setRegLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: regUsername,
    contact: regContact,   
    password: regPassword,
  }),
});

      const data = await res.json();

      console.log("STATUS:", res.status);
console.log("DATA:", data);

      if (!data.success) {
        setRegError(data.message || "Registration failed");
        setRegLoading(false);
        return;
      }

      // Successful registration: Switch to login state
      toggleMode(false);
      setRegLoading(false);
    } catch (err) {
      setRegError("Something went wrong. Please try again.");
      setRegLoading(false);
    }
  };

  // --- SHARED STYLING ---
  const inputStyle = {
    width: "100%",
    height: "48px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "none",
    paddingLeft: "16px",
    background: dark ? "#34344A" : "rgba(255, 255, 255, 0.9)",
    color: dark ? "white" : "#111",
    fontSize: fontSize + 2,
    outline: "none",
    border: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.15)",
  };

  const buttonStyle = {
    width: "100%",
    height: "48px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#ff2d55,#ff7a59)",
    color: "white",
    fontSize: fontSize + 2,
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 45, 85, 0.3)",
    transition: "transform 0.2s ease",
  };

  return (
    <div className={`auth-slider-container ${isSignUp ? "right-panel-active" : ""}`}>

      {/* 1. SIGN UP (REGISTER) FORM CONTAINER */}
      <div className="auth-form-panel auth-sign-up-panel">
        <form onSubmit={handleRegisterSubmit} style={{ width: "100%", maxWidth: "360px" }}>
          <h2
            style={{
              color: "#ff2d55",
              fontSize: fontSize + 8,
              textAlign: "center",
              fontWeight: "800",
              marginBottom: "8px",
            }}
          >
            {lang === "bn" ? "রেজিস্টার" : "Create Account"}
          </h2>

          <p
            style={{
              color: dark ? "white" : "#111",
              textAlign: "center",
              fontStyle: "italic",
              marginBottom: "24px",
              fontSize: fontSize + 2,
              opacity: 0.8,
            }}
          >
            {lang === "bn"
              ? "শুরু করতে কিছু তথ্য দিন!"
              : "Just some details to get you in!"}
          </p>

          {regError && (
            <p
              style={{
                color: "#ff2d55",
                textAlign: "center",
                marginBottom: "16px",
                fontSize: fontSize + 2,
                fontWeight: "600",
              }}
            >
              {regError}
            </p>
          )}

          <input
            placeholder={lang === "bn" ? "নাম" : "Username"}
            style={inputStyle}
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
          />

          <input
            placeholder={lang === "bn" ? "ইমেইল / ফোন" : "Email/Phone Number"}
            style={inputStyle}
            value={regContact}
            onChange={(e) => setRegContact(e.target.value)}
          />

          <input
            type="password"
            placeholder={lang === "bn" ? "পাসওয়ার্ড" : "Password"}
            style={inputStyle}
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder={lang === "bn" ? "কনফার্ম পাসওয়ার্ড" : "Confirm Password"}
            style={inputStyle}
            value={regConfirmPassword}
            onChange={(e) => setRegConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            style={{
              ...buttonStyle,
              opacity: regLoading ? 0.6 : 1,
            }}
            disabled={regLoading}
          >
            {regLoading
              ? lang === "bn"
                ? "লোড হচ্ছে..."
                : "Registering..."
              : lang === "bn"
                ? "রেজিস্টার"
                : "Register"}
          </button>

          {/* Mobile-only toggle link */}
          <div className="md:hidden" style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{ color: dark ? "white" : "#111", fontSize: fontSize }}>
              {lang === "bn" ? "ইতিমধ্যে একাউন্ট আছে?" : "Already have an Account?"}{" "}
              <button
                type="button"
                onClick={() => toggleMode(false)}
                style={{
                  color: "#ff2d55",
                  background: "none",
                  border: "none",
                  fontWeight: "700",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {lang === "bn" ? "লগইন" : "Login"}
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* 2. SIGN IN (LOGIN) FORM CONTAINER */}
      <div className="auth-form-panel auth-sign-in-panel">
        <form onSubmit={handleLoginSubmit} style={{ width: "100%", maxWidth: "360px" }}>
          <h2
            style={{
              color: "#ff2d55",
              fontSize: fontSize + 8,
              textAlign: "center",
              marginBottom: "8px",
              fontWeight: "800",
            }}
          >
            {lang === "bn" ? "লগইন" : "Login"}
          </h2>

          <p
            style={{
              color: dark ? "white" : "#111",
              textAlign: "center",
              fontStyle: "italic",
              marginBottom: "24px",
              fontSize: fontSize + 2,
              opacity: 0.8,
            }}
          >
            {lang === "bn"
              ? "আপনাকে আবার পেয়ে ভালো লাগছে!"
              : "Glad You're Back!"}
          </p>

          <select
            value={loginRole}
            onChange={(e) => setLoginRole(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="user">User</option>
            <option value="donor">Donor</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            placeholder="Email or Phone Number"
            value={loginContact}
            onChange={(e) => setLoginContact(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              fontSize: fontSize,
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: dark ? "rgba(255,255,255,0.8)" : "#333",
                cursor: "pointer",
              }}
            >
              <input type="checkbox" style={{ cursor: "pointer" }} />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              style={{
                color: "#ff2d55",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" style={buttonStyle}>
            Login
          </button>

          <p
            style={{
              textAlign: "center",
              color: dark ? "rgba(255,255,255,0.6)" : "#666",
              marginTop: "16px",
              marginBottom: "12px",
              fontSize: fontSize,
            }}
          >
            or
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginBottom: "24px",
              fontSize: "26px",
            }}
          >
            <FaApple style={{ color: dark ? "#ffffff" : "#000000", cursor: "pointer" }} />
            <FaGoogle style={{ color: "#4285F4", cursor: "pointer" }} />
            <FaFacebook style={{ color: "#1877F2", cursor: "pointer" }} />
            <FaTwitter style={{ color: "#1DA1F2", cursor: "pointer" }} />
          </div>

          {/* Mobile-only toggle link */}
          <div className="md:hidden" style={{ textAlign: "center" }}>
            <p style={{ color: dark ? "white" : "#111", fontSize: fontSize }}>
              {lang === "bn" ? "একাউন্ট নেই?" : "Don't have an Account yet?"}{" "}
              <button
                type="button"
                onClick={() => toggleMode(true)}
                style={{
                  color: "#ff2d55",
                  background: "none",
                  border: "none",
                  fontWeight: "700",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {lang === "bn" ? "রেজিস্টার" : "Register"}
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* 3. SLIDING OVERLAY CONTAINER (DESKTOP ONLY) */}
      <div className="auth-overlay-container">
        <div className="auth-overlay">

          {/* Overlay Left panel: Shows when Sign Up active */}
          <div className="auth-overlay-panel auth-overlay-left">
            <h2 style={{ fontSize: fontSize + 12, fontWeight: "800", marginBottom: "12px" }}>
              {lang === "bn" ? "ইতিমধ্যে সদস্য?" : "Member of Community?"}
            </h2>
            <p style={{ fontSize: fontSize + 2, lineHeight: "1.6", marginBottom: "30px", opacity: 0.9 }}>
              {lang === "bn"
                ? "আজই আমাদের সাথে যোগ দিন এবং সেরা সেবা ও নেটওয়ার্কের অভিজ্ঞতা নিন।"
                : "Join us today and experience the best of community engagement and networking."}
            </p>

            {/* Custom SVG Community Node network illustration */}
            <div style={{ marginBottom: "30px" }}>
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="auth-orbit-1" cx="100" cy="100" r="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
                <circle className="auth-orbit-2" cx="100" cy="100" r="75" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
                <g className="auth-node-group">
                  <line x1="100" y1="100" x2="50" y2="70" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
                  <line x1="100" y1="100" x2="150" y2="70" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
                  <line x1="100" y1="100" x2="70" y2="140" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
                  <line x1="100" y1="100" x2="130" y2="140" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
                  <g filter="url(#glow-nodes)">
                    <circle cx="100" cy="100" r="14" fill="#ffffff" />
                    <path d="M100 93L100 107M93 100L107 100" stroke="#ff2d55" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="50" cy="70" r="10" fill="#ffffff" opacity="0.9" />
                    <circle cx="150" cy="70" r="10" fill="#ffffff" opacity="0.9" />
                    <circle cx="70" cy="140" r="10" fill="#ffffff" opacity="0.9" />
                    <circle cx="130" cy="140" r="10" fill="#ffffff" opacity="0.9" />
                  </g>
                </g>
                <defs>
                  <filter id="glow-nodes" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#ffffff" floodOpacity="0.45" />
                  </filter>
                </defs>
              </svg>
            </div>

            <button className="auth-ghost-btn" onClick={() => toggleMode(false)}>
              {lang === "bn" ? "লগইন করুন" : "Login"}
            </button>
          </div>

          {/* Overlay Right panel: Shows when Sign In active */}
          <div className="auth-overlay-panel auth-overlay-right">
            <h2 style={{ fontSize: fontSize + 12, fontWeight: "800", marginBottom: "12px" }}>
              {lang === "bn" ? "রেডোরাতে নতুন?" : "New to Redora?"}
            </h2>
            <p style={{ fontSize: fontSize + 2, lineHeight: "1.6", marginBottom: "30px", opacity: 0.9 }}>
              {lang === "bn"
                ? "এখনই রেজিস্টার করুন এবং আমাদের সাথে এই চমৎকার যাত্রার অংশ হোন!"
                : "Register now and be a part of an exciting journey with us!"}
            </p>

            {/* Custom SVG Heart pulse heartbeat illustration */}
            <div style={{ marginBottom: "30px" }}>
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className="auth-heart-beat">
                  <path d="M100 160C100 160 30 110 30 65C30 38.5 48.5 20 72.5 20C88.2 20 95.8 28.5 100 35C104.2 28.5 111.8 20 127.5 20C151.5 20 170 38.5 170 65C170 110 100 160 100 160Z" fill="url(#heart-grad)" filter="url(#glow)" />
                  <path d="M40 90H80L90 60L105 130L115 80L125 100H160" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <linearGradient id="heart-grad" x1="100" y1="20" x2="100" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.3" />
                  </filter>
                </defs>
              </svg>
            </div>

            <button className="auth-ghost-btn" onClick={() => toggleMode(true)}>
              {lang === "bn" ? "রেজিস্টার করুন" : "Register"}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
