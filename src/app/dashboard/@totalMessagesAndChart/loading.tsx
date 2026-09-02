const Loading = () => {
  // Ghost bars mirror the recharts layout: 7 day-bands, pill bars,
  // #ececec gridlines, axis ticks below — same h-56/md:h-64 container.
  const bars = [
    { x: 18, h: 45 },
    { x: 89, h: 95 },
    { x: 160, h: 60 },
    { x: 231, h: 120 },
    { x: 302, h: 80 },
    { x: 373, h: 140 },
    { x: 444, h: 100 },
  ];

  return (
    <section className="flex flex-col rounded-xl border-2 border-[#1f1c14] bg-white p-3.5 shadow-[6px_6px_0_#1f1c14]">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-[13px] font-bold">Messages received</h2>
        <span className="text-[11px] font-bold text-[#1f1c14]/50">
          Daily · last 7 days
        </span>
      </div>

      <div className="h-56 w-full md:h-64">
        <svg
          viewBox="0 0 500 200"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          {/* horizontal gridlines — same color as recharts #ececec */}
          {[15, 30, 45, 60, 75].map((y) => (
            <line
              key={y}
              x1="0"
              y1={`${y}%`}
              x2="500"
              y2={`${y}%`}
              stroke="#ececec"
              strokeWidth="1"
            />
          ))}

          {/* ghost pill bars — same band positions and rounded tops */}
          <g className="animate-pulse">
            {bars.map((bar, i) => (
              <rect
                key={i}
                x={bar.x}
                y={170 - bar.h}
                width="34"
                height={bar.h}
                rx="17"
                fill={i === bars.length - 1 ? "#dcf3b0" : "#ece9de"}
              />
            ))}
          </g>

          {/* axis ticks */}
          <g className="animate-pulse">
            {bars.map((bar, i) => (
              <rect
                key={`tick-${i}`}
                x={bar.x + 7}
                y={182}
                width="20"
                height="6"
                rx="3"
                fill="#e5e5e5"
              />
            ))}
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Loading;
