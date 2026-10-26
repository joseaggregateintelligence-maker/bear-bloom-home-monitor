import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "./primitives";

export function LifestyleBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(10% 12% 10% 12% round 28px)", "inset(0% 0% 0% 0% round 28px)"]);
  return (
    <section id="reallife" className="bg-cream">
      <div className="container-page">
        <motion.div ref={ref} style={reduce ? {} : { clipPath: clip }} className="relative h-[60svh] overflow-hidden rounded-[28px] md:h-[78vh]">
          <img src="/assets/lifestyle/morning-together.jpg" alt="Morning together: a father holding his child by the window" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/80 via-midnight/40 to-transparent p-6 pt-28 md:p-12 md:pt-40">
            <Eyebrow className="text-cream">Real life</Eyebrow>
            <p className="text-card-title mt-4 max-w-2xl text-cream md:text-[40px]">Watching over them, so you can be with them.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}