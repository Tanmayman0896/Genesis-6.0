"use client";

import React from "react";

// ─── Font helper ──────────────────────────────────────────────────────────────
const FONT: React.CSSProperties = {
  fontFamily: "var(--font-mirava-sans)",
};

interface Partner {
  name: string;
  logo: React.ReactNode;
  website: string;
}

const PARTNERS_DATA: Partner[] = [
  {
    name: "HP",
    logo: (
      <svg viewBox="0 0 100 100" className="w-24 h-24">
        <circle cx="50" cy="50" r="46" fill="#0096D6" />
        <text x="50" y="62" fill="white" fontStyle="italic" fontWeight="bold" fontSize="36" fontFamily="sans-serif" textAnchor="middle">hp</text>
      </svg>
    ),
    website: "https://www.hp.com",
  },
  {
    name: "Monster",
    logo: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-white fill-current opacity-95">
        <path d="M38 12c-2 15 3 45 4 60c-2-15-4-45-4-60M50 8c-2 20 4 68 3 84c-1-16-4-56-3-84M62 16c-2 12 3 38 4 50c-2-12-4-38-4-50" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    ),
    website: "https://www.monsterenergy.com",
  },
  {
    name: "IEEE Rajasthan",
    logo: (
      <div className="bg-[#ffffff] px-5 py-2.5 rounded-lg flex items-center justify-center shadow-md">
        <svg viewBox="0 0 180 50" className="w-44 h-11">
          <polygon points="5,25 25,5 45,25 25,45" fill="#00629B" />
          <line x1="25" y1="5" x2="25" y2="45" stroke="white" strokeWidth="1.5" />
          <line x1="25" y1="25" x2="13" y2="25" stroke="white" strokeWidth="1.5" />
          <line x1="25" y1="25" x2="37" y2="25" stroke="white" strokeWidth="1.5" />
          <text x="55" y="24" fill="#00629B" fontSize="19" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">IEEE</text>
          <text x="55" y="40" fill="#1e3a8a" fontSize="7.5" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.1">RAJASTHAN SUB SECTION</text>
        </svg>
      </div>
    ),
    website: "https://ieeerajasthan.org",
  },
  {
    name: "TribeVibe",
    logo: (
      <svg viewBox="0 0 200 50" className="w-48 h-12 text-white">
        <circle cx="25" cy="25" r="18" fill="none" stroke="white" strokeWidth="2.5" />
        <path d="M22 14h6v3h-4v15h-2V17h-2zM28 20l3-6h-6z" fill="white" />
        <text x="54" y="26" fill="white" fontSize="20" fontWeight="bold" fontFamily="sans-serif">TribeVibe</text>
        <text x="54" y="38" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">A BookMyShow Enterprise</text>
      </svg>
    ),
    website: "https://www.tribevibe.live",
  },
  {
    name: "Starbucks",
    logo: (
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        <circle cx="50" cy="50" r="46" fill="#00704A" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="50" r="16" fill="#00704A" />
        <path d="M47 43l3 8 3-8z" fill="white" />
        <polygon points="50,22 52,28 58,28 53,32 55,38 50,34 45,38 47,32 42,28 48,28" fill="white" />
        <path d="M28 65c5-10 12-15 15-15M72 65c-5-10-12-15-15-15" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    ),
    website: "https://www.starbucks.in",
  },
  {
    name: "Decathlon",
    logo: (
      <svg viewBox="0 0 220 50" className="w-48 h-12 text-white">
        <text x="0" y="35" fill="white" fontSize="26" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">DECATHLON</text>
      </svg>
    ),
    website: "https://www.decathlon.in",
  },
  {
    name: "StepNex",
    logo: (
      <svg viewBox="0 0 220 50" className="w-48 h-12 text-white">
        <g fill="white">
          <rect x="5" y="32" width="10" height="3" rx="0.5" />
          <rect x="10" y="26" width="10" height="3" rx="0.5" />
          <rect x="15" y="20" width="10" height="3" rx="0.5" />
          <rect x="20" y="14" width="10" height="3" rx="0.5" />
          <line x1="5" y1="36" x2="30" y2="12" stroke="white" strokeWidth="1.5" />
        </g>
        <text x="40" y="24" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">StepNex</text>
        <text x="40" y="36" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Technologies</text>
      </svg>
    ),
    website: "https://stepnex.in",
  },
  {
    name: "Unstop",
    logo: (
      <div className="bg-[#ffffff] px-6 py-2 rounded-full flex items-center justify-center shadow-md">
        <svg viewBox="0 0 120 30" className="w-32 h-8">
          <text x="60" y="22" fill="#000000" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">unstop</text>
        </svg>
      </div>
    ),
    website: "https://unstop.com",
  },
  {
    name: "Spice",
    logo: (
      <div className="flex flex-col items-center gap-1.5">
        <svg viewBox="0 0 100 50" className="w-16 h-10 text-white">
          <path d="M50 5c-8 0-14 6-14 13s6 13 14 17c8 4 14 6 14 13s-6 13-14 13-14-6-14-13h4c0 6 4 10 10 10s10-4 10-10-4-10-10-14c-8-4-14-6-14-13s6-13 14-13 14 6 14 13h-4c0-6-4-10-10-10z" fill="white" />
        </svg>
        <text className="text-white text-[10px] font-black tracking-[0.25em] uppercase" style={FONT}>SPICE</text>
      </div>
    ),
    website: "https://spice.in",
  }
];

export default function PartnersPage() {
  return (
    <main className="relative min-h-screen w-full px-6 py-32 md:px-12 flex flex-col items-center justify-start overflow-x-hidden font-sans text-white select-none">
      
      {/* Background Gradient */}
      <div
        className="fixed inset-0 -z-50"
        style={{
          background:
            "linear-gradient(135deg, rgb(7,22,44) 0%, rgb(14,41,84) 35%, rgb(31,81,148) 70%, rgb(96,165,250) 100%)",
        }}
      />

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Header Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 uppercase"
          style={FONT}
        >
          Our{" "}
          <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            Partners
          </span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100/70 font-light max-w-2xl mx-auto leading-relaxed">
          We are proud to collaborate with visionary organizations that share our passion for innovation and technology. These esteemed partners play a crucial role in making Genesis 6.0 a success.
        </p>
      </div>

      {/* Partner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mt-8">
        {PARTNERS_DATA.map((partner, idx) => (
          <a
            key={idx}
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#0d1b35] border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 min-h-[200px]"
          >
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-blue-400/30 rounded-tr-2xl transition-all duration-300 pointer-events-none" />

            {/* Logo Container */}
            <div className="flex-1 flex items-center justify-center w-full">
              {partner.logo}
            </div>

            {/* Bottom Row: Name */}
            <div className="w-full mt-6 text-center text-[18px] font-bold text-blue-100 group-hover:text-white transition-colors duration-300">
              <span style={FONT}>{partner.name}</span>
            </div>
          </a>
        ))}
      </div>

    </main>
  );
}
