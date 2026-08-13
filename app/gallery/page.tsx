import type { Metadata } from "next";
import Gallery from "../../components/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse moments and highlights from past editions of Genesis, the largest technical fest of IEEE MUJ.",
  keywords: ["Genesis 6.0", "gallery", "photos", "IEEE MUJ", "technical fest"],
};

export default function Page() {
  return <Gallery />;
}
