"use client";

import { useContext, useState } from "react";
import { UIContext } from "@/context/UIContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DonorRegisterPage() {
  const { dark, fontSize, lang } = useContext(UIContext) || {};
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    phone: "",
    city: "",
    area: "",
    available: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.bloodGroup ||
      !formData.phone ||
      !formData.city ||
      !formData.area
    ) {
      setError(lang === "bn" ? "সব ঘর পূরণ করুন" : "All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(lang === "bn" ? "পাসওয়ার্ড মিলছে না" : "Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        lang === "bn"
          ? "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
          : "Password must be at least 6 characters"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register-donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      alert(
        lang === "bn"
          ? "ডোনার রেজিস্ট্রেশন সফল হয়েছে"
          : "Donor Registration Successful"
      );

      router.push("/login");
    } catch (err) {
      setError(lang === "bn" ? "কিছু ভুল হয়েছে" : "Something went wrong");
      setLoading(false);
    }
  };

  const inputFocusStyle = {
    borderColor: "#ff2d55",
    boxShadow: "0 0 0 3px rgba(255, 45, 85, 0.15)",
    background: dark
  ? "rgba(255,255,255,0.12)"
  : "rgba(255,255,255,0.85)",
color: dark ? "white" : "#111",
  };

  return (
    <div
      style={{
        background: dark
          ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
          : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
        minHeight: "calc(100vh - 140px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px clamp(20px, 5vw, 60px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GLOW CIRCLES */}
      <div
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #ff2d55 0%, rgba(11,11,43,0) 100%)",
          position: "absolute",
          top: 70,
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #ff2d55 0%, rgba(11,11,43,0) 100%)",
          position: "absolute",
          bottom: 60,
          right: 20,
          transform: "translateX(-50%)",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #ff2d55 0%, rgba(11,11,43,0) 100%)",
          position: "absolute",
          bottom: 60,
          left: 20,
          transform: "translateX(-50%)",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* GLASS PREMIUM CARD — identical to AuthSlider glass */}
      <div
        className="donor-glass-card"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "520px",
          padding: "44px",
          borderRadius: "24px",
          background: "rgba(20, 20, 50, 0.25)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
          transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#ff2d55",
            marginBottom: "8px",
            fontSize: fontSize + 10,
            fontWeight: 800,
            letterSpacing: "-0.5px",
          }}
        >
          {lang === "bn" ? "ডোনার রেজিস্ট্রেশন" : "Donor Registration"}
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.8)",
            fontStyle: "italic",
            marginBottom: "24px",
            fontSize: fontSize + 2,
          }}
        >
          {lang === "bn"
            ? "রক্ত দিতে আপনার তথ্য দিন!"
            : "Provide your details to donate blood!"}
        </p>

        {error && (
          <p
            style={{
              color: "#ff2d55",
              textAlign: "center",
              marginBottom: "16px",
              fontSize: fontSize + 2,
              fontWeight: 600,
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <input
              name="fullName"
              placeholder={lang === "bn" ? "পুরো নাম" : "Full Name"}
              value={formData.fullName}
              onChange={handleChange}
              className="donor-glass-input"
              style={inputBase(dark, fontSize)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                const base = inputBase(dark, fontSize);
                Object.keys(base).forEach((k) => (e.target.style[k] = base[k]));
              }}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="donor-glass-input"
              style={inputBase(dark, fontSize)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                const base = inputBase(dark, fontSize);
                Object.keys(base).forEach((k) => (e.target.style[k] = base[k]));
              }}
              required
            />

            <input
              name="password"
              type="password"
              placeholder={lang === "bn" ? "পাসওয়ার্ড" : "Password"}
              value={formData.password}
              onChange={handleChange}
              className="donor-glass-input"
              style={inputBase(dark, fontSize)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                const base = inputBase(dark, fontSize);
                Object.keys(base).forEach((k) => (e.target.style[k] = base[k]));
              }}
              required
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder={lang === "bn" ? "কনফার্ম পাসওয়ার্ড" : "Confirm Password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="donor-glass-input"
              style={inputBase(dark, fontSize)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                const base = inputBase(dark, fontSize);
                Object.keys(base).forEach((k) => (e.target.style[k] = base[k]));
              }}
              required
            />

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="donor-glass-input"
            style={{
              ...inputBase(dark, fontSize),
              color: dark ? "white" : "#111",
              background: dark
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.6)",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
            }}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                const base = inputBase(dark, fontSize);
                Object.keys(base).forEach((k) => (e.target.style[k] = base[k]));
              }}
              required
            >
              <option value="">
                {lang === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
              </option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>

            <input
              name="phone"
              placeholder={lang === "bn" ? "ফোন নম্বর" : "Phone"}
              value={formData.phone}
              onChange={handleChange}
              className="donor-glass-input"
              style={inputBase(dark, fontSize)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                const base = inputBase(dark, fontSize);
                Object.keys(base).forEach((k) => (e.target.style[k] = base[k]));
              }}
              required
            />

            <input
              name="city"
              placeholder={lang === "bn" ? "শহর" : "City"}
              value={formData.city}
              onChange={handleChange}
              className="donor-glass-input"
              style={inputBase(dark, fontSize)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                const base = inputBase(dark, fontSize);
                Object.keys(base).forEach((k) => (e.target.style[k] = base[k]));
              }}
              required
            />

            <input
              name="area"
              placeholder={lang === "bn" ? "এলাকা" : "Area"}
              value={formData.area}
              onChange={handleChange}
              className="donor-glass-input"
              style={inputBase(dark, fontSize)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                const base = inputBase(dark, fontSize);
                Object.keys(base).forEach((k) => (e.target.style[k] = base[k]));
              }}
              required
            />
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "14px",
              marginBottom: "24px",
              color: "rgba(255,255,255,0.8)",
              fontSize: fontSize,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              style={{ cursor: "pointer", accentColor: "#ff2d55" }}
            />
            {lang === "bn" ? "ডোনেশনের জন্য উপলব্ধ" : "Available For Donation"}
          </label>

          <button type="submit" disabled={loading} className="donor-glass-btn">
            {loading
              ? lang === "bn"
                ? "রেজিস্ট্রেশন হচ্ছে..."
                : "Registering..."
              : lang === "bn"
              ? "ডোনার হিসেবে রেজিস্টার করুন"
              : "Register as Donor"}
          </button>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: fontSize }}>
              {lang === "bn" ? "ইতিমধ্যে একাউন্ট আছে?" : "Already have an account?"}{" "}
              <Link
                href="/auth/login"
                style={{
                  color: "#ff2d55",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {lang === "bn" ? "লগইন" : "Login"}
              </Link>
            </p>
          </div>
        </form>
      </div>

      <style>{`
        .donor-glass-card:hover {
          border-color: rgba(255, 45, 85, 0.35) !important;
          box-shadow: 0 15px 50px rgba(255, 45, 85, 0.15) !important;
        }

        .donor-glass-input {
          transition: all 0.25s ease-in-out !important;
        }

        .donor-glass-input:focus {
          border-color: #ff2d55 !important;
          box-shadow: 0 0 0 3px rgba(255, 45, 85, 0.15) !important;
          background: rgba(255, 255, 255, 0.15) !important;
          color: #fff !important;
        }

        .donor-glass-btn {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg,#ff2d55,#ff7a59);
          color: white;
          font-size: ${fontSize + 2}px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 45, 85, 0.3);
          opacity: ${loading ? 0.6 : 1};
        }

        .donor-glass-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 45, 85, 0.4);
        }

        .donor-glass-btn:active:not(:disabled) {
          transform: translateY(0);
        }
          select option {
      background: #1b1b2f;
      color: white;
      }
      `}</style>
    </div>
  );
}

function inputBase(dark, fontSize) {
  return {
    width: "100%",
    height: "48px",
    borderRadius: "12px",
    padding: "0 16px",
    border: dark
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(255,255,255,0.25)",
    background: dark
      ? "rgba(255,255,255,0.08)"
      : "rgba(255,255,255,0.25)",
    color: dark ? "white" : "#1a1a1a",
    fontSize: fontSize + 2,
    outline: "none",
    boxSizing: "border-box",
  };
}