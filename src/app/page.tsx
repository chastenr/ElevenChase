import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Capabilities } from "@/components/sections/Capabilities";
import { Principles } from "@/components/sections/Principles";
import { LiveActivity } from "@/components/sections/LiveActivity";
import { TechStrip } from "@/components/sections/TechStrip";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { AuditCta } from "@/components/sections/AuditCta";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

// Anonymous portfolio cards are intentionally not the homepage's primary
// proof (see src/app/work/page.tsx for the full, honestly-framed list) —
// what/why/how sections, real technology and the founder's identity carry
// credibility instead. Work stays reachable via nav/footer.
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Capabilities />
      <Principles />
      <LiveActivity />
      <TechStrip />
      <Process />
      <Testimonials />
      <About />
      <Faq />
      <AuditCta />
      <FinalCta />
      <Contact />
    </>
  );
}
