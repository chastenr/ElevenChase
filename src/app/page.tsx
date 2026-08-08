import { Hero } from "@/components/sections/Hero";
import { Value } from "@/components/sections/Value";
import { Capabilities } from "@/components/sections/Capabilities";
import { WebsiteOffer } from "@/components/sections/WebsiteOffer";
import { SeoEngineering } from "@/components/sections/SeoEngineering";
import { TechStrip } from "@/components/sections/TechStrip";
import { LiveActivity } from "@/components/sections/LiveActivity";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Principles } from "@/components/sections/Principles";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { AuditCta } from "@/components/sections/AuditCta";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Value />
      <Capabilities />
      <WebsiteOffer />
      <SeoEngineering />
      <TechStrip />
      <LiveActivity />
      <Process />
      <Work />
      <Principles />
      <About />
      <Faq />
      <AuditCta />
      <FinalCta />
      <Contact />
    </>
  );
}
