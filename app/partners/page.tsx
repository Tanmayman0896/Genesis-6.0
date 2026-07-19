import type { Metadata } from "next";
import PartnersPage from "../../components/partners/PartnersPage";

export const metadata: Metadata = {
  title: "Partners",
};

export default function Page() {
  return <PartnersPage />;
}
