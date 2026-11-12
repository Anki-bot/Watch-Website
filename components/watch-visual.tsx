"use client";

import { useId } from "react";
import type { Watch } from "@/lib/types";
import { getBrand } from "@/lib/brands";
import { cn } from "@/lib/format";

type WatchVisualProps = {
  watch: Watch;
  className?: string;
};

function clamp(value: number, min = 0, max = 255) {
  return Math.max(min, Math.min(max, value));
}

export function shade(hex: string, percent: number): string {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((char) => char + char)
          .join("")
      : cleaned;
  const num = Number.parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const target = percent > 0 ? 255 : 0;
  const ratio = Math.abs(percent) / 100;
  const mix = (channel: number) =>
    clamp(Math.round(channel + (target - channel) * ratio));
  return `#${[mix(r), mix(g), mix(b)]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function isLight(hex: string): boolean {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((char) => char + char)
          .join("")
      : cleaned;
  const num = Number.parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.58;
}

type Metal = { stops: string[]; edge: string };

const metals: Record<string, Metal> = {
  steel: {
    stops: ["#f8fafb", "#cdd3d9", "#878f98", "#eef1f4", "#767f88"],
    edge: "#646c74",
  },
  gold: {
    stops: ["#fdf3cd", "#e3c069", "#b58a37", "#f8e6ac", "#9d7629"],
    edge: "#8a6524",
  },
  "rose-gold": {
    stops: ["#fcebe0", "#ecc0aa", "#c98d70", "#f8ddcd", "#ae745b"],
    edge: "#965f49",
  },
  titanium: {
    stops: ["#eef1f2", "#bcc2c6", "#858d92", "#e2e6e8", "#737b80"],
    edge: "#5c6468",
  },
  black: {
    stops: ["#5b6067", "#33373c", "#16181b", "#4a4f55", "#0e1012"],
    edge: "#08090a",
  },
  "two-tone": {
    stops: ["#f8fafb", "#cdd3d9", "#878f98", "#eef1f4", "#767f88"],
    edge: "#646c74",
  },
};

function metalFor(tone: Watch["caseTone"]): Metal {
  return metals[tone] ?? metals.steel;
}

const roman = [
  "XII",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
];

export function WatchVisual({ watch, className }: WatchVisualProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const uid = `${watch.slug.replace(/[^a-zA-Z0-9]/g, "")}-${rawId}`;
  const isTank = watch.caseShape === "tank";
  const isDigital = watch.dialStyle === "digital";
  const isChrono = Boolean(watch.chrono);
  const metal = metalFor(watch.caseTone);
  const dial = watch.dialHex;
  const strap = watch.strapHex;
  const brand = getBrand(watch.brand);
  const brandLabel = (brand?.name ?? watch.brand).toUpperCase();
  const countryLabel =
    brand?.country === "Japan"
      ? "JAPAN"
      : brand?.country === "United States"
        ? "USA"
        : "SWISS MADE";

  const cx = 320;
  const cy = 372;
  const caseR = 198;
  const bezelR = 176;
  const dialR = 148;

  const dialIsLight = isLight(dial);
  const ink = dialIsLight ? "#26241f" : "#f4efe2";
  const subtle = dialIsLight ? "#5b564b" : "#b8b2a4";
  const handColor = dialIsLight ? "#2a2822" : "#eee7d6";
  const goldHand = "#c9a45c";

  const hasDate = !isTank && !isDigital && !isChrono;
  const hasSubdials = isChrono && !isTank && !isDigital;

  const isMetalStrap = ["Steel", "Titanium", "Gold"].includes(watch.strapType);
  const isRubber = watch.strapType === "Rubber";
  const isNato = watch.strapType === "NATO";

  const bezelMetal =
    watch.caseTone === "gold"
      ? metals.gold
      : watch.caseTone === "rose-gold"
        ? metals["rose-gold"]
        : watch.caseTone === "two-tone"
          ? metals.gold
          : metal;

  const bezelFill =
    watch.bezel === "dive" || watch.bezel === "tachymeter"
      ? watch.bezelHex ?? "#17191c"
      : bezelMetal.stops[1];

  const strapGradientStops = isMetalStrap
    ? metal.stops
    : [shade(strap, 18), strap, shade(strap, -22), strap, shade(strap, -30)];

  const anglePoint = (angle: number, radius: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: Math.round((cx + Math.cos(rad) * radius) * 100) / 100,
      y: Math.round((cy + Math.sin(rad) * radius) * 100) / 100,
    };
  };

  const round = (value: number) => Math.round(value * 100) / 100;

  const handPath = (angle: number, length: number, width: number, tail = 22) => {
    const rad = (angle * Math.PI) / 180;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    const tipX = round(cx + sin * length);
    const tipY = round(cy - cos * length);
    const half = width / 2;
    const leftX = round(cx + sin * (width * 1.1) - cos * half);
    const leftY = round(cy - cos * (width * 1.1) - sin * half);
    const rightX = round(cx + sin * (width * 1.1) + cos * half);
    const rightY = round(cy - cos * (width * 1.1) + sin * half);
    const tailX = round(cx - sin * tail);
    const tailY = round(cy + cos * tail);
    return `M${leftX} ${leftY} L${tipX} ${tipY} L${rightX} ${rightY} L${cx} ${cy} L${tailX} ${tailY} Z`;
  };

  return (
    <svg
      viewBox="0 0 640 760"
      className={cn("block h-full w-full", className)}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
          {metal.stops.map((color, index) => (
            <stop
              key={color + index}
              offset={`${(index / (metal.stops.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
        <linearGradient id={`${uid}-bezel`} x1="0" y1="0" x2="0.9" y2="1">
          {bezelMetal.stops.map((color, index) => (
            <stop
              key={color + index}
              offset={`${(index / (bezelMetal.stops.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
        <linearGradient id={`${uid}-strap`} x1="0" y1="0" x2="1" y2="0">
          {strapGradientStops.map((color, index) => (
            <stop
              key={color + index}
              offset={`${(index / (strapGradientStops.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
        <radialGradient id={`${uid}-dial`} cx="42%" cy="34%" r="78%">
          <stop offset="0%" stopColor={shade(dial, 16)} />
          <stop offset="58%" stopColor={dial} />
          <stop offset="100%" stopColor={shade(dial, -14)} />
        </radialGradient>
        <radialGradient id={`${uid}-mop`} cx="34%" cy="28%" r="86%">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="38%" stopColor="#f6e9e6" />
          <stop offset="66%" stopColor="#eee0e8" />
          <stop offset="100%" stopColor="#e6d7d3" />
        </radialGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <pattern
          id={`${uid}-grain`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 7 L7 0"
            stroke="#ffffff"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        </pattern>
        <filter
          id={`${uid}-shadow`}
          x="-40%"
          y="-30%"
          width="180%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="16"
            floodColor="#2b2418"
            floodOpacity="0.28"
          />
        </filter>
        <clipPath id={`${uid}-dialclip`}>
          {isTank ? (
            <rect x="200" y="212" width="240" height="316" rx="16" />
          ) : (
            <circle cx={cx} cy={cy} r={dialR} />
          )}
        </clipPath>
      </defs>

      {/* Strap */}
      <g>
        {isMetalStrap ? (
          <>
            <rect
              x="248"
              y="-20"
              width="144"
              height="230"
              rx="12"
              fill={`url(#${uid}-strap)`}
            />
            <rect
              x="248"
              y="534"
              width="144"
              height="266"
              rx="12"
              fill={`url(#${uid}-strap)`}
            />
            {watch.caseTone === "two-tone" && (
              <>
                <rect x="298" y="-20" width="44" height="230" fill={`url(#${uid}-bezel)`} opacity="0.9" />
                <rect x="298" y="534" width="44" height="266" fill={`url(#${uid}-bezel)`} opacity="0.9" />
              </>
            )}
            {Array.from({ length: 8 }).map((_, index) => (
              <g key={`link-${index}`} opacity="0.32" stroke="#2c3238" strokeWidth="1.5">
                <line x1="250" y1={-6 + index * 29} x2="390" y2={-6 + index * 29} />
                <line x1="250" y1={550 + index * 31} x2="390" y2={550 + index * 31} />
              </g>
            ))}
            <rect x="256" y="-20" width="10" height="230" fill="#ffffff" opacity="0.18" />
            <rect x="256" y="534" width="10" height="266" fill="#ffffff" opacity="0.18" />
          </>
        ) : (
          <>
            <rect
              x="246"
              y="-20"
              width="148"
              height="240"
              rx="10"
              fill={`url(#${uid}-strap)`}
            />
            <rect
              x="246"
              y="524"
              width="148"
              height="276"
              rx="10"
              fill={`url(#${uid}-strap)`}
            />
            {!isRubber && (
              <>
                {Array.from({ length: 7 }).map((_, index) => (
                  <g key={`stitch-${index}`} opacity="0.34">
                    <line
                      x1="258"
                      y1={-4 + index * 34}
                      x2="258"
                      y2={20 + index * 34}
                      stroke="#ffffff"
                      strokeWidth="1.6"
                      strokeDasharray="4 5"
                    />
                    <line
                      x1="382"
                      y1={-4 + index * 34}
                      x2="382"
                      y2={20 + index * 34}
                      stroke="#ffffff"
                      strokeWidth="1.6"
                      strokeDasharray="4 5"
                    />
                  </g>
                ))}
                {Array.from({ length: 8 }).map((_, index) => (
                  <g key={`stitch-b-${index}`} opacity="0.34">
                    <line
                      x1="258"
                      y1={540 + index * 32}
                      x2="258"
                      y2={564 + index * 32}
                      stroke="#ffffff"
                      strokeWidth="1.6"
                      strokeDasharray="4 5"
                    />
                    <line
                      x1="382"
                      y1={540 + index * 32}
                      x2="382"
                      y2={564 + index * 32}
                      stroke="#ffffff"
                      strokeWidth="1.6"
                      strokeDasharray="4 5"
                    />
                  </g>
                ))}
              </>
            )}
            {isNato && (
              <g>
                <rect x="246" y="616" width="148" height="30" fill={shade(strap, -18)} />
                <rect x="246" y="616" width="148" height="4" fill="#000" opacity="0.15" />
                <rect x="247" y="200" width="146" height="12" fill={shade(strap, -18)} />
              </g>
            )}
            {!isNato && (
              <g>
                <rect
                  x="252"
                  y="646"
                  width="136"
                  height="42"
                  rx="8"
                  fill={`url(#${uid}-metal)`}
                  opacity="0.92"
                />
                <rect x="282" y="656" width="76" height="8" rx="4" fill="#000" opacity="0.16" />
              </g>
            )}
            <rect x="252" y="-20" width="9" height="240" fill="#ffffff" opacity="0.13" />
            <rect x="252" y="524" width="9" height="276" fill="#ffffff" opacity="0.13" />
          </>
        )}
      </g>

      {/* Lugs */}
      <g fill={`url(#${uid}-metal)`} stroke={metal.edge} strokeWidth="1">
        <rect x={cx - 128} y={isTank ? 178 : 186} width="38" height="86" rx="16" transform={`rotate(-8 ${cx - 109} ${isTank ? 221 : 229})`} />
        <rect x={cx + 90} y={isTank ? 178 : 186} width="38" height="86" rx="16" transform={`rotate(8 ${cx + 109} ${isTank ? 221 : 229})`} />
        <rect x={cx - 128} y={isTank ? 476 : 478} width="38" height="86" rx="16" transform={`rotate(8 ${cx - 109} ${isTank ? 519 : 521})`} />
        <rect x={cx + 90} y={isTank ? 476 : 478} width="38" height="86" rx="16" transform={`rotate(-8 ${cx + 109} ${isTank ? 519 : 521})`} />
      </g>

      {/* Crown + pushers */}
      <g>
        {isChrono && (
          <>
            <rect x={isTank ? 492 : 522} y={cy - 104} width="26" height="44" rx="12" fill={`url(#${uid}-metal)`} stroke={metal.edge} strokeWidth="1" />
            <rect x={isTank ? 492 : 522} y={cy + 60} width="26" height="44" rx="12" fill={`url(#${uid}-metal)`} stroke={metal.edge} strokeWidth="1" />
          </>
        )}
        <rect
          x={isTank ? 490 : 526}
          y={cy - 30}
          width="30"
          height="60"
          rx="14"
          fill={`url(#${uid}-metal)`}
          stroke={metal.edge}
          strokeWidth="1"
        />
        <g stroke={metal.edge} strokeWidth="1.4" opacity="0.55">
          <line x1={isTank ? 498 : 534} y1={cy - 20} x2={isTank ? 498 : 534} y2={cy + 20} />
          <line x1={isTank ? 508 : 544} y1={cy - 20} x2={isTank ? 508 : 544} y2={cy + 20} />
        </g>
      </g>

      <g filter={`url(#${uid}-shadow)`}>
        {/* Case */}
        {isTank ? (
          <>
            <rect x="162" y="178" width="316" height="388" rx="42" fill={`url(#${uid}-metal)`} stroke={metal.edge} strokeWidth="2" />
            <rect x="190" y="204" width="260" height="336" rx="26" fill={`url(#${uid}-bezel)`} stroke={bezelMetal.edge} strokeWidth="1.5" />
            <rect x="200" y="212" width="240" height="316" rx="16" fill={`url(#${uid}-dial)`} />
          </>
        ) : (
          <>
            <circle cx={cx} cy={cy} r={caseR} fill={`url(#${uid}-metal)`} stroke={metal.edge} strokeWidth="2" />
            <circle cx={cx} cy={cy} r={bezelR} fill={bezelFill} />
          </>
        )}

        {/* Bezel detail */}
        {isTank ? (
          <g>
            <rect x="206" y="218" width="228" height="304" rx="12" fill="none" stroke={dialIsLight ? "#3b382f" : "#f0eadb"} strokeOpacity="0.28" strokeWidth="1.5" />
            {[
              [222, 234],
              [418, 234],
              [222, 506],
              [418, 506],
            ].map(([x, y]) => (
              <g key={`screw-${x}-${y}`}>
                <circle cx={x} cy={y} r="5" fill={bezelMetal.stops[1]} stroke={bezelMetal.edge} strokeWidth="1" />
                <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke={bezelMetal.edge} strokeWidth="1" />
              </g>
            ))}
          </g>
        ) : watch.bezel === "dive" ? (
          <g>
            {Array.from({ length: 60 }).map((_, index) => {
              const angle = index * 6;
              const outer = anglePoint(angle, bezelR - 3);
              const inner = anglePoint(angle, bezelR - (index % 5 === 0 ? 17 : 10));
              return (
                <line
                  key={`bezel-tick-${index}`}
                  x1={outer.x}
                  y1={outer.y}
                  x2={inner.x}
                  y2={inner.y}
                  stroke="#f0ede3"
                  strokeOpacity={index % 5 === 0 ? 0.95 : 0.55}
                  strokeWidth={index % 5 === 0 ? 2.4 : 1.2}
                />
              );
            })}
            {[0, 90, 180, 270].map((angle, index) => {
              const point = anglePoint(angle, bezelR - 27);
              return (
                <text
                  key={`bezel-num-${angle}`}
                  x={point.x}
                  y={point.y + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#f0ede3"
                  fontFamily="Inter, Helvetica, sans-serif"
                  fontWeight="600"
                >
                  {["▲", "15", "30", "45"][index]}
                </text>
              );
            })}
            <circle cx={cx} cy={cy} r={dialR + 2} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="2" />
          </g>
        ) : watch.bezel === "tachymeter" ? (
          <g>
            {Array.from({ length: 48 }).map((_, index) => {
              const angle = index * 7.5;
              const outer = anglePoint(angle, bezelR - 3);
              const inner = anglePoint(angle, bezelR - (index % 4 === 0 ? 14 : 8));
              return (
                <line
                  key={`tachy-tick-${index}`}
                  x1={outer.x}
                  y1={outer.y}
                  x2={inner.x}
                  y2={inner.y}
                  stroke="#f2efe6"
                  strokeOpacity={index % 4 === 0 ? 0.9 : 0.45}
                  strokeWidth={index % 4 === 0 ? 2 : 1}
                />
              );
            })}
            {[60, 120, 240, 400].map((number, index) => {
              const point = anglePoint(30 + index * 90, bezelR - 27);
              return (
                <text
                  key={`tachy-${number}`}
                  x={point.x}
                  y={point.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#f2efe6"
                  fontFamily="Inter, Helvetica, sans-serif"
                  fontWeight="600"
                >
                  {number}
                </text>
              );
            })}
          </g>
        ) : watch.bezel === "gmt" ? (
          <g>
            <path
              d={`M ${cx - bezelR} ${cy} A ${bezelR} ${bezelR} 0 0 1 ${cx + bezelR} ${cy} Z`}
              fill="#1c3f6b"
            />
            <path
              d={`M ${cx - bezelR} ${cy} A ${bezelR} ${bezelR} 0 0 0 ${cx + bezelR} ${cy} Z`}
              fill="#151719"
            />
            {Array.from({ length: 24 }).map((_, index) => {
              const angle = index * 15;
              const outer = anglePoint(angle, bezelR - 3);
              const inner = anglePoint(angle, bezelR - (index % 2 === 0 ? 15 : 9));
              return (
                <line
                  key={`gmt-tick-${index}`}
                  x1={outer.x}
                  y1={outer.y}
                  x2={inner.x}
                  y2={inner.y}
                  stroke="#f1eee4"
                  strokeOpacity={index % 2 === 0 ? 0.95 : 0.6}
                  strokeWidth={index % 2 === 0 ? 2.4 : 1.2}
                />
              );
            })}
            <circle cx={cx} cy={cy} r={dialR + 2} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="2" />
          </g>
        ) : watch.bezel === "fluted" ? (
          <g>
            <circle cx={cx} cy={cy} r={bezelR} fill={`url(#${uid}-bezel)`} />
            {Array.from({ length: 90 }).map((_, index) => {
              const angle = index * 4;
              const outer = anglePoint(angle, bezelR - 4);
              const inner = anglePoint(angle, dialR + 10);
              return (
                <line
                  key={`flute-${index}`}
                  x1={outer.x}
                  y1={outer.y}
                  x2={inner.x}
                  y2={inner.y}
                  stroke={bezelMetal.edge}
                  strokeOpacity="0.28"
                  strokeWidth="1.4"
                />
              );
            })}
            <circle cx={cx} cy={cy} r={dialR + 5} fill="none" stroke={bezelMetal.edge} strokeOpacity="0.45" strokeWidth="1.5" />
          </g>
        ) : null}

        {/* Dial */}
        {!isTank && (
          <circle
            cx={cx}
            cy={cy}
            r={dialR}
            fill={
              watch.dialTexture === "mother-of-pearl"
                ? `url(#${uid}-mop)`
                : `url(#${uid}-dial)`
            }
          />
        )}

        <g clipPath={`url(#${uid}-dialclip)`}>
          {/* Dial texture */}
          {watch.dialTexture === "sunburst" && (
            <g opacity="0.08" stroke="#ffffff" strokeWidth="1">
              {Array.from({ length: 72 }).map((_, index) => {
                const point = anglePoint(index * 5, dialR * 0.98);
                return (
                  <line
                    key={`ray-${index}`}
                    x1={cx}
                    y1={cy}
                    x2={point.x}
                    y2={point.y}
                  />
                );
              })}
            </g>
          )}
          {watch.dialTexture === "snowflake" && (
            <g>
              <rect
                x="170"
                y="220"
                width="300"
                height="300"
                fill={`url(#${uid}-grain)`}
              />
              <g opacity="0.14" stroke="#7d7768" strokeWidth="0.8">
                {Array.from({ length: 26 }).map((_, index) => (
                  <line
                    key={`snow-${index}`}
                    x1={cx - 130 + index * 10}
                    y1={cy - 130 + (index % 5) * 9}
                    x2={cx + 120 - (index % 4) * 12}
                    y2={cy + 130 - (index % 3) * 14}
                  />
                ))}
              </g>
            </g>
          )}
          {watch.dialTexture === "mother-of-pearl" && (
            <g opacity="0.2" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d={`M ${cx - 150} ${cy + 60} Q ${cx - 20} ${cy - 90} ${cx + 150} ${cy + 10}`} />
              <path d={`M ${cx - 130} ${cy + 120} Q ${cx} ${cy - 40} ${cx + 140} ${cy + 70}`} />
            </g>
          )}

          {/* Minute track */}
          {!isTank && !isDigital && (
            <g>
              {Array.from({ length: 60 }).map((_, index) => {
                const angle = index * 6;
                const outer = anglePoint(angle, dialR - 8);
                const inner = anglePoint(angle, dialR - (index % 5 === 0 ? 19 : 13));
                return (
                  <line
                    key={`minute-${index}`}
                    x1={outer.x}
                    y1={outer.y}
                    x2={inner.x}
                    y2={inner.y}
                    stroke={subtle}
                    strokeOpacity={index % 5 === 0 ? 0.8 : 0.4}
                    strokeWidth={index % 5 === 0 ? 2 : 1}
                  />
                );
              })}
            </g>
          )}

          {/* Dial text */}
          <text
            x={cx}
            y={isTank ? 282 : cy - 94}
            textAnchor="middle"
            fill={ink}
            fontFamily="Inter, Helvetica, sans-serif"
            fontSize={isTank ? 11 : 12.5}
            fontWeight="600"
            letterSpacing="3.2"
          >
            {brandLabel}
          </text>
          <text
            x={cx}
            y={isTank ? 306 : cy - 77}
            textAnchor="middle"
            fill={subtle}
            fontFamily="Inter, Helvetica, sans-serif"
            fontSize={isTank ? 8 : 8.5}
            fontWeight="500"
            letterSpacing="2.4"
          >
            {watch.collection.toUpperCase().slice(0, 18)}
          </text>
          {!isTank && !isDigital && !hasSubdials && watch.dialStyle !== "roman" && (
            <text
              x={cx}
              y={cy + 106}
              textAnchor="middle"
              fill={subtle}
              fontFamily="Inter, Helvetica, sans-serif"
              fontSize="7.5"
              letterSpacing="2"
              opacity="0.9"
            >
              {countryLabel}
            </text>
          )}

          {isDigital ? (
            <g>
              <rect
                x={cx - 86}
                y={cy - 34}
                width="172"
                height="98"
                rx="10"
                fill="#b9c4a8"
                stroke="#5b6352"
                strokeWidth="2"
              />
              <g fill="#22261d" fontFamily="'Courier New', monospace">
                <text x={cx - 68} y={cy + 16} fontSize="42" fontWeight="700" letterSpacing="2">
                  10:10
                </text>
                <text x={cx - 68} y={cy + 42} fontSize="14" letterSpacing="1.4">
                  TH 06 &nbsp; 48 &nbsp; SU
                </text>
              </g>
              <text
                x={cx}
                y={cy + 90}
                textAnchor="middle"
                fill={subtle}
                fontFamily="Inter, Helvetica, sans-serif"
                fontSize="12"
                letterSpacing="2.4"
              >
                TOUGH SOLAR
              </text>
              {[
                [cx - 62, cy + 118],
                [cx + 62, cy + 118],
              ].map(([x, y]) => (
                <circle key={`dot-${x}`} cx={x} cy={y} r="4" fill={subtle} opacity="0.6" />
              ))}
            </g>
          ) : (
            <>
              {/* Indices */}
              {watch.dialStyle === "roman" ? (
                <g fill={ink} fontFamily="Cormorant Garamond, Georgia, serif" fontSize={isTank ? 22 : 23}>
                  {roman.map((numeral, index) => {
                    if (index === 3 && hasDate) return null;
                    if (isTank && ![0, 3, 6, 9].includes(index)) return null;
                    const point = anglePoint(index * 30, isTank ? 128 : dialR - 32);
                    return (
                      <text
                        key={`roman-${numeral}`}
                        x={point.x}
                        y={point.y + (isTank ? 7 : 6)}
                        textAnchor="middle"
                        fill={ink}
                      >
                        {numeral}
                      </text>
                    );
                  })}
                </g>
              ) : watch.dialStyle === "arabic" ? (
                <g fill={ink} fontFamily="Inter, Helvetica, sans-serif">
                  {Array.from({ length: 12 }).map((_, index) => {
                    const hour = index + 1;
                    if (hour === 3 && hasDate) return null;
                    const point = anglePoint(index * 30, dialR - 36);
                    const innerPoint = anglePoint(index * 30, dialR - 62);
                    return (
                      <g key={`arabic-${hour}`}>
                        <text
                          x={point.x}
                          y={point.y + 6}
                          textAnchor="middle"
                          fontSize="18"
                          fontWeight="600"
                        >
                          {hour}
                        </text>
                        <text
                          x={innerPoint.x}
                          y={innerPoint.y + 4}
                          textAnchor="middle"
                          fontSize="9"
                          opacity="0.55"
                        >
                          {hour + 12}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ) : (
                <g>
                  {Array.from({ length: 12 }).map((_, index) => {
                    if (index === 3 && hasDate) return null;
                    const angle = index * 30;
                    const point = anglePoint(angle, dialR - 25);
                    if (index === 0) {
                      return (
                        <g key={`index-${index}`}>
                          <line
                            x1={cx - 9}
                            y1={cy - (dialR - 38)}
                            x2={cx - 9}
                            y2={cy - (dialR - 17)}
                            stroke={handColor}
                            strokeWidth="5"
                          />
                          <line
                            x1={cx + 9}
                            y1={cy - (dialR - 38)}
                            x2={cx + 9}
                            y2={cy - (dialR - 17)}
                            stroke={handColor}
                            strokeWidth="5"
                          />
                        </g>
                      );
                    }
                    return (
                      <line
                        key={`index-${index}`}
                        x1={point.x}
                        y1={point.y}
                        x2={anglePoint(angle, dialR - 41).x}
                        y2={anglePoint(angle, dialR - 41).y}
                        stroke={handColor}
                        strokeWidth="5.5"
                        strokeLinecap="butt"
                      />
                    );
                  })}
                  {/* Lume plots */}
                  {[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
                    const point = anglePoint(index * 30, dialR - 22);
                    return (
                      <circle
                        key={`lume-${index}`}
                        cx={point.x}
                        cy={point.y}
                        r="2.4"
                        fill="#e7e2c9"
                        opacity={dialIsLight ? 0 : 0.85}
                      />
                    );
                  })}
                </g>
              )}

              {/* Date window */}
              {hasDate && (
                <g>
                  <rect
                    x={cx + 94}
                    y={cy - 17}
                    width="34"
                    height="34"
                    rx="3"
                    fill="#f4f1e8"
                    stroke={subtle}
                    strokeOpacity="0.6"
                    strokeWidth="1"
                  />
                  <text
                    x={cx + 111}
                    y={cy + 6}
                    textAnchor="middle"
                    fontSize="16"
                    fontFamily="Inter, Helvetica, sans-serif"
                    fill="#22211d"
                    fontWeight="600"
                  >
                    15
                  </text>
                </g>
              )}

              {/* Chrono subdials */}
              {hasSubdials && (
                <g>
                  {[
                    { x: cx - 66, y: cy, value: "30" },
                    { x: cx, y: cy + 70, value: "60" },
                    { x: cx + 66, y: cy, value: "12" },
                  ].map((subdial, index) => (
                    <g key={`subdial-${index}`}>
                      <circle
                        cx={subdial.x}
                        cy={subdial.y}
                        r="31"
                        fill={dial}
                        fillOpacity="0.35"
                        stroke={subtle}
                        strokeOpacity="0.5"
                        strokeWidth="1"
                      />
                      {Array.from({ length: 12 }).map((_, tick) => {
                        const rad = ((tick * 30 - 90) * Math.PI) / 180;
                        return (
                          <line
                            key={`subtick-${tick}`}
                            x1={round(subdial.x + Math.cos(rad) * 24)}
                            y1={round(subdial.y + Math.sin(rad) * 24)}
                            x2={round(subdial.x + Math.cos(rad) * 28)}
                            y2={round(subdial.y + Math.sin(rad) * 28)}
                            stroke={subtle}
                            strokeOpacity="0.6"
                            strokeWidth="0.8"
                          />
                        );
                      })}
                      <text
                        x={subdial.x}
                        y={subdial.y + 4}
                        textAnchor="middle"
                        fontSize="9"
                        fill={subtle}
                        fontFamily="Inter, Helvetica, sans-serif"
                      >
                        {subdial.value}
                      </text>
                      <line
                        x1={subdial.x}
                        y1={subdial.y}
                        x2={subdial.x + 13}
                        y2={subdial.y - 10}
                        stroke={handColor}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </g>
                  ))}
                </g>
              )}
            </>
          )}

          {/* Glass reflection */}
          <g>
            <ellipse
              cx={cx - 30}
              cy={cy - 40}
              rx="120"
              ry="80"
              fill={`url(#${uid}-glass)`}
              transform={`rotate(-28 ${cx - 30} ${cy - 40})`}
            />
            <path
              d={`M ${cx - 120} ${cy - 86} Q ${cx - 40} ${cy - 132} ${cx + 26} ${cy - 124}`}
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.24"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Hands */}
          {!isDigital && (
            <g>
              <path d={handPath(305, dialR * 0.54, 13)} fill={handColor} />
              <path d={handPath(305, dialR * 0.46, 4)} fill={goldHand} opacity="0.55" />
              <path d={handPath(60, dialR * 0.8, 10)} fill={handColor} />
              <path d={handPath(60, dialR * 0.69, 3.2)} fill={goldHand} opacity="0.55" />
              <line
                x1={round(cx + Math.sin((200 * Math.PI) / 180) * -26)}
                y1={round(cy + Math.cos((200 * Math.PI) / 180) * 26)}
                x2={round(cx + Math.sin((200 * Math.PI) / 180) * (dialR * 0.88))}
                y2={round(cy - Math.cos((200 * Math.PI) / 180) * (dialR * 0.88))}
                stroke={goldHand}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx={cx} cy={cy} r="8" fill={handColor} />
              <circle cx={cx} cy={cy} r="3.4" fill={goldHand} />
            </g>
          )}
        </g>

        {/* Dial edge */}
        {isTank ? (
          <rect x="200" y="212" width="240" height="316" rx="16" fill="none" stroke="#000" strokeOpacity="0.3" strokeWidth="2" />
        ) : (
          <circle cx={cx} cy={cy} r={dialR} fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="2" />
        )}

        {/* Case reflections */}
        {isTank ? (
          <g fill="none" stroke="#ffffff" strokeLinecap="round">
            <path d="M 186 214 Q 176 220 176 246" strokeWidth="3" strokeOpacity="0.4" />
            <path d="M 456 494 Q 462 512 456 528" strokeWidth="2" strokeOpacity="0.3" />
          </g>
        ) : (
          <g fill="none" stroke="#ffffff" strokeLinecap="round">
            <path
              d={`M ${cx - 162} ${cy - 108} A ${caseR - 6} ${caseR - 6} 0 0 1 ${cx - 54} ${cy - 190}`}
              strokeWidth="4"
              strokeOpacity="0.45"
            />
            <path
              d={`M ${cx + 150} ${cy + 122} A ${caseR - 10} ${caseR - 10} 0 0 1 ${cx + 40} ${cy + 190}`}
              strokeWidth="2.5"
              strokeOpacity="0.22"
            />
          </g>
        )}
      </g>
    </svg>
  );
}
