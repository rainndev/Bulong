/**
 * Purely decorative wavy footer: black diagonal-striped fill clipped
 * below a hand-drawn wave, with a lime wavy line on top.
 * No content — design only.
 *
 * The wave path is longer (1600 units) so the horizontal stretch
 * keeps visible undulations at every viewport width, and heights
 * step up responsively.
 */
const WavyFooterDecoration = ({ className = "" }: { className?: string }) => {
  const wavePath =
    "M 0,45 C 35,8 70,8 105,45 C 140,82 175,82 210,45 C 245,8 280,8 315,45 C 350,82 385,82 420,45 C 455,8 490,8 525,45 C 560,82 595,82 630,45 C 665,8 700,8 735,45 C 770,82 805,82 840,45 C 875,8 910,8 945,45 C 980,82 1015,82 1050,45 C 1085,8 1120,8 1155,45 C 1190,82 1225,82 1260,45 C 1295,8 1330,8 1365,45 C 1400,82 1435,82 1470,45 C 1505,8 1540,8 1575,45 L 1600,45";

  return (
    <svg
      viewBox="0 0 1600 140"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-20 w-full sm:h-24 md:h-28 lg:h-32 ${className}`}
    >
      <defs>
        {/* Diagonal stripe pattern for the fill */}
        <pattern
          id="diagonalStripes"
          width="24"
          height="24"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="24" height="24" fill="#1f1c14" />
          <line x1="0" y1="0" x2="0" y2="24" stroke="#2e2a20" strokeWidth="2" />
        </pattern>

        {/* Clip path defined by the wavy edge */}
        <clipPath id="waveClip">
          <path d={`${wavePath} L 1600,140 L 0,140 Z`} />
        </clipPath>
      </defs>

      {/* Black striped fill, clipped to only show below the wave */}
      <g clipPath="url(#waveClip)">
        <rect
          x="0"
          y="0"
          width="1600"
          height="140"
          fill="url(#diagonalStripes)"
        />
      </g>

      {/* The lime wavy line itself, drawn on top */}
      <path
        d={wavePath}
        stroke="#a3e635"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WavyFooterDecoration;
