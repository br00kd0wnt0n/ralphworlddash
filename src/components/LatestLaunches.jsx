import { R } from "../data/theme";
import { LAUNCHES } from "../data/content";
import { adaptiveText, adaptiveTextMuted } from "../hooks/useContrastColor";
import Glass from "./Glass";
import Label from "./Label";

export default function LatestLaunches({ onSelect }) {
  return (
    <Glass style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 18px 8px" }}>
        <Label>Latest Launches</Label>
      </div>
      <div
        style={{
          flex: 1,
          padding: "0 10px 10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {LAUNCHES.map((p, i) => (
          <div
            key={i}
            onClick={() => onSelect(p)}
            style={{
              padding: "10px 12px",
              borderRadius: "14px",
              cursor: "pointer",
              background: `${p.color}06`,
              border: `1px solid ${p.color}10`,
              transition: "all 0.25s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${p.color}14`;
              e.currentTarget.style.borderColor = `${p.color}28`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${p.color}06`;
              e.currentTarget.style.borderColor = `${p.color}10`;
            }}
          >
            <div>
              <div style={{ fontSize: "16px", marginBottom: "3px" }}>
                {p.emoji}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  lineHeight: 1.25,
                  ...adaptiveText,
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "'DM Mono', monospace",
                  marginTop: "1px",
                  ...adaptiveTextMuted,
                }}
              >
                {p.client}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "8px",
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: "8px",
                  background: `${p.color}12`,
                  color: p.color,
                  fontFamily: "'DM Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.3px",
                }}
              >
                {p.tag}
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontFamily: "'DM Mono', monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  ...(p.date === "Live Now"
                    ? { color: p.color }
                    : adaptiveTextMuted),
                }}
              >
                {p.date === "Live Now" && (
                  <div
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: p.color,
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                )}
                {p.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Glass>
  );
}
