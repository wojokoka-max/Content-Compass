import { COMPETITORS } from "@/lib/data";

export const metadata = { title: "Konkurencja — Content Compass" };

export default function CompetitorsPage() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Competitor Intelligence</p>
        <h1>Nie kopiuj konkurencji. Znajdź, co przeoczyła.</h1>
        <p className="lede">
          Dla każdego konkurenta interesują nas dwie rzeczy: gdzie jest silny
          (tam nie idziemy) i gdzie zostawił lukę (tam wchodzimy pierwsi).
        </p>
      </header>
      <div className="grid cols-2">
        {COMPETITORS.map((c) => (
          <article key={c.id} className="card">
            <div>
              <h3>{c.name}</h3>
              <p className="muted">{c.domain} · pokrycie tematyczne z Tobą: {c.overlap}%</p>
            </div>
            <dl className="qa">
              <dt>Silne strony (omijaj)</dt>
              <dd>{c.strengths.join(" · ")}</dd>
              <dt>Luki (wykorzystaj)</dt>
              {c.gaps.map((g) => (
                <dd key={g.topic}>
                  <strong style={{ color: "var(--text-main)" }}>{g.topic}</strong> — {g.note}{" "}
                  <span className="gap-flag">łatwość zajęcia: {g.exploitability}/100</span>
                </dd>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}
