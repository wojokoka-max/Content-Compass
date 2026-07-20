import type {
  ClusterNode,
  Competitor,
  Opportunity,
  SeasonalWindow,
  Trend,
  Verdict,
} from "./types";

// ── Warstwa danych ──────────────────────────────────────────────
// To są dane demonstracyjne. Docelowo ten moduł zastępują adaptery:
// Google Search Console, Google Analytics, analiza serwisu, trendy.
// Struktury (types.ts) pozostają bez zmian — wymienia się tylko źródło.

export const SITE = {
  name: "Twój serwis (demo)",
  niche: "Kuchnia low carb i cukiernictwo bez cukru",
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "op-01",
    title: "Desery czekoladowe bez cukru — seria przepisów",
    clusterId: "cl-desery",
    metrics: { businessValue: 88, trafficPotential: 82, relevance: 95, competition: 42, difficulty: 35 },
    rationale:
      "Popyt na czekoladowe desery bez cukru rośnie od trzech kwartałów, a konkurencja pokrywa głównie proste fit-przepisy bez warsztatu cukierniczego.",
    timing:
      "Wzrost zapytań przyspiesza przed jesienią; publikacja teraz zdąży się zaindeksować przed szczytem.",
    action:
      "Seria 5–7 przepisów: od bazy (ganache, mus) po odtworzenia klasyków, spięte jednym artykułem-hubem.",
  },
  {
    id: "op-02",
    title: "Odtworzenia batonów typu Kinder w wersji keto",
    clusterId: "cl-desery",
    metrics: { businessValue: 76, trafficPotential: 90, relevance: 80, competition: 55, difficulty: 45 },
    rationale:
      "Frazy 'przepis na X bez cukru' dla znanych słodyczy mają wysoki wolumen i silny potencjał udostępnień.",
    timing:
      "Trend społecznościowy jest świeży — okno zanim duże portale kulinarne zajmą temat.",
    action:
      "3 przepisy-odtworzenia z sekcją porównawczą składu (oryginał vs wersja bez cukru).",
  },
  {
    id: "op-03",
    title: "Desery proteinowe — pomost do czytelników fitness",
    clusterId: "cl-desery",
    metrics: { businessValue: 70, trafficPotential: 74, relevance: 72, competition: 60, difficulty: 40 },
    rationale:
      "Klaster łączy obecną publiczność z segmentem fitness, którego serwis jeszcze nie adresuje.",
    timing: "Popyt stabilny cały rok — dobry temat 'drugiego rzutu' po deserach czekoladowych.",
    action: "4 przepisy + poradnik o białku w wypiekach (tekstura, słodziki, temperatury).",
  },
  {
    id: "op-04",
    title: "Kolejny artykuł o chlebie keto",
    clusterId: "cl-pieczywo",
    metrics: { businessValue: 45, trafficPotential: 38, relevance: 85, competition: 88, difficulty: 30 },
    rationale:
      "Temat nasycony: pozycje zajęte przez duże serwisy, a Twoje istniejące treści już pokrywają intencję.",
    timing: "Brak okna — popyt płaski, konkurencja maksymalna.",
    action: "Zamiast nowego artykułu: odświeżenie istniejącego huba i wewnętrzne linkowanie.",
  },
  {
    id: "op-05",
    title: "Desery świąteczne bez cukru (Boże Narodzenie)",
    clusterId: "cl-sezon",
    metrics: { businessValue: 82, trafficPotential: 86, relevance: 90, competition: 50, difficulty: 50 },
    rationale:
      "Sezonowy szczyt o wysokiej wartości — czytelnik świąteczny konwertuje na stałego subskrybenta.",
    timing:
      "Okno publikacji: wrzesień–październik. Publikacja w grudniu nie zdąży zbudować pozycji.",
    action: "Hub 'Święta bez cukru' + 6 przepisów: piernik, makowiec, serniki, trufle.",
  },
  {
    id: "op-06",
    title: "Przewodnik po słodzikach w wypiekach — wersja ekspercka",
    clusterId: "cl-wiedza",
    metrics: { businessValue: 74, trafficPotential: 60, relevance: 92, competition: 45, difficulty: 55 },
    rationale:
      "Treść-fundament: wspiera każdy przepis linkiem wewnętrznym i buduje autorytet tematyczny całej domeny.",
    timing: "Evergreen — im wcześniej istnieje, tym dłużej pracuje.",
    action:
      "Jeden duży przewodnik (erytrytol, ksylitol, stewia, alluloza) z tabelami przeliczeń i zachowaniem w cieple.",
  },
];

export const TRENDS: Trend[] = [
  { id: "tr-1", topic: "Desery bez cukru", direction: "rising", momentum: 62, note: "Trzeci kwartał wzrostu z rzędu; to zmiana strukturalna, nie moda." },
  { id: "tr-2", topic: "Odtworzenia znanych słodyczy (keto)", direction: "rising", momentum: 78, note: "Silny impuls z social mediów — okno krótsze niż w trendach wyszukiwania." },
  { id: "tr-3", topic: "Chleb keto", direction: "declining", momentum: -24, note: "Popyt stabilnie opada od roku; rynek nasycony treścią." },
  { id: "tr-4", topic: "Słodziki — porównania", direction: "evergreen", momentum: 5, note: "Stały popyt informacyjny; treść fundamentowa." },
  { id: "tr-5", topic: "Wypieki świąteczne bez cukru", direction: "seasonal", momentum: 0, note: "Szczyt w grudniu, budowa pozycji musi zacząć się jesienią." },
];

export const CLUSTERS: ClusterNode[] = [
  {
    id: "cl-desery",
    name: "Desery bez cukru",
    coverage: 35,
    demand: 85,
    children: [
      { id: "cl-desery-czek", name: "Desery czekoladowe", coverage: 20, demand: 88 },
      { id: "cl-desery-kinder", name: "Odtworzenia znanych słodyczy", coverage: 5, demand: 90 },
      { id: "cl-desery-prot", name: "Desery proteinowe", coverage: 10, demand: 72 },
      { id: "cl-sezon", name: "Desery świąteczne", coverage: 15, demand: 86 },
    ],
  },
  {
    id: "cl-pieczywo",
    name: "Pieczywo low carb",
    coverage: 90,
    demand: 55,
    children: [
      { id: "cl-pieczywo-chleb", name: "Chleby keto", coverage: 95, demand: 50 },
      { id: "cl-pieczywo-bulki", name: "Bułki i podpłomyki", coverage: 80, demand: 45 },
    ],
  },
  {
    id: "cl-wiedza",
    name: "Wiedza i fundamenty",
    coverage: 60,
    demand: 65,
    children: [
      { id: "cl-wiedza-slodziki", name: "Słodziki w wypiekach", coverage: 40, demand: 70 },
      { id: "cl-wiedza-ig", name: "Indeks glikemiczny", coverage: 85, demand: 60 },
    ],
  },
];

export const COMPETITORS: Competitor[] = [
  {
    id: "co-1",
    name: "Duży portal fit",
    domain: "przyklad-fit.pl",
    overlap: 65,
    strengths: ["Ogromny wolumen przepisów", "Silny profil linków"],
    gaps: [
      { topic: "Technika cukiernicza bez cukru", note: "Przepisy proste, bez warsztatu — brak treści dla ambitnego czytelnika.", exploitability: 80 },
      { topic: "Przeliczniki słodzików", note: "Tylko ogólniki, zero tabel i praktyki.", exploitability: 75 },
    ],
  },
  {
    id: "co-2",
    name: "Blog keto-lifestyle",
    domain: "przyklad-keto.pl",
    overlap: 78,
    strengths: ["Lojalna społeczność", "Dobre treści o pieczywie"],
    gaps: [
      { topic: "Desery świąteczne", note: "Publikują w grudniu — za późno na pozycje. Okno jesienne jest wolne.", exploitability: 85 },
      { topic: "Odtworzenia słodyczy", note: "Pojedyncze próby bez serii i bez huba.", exploitability: 70 },
    ],
  },
];

export const SEASONAL: SeasonalWindow[] = [
  { id: "se-1", topic: "Desery świąteczne bez cukru", publishFrom: "wrzesień", publishTo: "październik", peak: "grudzień", lead: "Google potrzebuje 8–12 tygodni na zbudowanie pozycji przed szczytem popytu." },
  { id: "se-2", topic: "Lekkie desery letnie", publishFrom: "marzec", publishTo: "kwiecień", peak: "czerwiec–lipiec", lead: "Sezon grillowo-urlopowy; frazy 'bez pieczenia' ruszają w maju." },
  { id: "se-3", topic: "Postanowienia / detoks cukrowy", publishFrom: "listopad", publishTo: "grudzień", peak: "styczeń", lead: "Największy roczny skok zainteresowania dietą — treść musi czekać gotowa." },
];

/** Werdykt statyczny — działa bez klucza API; wersja AI go nadpisuje. */
export const STATIC_VERDICT: Verdict = {
  headline:
    "Najsilniejszy kierunek na najbliższe 3 miesiące: ekosystem deserów bez cukru.",
  body: [
    "Popyt na desery bez cukru rośnie trzeci kwartał z rzędu, a konkurencja pokrywa go płytko — bez warsztatu cukierniczego i bez serii. To Twoja największa przewaga tematyczna.",
    "Wstrzymaj publikację kolejnych przepisów na pieczywo. Klaster jest pokryty w 90%, popyt opada, a każda godzina zainwestowana tam ma niższy zwrot niż w deserach.",
    "Kalendarz: desery czekoladowe teraz, hub świąteczny między wrześniem a październikiem. Grudniowa publikacja świątecznych treści nie zdąży zbudować pozycji.",
  ],
  source: "static",
};
