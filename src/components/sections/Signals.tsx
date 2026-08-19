import { Container } from "@/components/ui/Container";

const SIGNALS = [["Remote-first", "Worldwide collaboration"], ["Direct", "Engineer access"], ["Production", "Built beyond prototypes"], ["Full-stack", "Strategy through deployment"]];

export function Signals() {
  return (
    <section className="border-y border-line"><Container><dl className="grid sm:grid-cols-2 lg:grid-cols-4">{SIGNALS.map(([term, detail]) => <div key={term} className="border-b border-line py-8 sm:border-r sm:px-7 lg:border-b-0 first:pl-0 last:border-r-0"><dt className="font-mono text-xs tracking-[0.14em] uppercase">{term}</dt><dd className="mt-2 text-sm text-muted">{detail}</dd></div>)}</dl></Container></section>
  );
}
