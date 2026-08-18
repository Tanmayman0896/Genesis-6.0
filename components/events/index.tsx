"use client";

import TicketCard, { TicketData } from "./TicketCard";

const TICKETS_DATA: TicketData[] = [
  {
    id: "1",
    title: "Faceoff",
    category: "SPORTS",
    date: "August 18th, 2026",
    venue: "B7 Court",
    price: "₹75 / team",
    color: "bg-[#ff68a8]", // Pink ticket
    glowColor: "shadow-pink-500/20 hover:shadow-pink-500/40",
    barcode: "/barcode.png",
  },
  {
    id: "2",
    title: "ZeroTrace",
    category: "WORKSHOP",
    date: "August 19th, 2026",
    venue: "307 AB 1",
    price: "Registration Required",
    color: "bg-[#3cbbf6]", // Blue ticket
    glowColor: "shadow-blue-500/20 hover:shadow-blue-500/40",
    barcode: "/barcode.png",
  },
  {
    id: "3",
    title: "Ballistic",
    category: "GAMING",
    date: "August 19th, 2026",
    venue: "Genesis Chowk",
    price: "₹100 / game",
    color: "bg-[#4ade80]", // Green ticket
    glowColor: "shadow-emerald-500/20 hover:shadow-emerald-500/40",
    barcode: "/barcode.png",
  },
  {
    id: "4",
    title: "Recurz",
    category: "HACKATHON",
    date: "August 21st, 2026",
    venue: "LHC Second Floor",
    price: "₹50 / person",
    color: "bg-[#fb923c]", // Orange ticket
    glowColor: "shadow-orange-500/20 hover:shadow-orange-500/40",
    barcode: "/barcode.png",
  },
  {
    id: "5",
    title: "Networking with WIE",
    category: "NETWORKING",
    date: "August 22nd, 2026",
    venue: "307, AB1",
    price: "₹50",
    color: "bg-[#a78bfa]", // Purple ticket
    glowColor: "shadow-purple-500/20 hover:shadow-purple-500/40",
    barcode: "/barcode.png",
  },
  {
    id: "6",
    title: "Tech Summit",
    category: "TECH SUMMIT",
    date: "August 22nd, 2026",
    venue: "Venue TBA",
    price: "Registration Required",
    color: "bg-[#facc15]", // Yellow ticket
    glowColor: "shadow-yellow-500/20 hover:shadow-yellow-500/40",
    barcode: "/barcode.png",
  },
  {
    id: "7",
    title: "Breacout",
    category: "TREASURE HUNT",
    date: "August 23rd, 2026",
    venue: "Old Mess",
    price: "₹100 / person",
    color: "bg-[#ff68a8]", // Pink ticket
    glowColor: "shadow-pink-500/20 hover:shadow-pink-500/40",
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
