"use client";

import React from "react";

const FONT: React.CSSProperties = {
  fontFamily: "var(--font-mirava-sans)",
};

interface Partner {
  name: string;
  logo: string;
  website: string;
}

const PARTNERS_DATA: Partner[] = [
  {
    name: "Google Developer Groups",
    logo: "https://images.prismic.io/ieeemuj/1jM6EGUfybaYOfhJ_GDG.png?auto=format,compress",
    website: "https://gdg.community.dev/",
  },
  {
    name: "Jio Saaavn",
    logo: "https://images.prismic.io/ieeemuj/UaBPGvhbNTJ0jN1E_jiosaavn.png?auto=format,compress",
    website: "https://www.jiosaavn.com/",
  },
  {
    name: "HackerRank",
    logo: "https://images.prismic.io/ieeemuj/vP5FGW3EOgVufwsz_HackerRank.png?auto=format,compress",
    website: "https://www.hackerrank.com/",
  },
  {
    name: "Zorko",
    logo: "https://images.prismic.io/ieeemuj/wYeC91G1KA623Hlt_zorko.png?auto=format,compress",
    website: "https://zorko.in/",
  },
  {
    name: "Unstop",
    logo: "https://images.prismic.io/ieeemuj/UM0Uz8qoVNjfI6lH_unstop.png?auto=format,compress",
    website: "https://unstop.com/",
  },
  {
    name: "Elsheph Systems",
    logo: "https://images.prismic.io/ieeemuj/uDlBQgieRETfhCjL_elsheph.png?auto=format,compress",
    website: "https://www.elsheph.com/",
  },
  {
    name: "Thinkque Consulting",
    logo: "https://images.prismic.io/ieeemuj/gUkccj4Cp48WHqW-_thinkque.png?auto=format,compress",
    website: "https://www.thinkqueconsulting.com/",
  },
  {
    name: "JBM Group",
    logo: "https://images.prismic.io/ieeemuj/JmZvJha45H1gaXxQ_jbm.png?auto=format,compress",
    website: "https://www.jbmgroup.com/",
  },
  {
    name: "Akbhar Travels",
    logo: "https://images.prismic.io/ieeemuj/K-9E4hFYHmLtHfzD_akbar.png?auto=format,compress",
    website: "https://www.akbartravels.com",
  },
  {
    name: "Club Leno",
    logo: "https://images.prismic.io/ieeemuj/OKq8TwkRGXi0G2Dl_ClubLeno.png?auto=format,compress",
    website: "https://www.instagram.com/clubleno/",
  },
  {
    name: "Code Crafters",
    logo: "https://images.prismic.io/ieeemuj/_81RYhfLKIRElX-g_Lockup-Stacked-Dark.jpg?auto=format,compress",
    website: "https://codecrafters.io/",
  },
  {
    name: "Scribbles",
    logo: "https://images.prismic.io/ieeemuj/vOtZnH9UI29uUDdm_Scribbles.png?auto=format,compress",
    website: "https://www.instagram.com/scribblesmuj/",
  },
  {
    name: "Aperture",
    logo: "https://images.prismic.io/ieeemuj/iZ06s6mubzcltVLv_aperture.png?auto=format,compress",
    website: "https://www.instagram.com/aperturemuj/",
  },
  {
    name: "Coreografia",
    logo: "https://images.prismic.io/ieeemuj/gxF9La3DdxB5EC-A_Coreografia.png?auto=format,compress",
    website: "https://www.instagram.com/coreografia_muj/",
  },
  {
    name: "The Music Band",
    logo: "https://images.prismic.io/ieeemuj/PYRZhpEpp1sbEG2o_TMC.png?auto=format,compress",
    website: "https://www.instagram.com/tmc.muj/",
  },
];

interface FeaturedPartner {
  name: string;
  category: string;
  logo: string;
  description: string;
  website: string;
}

const FEATURED_PARTNERS: FeaturedPartner[] = [
  {
    name: "Synth powered by Elsheph",
    category: "Title Sponsor",
    logo: "https://images.prismic.io/ieeemuj/pxFM2lcdwsbG-AYp_synth.png?auto=format,compress",
    description:
      "Synth powered by Elsheph:- Unlock every signal. Push past every limit.",
    website: "https://www.synthsports.co/",
  },
];

export default function PartnersPage() {
  return (
    <main className="relative min-h-screen w-full px-6 py-32 md:px-12 flex flex-col items-center justify-start overflow-x-hidden font-sans text-white select-none">

      {/* Decorative Glow Elements */}
      <div className="gpu-accelerated absolute top-1/4 left-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="gpu-accelerated absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

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
          We are proud to collaborate with visionary organizations that share
          our passion for innovation and technology. These esteemed partners
          play a crucial role in making Genesis 6.0 a success.
        </p>
      </div>

      {/* Featured Partners Section */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 mb-8 mt-4">
        {FEATURED_PARTNERS.map((partner, idx) => (
          <div key={idx} className="relative group flex flex-col">

            {/* Ambient Glow */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-pink-500/10 via-purple-500/15 to-blue-500/15 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none -z-10" />

            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.05] backdrop-blur-[32px] border border-white/[0.08] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.22),inset_0_-1px_1.5px_rgba(0,0,0,0.18),0_12px_32px_rgba(0,0,0,0.25)] hover:border-white/20 hover:bg-white/[0.09] transition-all duration-500 hover:-translate-y-1 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.38),inset_0_-1px_1.5px_rgba(0,0,0,0.1),0_24px_50px_rgba(30,144,255,0.22)] gap-8 text-left"
            >

              {/* Logo */}
              <div className="flex-shrink-0 w-full md:w-1/3 flex items-center justify-center md:justify-start">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-32 object-contain"
                />
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-row items-center justify-between gap-6 w-full">

                <div className="flex flex-col gap-1">
                  <h3
                    className="text-2xl md:text-3xl font-black text-white"
                    style={FONT}
                  >
                    {partner.name}
                  </h3>

                  <span className="text-[14px] md:text-[16px] font-bold text-blue-300">
                    {partner.category}
                  </span>

                  <p className="text-xs md:text-sm text-blue-100/70 leading-relaxed font-sans font-medium">
                    {partner.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-blue-100 group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>

              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Partner Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full max-w-6xl mx-auto mt-8">

        {PARTNERS_DATA.map((partner, idx) => (
          <div key={idx} className="relative group flex flex-col">

            {/* Ambient Glow */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-pink-500/10 via-purple-500/15 to-blue-500/15 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none -z-10" />

            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col justify-between p-4 sm:p-8 rounded-2xl bg-white/[0.05] backdrop-blur-[32px] border border-white/[0.08] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.22),inset_0_-1px_1.5px_rgba(0,0,0,0.18),0_12px_32px_rgba(0,0,0,0.25)] hover:border-white/20 hover:bg-white/[0.09] transition-all duration-500 hover:-translate-y-1 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.38),inset_0_-1px_1.5px_rgba(0,0,0,0.1),0_24px_50px_rgba(30,144,255,0.22)] min-h-[160px] sm:min-h-[200px] flex-1"
            >

              {/* Corner Decorative Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-white/20 rounded-tr-2xl transition-all duration-300 pointer-events-none" />

              {/* Logo Container */}
              <div className="flex-1 flex items-center justify-center w-full">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-24 sm:max-h-32 object-contain"
                />
              </div>

              {/* Partner Name */}
              <div className="w-full mt-6 text-center text-[18px] font-bold text-blue-100 group-hover:text-white transition-colors duration-300">
                <span style={FONT}>{partner.name}</span>
              </div>

            </a>
          </div>
        ))}

      </div>
    </main>
  );
}