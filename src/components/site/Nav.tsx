import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, EASE } from "./primitives";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { label: "How it works", id: "features" },
  { label: "Ages", id: "ages" },
  { label: "App", id: "app" },
  { label: "Reviews", id: "testimonials" },
  { label: "Compare", id: "compare" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" },
];

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          className={cn(
            "glass hairline mx-auto flex h-[60px] items-center justify-between rounded-full pl-5 pr-2 transition-[max-width] duration-700 ease-premium",
            scrolled ? "max-w-[860px]" : "max-w-[1080px]",
          )}
        >
          <a href="#hero" onClick={go("hero")} aria-label="Bear Mini-Mum home">
            <img src="/assets/logo-horizontal-cocoa.svg" alt="Bear Mini-Mum" className="h-7 w-auto" />
          </a>
          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="text-[14px] text-ink transition-colors duration-500 hover:text-cocoa">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <Button href="#pricing" onClick={() => scrollToId("pricing")} className="h-11">
              Order · $229
            </Button>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-cocoa text-cream lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={cn("absolute left-0 top-0 h-px w-4 bg-cream transition-transform duration-500 ease-premium", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute bottom-0 left-0 h-px w-4 bg-cream transition-transform duration-500 ease-premium", open && "-translate-y-1.5 -rotate-45")} />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-cream px-5 pb-10 pt-28 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  className="border-b border-hairline"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.05 * i }}
                >
                  <a href={`#${l.id}`} onClick={go(l.id)} className="block py-4 text-[34px] font-[520] tracking-[-0.035em] text-ink">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button href="#pricing" onClick={() => { setOpen(false); scrollToId("pricing"); }} className="w-full">
                Order · $229
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
