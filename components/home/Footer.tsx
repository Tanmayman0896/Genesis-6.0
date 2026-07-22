"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

interface Bubble {
  id: number;
  size: number;
  distance: number;
  position: number;
  time: number;
  delay: number;
  ty: number;
}

// Pseudo-random generator for deterministic bubble parameters across SSR and CSR
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const STATIC_BUBBLES: Bubble[] = Array.from({ length: 36 }, (_, i) => {
  const r1 = pseudoRandom(i * 7 + 1);
  const r2 = pseudoRandom(i * 7 + 2);
  const r3 = pseudoRandom(i * 7 + 3);
  const r4 = pseudoRandom(i * 7 + 4);

  // Items 0..17 work for both desktop & mobile, 18..35 fill out desktop
  const isFirstHalf = i < 18;
  const size = Number((isFirstHalf ? 1.4 + r1 * 2.6 : 1.8 + r1 * 3.8).toFixed(2));
  const distance = Number((isFirstHalf ? 4.0 + r2 * 4.5 : 5.0 + r2 * 5.5).toFixed(2));
  const position = Number((-4 + (i / 36) * 108 + (r3 * 4 - 2)).toFixed(2));
  const time = Number((2 + r4 * 2.5).toFixed(2));
  const delay = Number((-1 * r1 * 4).toFixed(2));
  const ty = Number((-(distance + 4)).toFixed(2));

  return {
    id: i,
    size,
    distance,
    position,
    time,
    delay,
    ty,
  };
});

export default function Footer() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pathname === "/gallery") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "200px" }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  if (pathname === "/gallery") return null;

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div 
        className={styles.bubbles} 
        data-paused={!isVisible}
        aria-hidden="true"
      >
        {STATIC_BUBBLES.map((b) => (
          <div
            key={b.id}
            className={styles.bubble}
            style={
              {
                "--size": `${b.size}rem`,
                "--distance": `${b.distance}rem`,
                "--position": `${b.position}%`,
                "--time": `${b.time}s`,
                "--delay": `${b.delay}s`,
                "--ty": `${b.ty}rem`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.content}>
        {/* Left Section: Logos */}
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <Link href="/">
                <Image
                  src="/genesislogo.png"
                  alt="Genesis Logo"
                  width={182}
                  height={57}
                  className={`${styles.genesisLogo} object-contain`}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            </div>
            
            <div className={styles.chaptersWrapper}>
              <Image
                src="/footer/IEEE CS WHITE LOGO_converted.avif"
                alt="IEEE CS Logo"
                width={180}
                height={60}
                className={`${styles.csLogo} object-contain`}
                loading="lazy"
                decoding="async"
              />
              <Image
                src="/footer/ieee sb white logo_converted.avif"
                alt="IEEE SB Logo"
                width={180}
                height={60}
                className={`${styles.sbLogo} object-contain`}
                loading="lazy"
                decoding="async"
              />
              <Image
                src="/footer/ieee wie white logo_converted.avif"
                alt="IEEE WIE Logo"
                width={180}
                height={60}
                className={`${styles.wieLogo} object-contain`}
                loading="lazy"
                decoding="async"
              />
              <Image
                src="/footer/IEEE CIS_converted.avif"
                alt="IEEE CIS Logo"
                width={180}
                height={60}
                className={`${styles.cisLogo} object-contain`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Middle Section: Chairperson Contacts */}
        <div className={styles.middleSection}>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <h4 className={styles.contactName}>
                <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Tanmoy Mandal
              </h4>
              <a href="tel:+918340157213" className={styles.contactPhone}>+91 83401 57213</a>
              <p className={styles.contactRole}>(Chairperson-IEEE CS MUJ)</p>
            </div>
            <div className={styles.contactCard}>
              <h4 className={styles.contactName}>
                <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Arunanshu Basu
              </h4>
              <a href="tel:+917869486315" className={styles.contactPhone}>+91 78694 86315</a>
              <p className={styles.contactRole}>(Chairperson-IEEE SB MUJ)</p>
            </div>
            <div className={styles.contactCard}>
              <h4 className={styles.contactName}>
                <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Palakshi Sirsa
              </h4>
              <a href="tel:+916266563992" className={styles.contactPhone}>+91 62665 63992</a>
              <p className={styles.contactRole}>(Chairperson-IEEE WIE MUJ)</p>
            </div>
            <div className={styles.contactCard}>
              <h4 className={styles.contactName}>
                <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Shubhanshu Dixit
              </h4>
              <a href="tel:+918521542280" className={styles.contactPhone}>+91 85215 42280</a>
              <p className={styles.contactRole}>(Chairperson-IEEE CIS MUJ)</p>
            </div>
          </div>
        </div>

        {/* Right Section: Website Links */}
        <div className={styles.rightSection}>
          <div className={styles.linksContainer}>
            <a href="https://cs.ieeemuj.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              <svg className={styles.globeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              IEEE CS WEBSITE
            </a>
            <a href="https://ieeemuj.com/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              <svg className={styles.globeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              IEEE SB WEBSITE
            </a>
            <a href="https://wie.ieeemuj.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              <svg className={styles.globeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              IEEE WIE WEBSITE
            </a>
          </div>
        </div>
      </div>

      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </footer>
  );
}
