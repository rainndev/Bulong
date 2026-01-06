"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

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
  payload?: any[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-[#949494]/20 bg-[#242731]/90 p-3 md:rounded-2xl md:p-5">
      <p className="mb-1 text-xs font-semibold text-white/70 md:text-sm">
        {label}
      </p>

      <p className="md:text-md text-sm text-white">
        Messages Received: {payload[0].value}
      </p>
    </div>
  );
};

// #endregion
const AreaChartMessages = ({
  data,
  isAnimationActive = true,
  className,
}: AreaChartProps) => {
  const [fontSize, setFontSize] = useState(12);

  useEffect(() => {
    const updateFontSize = () => {
      setFontSize(window.innerWidth < 640 ? 10 : 12);
    };

    updateFontSize(); // run once
    window.addEventListener("resize", updateFontSize);

    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <AreaChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "35vh",
        aspectRatio: 1.618,
        outline: "none",
      }}
      className={className}
      responsive
      data={data}
      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>

      <XAxis
        tickMargin={10}
        className="text-2xl"
        tick={{ fontSize, fill: "#242731" }}
        dataKey="date"
      />
      <YAxis
        tickMargin={10}
        tick={{ fontSize, fill: "#242731" }}
        width="auto"
      />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="messagesCount"
        name="Messages"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
        isAnimationActive={isAnimationActive}
      />
    </AreaChart>
  );
};

export default AreaChartMessages;
