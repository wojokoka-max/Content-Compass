import VerdictPanel from "@/components/VerdictPanel";
import OpportunityCard from "@/components/OpportunityCard";
import { OPPORTUNITIES, STATIC_VERDICT, SITE } from "@/lib/data";
import { priorityScore, ranked } from "@/lib/priority";

// Strategy Dashboard: najpierw werdykt słowami, potem trzy najlepsze ruchy.
// Zgodnie z filozofią produktu — zero wykresów na wejściu.

export default function DashboardPage() {
  const top = ranked(OPPORTUNITIES).slice(0, 3);
  const topScore = priorityScore(top[0].metrics);

  return (
    <>
      <header className="page-head">
        <p className="eyebrow">{SITE.niche}</p>
        <h1>Gdzie zainwestować następne 10 godzin pracy?</h1>
        <p className="lede">
          Content Compass nie mierzy przeszłości — wskazuje kierunek. Poniżej
          werdykt strategiczny i trzy ruchy o najwyższym priorytecie.
        </p>
      </header>

      <VerdictPanel initial={STATIC_VERDICT} topScore={topScore} />

      <section aria-labelledby="top-h">
        <h2 id="top-h" style={{ marginTop: 48, fontSize: "1.3rem" }}>
          Zacznij tutaj
        </h2>
        <div className="grid cols-3">
          {top.map((o) => (
            <OpportunityCard key={o.id} opp={o} />
          ))}
        </div>
      </section>
    </>
  );
}
