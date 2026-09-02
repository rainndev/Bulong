"use client";

import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const INK = "#1f1c14";
const LIME = "#a3e635";

/** Country name -> approximate capital/centroid [lon, lat]. */
const COUNTRY_COORDS: Record<string, [number, number]> = {
  Philippines: [121.8, 12.9],
  "United States": [-98.5, 39.8],
  Canada: [-106.3, 56.1],
  "United Kingdom": [-2.5, 54.0],
  Ireland: [-8.0, 53.2],
  Australia: [133.8, -25.3],
  Japan: [138.2, 36.2],
  "South Korea": [127.8, 36.5],
  China: [104.2, 35.9],
  India: [78.9, 22.0],
  Singapore: [103.8, 1.35],
  Malaysia: [102.0, 4.2],
  Indonesia: [113.9, -0.8],
  Thailand: [100.9, 15.1],
  Vietnam: [106.3, 14.1],
  "Hong Kong": [114.2, 22.3],
  "Saudi Arabia": [45.1, 24.0],
  "United Arab Emirates": [54.0, 23.4],
  Qatar: [51.2, 25.3],
  Kuwait: [47.6, 29.3],
  Israel: [34.9, 31.0],
  Turkey: [35.2, 39.0],
  Germany: [10.4, 51.2],
  France: [2.2, 46.6],
  Spain: [-3.7, 40.2],
  Italy: [12.6, 42.8],
  Netherlands: [5.3, 52.1],
  Belgium: [4.5, 50.6],
  Switzerland: [8.2, 46.8],
  Austria: [9.8, 47.5],
  Sweden: [15.6, 60.1],
  Norway: [8.5, 61.0],
  Denmark: [9.0, 55.7],
  Finland: [26.0, 61.9],
  Poland: [19.4, 52.1],
  Portugal: [-8.2, 39.6],
  Greece: [22.9, 39.1],
  Brazil: [-51.9, -14.2],
  Mexico: [-102.5, 23.6],
  Argentina: [-64.0, -34.0],
  Chile: [-71.5, -35.7],
  Colombia: [-74.3, 4.6],
  Peru: [-75.0, -9.2],
  "New Zealand": [172.8, -41.5],
  Nigeria: [8.7, 9.1],
  Kenya: [37.9, 0.2],
  "South Africa": [24.7, -29.0],
  Egypt: [30.8, 26.8],
  Pakistan: [69.3, 30.4],
  Bangladesh: [90.4, 23.7],
  "Sri Lanka": [80.7, 7.9],
  Nepal: [84.1, 28.4],
  Taiwan: [120.9, 23.7],
  Unknown: [0, 0],
};

type MessagesMapProps = {
  countries: { country: string; count: number }[];
};

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MessagesMap = ({ countries }: MessagesMapProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  // d3-geo projection math differs in floating-point between Node and the
  // browser, which breaks hydration — render the map client-side only.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  /** ISO numeric id -> country name for hover matching. */
  const [geoNames, setGeoNames] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then(
        (topo: {
          objects: {
            countries: {
              geometries: { id: string; properties?: { name?: string } }[];
            };
          };
        }) => {
          const names: Record<string, string> = {};

          for (const geometry of topo.objects.countries.geometries) {
            if (geometry.properties?.name) {
              names[geometry.id] = geometry.properties.name;
            }
          }

          setGeoNames(names);
        },
      )
      .catch(() => {});
  }, []);

  const markers = countries
    .map((entry) => {
      const coords = COUNTRY_COORDS[entry.country];

      if (!coords) return null;

      return {
        country: entry.country,
        count: entry.count,
        coordinates: coords,
      };
    })
    .filter((marker): marker is NonNullable<typeof marker> => marker !== null);

  const maxCount = Math.max(...markers.map((marker) => marker.count), 1);

  return (
    <section className="flex flex-col rounded-xl border-2 border-[#1f1c14] bg-white p-3.5 shadow-[6px_6px_0_#1f1c14]">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-[13px] font-bold">Where your messages came from</h2>
        <span className="text-[11px] font-bold text-[#1f1c14]/50">
          {markers.length} {markers.length === 1 ? "country" : "countries"}
        </span>
      </div>

      <div className="w-full overflow-hidden rounded-lg">
        {isMounted ? (
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 140 }}
            width={600}
            height={300}
            style={{ width: "100%", height: "auto" }}
          >
            {/* neubrutalist lift shadow: hard offset ink drop */}
            <defs>
              <filter
                id="countryLift"
                x="-20%"
                y="-20%"
                width="150%"
                height="150%"
              >
                <feDropShadow
                  dx="2.5"
                  dy="2.5"
                  stdDeviation="0"
                  floodColor={INK}
                  floodOpacity="1"
                />
              </filter>
            </defs>

            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: unknown[] }) =>
                geographies.map((geo, index) => {
                  const feature = geo as {
                    rsmKey?: string;
                    id?: string | number;
                  };

                  const countryName =
                    feature.id != null
                      ? geoNames[String(feature.id)]
                      : undefined;
                  const isHovered =
                    countryName != null && countryName === hovered;

                  return (
                    <Geography
                      key={feature.rsmKey ?? `geo-${index}`}
                      geography={geo as never}
                      fill={isHovered ? LIME : "#fdfaf2"}
                      stroke={INK}
                      strokeWidth={isHovered ? 0.9 : 0.4}
                      onMouseEnter={() =>
                        countryName && setHovered(countryName)
                      }
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        default: {
                          outline: "none",
                          // lift + shadow when hovered
                          ...(isHovered
                            ? {
                                filter: "url(#countryLift)",
                                transform: "translate(-2px, -2px)",
                                transition:
                                  "transform 150ms ease, filter 150ms ease",
                              }
                            : {
                                transition:
                                  "transform 150ms ease, filter 150ms ease",
                              }),
                        },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {markers.map((marker) => (
              <Marker key={marker.country} coordinates={marker.coordinates}>
                <circle
                  r={4 + (marker.count / maxCount) * 6}
                  fill={LIME}
                  stroke={INK}
                  strokeWidth={1.5}
                  onMouseEnter={() => setHovered(marker.country)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={`${marker.country}: ${marker.count} messages`}
                  style={{ cursor: "pointer" }}
                />
              </Marker>
            ))}

            {/* hover label rendered as SVG text (no DOM title hoisting) */}
            {hovered && (
              <Marker
                key={`label-${hovered}`}
                coordinates={
                  (markers.find((m) => m.country === hovered)?.coordinates ??
                    COUNTRY_COORDS[hovered] ?? [0, 0]) as [number, number]
                }
              >
                <g
                  transform="translate(12, -6)"
                  style={{ pointerEvents: "none" }}
                >
                  <rect
                    x={0}
                    y={-14}
                    rx={6}
                    width={
                      hovered.length * 7 +
                      (markers.find((m) => m.country === hovered) ? 44 : 16)
                    }
                    height={22}
                    fill={INK}
                    stroke={INK}
                    strokeWidth={1}
                  />
                  <text
                    x={8}
                    y={1}
                    textAnchor="start"
                    fontSize={10}
                    fontWeight={700}
                    fill={LIME}
                    style={{ fontFamily: "inherit" }}
                  >
                    {markers.find((m) => m.country === hovered)
                      ? `${hovered} · ${markers.find((m) => m.country === hovered)?.count}`
                      : hovered}
                  </text>
                </g>
              </Marker>
            )}
          </ComposableMap>
        ) : (
          /* Skeleton mirrors the rendered map 1:1 — same viewBox,
             same aspect, ghost blobs where continents land */
          <svg
            viewBox="0 0 600 300"
            style={{ width: "100%", height: "auto", display: "block" }}
            aria-hidden="true"
            focusable="false"
          >
            <rect width="600" height="300" fill="#fdfaf2" />
            <g
              fill="#e8e4d8"
              className="animate-pulse"
              stroke="#d8d3c4"
              strokeWidth="1"
            >
              {/* North America */}
              <path d="M 60 55 Q 95 35 130 50 L 150 45 Q 165 55 155 75 Q 140 95 120 90 L 100 100 Q 85 85 75 80 Q 55 70 60 55 Z" />
              {/* South America */}
              <path d="M 150 130 Q 175 120 185 145 Q 190 175 178 200 Q 168 220 158 210 Q 148 185 145 160 Q 142 140 150 130 Z" />
              {/* Europe */}
              <path d="M 285 60 Q 310 50 330 60 L 345 70 Q 340 85 325 88 L 300 90 Q 285 80 285 60 Z" />
              {/* Africa */}
              <path d="M 290 110 Q 320 100 345 115 L 355 140 Q 348 175 330 200 Q 315 215 305 195 Q 295 165 290 140 Z" />
              {/* Asia */}
              <path d="M 360 55 Q 420 35 490 55 Q 540 65 555 90 L 540 110 Q 505 120 480 105 L 440 115 Q 405 105 390 90 Q 365 75 360 55 Z" />
              {/* Southeast Asia / PH area */}
              <path d="M 505 140 Q 520 132 530 142 Q 525 155 512 152 Q 502 148 505 140 Z" />
              {/* Australia */}
              <path d="M 480 190 Q 510 180 535 195 Q 545 210 528 220 L 495 218 Q 478 205 480 190 Z" />
            </g>
            {/* ghost message dots */}
            <g className="animate-pulse">
              <circle cx={505} cy={148} r={8} fill="#dcf3b0" stroke="#c8e88f" strokeWidth="1.5" />
              <circle cx={100} cy={65} r={6} fill="#dcf3b0" stroke="#c8e88f" strokeWidth="1.5" />
              <circle cx={320} cy={70} r={5} fill="#dcf3b0" stroke="#c8e88f" strokeWidth="1.5" />
            </g>
          </svg>
        )}
      </div>

      {/* chips row — ghost pills while the map skeleton is showing */}
      {!isMounted ? (
        <div className="mx-3.5 mb-3.5 mt-2.5 flex flex-wrap gap-1.5">
          {[72, 58, 64].map((width, i) => (
            <span
              key={i}
              className="animate-pulse rounded-full border-2 border-[#1f1c14]/20 bg-[#f5f2e8] px-2.5 py-0.5"
              style={{ width, height: 24 }}
            />
          ))}
        </div>
      ) : markers.length === 0 ? (
        <p className="mt-2 text-center text-xs font-bold text-[#1f1c14]/50">
          No location data yet — share your link to start receiving messages.
        </p>
      ) : (
        <div className="mx-3.5 mb-3.5 mt-2.5 flex flex-wrap gap-1.5">
          {markers.slice(0, 6).map((marker) => (
            <span
              key={marker.country}
              className="rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-2.5 py-0.5 text-[11px] font-bold"
            >
              {marker.country} · {marker.count}
            </span>
          ))}
          {markers.length > 6 && (
            <span className="rounded-full border-2 border-[#1f1c14] bg-white px-2.5 py-0.5 text-[11px] font-bold text-[#1f1c14]/60">
              +{markers.length - 6} more
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default MessagesMap;
