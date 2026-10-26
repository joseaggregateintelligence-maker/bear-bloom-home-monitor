import { Reveal, SectionHeading } from "./primitives";

const CONTENTS = ["Bear Mini-Mum with base", "Magnetic wall plate and fixings", "USB-C cable and power adapter", "Quick start and safe-sleep guide"];

export function InTheBox() {
  return (
    <section id="inthebox" className="section-pad bg-cream">
      <div className="container-page">
        <SectionHeading eyebrow="In the box" heading="Everything you need, ready in minutes." />
        <div className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <img src="/assets/white/w-20-in-the-box-flat-lay.png" alt="Bear Mini-Mum and accessories arranged in a flat lay" loading="lazy" className="aspect-[4/3] w-full rounded-[28px] bg-product-white object-contain" />
          </Reveal>
          <Reveal>
            <ul className="border-t border-hairline">
              {CONTENTS.map((item) => <li key={item} className="flex justify-between gap-5 border-b border-hairline py-5 text-ink"><span>{item}</span><span className="shrink-0 font-mono text-muted-warm">×1</span></li>)}
            </ul>
            <p className="mt-6 text-[14px] text-muted-warm">Box: 12.5 × 12.5 × 14 cm. Plastic-free packaging.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}