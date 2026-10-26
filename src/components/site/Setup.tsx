import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { EASE, Reveal, SectionHeading } from "./primitives";

const STEPS = [
  { n: "Step 01", title: "Mount it", text: "Arc on the cot, plate on the wall, or simply a shelf. Magnetic, one click.", img: "/assets/white/w-15b-wall-plate-with-bear.png" },
  { n: "Step 02", title: "Pair it", text: "Scan the code, name the room. Two minutes.", img: "/assets/app-01-home-live.png" },
  { n: "Step 03", title: "Sleep", text: "Close the door. It takes the night from here.", img: "/assets/white/w-02-hero-three-quarter.png" },
];

function Card({ s, className }: { s: (typeof STEPS)[number]; className?: string | undefined }) {
  return (
    <div className={"relative h-full w-full overflow-hidden rounded-[28px] bg-product-white " + (className ?? "")}>
      {s.img.includes("/app-") ? (
        <div className="absolute left-1/2 top-10 w-[200px] -translate-x-1/2 rounded-[40px] bg-ink p-2">
          <img src={s.img} alt={s.title} className="w-full rounded-[32px]" loading="lazy" />
        </div>
      ) : (
        <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/80 via-midnight/40 to-transparent p-6 pt-24">
        <span className="glass inline-flex h-8 items-center rounded-full px-3.5 font-mono uppercase tracking-[0.08em] text-ink" style={{ fontSize: 12 }}>
          {s.n}
        </span>
        <h3 className="text-card-title mt-4 text-card-warm">{s.title}</h3>
        <p className="mt-2 text-[16px] leading-[1.5] text-card-warm/85">{s.text}</p>
      </div>
    </div>
  );
}

export function Setup() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(v < 0.36 ? 0 : v < 0.7 ? 1 : 2));

  return (
    <section id="setup" className="bg-cream">
      {/* Desktop pinned deck */}
      <div ref={ref} className={reduce ? "hidden" : "relative hidden md:block"} style={{ height: "calc(2400px + 100vh)" }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="container-page grid grid-cols-2 items-center gap-16">
            <div>
              <SectionHeading eyebrow="Set up in minutes" heading="Mount. Pair. Sleep." />
              <ol className="mt-10 flex gap-3">
                {STEPS.map((s, i) => (
                  <li key={s.n} className={"h-px w-12 transition-colors duration-700 " + (i <= step ? "bg-cocoa" : "bg-hairline")} />
                ))}
              </ol>
            </div>
            <div className="relative mx-auto h-[580px] w-[450px]">
              {STEPS.map((s, i) => {
                const pos = i - step; // 0 top, 1, 2 behind, <0 gone
                return (
                  <motion.div
                    key={s.n}
                    className="absolute inset-0"
                    style={{ zIndex: 10 - i }}
                    initial={false}
                    animate={
                      pos < 0
                        ? { y: -120, opacity: 0, scale: 1 }
                        : { y: pos * 28, opacity: 1, scale: 1 - pos * 0.08 }
                    }
                    transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                  >
                    <Card s={s} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stack */}
      <div className="container-page section-pad md:hidden">
        <SectionHeading eyebrow="Set up in minutes" heading="Mount. Pair. Sleep." />
        <div className="mt-10 flex flex-col gap-5">
          {STEPS.map((s) => (
            <Reveal key={s.n} className="h-[480px]">
              <Card s={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
