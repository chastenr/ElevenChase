import type { Metadata } from "next";
import { englishAlternates } from "@/i18n/seo";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = { title: "Start a Project", description: "Tell ElevenChase about your software, AI, automation or web project.", alternates: englishAlternates("/contact") };

export default function ContactPage() {
  return (
    <div className="pt-8 md:pt-12">
      <Contact headingLevel="h1" />
    </div>
  );
}
