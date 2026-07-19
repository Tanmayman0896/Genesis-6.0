import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "@fontsource/google-sans/index.css";
import "@fontsource/google-sans/500.css";
import "@fontsource/google-sans/700.css";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import LogoMarquee from "../components/home/LogoMarquee";
import SmoothScrollProvider from "../components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const absans = localFont({
  src: "../public/fonts/Absans-Regular.woff2",
  variable: "--font-absans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-mirava-sans",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Genesis 6.0",
    template: "%s | Genesis 6.0",
  },
  description: "Welcome to Genesis 6.0 - the flagship technical event. Compete in hackathons, join workshops, win exciting prizes, and connect with top tech minds.",
  keywords: ["Genesis 6.0", "IEEE", "technical symposium", "hackathon", "workshops", "coding contest", "engineering"],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${absans.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="fixed-bg" />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <LogoMarquee />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}