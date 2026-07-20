import { CLUSTERS } from "@/lib/data";
import type { ClusterNode } from "@/lib/types";

export const metadata = { title: "Klastry — Content Compass" };

// Luka = popyt wyraźnie wyższy niż pokrycie. To tam rosną ekosystemy treści.
function Node({ node }: { node: ClusterNode }) {
  const gap = node.demand - node.coverage;
  return (
    <div className="cluster-node">
      <h3>
        {node.name}{" "}
        {gap >= 30 && <span className="gap-flag">← luka do zagospodarowania</span>}
      </h3>
      <p className="coverage-pair">
        <span>pokrycie: <b>{node.coverage}%</b></span>
        <span>popyt: <b>{node.demand}</b></span>
        <span>luka: <b>{gap > 0 ? `+${gap}` : gap}</b></span>
      </p>
      {node.children && (
        <div className="cluster-children">
          {node.children.map((c) => (
            <Node key={c.id} node={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ClustersPage() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Content Cluster Builder</p>
        <h1>Ekosystemy treści zamiast pojedynczych artykułów</h1>
        <p className="lede">
          Drzewo pokazuje, ile każdego klastra już pokrywasz w zestawieniu z
          popytem rynkowym. Największa różnica to Twoja mapa drogowa publikacji.
        </p>
      </header>
      <section className="panel">
        {CLUSTERS.map((c) => (
          <div key={c.id} className="cluster">
            <Node node={c} />
          </div>
        ))}
      </section>
    </>
  );
}
