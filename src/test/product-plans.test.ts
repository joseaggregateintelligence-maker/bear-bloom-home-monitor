import { describe, expect, it } from "vitest";
import { PLANS, PLUS } from "@/components/site/product-plans";

describe("Product pricing rules", () => {
  it("prices Monitor at $229", () => expect(PLANS.find(p => p.id === "monitor")?.price).toBe(229));
  it("prices Monitor + Cot Mount at $279", () => expect(PLANS.find(p => p.id === "cot")?.price).toBe(279));
  it("prices Complete Kit at $349", () => expect(PLANS.find(p => p.id === "complete")?.price).toBe(349));
  it("prices optional Plus at $5.99 per month", () => expect(PLUS.monthlyPrice).toBe(5.99));
  it("prices optional Plus at $59 per year", () => expect(PLUS.yearlyPrice).toBe(59));
  it("includes three free months of Plus with every bundle", () => expect(PLANS.map(p => p.plusFreeMonths)).toEqual([3, 3, 3]));
  it("includes 30 days of cloud video with Plus", () => expect(PLUS.cloudDays).toBe(30));
  it("does not require a subscription for safety", () => expect(PLUS.safetyRequiresSubscription).toBe(false));
  it("does not require a subscription for live view", () => expect(PLUS.liveViewRequiresSubscription).toBe(false));
  it("does not require a subscription for talk", () => expect(PLUS.talkRequiresSubscription).toBe(false));
  it("does not require a subscription for on-board recording", () => expect(PLUS.onboardRecordingRequiresSubscription).toBe(false));
});
