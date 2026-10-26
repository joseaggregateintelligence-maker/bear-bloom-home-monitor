import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import { EASE, Eyebrow } from "./primitives";

const FEATURES = [
  {
    n: "01", title: "Sees in the dark",
    heading: "Sees every breath, even in the dark.",
    lead: "A 2.5K HDR camera with invisible 940 nm night vision. No red glow, nothing to keep little ones awake.",
    data: "2.5K HDR · 125° LENS · 8X ZOOM · 940 NM IR",
  },
  {
    n: "02", title: "Alerts you can trust",
    heading: "Every alert means something.",
    lead: "Urgent alerts are double-checked before they wake you, and sound even on silent. Crying and waking get a gentle nudge. Everything else waits in your morning summary.",
    data: "URGENT · DOUBLE-CHECKED   EVERYDAY · GENTLE   THE REST · MORNING SUMMARY",
  },
  {
    n: "03", title: "Private by design",
    heading: "Smart inside. Private by default.",
    lead: "Bear Mini-Mum’s AI works inside the bear and records to 64 GB on board, so your videos stay at home. Watch live from anywhere over an end-to-end encrypted connection.",
    data: "ON-DEVICE AI · 64 GB ON THE BEAR · END-TO-END ENCRYPTED · NO ADS, EVER",
  },
  {
    n: "04", title: "Safety, always included",
    heading: "Safety is free. Plus makes it more.",
    lead: "Every safety alert, live view, talk and on-board recording works with no subscription. Bear Mini-Mum Plus adds 30 days of cloud video, sleep insights, a pediatrician report and highlight reels.",
    data: "SAFETY INCLUDED · PLUS $5.99/MO · FIRST 3 MONTHS FREE",
  },
];

function Block({ f, onActive }: { f: (typeof FEATURES)[number]; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const active = useInView(ref, { margin: "-50% 0px -50% 0px" });
  useEffect(() => { if (active) onActive(); }, [active, onActive]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.92], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.35], [40, 0]);
  const blur = useTransform(scrollYProgress, [0.7, 0.92], ["blur(0px)", "blur(4px)"]);
  return (
    <motion.div
      ref={ref}
      style={reduce ? {} : { opacity, y, filter: blur }}
      className="flex flex-col justify-center py-14 md:min-h-screen md:py-0"
    >
      <Eyebrow number={f.n}>{f.title}</Eyebrow>
      <h3 className="text-section mt-5 text-ink">{f.heading}</h3>
      <p className="text-lead mt-6 max-w-[520px] text-muted-warm">{f.lead}</p>
      <p className="mt-8 border-t border-hairline pt-5 font-mono uppercase tracking-[0.08em] text-muted-warm" style={{ fontSize: 12 }}>
        {f.data}
      </p>
    </motion.div>
  );
}

export function Features() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const cur = FEATURES[active] ?? FEATURES[0];
  if (!cur) return null;
  return (
    <section id="features" className="bg-cream pb-[88px] md:pb-0">
      <div className="container-page grid gap-0 md:grid-cols-2 md:gap-16">
        <div className="md:order-2">
          <div className="pt-[88px] md:sticky md:top-0 motion-reduce:md:static md:flex md:h-screen md:items-center md:pt-0">
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[28px] bg-product-white md:h-[min(720px,86vh)]">
              <img
                src="/assets/white/w-01-hero-front.png"
                alt="Bear Mini-Mum baby monitor, front view"
                className="h-[380px] w-auto mix-blend-multiply [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_65%,transparent_100%)] md:h-[min(620px,76vh)]"
              />
              <div className="absolute bottom-5 left-5 hidden md:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur.n}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="glass rounded-full px-4 py-2.5 font-mono uppercase tracking-[0.08em] text-ink"
                    style={{ fontSize: 12 }}
                  >
                    {cur.n} · {cur.title}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="md:order-1">
          {FEATURES.map((f, i) => (
            <Block key={f.n} f={f} onActive={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
