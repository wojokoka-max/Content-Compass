// ── Content Compass · model danych ──────────────────────────────

/** Metryki 0–100. Wyższe = lepiej, poza competition i difficulty. */
export interface OpportunityMetrics {
  businessValue: number;     // wartość biznesowa
  trafficPotential: number;  // potencjał ruchu
  relevance: number;         // spójność tematyczna z serwisem
  competition: number;       // nasycenie konkurencją (wyższe = gorzej)
  difficulty: number;        // koszt wdrożenia (wyższe = gorzej)
}

export interface Opportunity {
  id: string;
  title: string;
  clusterId: string;
  metrics: OpportunityMetrics;
  rationale: string;         // "dlaczego to ma znaczenie"
  timing: string;            // "dlaczego teraz"
  action: string;            // "co stworzyć"
}

export type TrendDirection = "rising" | "declining" | "evergreen" | "seasonal";

export interface Trend {
  id: string;
  topic: string;
  direction: TrendDirection;
  momentum: number;          // -100..100 (tempo zmiany popytu)
  note: string;
}

export interface ClusterNode {
  id: string;
  name: string;
  coverage: number;          // 0–100: ile z klastra już pokrywasz
  demand: number;            // 0–100: popyt rynkowy
  children?: ClusterNode[];
}

export interface CompetitorGap {
  topic: string;
  note: string;
  exploitability: number;    // 0–100: jak łatwo zająć tę lukę
}

export interface Competitor {
  id: string;
  name: string;
  domain: string;
  overlap: number;           // 0–100: pokrycie tematyczne z Twoim serwisem
  strengths: string[];
  gaps: CompetitorGap[];
}

export interface SeasonalWindow {
  id: string;
  topic: string;
  publishFrom: string;       // np. "wrzesień"
  publishTo: string;
  peak: string;              // szczyt popytu
  lead: string;              // uzasadnienie wyprzedzenia
}

export interface Verdict {
  headline: string;
  body: string[];            // akapity werdyktu
  source: "static" | "ai";
  generatedAt?: string;
}
