import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Statement } from "@/components/site/Statement";
import { Features } from "@/components/site/Features";
import { DayNight } from "@/components/site/DayNight";
import { Inside } from "@/components/site/Inside";
import { Ages } from "@/components/site/Ages";
import { Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bear Mini-Mum — Smart baby monitor for ages 0–3" },
      { name: "description", content: "Bear Mini-Mum is a small bear-shaped smart baby monitor with on-device AI, private video and free safety alerts for life." },
      { property: "og:title", content: "Bear Mini-Mum — Smart baby monitor for ages 0–3" },
      { property: "og:description", content: "A small bear-shaped smart baby monitor with on-device AI, private video and free safety alerts for life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SECTIONS = [
  "app", "setup",
  "accessories", "lifestyle", "compare", "privacy", "pricing", "covered", "faq",
];

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete (window as unknown as { __lenis?: Lenis }).__lenis; };
  }, []);
}

function Index() {
  useLenis();
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Features />
        <DayNight />
        <Inside />
        <Ages />
        {SECTIONS.map((id, i) => (
          <section
            key={id}
            id={id}
            className={`section-pad border-b border-hairline ${id === "daynight" ? "bg-midnight" : ""}`}
          >
            <div className="container-page">
              <Eyebrow number={String(i + 7).padStart(2, "0")} className={id === "daynight" ? "text-glow" : ""}>
                {id}
              </Eyebrow>
            </div>
          </section>
        ))}
      </main>
      <footer id="footer" className="section-pad">
        <div className="container-page">
          <Eyebrow number="16">footer</Eyebrow>
        </div>
      </footer>
    </div>
  );
}
