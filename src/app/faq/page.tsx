import type { Metadata } from "next";
import { englishAlternates } from "@/i18n/seo";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about ElevenChase project costs, timelines, existing codebases, AI agents, ownership and ongoing engineering support.",
  alternates: englishAlternates("/faq"),
};

export default function FaqPage() {
  return (
    <>
      <div className="pt-16 md:pt-24">
        <Faq />
      </div>
      <FinalCta />
    </>
  );
}
