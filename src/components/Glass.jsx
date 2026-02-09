import { useState, useMemo } from "react";

/* Generate a hand-drawn path along a rectangle with wobbly control points */
function sketchRect(w, h, r, seed = 0) {
  // Seeded pseudo-random so each card gets a consistent sketch
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return (s / 233280 - 0.5) * 2; // -1 to 1
  };

  const jitter = 1.8; // how much the line wobbles in px
  const segments = 8; // points per edge

  const pts = [];

  // Helper: interpolate along an edge with wobble
  const edge = (x1, y1, x2, y2) => {
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      // Wobble perpendicular to edge direction
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const wobble = rand() * jitter;
      pts.push([x + nx * wobble, y + ny * wobble]);
    }
  };

  // Top edge (left-to-right, inset by radius)
  edge(r, 0, w - r, 0);
  // Top-right corner approx
  pts.push([w - r * 0.3 + rand() * 0.8, r * 0.3 + rand() * 0.8]);
  pts.push([w + rand() * 0.6, r + rand() * 0.8]);
  // Right edge
  edge(w, r, w, h - r);
  // Bottom-right corner
  pts.push([w - r * 0.3 + rand() * 0.8, h - r * 0.3 + rand() * 0.8]);
  pts.push([w - r + rand() * 0.8, h + rand() * 0.6]);
  // Bottom edge (right-to-left)
  edge(w - r, h, r, h);
  // Bottom-left corner
  pts.push([r * 0.3 + rand() * 0.8, h - r * 0.3 + rand() * 0.8]);
  pts.push([rand() * 0.6, h - r + rand() * 0.8]);
  // Left edge
  edge(0, h - r, 0, r);
  // Top-left corner
  pts.push([r * 0.3 + rand() * 0.8, r * 0.3 + rand() * 0.8]);
  pts.push([r + rand() * 0.8, rand() * 0.6]);

  // Build SVG path with smooth curves
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const mx = (prev[0] + cur[0]) / 2;
    const my = (prev[1] + cur[1]) / 2;
    d += ` Q ${prev[0]},${prev[1]} ${mx},${my}`;
  }
  d += " Z";
  return d;
}

let instanceCounter = 0;

export default function Glass({ children, style, onClick }) {
  const [hovered, setHovered] = useState(false);
  const seed = useMemo(() => instanceCounter++, []);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(15,15,25,0.55)" : "rgba(15,15,25,0.45)",
        backdropFilter: "blur(64px)",
        WebkitBackdropFilter: "blur(64px)",
        borderRadius: "20px",
        transition: "background 0.35s ease, box-shadow 0.35s ease",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)"
          : "0 8px 24px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        height: "100%",
        position: "relative",
        isolation: "isolate",
        ...style,
      }}
    >
      {children}
      {/* Hand-drawn sketch border */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
        }}
        preserveAspectRatio="none"
      >
        <SketchBorder seed={seed} />
      </svg>
    </div>
  );
}

function SketchBorder({ seed }) {
  // We render at a reference size and let viewBox scale it
  const w = 400;
  const h = 300;
  const r = 20;
  const d = useMemo(() => sketchRect(w, h, r, seed * 7919), [seed]);

  return (
    <svg
      viewBox={`-1 -1 ${w + 2} ${h + 2}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
