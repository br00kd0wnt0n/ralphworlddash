import { useState, useEffect } from "react";
import { R } from "../data/theme";
import { ARCHIVE } from "../data/content";
import { adaptiveText, adaptiveTextMuted } from "../hooks/useContrastColor";
import Glass from "./Glass";
import Label from "./Label";

export default function FromArchive({ onSelect }) {
  const [idx, setIdx] = useState(0);
  const a = ARCHIVE[idx];

  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % ARCHIVE.length), 9000);
    return () => clearInterval(iv);
  }, []);

  return (
    <Glass
      style={{ display: "flex", flexDirection: "column" }}
      onClick={() => onSelect(a)}
    >
      <div style={{ padding: "14px 18px 8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <Label>From the Archive</Label>
        <div style={{ display: "flex", gap: "4px" }}>
          {ARCHIVE.map((_, i) => (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                cursor: "pointer",
                background: i === idx ? a.color : "rgba(255,255,255,0.25)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "0 18px 14px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: `${a.color}12`,
            border: `1px solid ${a.color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            transition: "all 0.4s ease",
          }}
        >
          {a.emoji}
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1.3,
              ...adaptiveText,
            }}
          >
            {a.title}
          </div>
          <div
            style={{
              display: "flex",
              gap: "6px",
              justifyContent: "center",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "10px",
                background: `${a.color}12`,
                color: a.color,
                fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase",
              }}
            >
              {a.type}
            </span>
            <span
              style={{
                fontSize: "9px",
                fontFamily: "'DM Mono', monospace",
                padding: "2px 0",
                ...adaptiveTextMuted,
              }}
            >
              {a.year}
            </span>
          </div>
        </div>
      </div>
    </Glass>
  );
}
