import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, EASE, Reveal } from "./primitives";

const QA = [
  ["Do I need a subscription?", "No. Every safety alert, live view, talk and on-board recording work without one. Bear Mini-Mum Plus is optional: $5.99 a month for cloud video backup, sleep insights, a pediatrician report and highlight reels. Your first 3 months are free."],
  ["Where are my videos stored?", "On the bear itself, on 64 GB of built-in storage. Live viewing from your phone is end-to-end encrypted. Videos go to the cloud only if you turn on Plus cloud backup."],
  ["Does it work if our WiFi goes down?", "Yes. It keeps recording on the bear, and your phone connects to it directly over your home network or Bluetooth."],
  ["Is it safe to put near the cot?", "It always sits outside the cot and out of reach, with the cable hidden inside the Arc mount or wall plate. We design to ASTM F2951, the US baby monitor safety standard."],
  ["Does it prevent SIDS?", "No monitor can, and we never claim to. Bear Mini-Mum helps you keep watch; safe sleep practices are what lower the risk."],
  ["Who can watch the camera?", "Only people you invite. Babysitters get time-limited access that ends on its own, and you can see everyone who watched."],
  ["What ages is it for?", "From birth to three. It moves from the cot Arc to the wall to a shelf as your child grows."],
  ["Can I use it while travelling?", "Yes. It packs into its travel pouch and works on any WiFi, or locally without it."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <section id="faq" className="section-pad bg-cream">
      <div className="container-page grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal className="md:sticky md:top-32 md:self-start">
          <h2 className="text-section text-ink">Questions, answered.</h2>
          <Button variant="secondary" href="mailto:hello@bearminimum.com" className="mt-8">Ask us anything</Button>
        </Reveal>
        <ul className="border-t border-hairline">
          {QA.map(([q, a], i) => {
            const on = open === i;
            return (
              <li key={q} className="border-b border-hairline">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-[520] tracking-[-0.02em] text-ink md:text-[21px]"
                  >
                    <span className="min-w-0">{q}</span>
                    <span
                      aria-hidden
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-[20px] font-light text-cocoa transition-transform duration-500 ease-premium ${on ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[620px] pb-7 pr-14 text-[16px] leading-[1.6] text-muted-warm">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
