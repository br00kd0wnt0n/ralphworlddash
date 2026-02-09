import { R } from "../data/theme";
import { INDUSTRY_DATA } from "../data/content";
import { adaptiveText, adaptiveTextMuted } from "../hooks/useContrastColor";
import Glass from "./Glass";
import Label from "./Label";

export default function IndustryPulse() {
  return (
    <Glass style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 18px 8px" }}>
        <Label>Industry Pulse</Label>
        <div
          style={{
            fontSize: "10px",
            lineHeight: 1.4,
            fontFamily: "'DM Sans', sans-serif",
            marginTop: "4px",
            ...adaptiveTextMuted,
          }}
        >
          Market signals shaping social, content and creator spend
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "0 12px 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "7px",
        }}
      >
        {INDUSTRY_DATA.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 10px",
              borderRadius: "12px",
              background: `${d.color}06`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: d.color,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {d.value}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: "1px",
                  ...adaptiveText,
                }}
              >
                {d.label}
              </div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontSize: "10px",
                fontWeight: 700,
                color: R.green,
                fontFamily: "'DM Mono', monospace",
                padding: "2px 8px",
                borderRadius: "10px",
                background: `${R.green}10`,
              }}
            >
              {d.change} ↑
            </div>
          </div>
        ))}
        <div
          style={{
            fontSize: "8px",
            fontFamily: "'DM Mono', monospace",
            textAlign: "right",
            marginTop: "2px",
            ...adaptiveTextMuted,
          }}
        >
          eMarketer, Goldman Sachs 2025
        </div>
      </div>
    </Glass>
  );
}
