"use client";

import DonorSearchBar from "@/components/features/donor/DonorSearchBar";
import { useContext } from "react";
import { UIContext } from "@/context/UIContext";

export default function DonorsPage() {
  const { dark } = useContext(UIContext);

  const theme = {
    text: dark ? "#fff" : "#111827",
    card: dark ? "rgba(255,255,255,0.06)" : "#fff",
    border: dark
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.08)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Find Blood Donors
      </h1>

      <DonorSearchBar theme={theme} />
    </div>
  );
}