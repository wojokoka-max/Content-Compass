import { NextResponse } from "next/server";
import { OPPORTUNITIES, TRENDS, CLUSTERS, SITE } from "@/lib/data";
import { priorityScore } from "@/lib/priority";

// POST /api/analyze — generuje werdykt strategiczny przez Claude API.
// Klucz trzymany wyłącznie po stronie serwera (env), nigdy w kliencie.

export async function POST() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brak ANTHROPIC_API_KEY — ustaw zmienną środowiskową (lokalnie w .env, na Vercelu w Project Settings)." },
      { status: 501 }
    );
  }

  const snapshot = {
    serwis: SITE,
    okazje: OPPORTUNITIES.map((o) => ({
      tytul: o.title,
      priorytet: priorityScore(o.metrics),
      metryki: o.metrics,
      uzasadnienie: o.rationale,
      timing: o.timing,
    })),
    trendy: TRENDS,
    klastry: CLUSTERS,
  };

  const prompt = `Jesteś doświadczonym strategiem contentowym. Na podstawie danych poniżej napisz werdykt strategiczny po polsku dla właściciela serwisu.

Zasady:
- Odpowiedz WYŁĄCZNIE czystym JSON-em, bez markdownu i bez komentarzy.
- Format: {"headline": string, "body": [string, string, string]}
- headline: jedno zdanie — najsilniejszy kierunek na najbliższe 3 miesiące.
- body: dokładnie 3 akapity: (1) gdzie inwestować i dlaczego, (2) co wstrzymać i dlaczego, (3) konkretny kalendarz działań.
- Ton: rzeczowy, decyzyjny, bez żargonu SEO. Zero list — pełne zdania.

Dane:
${JSON.stringify(snapshot)}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: `Anthropic API: ${res.status} ${detail.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text: string = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n");

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean) as { headline: string; body: string[] };

    return NextResponse.json({
      verdict: {
        headline: parsed.headline,
        body: parsed.body,
        source: "ai",
        generatedAt: new Date().toLocaleString("pl-PL"),
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Nieznany błąd analizy." },
      { status: 500 }
    );
  }
}
