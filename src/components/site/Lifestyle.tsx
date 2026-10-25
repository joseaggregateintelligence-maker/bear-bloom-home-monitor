import { SectionHeading } from "./primitives";

const CARDS = [
  { img: "/assets/lifestyle/3am-glance.jpg", cap: "The 3am glance", alt: "A mother checks her phone at night while the bear glows softly on a shelf" },
  { img: "/assets/lifestyle/babysitter-shift.jpg", cap: "The babysitter’s shift", alt: "A babysitter on the sofa checking the app, the bear on the side table" },
  { img: "/assets/lifestyle/hug-sent.jpg", cap: "A hug, sent", alt: "A toddler squeezing the bear's ears on a low shelf" },
  { img: "/assets/lifestyle/grandma-watch.jpg", cap: "Grandma keeps watch", alt: "A grandmother smiling at her phone beside the bear" },
  { img: "/assets/lifestyle/morning-together.jpg", cap: "Morning together", alt: "A father holding his child by the window in the morning" },
  { img: "/assets/lifestyle/evening-off.jpg", cap: "An evening off", alt: "Parents relaxing on the sofa, checking the app together" },
];
const TILTS = ["rotate-0", "-rotate-2", "rotate-0", "rotate-3", "rotate-0", "-rotate-3"];

function Row({ items, reverse }: { items: typeof CARDS; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="group/marquee overflow-hidden py-4">
      <div
        className="marquee-track flex w-max gap-6 group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map((c, i) => (
          <figure
            key={i}
            aria-hidden={i >= items.length}
            className={`relative h-[420px] w-[300px] shrink-0 overflow-hidden rounded-[28px] bg-linen ${TILTS[i % TILTS.length]}`}
          >
            <img src={c.img} alt={i >= items.length ? "" : c.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            <figcaption className="glass absolute bottom-4 left-4 rounded-full px-3.5 py-2 text-[14px] font-medium text-ink">
              {c.cap}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Lifestyle() {
  const second = [...CARDS.slice(3), ...CARDS.slice(0, 3)];
  return (
    <section id="lifestyle" className="section-pad overflow-hidden bg-cream">
      <div className="container-page">
        <SectionHeading eyebrow="Everyone who keeps watch" heading="Made for the people who love them." />
      </div>
      <div className="mt-14 flex flex-col gap-4">
        <Row items={CARDS} />
        <Row items={second} reverse />
      </div>
    </section>
  );
}
