import { useRef } from "react";
import { SectionHeading } from "./primitives";

const ITEMS = [
  { name: "Arc mount", price: "$49", text: "Wraps any cot rail. Tilt to any angle.", img: "/assets/white/w-14-accessory-arc-mount.png" },
  { name: "Wall plate", price: "Included", text: "Magnetic, with tilt, for a room-wide view.", img: "/assets/white/w-15b-wall-plate-with-bear.png" },
  { name: "Floor stand", price: "$69", text: "An overhead view where clamping isn’t possible.", img: "/assets/white/w-16-accessory-floor-stand.png" },
  { name: "Breathing pad", price: "$99", text: "The second signal for breathing alerts.", img: "/assets/white/w-17-accessory-breathing-pad.png" },
  { name: "Travel pouch", price: "$29", text: "For Grandma’s house and holidays.", img: "/assets/white/w-18-accessory-travel-pouch.png" },
  { name: "Size", price: "11 cm", text: "About the height of a coffee mug.", img: "/assets/white/w-08-scale-with-books.png" },
];

export function Accessories() {
  const row = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !row.current) return;
    drag.current = { x: e.clientX, left: row.current.scrollLeft, moved: false };
    row.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current || !row.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    row.current.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => { drag.current = null; };

  return (
    <section id="accessories" className="section-pad overflow-hidden bg-cream">
      <div className="container-page">
        <SectionHeading eyebrow="Accessories" heading="Made for every room, and every age." />
      </div>
      <div
        ref={row}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        data-lenis-prevent-wheel=""
        className="mt-14 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] active:cursor-grabbing md:snap-none md:gap-5 [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: "max(20px, calc((100vw - 1320px) / 2 + 40px))", scrollPaddingInline: "20px" }}
      >
        {ITEMS.map((it) => (
          <article
            key={it.name}
            className="flex h-[460px] w-[82vw] max-w-[440px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] bg-product-white select-none md:h-[520px] md:w-[440px]"
          >
            <div className="relative flex-1">
              <img src={it.img} alt={it.name} draggable={false} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="border-t border-hairline p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[21px] font-[520] tracking-[-0.02em] text-ink">{it.name}</h3>
                <span className="font-mono uppercase tracking-[0.08em] text-cocoa" style={{ fontSize: 12 }}>{it.price}</span>
              </div>
              <p className="mt-1.5 text-[16px] leading-[1.5] text-cocoa">{it.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
