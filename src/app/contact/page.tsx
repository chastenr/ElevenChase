import { englishMetadata } from "@/i18n/seo";
import { Contact } from "@/components/sections/Contact";

export const metadata = englishMetadata({
  pathname: "/contact",
  title: "Start a Software or AI Project",
  description:
    "Tell ElevenChase about your software, AI automation, web development or technical SEO project and get a clear next step.",
});

export default function ContactPage() {
  return (
    <div className="pt-8 md:pt-12">
      <Contact headingLevel="h1" />
    </div>
  );
}
