"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Segment {
  p0: { x: number; y: number };
  p1: { x: number; y: number };
  p2: { x: number; y: number };
}

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const getApproxSegmentLength = (seg: Segment) => {
  const chord = distance(seg.p0, seg.p2);
  const net = distance(seg.p0, seg.p1) + distance(seg.p1, seg.p2);
  return (chord + net) / 2;
};

const getPointsForSegments = (segments: Segment[], targetSpacing: number) => {
  const points: { x: number; y: number }[] = [];
  segments.forEach((seg) => {
    const length = getApproxSegmentLength(seg);
    const numPoints = Math.max(1, Math.round(length / targetSpacing));
    for (let i = 0; i < numPoints; i++) {
      const t = i / numPoints;
      const x = Math.pow(1 - t, 2) * seg.p0.x + 2 * (1 - t) * t * seg.p1.x + Math.pow(t, 2) * seg.p2.x;
      const y = Math.pow(1 - t, 2) * seg.p0.y + 2 * (1 - t) * t * seg.p1.y + Math.pow(t, 2) * seg.p2.y;
      points.push({ x, y });
    }
  });
  // Add the final endpoint
  const lastSeg = segments[segments.length - 1];
  points.push(lastSeg.p2);
  return points;
};

// String 1 curves coordinates
const STRING_1_SEGMENTS = [
  { p0: { x: 0, y: 100 }, p1: { x: 95, y: 80 }, p2: { x: 190, y: 60 } },
  { p0: { x: 190, y: 60 }, p1: { x: 500, y: 240 }, p2: { x: 810, y: 45 } },
  { p0: { x: 810, y: 45 }, p1: { x: 905, y: 87 }, p2: { x: 1000, y: 130 } }
];

// String 2 curves coordinates
const STRING_2_SEGMENTS = [
  { p0: { x: 0, y: 420 }, p1: { x: 80, y: 412 }, p2: { x: 160, y: 405 } },
  { p0: { x: 160, y: 405 }, p1: { x: 330, y: 480 }, p2: { x: 500, y: 315 } },
  { p0: { x: 500, y: 315 }, p1: { x: 750, y: 377 }, p2: { x: 1000, y: 440 } }
];

// String 3 curves coordinates
const STRING_3_SEGMENTS = [
  { p0: { x: 0, y: 690 }, p1: { x: 235, y: 671 }, p2: { x: 470, y: 652 } },
  { p0: { x: 470, y: 652 }, p1: { x: 630, y: 720 }, p2: { x: 790, y: 598 } },
  { p0: { x: 790, y: 598 }, p1: { x: 895, y: 629 }, p2: { x: 1000, y: 660 } }
];

const CARD_IMAGES = {
  card1: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80"
  ],
  card2: [
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
  ],
  card3: [
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"
  ],
  card4: [
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=80"
  ],
  card5: [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80"
  ],
  card6: [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  ]
};

function MomentCardImage({ images, alt, priority = false }: { images: string[]; alt: string; priority?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Image 1 */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${index === 0 ? "opacity-100" : "opacity-0"}`}>
        <Image
          src={images[0]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 280px, 350px"
          className="object-cover pointer-events-none"
          priority={priority}
        />
      </div>
      {/* Image 2 */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${index === 1 ? "opacity-100" : "opacity-0"}`}>
        <Image
          src={images[1]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 280px, 350px"
          className="object-cover pointer-events-none"
        />
      </div>
    </div>
  );
}

export default function TopMoments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    try {
      const defaultRotations = [-6, 3, 6, -3, 4, -4];

      const startSway = (card: HTMLElement, idx: number) => {
        const baseRot = defaultRotations[idx] || 0;
        gsap.to(card, {
          rotation: baseRot + (idx % 2 === 0 ? 1.5 : -1.5),
          y: "+=6",
          duration: 2.2 + idx * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          overwrite: "auto"
        });
      };

      // Entrance animation for desktop cards
      const cards = gsap.utils.toArray(".moment-card") as HTMLElement[];
      cards.forEach((card, idx) => {
        const baseRot = defaultRotations[idx] || 0;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9, rotation: idx % 2 === 0 ? -12 : 12 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: baseRot,
            duration: 1.2,
            delay: idx * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            },
            onComplete: () => {
              startSway(card, idx);
            }
          }
        );

        // Hover animations via GSAP
        const enterHandler = () => {
          gsap.to(card, {
            scale: 1.06,
            rotation: baseRot * 0.4, // straighten slightly
            y: -10, // lift up slightly
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
          gsap.set(card, { zIndex: 30 });
        };

        const leaveHandler = () => {
          gsap.to(card, {
            scale: 1.0,
            rotation: baseRot,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => {
              gsap.set(card, { zIndex: "" });
              startSway(card, idx);
            }
          });
        };

        // Keep references for clean unmounting
        (card as any)._enterHandler = enterHandler;
        (card as any)._leaveHandler = leaveHandler;

        card.addEventListener("mouseenter", enterHandler);
        card.addEventListener("mouseleave", leaveHandler);
      });

      // Mobile cards entrance animation
      gsap.fromTo(
        ".mobile-moment-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Return cleanup function to remove event listeners and prevent memory leaks
      return () => {
        cards.forEach((card) => {
          if ((card as any)._enterHandler) card.removeEventListener("mouseenter", (card as any)._enterHandler);
          if ((card as any)._leaveHandler) card.removeEventListener("mouseleave", (card as any)._leaveHandler);
        });
      };
    } catch (e) {
      console.warn("GSAP Animations could not be loaded", e);
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="moments-section w-full max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10 flex flex-col items-center">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-blue-500/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none -z-20" />

      {/* Mobile Fairy Lights (Vertical hanging strings on the sides) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 md:hidden overflow-hidden">
        {/* Left String */}
        <div className="absolute left-[6%] sm:left-[12%] top-0 bottom-0 w-[1px] border-l border-dashed border-slate-600/50 flex flex-col justify-around py-16">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`left-bulb-${i}`} className="relative w-0 h-0 flex items-center justify-center">
              <div className="absolute w-4.5 h-4.5 bg-amber-400/25 rounded-full blur-[3.5px] animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              <div className="absolute w-1.5 h-1.5 bg-amber-100 rounded-full border border-amber-200/50" />
            </div>
          ))}
        </div>
        {/* Right String */}
        <div className="absolute right-[6%] sm:right-[12%] top-0 bottom-0 w-[1px] border-l border-dashed border-slate-600/50 flex flex-col justify-around py-16">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`right-bulb-${i}`} className="relative w-0 h-0 flex items-center justify-center">
              <div className="absolute w-4.5 h-4.5 bg-amber-400/25 rounded-full blur-[3.5px] animate-pulse" style={{ animationDelay: `${i * 250}ms` }} />
              <div className="absolute w-1.5 h-1.5 bg-amber-100 rounded-full border border-amber-200/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mb-1 sm:mb-1">
        
        <h2 className="text-[39px] md:text-[63px] font-extrabold tracking-tight font-mirava-sans bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent uppercase">
          OUR MOMENTS
        </h2>
      </div>

      {/* Scattered Collage Container (Desktop Layout) */}
      <div className="relative w-full h-[900px] hidden md:block overflow-visible mt-12 select-none">
        
        {/* Fairy Lights (3 Drooping Strings passing EXACTLY through top center clothespins) */}
        <svg className="absolute inset-0 w-full h-full text-blue-400/20 pointer-events-none -z-10" fill="none" viewBox="0 0 1000 900" preserveAspectRatio="none">
          {/* Hanging String 1 (Top) - Passes exactly through (190, 60) and (810, 45) */}
          <path d="M 0,100 Q 95,80 190,60 Q 500,240 810,45 Q 905,87 1000,130" stroke="#475569" strokeWidth="1.5" />
          
          {/* Hanging String 2 (Middle) - Passes exactly through (160, 405) and (500, 315) */}
          <path d="M 0,420 Q 80,412 160,405 Q 330,480 500,315 Q 750,377 1000,440" stroke="#475569" strokeWidth="1.5" />
          
          {/* Hanging String 3 (Bottom) - Passes exactly through (470, 652) and (790, 598) */}
          <path d="M 0,690 Q 235,671 470,652 Q 630,720 790,598 Q 895,629 1000,660" stroke="#475569" strokeWidth="1.5" />

          {/* Glowing Bulbs on String 1 (using exact wire segment coordinates) */}
          {getPointsForSegments(STRING_1_SEGMENTS, 85).map((pt, i) => (
            <g key={`s1-${i}`}>
              <circle cx={pt.x} cy={pt.y} r="8" className="fill-amber-400/30 blur-[3px] animate-pulse" style={{ animationDelay: `${i * 180}ms` }} />
              <circle cx={pt.x} cy={pt.y} r="3" className="fill-amber-100" />
            </g>
          ))}

          {/* Glowing Bulbs on String 2 (using exact wire segment coordinates) */}
          {getPointsForSegments(STRING_2_SEGMENTS, 85).map((pt, i) => (
            <g key={`s2-${i}`}>
              <circle cx={pt.x} cy={pt.y} r="8" className="fill-amber-400/30 blur-[3px] animate-pulse" style={{ animationDelay: `${i * 220}ms` }} />
              <circle cx={pt.x} cy={pt.y} r="3" className="fill-amber-100" />
            </g>
          ))}

          {/* Glowing Bulbs on String 3 (using exact wire segment coordinates) */}
          {getPointsForSegments(STRING_3_SEGMENTS, 85).map((pt, i) => (
            <g key={`s3-${i}`}>
              <circle cx={pt.x} cy={pt.y} r="8" className="fill-amber-400/30 blur-[3px] animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              <circle cx={pt.x} cy={pt.y} r="3" className="fill-amber-100" />
            </g>
          ))}
        </svg>

        {/* Floating organic background blob */}
        <div className="absolute bottom-[30%] -left-12 w-48 h-48 text-blue-500/10 pointer-events-none -z-10 rotate-45">
          <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
            <path d="M45,-60C58,-51,69,-38,73,-22C77,-7,75,12,67,28C59,44,45,56,29,63C13,70,-5,71,-23,65C-41,59,-58,46,-67,29C-76,12,-77,-9,-70,-26C-63,-43,-48,-56,-32,-64C-16,-72,1,-75,17,-71C33,-67,32,-70,45,-60" transform="translate(100, 100)" />
          </svg>
        </div>

        {/* Card 1 */}
        <div className="moment-card absolute w-[22%] max-w-[220px] aspect-[3/4] rounded-3xl overflow-visible shadow-2xl origin-top -rotate-6 left-[8%] top-[6.6%]">
          {/* Clothespin Clip */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-8 bg-[#d2b48c] rounded-sm border border-[#b59975] shadow-md z-30 flex flex-col items-center justify-between py-1 select-none">
            <div className="w-4.5 h-0.5 border-y border-slate-500 bg-slate-600/90 my-auto" />
          </div>
          {/* Sticker Element */}
          <div className="absolute -bottom-5 -right-5 bg-[#ff6b35] text-white font-black text-xs px-4 py-2 rounded-full rotate-[-12deg] shadow-lg border border-white/20 uppercase tracking-widest font-sans select-none z-20">
            good vibes
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card1} alt="Genesis Event Moment 1" priority />
          </div>
        </div>

        {/* Card 2 */}
        <div className="moment-card absolute w-[22%] max-w-[220px] aspect-[3/4] rounded-3xl overflow-visible shadow-2xl origin-top rotate-3 right-[8%] top-[5%]">
          {/* Clothespin Clip */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-8 bg-[#d2b48c] rounded-sm border border-[#b59975] shadow-md z-30 flex flex-col items-center justify-between py-1 select-none">
            <div className="w-4.5 h-0.5 border-y border-slate-500 bg-slate-600/90 my-auto" />
          </div>
          {/* Sticker Background SVG Leaf */}
          <div className="absolute -top-12 -left-12 w-28 h-28 text-emerald-600/30 pointer-events-none -z-10 animate-pulse duration-10000">
            <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
              <path d="M40,-50C53,-43,62,-27,67,-9C72,9,73,29,64,44C55,59,36,69,17,73C-2,77,-21,75,-38,66C-55,57,-70,41,-75,22C-80,3,-75,-19,-64,-34C-53,-49,-36,-57,-19,-61C-2,-65,14,-65,30,-61" transform="translate(100, 100)" />
            </svg>
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card2} alt="Genesis Event Moment 2" priority />
          </div>
        </div>

        {/* Card 3 */}
        <div className="moment-card absolute w-[22%] max-w-[220px] aspect-[3/4] rounded-3xl overflow-visible shadow-2xl origin-top rotate-6 left-[5%] top-[45%]">
          {/* Clothespin Clip */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-8 bg-[#d2b48c] rounded-sm border border-[#b59975] shadow-md z-30 flex flex-col items-center justify-between py-1 select-none">
            <div className="w-4.5 h-0.5 border-y border-slate-500 bg-slate-600/90 my-auto" />
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card3} alt="Genesis Event Moment 3" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="moment-card absolute w-[22%] max-w-[220px] aspect-[3/4] rounded-3xl overflow-visible shadow-2xl origin-top -rotate-3 left-[39%] top-[35%]">
          {/* Clothespin Clip */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-8 bg-[#d2b48c] rounded-sm border border-[#b59975] shadow-md z-30 flex flex-col items-center justify-between py-1 select-none">
            <div className="w-4.5 h-0.5 border-y border-slate-500 bg-slate-600/90 my-auto" />
          </div>
          {/* Sticker Element */}
          <div className="absolute -bottom-5 -right-5 bg-[#3b82f6] text-white font-black text-base px-4 py-1.5 rounded-2xl rotate-[12deg] shadow-lg border border-white/20 font-sans select-none z-20">
            hi!
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card4} alt="Genesis Event Moment 4" />
          </div>
        </div>

        {/* Card 5 */}
        <div className="moment-card absolute w-[22%] max-w-[220px] aspect-[3/4] rounded-3xl overflow-visible shadow-2xl origin-top rotate-4 left-[36%] top-[72.4%]">
          {/* Clothespin Clip */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-8 bg-[#d2b48c] rounded-sm border border-[#b59975] shadow-md z-30 flex flex-col items-center justify-between py-1 select-none">
            <div className="w-4.5 h-0.5 border-y border-slate-500 bg-slate-600/90 my-auto" />
          </div>
          {/* Sticker Element */}
          <div className="absolute -top-6 -left-6 bg-[#10b981] text-white font-extrabold text-[10px] px-3.5 py-2.5 rounded-full rotate-[-8deg] shadow-lg border border-white/20 uppercase tracking-wider font-sans select-none z-20 leading-tight text-center">
            join<br />the club
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card5} alt="Genesis Event Moment 5" />
          </div>
        </div>

        {/* Card 6 */}
        <div className="moment-card absolute w-[22%] max-w-[220px] aspect-[3/4] rounded-3xl overflow-visible shadow-2xl origin-top -rotate-4 right-[10%] top-[66.4%]">
          {/* Clothespin Clip */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-8 bg-[#d2b48c] rounded-sm border border-[#b59975] shadow-md z-30 flex flex-col items-center justify-between py-1 select-none">
            <div className="w-4.5 h-0.5 border-y border-slate-500 bg-slate-600/90 my-auto" />
          </div>
          {/* Sticker Element */}
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center rotate-[15deg] shadow-lg border border-white/20 z-20 text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.17 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card6} alt="Genesis Event Moment 6" />
          </div>
        </div>

      </div>

      {/* Mobile View Grid Layout (Clean stacked columns, hidden on desktop) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-12 mt-8 md:hidden px-4">
        {/* Card 1 */}
        <div className="mobile-moment-card relative w-full max-w-[280px] h-[360px] mx-auto rounded-3xl overflow-visible shadow-2xl -rotate-2">
          <div className="absolute -bottom-4 -right-4 bg-[#ff6b35] text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-sans select-none z-20">
            good vibes
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card1} alt="Moment 1" />
          </div>
        </div>
        {/* Card 2 */}
        <div className="mobile-moment-card relative w-full max-w-[280px] h-[360px] mx-auto rounded-3xl overflow-visible shadow-2xl rotate-2">
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card2} alt="Moment 2" />
          </div>
        </div>
        {/* Card 3 */}
        <div className="mobile-moment-card relative w-full max-w-[280px] h-[360px] mx-auto rounded-3xl overflow-visible shadow-2xl -rotate-1">
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card3} alt="Moment 3" />
          </div>
        </div>
        {/* Card 4 */}
        <div className="mobile-moment-card relative w-full max-w-[280px] h-[360px] mx-auto rounded-3xl overflow-visible shadow-2xl rotate-3">
          <div className="absolute -bottom-4 -right-4 bg-[#3b82f6] text-white font-black text-xs px-3 py-1 rounded-2xl font-sans select-none z-20">
            hi!
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card4} alt="Moment 4" />
          </div>
        </div>
        {/* Card 5 */}
        <div className="mobile-moment-card relative w-full max-w-[280px] h-[360px] mx-auto rounded-3xl overflow-visible shadow-2xl -rotate-3">
          <div className="absolute -top-4 -left-4 bg-[#10b981] text-white font-extrabold text-[9px] px-3 py-1.5 rounded-full uppercase tracking-wider font-sans select-none z-20">
            join the club
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card5} alt="Moment 5" />
          </div>
        </div>
        {/* Card 6 */}
        <div className="mobile-moment-card relative w-full max-w-[280px] h-[360px] mx-auto rounded-3xl overflow-visible shadow-2xl rotate-1">
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
            <MomentCardImage images={CARD_IMAGES.card6} alt="Moment 6" />
          </div>
        </div>
      </div>
    </section>
  );
}
