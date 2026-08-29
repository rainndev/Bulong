import Sparkline from "./Sparkline";

type KpiCardProps = {
  label: string;
  value: string | number;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
  spark?: number[];
  sparkColor?: string;
};

const KpiCard = ({
  label,
  value,
  delta,
  deltaTone = "neutral",
  spark,
  sparkColor = "#65a30d",
}: KpiCardProps) => {
  const deltaColor =
    deltaTone === "up"
      ? "text-[#4d7c0f]"
      : deltaTone === "down"
        ? "text-[#b45309]"
        : "text-[#737373]";

  return (
    <div className="min-w-0 rounded-xl border border-[#e5e5e5] bg-white p-3 md:p-3.5">
      <p className="text-[11px] text-[#737373]">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="my-0.5 text-2xl font-extrabold tracking-[-0.05em]">
            {value}
          </p>
          {delta && (
            <p className={`text-[11px] font-semibold ${deltaColor}`}>
              {delta}
            </p>
          )}
        </div>
        {spark && (
          <span className="hidden shrink-0 sm:block">
            <Sparkline data={spark} color={sparkColor} />
          </span>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
