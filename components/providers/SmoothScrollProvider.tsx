"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Sync GSAP ScrollTrigger updates with Lenis scroll events
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    // Drive Lenis RAF loop through GSAP's ticker for absolute frame-rate synchronization
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000); // convert seconds to milliseconds
    };
    gsap.ticker.add(updateTicker);

    // Disable lag smoothing in GSAP to prevent jumps during heavy frames
    gsap.ticker.lagSmoothing(0);

    // Initial recalculation of ScrollTrigger positions
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(updateTicker);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis 
      root 
      options={{ lerp: 0.1, duration: 1.2, syncTouch: true, autoRaf: false }}
    >
      <ScrollReset />
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}
