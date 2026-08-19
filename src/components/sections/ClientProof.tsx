import Image, { type StaticImageData } from "next/image";
import veoraLogo from "../../../brand-assets/clients/Veora Text Transparent.png";
import { Container } from "@/components/ui/Container";

const CLIENTS: Array<{ name: string; logo: StaticImageData }> = [
  { name: "Veora Wellness", logo: veoraLogo },
];

export function ClientProof() {
  return (
    <section aria-labelledby="client-proof-heading" className="border-y border-line">
      <Container className="grid items-center gap-8 py-10 md:grid-cols-12 md:py-12">
        <div className="md:col-span-4">
          <h2
            id="client-proof-heading"
            className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
          >
            // Satisfied clients
          </h2>
          <p className="mt-2 text-sm text-muted">Trusted with work that matters.</p>
        </div>

        <ul className="grid md:col-span-8">
          {CLIENTS.map((client) => (
            <li
              key={client.name}
              className="flex min-h-24 items-center justify-center border-l border-line px-8 md:justify-end"
            >
              <Image
                src={client.logo}
                alt={client.name}
                sizes="(max-width: 768px) 180px, 240px"
                className="h-auto w-44 grayscale brightness-0 opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert md:w-60"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
