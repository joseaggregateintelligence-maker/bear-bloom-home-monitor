import { SectionHeading } from "./primitives";

type Review = { quote: string; name: string; detail: string };

const TOP: Review[] = [
  { quote: "The first monitor that doesn’t cry wolf. One alert in a month, and it was real.", name: "Maya R.", detail: "Mum of Eli, 4 months · Austin" },
  { quote: "I check her from my lock screen without even unlocking. That alone changed my nights.", name: "Daniel K.", detail: "Dad of Rose, 7 months · Chicago" },
  { quote: "Knowing the video stays on the bear was the reason we bought it.", name: "Priya S.", detail: "Mum of Arjun, 1 · Seattle" },
  { quote: "It looks like it belongs on the shelf, not on a security system.", name: "Hannah L.", detail: "Mum of Teddy, 10 months · Brooklyn" },
];
const BOTTOM: Review[] = [
  { quote: "Leo squeezes its ears every afternoon to send me a hug at work. I melt every time.", name: "Sofia M.", detail: "Mum of Leo, 2 · Miami" },
  { quote: "The babysitter got access for one evening and it switched off on its own. Simple.", name: "Marcus T.", detail: "Dad of Zoe, 3 · Atlanta" },
  { quote: "We moved it from the cot to the wall when she started climbing. Same bear, new job.", name: "Grace W.", detail: "Grandmother of Isla, 18 months · Denver" },
  { quote: "No subscription to keep her safe. That should be the standard.", name: "James and Luis", detail: "Dads of Noah, 9 months · San Francisco" },
];

function initials(name: string) {
  return name
    .split(/\s+|and/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Stars() {
  return (
    <div className="flex gap-1 text-cocoa" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" aria-hidden fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ r, hidden }: { r: Review; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="hairline flex w-[320px] shrink-0 flex-col justify-between gap-8 rounded-[24px] bg-card-warm p-8 md:w-[420px]"
    >
      <div className="flex flex-col gap-5">
        <Stars />
        <blockquote className="text-[18px] leading-[1.5] tracking-[-0.01em] text-ink md:text-[20px]">“{r.quote}”</blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linen text-[15px] font-semibold text-cocoa">
          {initials(r.name)}
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-[16px] font-semibold text-ink">{r.name}</span>
          <span className="font-mono uppercase tracking-[0.08em] text-muted-warm" style={{ fontSize: 12 }}>
            {r.detail}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div
      className="group/marquee overflow-x-auto py-2 [scrollbar-width:none] motion-safe:overflow-hidden [&::-webkit-scrollbar]:hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="marquee-track flex w-max gap-6 px-5 group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: "70s" }}
      >
        {loop.map((r, i) => (
          <Card key={i} r={r} hidden={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad overflow-hidden bg-cream">
      <div className="container-page">
        <SectionHeading
          eyebrow="Beta families"
          heading="Fewer false alarms. More sleep."
          lead="What families in our beta programme told us after their first month."
        />
      </div>
      <div className="mt-14 flex flex-col gap-6">
        <Row items={TOP} />
        <Row items={BOTTOM} reverse />
      </div>
      <p className="container-page mt-10 text-center text-[13px] text-muted-warm">
        Illustrative concept content: beta programme feedback, names changed.
      </p>
    </section>
  );
}
