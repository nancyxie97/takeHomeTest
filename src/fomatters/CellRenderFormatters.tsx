
function formatNumber(n: number, digits = 2) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}



export function DirectionCell({ value }: { value: "BUY" | "SELL" }) {
  const color = value === "BUY" ? "text-success" : "text-danger";

  return (
    <span className={`font-medium ${color}`}>
      {value === "BUY" ? "↑ Buy" : "↓ Sell"}
    </span>
  );
}

export function PnLCell({ value }: { value: number }) {
  if (!value) return <></>
  let color = "text-slate-400";
  if (value > 0) color = "text-success";
  if (value < 0) color = "text-danger";

  return (
    <span className={`font-mono tabular-nums ${color}`}>
      {value > 0 ? "+$" : "-$"}
      {formatNumber(Math.abs(value))}
    </span>
  );
}

export function StatusCell({
  value,
}: {
  value: "FILLED" | "COMPLETED" | "PENDING" | "CANCELLED";
}) {
  let style =
    "bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-200";

  if (value === "FILLED" || value === "COMPLETED") {
    style =
      "bg-success-foreground text-success";
  } else if (value === "PENDING") {
    style =
      "bg-warning-foreground text-warning";
  } else if (value === "CANCELLED") {
    style = "bg-danger-foreground text-danger";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ring-black/5 dark:ring-white/10 ${style}`}
    >
      {value}
    </span>
  );
}


export function VolatilityCell({ value }: { value: number }) {
  const color = value > 0.2 ? "text-danger" : "";
  return <div className={color}>{(value * 100).toFixed(2)}%</div>;
}

export function BetaCell({ value }: { value: number }) {
  const color = value >= 1.3 ? "text-danger" : "";
  return <div className={color}>{value}</div>;
}
export function CorrelationCell({ value }: { value: number }) {
  const color = value >= .8 ? "text-danger" : "";
  return <div className={color}>{value}</div>;
}

export function CreditRatingCellRenderer({ value }: { value: string }) {
  const rating = String(value || "").toUpperCase();

  let color = "bg-slate-500/40 text-slate-300";

  if (rating.startsWith("AA") || rating.startsWith("A")) {
    color = "bg-success-foreground text-success";
  } else if (rating.startsWith("BBB")) {
    color = "bg-warning-foreground text-warning";
  } else if (rating.startsWith("BB")) {
    color = "bg-danger-foreground text-danger";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
    >
      {rating || "—"}
    </span>
  );
}