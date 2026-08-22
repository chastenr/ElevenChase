import { Hero } from "@/components/sections/Hero";
import { OpeningSequence } from "@/components/sections/OpeningSequence";
import { Premise } from "@/components/sections/Premise";
import { TechnicalDiagram } from "@/components/sections/TechnicalDiagram";
import { ClientProof } from "@/components/sections/ClientProof";
import { ClientReachMap } from "@/components/sections/ClientReachMap";
import { Capabilities } from "@/components/sections/Capabilities";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { Signals } from "@/components/sections/Signals";
import { AuditCta } from "@/components/sections/AuditCta";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

// The homepage stays focused on capabilities, outcomes, process and client
// trust. The company page carries the studio and founder story.
export default function Home() {
  return (
    <>
      <OpeningSequence>
        <Hero />
        <Premise />
        <TechnicalDiagram />
      </OpeningSequence>
      <ClientProof />
      <ClientReachMap />
      <Problems />
      <Capabilities />
      <Signals />
      <Process />
      <AuditCta />
      <FinalCta />
      <Contact />
    </>
  );
}
