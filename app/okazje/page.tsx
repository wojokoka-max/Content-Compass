import OpportunityCard from "@/components/OpportunityCard";
import { OPPORTUNITIES } from "@/lib/data";
import { ranked } from "@/lib/priority";

export const metadata = { title: "Okazje — Content Compass" };

export default function OpportunitiesPage() {
  const opps = ranked(OPPORTUNITIES);
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Opportunity Finder</p>
        <h1>Okazje uszeregowane jednym wynikiem</h1>
        <p className="lede">
          Każda rekomendacja odpowiada na trzy pytania: co stworzyć, dlaczego to
          ma znaczenie i dlaczego teraz. Wskazówka kompasu to złożony priorytet —
          wagi znajdziesz w <code>lib/priority.ts</code>.
        </p>
      </header>
      <div className="grid cols-2">
        {opps.map((o) => (
          <OpportunityCard key={o.id} opp={o} detailed />
        ))}
      </div>
    </>
  );
}
