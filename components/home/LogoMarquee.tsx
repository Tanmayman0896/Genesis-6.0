"use client";

import React from "react";
import { usePathname } from "next/navigation";

const FONT: React.CSSProperties = {
  fontFamily: "var(--font-mirava-sans)",
};

const LOOP_ITEMS = [
  { label: "Genesis", platform: "instagram", link: "https://www.instagram.com/genesismuj/" },
  { label: "Genesis", platform: "linkedin", link: "https://www.linkedin.com/company/genesis-muj/" },
  { label: "IEEE CS", platform: "instagram", link: "https://www.instagram.com/ieee_csmuj/" },
  { label: "IEEE CS", platform: "linkedin", link: "https://www.linkedin.com/company/ieee-cs-muj/" },
  { label: "IEEE SB", platform: "instagram", link: "https://www.instagram.com/ieeemuj/" },
  { label: "IEEE SB", platform: "linkedin", link: "https://www.linkedin.com/company/ieeesbmuj/" },
  { label: "IEEE WIE", platform: "instagram", link: "https://www.instagram.com/ieeewiemuj/" },
  { label: "IEEE WIE", platform: "linkedin", link: "https://www.instagram.com/ieee.wiemuj/" },
  { label: "IEEE CIS", platform: "instagram", link: "https://www.instagram.com/ieee.cismuj/" },
  { label: "IEEE CIS", platform: "linkedin", link: "https://www.linkedin.com/company/ieee-cis-muj/" }
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-opacity duration-300">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-opacity duration-300">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LogoRow = () => (
  <div className="flex items-center gap-20 sm:gap-28 shrink-0">
    {LOOP_ITEMS.map((item, index) => (
      <a 
        key={index} 
        href={item.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-3.5 text-white transition-colors duration-300 group"
      >
        {item.platform === "instagram" ? <InstagramIcon /> : <LinkedinIcon />}
        <span className="text-[17px] sm:text-[20px] font-bold tracking-wide" style={FONT}>
          {item.label}
        </span>
      </a>
    ))}
  </div>
);

export default function LogoMarquee() {
  const pathname = usePathname();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (pathname === "/gallery") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  if (pathname === "/gallery") return null;

  return (
    <div ref={containerRef} className="w-full bg-transparent py-6 mb-16 relative overflow-hidden select-none z-10">
      <style>{`
        @keyframes marquee-comp {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-container-comp {
          display: flex;
          animation: marquee-comp 25s linear infinite;
        }
        .animate-marquee-container-comp:hover {
          animation-play-state: paused;
        }
        .animate-marquee-paused {
          animation-play-state: paused !important;
        }
      `}</style>
      
      <div 
        className="w-full overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)"
        }}
      >
        <div className={`flex w-max gap-20 sm:gap-28 animate-marquee-container-comp ${!isVisible ? "animate-marquee-paused" : ""}`}>
          <LogoRow />
          <LogoRow />
          <LogoRow />
          <LogoRow />
        </div>
      </div>
    </div>
  );
}
