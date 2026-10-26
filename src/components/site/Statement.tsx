import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const QUIET = "Most baby monitors do too much. Too many alerts, too many apps, too many false alarms. And still you get up to check.";
const LOUD = "Bear minimum design. Maximum care.";

function Word({ word, progress, range, strong }: { word: string; progress: MotionValue<number>; range: [number, number]; strong: boolean }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={reduce ? {} : { opacity }}
      className={strong ? "font-semibold text-ink" : "text-muted-warm"}
    >
      {word}{" "}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = [
    ...QUIET.split(" ").map((w) => ({ w, strong: false })),
    ...LOUD.split(" ").map((w) => ({ w, strong: true })),
  ];
  return (
    <section id="statement" className="section-pad bg-cream">
      <div className="container-page">
        <p
          ref={ref}
          className="mx-auto max-w-[1000px] text-center text-[30px] font-medium leading-[1.2] tracking-[-0.03em] md:text-[48px]"
        >
          {words.map((x, i) => (
            <Word key={i} word={x.w} strong={x.strong} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
