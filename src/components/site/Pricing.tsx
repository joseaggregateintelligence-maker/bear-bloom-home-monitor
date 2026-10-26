import { Button, Reveal, SectionHeading } from "./primitives";
import { PLANS, PLUS } from "./product-plans";

export function Pricing() {
  return (
    <section id="pricing" className="section-pad relative overflow-hidden bg-cream">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cocoa opacity-15 blur-[100px]" />
      <div className="container-page relative">
        <SectionHeading eyebrow="Pricing" heading="Simple pricing. Safety included." />
        <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-5">
          {PLANS.map((p) => {
            const popular = "popular" in p && p.popular;
            return (
              <Reveal key={p.id} className="h-full">
                <article className={`relative flex h-full flex-col rounded-[24px] bg-card-warm p-6 md:p-7 ${popular ? "border border-cocoa" : "border border-hairline"}`}>
                  {popular && <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-cocoa px-3.5 py-1.5 text-[13px] font-medium text-cream">✦ Most popular</span>}
                  <h3 className="text-[21px] font-[520] text-ink">{p.name}</h3>
                  <p className="mt-3 text-[40px] font-[520] leading-none text-ink">${p.price}</p>
                  <p className="mt-3 text-[16px] text-muted-warm">{p.line}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3 py-5">
                    {p.items.map((it) => <li key={it} className="flex items-start gap-3 text-[15px] leading-[1.45] text-ink"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cocoa" />{it}</li>)}
                  </ul>
                  <Button variant={popular ? "primary" : "secondary"} className="mt-6 h-auto min-h-12 w-full px-3 py-3 text-center">{p.cta}</Button>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-8">
          <article className="rounded-[24px] border border-hairline bg-card-warm p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div><h3 className="text-card-title text-ink">Bear Mini-Mum Plus</h3><p className="mt-3 text-muted-warm">Optional. Never needed for safety.</p></div>
              <p className="text-[21px] font-medium text-cocoa">${PLUS.monthlyPrice}/month or ${PLUS.yearlyPrice}/year</p>
            </div>
            <ul className="mt-7 grid gap-4 border-t border-hairline pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {PLUS.items.map((item) => <li key={item} className="text-[15px] text-ink">{item}</li>)}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
