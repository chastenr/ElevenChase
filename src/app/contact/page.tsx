import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = { title: "Start a Project", description: "Tell ElevenChase about your software, AI, automation or web project.", alternates: { canonical: "/contact" } };

export default function ContactPage() { return <div className="pt-24 md:pt-32"><Container className="pt-10"><SectionLabel>{"// Project inquiry"}</SectionLabel></Container><Contact headingLevel="h1" /></div>; }
