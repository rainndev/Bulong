"use client";

import dynamic from "next/dynamic";

const Side3DIcons = dynamic(() => import("./Side3DIcons"), { ssr: false });

/**
 * Neubrutalist 3D emoji decorations flanking the hero.
 * The scale 0 -> 1 intro runs inside the 3D scene itself, so it plays
 * exactly when the canvas is actually live. Rendered only on lg+ screens.
 */
const Animated3DIcons = ({ side }: { side: "left" | "right" }) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 z-0 hidden h-full w-40 lg:block xl:w-56"
      style={{ [side]: 0 } as React.CSSProperties}
    >
      <Side3DIcons side={side} />
    </div>
  );
};

export default Animated3DIcons;
