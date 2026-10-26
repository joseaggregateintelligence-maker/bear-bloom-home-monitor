import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading, EASE } from "./primitives";
import { CITIES, DOTS, MAP_H, MAP_W } from "./us-map-data";

const STATS = [
  ["12", "Beta cities"],
  ["5,740", "Families"],
  ["1.2M", "Nights watched"],
] as const;

function Pin({ x, y, active, label }: { x: number; y: number; active: boolean; label: string }) {
  const reduce = useReducedMotion();
  return (
    <g transform={`translate(${x} ${y})`} style={{ transition: "opacity 0.5s" }}>
      {/* light beam */}
      <rect
        x={-0.16}
        y={active ? -7 : -4.5}
        width={0.32}
        height={active ? 7 : 4.5}
        fill="url(#beam)"
        style={{ transition: "all 0.5s cubic-bezier(.16,1,.3,1)" }}
      />
      {/* pulsing ring */}
      {!reduce && (
        <circle r={active ? 1.2 : 0.8} fill="none" stroke="#E0AE72" strokeWidth={active ? 0.35 : 0.25}>
          <animate attributeName="r" values={active ? "1.2;3.6" : "0.8;2.4"} dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      )}
      <circle r={active ? 1.7 : 1.15} fill="#EBC593" opacity={active ? 0.75 : 0.5} style={{ transition: "all 0.5s" }} />
      <circle r={active ? 0.85 : 0.6} fill="#5B4739" style={{ transition: "all 0.5s" }} />
      {active && (
        <g transform="translate(2.2 -2.6)">
          <rect x={0} y={-2.1} rx={1.4} width={label.length * 1.05 + 3} height={3.2} fill="rgba(255,255,255,0.85)" />
          <text x={1.5} y={0.1} fontSize={1.9} fill="#2B211B" fontFamily="Geist, sans-serif" fontWeight={550}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

export function UsMap() {
  const [active, setActive] = useState(0);
  const pad = 3;
  return (
    <section id="map" className="section-pad bg-cream">
      <div className="container-page">
        <SectionHeading
          eyebrow="Across the US"
          heading="Watching over families, coast to coast."
          lead="Where our beta families are tonight. Pick a city to see it on the map."
        />

        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-hairline pt-8 md:max-w-2xl">
          {STATS.map(([v, l]) => (
            <div key={l}>
              <p className="text-[32px] font-[550] leading-none tracking-[-0.03em] text-ink md:text-[40px]">{v}</p>
              <p className="mt-2 font-mono uppercase tracking-[0.08em] text-muted-warm" style={{ fontSize: 12 }}>
                {l}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] md:items-center">
          {/* map first on mobile */}
          <div className="order-1 min-w-0 md:order-2">
            <svg
              viewBox={`${-pad} ${-pad - 6} ${MAP_W + pad * 2} ${MAP_H + pad * 2 + 6}`}
              className="h-auto w-full"
              role="img"
              aria-label={`Dotted map of the United States with ${CITIES.length} beta cities. ${CITIES[active]!.city} is highlighted.`}
            >
              <defs>
                <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#E0AE72" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#E0AE72" stopOpacity="0" />
                </linearGradient>
              </defs>
              {DOTS.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={0.32} fill="#D9CDBC" />
              ))}
              {CITIES.map((c, i) =>
                i === active ? null : <Pin key={c.city} x={c.x} y={c.y} active={false} label={c.city} />,
              )}
              {/* active pin drawn last so it sits on top */}
              <Pin x={CITIES[active]!.x} y={CITIES[active]!.y} active label={CITIES[active]!.city} />
            </svg>
          </div>

          {/* city list */}
          <div className="order-2 min-w-0 md:order-1">
            {/* mobile: swipeable chips */}
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
              {CITIES.map((c, i) => (
                <button
                  key={c.city}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-10 shrink-0 rounded-full px-4 text-[14px] font-medium transition-colors duration-500 ${
                    i === active ? "bg-cocoa text-cream" : "hairline bg-card-warm text-ink"
                  }`}
                >
                  {c.city}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[15px] text-muted-warm md:hidden">
              {CITIES[active]!.families.toLocaleString("en-US")} families · {CITIES[active]!.nights} nights watched
            </p>

            {/* desktop: store-finder list */}
            <div
              className="hidden max-h-[520px] overflow-y-auto pr-4 md:block"
              style={{ scrollbarWidth: "thin" }}
              data-lenis-prevent
            >
              {CITIES.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.city}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="flex w-full items-start justify-between gap-6 border-t border-hairline py-6 text-left first:border-t-0"
                  >
                    <span>
                      <motion.span
                        animate={{ color: on ? "#2B211B" : "#A99C90" }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="block text-[26px] font-[520] leading-tight tracking-[-0.025em]"
                      >
                        {c.city}, {c.state}
                      </motion.span>
                      <span className={`mt-2 block text-[14px] transition-colors duration-500 ${on ? "text-muted-warm" : "text-muted-warm/60"}`}>
                        {c.nights} nights watched
                      </span>
                    </span>
                    <span className="text-right">
                      <span
                        className={`block font-mono uppercase tracking-[0.08em] transition-colors duration-500 ${on ? "text-cocoa" : "text-muted-warm/60"}`}
                        style={{ fontSize: 12 }}
                      >
                        Beta city
                      </span>
                      <span className={`mt-2 block text-[15px] transition-colors duration-500 ${on ? "text-ink" : "text-muted-warm/60"}`}>
                        {c.families.toLocaleString("en-US")} families
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[13px] text-muted-warm">Illustrative concept content: beta programme figures.</p>
      </div>
    </section>
  );
}
