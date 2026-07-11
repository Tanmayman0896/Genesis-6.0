"use client";

import React, { useRef, useState, useEffect } from "react";

function StatItem({ end, label, suffix }: { end: number; label: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const duration = 2000; // 2 seconds

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const progressRatio = Math.min(progress / duration, 1);
            const easeRatio = 1 - Math.pow(1 - progressRatio, 4); // Quartic ease out
            
            setCount(Math.floor(easeRatio * end));

            if (progress < duration) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div 
      ref={itemRef}
      className="flex flex-col items-center justify-center text-center group cursor-default select-none py-6 transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Big Counter Number */}
      <span className="text-5xl sm:text-6xl lg:text-7xl font-black font-mirava-sans tracking-tight text-[#60a5fa] drop-shadow-[0_0_20px_rgba(96,165,250,0.2)] group-hover:text-white group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all duration-500 leading-none">
        {count.toLocaleString()}{suffix}
      </span>

      {/* Label */}
      <span className="mt-4 text-base sm:text-lg md:text-xl font-bold uppercase tracking-widest text-blue-100/60 group-hover:text-blue-300 transition-colors duration-500">
        {label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 lg:gap-24 items-center justify-items-center w-full">
        {/* Sponsors */}
        <div className="w-full">
          <StatItem end={10} label="Sponsors" suffix="+" />
        </div>
        
        {/* Participants */}
        <div className="w-full">
          <StatItem end={2000} label="Participants" suffix="+" />
        </div>
        
        {/* Societies */}
        <div className="w-full">
          <StatItem end={3} label="Societies" suffix="+" />
        </div>
        
        {/* Prize Pool */}
        <div className="w-full">
          <StatItem end={300000} label="Prize Pool" suffix="+" />
        </div>
      </div>
    </section>
  );
}
