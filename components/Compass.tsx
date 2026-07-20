// Element sygnaturowy platformy: wskazówka kompasu koduje priorytet.
// 0 pkt = zachód (–90°), 100 pkt = wschód (+90°); północ to środek skali.
// Kierunek jest informacją, nie dekoracją: "dokąd wskazuje rynek".

export default function Compass({
  score,
  size = 120,
  label = "priorytet",
}: {
  score: number;
  size?: number;
  label?: string;
}) {
  const angle = (score / 100) * 180 - 90;
  return (
    <div className="compass" role="img" aria-label={`${label}: ${score} na 100`}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="rgba(15,22,45,0.6)" stroke="rgba(180,205,255,0.24)" strokeWidth="1" />
        {/* róża kierunków */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const long = i % 6 === 0;
          const r1 = long ? 38 : 41;
          return (
            <line
              key={i}
              x1={50 + r1 * Math.sin(a)}
              y1={50 - r1 * Math.cos(a)}
              x2={50 + 44 * Math.sin(a)}
              y2={50 - 44 * Math.cos(a)}
              stroke={long ? "rgba(245,247,255,0.5)" : "rgba(170,180,214,0.25)"}
              strokeWidth="1"
            />
          );
        })}
        {/* wskazówka */}
        <g className="needle" style={{ transform: `rotate(${angle}deg)` }}>
          <path d="M50 12 L54 50 L50 58 L46 50 Z" fill="#ffd38a" />
          <path d="M50 58 L52.5 50 L50 46 L47.5 50 Z" fill="rgba(170,180,214,0.6)" />
        </g>
        <circle cx="50" cy="50" r="3.2" fill="#f5f7ff" />
        <text x="50" y="78" textAnchor="middle" className="score-text" fontSize="15">
          {score}
        </text>
        <text x="50" y="88" textAnchor="middle" className="score-label">
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
