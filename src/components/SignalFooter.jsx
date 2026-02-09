import { useState, useEffect } from "react";
import { R } from "../data/theme";
import { OFFICES } from "../data/content";
import { adaptiveText, adaptiveTextMuted } from "../hooks/useContrastColor";

export default function SignalFooter() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "20px",
        padding: "8px 18px",
        borderRadius: "20px",
        background: "rgba(15,15,25,0.4)",
        backdropFilter: "blur(64px)",
        WebkitBackdropFilter: "blur(64px)",
        border: "1px solid rgba(255,255,255,0.1)",
        isolation: "isolate",
      }}
    >
      {OFFICES.map((o, i) => {
        const hour = parseInt(
          new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            hour12: false,
            timeZone: o.tz,
          }).format(now)
        );
        const isActive = hour >= 9 && hour < 18;
        const time = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: o.tz,
        }).format(now);
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ fontSize: "11px" }}>{o.emoji}</span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                ...adaptiveText,
              }}
            >
              {o.city}
            </span>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: isActive ? R.green : "rgba(26,26,46,0.15)",
                boxShadow: isActive ? `0 0 6px ${R.green}` : "none",
                animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
              }}
            />
            <span
              style={{
                fontSize: "9px",
                fontFamily: "'DM Mono', monospace",
                ...adaptiveTextMuted,
              }}
            >
              {time}
            </span>
          </div>
        );
      })}
    </div>
  );
}
