import { R } from "../data/theme";

export default function Overlay({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,10,15,0.3)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.8)",
          borderRadius: "24px",
          maxWidth: "560px",
          width: "100%",
          boxShadow:
            "0 32px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
          animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          overflow: "hidden",
        }}
      >
        {/* Color bar */}
        <div style={{ height: "4px", background: item.color || R.red }} />

        <div style={{ padding: "28px 32px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: `${item.color || R.red}12`,
                  border: `1px solid ${item.color || R.red}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                {item.emoji}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: R.text,
                    fontFamily: "'Space Grotesk', sans-serif",
                    lineHeight: 1.2,
                  }}
                >
                  {item.name || item.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "4px",
                    alignItems: "center",
                  }}
                >
                  {item.client && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: R.textLight,
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {item.client}
                    </span>
                  )}
                  {item.tag && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "10px",
                        background: `${item.color}15`,
                        color: item.color,
                        fontFamily: "'DM Mono', monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                  {item.type && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "10px",
                        background: `${item.color}15`,
                        color: item.color,
                        fontFamily: "'DM Mono', monospace",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.type}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "none",
                background: "rgba(26,26,46,0.06)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: R.textMuted,
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(26,26,46,0.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(26,26,46,0.06)")
              }
            >
              x
            </button>
          </div>

          {/* Description */}
          {item.description && (
            <div
              style={{
                fontSize: "15px",
                color: R.textLight,
                lineHeight: 1.65,
                fontFamily: "'Space Grotesk', sans-serif",
                marginBottom: "20px",
              }}
            >
              {item.description}
            </div>
          )}

          {/* Meta */}
          <div
            style={{ display: "flex", gap: "16px", alignItems: "center" }}
          >
            {item.date && (
              <div
                style={{
                  fontSize: "11px",
                  color: R.textMuted,
                  fontFamily: "'DM Mono', monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {item.date === "Live Now" && (
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: item.color,
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                )}
                {item.date}
              </div>
            )}
            {item.year && (
              <div
                style={{
                  fontSize: "11px",
                  color: R.textMuted,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {item.year}
              </div>
            )}
            {item.link && (
              <div
                style={{
                  fontSize: "11px",
                  color: item.color,
                  fontFamily: "'DM Mono', monospace",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {item.link} →
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
