import type { Opportunity, OpportunityMetrics } from "./types";

// ── Content Priority Engine ─────────────────────────────────────
// Jedna liczba zamiast dziesięciu wykresów. Wagi są jawne i edytowalne —
// to jest miejsce, w którym strategia platformy jest "zaszyta" w kodzie.

export const WEIGHTS = {
  businessValue: 0.25,
  trafficPotential: 0.25,
  relevance: 0.2,
  competition: 0.15, // odwracane: niska konkurencja podnosi wynik
  difficulty: 0.15,  // odwracane: niski koszt podnosi wynik
} as const;

export function priorityScore(m: OpportunityMetrics): number {
  const score =
    m.businessValue * WEIGHTS.businessValue +
    m.trafficPotential * WEIGHTS.trafficPotential +
    m.relevance * WEIGHTS.relevance +
    (100 - m.competition) * WEIGHTS.competition +
    (100 - m.difficulty) * WEIGHTS.difficulty;
  return Math.round(score);
}

export type PriorityTier = "start" | "plan" | "wait";

/** Trzy poziomy zamiast rankingu 1–100: zacznij / zaplanuj / poczekaj. */
export function tier(score: number): PriorityTier {
  if (score >= 70) return "start";
  if (score >= 50) return "plan";
  return "wait";
}

export const TIER_LABEL: Record<PriorityTier, string> = {
  start: "Zacznij tutaj",
  plan: "Zaplanuj",
  wait: "Poczekaj",
};

export function ranked(opps: Opportunity[]): Opportunity[] {
  return [...opps].sort(
    (a, b) => priorityScore(b.metrics) - priorityScore(a.metrics)
  );
}
