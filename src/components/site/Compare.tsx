import { Reveal, SectionHeading } from "./primitives";

const COLS = ["Bear Mini-Mum", "Non-WiFi camera", "AI WiFi camera", "Wearable sock monitor"];
const ROWS: [string, string, string, string, string][] = [
  ["Smart safety alerts", "Included, no subscription", "None", "Paid after year one", "Vitals only"],
  ["Works if the WiFi drops", "✓ local mode", "✓", "—", "—"],
  ["Nothing worn by the baby", "✓", "✓", "✓", "— sock"],
  ["Video kept at home by default", "✓", "✓", "— cloud", "— cloud"],
  ["Remote viewing from anywhere", "✓", "—", "✓", "✓"],
  ["Follows a toddler 360°", "✓", "Manual pan", "—", "—"],
  ["Designed for ages 0–3", "✓", "—", "Mostly 0–1", "1–18 months"],
  ["Send-a-hug for toddlers", "✓", "—", "—", "—"],
];

export function Compare() {
  return (
    <section id="compare" className="section-pad bg-cream">
      <div className="container-page">
        <SectionHeading eyebrow="Compare" heading="Everything the others do. Without the catch." />
        <Reveal className="mt-14 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[28%] pb-5" />
                {COLS.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`px-5 pb-5 pt-6 align-bottom text-[16px] font-[550] tracking-[-0.01em] ${i === 0 ? "rounded-t-[24px] bg-linen text-ink" : "text-muted-warm"}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, ...vals], r) => (
                <tr key={label}>
                  <th scope="row" className="border-t border-hairline py-5 pr-4 text-[16px] font-medium text-ink">{label}</th>
                  {vals.map((v, i) => (
                    <td
                      key={i}
                      className={`border-t border-hairline px-5 py-5 text-[15px] ${i === 0 ? `bg-linen font-medium text-ink ${r === ROWS.length - 1 ? "rounded-b-[24px]" : ""}` : "text-muted-warm"}`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-6 text-[13px] text-muted-warm">
          Based on public product information for leading monitors in each category, October 2026.
        </p>
      </div>
    </section>
  );
}
