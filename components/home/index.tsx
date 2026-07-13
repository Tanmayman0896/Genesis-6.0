"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import StatsSection from "./StatsSection";
import TopMoments from "./TopMoments";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Preloader from "./Preloader";

// Sleek fallback component that matches MascotCanvas aspect ratios and UI to prevent layout shifts (CLS)
function MascotFallback() {
  return (
    <div className="relative w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[550px] lg:min-h-[650px] flex flex-col items-center justify-center select-none">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-t-white border-r-neutral-600 border-b-neutral-800 border-l-transparent animate-spin duration-700" />
        <div className="absolute w-12 h-12 rounded-full border border-white/5 animate-ping duration-1000" />
        <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      </div>
      <span className="mt-6 font-sans font-medium text-neutral-400 tracking-widest text-[10px] uppercase animate-pulse">
        Initializing 3D Space...
      </span>
    </div>
  );
}

// Lazy load the heavy 3D canvas so it does not block the initial page load/LCP
const MascotCanvas = dynamic(() => import("./MascotCanvas"), {
  ssr: false,
  loading: () => <MascotFallback />,
});

const OPPORTUNITIES = [
  {
    title: "collaborate and skill up",
    bgColor: "bg-[#7aa2f7]", // Blue
    textColor: "text-[#0a1e3f]",
    lineColor: "border-[#0a1e3f]/25",
    badgeBg: "bg-[#ffc3a0]",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15 15 0 00-9 9v7h3v2h2v-2h2v2h2v-2h3v-7a15 15 0 00-9-9zM12 9v4" />
      </svg>
    ),
    description: "Connect with people, form a team, learn new skills and develop amazing projects!",
    transformClasses: "rotate-[-4deg] -translate-x-[10px] -translate-y-[8px] z-10 lg:group-hover:-translate-x-[380px] lg:group-hover:-translate-y-[180px] lg:group-hover:rotate-[-6deg] md:group-hover:-translate-x-[180px] md:group-hover:-translate-y-[260px] md:group-hover:rotate-[-4deg] group-hover:-translate-y-[450px] group-hover:rotate-[-2deg]"
  },
  {
    title: "win exciting prizes",
    bgColor: "bg-[#ff7b54]", // Orange
    textColor: "text-[#1c0f0a]",
    lineColor: "border-[#1c0f0a]/25",
    badgeBg: "bg-[#c3bef7]",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-1.5m-12 0H4.5m15 0a7.5 7.5 0 00-15 0c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5V21m-3 0h6" />
      </svg>
    ),
    description: "Top 3 teams plus best projects of each domain will win prizes which will be disclosed soon!",
    transformClasses: "rotate-[3deg] translate-x-[8px] -translate-y-[4px] z-20 lg:group-hover:translate-x-0 lg:group-hover:-translate-y-[180px] lg:group-hover:rotate-[2deg] md:group-hover:translate-x-[180px] md:group-hover:-translate-y-[260px] md:group-hover:rotate-[3deg] group-hover:-translate-y-[270px] group-hover:rotate-[2deg]"
  },
  {
    title: "engaging workshops",
    bgColor: "bg-[#881337]", // Maroon/Rose
    textColor: "text-white",
    lineColor: "border-white/25",
    badgeBg: "bg-[#fef08a]",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    description: "Technical workshops and events like no-light event will keep the participants engaged throughout.",
    transformClasses: "rotate-[-1deg] -translate-x-[4px] translate-y-[6px] z-30 lg:group-hover:translate-x-[380px] lg:group-hover:-translate-y-[180px] lg:group-hover:rotate-[4deg] md:group-hover:-translate-x-[180px] md:group-hover:translate-y-0 md:group-hover:rotate-[-1deg] group-hover:-translate-y-[90px] group-hover:rotate-[-3deg]"
  },
  {
    title: "mentorship sessions",
    bgColor: "bg-[#2dd4bf]", // Teal
    textColor: "text-[#022c22]",
    lineColor: "border-[#022c22]/25",
    badgeBg: "bg-[#ffedd5]",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    description: "Get mentorship and guidance from prominent technocrats of the industry.",
    transformClasses: "rotate-[5deg] translate-x-[12px] translate-y-[2px] z-40 lg:group-hover:-translate-x-[380px] lg:group-hover:translate-y-[180px] lg:group-hover:rotate-[3deg] md:group-hover:translate-x-[180px] md:group-hover:translate-y-0 md:group-hover:rotate-[4deg] group-hover:translate-y-[90px] group-hover:rotate-[1deg]"
  },
  {
    title: "recruitment offers",
    bgColor: "bg-[#fbbf24]", // Yellow
    textColor: "text-[#451a03]",
    lineColor: "border-[#451a03]/25",
    badgeBg: "bg-[#86efac]",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .9-.75 1.6-1.6 1.6H5.4c-.9 0-1.6-.7-1.6-1.6v-4.25m16.5 0a2.44 2.44 0 00-2.25-2.25H5.75c-1.35 0-2.25.9-2.25 2.25m16.5 0V9.4c0-.9-.75-1.6-1.6-1.6H5.4c-.9 0-1.6.7-1.6 1.6v4.75M15 7.8V4.5c0-.9-.75-1.6-1.6-1.6h-2.8c-.9 0-1.6.7-1.6 1.6V7.8" />
      </svg>
    ),
    description: "Best performers will get recruitment offers from prestigious companies.",
    transformClasses: "rotate-[-3deg] -translate-x-[6px] translate-y-[10px] z-50 lg:group-hover:translate-x-0 lg:group-hover:translate-y-[180px] lg:group-hover:rotate-[-2deg] md:group-hover:-translate-x-[180px] md:group-hover:translate-y-[260px] md:group-hover:rotate-[-2deg] group-hover:translate-y-[270px] group-hover:rotate-[3deg]"
  },
  {
    title: "expand network",
    bgColor: "bg-[#a78bfa]", // Purple
    textColor: "text-[#1e1b4b]",
    lineColor: "border-[#1e1b4b]/25",
    badgeBg: "bg-[#bfdbfe]",
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    description: "Connect with industry professionals and recruiters and other teams to learn and grow more.",
    transformClasses: "rotate-[1deg] translate-x-[2px] -translate-y-[12px] z-60 lg:group-hover:translate-x-[380px] lg:group-hover:translate-y-[180px] lg:group-hover:rotate-[6deg] md:group-hover:translate-x-[180px] md:group-hover:translate-y-[260px] md:group-hover:rotate-[5deg] group-hover:translate-y-[450px] group-hover:rotate-[-1deg]"
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  const handleLoaded = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  useGSAP(() => {
    if (isLoading) return;

    // Entrance animation for the mascot canvas synchronized with curtain slide
    const delay = 0.35;
    gsap.fromTo(
      canvasParentRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay }
    );

    // Entrance animation for the background giant text
    gsap.fromTo(
      bgTextRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out", delay: delay + 0.15 }
    );
  }, { dependencies: [isLoading], scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative w-full flex flex-col items-center overflow-x-hidden bg-transparent"
    >
      {/* Hero Section with Mascot */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Giant Text */}
        <div 
          ref={bgTextRef}
          className="absolute inset-0 flex flex-col items-center justify-start pt-24 md:justify-center md:pt-0 select-none pointer-events-none z-0"
          style={{ opacity: 0 }}
        >
          <h1 className="text-[13vw] sm:text-[15vw] md:text-[19vw] font-black tracking-widest font-absans bg-gradient-to-b from-white/90 to-white/10 bg-clip-text text-transparent uppercase text-center leading-none">
            GENESIS 6.0
          </h1>
        </div>

        {/* Center 3D Mascot Canvas Wrapper */}
        <div 
          ref={canvasParentRef}
          className="w-[115vw] sm:w-full max-w-[500px] sm:max-w-[800px] aspect-square shrink-0 flex items-center justify-center relative z-10"
          style={{ opacity: 0 }}
        >
          <MascotCanvas onProgress={setProgress} onLoaded={handleLoaded} />
        </div>
      </div>

      {/* Screen preloader curtain */}
      {isPreloaderActive && (
        <Preloader
          isLoading={isLoading}
          onRevealComplete={() => setIsPreloaderActive(false)}
        />
      )}

      {/* Clean Typographic Stats Section */}
      <StatsSection />

      {/* Genesis Top Moments (Sticker Collage Gallery) */}
      <TopMoments />

      {/* Opportunities Section */}
      <section className="opportunities-section w-full max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10 flex flex-col items-center text-white">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="text-center max-w-5xl mb-16 md:mb-24">
          <p className="text-base md:text-lg font-bold uppercase tracking-widest text-blue-400 mb-3">
            Opportunities for Participants
          </p>
          <h2 className="text-[38px] md:text-[62px] font-extrabold tracking-tight font-mirava-sans bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent mb-6 md:whitespace-nowrap">
            Why participate in Genesis 6.0?
          </h2>
          <p className="text-xl md:text-[22px] text-blue-100/80 font-light leading-relaxed">
            Genesis 6.0 promises a wonderful experience to the participants.
          </p>
        </div>

        {/* Mobile 2-Column Grid (lg:hidden) - Permanently Opened */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mx-auto px-4 md:px-0 lg:hidden mt-8">
          {OPPORTUNITIES.map((opp, idx) => (
            <div
              key={idx}
              className={`opportunity-card relative p-5 sm:p-6 rounded-2xl ${opp.bgColor} ${opp.textColor} flex flex-col justify-between shadow-xl even:-rotate-1 odd:rotate-1`}
              style={{ minHeight: "190px" }}
            >
              {/* Sticker Badge (Smaller for mobile) */}
              <div className={`absolute -top-2.5 -right-2.5 w-9 h-9 ${opp.badgeBg} rounded-full flex items-center justify-center shadow-md border border-white/15 text-[#0a1e3f] rotate-6`}>
                <div className={`w-4 h-4 ${opp.textColor === "text-white" ? "text-rose-800" : opp.textColor}`}>
                  {opp.icon}
                </div>
              </div>
              
              <div>
                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-black font-sans tracking-tight mb-1.5 lowercase leading-tight">
                  {opp.title}
                </h3>
                
                {/* Divider Line */}
                <div className={`w-full border-t border-current/25 my-3`} />
                
                {/* Description Paragraph with Star Bullet */}
                <p className="font-sans font-semibold text-[11px] sm:text-[13px] leading-relaxed flex items-start gap-1.5 opacity-90">
                  <span className="text-xs leading-none select-none">✦</span>
                  <span>{opp.description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Opportunities Stack Container (Stash) - Hover fans it out (hidden lg:flex) */}
        <div className="hidden lg:flex relative w-full min-h-[660px] items-center justify-center mt-12 group select-none">
          {/* Cards Wrapper */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {OPPORTUNITIES.map((opp, idx) => (
              <div
                key={idx}
                className={`opportunity-card w-[340px] h-[280px] p-6 md:p-8 rounded-[32px] ${opp.bgColor} ${opp.textColor} transition-all duration-700 flex flex-col shadow-2xl pointer-events-auto absolute ${opp.transformClasses}`}
                style={{
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
              >
                {/* Sticker Badge */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 ${opp.badgeBg} rounded-full flex items-center justify-center rotate-12 shadow-md border border-white/20 ${opp.textColor === "text-white" ? "text-[#881337]" : opp.textColor}`}>
                  <div className="w-6 h-6">
                    {opp.icon}
                  </div>
                </div>
                
                {/* Card Title (lowercase) */}
                <h3 className="text-2xl md:text-[27px] font-black font-sans tracking-tight mb-1 lowercase leading-tight">
                  {opp.title}
                </h3>
                
                {/* Divider Line */}
                <div className={`w-full border-t-2 ${opp.lineColor} my-4`} />
                
                {/* Description Paragraph with Star Bullet */}
                <p className="font-sans font-semibold text-sm md:text-[15px] leading-relaxed mt-1 flex items-start gap-2">
                  <span className="text-base leading-none select-none">✦</span>
                  <span>{opp.description}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
