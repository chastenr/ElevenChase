import type { Metadata } from "next";
import { Process } from "@/components/sections/Process";
import { TechnicalDiagram } from "@/components/sections/TechnicalDiagram";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";

export const metadata: Metadata = { title: "Process", description: "How ElevenChase turns business problems into production software.", alternates: { canonical: "/process" } };

export default function ProcessPage() { return <><section className="pt-36 pb-20 md:pt-48 md:pb-28"><Container><SectionLabel>{"// Process"}</SectionLabel><AnimatedText as="h1" trigger="mount" lines={["Clarity before", "code."]} className="mt-6 text-[clamp(3rem,7vw,7rem)] leading-[0.92] font-medium tracking-[-0.06em]" /><p className="mt-10 max-w-xl text-lg leading-relaxed text-muted md:ml-auto md:text-xl">Every engagement starts with the business problem, defines the smallest useful system, then moves through visible, testable progress.</p></Container></section><TechnicalDiagram /><Process /><FinalCta /></>; }
