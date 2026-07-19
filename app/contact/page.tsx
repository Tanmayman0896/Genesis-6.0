import type { Metadata } from "next";
import ContactPage from "../../components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the IEEE Genesis 6.0 team at Manipal University Jaipur. Find travel guides and coordinates to reach the venue.",
  keywords: ["Genesis 6.0", "contact us", "IEEE MUJ", "Manipal University Jaipur", "travel guide"],
};

export default function Page() {
  return <ContactPage />;
}
