import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Bell, Heart, Smartphone, Users, type LucideIcon } from "lucide-react";
import { EASE, Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const ITEMS: { icon: LucideIcon; title: string; text: string; img: string }[] = [
  { icon: Smartphone, title: "Live view", text: "See them breathing from your lock screen, no unlocking.", img: "/assets/app-01-home-live.png" },
  { icon: Bell, title: "Moments", text: "One alert when it matters. The rest waits for morning.", img: "/assets/app-02-moments-alerts.png" },
  { icon: Heart, title: "Talk and hugs", text: "Talk, sing, and catch every hug they send.", img: "/assets/app-03-talk-and-hugs.png" },
  { icon: BarChart3, title: "Sleep", text: "Nights, naps and a report for your pediatrician.", img: "/assets/app-04-sleep-insights.png" },
  { icon: Users, title: "People", text: "Invite a babysitter for tonight. Access ends on its own.", img: "/assets/app-05-people-guest-access.png" },
];
const DURATION = 7000;

export function AppSection() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), DURATION);
    return () => clearTimeout(t);
  }, [active, cycle, reduce]);

  const pick = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };
  const cur = ITEMS[active]!;

  return (
    <section id="app" className="section-pad bg-cream">
      <div className="container-page">
        <SectionHeading eyebrow="The app" heading="Everything, at a glance. Nothing you don’t need." />
        <div className="mt-14 grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
          <ul className="border-t border-hairline">
            {ITEMS.map((it, i) => {
              const on = i === active;
              const Icon = it.icon;
              return (
                <li key={it.title} className="relative border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    onMouseEnter={() => i !== active && pick(i)}
                    aria-pressed={on}
                    className={cn(
                      "flex w-full items-start gap-4 py-6 text-left transition-colors duration-500 ease-premium",
                      on ? "text-ink" : "text-muted-warm",
                    )}
                  >
                    <Icon className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} />
                    <span>
                      <span className="block text-[21px] font-[520] tracking-[-0.02em]">{it.title}</span>
                      <span className="mt-1 block text-[16px] leading-[1.5]">{it.text}</span>
                    </span>
                  </button>
                  {on && (
                    <motion.span
                      key={`${active}-${cycle}`}
                      className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-cocoa"
                      initial={{ scaleX: reduce ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduce ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mx-auto w-[280px] rounded-[56px] bg-ink p-3 md:w-[320px]">
            <div className="relative aspect-[1170/2532] overflow-hidden rounded-[44px] bg-cream">
              <AnimatePresence initial={false}>
                <motion.img
                  key={cur.img}
                  src={cur.img}
                  alt={`${cur.title} screen in the Bear Mini-Mum app`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Reveal className="mt-20">
          <img
            src="/assets/app-showcase-three-screens.png"
            alt="Three screens of the Bear Mini-Mum app"
            className="w-full rounded-[28px] bg-linen"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
