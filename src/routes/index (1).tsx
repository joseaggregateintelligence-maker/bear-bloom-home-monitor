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
import { AppSection } from "@/components/site/AppSection";
import { Setup } from "@/components/site/Setup";
import { Accessories } from "@/components/site/Accessories";
import { Lifestyle } from "@/components/site/Lifestyle";
import { Compare } from "@/components/site/Compare";
import { Testimonials } from "@/components/site/Testimonials";
import { UsMap } from "@/components/site/UsMap";
import { Privacy } from "@/components/site/Privacy";
import { InTheBox } from "@/components/site/InTheBox";
import { LifestyleBand } from "@/components/site/LifestyleBand";
import { Pricing } from "@/components/site/Pricing";
import { Covered } from "@/components/site/Covered";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { StickyBar } from "@/components/site/StickyBar";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const img = `${loaderData?.origin ?? ""}/assets/white/w-02-hero-three-quarter-share.jpg`;
    return {
      meta: [
        { title: "Bear Mini-Mum · The baby monitor that grows up with them" },
        { name: "description", content: "A small bear-shaped baby monitor for ages 0–3. 2.5K night vision, on-device AI, every safety alert included, no subscription needed." },
        { property: "og:title", content: "Bear Mini-Mum · The baby monitor that grows up with them" },
        { property: "og:description", content: "A small bear-shaped baby monitor for ages 0–3. 2.5K night vision, on-device AI, every safety alert included, no subscription needed." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
      ],
    };
  },
  component: Index,
});

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
        <LifestyleBand />
        <Features />
        <DayNight />
        <Inside />
        <Ages />
        <AppSection />
        <Setup />
        <Accessories />
        <Lifestyle />
        <Testimonials />
        <UsMap />
        <Compare />
        <Privacy />
        <InTheBox />
        <Pricing />
        <Covered />
        <Faq />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
