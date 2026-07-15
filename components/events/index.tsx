"use client";

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
    barcode: "/barcode.png",
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
    barcode: "/barcode.png",
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
    barcode: "/barcode.png",
  },
  {
    id: "4",
    title: "Design Sprint",
    category: "CREATIVE DESIGN",
    date: "December 05, 2026",
    venue: "Design Studio A",
    price: "Free",
    color: "bg-[#fb923c]", // Orange ticket
    glowColor: "shadow-orange-500/20 hover:shadow-orange-500/40",
    barcode: "/barcode.png",
  },
  {
    id: "5",
    title: "Cyber CTF",
    category: "CYBERSECURITY",
    date: "December 12, 2026",
    venue: "Main Lab B & C",
    price: "₹100",
    color: "bg-[#a78bfa]", // Purple ticket
    glowColor: "shadow-purple-500/20 hover:shadow-purple-500/40",
    barcode: "/barcode.png",
  },
  {
    id: "6",
    title: "Game Showcase",
    category: "GAME DEV EXPO",
    date: "December 18, 2026",
    venue: "Exhibition Hall",
    price: "Free",
    color: "bg-[#facc15]", // Yellow ticket
    glowColor: "shadow-yellow-500/20 hover:shadow-yellow-500/40",
    barcode: "/barcode.png",
  },
 
];

export default function Events() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center pt-36 md:pt-40 pb-24 font-sans text-white overflow-x-hidden bg-transparent"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="gpu-accelerated absolute top-1/4 left-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="gpu-accelerated absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Title Section */}
      <div className="text-center relative z-10 mb-28">
        <h1 className="event-title text-[70px] md:text-[106px] font-bold tracking-tight font-mirava-sans bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
          OUR EVENTS
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
