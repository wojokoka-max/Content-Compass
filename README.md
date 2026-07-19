# 🧭 Content Compass

**AI-owy silnik decyzji contentowych.** Nie pisze treści — wskazuje, co tworzyć następne.

Narzędzia AI rozwiązały problem pisania. Nie rozwiązały problemu **decydowania**: który temat ma potencjał wzrostu, który klaster rozwijać, gdzie konkurencja zostawiła lukę i kiedy publikować, żeby zdążyć przed szczytem popytu. Content Compass odpowiada na te pytania, zanim powstanie pierwsze zdanie.

> Przestań zgadywać. Twórz to, czego rynek naprawdę potrzebuje.

![Next.js 14](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6) ![Vercel Ready](https://img.shields.io/badge/Vercel-ready-white) ![Claude API](https://img.shields.io/badge/AI-Claude%20API-b58cff)

---

## Co robi

| Moduł | Odpowiada na pytanie |
|---|---|
| **Werdykt strategiczny** | Gdzie zainwestować następne 10 godzin pracy? Dashboard otwiera się strategią napisaną słowami — nie wykresem. |
| **Okazje** (Opportunity Finder) | Które tematy łączą wysoki popyt z niską konkurencją? Jeden wynik priorytetu zamiast dziesięciu metryk. |
| **Klastry** (Cluster Builder) | Które ekosystemy treści rozwijać? Pokrycie vs popyt, z automatycznymi flagami luk. |
| **Trendy** (Trend Intelligence) | Co jest chwilowym hype'em, a co trwałą zmianą rynku? Momentum mierzy tempo, nie wielkość. |
| **Konkurencja** (Competitor Intelligence) | Gdzie konkurenci są silni (omijaj) i co przeoczyli (wchodź pierwszy)? |
| **Planer sezonowy** | Kiedy publikować, żeby zbudować pozycję **przed** szczytem popytu — nie w jego trakcie? |

Każda rekomendacja odpowiada na trzy pytania: **co stworzyć · dlaczego to ma znaczenie · dlaczego teraz.**

## Czym nie jest

Content Compass nie generuje artykułów, newsletterów ani skryptów wideo. Od tego są narzędzia typu ChatGPT czy Claude. One produkują treść — **Compass produkuje kierunek.**

---

## Szybki start

```bash
npm install
npm run dev
```

→ http://localhost:3000 — działa od razu, bez kluczy i konfiguracji (werdykt bazowy jest statyczny).

### Werdykt AI (opcjonalnie)

Przycisk „Odśwież werdykt (AI)" generuje strategię przez Claude API:

```bash
cp .env.example .env
# wpisz: ANTHROPIC_API_KEY=sk-ant-...
npm run dev
```

Klucz żyje wyłącznie po stronie serwera (`app/api/analyze/route.ts`) — nigdy nie trafia do przeglądarki.

### Deploy na Vercel

```bash
npx vercel
```

albo GitHub → Vercel → **Import Project** (Next.js wykrywany automatycznie). Klucz API dodajesz w **Project Settings → Environment Variables → `ANTHROPIC_API_KEY`**, potem redeploy.

---

## Architektura

```
app/
  page.tsx              Strategy Dashboard — werdykt + top 3 ruchy
  okazje/               Opportunity Finder (metryki + kompas priorytetu)
  klastry/              Content Cluster Builder
  trendy/               Market Trend Intelligence
  konkurencja/          Competitor Intelligence
  planer/               Seasonal Planner
  api/analyze/route.ts  Endpoint werdyktu AI (Claude, klucz z env)
components/
  Compass.tsx           Wskazówka kompasu koduje priorytet 0–100
  OpportunityCard.tsx   Karta „co / dlaczego / dlaczego teraz"
  VerdictPanel.tsx      Werdykt + odświeżanie AI
lib/
  types.ts              Stabilny model danych platformy
  priority.ts           Content Priority Engine — jawne, edytowalne wagi
  data.ts               Warstwa danych — tu podłączasz realne źródła
```

**Zero zależności UI** — czysty CSS z tokenami w `:root` (`app/globals.css`). Jedyne zależności runtime to Next + React.

### Priority Engine

Jeden wynik zamiast dashboardu z dziesięcioma wykresami. Wagi są jawne i mieszkają w `lib/priority.ts`:

| Metryka | Waga | Kierunek |
|---|---|---|
| Wartość biznesowa | 0.25 | więcej = lepiej |
| Potencjał ruchu | 0.25 | więcej = lepiej |
| Spójność tematyczna | 0.20 | więcej = lepiej |
| Konkurencja | 0.15 | mniej = lepiej |
| Trudność wdrożenia | 0.15 | mniej = lepiej |

Progi: **≥70** → „Zacznij tutaj" · **≥50** → „Zaplanuj" · niżej → „Poczekaj".

### Podłączanie realnych danych

Cała warstwa danych to `lib/data.ts` (obecnie dane demonstracyjne). Struktury w `lib/types.ts` są stabilne — integracja z Google Search Console, Analytics czy crawlerem konkurencji to napisanie adaptera zwracającego te same typy. UI nie wymaga wtedy żadnych zmian.

---

## Roadmapa

- [ ] Adapter Google Search Console (realne frazy i pozycje)
- [ ] Adapter Google Analytics (realna skuteczność treści)
- [ ] Crawler serwisu — automatyczna mapa pokrycia klastrów
- [ ] Analiza konkurencji na żywo
- [ ] Eksport roadmapy publikacji (CSV / kalendarz)
- [ ] Profile wielu serwisów

## Licencja

Projekt prywatny. Wszelkie prawa zastrzeżone.
