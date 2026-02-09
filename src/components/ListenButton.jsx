import { useState } from "react";
import { R } from "../data/theme";
import { adaptiveText, adaptiveTextMuted } from "../hooks/useContrastColor";
import Glass from "./Glass";
import Label from "./Label";

export default function ListenButton() {
  const [state, setState] = useState("idle");

  const click = () => {
    if (state === "idle") {
      setState("loading");
      setTimeout(() => setState("playing"), 2200);
    } else if (state === "playing") {
      setState("idle");
    }
  };

  return (
    <Glass
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
      onClick={click}
    >
      <div style={{ padding: "14px 18px 8px" }}>
        <Label color={R.blue}>Listen</Label>
        <div
          style={{
            fontSize: "10px",
            lineHeight: 1.4,
            fontFamily: "'DM Sans', sans-serif",
            marginTop: "4px",
            ...adaptiveTextMuted,
          }}
        >
          AI-generated audio summary of today's trends, launches and signals
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "0 14px 14px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background:
              state === "playing"
                ? R.blue
                : state === "loading"
                  ? `${R.blue}30`
                  : `${R.blue}12`,
            border:
              state === "idle"
                ? `2.5px solid ${R.blue}`
                : "2.5px solid transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            boxShadow:
              state === "playing" ? `0 8px 28px ${R.blue}40` : "none",
            animation: state === "loading" ? "spin 1s linear infinite" : "none",
          }}
        >
          {state === "idle" && (
            <span style={{ fontSize: "18px", marginLeft: "2px", color: R.blue }}>▶</span>
          )}
          {state === "loading" && (
            <div
              style={{
                width: "16px",
                height: "16px",
                border: `2.5px solid ${R.blue}`,
                borderTop: "2.5px solid transparent",
                borderRadius: "50%",
              }}
            />
          )}
          {state === "playing" && (
            <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "3.5px",
                    background: "#fff",
                    borderRadius: "2px",
                    animation: `eqBar ${0.35 + i * 0.12}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              ...(state === "playing" ? { color: R.blue } : adaptiveText),
            }}
          >
            {state === "idle"
              ? "Today's Digest"
              : state === "loading"
                ? "Generating..."
                : "Now Playing"}
          </div>
          <div
            style={{
              fontSize: "10px",
              fontFamily: "'DM Mono', monospace",
              marginTop: "2px",
              ...adaptiveTextMuted,
            }}
          >
            4 min AI briefing
          </div>
        </div>
      </div>
    </Glass>
  );
}
