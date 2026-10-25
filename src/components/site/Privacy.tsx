import { Eyebrow, Reveal } from "./primitives";

const STATS = [
  ["0", "seconds of video sent to the cloud by default"],
  ["64 GB", "of recording, kept on the bear"],
  ["E2E", "encryption for remote viewing and backup"],
  ["2×", "signals confirm every safety alert"],
  ["ASTM F2951", "the US baby monitor safety standard we design to"],
  ["No ads", "we never sell or share video or health data"],
];

export function Privacy() {
  return (
    <section id="privacy" className="section-pad bg-midnight text-cream">
      <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <img src="/assets/05-visor-close-up.png" alt="Close-up of the cocoa camera visor" className="w-full rounded-[28px]" loading="lazy" />
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow className="text-glow">Privacy and safety</Eyebrow>
            <h2 className="text-section mt-5 text-cream">Proof, not promises.</h2>
          </Reveal>
          <Reveal className="mt-10 grid grid-cols-2 gap-3" stagger={0.08}>
            {STATS.map(([fig, cap]) => (
              <div key={fig} className="h-full rounded-[24px] border border-cream/10 bg-card-warm/6 p-5 backdrop-blur-[14px]">
                <p className="text-[28px] font-[520] leading-none tracking-[-0.035em] text-cream md:text-[40px]">{fig}</p>
                <p className="mt-3 text-[14px] leading-[1.45] text-cream/60">{cap}</p>
              </div>
            ))}
          </Reveal>
          <p className="mt-8 text-[13px] leading-[1.55] text-cream/60">
            Bear Mini-Mum is not a medical device and does not prevent SIDS. Always follow safe sleep guidance: baby on their back, in a clear cot, every sleep.
          </p>
        </div>
      </div>
    </section>
  );
}
