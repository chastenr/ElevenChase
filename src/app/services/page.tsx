import type { Metadata } from "next";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink";
import { SITE, SERVICES_NAV } from "@/data/site";
import { englishAlternates } from "@/i18n/seo";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { ServiceCta } from "@/components/service/ServiceCta";

export const metadata: Metadata = { title: "Engineering Services", description: "Software, AI, automation, web and technical SEO engineering from ElevenChase.", alternates: englishAlternates("/services") };

export default function ServicesPage() {
  return <>
    <section className="pt-36 pb-20 md:pt-48 md:pb-28"><Container><SectionLabel>{"// Services"}</SectionLabel><AnimatedText as="h1" trigger="mount" lines={["Built around the", "problem at hand."]} className="mt-6 max-w-5xl text-[clamp(3rem,7vw,7rem)] leading-[0.92] font-medium tracking-[-0.06em]" /><p className="mt-10 max-w-xl text-lg leading-relaxed text-muted md:ml-auto md:text-xl">{SITE.name} designs and ships the software, AI systems and digital infrastructure ambitious companies rely on.</p></Container></section>
    <section className="border-t border-line pb-24 md:pb-36"><Container>{SERVICES_NAV.map((service) => <Link key={service.href} href={service.href} className="group grid gap-5 border-b border-line py-9 md:grid-cols-12 md:items-baseline md:py-12"><span className="font-mono text-xs text-muted md:col-span-1">{service.index}</span><h2 className="text-3xl tracking-tight md:col-span-6 md:text-5xl">{service.label}</h2><div className="md:col-span-5"><p className="text-lg text-muted">{service.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm">Explore service <AnimatedArrow /></span></div></Link>)}</Container></section>
    <ServiceCta lines={["Have a difficult", "problem to solve?"]} description="Tell us where the friction is. We'll help define the right system to remove it." ctaLabel="Start a project" ctaHref="/#contact" />
  </>;
}
