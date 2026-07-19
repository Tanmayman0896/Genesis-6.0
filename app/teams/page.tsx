import type { Metadata } from "next";
import TeamsPage from "../../components/teams/TeamsPage";

export const metadata: Metadata = {
  title: "Team",
};

export default function Page() {
  return <TeamsPage />;
}
