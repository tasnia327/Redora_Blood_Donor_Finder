"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect, useRef } from "react";
import { UIContext } from "./context/UIContext";

import {
  FaBolt,
  FaSearch,
  FaPhoneAlt,
  FaHeart,
  FaTint,
  FaMapMarkerAlt,
  FaFire,
  FaExclamationTriangle,
  FaUserCircle,
  FaUserMd,
  FaTrophy,
  FaMedal,
} from "react-icons/fa";

const HERO_IMG = "/images/hero.jpg";
const HOW_1 = "/images/how1.png";
const HOW_2 = "/images/how2.png";
const HOW_3 = "/images/how3.png";
const EMERGENCY_IMG = "/images/emergency.jpg";

/* ================================================================ */
/* EMOJI → REACT ICON MAPPER                                       */
/* ================================================================ */
const emojiIconMap = {
  "🔥": FaFire,
  "⚡": FaBolt,
  "🩸": FaTint,
  "📍": FaMapMarkerAlt,
  "🔍": FaSearch,
  "📞": FaPhoneAlt,
  "❤️": FaHeart,
  "🚨": FaExclamationTriangle,
  "👩": FaUserCircle,
  "👨": FaUserCircle,
  "👩‍⚕️": FaUserMd,
  "🥇": FaTrophy,
  "🥈": FaMedal,
  "🥉": FaMedal,
};

function renderIcon(emoji, size = "1em", color = "inherit") {
  const Icon = emojiIconMap[emoji];
  if (!Icon) return emoji;
  return <Icon style={{ fontSize: size, color }} />;
}

function IconText({ text, size, color }) {
  if (!text) return null;
  const parts = text.split(/([\u{1F000}-\u{1FFFF}]|[\u{2702}-\u{27B0}]|[\u{2600}-\u{26FF}])|([\u{FE00}-\u{FE0F}])|(\u{200D})/gu);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        const trimmed = part.trim();
        const Icon = emojiIconMap[trimmed];
        if (Icon) {
          return <Icon key={i} style={{ fontSize: size || "1em", color: color || "inherit" }} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function Home() {
  const {
    dark,
    setDark,
    lang,
    setLang,
    fontSize,
    setFontSize,
    open,
    setOpen,
    t,
  } = useContext(UIContext);

  const theme = {
    bg: dark
      ? "radial-gradient(circle at top, #1b1b2f, #0b0f1a 60%, #05060a)"
      : "linear-gradient(135deg, #fff7f7, #fdf2ff, #eef4ff)",
    text: dark ? "#ffffff" : "#111827",
    card: dark
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.75)",
    cardHover: dark
      ? "rgba(255,255,255,0.08)"
      : "rgba(255,255,255,0.9)",
    border: dark
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.06)",
    borderAccent: dark
      ? "1px solid rgba(255,45,85,0.25)"
      : "1px solid rgba(255,45,85,0.15)",
    primary: "#ff2d55",
    primaryDim: dark
      ? "rgba(255,45,85,0.2)"
      : "rgba(255,45,85,0.1)",
    glass: dark
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.6)",
  };

  const containerStyle = {
    fontSize,
    background: theme.bg,
    color: theme.text,
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    isolation: "isolate",
    zIndex: 1,
  };

  return (
    <div style={containerStyle}>
      {/* GLOBAL ORBS */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div style={orbStyle("#ff2d55", "120px", "10%", "15%")} />
        <div style={orbStyle("#7c4dff", "180px", "60%", "70%")} />
        <div style={orbStyle("#00d4ff", "140px", "40%", "40%")} />
      </div>

      <HeroSection theme={theme} t={t} dark={dark} />
      <StatsSection theme={theme} t={t} />
      <HowItWorksSection theme={theme} t={t} />
      <BloodGroupCards theme={theme} t={t} />
      <EmergencySection theme={theme} t={t} />
      <SuccessStories theme={theme} t={t} />
      <CommunitySection theme={theme} t={t} />
      <FeaturesSection theme={theme} t={t} />
    </div>
  );
}

/* ================================================================ */
/* HERO */
/* ================================================================ */
function HeroSection({ theme, t, dark }) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1280,
        margin: "0 auto",
        padding: "80px 40px 0",
        display: "flex",
        alignItems: "center",
        gap: 60,
        flexWrap: "wrap",
      }}
    >
      {/* LEFT TEXT */}
      <div style={{ flex: "1 1 480px" }}>
        <div style={badgeStyle}>
          {renderIcon("🔥", 18, "#ff2d55")}&nbsp;
          {t.badge.replace(/^[^\s]+\s*/, "")}
        </div>

        <h1
          style={{
            fontSize: "clamp(30px, 3vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: "28px 0 20px",
          }}
        >
          {t.title.split("Instantly")[0]}
          <span style={{ color: theme.primary }}>Instantly</span>
        </h1>

        <p
          style={{
            opacity: 0.8,
            maxWidth: 560,
            lineHeight: 1.7,
            fontSize: 18,
            marginBottom: 32,
          }}
        >
          {t.subtitle}
        </p>

        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            maxWidth: 520,
            borderRadius: 16,
            overflow: "hidden",
            background: dark ? "rgba(255,255,255,0.06)" : "#ffffff",
            backdropFilter: "blur(14px)",
            border: theme.border,
            boxShadow: dark
              ? "0 8px 32px rgba(0,0,0,0.3)"
              : "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          <input
            placeholder={t.search}
            style={{
              flex: 1,
              padding: "18px 20px",
              border: "none",
              outline: "none",
              fontSize: 16,
              background: "transparent",
              color: theme.text,
            }}
          />
          <button style={searchBtn}>{t.searchBtn}</button>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <Link href="/login" style={{ textDecoration: "none" }}>
            <button style={primaryBtn}>{t.cta1}</button>
          </Link>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <button style={primaryBtn}>{t.cta2}</button>
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        style={{
          flex: "1 1 400px",
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: dark
            ? "0 4px 12px rgba(0,0,0,0.1)"
            : "0 20px 60px rgba(255,45,85,0.15)",
        }}
      >
        <Image
          src={HERO_IMG}
          alt="Blood donation"
          width={600}
          height={600}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
          }}
          priority
        />
      </div>
    </section>
  );
}

/* ================================================================ */
/* STATS */
/* ================================================================ */
function StatsSection({ theme, t }) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1100,
        margin: "60px auto 0",
        padding: "0 40px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
      }}
    >
      {t.stats.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "28px 22px",
            borderRadius: 24,
            background: theme.card,
            backdropFilter: "blur(16px)",
            border: theme.border,
            textAlign: "center",
            transition: "all 0.3s ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.background = theme.cardHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = theme.card;
          }}
        >
          <h2
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: theme.primary,
              marginBottom: 8,
              letterSpacing: "-0.03em",
            }}
          >
            {item[0]}
          </h2>
          <p style={{ opacity: 0.75, fontSize: 15 }}>{item[1]}</p>
        </div>
      ))}
    </section>
  );
}

/* ================================================================ */
/* HOW IT WORKS */
/* ================================================================ */
function HowItWorksSection({ theme, t }) {
  const steps = t.howItWorks?.steps || [];
  const stepImgs = [HOW_1, HOW_2, HOW_3];

  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1100,
        margin: "70px auto 0",
        padding: "0 40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2
          style={{
            fontSize: "clamp(28px, 2vw, 36px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: 12,
          }}
        >
          {t.howItWorks?.title || "How It Works"}
        </h2>
        <p style={{ opacity: 0.7, fontSize: 17 }}>
          {t.howItWorks?.subtitle || ""}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 30,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              borderRadius: 28,
              background: theme.card,
              backdropFilter: "blur(16px)",
              border: theme.border,
              overflow: "hidden",
              transition: "all 0.3s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.border = theme.borderAccent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.border = theme.border;
            }}
          >
            {/* Step image */}
            <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))",
                  zIndex: 1,
                }}
              />
              <Image
                src={stepImgs[i]}
                alt={step.title}
                width={400}
                height={220}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Step number on image */}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 16,
                  zIndex: 2,
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#fff",
                  background: "rgba(255,45,85,0.8)",
                  padding: "4px 12px",
                  borderRadius: 999,
                  backdropFilter: "blur(4px)",
                }}
              >
                Step {step.num}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "24px 22px 28px" }}>
              <div
                style={{
                  fontSize: 36,
                  marginBottom: 12,
                  color: theme.primary,
                }}
              >
                {renderIcon(step.icon, 32)}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  opacity: 0.7,
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* BLOOD GROUP CARDS */
/* ================================================================ */
function BloodGroupCards({ theme, t }) {
  const groups = t.bloodGroups?.groups || [];
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1100,
        margin: "70px auto 0",
        padding: "0 40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <h2
          style={{
            fontSize: "clamp(24px, 2vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 12,
          }}
        >
          {t.bloodGroups?.title || "Blood Groups"}
        </h2>
        <p style={{ opacity: 0.7, fontSize: 17 }}>
          {t.bloodGroups?.subtitle || ""}
        </p>
      </div>

      <style>{`
        .blood-group-scroll {
          display: flex;
          flex-wrap: nowrap;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 10px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .blood-group-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        className="blood-group-scroll"
      >
        {groups.map((group, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 120px",
              padding: "24px 12px",
              borderRadius: 20,
              background: theme.card,
              backdropFilter: "blur(16px)",
              border: theme.border,
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",

            }}

            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px) scale(1.03)";
              e.currentTarget.style.background = theme.primaryDim;
              e.currentTarget.style.border = theme.borderAccent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0) scale(1)";
              e.currentTarget.style.background = theme.card;
              e.currentTarget.style.border = theme.border;
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: theme.primaryDim,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
                fontSize: 18,
                fontWeight: 800,
                color: theme.primary,
              }}
            >
              {group}
            </div>
            <div
              style={{
                fontSize: 12,
                opacity: 0.6,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {group.includes("+") ? "Rhesus +" : "Rhesus −"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* EMERGENCY */
/* ================================================================ */
function EmergencySection({ theme, t }) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1100,
        margin: "70px auto 0",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          borderRadius: 32,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        {/* Image side */}
        <div style={{ flex: "1 1 320px", position: "relative", minHeight: 260 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(255,45,85,0.3), transparent 60%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Image
            src={EMERGENCY_IMG}
            alt="Emergency blood"
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Content side */}
        <div
          style={{
            flex: "1 1 400px",
            padding: "50px 44px",
            background: `linear-gradient(135deg, ${theme.primaryDim}, rgba(124,77,255,${theme.primaryDim.includes("0.2") ? "0.2" : "0.1"
              }))`,
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Pulsing orb */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "#ff2d55",
              filter: "blur(80px)",
              opacity: 0.12,
              bottom: "-20%",
              right: "10%",
              pointerEvents: "none",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 14,
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {renderIcon("🚨", 28)} {t.emergency?.title?.replace(/^[^\s]+(?:\uFE0F)?\s*/, "") || "Need Blood Urgently?"}
          </h2>

          <p
            style={{
              opacity: 0.8,
              fontSize: 17,
              lineHeight: 1.6,
              marginBottom: 28,
              position: "relative",
            }}
          >
            {t.emergency?.subtitle || ""}
          </p>

          <div style={{ position: "relative" }}>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "18px 40px",
                  borderRadius: 16,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #ff2d55, #ff7a59)",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 17,
                  boxShadow: "0 8px 30px rgba(255,45,85,0.35)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(255,45,85,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(255,45,85,0.35)";
                }}
              >
                {t.emergency?.cta || "Request Emergency Blood"}
              </button>
            </Link>
          </div>

          <p
            style={{
              marginTop: 18,
              fontSize: 14,
              opacity: 0.6,
              position: "relative",
            }}
          >
            {t.emergency?.note || ""}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/* SUCCESS STORIES */
/* ================================================================ */
function SuccessStories({ theme, t }) {
  const stories = t.successStories?.stories || [];

  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1100,
        margin: "70px auto 0",
        padding: "0 40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <h2
          style={{
            fontSize: "clamp(28px, 2vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 12,
          }}
        >
          {t.successStories?.title || "Success Stories"}
        </h2>
        <p style={{ opacity: 0.7, fontSize: 17 }}>
          {t.successStories?.subtitle || ""}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}
      >
        {stories.map((story, i) => (
          <div
            key={i}
            style={{
              borderRadius: 24,
              background: theme.card,
              backdropFilter: "blur(16px)",
              border: theme.border,
              overflow: "hidden",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.background = theme.cardHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = theme.card;
            }}
          >
            {/* Content */}
            <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Quote */}
              <div
                style={{
                  fontSize: 36,
                  lineHeight: 0.8,
                  color: theme.primary,
                  opacity: 0.3,
                  marginBottom: 8,
                  fontFamily: "Georgia, serif",
                }}
              >
                "
              </div>

              <p
                style={{
                  opacity: 0.8,
                  lineHeight: 1.7,
                  fontSize: 15,
                  flex: 1,
                }}
              >
                {story.text}
              </p>

              {/* Author */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: theme.border,
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    background: theme.primaryDim,
                    flexShrink: 0,
                    color: theme.primary,
                  }}
                >
                  {renderIcon(story.avatar, 24)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {story.name}
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.55 }}>
                    {story.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* COMMUNITY / TOP DONORS */
/* ================================================================ */
function CommunitySection({ theme, t }) {
  const topDonors = t.community?.topDonors || [];
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1100,
        margin: "70px auto 0",
        padding: "0 40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <h2
          style={{
            fontSize: "clamp(28px, 2vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 12,
          }}
        >
          {t.community?.title || "Top Donors"}
        </h2>
        <p style={{ opacity: 0.7, fontSize: 17 }}>
          {t.community?.subtitle || ""}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {topDonors.map((donor, i) => (
          <div
            key={i}
            style={{
              padding: "28px 22px",
              borderRadius: 24,
              background: theme.card,
              backdropFilter: "blur(16px)",
              border: theme.border,
              display: "flex",
              alignItems: "center",
              gap: 18,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.background = theme.cardHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = theme.card;
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: theme.primaryDim,
                flexShrink: 0,
                color: theme.primary,
              }}
            >
              {renderBadge(donor.badge)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>
                {donor.name}
              </div>
              <div
                style={{
                  fontSize: 14,
                  opacity: 0.55,
                  marginTop: 4,
                }}
              >
                {donor.type}
              </div>
            </div>

            <div
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                background: theme.primaryDim,
                color: theme.primary,
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {donor.count}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* FEATURES */
/* ================================================================ */
function FeaturesSection({ theme, t }) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1100,
        margin: "70px auto 0",
        padding: "0 40px 80px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2
          style={{
            fontSize: "clamp(30px, 4vw, 42px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 12,
          }}
        >
          {t.featuresTitle}
        </h2>
        <p style={{ opacity: 0.7, fontSize: 17 }}>
          {t.featuresSubtitle}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {t.features.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "32px 28px",
              borderRadius: 24,
              background: theme.card,
              backdropFilter: "blur(14px)",
              border: theme.border,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.background = theme.cardHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = theme.card;
            }}
          >
            <div
              style={{
                fontSize: 42,
                marginBottom: 16,
                color: theme.primary,
              }}
            >
              {renderIcon(item.icon, 36)}
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                opacity: 0.7,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* SHARED STYLES */
/* ================================================================ */

const primaryBtn = {
  padding: "16px 30px",
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(135deg,#ff2d55,#ff7a59)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 16,
  boxShadow: "0 6px 24px rgba(255,45,85,0.3)",
  transition: "all 0.3s ease",
};

const searchBtn = {
  padding: "18px 28px",
  border: "none",
  background: "#ff2d55",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 15,
  transition: "all 0.3s ease",
};

const badgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 20px",
  borderRadius: 999,
  background: "rgba(255,45,85,0.15)",
  color: "#ff2d55",
  marginBottom: 8,
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: "0.02em",
};

function orbStyle(color, size, top, left) {
  return {
    position: "absolute",
    width: size,
    height: size,
    top,
    left,
    background: color,
    filter: "blur(120px)",
    opacity: 0.35,
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  };
}

function renderBadge(emoji) {
  const colorMap = {
    "🥇": "#FFD700",
    "🥈": "#C0C0C0",
    "🥉": "#CD7F32",
  };
  const Icon = emojiIconMap[emoji];
  if (!Icon) return emoji;
  return <Icon style={{ fontSize: 28, color: colorMap[emoji] || "#ff2d55" }} />;
}