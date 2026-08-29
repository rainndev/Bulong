type SparklineProps = {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
};

const Sparkline = ({
  data,
  color = "#65a30d",
  width = 92,
  height = 34,
}: SparklineProps) => {
  const series = data.filter((value) => Number.isFinite(value));

  if (series.length < 2) return null;

  const max = Math.max(...series);
  const min = Math.min(...series);
  const span = max - min || 1;
  const d = series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * width;
      const y = height - 3 - ((value - min) / span) * (height - 6);
      return `${index ? "L" : "M"} ${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Sparkline;
