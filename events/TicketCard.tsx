"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TicketData {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  price: string;
  color: string; 
  glowColor: string;
  barcode: string; // Image path for custom barcode
}

interface TicketCardProps {
  ticket: TicketData;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const pillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Initialize the pill position using GSAP to avoid React inline style conflicts
  const { contextSafe } = useGSAP(() => {
    gsap.set(pillRef.current, { xPercent: -100 });
  });

  const onButtonMouseEnter = contextSafe(() => {
    gsap.to(pillRef.current, {
      xPercent: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(textRef.current, {
      color: "#1a73e8",
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const onButtonMouseLeave = contextSafe(() => {
    gsap.to(pillRef.current, {
      xPercent: 100,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(pillRef.current, { xPercent: -100 });
      },
    });
    gsap.to(textRef.current, {
      color: "#ffffff",
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  // Generates a responsive polygon clipPath with circular notches and scallops
  const generateClipPath = () => {
    const numNotches = 12;
    const w = 100 / numNotches;
    const bottomPoints: string[] = [];

    for (let i = 0; i < numNotches; i++) {
      const xStart = 100 - i * w;
      // Scalloped circular cutouts (peaks at 100%, valleys at 100% - 12px)
      bottomPoints.push(
        `${xStart}% 100%`,
        `${xStart - 0.25 * w}% calc(100% - 9px)`,
        `${xStart - 0.5 * w}% calc(100% - 12px)`,
        `${xStart - 0.75 * w}% calc(100% - 9px)`
      );
    }
    bottomPoints.push(`0% 100%`);

    const points = [
      "0% 0%",
      "100% 0%",
      // Right side circular cutout notch
      "100% 37.5%",
      "98% 38.2%",
      "96.5% 39.0%",
      "95% 40.0%",
      "96.5% 41.0%",
      "98% 41.8%",
      "100% 42.5%",
      // Right bottom corner
      "100% calc(100% - 12px)",
      // Bottom circular scallops
      ...bottomPoints,
      // Left bottom corner
      "0% calc(100% - 12px)",
      // Left side circular cutout notch
      "0% 42.5%",
      "2% 41.8%",
      "3.5% 41.0%",
      "5% 40.0%",
      "3.5% 39.0%",
      "2% 38.2%",
      "0% 37.5%"
    ];

    return `polygon(${points.join(", ")})`;
  };

  return (
    <div
      className={`ticket-wrapper group relative flex flex-col h-[520px] w-full max-w-[340px] mx-auto rounded-[3px] ${ticket.color} text-slate-950 shadow-2xl ${ticket.glowColor} cursor-pointer font-absans`}
      style={{
        clipPath: generateClipPath(),
        WebkitMaskImage: `
          linear-gradient(to bottom, black calc(40% - 2px), transparent calc(40% - 2px)),
          linear-gradient(to bottom, transparent calc(40% + 2px), black calc(40% + 2px)),
          repeating-linear-gradient(to right, black 0px, black 28px, transparent 28px, transparent 48px)
        `,
        WebkitMaskSize: "100% 100%, 100% 100%, 100% 6px",
        WebkitMaskPosition: "0 0, 0 0, 0 calc(40% - 3px)",
        WebkitMaskRepeat: "no-repeat, no-repeat, repeat-x",
        maskImage: `
          linear-gradient(to bottom, black calc(40% - 2px), transparent calc(40% - 2px)),
          linear-gradient(to bottom, transparent calc(40% + 2px), black calc(40% + 2px)),
          repeating-linear-gradient(to right, black 0px, black 28px, transparent 28px, transparent 48px)
        `,
        maskSize: "100% 100%, 100% 100%, 100% 6px",
        maskPosition: "0 0, 0 0, 0 calc(40% - 3px)",
        maskRepeat: "no-repeat, no-repeat, repeat-x",
      }}
    >
      {/* Top Section (White Card Logo Area) */}
      <div className="bg-white m-4 p-5 rounded-[2px] flex flex-col justify-between min-h-[160px] shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-absans text-xl font-black tracking-tight flex items-center gap-1 text-slate-900">
              <span className="text-blue-600 font-absans">&#123;</span>
              Genesis
              <span className="text-blue-600 font-absans">&#125;</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">
              {ticket.category}
            </div>
          </div>
        </div>

        {/* Middle Row with Register Button */}
        <div className="flex justify-end items-center border-t border-slate-100 pt-4 mt-2">
          <button
            onMouseEnter={onButtonMouseEnter}
            onMouseLeave={onButtonMouseLeave}
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#1a73e8] px-4 py-1.5 text-xs font-bold text-white shadow-sm active:scale-[0.98] transition-transform duration-200 cursor-pointer"
          >
            <span
              ref={pillRef}
              className="absolute inset-0 bg-white rounded-full pointer-events-none"
            />
            <span ref={textRef} className="relative z-10">
              Register
            </span>
          </button>
        </div>
      </div>

      {/* Spacing for perforation line region */}
      <div className="h-6 shrink-0" />

      {/* Ticket Details (Middle Section) */}
      <div className="flex flex-col justify-between flex-grow px-7 py-4 font-absans">
        <div className="space-y-4">
          <div>
            <div className="text-slate-900/60 text-[11px] uppercase tracking-wider font-bold">
              Event
            </div>
            <div className="text-lg font-black text-slate-950 tracking-tight uppercase leading-tight mt-0.5">
              {ticket.title}
            </div>
          </div>
          <div>
            <div className="text-slate-900/60 text-[11px] uppercase tracking-wider font-bold">
              Date
            </div>
            <div className="text-base font-extrabold text-slate-950 mt-0.5">
              {ticket.date}
            </div>
          </div>

          <div>
            <div className="text-slate-900/60 text-[11px] uppercase tracking-wider font-bold">
              Venue
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">
              {ticket.venue}
            </div>
          </div>
        </div>

        {/* Price Tag */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-semibold text-slate-900/60">Price:</span>
          <span className="text-lg font-black tracking-tight text-slate-950">
            {ticket.price}
          </span>
        </div>
      </div>

      {/* Bottom Section (Barcode Area) */}
      <div className="bg-white mx-4 mb-6 p-3 rounded-[2px] flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
        {/* Barcode image */}
        <div className="relative h-10 w-full flex justify-center items-center px-1">
          <img
            src={ticket.barcode}
            alt="Barcode"
            className="h-full max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
export type { TicketData };
