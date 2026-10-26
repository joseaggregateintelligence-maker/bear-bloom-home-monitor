export const PLUS = {
  monthlyPrice: 5.99,
  yearlyPrice: 59,
  freeMonths: 3,
  cloudDays: 30,
  safetyRequiresSubscription: false,
  liveViewRequiresSubscription: false,
  talkRequiresSubscription: false,
  onboardRecordingRequiresSubscription: false,
  items: ["30 days of cloud video", "Sleep insights and trends", "Pediatrician report", "Highlight reels"],
} as const;

export const PLANS = [
  {
    id: "monitor", name: "Monitor", price: 229,
    line: "Everything to start watching tonight.",
    items: ["Bear Mini-Mum with base", "Wall plate", "Every safety alert included", "64 GB on-board recording", `${PLUS.freeMonths} months of Plus free`],
    cta: "Order Monitor", plusFreeMonths: PLUS.freeMonths,
  },
  {
    id: "cot", name: "Monitor + Cot Mount", price: 279,
    line: "Best for newborns.",
    items: ["Everything in Monitor", "Arc cot mount for an overhead view", `${PLUS.freeMonths} months of Plus free`],
    cta: "Order Monitor + Cot Mount", popular: true, plusFreeMonths: PLUS.freeMonths,
  },
  {
    id: "complete", name: "Complete Kit", price: 349,
    line: "Every room, every age.",
    items: ["Everything in Monitor + Cot Mount", "Breathing pad", "Travel pouch", `${PLUS.freeMonths} months of Plus free`],
    cta: "Order Complete Kit", plusFreeMonths: PLUS.freeMonths,
  },
] as const;