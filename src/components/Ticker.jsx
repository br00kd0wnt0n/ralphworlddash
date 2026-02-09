import { TICKER_ITEMS } from "../data/content";
import { adaptiveText } from "../hooks/useContrastColor";

export default function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "rgba(15,15,25,0.4)",
        backdropFilter: "blur(64px)",
        WebkitBackdropFilter: "blur(64px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        isolation: "isolate",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: "48px",
          paddingLeft: "100%",
          animation: "ticker 50s linear infinite",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: "11px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              ...adaptiveText,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
