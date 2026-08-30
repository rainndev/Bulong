import Sparkline from "./Sparkline";

type KpiCardProps = {
  label: string;
  value: string | number;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
  spark?: number[];
  sparkColor?: string;
  icon?: React.ReactNode;
};

const KpiCard = ({
  label,
  value,
  delta,
  deltaTone = "neutral",
  spark,
  sparkColor = "#65a30d",
  icon,
}: KpiCardProps) => {
  const deltaColor =
    deltaTone === "up"
      ? "text-[#4d7c0f]"
      : deltaTone === "down"
        ? "text-[#b45309]"
        : "text-[#737373]";

  return (
    <div className="min-w-0 -rotate-1 rounded-lg border-2 border-[#1f1c14] bg-white p-3 shadow-[4px_4px_0_#1f1c14] transition-transform duration-100 hover:rotate-0 md:p-3.5">
      <div className="flex items-center gap-1.5">
        {icon && (
          <span className="grid size-6 shrink-0 place-items-center rounded-lg border-2 border-[#1f1c14] bg-[#a3e635] text-[#1f1c14]">
            {icon}
          </span>
        )}
        <p className="text-[11px] text-[#737373]">{label}</p>
      </div>
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
