import { Reveal, SectionHeading } from "./primitives";

const ITEMS = [
  ["60 nights", "Try it for 60 nights. Free return label, no restocking fee."],
  ["2 years", "Warranty on the bear and every accessory."],
  ["Free shipping", "Across the US, with your delivery date shown before you pay."],
  ["Real humans", "Support by chat and phone, seven days a week."],
];

export function Covered() {
  return (
    <section id="covered" className="section-pad bg-cream">
      <div className="container-page">
        <SectionHeading eyebrow="What you’re covered by" heading="No surprises." />
        <Reveal className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.08}>
          {ITEMS.map(([label, text]) => (
            <div key={label} className="border-t border-hairline pt-5">
              <p className="font-mono uppercase tracking-[0.08em] text-cocoa" style={{ fontSize: 12 }}>{label}</p>
              <p className="mt-3 text-[16px] leading-[1.55] text-ink">{text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
