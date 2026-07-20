import type { Opportunity } from "@/lib/types";
import { priorityScore, tier, TIER_LABEL } from "@/lib/priority";
import Compass from "./Compass";
import Meter from "./Meter";

export default function OpportunityCard({
  opp,
  detailed = false,
}: {
  opp: Opportunity;
  detailed?: boolean;
}) {
  const score = priorityScore(opp.metrics);
  const t = tier(score);
  return (
    <article className="card">
      <div className="card-top">
        <div>
          <span className={`tier tier-${t}`}>{TIER_LABEL[t]}</span>
          <h3 style={{ marginTop: 10 }}>{opp.title}</h3>
        </div>
        <Compass score={score} size={detailed ? 110 : 88} />
      </div>

      <dl className="qa">
        <dt>Co stworzyć</dt>
        <dd>{opp.action}</dd>
        <dt>Dlaczego to ma znaczenie</dt>
        <dd>{opp.rationale}</dd>
        <dt>Dlaczego teraz</dt>
        <dd>{opp.timing}</dd>
      </dl>

      {detailed && (
        <div className="meter">
          <Meter label="Wartość biznesowa" value={opp.metrics.businessValue} />
          <Meter label="Potencjał ruchu" value={opp.metrics.trafficPotential} />
          <Meter label="Spójność tematyczna" value={opp.metrics.relevance} />
          <Meter label="Konkurencja" value={opp.metrics.competition} inverse />
          <Meter label="Trudność wdrożenia" value={opp.metrics.difficulty} inverse />
        </div>
      )}
    </article>
  );
}
