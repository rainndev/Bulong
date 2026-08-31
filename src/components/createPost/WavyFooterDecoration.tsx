/**
 * Purely decorative wavy footer: black diagonal-striped fill clipped
 * below a hand-drawn wave, with a lime wavy line on top.
 * No content — design only.
 *
 * One seamless wave cycle (210x140) is rendered as a repeating
 * background image, so the wave keeps its natural proportions at
 * every viewport width — more cycles appear on wider screens
 * instead of stretching.
 */

const TILE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="210" height="140" viewBox="0 0 210 140" fill="none">
  <defs>
    <pattern id="s" width="24" height="24" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="24" height="24" fill="#1f1c14"/>
      <line x1="0" y1="0" x2="0" y2="24" stroke="#2e2a20" stroke-width="2"/>
    </pattern>
    <clipPath id="c">
      <path d="M 0,45 C 35,8 70,8 105,45 C 140,82 175,82 210,45 L 210,140 L 0,140 Z"/>
    </clipPath>
  </defs>
  <g clip-path="url(#c)">
    <rect width="210" height="140" fill="url(#s)"/>
  </g>
  <path d="M 0,45 C 35,8 70,8 105,45 C 140,82 175,82 210,45" stroke="#a3e635" stroke-width="7" fill="none" stroke-linecap="round"/>
</svg>`;

const TILE_DATA_URI = `data:image/svg+xml,${encodeURIComponent(TILE_SVG)}`;

const WavyFooterDecoration = ({
  className = "",
}: {
  className?: string;
}) => (
  <div
    aria-hidden="true"
    className={`block h-20 w-full sm:h-24 md:h-28 lg:h-32 ${className}`}
    style={{
      backgroundImage: `url("${TILE_DATA_URI}")`,
      backgroundRepeat: "repeat-x",
      backgroundSize: "auto 100%",
      backgroundPosition: "bottom",
    }}
  />
);

export default WavyFooterDecoration;
