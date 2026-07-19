"use client";

import React from "react";

/**
 * NavbarFadeOverlay
 * 
 * Sits directly between the transparent Navbar and the scrolling content.
 * It is fixed at the top of the screen and acts as a visual dissolve filter
 * for any scrolling content that goes behind the navbar.
 * 
 * We use `background-attachment: fixed` on the same gradient as `.fixed-bg`
 * so that the gradient aligns perfectly pixel-for-pixel with the background.
 * We then mask the overlay and backdrop blur using a multi-stop eased gradient,
 * yielding a soft, organic fade that visually mimics Vercel, Apple, and Linear.
 */
export default function NavbarFadeOverlay() {
  return (
    <div
      className="fixed top-0 left-0 right-0 pointer-events-none z-40 gpu-accelerated"
      style={{
        // Extends below the navbar (standard desktop height ~94px) to ensure soft transition.
        height: "160px",
        
        // Match the layout's fixed gradient exactly by setting the size explicitly to the viewport
        background: "linear-gradient(135deg, #07162c 0%, #0e2954 35%, #1f5194 70%, #60a5fa 100%)",
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
        
        // Multi-stop progressive masking (scrim/gradient easing) for an ultra-smooth transition
        WebkitMaskImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.98) 12%,
          rgba(0, 0, 0, 0.93) 25%,
          rgba(0, 0, 0, 0.84) 38%,
          rgba(0, 0, 0, 0.7) 50%,
          rgba(0, 0, 0, 0.52) 63%,
          rgba(0, 0, 0, 0.33) 76%,
          rgba(0, 0, 0, 0.15) 88%,
          rgba(0, 0, 0, 0.04) 95%,
          rgba(0, 0, 0, 0) 100%
        )`,
        maskImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.98) 12%,
          rgba(0, 0, 0, 0.93) 25%,
          rgba(0, 0, 0, 0.84) 38%,
          rgba(0, 0, 0, 0.7) 50%,
          rgba(0, 0, 0, 0.52) 63%,
          rgba(0, 0, 0, 0.33) 76%,
          rgba(0, 0, 0, 0.15) 88%,
          rgba(0, 0, 0, 0.04) 95%,
          rgba(0, 0, 0, 0) 100%
        )`,
      }}
    />
  );
}
