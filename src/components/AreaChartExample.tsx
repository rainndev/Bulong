"use client";

import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

// #region Sample data
const data = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

// #endregion
const AreaChartExample = ({ isAnimationActive = true }) => (
  <AreaChart
    style={{
      width: "100%",
      maxWidth: "700px",
      maxHeight: "35vh",
      aspectRatio: 1.618,
    }}
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

    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="uv"
      stroke="#8884d8"
      fillOpacity={1}
      fill="url(#colorUv)"
      isAnimationActive={isAnimationActive}
    />
  </AreaChart>
);

export default AreaChartExample;
