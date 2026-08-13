import type { Metadata } from "next";
import Events from "../../components/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Explore the lineup of hackathons, workshops, and competitions at Genesis 6.0, the flagship technical fest of IEEE MUJ.",
  keywords: ["Genesis 6.0", "events", "hackathon", "workshops", "IEEE MUJ", "technical fest"],
};

export default function Page() {
  return <Events />;
}
