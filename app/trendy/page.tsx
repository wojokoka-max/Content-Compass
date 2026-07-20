import { TRENDS } from "@/lib/data";
import type { TrendDirection } from "@/lib/types";

export const metadata = { title: "Trendy — Content Compass" };

const DIR_LABEL: Record<TrendDirection, string> = {
  rising: "▲ rośnie",
  declining: "▼ opada",
  evergreen: "● evergreen",
  seasonal: "◆ sezonowy",
};

export default function TrendsPage() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Market Trend Intelligence</p>
        <h1>Hype kontra trwała zmiana</h1>
        <p className="lede">
          Momentum mierzy tempo zmiany popytu, nie jego wielkość. Trend
          społecznościowy o momentum +78 to krótkie okno; strukturalny wzrost
          +62 to fundament pod cały klaster.
        </p>
      </header>
      <section className="panel">
        {TRENDS.map((t) => (
          <div key={t.id} className="trend-row">
            <div>
              <h3 style={{ fontSize: "1rem" }}>{t.topic}</h3>
              <p className="muted" style={{ color: "var(--text-soft)", fontSize: "0.88rem" }}>
                {t.note}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className={`trend-dir dir-${t.direction}`}>{DIR_LABEL[t.direction]}</span>
              <p style={{ fontFamily: "Inter Tight", fontWeight: 700 }}>
                {t.momentum > 0 ? `+${t.momentum}` : t.momentum}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
