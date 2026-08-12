import type { Metadata } from "next";
import TeamsPage from "../../components/teams/TeamsPage";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the organizing team behind Genesis 6.0, the flagship technical fest of IEEE MUJ.",
  keywords: ["Genesis 6.0", "team", "organizers", "IEEE MUJ", "technical fest"],
};

export default function Page() {
  return <TeamsPage />;
}
