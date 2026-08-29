"use client";

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";

type AreaChartProps = {
  data: {
    date: string;
    messagesCount: number;
  }[];
  isAnimationActive?: boolean;
  className?: string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: { value?: number | string }[];
  label?: string | number;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-lg bg-[#171717]/90 px-2.5 py-2 text-xs">
      <p className="font-semibold text-[#ecfccb]">{label}</p>
      <p className="text-[#c9c3b8]">{payload[0]?.value} messages</p>
    </div>
  );
};

const AreaChartMessages = ({
  data,
  isAnimationActive = true,
  className,
}: AreaChartProps) => {
  return (
    <AreaChart
      style={{
        width: "100%",
        height: "100%",
        outline: "none",
      }}
      className={className}
      responsive
      data={data}
      margin={{ top: 6, right: 6, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="messageFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#65a30d" stopOpacity={0.28} />
          <stop offset="100%" stopColor="#65a30d" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid horizontal vertical={false} stroke="#ececec" />

      <XAxis
        dataKey="date"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        interval="preserveStartEnd"
        tick={{ fontSize: 10, fill: "#a3a3a3" }}
      />

      <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#d4d4d4" }} />

      <Area
        type="monotone"
        dataKey="messagesCount"
        name="Messages"
        stroke="#65a30d"
        strokeWidth={2.3}
        fillOpacity={1}
        fill="url(#messageFill)"
        isAnimationActive={isAnimationActive}
      />
    </AreaChart>
  );
};

export default AreaChartMessages;
