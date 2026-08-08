import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { TechStrip } from "@/components/sections/TechStrip";
import { Principles } from "@/components/sections/Principles";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Services />
      <Process />
      <Work />
      <TechStrip />
      <Principles />
      <About />
      <FinalCta />
      <Contact />
    </>
  );
}
