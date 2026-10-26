import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE, Eyebrow, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

const MODES = {
  day: {
    label: "Day",
    img: "/assets/white/w-02-hero-three-quarter.png",
    alt: "Bear Mini-Mum in daylight",
    text: "Soft lights in the visor show when you’re listening. The bear turns 360° to follow your toddler.",
  },
  night: {
    label: "Night",
    img: "/assets/03-night-glow.png",
    alt: "Bear Mini-Mum at night with a soft glow ring at its foot",
    text: "The visor goes fully dark. A thin ring at its foot glows onto the shelf, never into little eyes.",
  },
} as const;
type Mode = keyof typeof MODES;

export function DayNight() {
  const [mode, setMode] = useState<Mode>("day");
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(10% 12% 10% 12% round 28px)", "inset(0% 0% 0% 0% round 28px)"]);
  const night = mode === "night";
  const m = MODES[mode];

  return (
    <section
      id="daynight"
      className={cn("section-pad transition-colors duration-700 ease-premium", night ? "bg-midnight" : "bg-cream")}
    >
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <Eyebrow className={night ? "text-glow" : ""}>Day and night</Eyebrow>
          <h2 className={"text-section mt-5 transition-colors duration-700 " + (night ? "text-cream" : "text-ink")}>
            Bright by day. Invisible by night.
          </h2>
        </Reveal>

        <motion.div
          ref={stageRef}
          style={reduce ? { borderRadius: 28 } : { clipPath: clip }}
          className={cn(
            "relative mt-14 aspect-[4/5] w-full overflow-hidden rounded-[28px] transition-colors duration-700 md:aspect-[1320/720]",
            night ? "bg-midnight" : "bg-product-white",
          )}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={mode}
              src={m.img}
              alt={m.alt}
              className="absolute inset-0 h-full w-full object-contain [mask-image:linear-gradient(90deg,transparent_18%,black_32%,black_68%,transparent_82%)] md:[mask-image:linear-gradient(90deg,transparent_24%,black_34%,black_66%,transparent_76%)]"
              initial={reduce ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.65, ease: EASE }}
            />
          </AnimatePresence>

          <div role="tablist" aria-label="Day or night" className="glass absolute left-4 top-4 flex rounded-full p-1 md:left-6 md:top-6">
            {(Object.keys(MODES) as Mode[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={mode === k}
                onClick={() => setMode(k)}
                className="relative h-10 rounded-full px-5 text-[14px] font-medium text-ink"
              >
                {mode === k && (
                  <motion.span
                    layoutId="dn-pill"
                    className="absolute inset-0 rounded-full bg-cream"
                    transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                  />
                )}
                <span className="relative">{MODES[k].label}</span>
              </button>
            ))}
          </div>

          <div className="glass absolute bottom-4 left-4 right-4 rounded-[24px] p-5 md:bottom-6 md:left-6 md:right-auto md:w-[400px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Eyebrow className="text-ink">{m.label}</Eyebrow>
                <p className="mt-2 text-[16px] leading-[1.5] text-ink">{m.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
