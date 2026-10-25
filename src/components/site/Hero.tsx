import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button, EASE, Eyebrow } from "./primitives";
import { scrollToId } from "./Nav";

const SPECS = [
  { value: "2.5K", label: "HDR night vision" },
  { value: "On-device", label: "AI, no cloud needed" },
  { value: "360°", label: "follows your toddler" },
  { value: "0–3", label: "years, one monitor" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const productScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const init = (v: object) => (reduce ? false : v);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-linen"
      style={{ backgroundImage: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(255,253,249,0.75), transparent 70%)" }}
    >
      {/* Spec strip */}
      <motion.div
        className="container-page relative z-10 hidden pt-[108px] md:block"
        initial={init({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.7 }}
      >
        <ul className="grid grid-cols-4 border-t border-hairline pt-5">
          {SPECS.map((s) => (
            <li key={s.label}>
              <p className="text-[28px] font-[520] leading-none tracking-[-0.035em] text-ink">{s.value}</p>
              <p className="text-label mt-2 text-muted-warm">{s.label}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Watermark + product */}
      <div className="relative flex flex-1 items-center justify-center pt-24 md:pt-0">
        <motion.div style={reduce ? undefined : { y: markY }} className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none">
          <motion.p
            aria-hidden
            className="whitespace-nowrap text-center font-semibold leading-none text-watermark"
            style={{ fontSize: "22vw" }}
            initial={init({ y: "14%", letterSpacing: "-0.02em", opacity: 0 })}
            animate={{ y: "0%", letterSpacing: "-0.06em", opacity: 1 }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            Mini-Mum
          </motion.p>
        </motion.div>
        <motion.div style={reduce ? undefined : { scale: productScale }} className="relative">
          <motion.video
            src="/assets/09-turntable-360.mp4"
            poster="/assets/02-hero-three-quarter.png"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Bear Mini-Mum baby monitor turning 360 degrees"
            className="h-[360px] w-auto mix-blend-multiply [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_60%,transparent_100%)] md:h-[560px]"
            initial={init({ y: "7%", scale: 0.94, opacity: 0 })}
            animate={{ y: "0%", scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
          />
        </motion.div>
      </div>

      {/* Bottom row */}
      <motion.div
        className="container-page relative z-10 flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between"
        initial={init({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.55 }}
      >
        <div>
          <Eyebrow>Bear Mini-Mum</Eyebrow>
          <h1 className="mt-3 text-[30px] font-[520] leading-[1.05] tracking-[-0.035em] text-ink md:text-[40px]">
            Sleep. We’ve got the night.
          </h1>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-label text-ink">$229 · Free US shipping</p>
          <div className="flex flex-wrap gap-3">
            <Button href="#pricing" onClick={() => scrollToId("pricing")}>Order now</Button>
            <Button variant="secondary" arrow={false} onClick={() => scrollToId("features")}>How it works</Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
