"use client";

import { useEffect, useState } from "react";

export default function ScrollReelTestimonials({ testimonials = [] }) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setAnimating(true);

      setTimeout(() => {
        setIndex((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
        setAnimating(false);
      }, 300); // fade out time
    }, 3500); // autoplay speed (Netflix feel)

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const current = testimonials[index];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "10px 0",
        textAlign: "center",
      }}
    >
      {/* QUOTE */}
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          transition: "all 0.35s ease",
          opacity: animating ? 0 : 1,
          transform: animating
            ? "translateY(10px)"
            : "translateY(0px)",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.6,
            fontWeight: 500,
            marginBottom: 20,
            color: "inherit",
          }}
        >
          “{current.quote}”
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src={current.image}
            alt={current.author}
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255,45,85,0.4)",
            }}
          />

          <h4
            style={{
              fontSize: 16,
              fontWeight: 700,
              margin: 0,
              color: "#ff2d55",
            }}
          >
            {current.author}
          </h4>
        </div>
      </div>
    </div>
  );
}