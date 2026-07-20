// Pasek metryki. `inverse` = "mniej znaczy lepiej" (konkurencja, trudność).
export default function Meter({
  label,
  value,
  inverse = false,
}: {
  label: string;
  value: number;
  inverse?: boolean;
}) {
  return (
    <div className="meter-row">
      <span>{label}</span>
      <div className="meter-track">
        <div
          className={`meter-fill${inverse ? " inverse" : ""}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span>{value}</span>
    </div>
  );
}
