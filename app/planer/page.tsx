import { SEASONAL } from "@/lib/data";

export const metadata = { title: "Planer sezonowy — Content Compass" };

export default function PlannerPage() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Seasonal Planner</p>
        <h1>Publikuj przed szczytem, nie w jego trakcie</h1>
        <p className="lede">
          Planer nie mówi, kiedy temat jest popularny — mówi, kiedy trzeba go
          opublikować, żeby zdążył zbudować pozycję zanim popyt eksploduje.
        </p>
      </header>
      <section className="panel">
        {SEASONAL.map((s) => (
          <div key={s.id} className="trend-row">
            <div className="season" style={{ width: "100%" }}>
              <div>
                <h3 style={{ fontSize: "1rem" }}>{s.topic}</h3>
                <p style={{ color: "var(--text-soft)", fontSize: "0.88rem" }}>
                  {s.lead} Szczyt popytu: <b style={{ color: "var(--text-main)" }}>{s.peak}</b>.
                </p>
              </div>
              <span className="window">
                {s.publishFrom} → {s.publishTo}
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
