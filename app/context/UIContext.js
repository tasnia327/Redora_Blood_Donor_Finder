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
    howItWorks: {
      title: "How It Works",
      subtitle: "Three simple steps to save a life",
      steps: [
        {
          num: "01",
          icon: "🔍",
          title: "Search",
          text: "Enter your location and blood group need to find matching donors near you.",
        },
        {
          num: "02",
          icon: "📞",
          title: "Connect",
          text: "Reach out directly to verified donors via call or message instantly.",
        },
        {
          num: "03",
          icon: "❤️",
          title: "Save Lives",
          text: "Get the blood you need in time and make a life-saving difference.",
        },
      ],
    },
    bloodGroups: {
      title: "Blood Groups Available",
      subtitle: "Find donors across all major blood types",
      groups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergency: {
      title: "🚨 Need Blood Urgently?",
      subtitle: "We're here 24/7 to connect you with donors immediately.",
      cta: "Request Emergency Blood",
      note: "Average response time: Under 10 minutes",
    },
    successStories: {
      title: "Real Stories, Real Impact",
      subtitle: "Thousands of lives touched through our community",
      stories: [
        {
          name: "Sarah Ahmed",
          role: "Patient, Dhaka",
          avatar: "👩",
          text: "Redora helped me find an O- donor within 15 minutes. It literally saved my father's life during a critical surgery.",
        },
        {
          name: "Rafiq Hasan",
          role: "Donor, Chittagong",
          avatar: "👨",
          text: "I've donated 5 times through Redora. The platform makes it so easy to show up and help someone in need.",
        },
        {
          name: "Dr. Nusrat Jahan",
          role: "Emergency Physician",
          avatar: "👩‍⚕️",
          text: "As a doctor, I recommend Redora to all my patients' families. It's a reliable bridge between donors and recipients.",
        },
      ],
    },
    community: {
      title: "Top Donors",
      subtitle: "Our most active lifesavers this month",
      topDonors: [
        {
          name: "Karim Uddin",
          type: "A+ Donor",
          count: "8 donations",
          badge: "🥇",
        },
        {
          name: "Fatima Begum",
          type: "O+ Donor",
          count: "6 donations",
          badge: "🥈",
        },
        {
          name: "Hasan Ali",
          type: "B- Donor",
          count: "5 donations",
          badge: "🥉",
        },
      ],
    },
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
    howItWorks: {
      title: "কিভাবে কাজ করে",
      subtitle: "একটি জীবন বাঁচাতে তিনটি সহজ ধাপ",
      steps: [
        {
          num: "০১",
          icon: "🔍",
          title: "অনুসন্ধান",
          text: "আপনার অবস্থান এবং রক্তের গ্রুপ লিখে কাছের ডোনার খুঁজুন।",
        },
        {
          num: "০২",
          icon: "📞",
          title: "যোগাযোগ",
          text: "যাচাইকৃত ডোনারদের সাথে সরাসরি কল বা মেসেজে যোগাযোগ করুন।",
        },
        {
          num: "০৩",
          icon: "❤️",
          title: "জীবন বাঁচান",
          text: "সময়ে প্রয়োজনীয় রক্ত পেয়ে একটি জীবন বাঁচান।",
        },
      ],
    },
    bloodGroups: {
      title: "রক্তের গ্রুপ সমূহ",
      subtitle: "সব প্রধান রক্ত গ্রুপে ডোনার খুঁজুন",
      groups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergency: {
      title: "🚨 জরুরি রক্ত প্রয়োজন?",
      subtitle: "আমরা ২৪/৭ আপনাকে ডোনারদের সাথে সংযুক্ত করতে এখানে আছি।",
      cta: "জরুরি রক্তের অনুরোধ করুন",
      note: "গড় প্রতিক্রিয়া সময়: ১০ মিনিটের নিচে",
    },
    successStories: {
      title: "বাস্তব গল্প, বাস্তব প্রভাব",
      subtitle: "আমাদের কমিউনিটির মাধ্যমে হাজারো জীবন স্পর্শ করা হয়েছে",
      stories: [
        {
          name: "সারা আহমেদ",
          role: "রোগী, ঢাকা",
          avatar: "👩",
          text: "রেডোরা আমাকে ১৫ মিনিটের মধ্যে ও- ডোনার খুঁজে দিয়েছে। এটি আমার বাবার জীবন বাঁচিয়েছে।",
        },
        {
          name: "রফিক হাসান",
          role: "ডোনার, চট্টগ্রাম",
          avatar: "👨",
          text: "আমি রেডোরার মাধ্যমে ৫ বার রক্ত দিয়েছি। প্ল্যাটফর্মটি সহজেই সাহায্য করতে দেয়।",
        },
        {
          name: "ডা. নুসরাত জাহান",
          role: "জরুরি বিভাগের চিকিৎসক",
          avatar: "👩‍⚕️",
          text: "একজন ডাক্তার হিসেবে আমি রেডোরা সুপারিশ করি। এটি ডোনার এবং গ্রহীতার মধ্যে একটি নির্ভরযোগ্য সেতু।",
        },
      ],
    },
    community: {
      title: "শীর্ষ ডোনার",
      subtitle: "এই মাসে আমাদের সবচেয়ে সক্রিয় জীবন রক্ষাকারী",
      topDonors: [
        {
          name: "করিম উদ্দিন",
          type: "এ+ ডোনার",
          count: "৮টি দান",
          badge: "🥇",
        },
        {
          name: "ফাতিমা বেগম",
          type: "ও+ ডোনার",
          count: "৬টি দান",
          badge: "🥈",
        },
        {
          name: "হাসান আলী",
          type: "বি- ডোনার",
          count: "৫টি দান",
          badge: "🥉",
        },
      ],
    },
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
  const [dark, setDark] = useState(false);
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