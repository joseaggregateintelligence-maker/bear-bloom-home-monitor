import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, EASE } from "./primitives";
import { scrollToId } from "./Nav";
import { PLANS } from "./Pricing";

export function StickyBar() {
  const [show, setShow] = useState(false);
  const [sel, setSel] = useState<string>(PLANS[0].id);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const f = document.getElementById("features");
      const p = document.getElementById("pricing");
      const foot = document.getElementById("footer");
      if (!f || !p) return;
      const vh = window.innerHeight;
      const pastFeatures = f.getBoundingClientRect().bottom < vh * 0.5;
      const pr = p.getBoundingClientRect();
      const pricingOnScreen = pr.top < vh && pr.bottom > 0;
      const footerOnScreen = foot ? foot.getBoundingClientRect().top < vh : false;
      setShow(pastFeatures && !pricingOnScreen && !footerOnScreen);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const plan = PLANS.find((p) => p.id === sel)!;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="region"
          aria-label="Quick order"
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-[600px] rounded-[16px] border border-hairline bg-card-warm p-2.5 md:bottom-4"
          initial={reduce ? { opacity: 0 } : { y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 120, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 md:flex md:gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <img src="/assets/02-hero-three-quarter.png" alt="" className="h-10 w-10 shrink-0 rounded-[10px] bg-linen object-cover" loading="lazy" />
              <span className="truncate text-[15px] md:shrink-0 md:text-[14px] font-[550] text-ink">Bear Mini-Mum</span>
            </div>
            <Button className="h-10 whitespace-nowrap px-4 md:order-last md:px-3.5" onClick={() => scrollToId("pricing")}>
              Order · ${plan.price}
            </Button>
            <div role="radiogroup" aria-label="Choose a set" className="col-span-2 flex gap-1 overflow-x-auto [scrollbar-width:none] md:ml-auto">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  role="radio"
                  aria-checked={sel === p.id}
                  onClick={() => setSel(p.id)}
                  className={`h-9 shrink-0 whitespace-nowrap rounded-full px-3 text-[13px] md:h-8 md:px-2.5 md:text-[12px] transition-colors duration-500 ${sel === p.id ? "bg-cocoa text-cream" : "border border-hairline text-ink"}`}
                >
                  {p.name} ${p.price}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
