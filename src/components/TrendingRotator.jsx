import { useState, useEffect } from "react";
import { R } from "../data/theme";
import { TRENDING } from "../data/content";
import { adaptiveText, adaptiveTextMuted } from "../hooks/useContrastColor";
import Glass from "./Glass";
import Label from "./Label";

export default function TrendingRotator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % TRENDING.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const t = TRENDING[idx];

  return (
    <Glass style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 18px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Label color={R.orange}>Trending</Label>
          <div style={{ display: "flex", gap: "4px" }}>
            {TRENDING.map((_, i) => (
              <div
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  background: i === idx ? R.orange : "rgba(255,255,255,0.25)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "0 18px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "16px" }}>{t.icon}</span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              ...adaptiveText,
            }}
          >
            {t.platform}
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: R.green,
              fontFamily: "'DM Mono', monospace",
              padding: "1px 6px",
              borderRadius: "8px",
              background: `${R.green}10`,
            }}
          >
            {t.metric}
          </span>
        </div>
        <div
          style={{
            fontSize: "15px",
            fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.25,
            marginBottom: "6px",
            ...adaptiveText,
          }}
        >
          {t.topic}
        </div>
        <div
          style={{
            fontSize: "11px",
            lineHeight: 1.5,
            fontFamily: "'DM Sans', sans-serif",
            ...adaptiveTextMuted,
          }}
        >
          {t.detail}
        </div>
        <div
          style={{
            fontSize: "8px",
            fontFamily: "'DM Mono', monospace",
            marginTop: "8px",
            ...adaptiveTextMuted,
          }}
        >
          via Apify
        </div>
      </div>
    </Glass>
  );
}
