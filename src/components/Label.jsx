import { adaptiveText } from "../hooks/useContrastColor";

export default function Label({ children, color }) {
  return (
    <div
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        fontFamily: "'DM Mono', monospace",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        // Adaptive: reacts to whatever is behind it
        ...adaptiveText,
        // If an explicit color is passed, use it (overrides adaptive)
        ...(color ? { color, mixBlendMode: "normal" } : {}),
      }}
    >
      {children}
    </div>
  );
}
