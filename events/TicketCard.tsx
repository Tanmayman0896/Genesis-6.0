"use client";

interface TicketData {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  price: string;
  color: string; // Tailwind bg class (e.g., bg-[#ff68a8])
  glowColor: string; // Tailwind shadow class (e.g., shadow-pink-500/20)
  ticketId: string;
  cutoutBg: string; // Matching background to simulate cutouts
}

interface TicketCardProps {
  ticket: TicketData;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div
      className={`ticket-wrapper group relative flex flex-col h-[520px] w-full max-w-[340px] mx-auto rounded-3xl ${ticket.color} text-slate-950 shadow-2xl ${ticket.glowColor} hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer`}
    >
      {/* Top Section (White Card Logo Area) */}
      <div className="bg-white m-4 p-5 rounded-2xl flex flex-col justify-between min-h-[160px] shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-absans text-xl font-black tracking-tight flex items-center gap-1 text-slate-900">
              <span className="text-blue-600 font-sans">&#123;</span>
              Genesis
              <span className="text-blue-600 font-sans">&#125;</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">
              {ticket.category}
            </div>
          </div>
          {/* Visual cubes representation */}
          <div className="flex gap-[2px] mt-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          </div>
        </div>

        {/* Middle Row with Year */}
        <div className="flex justify-end items-center border-t border-slate-100 pt-4 mt-2">
          <div className="border border-rose-300 bg-rose-50 text-rose-600 px-3.5 py-0.5 rounded-full text-xs font-bold shadow-sm">
            2026
          </div>
        </div>
      </div>

      {/* Perforation Line & Cutouts */}
      <div className="relative my-2">
        <div className="border-t-2 border-dashed border-white/50 w-full" />
        {/* Left Cutout */}
        <div className={`absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full ${ticket.cutoutBg} shadow-[inset_-3px_0_5px_rgba(0,0,0,0.1)]`} />
        {/* Right Cutout */}
        <div className={`absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full ${ticket.cutoutBg} shadow-[inset_3px_0_5px_rgba(0,0,0,0.1)]`} />
      </div>

      {/* Ticket Details (Middle Section) */}
      <div className="flex flex-col justify-between flex-grow px-7 py-4 font-sans">
        <div className="space-y-4">
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
      <div className="bg-white mx-4 mb-5 p-3 rounded-2xl flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
        {/* Barcode representation */}
        <div className="flex items-stretch justify-center gap-[2px] h-10 w-full px-1">
          {[
            2, 1, 3, 1, 4, 1, 2, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3, 1, 2,
            4, 1, 3, 2, 1, 2, 4, 1, 3, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1,
          ].map((w, i) => (
            <div
              key={i}
              className="bg-slate-950"
              style={{ width: `${w}px`, opacity: i % 3 === 0 ? 0.9 : 0.8 }}
            />
          ))}
        </div>
        {/* Ticket ID */}
        <div className="text-[10px] text-slate-500 font-mono tracking-wider mt-1.5 font-semibold">
          Ticket Id: {ticket.ticketId}
        </div>
      </div>

      {/* Scalloped Bottom Edge circles */}
      <div className="absolute -bottom-1.5 left-0 right-0 flex justify-between px-3 overflow-hidden pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-full ${ticket.cutoutBg} shrink-0`}
          />
        ))}
      </div>
    </div>
  );
}
export type { TicketData };
