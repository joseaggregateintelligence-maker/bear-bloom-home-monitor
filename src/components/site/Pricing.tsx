import { Button, Reveal, SectionHeading } from "./primitives";

export const PLANS = [
  {
    id: "hold",
    name: "Hold the night",
    price: 229,
    line: "The bear, its base and a wall plate.",
    items: ["Bear Mini-Mum with base", "Wall plate", "Every safety alert, free for life", "64 GB on-board recording"],
    cta: "Order Bear Mini-Mum",
  },
  {
    id: "nursery",
    name: "Nursery set",
    price: 299,
    line: "Everything for the cot years.",
    items: ["Everything in Hold the night", "Arc cot mount", "Travel pouch"],
    cta: "Order the Nursery set",
    popular: true,
  },
  {
    id: "complete",
    name: "Complete",
    price: 379,
    line: "Every room, every age.",
    items: ["Everything in the Nursery set", "Breathing pad", "Floor stand"],
    cta: "Order Complete",
  },
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="section-pad relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cocoa opacity-15 blur-[100px]"
      />
      <div className="container-page relative">
        <SectionHeading eyebrow="Pricing" heading="One price. Safety included." />
        <div className="mt-14 grid gap-5 xl:grid-cols-[1fr_1fr_1fr_0.9fr]">
          {PLANS.map((p) => {
            const popular = "popular" in p && p.popular;
            return (
              <Reveal key={p.id} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-[24px] bg-card-warm p-6 md:p-7 ${popular ? "border border-cocoa" : "border border-hairline"}`}
                >
                  {popular && (
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-cocoa px-3.5 py-1.5 text-[13px] font-medium text-cream">
                      ✦ Most popular
                    </span>
                  )}
                  <h3 className="text-[21px] font-[520] tracking-[-0.02em] text-ink">{p.name}</h3>
                  <p className="mt-3 text-[40px] font-[520] leading-none tracking-[-0.035em] text-ink">${p.price}</p>
                  <p className="mt-3 text-[16px] text-muted-warm">{p.line}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3 rounded-[16px] bg-cream p-5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[15px] leading-[1.45] text-ink">
                        <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cocoa" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Button variant={popular ? "primary" : "secondary"} className="mt-6 w-full">
                    {p.cta}
                  </Button>
                </article>
              </Reveal>
            );
          })}
          <Reveal className="hidden h-full xl:block">
            <figure className="relative h-full overflow-hidden rounded-[24px] bg-linen">
              <img
                src="/assets/20-in-the-box-flat-lay.png"
                alt="Flat lay of everything in the box: the bear, its base, wall plate and cable"
                className="h-full w-full object-contain mix-blend-multiply"
                loading="lazy"
              />
              <figcaption className="glass absolute left-4 top-4 rounded-full px-3.5 py-2 font-mono uppercase tracking-[0.08em] text-ink" style={{ fontSize: 12 }}>
                In the box
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <Reveal className="mt-5 xl:hidden">
          <figure className="relative overflow-hidden rounded-[24px] bg-linen">
            <img
              src="/assets/20-in-the-box-flat-lay.png"
              alt="Flat lay of everything in the box: the bear, its base, wall plate and cable"
              className="aspect-[4/3] w-full object-cover md:aspect-[16/7]"
              loading="lazy"
            />
            <figcaption className="glass absolute left-4 top-4 rounded-full px-3.5 py-2 font-mono uppercase tracking-[0.08em] text-ink" style={{ fontSize: 12 }}>
              In the box
            </figcaption>
          </figure>
        </Reveal>
        <p className="mt-8 text-[14px] text-muted-warm">
          Optional Plus: 30-day encrypted cloud backup and long-term trends, $4.99/month. Never needed for safety.
        </p>
      </div>
    </section>
  );
}
