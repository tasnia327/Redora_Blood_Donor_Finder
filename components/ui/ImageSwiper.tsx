"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface ImageSwiperProps {
  images: string;
  cardWidth?: number;
  cardHeight?: number;
  autoplayDelay?: number;
  gap?: number;
  className?: string;
}

export const ImageSwiper: React.FC<ImageSwiperProps> = ({
  images,
  cardWidth = 480,
  cardHeight = 460,
  autoplayDelay = 3000,
  gap = 16,
  className = "",
}) => {
  const imageList = useMemo(
    () =>
      images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean),
    [images]
  );

  const total = imageList.length;
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (total <= 1) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, autoplayDelay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total, autoplayDelay]);

  if (!total) return null;

  const slideSize = cardWidth + gap;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
    >
      {/* TRACK (IMPORTANT: width is explicit) */}
      <div
        style={{
          display: "flex",
          height: "100%",
          width: `${total * slideSize}px`,
          transform: `translateX(-${index * slideSize}px)`,
          transition: "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {imageList.map((src, i) => (
          <div
            key={i}
            style={{
              width: cardWidth,
              height: cardHeight,
              marginRight: i === total - 1 ? 0 : gap,
              flexShrink: 0,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <img
              src={src}
              alt={`slide-${i}`}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};