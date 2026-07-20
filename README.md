# Content Compass

AI-owy silnik decyzji contentowych. Nie pisze treści — wskazuje, **co tworzyć następne**.

Next.js 16 (App Router) · TypeScript · zero zewnętrznych zależności UI (czysty CSS, design tokens).

## Uruchomienie w VS Code

```bash
npm install
npm run dev
```

Aplikacja: http://localhost:3000

Działa od razu, bez żadnych kluczy — dashboard otwiera się werdyktem statycznym.

## Werdykt AI (opcjonalnie)

Przycisk „Odśwież werdykt (AI)" na dashboardzie generuje werdykt przez Claude API.

1. Skopiuj `.env.example` do `.env`
2. Wpisz `ANTHROPIC_API_KEY=sk-ant-...`
3. Restart `npm run dev`

Klucz żyje wyłącznie po stronie serwera (`app/api/analyze/route.ts`) — nigdy nie trafia do przeglądarki.

## Deploy na Vercel

```bash
npx vercel
```

albo: repo na GitHub → Vercel → **Import Project** (Next.js wykrywany automatycznie, zero konfiguracji).

Klucz API: **Project Settings → Environment Variables → `ANTHROPIC_API_KEY`** → Redeploy.

## Architektura

```
app/
  page.tsx              Strategy Dashboard — werdykt słowami + top 3 ruchy
  okazje/               Opportunity Finder (pełne metryki + kompas)
  klastry/              Content Cluster Builder (pokrycie vs popyt, flagi luk)
  trendy/               Market Trend Intelligence (momentum, hype vs zmiana)
  konkurencja/          Competitor Intelligence (silne strony vs luki)
  planer/               Seasonal Planner (okna publikacji przed szczytem)
  api/analyze/route.ts  Endpoint werdyktu AI (Claude API, klucz z env)
components/
  Compass.tsx           Element sygnaturowy: wskazówka koduje priorytet 0–100
  OpportunityCard.tsx   Karta „co / dlaczego / dlaczego teraz"
  VerdictPanel.tsx      Werdykt + przycisk odświeżenia AI
  Meter.tsx, Nav.tsx
lib/
  types.ts              Model danych całej platformy
  priority.ts           Content Priority Engine — jawne wagi, jeden wynik
  data.ts               Dane demo — TU podłączasz realne źródła
```

## Podłączanie realnych danych

Cała warstwa danych to `lib/data.ts`. Struktury (`lib/types.ts`) są stabilne —
integracja z Google Search Console, Analytics czy analizą konkurencji polega
na napisaniu adaptera, który zwraca te same typy. Reszta aplikacji nie wymaga
zmian.

Wagi priorytetu (`lib/priority.ts`) są jawne i edytowalne — to tam mieszka
strategia platformy:

| metryka             | waga | kierunek        |
|---------------------|------|-----------------|
| wartość biznesowa   | 0.25 | więcej = lepiej |
| potencjał ruchu     | 0.25 | więcej = lepiej |
| spójność tematyczna | 0.20 | więcej = lepiej |
| konkurencja         | 0.15 | mniej = lepiej  |
| trudność wdrożenia  | 0.15 | mniej = lepiej  |

Progi poziomów: ≥70 → „Zacznij tutaj", ≥50 → „Zaplanuj", niżej → „Poczekaj".

## Design system

LOWSTYLELIFE GLOBAL DESIGN SYSTEM: tło `#050711` z gradientami, panele glass
`rgba(15,22,45,0.72)`, akcenty `#8fd8ff` / `#b58cff` / `#ffd38a`, Inter +
Inter Tight, radius 18px, ziarno filmowe. Tokeny w `app/globals.css` (`:root`).
