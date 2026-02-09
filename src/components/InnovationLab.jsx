import { useState, useEffect } from "react";
import { R } from "../data/theme";
import { adaptiveText, adaptiveTextMuted } from "../hooks/useContrastColor";
import Glass from "./Glass";
import Label from "./Label";

export default function InnovationLab() {
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setScanPos((p) => (p + 1) % 100), 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <Glass
      style={{
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, rgba(255,255,255,0.18) 0%, ${R.green}06 100%)`,
      }}
    >
      <div
        style={{
          padding: "14px 18px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Label color={R.green}>Innovation Lab</Label>
        <span
          style={{
            fontSize: "9px",
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: "10px",
            background: `${R.green}12`,
            color: R.green,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          LATEST PROTOTYPE
        </span>
      </div>
      <div
        style={{
          flex: 1,
          padding: "0 18px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              flexShrink: 0,
              background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(155,107,255,0.3)",
              boxShadow: "0 4px 16px rgba(155,107,255,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span style={{ fontSize: "24px", position: "relative", zIndex: 2 }}>📻</span>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: `${scanPos}%`,
                width: "2px",
                height: "100%",
                background: `linear-gradient(180deg, transparent 0%, ${R.green} 50%, transparent 100%)`,
                opacity: 0.6,
                transition: "left 0.08s linear",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 900,
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'WONK' 1, 'opsz' 72",
                letterSpacing: "-0.3px",
                ...adaptiveText,
              }}
            >
              FREQUENCY
            </div>
            <div
              style={{
                fontSize: "11px",
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1.4,
                marginTop: "2px",
                ...adaptiveTextMuted,
              }}
            >
              Interactive radio narrative. Scan frequencies, talk to AI characters, uncover a mystery.
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
              {[
                { label: "ElevenLabs", color: R.purple },
                { label: "OpenAI", color: R.blue },
                { label: "WebSocket", color: R.green },
              ].map((t) => (
                <span
                  key={t.label}
                  style={{
                    fontSize: "8px",
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: "8px",
                    background: `${t.color}12`,
                    color: t.color,
                    fontFamily: "'DM Mono', monospace",
                    textTransform: "uppercase",
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "2px", alignItems: "center", flex: 1 }}>
            {[...Array(32)].map((_, i) => {
              const h = 3 + Math.abs(Math.sin((i + scanPos * 0.3) * 0.4)) * 14;
              return (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: `${h}px`,
                    borderRadius: "2px",
                    background: h > 12 ? R.green : h > 8 ? `${R.green}60` : `${R.green}25`,
                    transition: "height 0.15s ease",
                  }}
                />
              );
            })}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: R.green,
              fontFamily: "'DM Mono', monospace",
              flexShrink: 0,
            }}
          >
            27.{String(200 + Math.floor(scanPos * 4.65)).padStart(3, "0")} MHz
          </div>
        </div>
      </div>
    </Glass>
  );
}
