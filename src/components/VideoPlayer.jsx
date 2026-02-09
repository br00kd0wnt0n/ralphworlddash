import { useState } from "react";
import { R } from "../data/theme";
import { adaptiveText } from "../hooks/useContrastColor";
import Glass from "./Glass";
import Label from "./Label";

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <Glass style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "14px 18px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Label color={R.red}>Ralph.TV</Label>
        {playing && (
          <span
            style={{
              fontSize: "9px",
              fontFamily: "'DM Mono', monospace",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: R.red,
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: R.red,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            NOW PLAYING
          </span>
        )}
      </div>
      <div
        style={{
          flex: 1,
          margin: "0 12px 12px",
          borderRadius: "14px",
          minHeight: 0,
          background: `linear-gradient(135deg, ${R.red}12 0%, ${R.red}06 100%)`,
          border: `1px solid ${R.red}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            height: "50px",
            position: "absolute",
            opacity: 0.25,
          }}
        >
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "3.5px",
                borderRadius: "4px",
                background: R.red,
                height: playing
                  ? `${8 + Math.abs(Math.sin(i * 0.5)) * 35}px`
                  : "4px",
                animation: playing
                  ? `wave ${0.4 + (i % 5) * 0.12}s ease-in-out infinite alternate`
                  : "none",
                transition: "height 0.4s ease",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            cursor: "pointer",
            border: "none",
            position: "relative",
            zIndex: 2,
            background: playing ? "#fff" : R.red,
            boxShadow: `0 8px 28px ${R.red}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: playing ? "scale(0.9)" : "scale(1)",
          }}
        >
          {playing ? (
            <div style={{ display: "flex", gap: "5px" }}>
              <div style={{ width: "5px", height: "20px", background: R.red, borderRadius: "2px" }} />
              <div style={{ width: "5px", height: "20px", background: R.red, borderRadius: "2px" }} />
            </div>
          ) : (
            <div
              style={{
                width: 0, height: 0, marginLeft: "4px",
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "16px solid #fff",
              }}
            />
          )}
        </button>
      </div>
    </Glass>
  );
}
