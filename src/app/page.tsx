import { Hero } from "@/components/sections/Hero";
import { OpeningSequence } from "@/components/sections/OpeningSequence";
import { Premise } from "@/components/sections/Premise";
import { TechnicalDiagram } from "@/components/sections/TechnicalDiagram";
import { ClientProof } from "@/components/sections/ClientProof";
import { Capabilities } from "@/components/sections/Capabilities";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Signals } from "@/components/sections/Signals";
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
      <OpeningSequence>
        <Hero />
        <Premise />
        <TechnicalDiagram />
      </OpeningSequence>
      <ClientProof />
      <Problems />
      <Capabilities />
      <Signals />
      <Process />
      <About />
      <AuditCta />
      <FinalCta />
      <Contact />
    </>
  );
}
