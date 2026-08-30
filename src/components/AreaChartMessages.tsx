"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";

type BarChartProps = {
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

type BarShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
};

const PillBar = ({ x, y, width, height, fill }: BarShapeProps) => {
  if (!height || height <= 0 || !width) return null;

  const radius = Math.min(width / 2, height / 2);

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius}
      ry={radius}
      fill={fill ?? "#65a30d"}
    />
  );
};

const AreaChartMessages = ({
  data,
  isAnimationActive = true,
  className,
}: BarChartProps) => {
  return (
    <BarChart
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
      <CartesianGrid horizontal vertical={false} stroke="#ececec" />

      <XAxis
        dataKey="date"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        interval="preserveStartEnd"
        tick={{ fontSize: 10, fill: "#a3a3a3" }}
      />

      <Tooltip
        content={<CustomTooltip />}
        cursor={{ fill: "rgba(163, 230, 53, 0.15)" }}
      />

      <Bar
        dataKey="messagesCount"
        name="Messages"
        fill="#65a30d"
        shape={<PillBar />}
        maxBarSize={48}
        isAnimationActive={isAnimationActive}
      />
    </BarChart>
  );
};

export default AreaChartMessages;
