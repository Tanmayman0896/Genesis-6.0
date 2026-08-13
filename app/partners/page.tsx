import type { Metadata } from "next";
import PartnersPage from "../../components/partners/PartnersPage";

export const metadata: Metadata = {
  title: "Partners",
  description: "Meet the sponsors and partners powering Genesis 6.0, the flagship technical fest of IEEE MUJ.",
  keywords: ["Genesis 6.0", "partners", "sponsors", "IEEE MUJ", "technical fest"],
};

export default function Page() {
  return <PartnersPage />;
}
