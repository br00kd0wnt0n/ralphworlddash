import { useState } from "react";
import { R } from "../data/theme";
import { DAILY_ARTICLE } from "../data/content";
import { adaptiveText, adaptiveTextMuted } from "../hooks/useContrastColor";

export default function DailyRead() {
  const [readerOpen, setReaderOpen] = useState(false);
  const a = DAILY_ARTICLE;

  return (
    <>
      <div
        onClick={() => setReaderOpen(true)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 8px",
          cursor: "pointer",
        }}
      >
        {/* Label + descriptor */}
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "9px",
              fontWeight: 700,
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: R.red,
              marginBottom: "4px",
            }}
          >
            Daily Read
          </div>
          <div
            style={{
              fontSize: "11px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              ...adaptiveTextMuted,
            }}
          >
            Perspectives on creativity, technology and the work from across Ralph
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "28px",
            lineHeight: 1.2,
            fontWeight: 800,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.5px",
            marginBottom: "12px",
            ...adaptiveText,
          }}
        >
          {a.title}
        </div>

        {/* Teaser body */}
        <div
          style={{
            fontSize: "13px",
            lineHeight: 1.6,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            marginBottom: "14px",
            ...adaptiveTextMuted,
          }}
        >
          {a.teaser}
        </div>

        {/* Author + read more */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontFamily: "'DM Mono', monospace",
              ...adaptiveTextMuted,
            }}
          >
            {a.author}, {a.role}
          </div>
          <div
            style={{
              fontSize: "9px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "20px",
              background: `${R.red}20`,
              color: R.red,
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              backdropFilter: "blur(8px)",
            }}
          >
            Read &rarr;
          </div>
        </div>
      </div>

      {/* Reader overlay */}
      {readerOpen && (
        <div
          onClick={() => setReaderOpen(false)}
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
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.8)",
              borderRadius: "24px",
              maxWidth: "640px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow:
                "0 32px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
              animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Color bar */}
            <div style={{ height: "4px", background: R.red }} />

            <div style={{ padding: "32px 36px" }}>
              {/* Close */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "8px",
                }}
              >
                <button
                  onClick={() => setReaderOpen(false)}
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

              {/* Article label */}
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  fontFamily: "'DM Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: R.red,
                  marginBottom: "12px",
                }}
              >
                Daily Read
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: "32px",
                  lineHeight: 1.2,
                  fontWeight: 800,
                  fontFamily: "Georgia, serif",
                  letterSpacing: "-0.5px",
                  color: R.text,
                  marginBottom: "8px",
                }}
              >
                {a.title}
              </div>

              {/* Author */}
              <div
                style={{
                  fontSize: "12px",
                  fontFamily: "'DM Mono', monospace",
                  color: R.textMuted,
                  marginBottom: "28px",
                }}
              >
                {a.author}, {a.role} &mdash; Ralph.World
              </div>

              {/* Body */}
              {a.body.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.75,
                    fontFamily: "'DM Sans', sans-serif",
                    color: R.textLight,
                    margin: "0 0 18px 0",
                    fontWeight: para.startsWith("\u201C") ? 600 : 400,
                    fontStyle: para.startsWith("\u201C") ? "italic" : "normal",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
