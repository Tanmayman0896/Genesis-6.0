"use client";

import MascotCanvas from "./MascotCanvas";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animation for the mascot canvas
    gsap.fromTo(
      canvasParentRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #07162c 0%, #0e2954 35%, #1f5194 70%, #60a5fa 100%)",
      }}
    >
      {/* Center 3D Mascot Canvas Wrapper */}
      <div 
        ref={canvasParentRef}
        className="w-full max-w-[800px] aspect-square flex items-center justify-center relative z-10"
      >
        <MascotCanvas />
      </div>
    </div>
  );
}
