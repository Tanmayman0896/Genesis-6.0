"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PreloaderProps {
  isLoading: boolean;
  onRevealComplete: () => void;
}

export default function Preloader({ isLoading, onRevealComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Disable scroll when preloader is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Trigger curtain reveal timeline once isLoading changes to false
  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline({
        onComplete: onRevealComplete,
        defaults: { ease: "power3.inOut" }
      });

      // 1. Fade out the centered logo branding
      tl.to(logoRef.current, {
        opacity: 0,
        scale: 0.92,
        y: -15,
        duration: 0.5,
      });

      // 2. Slide the curtain overlay down to reveal the page content
      tl.to(containerRef.current, {
        yPercent: 100,
        duration: 1.0,
      }, "-=0.2");
    }
  }, [isLoading, onRevealComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50 flex flex-col items-center justify-center bg-[#050508] select-none"
      style={{ willChange: "transform" }}
    >
      {/* Visual background atmospheric glow */}
      <div className="absolute w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Centered Logo Container */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center">
        <Image
          src="/genesislogo.png"
          alt="Genesis Logo"
          width={220}
          height={75}
          className="object-contain animate-pulse duration-2000"
          priority
        />
      </div>
    </div>
  );
}
