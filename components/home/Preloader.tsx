"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PreloaderProps {
  isLoading: boolean;
  onRevealComplete: () => void;
}

export default function Preloader({
  isLoading,
  onRevealComplete,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!isLoading && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 7,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        onComplete: onRevealComplete,
      });
    }
  }, [isLoading, onRevealComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50 bg-[#050508] select-none overflow-hidden"
    >
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      >
        {/* Atmospheric glow */}
        <div className="absolute w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/genesislogo.png"
            alt="Genesis Logo"
            width={220}
            height={75}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
