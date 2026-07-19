"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { MemberType, TeamMember } from "./teamsData";
import { executiveData } from "./executiveData";
import { coreData } from "./coreData";
import { facultyData } from "./facultyData";
import { LinkedInIcon, ChevronIcon, FilterIcon } from "./TeamIcons";

// ─── Font helper ──────────────────────────────────────────────────────────────
const FONT: React.CSSProperties = {
  fontFamily: "var(--font-mirava-sans)",
};
// ─── Constants ───────────────────────────────────────────────────────────────

const TEAM_FILTERS = [
  { id: "all", label: "All Teams" },
  { id: "convenors", label: "Convenors" },
  { id: "directors", label: "Directors" },
  { id: "technical", label: "Web Development Team" },
  { id: "graphic-design", label: "Graphic Design Team" },
  { id: "curations", label: "Curations Team" },
  { id: "social-media", label: "Social Media Team" },
  { id: "media", label: "Media & Coverage Team" },
  { id: "logistics", label: "Logistics Team" },
  { id: "events", label: "Events Team" },
  { id: "marketing", label: "Marketing Team" },
  { id: "corporate", label: "Corporate Team" },
  { id: "hospitality", label: "Hospitality Team" },
  { id: "crafts", label: "Crafts Team" },
  { id: "flying-squad", label: "Flying Squad" },
  { id: "content", label: "Content Team" },
  { id: "finance", label: "Finance Team" },
];

const MEMBER_TYPES: { id: MemberType; label: string }[] = [
  { id: "executive", label: "Executives" },
  { id: "core", label: "Core" },
  { id: "faculty", label: "Faculty" },
];

// ─── Sliding Pill Toggle ─────────────────────────────────────────────────────
// Bar background: dark navy (#0d1b35) matching the reference image.
// Active pill: white, slides smoothly. Inactive text: muted blue-white.

function SlidingPillToggle({
  options,
  active,
  onChange,
}: {
  options: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = options.findIndex((o) => o.id === active);
    const btn = buttonRefs.current[activeIndex];
    const container = containerRef.current;
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [active, options]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center rounded-full p-1"
      /* Dark navy bar colour — matches reference screenshot */
      style={{ background: "#0d1b35", border: "1.5px solid rgba(26,115,232,0.25)" }}
    >
      {/* Sliding white pill */}
      <span
        className="absolute top-1 bottom-1 rounded-full pointer-events-none"
        style={{
          left: pillStyle.left,
          width: pillStyle.width,
          background: "#ffffff",
          boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
          transition: "left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      {options.map((option, i) => (
        <button
          key={option.id}
          ref={(el) => { buttonRefs.current[i] = el; }}
          onClick={() => onChange(option.id)}
          className="relative z-10 px-7 py-2.5 rounded-full text-[14px] font-bold select-none"
          style={{
            ...FONT ,
            color: active === option.id ? "#07162c" : "white",
            transition: "color 0.3s ease",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// ─── Member Card ─────────────────────────────────────────────────────────────
// Layout: large photo fills the top 3/4 of the card, name + role appear small
// below. LinkedIn / GitHub icon buttons always visible at the very bottom.

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const getSlideClass = () => {
    if (isVisible) return "translate-x-0 opacity-100";

    const col4 = index % 4;
    if (col4 === 0) {
      return "-translate-x-12 opacity-0";
    } else if (col4 === 1) {
      return "translate-x-12 md:-translate-x-12 opacity-0";
    } else if (col4 === 2) {
      return "-translate-x-12 md:translate-x-12 opacity-0";
    } else {
      return "translate-x-12 opacity-0";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`w-full transition-all duration-[850ms] ease-out transform ${getSlideClass()}`}
    >
      <div
        className="group flex flex-col items-center justify-between rounded-2xl p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(26,115,232,0.3)] border border-white/25 bg-gradient-to-b from-[#72b6e5]/30 to-[#5ea1d4]/30 backdrop-blur-lg h-full"
        style={{
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), 0 8px 32px 0 rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* ── Photo area — padded, rounded container ── */}
        <div className="relative w-full aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-[#539cd4] to-[#4083bb] border border-white/10 shadow-inner">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                style={FONT}
              >
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* ── Name + Role ── */}
        <div className="w-full text-center mt-4 mb-3">
          <h3
            className="text-white font-extrabold text-[16px] md:text-[18px] leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] tracking-wide"
            style={FONT}
          >
            {member.name}
          </h3>
          <p
            className="text-white/90 font-bold text-[12px] md:text-[13px] leading-snug mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
            style={FONT}
          >
            {member.role}
          </p>
        </div>

        {/* ── LinkedIn Button — ALWAYS visible at the bottom ── */}
        <div className="flex items-center justify-center mt-auto w-full">
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-1.5 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm text-white hover:text-white hover:bg-white/35 hover:scale-105 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.05)] w-fit"
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedInIcon className="w-[14px] h-[14px] text-white" />
              <span className="text-[13px] font-bold text-white tracking-wide" style={FONT}>LinkedIn</span>
            </a>
          ) : (
            <span
              className="flex items-center justify-center gap-2 px-5 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/60 cursor-not-allowed w-fit"
              aria-label="LinkedIn (not linked)"
            >
              <LinkedInIcon className="w-[14px] h-[14px] text-white/60" />
              <span className="text-[13px] font-bold text-white/60 tracking-wide" style={FONT}>LinkedIn</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Teams Page ───────────────────────────────────────────────────────────────

export default function TeamsPage() {
  const [activeTeamFilter, setActiveTeamFilter] = useState<string>("all");
  const [activeMemberType, setActiveMemberType] = useState<MemberType>("executive");
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const filteredTeams = useMemo(() => {
    let baseDataset = coreData;
    if (activeMemberType === "executive") {
      baseDataset = executiveData;
    } else if (activeMemberType === "faculty") {
      baseDataset = facultyData;
    }

    if (activeTeamFilter === "all") {
      return baseDataset;
    }
    return baseDataset.filter((t) => t.id === activeTeamFilter);
  }, [activeTeamFilter, activeMemberType]);

  return (
    <main className="relative min-h-screen overflow-hidden text-white pt-28 pb-24 px-4 md:px-8 lg:px-16">



      {/* ── Hero Heading ─────────────────────────────────────────────────── */}
      <div className="text-center mb-14 max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
          style={FONT}
        >
          Unveiling the{" "}
          <span className="bg-gradient-to-r from-[#135DBE] via-[#2979ff] to-[#94BEF4] bg-clip-text text-transparent">
            Minds Behind
          </span>
          <br />
          Genesis 6.0
        </h1>
      </div>

      {/* ── Controls Row: toggle + Team filter button in one line ─────── */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-6xl mx-auto">

        {/* Executives / Core / Faculty sliding toggle */}
        <SlidingPillToggle
          options={MEMBER_TYPES}
          active={activeMemberType}
          onChange={(id) => setActiveMemberType(id as MemberType)}
        />

        {/* Team filter toggle button — same pill style */}
    {/* <button
          onClick={() => setFiltersOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300"
          style={{
            ...FONT,
            background: filtersOpen ? "#1a73e8" : "#ffffff",
            color: filtersOpen ? "#ffffff" : "#1a73e8",
            border: filtersOpen ? "1.5px solid #1a73e8"
            : "1.5px solid #ffffff",
            boxShadow: filtersOpen ? "0 2px 16px rgba(0,0,0,0.25)" : "none",
          }}
        >
          <FilterIcon className="w-3.5 h-3.5" />
          <span>Team</span>
          {activeTeamFilter !== "all" && (
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: filtersOpen ? "#ffffff" : "#1a73e8",
          }}
        />
      )}
          <ChevronIcon
            className={`w-4 h-4 transition-transform duration-300 ${filtersOpen ? "rotate-180" : ""}`}
          />
        </button> */}

      </div>

      {/* ── Filter Dropdown (animated) ─────────────────────────────────── */}
      <div
        className="max-w-6xl mx-auto overflow-hidden"
        style={{
          maxHeight: filtersOpen ? "24rem" : "0px",
          opacity: filtersOpen ? 1 : 0,
          marginBottom: filtersOpen ? "2.5rem" : "0",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, margin-bottom 0.3s ease",
        }}
      >
        <div className="rounded-2xl bg-[#0d1b35] border border-[#1a73e8]/20 px-6 py-5">
          <div className="flex flex-wrap gap-2">
            {TEAM_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveTeamFilter(filter.id)}
                className="px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200"
                style={{
                  ...FONT,
                  background:
                    activeTeamFilter === filter.id
                      ? "#1a73e8"
                      : "rgba(255,255,255,0.04)",
                  color:
                    activeTeamFilter === filter.id
                      ? "#ffffff"
                      : "rgba(255,255,255,0.65)",
                  borderColor:
                    activeTeamFilter === filter.id
                      ? "#1a73e8"
                      : "rgba(255,255,255,0.10)",
                  boxShadow: activeTeamFilter === filter.id ? "0 2px 12px white" : "none",
                  fontWeight: activeTeamFilter === filter.id ? 700 : 500,
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Teams Grid ───────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto space-y-16">
        {filteredTeams.length === 0 ? (
          <div className="text-center py-24 text-white/30 text-lg" style={FONT}>
            No members found for this combination.
          </div>
        ) : (
          filteredTeams.map((team) => (
            <section key={team.id} id={team.id}>
              {/* Team Heading — centred, flanked by gradient lines */}
              <div className="flex flex-col items-center mb-8">
  <h2
    className="text-2xl md:text-3xl font-bold text-white text-center"
    style={FONT}
  >
    {team.label}
  </h2>

  {/* Line below the heading */}
  <div className="mt-3 h-0.5 w-200 bg-gradient-to-r from-transparent via-[#1a73e8] to-transparent" />
</div>

              {/* Member Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {team.members.map((member, index) => (
                  <MemberCard key={member.id} member={member} index={index} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
