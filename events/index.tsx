"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TicketCard, { TicketData } from "./TicketCard";

const TICKETS_DATA: TicketData[] = [
  {
    id: "1",
    title: "Code Warriors",
    category: "HACKATHON",
    date: "November 16th, 2026",
    venue: "Main Auditorium & Lab A",
    price: "Free",
    color: "bg-[#ff68a8]", // Pink ticket
    glowColor: "shadow-pink-500/20 hover:shadow-pink-500/40",
    ticketId: "8892-GNS",
    cutoutBg: "bg-[#0b1f3d]",
  },
  {
    id: "2",
    title: "AI Symposium",
    category: "AI & NEURAL NETS",
    date: "November 18th, 2026",
    venue: "Seminar Hall C (Undisclosed)",
    price: "₹150",
    color: "bg-[#3cbbf6]", // Blue ticket
    glowColor: "shadow-blue-500/20 hover:shadow-blue-500/40",
    ticketId: "5541-GNS",
    cutoutBg: "bg-[#0d264e]",
  },
  {
    id: "3",
    title: "Web3 Solidity",
    category: "WORKSHOP",
    date: "December 02, 2026",
    venue: "Innovation Center",
    price: "₹250",
    color: "bg-[#4ade80]", // Green ticket
    glowColor: "shadow-emerald-500/20 hover:shadow-emerald-500/40",
    ticketId: "7729-GNS",
    cutoutBg: "bg-[#0f2e60]",
  },
];

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Intro animations
      const tl = gsap.timeline();
      tl.fromTo(
        ".event-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
      ).fromTo(
        ".ticket-wrapper",
        { y: 60, opacity: 0, rotateX: 15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center pt-36 md:pt-40 pb-24 font-sans text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #07162c 0%, #0e2954 35%, #1f5194 70%, #60a5fa 100%)",
      }}
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Title Section */}
      <div className="text-center relative z-10 mb-16">
        <h1 className="event-title text-[70px] md:text-[106px] font-bold tracking-tight font-absans bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
          EVENTS
        </h1>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full px-6 relative z-10">
        {TICKETS_DATA.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
