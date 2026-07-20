"use client";

import { useState } from "react";
import type { Verdict } from "@/lib/types";
import Compass from "./Compass";

// Dashboard otwiera się strategią napisaną słowami, nie wykresem.
// Werdykt statyczny działa od razu; przycisk odświeża go przez Claude API
// (wymaga ANTHROPIC_API_KEY po stronie serwera — patrz .env.example).

export default function VerdictPanel({
  initial,
  topScore,
}: {
  initial: Verdict;
  topScore: number;
}) {
  const [verdict, setVerdict] = useState<Verdict>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Nie udało się wygenerować werdyktu.");
      setVerdict(data.verdict as Verdict);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Błąd połączenia.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel verdict" aria-labelledby="verdict-h">
      <p className="eyebrow">Werdykt</p>
      <div className="verdict-head">
        <h2 id="verdict-h">{verdict.headline}</h2>
        <Compass score={topScore} label="kierunek" />
      </div>
      <div className="verdict-body">
        {verdict.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="verdict-meta">
        <button className="btn" onClick={refresh} disabled={loading}>
          {loading ? "Analizuję rynek…" : "Odśwież werdykt (AI)"}
        </button>
        <span className="hint">
          {verdict.source === "ai"
            ? `Wygenerowano przez Claude · ${verdict.generatedAt ?? ""}`
            : "Werdykt bazowy — wersja AI wymaga klucza ANTHROPIC_API_KEY."}
        </span>
        {error && <span className="hint" style={{ color: "#ff9d9d" }}>{error}</span>}
      </div>
    </section>
  );
}
