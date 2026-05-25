"use client";

import { createContext, useState } from "react";

export const UIContext = createContext();

const translations = {
  en: {
    badge: "🔥 Life-saving Network",
    title: "Find Blood Donors Instantly",
    subtitle:
      "A beautiful network connecting lifesavers with those in need — fast, smart, global.",
    cta1: "Find Donor",
    cta2: "Become Donor",
    search: "Search blood group, city or hospital...",
    searchBtn: "Search",
    stats: [
      ["12K+", "Registered Donors"],
      ["3.8K+", "Lives Saved"],
      ["24/7", "Emergency Support"],
    ],
    featuresTitle: "Why Choose Redora?",
    featuresSubtitle: "Smart technology built for emergency blood support.",
    features: [
      {
        icon: "⚡",
        title: "Instant Search",
        text: "Find donors nearby within seconds.",
      },
      {
        icon: "🩸",
        title: "Verified Donors",
        text: "Safe and trusted donor network.",
      },
      {
        icon: "📍",
        title: "Location Based",
        text: "Smart matching based on your location.",
      },
    ],
    footer: {
      brand:
        "A smart blood donation network connecting lifesavers with people in emergency situations.",
      platform: "Platform",
      platformLinks: ["Home", "Donors", "Become Donor"],
      support: "Support",
      supportLinks: ["Help", "Contact", "FAQ"],
      legal: "Legal",
      legalLinks: ["Privacy", "Terms"],
      tagline: "Built to save lives ❤️",
    },
    settings: {
      theme: "Theme",
      dark: "Dark",
      light: "Light",
      language: "Language",
      fontSize: "Font Size",
    },
  },

  bn: {
    badge: "🔥 জীবন রক্ষাকারী নেটওয়ার্ক",
    title: "তাৎক্ষণিক রক্তদাতা খুঁজুন",
    subtitle: "জীবন বাঁচাতে দ্রুত সংযোগ তৈরি করুন।",
    cta1: "ডোনার খুঁজুন",
    cta2: "ডোনার হোন",
    search: "রক্তের গ্রুপ, শহর বা হাসপাতাল লিখুন...",
    searchBtn: "খুঁজুন",
    stats: [
      ["১২হা+", "নিবন্ধিত ডোনার"],
      ["৩.৮হা+", "বাঁচানো জীবন"],
      ["২৪/৭", "জরুরি সহায়তা"],
    ],
    featuresTitle: "কেন রেডোরা বেছে নেবেন?",
    featuresSubtitle: "জরুরি রক্ত সহায়তার জন্য স্মার্ট প্রযুক্তি।",
    features: [
      {
        icon: "⚡",
        title: "তাৎক্ষণিক অনুসন্ধান",
        text: "কয়েক সেকেন্ডে কাছের ডোনার খুঁজুন।",
      },
      {
        icon: "🩸",
        title: "যাচাইকৃত ডোনার",
        text: "নিরাপদ ও বিশ্বস্ত ডোনার নেটওয়ার্ক।",
      },
      {
        icon: "📍",
        title: "লোকেশন ভিত্তিক",
        text: "আপনার অবস্থান অনুযায়ী স্মার্ট ম্যাচিং।",
      },
    ],
    footer: {
      brand:
        "একটি স্মার্ট রক্তদান নেটওয়ার্ক যা জরুরি পরিস্থিতিতে জীবন রক্ষাকারীদের সংযুক্ত করে।",
      platform: "প্ল্যাটফর্ম",
      platformLinks: ["হোম", "ডোনার", "ডোনার হোন"],
      support: "সহায়তা",
      supportLinks: ["সাহায্য", "যোগাযোগ", "প্রশ্নোত্তর"],
      legal: "আইনি",
      legalLinks: ["গোপনীয়তা", "শর্তাবলী"],
      tagline: "জীবন বাঁচাতে তৈরি ❤️",
    },
    settings: {
      theme: "থিম",
      dark: "অন্ধকার",
      light: "আলো",
      language: "ভাষা",
      fontSize: "ফন্ট সাইজ",
    },
  },
};

export default function UIProvider({ children }) {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("en");
  const [fontSize, setFontSize] = useState(16);
  const [open, setOpen] = useState(false);

  const t = translations[lang];

  return (
    <UIContext.Provider
      value={{
        dark,
        setDark,

        lang,
        setLang,

        fontSize,
        setFontSize,

        open,
        setOpen,

        t,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
