const TICKS = Array.from({ length: 48 }, (_, index) => index * 7.5);

export function EngineeringOrbit() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -top-[18vw] -right-[32vw] z-0 size-[105vw] max-h-[1300px] max-w-[1300px] min-h-[620px] min-w-[620px] text-current opacity-[0.09] md:-top-[28rem] md:-right-[22rem] md:size-[82rem]">
      <svg viewBox="0 0 400 400" fill="none" className="size-full overflow-visible">
        <g className="engineering-orbit-slow origin-center">
          <circle cx="200" cy="200" r="174" stroke="currentColor" strokeWidth="0.65" />
          <circle cx="200" cy="200" r="142" stroke="currentColor" strokeWidth="0.35" strokeDasharray="2 7" />
          {TICKS.map((rotation, index) => (
            <line key={rotation} x1="200" y1={index % 4 === 0 ? 17 : 22} x2="200" y2="29" stroke="currentColor" strokeWidth={index % 4 === 0 ? 1.2 : 0.55} transform={`rotate(${rotation} 200 200)`} />
          ))}
          <circle cx="313" cy="93" r="8" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="313" cy="93" r="2" fill="currentColor" />
          <circle cx="74" cy="270" r="5" stroke="currentColor" strokeWidth="0.8" />
        </g>
        <g className="engineering-orbit-reverse origin-center">
          <circle cx="200" cy="200" r="88" stroke="currentColor" strokeWidth="0.8" />
          <path d="M200 112V83M288 200H317M200 288V317M112 200H83" stroke="currentColor" strokeWidth="0.7" />
          <path d="M200 200L268 145" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="6" fill="currentColor" />
        </g>
        <circle className="engineering-signal" cx="268" cy="145" r="3.5" fill="currentColor" />
      </svg>
    </div>
  );
}
