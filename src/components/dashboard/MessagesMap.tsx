"use client";

import { useState } from "react";
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

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MessagesMap = ({ countries }: MessagesMapProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

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

      <div className="w-full overflow-hidden rounded-lg border-2 border-[#1f1c14] bg-[#fdfaf2]">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 140 }}
          width={600}
          height={300}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: unknown[] }) =>
              geographies.map((geo, index) => {
                const feature = geo as {
                  rsmKey?: string;
                  id?: string | number;
                };

                return (
                  <Geography
                    key={feature.rsmKey ?? `geo-${index}`}
                    geography={geo as never}
                    fill="#fdfaf2"
                    stroke={INK}
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#f5f2e8" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {markers.map((marker) => (
            <Marker
              key={marker.country}
              coordinates={marker.coordinates}
            >
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
          {hovered &&
            markers
              .filter((marker) => marker.country === hovered)
              .map((marker) => {
                const [x, y] = marker.coordinates;

                return (
                  <Marker key={`label-${marker.country}`} coordinates={[x, y]}>
                    <g
                      transform="translate(12, -6)"
                      style={{ pointerEvents: "none" }}
                    >
                      <rect
                        x={0}
                        y={-14}
                        rx={6}
                        width={marker.country.length * 7 + 44}
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
                        {marker.country} · {marker.count}
                      </text>
                    </g>
                  </Marker>
                );
              })}
        </ComposableMap>
      </div>

      {markers.length === 0 ? (
        <p className="mt-2 text-center text-xs font-bold text-[#1f1c14]/50">
          No location data yet — share your link to start receiving messages.
        </p>
      ) : (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
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
