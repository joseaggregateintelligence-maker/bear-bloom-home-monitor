import { useState } from "react";
import { Eyebrow } from "./primitives";
import { scrollToId } from "./Nav";

const COLS = [
  { title: "Product", links: [["How it works", "features"], ["Ages", "ages"], ["App", "app"], ["Pricing", "pricing"]] },
  { title: "Support", links: [["FAQ", "faq"], ["Setup", "setup"], ["Warranty", "covered"], ["Returns", "covered"]] },
  { title: "Company", links: [["Privacy", "privacy"], ["Compare", "compare"], ["Accessories", "accessories"]] },
];

export function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer id="footer" className="relative bg-midnight pb-12 text-cream">
      <div className="container-page pt-[88px] md:pt-[160px]">
        <div className="max-w-3xl">
          <Eyebrow className="text-glow">Bedtime notes</Eyebrow>
          <h2 className="text-section mt-5 text-cream">Calm advice for the first three years. Monthly, never more.</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); setDone(true); }}
            className="mt-10 flex h-14 max-w-[520px] items-center rounded-full border border-cream/15 bg-cream/5 p-1.5 pl-5"
          >
            <label htmlFor="news-email" className="sr-only">Email address</label>
            <input
              id="news-email"
              type="email"
              required
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent text-[16px] text-cream placeholder:text-cream/50 focus:outline-none"
            />
            <button type="submit" className="h-11 shrink-0 rounded-full bg-cocoa px-5 text-[15px] font-[550] text-cream">
              {done ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <img src="/assets/logo-horizontal-night-transparent.png" alt="Bear Mini-Mum" className="h-10 w-auto" loading="lazy" />
          </div>
          {COLS.map((c) => (
            <div key={c.title} className="border-t border-cream/10 pt-5">
              <p className="font-mono uppercase tracking-[0.08em] text-cream/60" style={{ fontSize: 12 }}>{c.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map(([label, id]) => (
                  <li key={label}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => { e.preventDefault(); scrollToId(id!); }}
                      className="text-[15px] text-cream/85 transition-colors duration-500 hover:text-glow"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-16 border-t border-cream/10 pt-6 text-[13px] text-cream/60">© 2026 Bear Mini-Mum. Concept project.</p>
      </div>
      <p
        aria-hidden
        className="footer-wordmark pointer-events-none mt-8 select-none whitespace-nowrap text-center font-semibold leading-[1.15] text-cream/[0.12]"
        
      >
        Bear Mini-Mum
      </p>
    </footer>
  );
}
