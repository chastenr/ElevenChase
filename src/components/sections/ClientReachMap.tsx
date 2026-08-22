import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const CLIENT_LOCATIONS = [
  "Atlanta",
  "Florida",
  "Philippines",
  "Australia",
] as const;

export function ClientReachMap() {
  return (
    <section
      aria-labelledby="client-reach-heading"
      className="overflow-hidden border-b border-line py-20 md:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(18rem,0.68fr)_minmax(0,1.32fr)] lg:items-center lg:gap-16">
          <div>
            <SectionLabel>{"// Client reach"}</SectionLabel>
            <Reveal>
              <h2
                id="client-reach-heading"
                className="mt-5 max-w-lg text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
              >
                Trusted across time zones.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                We collaborate remotely with clients in North America,
                Southeast Asia and Australia.
              </p>
            </Reveal>

            <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3" aria-label="Client locations">
              {CLIENT_LOCATIONS.map((location, index) => (
                <li
                  key={location}
                  className="flex items-center gap-3 border-t border-line pt-3 text-sm"
                >
                  <span className="font-mono text-[10px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {location}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.12}>
            <div className="relative border border-line bg-ivory-soft p-3 sm:p-5">
              <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[9px] tracking-[0.14em] text-muted uppercase">
                <span>Client network</span>
                <span>Remote / worldwide</span>
              </div>

              <svg
                viewBox="0 0 1000 480"
                role="img"
                aria-labelledby="client-map-title client-map-description"
                className="mt-7 h-auto w-full text-ink"
              >
                <title id="client-map-title">ElevenChase client locations</title>
                <desc id="client-map-description">
                  Animated world map showing client locations in Atlanta,
                  Florida, the Philippines and Australia.
                </desc>

                <defs>
                  <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
                  </pattern>
                  <marker id="map-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                </defs>

                <rect width="1000" height="480" fill="url(#map-grid)" />

                <g fill="currentColor" fillOpacity="0.075" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5">
                  <path d="M75 105 126 72 188 76 221 53 279 69 320 101 301 127 329 150 307 183 271 175 251 205 215 193 190 164 151 162 126 139 89 137Z" />
                  <path d="M259 217 294 222 316 252 307 295 285 333 275 381 250 411 238 370 215 329 220 286 239 255Z" />
                  <path d="M440 111 475 90 519 95 539 117 565 111 591 127 576 145 533 148 505 136 471 144 447 132Z" />
                  <path d="M480 164 531 156 574 177 599 221 576 264 559 319 525 350 490 316 477 268 452 233 458 190Z" />
                  <path d="M572 104 625 75 701 80 747 102 816 96 883 124 918 154 893 181 844 170 809 188 763 179 728 204 679 194 651 166 609 158 578 136Z" />
                  <path d="M813 300 856 282 909 296 930 329 908 360 866 369 828 347Z" />
                  <path d="M949 375 966 365 975 386 960 404Z" />
                </g>

                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" markerEnd="url(#map-arrow)">
                  <path className="client-map-route client-map-route-a" d="M836 208 Q620 45 267 150" />
                  <path className="client-map-route client-map-route-b" d="M836 208 Q610 115 274 166" />
                  <path className="client-map-route client-map-route-c" d="M836 208 Q900 238 872 307" />
                </g>

                <g>
                  <MapMarker x={267} y={150} label="Atlanta" labelX={173} labelY={112} />
                  <MapMarker x={274} y={166} label="Florida" labelX={184} labelY={210} />
                  <MapMarker x={836} y={208} label="Philippines" labelX={730} labelY={180} />
                  <MapMarker x={872} y={307} label="Australia" labelX={785} labelY={350} />
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function MapMarker({
  x,
  y,
  label,
  labelX,
  labelY,
}: {
  x: number;
  y: number;
  label: string;
  labelX: number;
  labelY: number;
}) {
  return (
    <g>
      <circle className="client-map-pulse" cx={x} cy={y} r="15" fill="currentColor" fillOpacity="0.12" />
      <circle cx={x} cy={y} r="5" fill="currentColor" />
      <line x1={x} y1={y} x2={labelX + 6} y2={labelY - 4} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <text x={labelX} y={labelY} fill="currentColor" fontSize="14" fontFamily="var(--font-geist-mono)" letterSpacing="1.2">
        {label}
      </text>
    </g>
  );
}
