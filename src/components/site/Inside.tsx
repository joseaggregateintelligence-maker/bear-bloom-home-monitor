import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Eyebrow, Reveal } from "./primitives";

export function Inside() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  return (
    <section ref={ref} id="inside" className="section-pad bg-midnight text-cream">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <Eyebrow className="text-glow">Inside</Eyebrow>
          <h2 className="text-section mt-5 text-cream">Nine parts. One small bear.</h2>
          <p className="text-lead mt-6 text-sand">Everything a premium monitor needs, inside 11 centimetres.</p>
        </Reveal>
        <Reveal className="mt-14">
          <video
            src="/assets/13-exploded-view-animation.mp4"
            poster="/assets/11-exploded-view-dark.png"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Exploded view of the nine parts inside Bear Mini-Mum"
            className="w-full rounded-[28px]"
          />
          <div className="mt-6 h-px w-full bg-cream/10">
            <motion.div
              className="h-px origin-left bg-glow"
              style={{ scaleX: reduce ? 1 : scrollYProgress }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
