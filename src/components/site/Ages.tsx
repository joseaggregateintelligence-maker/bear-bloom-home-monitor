import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { EASE, Eyebrow, Reveal } from "./primitives";

const STAGES = [
  {
    age: "0–1 years", title: "Watching every breath",
    text: "Mounted on the Arc above the cot. Breathing motion, face-covered and rollover alerts, confirmed twice.",
    img: "/assets/white/w-06-arc-mount-cot.png", alt: "Bear Mini-Mum on the Arc mount above an empty cot",
  },
  {
    age: "1–2 years", title: "Standing, climbing, waking",
    text: "On the wall. Alerts for crying, waking and climbing, with nothing glowing towards your child.",
    img: "/assets/white/w-02-hero-three-quarter.png", alt: "Bear Mini-Mum, three-quarter view",
  },
  {
    age: "2–3 years", title: "A hug, sent",
    text: "On the shelf, turning to follow them. Squeeze its ears to send you a hug; it plays your voice back.",
    img: "/assets/white/w-04-send-a-hug.png", alt: "Squeezing Bear Mini-Mum's ears to send a hug",
  },
];

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex h-8 items-center rounded-full bg-cocoa/8 px-3.5 font-mono uppercase tracking-[0.08em] text-cocoa" style={{ fontSize: 12 }}>
      {children}
    </span>
  );
}

function Step({ s, onActive }: { s: (typeof STAGES)[number]; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const active = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const seen = useInView(ref, { margin: "-30% 0px -30% 0px", once: true });
  useEffect(() => { if (active) onActive(); }, [active, onActive]);
  return (
    <motion.div
      ref={ref}
      className="flex min-h-screen flex-col justify-center"
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={seen || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <Chip>{s.age}</Chip>
      <h3 className="text-section mt-6 text-ink">{s.title}</h3>
      <p className="text-lead mt-6 max-w-[480px] text-muted-warm">{s.text}</p>
    </motion.div>
  );
}

export function Ages() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const cur = STAGES[active] ?? STAGES[0];
  const heading = (
    <>
      <Eyebrow>One monitor, birth to three</Eyebrow>
      <h2 className="text-section mt-5 text-ink">It grows up with them.</h2>
    </>
  );
  return (
    <section id="ages" className="bg-cream">
      {/* Desktop */}
      <div className="container-page hidden grid-cols-[1.15fr_1fr] gap-16 md:grid">
        <div className="sticky top-0 motion-reduce:static flex h-screen flex-col justify-center pt-24 pb-10">
          {heading}
          <div className="relative mt-10 aspect-[10/7] w-full overflow-hidden rounded-[28px] bg-product-white">
            <AnimatePresence initial={false}>
              <motion.img
                key={cur.img}
                src={cur.img}
                alt={cur.alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
              />
            </AnimatePresence>
          </div>
        </div>
        <div>
          {STAGES.map((s, i) => (
            <Step key={s.age} s={s} onActive={() => setActive(i)} />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="container-page section-pad md:hidden">
        <Reveal>{heading}</Reveal>
        <div className="mt-10 flex flex-col gap-5">
          {STAGES.map((s) => (
            <Reveal key={s.age}>
              <article className="overflow-hidden rounded-[24px] bg-card-warm">
                <img src={s.img} alt={s.alt} className="aspect-[10/7] w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <Chip>{s.age}</Chip>
                  <h3 className="text-card-title mt-4 text-ink">{s.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.55] text-muted-warm">{s.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
