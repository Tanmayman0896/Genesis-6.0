"use client";

import { useEffect, useState } from "react";
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
}

export default function Footer() {
  const pathname = usePathname();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    if (pathname === "/gallery") return;
    const isMobile = window.innerWidth < 768;
    const bubbleCount = isMobile ? 40 : 128;
    const list: Bubble[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      list.push({
        id: i,
        size: isMobile ? (1.5 + Math.random() * 2.5) : (2 + Math.random() * 4),
        distance: isMobile ? (4 + Math.random() * 3) : (6 + Math.random() * 4),
        position: isMobile ? (10 + Math.random() * 80) : (-5 + Math.random() * 110),
        time: 2 + Math.random() * 2,
        delay: -1 * (2 + Math.random() * 2),
      });
    }
    setBubbles(list);
  }, [pathname]);

  if (pathname === "/gallery") return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.bubbles}>
        {bubbles.map((b) => (
          <div
            key={b.id}
            className={styles.bubble}
            style={{
              "--size": `${b.size}rem`,
              "--distance": `${b.distance}rem`,
              "--position": `${b.position}%`,
              "--time": `${b.time}s`,
              "--delay": `${b.delay}s`,
            } as React.CSSProperties}
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
                  priority
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
              />
              <Image
                src="/footer/ieee sb white logo_converted.avif"
                alt="IEEE SB Logo"
                width={180}
                height={60}
                className={`${styles.sbLogo} object-contain`}
              />
              <Image
                src="/footer/ieee wie white logo_converted.avif"
                alt="IEEE WIE Logo"
                width={180}
                height={60}
                className={`${styles.wieLogo} object-contain`}
              />
              <Image
                src="/footer/IEEE CIS_converted.avif"
                alt="IEEE CIS Logo"
                width={180}
                height={60}
                className={`${styles.cisLogo} object-contain`}
              />
            </div>
          </div>
        </div>


        {/* Middle Section: Chairperson Contacts */}
        <div className={styles.middleSection}>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <h4 className={styles.contactName}>
                <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Tanmoy Mandal
              </h4>
              <p className={styles.contactPhone}>+91 83401 57213</p>
              <p className={styles.contactRole}>(Chairperson-IEEE CS MUJ)</p>
            </div>
            <div className={styles.contactCard}>
              <h4 className={styles.contactName}>
                <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Arunanshu Basu
              </h4>
              <p className={styles.contactPhone}>+91 78694 86315</p>
              <p className={styles.contactRole}>(Chairperson-IEEE SB MUJ)</p>
            </div>
            <div className={styles.contactCard}>
              <h4 className={styles.contactName}>
                <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Palakshi Sirsa
              </h4>
              <p className={styles.contactPhone}>+91 62665 63992</p>
              <p className={styles.contactRole}>(Chairperson-IEEE WIE MUJ)</p>
            </div>
            <div className={styles.contactCard}>
              <h4 className={styles.contactName}>
                <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Shubhanshu Dixit
              </h4>
              <p className={styles.contactPhone}>+91 85215 42280</p>
              <p className={styles.contactRole}>(Chairperson-IEEE CIS MUJ)</p>
            </div>
          </div>
        </div>


        {/* Right Section: Website Links */}
        <div className={styles.rightSection}>
          <div className={styles.linksContainer}>
            <a href="https://cs.ieeemuj.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              <svg className={styles.globeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              IEEE CS WEBSITE
            </a>
            <a href="https://ieeemuj.com/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              <svg className={styles.globeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              IEEE SB WEBSITE
            </a>
            <a href="https://wie.ieeemuj.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              <svg className={styles.globeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              IEEE WIE WEBSITE
            </a>
          </div>
        </div>
      </div>

      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </footer>
  );
}
